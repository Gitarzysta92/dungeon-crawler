import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { AssetLoaderService } from "src/app/infrastructure/asset-loader/api";
import { AudioTrack } from "./audio-track";

@Injectable({ providedIn: "root" })
export class SoundEffectsService {

  
  private _audioTracks: AudioTrack[] = [];

  constructor(
    private readonly _assetLoaderService: AssetLoaderService
  ) { }
  
  public async play(trackName: string, volume: number, muted: boolean = false, loop: boolean = false): Promise<void> {
    const track = await this.getOrInitializeTrack(trackName);
    track.loop = loop;
    track.muted = muted;
    track.play(volume);
  }

  public stop(trackName: string): void {
    let track = this._audioTracks.find(t => t.trackName === trackName);
    if (!track) { 
      return;
    }
    track.stop()
  }

  public async setVolume(trackName: string, volume: number): Promise<void> {
    let track = this._audioTracks.find(t => t.trackName === trackName);
    if (!track) { 
      return;
    }
    track.setVolume(volume);
  }

  public async setVolumeByGroup(groupName: string, volume: number): Promise<void> {
    this._audioTracks.forEach(t => {
      if (t.trackName.includes(groupName)) {
        t.setVolume(volume);
      }
    })
  }

  public mute(): void {
    this._audioTracks.forEach(t => {
      t.muted = true;
    });
  }

  public unmuteByGroup(initialState: { [key: string]: number }): void {
    this._audioTracks.forEach(t => {
      const groupName = t.trackName.split(":")[0];
      const volume = initialState[groupName];
      if (isNaN(volume)) {
        return;
      }
      t.setVolume(volume);
      t.muted = false;
    })
  }

  public async getOrInitializeTrack(trackName: string): Promise<AudioTrack> {
    let track = this._audioTracks.find(a => a.trackName === trackName);
    if (track) { 
      return track;
    }
    track = await this._initializeTrack(trackName);
    this._audioTracks.push(track);
    return track;
  }

  public clearAll(): void {
    this._audioTracks.forEach(t => t.stop());
    this._audioTracks.length = 0;
  }

  private async _initializeTrack(trackName: string): Promise<AudioTrack> {
    const soundBlob = await lastValueFrom(this._assetLoaderService.getAsset(trackName));
    return new AudioTrack(trackName, URL.createObjectURL(soundBlob));
  }

}