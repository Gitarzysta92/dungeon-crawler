import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICubeCoordinates } from "@game-logic/lib/modules/board/board.interface";
import { ITerrainField, ITerrainChunk } from '../../../core/terrain/interfaces/dynamic-terrain.interface';

export interface ITerrainDebugInfo {
  loadedChunks: number;
  totalFields: number;
  lastUpdate: Date;
  playerPosition: ICubeCoordinates | null;
  performanceMetrics: {
    avgLoadTime: number;
    memoryUsage: number;
    renderTime: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TerrainDebugService {
  
  private readonly _debugInfo$ = new BehaviorSubject<ITerrainDebugInfo>({
    loadedChunks: 0,
    totalFields: 0,
    lastUpdate: new Date(),
    playerPosition: null,
    performanceMetrics: {
      avgLoadTime: 0,
      memoryUsage: 0,
      renderTime: 0
    }
  });

  public readonly debugInfo$ = this._debugInfo$.asObservable();

  constructor() {}

  public updateDebugInfo(info: Partial<ITerrainDebugInfo>): void {
    const current = this._debugInfo$.value;
    this._debugInfo$.next({
      ...current,
      ...info,
      lastUpdate: new Date()
    });
  }

  public logTerrainEvent(event: string, data?: any): void {
    console.log(`[TerrainDebug] ${event}`, data);
  }

  public getDebugInfo(): ITerrainDebugInfo {
    return this._debugInfo$.value;
  }
}