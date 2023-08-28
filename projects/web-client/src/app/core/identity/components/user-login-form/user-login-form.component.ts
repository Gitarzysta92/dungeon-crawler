import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICONS, IconsToken } from 'src/app/shared/icons/constants/icons';
import { ILoginEvent } from '../../models/login-event';


@Component({
  selector: 'user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {

  @Output() onSubmit: EventEmitter<ILoginEvent> = new EventEmitter(); 

  public processing: boolean = false;

  constructor(
    @Inject(IconsToken) public readonly icon: typeof ICONS
  ) {
  }

  ngOnInit(): void {
  }

  public submitForm(form: FormGroup): void {
    if (form.valid) {
      this.processing = true;
      this.onSubmit.next({ 
        ...form.value, 
        resolve: () => this.processing = false,
        reject: () => {
          this.processing = false
          form.get('password').setValue(null, { emitEvent: false });
        },
      });
    }  
  }
}
