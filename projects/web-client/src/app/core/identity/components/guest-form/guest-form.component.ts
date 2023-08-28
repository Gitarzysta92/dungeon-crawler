import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { TextInputConfig } from 'src/app/shared/forms/components/text-input/text-input.component';
import { ProfileValidators } from 'src/app/shared/forms/validators/unique-profile.validator';

@Component({
  selector: 'app-guest-form',
  templateUrl: './guest-form.component.html',
  styleUrls: ['./guest-form.component.scss'],
  providers: [ ProfileValidators ]
})
export class GuestFormComponent implements OnInit {

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();

  public processing: boolean = false;

  public formConfig: { [key: string]: TextInputConfig }

  constructor(
    private readonly _profileValidators: ProfileValidators,
  ) { 
    this.formConfig = {
      nickname: {
        asyncValidators: [ this._profileValidators.unique('nickname') ],
        validators: [ Validators.minLength(4), Validators.maxLength(16) ]
      }
    };
  }

  ngOnInit(): void {
  }

  public submitForm(form: FormGroup): void {
    if (form.valid) {
      this.processing = true;
      this.onSubmit.next({ 
        value: form.value, 
        resolve: () => this.processing = false,
        reject: () => this.processing = false
      });
    }  
  }

}
