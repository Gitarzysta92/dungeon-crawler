import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'burger-button',
  template: `<div></div>`,
  styleUrls: ['./burger-button.component.scss'],
  host: {
    '[class.focused]': 'focused',
    '[class.dark-mode]': 'dark'
  }
})
export class BurgerButtonComponent implements OnInit {

  @Input() focused: boolean = false;

  @Input() set darkMode(_: void) { this.dark = true }
  
  public dark: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
