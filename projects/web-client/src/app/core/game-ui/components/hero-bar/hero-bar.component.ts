import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUiMedium } from '../../mixins/ui-medium/ui-medium.interface';
import { INarrativeMedium } from '../../mixins/narrative-medium/narrative-medium.interface';
import { IHero } from '@game-logic/gameplay/modules/heroes/mixins/hero/hero.interface';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';


@Component({
  selector: 'hero-bar',
  templateUrl: './hero-bar.component.html',
  styleUrls: ['./hero-bar.component.scss']
})
export class HeroBarComponent implements OnInit {

  @Input() hero: IHero & IUiMedium & INarrativeMedium
  @Input() items: IMenuItem[];
  @Output() itemSelected: EventEmitter<IMenuItem> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  public selectItem(v): void {
    this.itemSelected.next(v);
  }

}
