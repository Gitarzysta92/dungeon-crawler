import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAuxiliaryView } from '../../interfaces/auxiliary-view.interface';


@Component({
  selector: 'hero-bar',
  templateUrl: './hero-bar.component.html',
  styleUrls: ['./hero-bar.component.scss']
})
export class HeroBarComponent implements OnInit {

  @Input() items: IAuxiliaryView[];
  @Output() itemSelected: EventEmitter<IAuxiliaryView> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public openAuxiliaryView(v) {
    this.itemSelected.next(v);
  }

}
