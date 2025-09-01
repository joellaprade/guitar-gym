export class MetronomeSound {
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
  private useMainBeat: boolean = (JSON.parse(localStorage.getItem('isMainBeatActive') ?? '') as boolean) ?? true;

  private onBeat: () => void;

  constructor(tempo: number, signature: number, onBeat: () => void) {
    this.signature = signature;
    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.tempo = tempo;
    this.nextNoteTime = this.audioCtx.currentTime;
    this.onBeat = onBeat;

    fetch('/sound/smallClick.wav')
      .then((res) => res.arrayBuffer())
      .then((data) => this.audioCtx.decodeAudioData(data))
      .then((decoded) => {
        if (!this.useMainBeat) this.clickBuffer = decoded;
        this.smallClick = decoded;
      });

    this.useMainBeat &&
      fetch('/sound/bigClick.wav')
        .then((res) => res.arrayBuffer())
        .then((data) => this.audioCtx.decodeAudioData(data))
        .then((decoded) => {
          this.bigClick = decoded;
          this.clickBuffer = decoded;
        });
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
    source.connect(this.audioCtx.destination);
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

  start() {
    if (!this.timerID) {
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
  updateMetronome(tempo: number, signature: number) {
    this.tempo = tempo;
    this.signature = signature;
    this.currentBeat = 1;
  }
}
