import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from 'src/app/shared/dialogs/api';

@Component({
  selector: 'app-dungeon-card-acknowledgement-modal',
  templateUrl: './dungeon-card-acknowledgement-modal.component.html',
  styleUrls: ['./dungeon-card-acknowledgement-modal.component.scss']
})
export class DungeonCardAcknowledgementModalComponent implements OnInit {
  
  public cardName: string;

  constructor(
    private readonly _dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private readonly _data: {
      card: any,
      acknowledge: () => void
    }
  ) { }

  ngOnInit(): void {
    this._dialogRef.afterClosed$
      .subscribe(() => this._data.acknowledge())

    this.cardName = this._data.card.informative.name;
    // setTimeout(() => {
    //   this.acknowledge();
    // }, 3000)
  }


  public acknowledge(): void {
    this._data.acknowledge();
    this._dialogRef.close();
  }


}
