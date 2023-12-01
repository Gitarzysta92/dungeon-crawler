import { Component, OnInit, ContentChild, TemplateRef, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { trigger, style, state, transition, animate } from '@angular/animations';
import { IExpandableListItem } from '../../models/expandable-list-item';

@Component({
  selector: 'expandable-list',
  templateUrl: './expandable-list.component.html',
  styleUrls: ['./expandable-list.component.scss'],
  animations: [
    trigger('expandHeight', [
      state('expanded', style({ height: '*' })),
      state('collapsed', style({ height: '0' })),
      transition('expanded => collapsed', [ animate('0.1s ease-in-out') ]),
      transition('collapsed => expanded', [ animate('0.1s ease-in-out') ]), 
    ])
  ]
})
export class ExpandableListComponent implements OnInit {

  @ContentChild('listItem', { static: true}) listItem: TemplateRef<any>;

  @Input() data: Array<IExpandableListItem>;

  public expandOnHover: boolean = false;
  @Input('onHover') set onHover(value) {
    this.expandOnHover = coerceBooleanProperty(value);
  } 

  public dataForView: Array<IExpandableListItem> = [];

  constructor() { }

  ngOnInit() {
    if (Array.isArray(this.data)) this.dataForView = this.data;
  }

  ngOnChanges() {
    if (Array.isArray(this.data)) this.dataForView = this.data;
  }

  public toggleItem(event: Event, item: IExpandableListItem, forHoover?: boolean): void {
    event.preventDefault();
    if (item.settled === true) return;
    if (forHoover) {
      item.expanded = event.type === 'mouseenter';
    } else {
      item.expanded = !item.expanded;
    }
  } 
}


