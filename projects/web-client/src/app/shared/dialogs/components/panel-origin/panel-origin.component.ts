import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[panel-origisn]',
  template: `<ng-content #trigger="cdkOverlayOrigin" (click)="open = !open"></ng-content>`,
  styleUrls: ['./panel-origin.component.scss']
})
export class PanelOriginComponent implements OnInit {

  public open: boolean = false;

  @Input() onClick: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
