import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<State>, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.select(s => s.user).pipe(map(user => {
      if (user) return true;
      this.router.navigate(['account/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }));
  }

}
