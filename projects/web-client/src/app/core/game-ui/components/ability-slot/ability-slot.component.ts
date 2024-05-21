import { Component, Input, OnInit } from '@angular/core';
import { IAbilityDeclaration } from '@game-logic/lib/modules/abilities/entities/ability/ability.interface';
import { INarrativeMedium } from '../../mixins/narrative-medium/narrative-medium.interface';
import { IUiMedium } from '../../mixins/ui-medium/ui-medium.interface';
import { InfoPanelService } from '../../services/info-panel.service';

@Component({
  selector: 'ability-slot',
  templateUrl: './ability-slot.component.html',
  styleUrls: ['./ability-slot.component.scss']
})
export class AbilitySlotComponent implements OnInit {

  @Input() ability: IAbilityDeclaration & INarrativeMedium & IUiMedium;

  constructor(
    private readonly _infoPanelService: InfoPanelService
  ) { }

  ngOnInit(): void {
  }

  public openInfoPanel(t: any, x: INarrativeMedium & IUiMedium): void {
    this._infoPanelService.createInfoPanel(t, x)
  }

}
