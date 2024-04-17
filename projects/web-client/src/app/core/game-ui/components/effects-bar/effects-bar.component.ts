import { Component, OnInit } from '@angular/core';
import { DungeonUiStore } from '../../stores/dungeon-ui.store';
import { map } from 'rxjs';

@Component({
  selector: 'effects-bar',
  templateUrl: './effects-bar.component.html',
  styleUrls: ['./effects-bar.component.scss']
})
export class EffectsBarComponent implements OnInit {

  constructor(
    private readonly _uiService: DungeonUiStore,
    //private readonly _commandService: CommandService
  ) { }

  ngOnInit(): void {
    // this._castableEffects = this._uiService.state$.pipe(map(p => p.selectedHero.getCastableEffects()))
    // this.abilities = this._castableEffects.pipe(map(effects => effects.filter(e => e.isAbility)));
    // this.items = this._castableEffects.pipe(map(effects => effects.filter(e => e.isItem)));
    // this.interactableActors = this._
  }

  public startCasting(c) {
    //this._commandService.execute(c);
  }

}
