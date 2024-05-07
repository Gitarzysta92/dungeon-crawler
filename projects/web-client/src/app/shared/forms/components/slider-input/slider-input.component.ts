import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'slider-input',
  templateUrl: './slider-input.component.html',
  styleUrls: ['./slider-input.component.scss']
})
export class SliderInputComponent implements OnInit {

  @Input() value: number = 0

  @Output() valueChange = new EventEmitter<number>()

  constructor() { }

  ngOnInit(): void {
  }

  public getPercentageWidth(e: any) {
    return `${e.value}%`
  }

}
