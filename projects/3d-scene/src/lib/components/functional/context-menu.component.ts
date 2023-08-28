
import { AnimationDispatcher } from "../../behaviours/animations/animation.dispatcher";

import { TilesRowComponent } from "./tiles-row.component";

export class ContextMenuComponent {
  
  constructor(
    private readonly _animationDispatcher: AnimationDispatcher,
    private readonly _tilesRowComponent: TilesRowComponent
  ) { 
    this._tilesRowComponent.span = 11;
  }


}