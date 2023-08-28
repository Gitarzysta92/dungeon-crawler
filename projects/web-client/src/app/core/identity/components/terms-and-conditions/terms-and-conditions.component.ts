import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogRef, DIALOG_DATA } from 'src/app/shared/dialogs/api';

import { TERMS_AND_CONDITIONS_URL } from '../../constants/terms-and-conditions-url';

@Component({
  selector: 'terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent {

  get termsAndConditionsUrl() { return this._sanitizer.bypassSecurityTrustResourceUrl(TERMS_AND_CONDITIONS_URL) }

  constructor(
    private readonly _sanitizer: DomSanitizer,
    private readonly _dialogRef: DialogRef,
    @Inject(DIALOG_DATA) private readonly _data: {
      accept: () => void,
      reject: () => void
    }
  ) { }

  public accept(): void {
    this._data.accept();
    this._dialogRef.close();
  }

  public reject(): void {
    this._data.reject();
    this._dialogRef.close();
  }
}
