import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'circle',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `:host { border-radius: 100%; display: inline-block; overflow: hidden; }`
  ]
})
export class CircleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
