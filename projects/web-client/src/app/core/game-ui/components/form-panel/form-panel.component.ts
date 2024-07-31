import { Component, Input, OnInit, Output } from '@angular/core';
import { IFormPanel } from '../../interfaces/form-panel.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-panel',
  templateUrl: './form-panel.component.html',
  styleUrls: ['./form-panel.component.scss']
})
export class FormPanelComponent implements OnInit, IFormPanel {

  @Input() range: { from: number, to: number } = { from: 0, to: 100 };

  @Output() onSettlement$: Subject<number> = new Subject();

  public value: number = 0;

  constructor() { }
  confirm(): void {
    this.onSettlement$.next(this.value);
  }
  decline(): void {
    this.onSettlement$.next(this.value);
  }

  ngOnInit(): void {
  }

}
