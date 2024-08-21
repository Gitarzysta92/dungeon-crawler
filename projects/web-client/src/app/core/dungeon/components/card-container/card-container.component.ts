import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ICard } from '@game-logic/lib/modules/cards/entities/card/card.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { ICardContainer, IDraggableCard } from '../../mixins/draggable-card/draggable-card.interface';
import { ICardOnPile } from '@game-logic/lib/modules/cards/entities/card-on-pile/card-on-pile.interface';
import { TranslateService } from '@ngx-translate/core';
import { NarrativeMediumFactory } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.factory';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { ProcedureFactory } from '@game-logic/lib/base/procedure/procedure.factory';
import { MappingService } from 'src/app/core/game/services/mapping.service';
import { DISCARD_CARD_ACTIVITY, PLAY_CARD_ACTIVITY } from '@game-logic/lib/modules/cards/cards.constants';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';

import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { majorActionStatistic, minorActionStatistic } from 'src/app/core/game-data/constants/data-feed-statistics.data';

@Component({
  selector: 'card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit, ICardContainer {

  @Input() card: ICardOnPile & IDraggableCard & INarrativeMedium & IInteractableMedium;
  @Input() active: boolean;
  @Input() hideCost: boolean = false;

  public cardRef: ICard & INarrativeMedium & IUiMedium
  public discardText$: Observable<string>;
  public cardText$: Observable<string>;
  public cardCost$: Observable<Array<{ isMinor?: boolean, isMajor?: boolean, isMove?: boolean, value: number }>>

  constructor(
    public readonly elementRef: ElementRef,
    private readonly _translateService: TranslateService,
    private readonly _mappingService: MappingService
  ) { }

  toggleActivity(): void {
    this.active = true
  }

  ngOnInit(): void {
    this.cardRef = this.card.ref as ICard & INarrativeMedium & IUiMedium;
    this.card.containerRef = new WeakRef(this);
    this.cardText$ = this._prepareCardText();
    this.discardText$ = this._prepareDiscardText();
    this.cardCost$ = this._preparePlayCardCost();
  }
 
  public async playCardAnimation(): Promise<void> {
    return new Promise(r => setTimeout(r, 500))
  }

  private _prepareCardText(): Observable<string> {
    const params = Object.fromEntries(Object.entries(this.card.ref.parameters ?? {}).map(([k, v]) => [k, (v as any).value ?? v]))
    if (params.damageType === 1) {
      params.damageType = 'fire'
    }
    if (params.damageType === 0) {
      params.damageType = 'phisical'
    }
    const text = this._translateService.get(NarrativeMediumFactory.asNarrationMedium(this.card.ref).narrative.description, params);
    return text;
  }

  private _prepareDiscardText(): Observable<string> {
    const activity = this.cardRef.activities.find(a => a.id === DISCARD_CARD_ACTIVITY);
    if (!activity) {
      return of("");
    }

    const payloads = this._mappingService.extractModifyPerformerStatisticPayloads(ProcedureFactory.asProcedure(activity), this.cardRef.bearer);
    return forkJoin(payloads.map(p => this._translateService.get(p.statistic.narrative.name).pipe(map(r => `${p.value} ${r} `))))
      .pipe(
        map(r => r.reduce((a, c) => a.concat(c), "")),
        switchMap(r => this._translateService.get("cards.common.gain", { value: r }))
      )
  }

  private _preparePlayCardCost() {
    const activity = this.cardRef.activities.find(a => a.id === PLAY_CARD_ACTIVITY);

    return of(activity.cost.map(c => {
      if (c.resourceId === majorActionStatistic.id) {
        return { isMajor: true, class: 0, value: c.value }
      } else if (c.resourceId === minorActionStatistic.id) {
        return { isMinor: true, value: c.value }
      } else {
        return { isMove: true, value: c.value }
      }
    }))

  }

}
