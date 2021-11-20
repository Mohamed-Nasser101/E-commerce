import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { State } from "../index";
import { AccountService } from "../../account/account.service";
import { initiateLoginAction, loginUserAction, logoutUserAction, registerUserAction } from "./effects.actions";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import { login, logout, register } from "../actions/user.action";
import { of } from "rxjs";


@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private store: Store<State>, private accountService: AccountService, private toastr: ToastrService) {
  }

  loginUser = createEffect(() => this.actions$.pipe(
    ofType(loginUserAction),
    mergeMap(action => this.accountService.login(action).pipe(
      map(user => login({ user })),
      catchError(err => of({ type: 'ErrorHandler', error: err }))
    ))
  ));

  initiateLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(initiateLoginAction),
      mergeMap(() => this.accountService.initiateLogin().pipe(
        map(user => login({ user }))
      ))
    )
  );

  registerUser = createEffect(() => this.actions$.pipe(
    ofType(registerUserAction),
    mergeMap(action => this.accountService.register(action).pipe(
      map(user => register({ user })),
      catchError(err => of({ type: 'ErrorHandler', error: err }))
    ))
  ));

  logoutUser = createEffect(() => this.actions$.pipe(
    ofType(logoutUserAction),
    map(() => {
      this.accountService.logout();
      return logout();
    }),
    catchError((err: any) => of({ type: 'ErrorHandler', error: err }))
  ));

  errorHandler = createEffect(() => this.actions$.pipe(
    ofType('ErrorHandler'),
    tap(({ error }: { error: any }) => {
      const errors = error.errors.reduce((a, err) => a + `- ${err} </br>`, '');
      this.toastr.error(errors, 'Error', { enableHtml: true, timeOut: 1000 * 30 });
    })
  ), { dispatch: false });
}
