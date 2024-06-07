import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[flare-button]',
  templateUrl: './flare-button.component.html',
  styleUrls: ['./flare-button.component.scss'],
  host: { "[class.blank-btn]": "isBlank" },
})
export class FlareButtonComponent implements OnInit {
  constructor() { }
  ngOnInit(): void { }
}
