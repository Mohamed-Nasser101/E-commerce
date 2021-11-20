import {AccountService} from '../account.service';
import {Store} from '@ngrx/store';
import {Validators} from '@angular/forms';
import {FormGroup} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {State} from 'src/app/store';
import {registerUserAction} from 'src/app/store/effects/effects.actions';
import {confirmPassword, validateEmailExist} from "../../shared/helpers/customValidators";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<State>, private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [
        null,
        [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')],
        [validateEmailExist(this.accountService)]
      ],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, confirmPassword('password')]],
    });
  }

  onSubmit() {
    this.store.dispatch(registerUserAction(this.registerForm.value));
  }
}
