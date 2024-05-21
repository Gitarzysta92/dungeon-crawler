import { Component, Input, OnInit } from '@angular/core';
import { IPerkDeclaration } from '@game-logic/lib/modules/perks/perk.interface';
import { IUiMedium } from '../../mixins/ui-medium/ui-medium.interface';
import { INarrativeMedium } from '../../mixins/narrative-medium/narrative-medium.interface';
import { InfoPanelService } from '../../services/info-panel.service';

@Component({
  selector: 'perk-slot',
  templateUrl: './perk-slot.component.html',
  styleUrls: ['./perk-slot.component.scss']
})
export class PerkSlotComponent implements OnInit {

  @Input() perk: IPerkDeclaration & IUiMedium & INarrativeMedium  
  constructor(
    private readonly _infoPanelService: InfoPanelService
  ) { }

  ngOnInit(): void {
  }

  public openInfoPanel(t: any, x: INarrativeMedium & IUiMedium): void {
    this._infoPanelService.createInfoPanel(t, x)
  }

}
