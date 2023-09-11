import { Component, OnInit, ViewChild } from '@angular/core';
import { connectable, filter, fromEvent, merge, Observable, ReplaySubject } from 'rxjs';
import { DungeonStateStore } from 'src/app/core/dungeon-logic/stores/dugneon-state.store';
import { SceneComponent } from 'src/app/core/gameplay-scene/api';
import { SceneInitializationService } from 'src/app/core/gameplay-scene/services/scene-initialization/scene-initialization.service';
import { IGameplayFeed } from '../../models/gameplay-feed';
import { createAdventureState } from '@game-logic/tests/test-helpers';
import { dataFeed } from '@game-logic/data/feed.data';
import { dungeon } from '@game-logic/data/dungeon.data';
import { mapLogicFieldToSceneField, mapLogicObjectToSceneObject } from '../../mappings/dungeon-mappings';
import { IHero } from '@game-logic/lib/features/hero/hero.interface';
import { actors, spellsAndAbilities } from 'src/app/core/adventure/constants/data';
import { validatePossibilityToUseEffect } from '@game-logic/lib/activities/player-activities/cast-effect.directive'
import { IEffect } from '@game-logic/lib/features/effects/effect-commons.interface';


@Component({
  templateUrl: './gameplay-view.component.html',
  styleUrls: ['./gameplay-view.component.scss'],
})
export class GameplayViewComponent implements OnInit {

  @ViewChild(SceneComponent, { static: true }) canvas: SceneComponent | undefined;

  public gameFeed$: Observable<IGameplayFeed>;
  public currentPlayer$: any;
  public message$: Observable<any>;
  public isLoading: boolean = true;
  hero: IHero;
  activities: { name: string; }[];

  constructor(
    private readonly _sceneInitializationService: SceneInitializationService,
    private readonly _dungeonState: DungeonStateStore
  ) { }

  async ngOnInit(): Promise<void> {
    const adventureState = createAdventureState();
    this._dungeonState.registerStore(adventureState, dataFeed, dungeon)

    const { currentState } = this._dungeonState;

    const events = merge(fromEvent<PointerEvent>(window, 'mousemove'), fromEvent<PointerEvent>(window, 'click'));
    const inputs = { pointerEvent$: connectable(events, { connector: () => new ReplaySubject() })}
    inputs.pointerEvent$.connect();

    this._sceneInitializationService.createScene(
      this.canvas.canvas.nativeElement,
      inputs,
      Object.values(currentState.board.objects).map(o => mapLogicObjectToSceneObject(Object.assign({ ...actors[o.id]}, o))),
      Object.values(currentState.board.fields).map(f => mapLogicFieldToSceneField(f)),
    );

    this._dungeonState.state
      .subscribe(s => this._sceneInitializationService.updateScene(
        Object.values(currentState.board.objects).map(o => mapLogicObjectToSceneObject(Object.assign({ ...actors[o.id]}, o))),
        Object.values(currentState.board.fields).map(f => mapLogicFieldToSceneField(f))
      ))
    
    this._dungeonState.state
      .subscribe(s => {
        this.hero = s.hero;
        this.activities = s.heroPreparedSpellAndAbilityIds.map(id => Object.assign(spellsAndAbilities[id], {
          isDisabled: validatePossibilityToUseEffect(s, { effect: spellsAndAbilities[id] as IEffect }),
          isSelected: false
        }));
      })
    
    inputs.pointerEvent$
      .pipe(filter(e => e.type === 'click'))
      .subscribe(e => {
        const field = this._sceneInitializationService.boardComponent.getTargetedField(e.x, e.y);
        field.isHighlighted ? field.removeHighlight() : field.highlight('#fff');
        console.log(field.isHighlighted)
      });
  }

  public selectActivity(effect: IEffect): void {
    effect.selectorOrigin = this._dungeonState.currentState.hero.position!;
    const fields = this._dungeonState.currentState.board.getNotOccupiedSelectedFields(effect);
    for (let field of fields) {
      const boardField = this._sceneInitializationService.boardComponent.getField(`${field.coords.q}${field.coords.r}${field.coords.s}`);
      console.log(field.id);
      boardField.highlight('#fff');
    }
    
  }


  public interact(event: MouseEvent): void {
    this._dungeonState
  }

}