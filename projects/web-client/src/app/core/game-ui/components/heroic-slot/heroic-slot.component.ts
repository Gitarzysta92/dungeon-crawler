import { Component, Input, OnInit } from '@angular/core';
import { IAbilityDeclaration } from '@game-logic/lib/modules/abilities/entities/ability/ability.interface';
import { INarrativeMedium } from '../../mixins/narrative-medium/narrative-medium.interface';
import { IUiMedium } from '../../mixins/ui-medium/ui-medium.interface';

@Component({
  selector: 'heroic-slot',
  templateUrl: './heroic-slot.component.html',
  styleUrls: ['./heroic-slot.component.scss']
})
export class HeroicSlotComponent implements OnInit {

  @Input() ability: IAbilityDeclaration & INarrativeMedium & IUiMedium;

  constructor() { }

  ngOnInit(): void {}


}
