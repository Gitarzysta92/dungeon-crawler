import { Component, OnInit, Output } from '@angular/core';
import { IConfirmationPanel } from '../../interfaces/confirmation-panel.interface';
import { Subject } from 'rxjs';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit, IConfirmationPanel {

  @Output() onSettlement$: Subject<boolean> = new Subject();

  constructor() { }
  confirm(): void {
    this.onSettlement$.next(true);
  }
  decline(): void {
    this.onSettlement$.next(false);
  }

  ngOnInit(): void {
  }

}
