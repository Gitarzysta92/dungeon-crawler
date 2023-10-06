import { Component, Inject, OnInit } from '@angular/core';
import { DialogRef, DIALOG_DATA } from 'src/app/shared/dialogs/api';

@Component({
  selector: 'gameplay-caption',
  templateUrl: './gameplay-caption.component.html',
  styleUrls: ['./gameplay-caption.component.scss']
})
export class GameplayCaptionComponent implements OnInit {
  public text: any;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.text = this.data.message
    setTimeout(() => this.dialogRef.close(), 3000);
  }
  

}
