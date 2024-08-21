import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { InventorySlotType } from '@game-logic/lib/modules/items/mixins/inventory-slot/inventory-slot.constants';
import { IUiMedium } from 'src/app/core/game-ui/mixins/ui-medium/ui-medium.interface';
import { DragService } from 'src/app/core/game-ui/services/drag.service';
import { SuggestionService } from '../../services/suggestion.service';
import { IInteractableMedium } from 'src/app/core/game-ui/mixins/interactable-medium/interactable-medium.interface';
import { ModalService } from 'src/app/core/game-ui/services/modal.service';
import { FormPanelComponent } from 'src/app/core/game-ui/components/form-panel/form-panel.component';
import { Observable, firstValueFrom, from } from 'rxjs';
import { DataFeedService } from 'src/app/core/game-data/services/data-feed.service';
import { IHeroRaceDeclaration } from '@game-logic/gameplay/modules/heroes/mixins/hero-race/hero-race.interface';
import { IHeroClassDeclaration } from '@game-logic/gameplay/modules/heroes/mixins/hero-class/hero-class.interface';
import { IHeroOriginDeclaration } from '@game-logic/gameplay/modules/heroes/mixins/hero-origin/hero-origin.interface';
import { INarrativeMedium } from 'src/app/core/game-ui/mixins/narrative-medium/narrative-medium.interface';
import { IStatistic } from '@game-logic/lib/modules/statistics/entities/statistic/statistic.interface';
import { Tags } from 'src/app/core/game-data/constants/tags.data';
import { IInventorySlot } from '@game-logic/lib/modules/items/mixins/inventory-slot/inventory-slot.interface';


@Component({
  selector: 'hero-view',
  templateUrl: './hero-view.component.html',
  styleUrls: ['./hero-view.component.scss'],
  providers: [
    DragService,
    SuggestionService
  ]
})
export class HeroViewComponent implements OnInit, OnChanges {

  @Input() hero: IUiMedium & INarrativeMedium & IHero;

  @ViewChild("characterTemplate", {static: true}) characterView: TemplateRef<unknown>;
  @ViewChild("perksAndSkillsTemplate", {static: true}) perksAndSkillsView: TemplateRef<unknown>;
  public commonSlots: Array<IInventorySlot & IInteractableMedium>;
  public equipmentSlots: Array<IInventorySlot & IInteractableMedium>;
  public race: Observable<IHeroRaceDeclaration & IUiMedium & INarrativeMedium>;
  public class: Observable<IHeroClassDeclaration & IUiMedium & INarrativeMedium>;
  public origin: Observable<IHeroOriginDeclaration & IUiMedium & INarrativeMedium>;

  public selectedView: TemplateRef<unknown>;
  primaryStatistics: IStatistic[];
  secondaryStatistics: IStatistic[];

  constructor(
    private readonly _dragService: DragService,
    private readonly _suggestionService: SuggestionService,
    private readonly _modalService: ModalService,
    private readonly _dataFeed: DataFeedService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.commonSlots = this.hero.inventorySlots.filter(s => s.slotType === InventorySlotType.Common) as  Array<IInventorySlot & IInteractableMedium>;
    this.equipmentSlots = this.hero.inventorySlots.filter(s => s.slotType === InventorySlotType.Equipment) as  Array<IInventorySlot & IInteractableMedium>;
  }

  ngOnInit(): void {
    this.race = from(this._dataFeed.getHeroRace(this.hero.raceId)) as any;
    this.class = from(this._dataFeed.getHeroClass(this.hero.classId)) as any;
    this.origin = from(this._dataFeed.getHeroOrigin(this.hero.originId)) as any;

    this.selectedView = this.characterView;
    this.primaryStatistics = this.hero.statistics.filter(s => !s.tags || s.tags?.some(t => t !== Tags.SecondaryStatistic));
    this.secondaryStatistics = this.hero.statistics.filter(s => s.tags?.some(t => t === Tags.SecondaryStatistic));

    this._dragService.listenForDraggingProcess<IInventorySlot>()
      //.pipe(finalize(() => this._suggestionService.hideItemTransferSuggestions(this.hero.inventorySlots)))
      .subscribe(p => {
        this._suggestionService.displayItemTransferSuggestions(p.from, this.hero)
      })
    
    this._dragService.listenForDraggingProcessFinished<IInventorySlot>()
      //.pipe(finalize(() => this._suggestionService.hideItemTransferSuggestions(this.hero.inventorySlots)))
      .subscribe(async p => {
        if (p.from && p.to) {
          let amount = 1
          if (p.from.stackSize > 1) {
            amount = await firstValueFrom(this._modalService.createFormPanel(FormPanelComponent, { range: { from: 1, to: p.to.stackMaxSize - p.to.stackSize  }}))
          }
          this.hero.redistributeItems([{ from: p.from, to: p.to, amount }])
        }
        //console.log(this.hero.inventory.items)
        this._suggestionService.hideItemTransferSuggestions(this.hero.inventorySlots)
      })
  }

  public equipItem(e: any) {
    console.log(e);
  }

  public selectCharacterTemplate() {
    this.selectedView = this.characterView;
  }

  public selectPerksAndSkillsTemplate() {
    this.selectedView = this.perksAndSkillsView;
  }

  public isCharacterTemplateActive() {
    return this.selectedView === this.characterView;
  }

  public isPerksAndSkillsTemplateActive() {
    return this.selectedView === this.perksAndSkillsView;
  }

}

