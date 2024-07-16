import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IMenuItem } from 'src/app/aspects/navigation/interfaces/navigation.interface';

@Component({
  selector: 'context-bar',
  templateUrl: './context-bar.component.html',
  styleUrls: ['./context-bar.component.scss']
})
export class ContextBarComponent implements OnInit {

  @Input() items: IMenuItem[];
  @Output() itemSelected: EventEmitter<IMenuItem> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  public selectItem(v: IMenuItem): void {
    this.itemSelected.next(v);
  }
}