import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from "@angular/forms";
import {of, timer} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {AccountService} from "../../account/account.service";

export function validateEmailExist(accountService: AccountService): AsyncValidatorFn {
  return control => timer(500).pipe(
    switchMap(() => {
      if (!control.value) return of(null);
      return accountService.checkEmailExist(control.value).pipe(map(res => res ? {emailExists: true} : null));
    })
  );
}

export function confirmPassword(controllerName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const otherControllerValue = control.parent?.get(controllerName)?.value;
    if (control.value === otherControllerValue) return null;
    return {wrongConfirm: true}
  };
}
