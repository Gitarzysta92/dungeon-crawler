import { Injectable } from '@angular/core';
import { IActor } from '@game-logic/lib/features/actors/actors.interface';
import { IBoardObjectRotation, IField } from '@game-logic/lib/features/board/board.interface';
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';

@Injectable({
  providedIn: 'root'
})
export class DungeonArtificialIntelligenceService {

  constructor() { }

  findAvailableActor(): IActor {
    throw new Error('Method not implemented.');
  }
  findAvailableRotation(): IBoardObjectRotation {
    throw new Error('Method not implemented.');
  }
  findAvailableEffect(): IEffect {
    throw new Error('Method not implemented.');
  }
  findAvailableField(): IField {
    throw new Error('Method not implemented.');
  }
}
