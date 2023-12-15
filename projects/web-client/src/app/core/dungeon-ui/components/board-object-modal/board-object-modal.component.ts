import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from 'src/app/shared/dialogs/api';

@Component({
  selector: 'board-object-modal',
  templateUrl: './board-object-modal.component.html',
  styleUrls: ['./board-object-modal.component.scss']
})
export class BoardObjectModalComponent implements OnInit {

  constructor(
    private readonly _dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private readonly _data: any
  ) { }

  ngOnInit(): void {
    console.log(this._data);
  }

}
