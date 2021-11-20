import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {loginUserAction} from "../../store/effects/effects.actions";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  returnUrl: string;
  storeSubscription: Subscription;

  constructor(private store: Store<State>, private activatedRoute: ActivatedRoute, private router: Router) {
  }


  ngOnInit(): void {
    this.storeSubscription = this.store.select(s => s.user).subscribe(user => {
      if (user) this.router.navigateByUrl('/shop');
    });
    this.createLoginForm();
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.store.dispatch(loginUserAction({credentials: this.loginForm.value, returnUrl: this.returnUrl}));
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }
}
