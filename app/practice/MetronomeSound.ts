// utils/metronome.ts
export class MetronomeSound {
  private audioCtx: AudioContext;
  private nextNoteTime: number = 0;
  private tempo: number;
  private lookahead = 25.0;
  private scheduleAheadTime = 0.1;
  private onBeat: () => void;
  private timerID: number | null = null;
  private clickBuffer: AudioBuffer | null = null;

  constructor(tempo: number, clickUrl: string, onBeat: () => void) {
    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.tempo = tempo;
    this.nextNoteTime = this.audioCtx.currentTime;
    this.onBeat = onBeat;

    fetch(clickUrl)
      .then((res) => res.arrayBuffer())
      .then((data) => this.audioCtx.decodeAudioData(data))
      .then((decoded) => {
        this.clickBuffer = decoded;
      });
  }

  private nextNote() {
    const secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += secondsPerBeat;
  }

  private scheduleClick(time: number) {
    if (!this.clickBuffer) return;

    const source = this.audioCtx.createBufferSource();
    source.buffer = this.clickBuffer;
    source.connect(this.audioCtx.destination);
    source.start(time);

    // Trigger UI exactly when the sound fires
    const delay = (time - this.audioCtx.currentTime) * 1000;
    setTimeout(() => {
      this.onBeat?.(); // your UI effect
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

  setTempo(newTempo: number) {
    this.tempo = newTempo;
  }
}
