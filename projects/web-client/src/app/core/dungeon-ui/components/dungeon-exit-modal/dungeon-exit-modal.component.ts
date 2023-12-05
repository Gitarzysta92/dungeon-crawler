import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from 'src/app/shared/dialogs/api';

@Component({
  selector: 'app-dungeon-exit-modal',
  templateUrl: './dungeon-exit-modal.component.html',
  styleUrls: ['./dungeon-exit-modal.component.scss']
})
export class DungeonExitModalComponent implements OnInit {

  constructor(
    private readonly _dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private readonly _data: {
      accept: () => void,
      reject: () => void
    }
  ) { }

  ngOnInit(): void {
    this._dialogRef.afterClosed$
      .subscribe(makeDecision => {
        makeDecision ? makeDecision() : this._data.reject()
      });
  }

  stayInGame(): void {
    this._dialogRef.close(() => this._data.reject());
  }

  exitGame(): void {
    this._dialogRef.close(() => this._data.accept());
  }

}
