export class MetronomeSound {
  private isDisposed = false;
  private handleVisibilityChange: () => void;
  private signature: number;
  private audioCtx: AudioContext;
  private tempo: number;
  private currentBeat: number = 1;

  private nextNoteTime: number = 0;
  private lookahead = 25.0;
  private scheduleAheadTime = 0.1;

  private timerID: number | null = null;
  private smallClick: AudioBuffer | null = null;
  private bigClick: AudioBuffer | null = null;
  private clickBuffer: AudioBuffer | null = null;
  private useMainBeat: boolean = (JSON.parse(localStorage.getItem('isMainBeatActive') ?? 'true') as boolean) ?? true;
  private gainNode: GainNode;

  // Store raw audio data so we can re-decode against a new AudioContext
  // if iOS kills the audio device while backgrounded.
  private smallClickData: ArrayBuffer | null = null;
  private bigClickData: ArrayBuffer | null = null;

  private onBeat: () => void;

  constructor(tempo: number, signature: number, onBeat: () => void) {
    this.signature = signature;
    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.tempo = tempo;
    this.nextNoteTime = this.audioCtx.currentTime;
    this.onBeat = onBeat;

    this.gainNode = this.audioCtx.createGain();
    const storedVolume = parseFloat(localStorage.getItem('metronomeVolume') ?? '100') / 100;

    this.gainNode.gain.value = isNaN(storedVolume) ? 1 : storedVolume;
    this.gainNode.connect(this.audioCtx.destination);

    this.loadAudioBuffers();

    // Handle iOS Safari suspending AudioContext when the app is backgrounded.
    // When the user returns, resume the context and re-sync the scheduler.
    this.handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && this.timerID !== null) {
        this.ensureAudioContext().then(() => {
          this.nextNoteTime = this.audioCtx.currentTime;
        });
      }
    };
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  /**
   * Load audio files and store both the decoded buffers and raw ArrayBuffer data.
   * The raw data is kept so we can re-decode against a new AudioContext if iOS
   * invalidates the current one.
   */
  private loadAudioBuffers() {
    fetch('/sound/smallClick.wav')
      .then((res) => res.arrayBuffer())
      .then((data) => {
        this.smallClickData = data;
        return this.audioCtx.decodeAudioData(data.slice(0));
      })
      .then((decoded) => {
        if (!this.useMainBeat) this.clickBuffer = decoded;
        this.smallClick = decoded;
      });

    this.useMainBeat &&
      fetch('/sound/bigClick.wav')
        .then((res) => res.arrayBuffer())
        .then((data) => {
          this.bigClickData = data;
          return this.audioCtx.decodeAudioData(data.slice(0));
        })
        .then((decoded) => {
          this.bigClick = decoded;
          this.clickBuffer = decoded;
        });
  }

  /**
   * Re-decode audio buffers against the current AudioContext.
   * Called after creating a fresh context to replace an invalidated one.
   */
  private async reDecodeBuffers() {
    if (this.smallClickData) {
      const decoded = await this.audioCtx.decodeAudioData(this.smallClickData.slice(0));
      this.smallClick = decoded;
      if (!this.useMainBeat) this.clickBuffer = decoded;
    }
    if (this.bigClickData) {
      const decoded = await this.audioCtx.decodeAudioData(this.bigClickData.slice(0));
      this.bigClick = decoded;
      if (this.useMainBeat) this.clickBuffer = decoded;
    }
  }

  /**
   * Ensure the AudioContext is in a usable "running" state.
   * iOS Safari can permanently invalidate the context after backgrounding —
   * resume() throws InvalidStateError in that case. When that happens,
   * we create a brand new context and re-decode the audio buffers.
   */
  private async ensureAudioContext() {
    if (this.audioCtx.state === 'closed') {
      await this.rebuildAudioContext();
      return;
    }

    try {
      await this.audioCtx.resume();
    } catch {
      // AudioContext is dead (iOS InvalidStateError) — rebuild it
      await this.rebuildAudioContext();
    }
  }

  private async rebuildAudioContext() {
    // Silently close the old context if possible
    try {
      await this.audioCtx.close();
    } catch {
      // Already closed / invalid — ignore
    }

    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.gainNode = this.audioCtx.createGain();
    const storedVolume = parseFloat(localStorage.getItem('metronomeVolume') ?? '100') / 100;
    this.gainNode.gain.value = isNaN(storedVolume) ? 1 : storedVolume;
    this.gainNode.connect(this.audioCtx.destination);

    await this.reDecodeBuffers();
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += secondsPerBeat;
  }
  private setBeat() {
    if (!this.useMainBeat) return;
    if (this.currentBeat === 1) {
      this.clickBuffer = this.bigClick;
      this.currentBeat++;
    } else if (this.currentBeat % this.signature === 0) {
      this.currentBeat = 1;
    } else {
      this.clickBuffer = this.smallClick;
      this.currentBeat++;
    }
  }
  private scheduleClick(time: number) {
    if (!this.clickBuffer) return;

    this.setBeat();

    const source = this.audioCtx.createBufferSource();
    source.buffer = this.clickBuffer;
    source.connect(this.gainNode);
    source.start(time);

    const delay = (time - this.audioCtx.currentTime) * 1000;
    setTimeout(() => {
      this.onBeat();
    }, delay);
  }
  private scheduler = () => {
    while (this.nextNoteTime < this.audioCtx.currentTime + this.scheduleAheadTime) {
      this.scheduleClick(this.nextNoteTime);
      this.nextNote();
    }
    this.timerID = window.setTimeout(this.scheduler, this.lookahead);
  };

  async start() {
    if (this.isDisposed) return;
    if (!this.timerID) {
      // Ensure the AudioContext is alive — iOS may have killed it while backgrounded
      await this.ensureAudioContext();
      this.nextNoteTime = this.audioCtx.currentTime;
      this.scheduler();
    }
  }
  stop() {
    if (this.timerID) {
      clearTimeout(this.timerID);
      this.timerID = null;
    }
  }
  dispose() {
    this.stop();
    this.isDisposed = true;
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.audioCtx.close();
  }
  updateMetronome(tempo: number, signature: number) {
    this.tempo = tempo;
    this.signature = signature;
    this.currentBeat = 1;
  }
}
