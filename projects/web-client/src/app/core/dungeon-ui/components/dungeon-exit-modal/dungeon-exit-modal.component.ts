import { Component, Inject, OnInit } from '@angular/core';
import { DIALOG_DATA, DialogRef } from 'src/app/shared/dialogs/api';

@Component({
  selector: 'app-dungeon-exit-modal',
  templateUrl: './dungeon-exit-modal.component.html',
  styleUrls: ['./dungeon-exit-modal.component.scss']
})
export class DungeonExitModalComponent {

  constructor(
    private readonly _dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private readonly _data: {
      accept: () => void,
      reject: () => void
    }
  ) { }

  stayInGame(): void {
    this._data.reject();
    this._dialogRef.close();
  }

  exitGame(): void {
    this._data.accept();
    this._dialogRef.close();
  }

}
