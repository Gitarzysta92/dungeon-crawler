export class AudioTrack {
  
  public trackName: string;
  public set loop(v: boolean) { this._audio.loop = v };
  public set muted(v: boolean) { this._audio.muted = v };

  private _audio: HTMLAudioElement;
  private _intervalTime: number = 1000 * 10;

  constructor(trackName: string, soundObjectUrl: string) {
    this.trackName = trackName;
    this._audio = new Audio(soundObjectUrl);
  }

  play(volume?: number): void {
    this._audio.currentTime = 0;
    if (!!volume) {
      this.setVolume(volume);
    }

    if (!this._audio.loop) {
      this._audio.play()?.catch(() => null);
    } else {
      this._audio.play()?.catch(() => {
        setTimeout(() => this.play(volume), this._intervalTime)
      });
    }
  }

  stop() {
    this._audio.pause();
  }

  setVolume(volume: number) {
    this._audio.volume = volume / 100;
  }

}