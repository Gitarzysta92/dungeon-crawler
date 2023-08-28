import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { CheckboxInputComponent } from 'src/app/shared/forms/components/checkbox-input/checkbox-input.component';
import { TextInputConfig } from 'src/app/shared/forms/components/text-input/text-input.component';
import { ModalService } from 'src/app/shared/dialogs/services/modal/modal.service';
import { AccountValidators } from 'src/app/shared/forms/validators/account.validator';
import { CustomValidators } from 'src/app/shared/forms/validators/custom.validator';
import { ProfileValidators } from 'src/app/shared/forms/validators/unique-profile.validator';
import { AuthPolicies, PoliciesToken } from '../../constants/policies';
import { TermsAndConditionsComponent } from '../terms-and-conditions/terms-and-conditions.component';
import { IRegistrationEvent } from '../../models/registration-event';

@Component({
  selector: 'registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
  providers: [ ProfileValidators, AccountValidators, ModalService ]
})
export class RegistrationFormComponent {

  @Output() onSubmit: EventEmitter<IRegistrationEvent> = new EventEmitter(); 

  public processing: boolean = false;
  public formConfig: { [key: string]: TextInputConfig };

  constructor(
    private readonly _profileValidators: ProfileValidators,
    private readonly _accountValidators: AccountValidators,
    private readonly _modalService: ModalService,
    @Inject(PoliciesToken) public readonly policies: AuthPolicies
  ) {
    this.formConfig = {
      nickname: {
        asyncValidators: [ this._profileValidators.unique('nickname') ],
        validators: [ Validators.minLength(4), Validators.maxLength(16) ]
      },
      email: {
        asyncValidators: [ this._accountValidators.emailUniqueness.bind(this._accountValidators) ],
        validators: [ CustomValidators.email ]
      },
      password: {
        validators: [
          Validators.minLength(8),
          Validators.maxLength(24)
          //Validators.pattern(/[A-Z]/g), 
          //Validators.pattern(/[!@#]/gi)
        ]
      }
    };
  }

  public submitForm(form: FormGroup): void {
    if (form.valid) {
      this.processing = true;
      this.onSubmit.next({ 
        ...form.value, 
        resolve: () => this.processing = false,
        reject: () => this.processing = false,
      });
    }  
  }

  public openTermsAndConditionsModal(input: CheckboxInputComponent): void {
    //input.control.setValue()

    this._modalService.open(TermsAndConditionsComponent,
      {
        accept: () => input.control.setValue(true),
        reject: () => input.control.setValue(false)
      },
      {
        maxWidth: "500px",
        maxHeight: "1000px",
      }
    );
  }
}



