import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IUser} from "../shared/models/user";
import {map, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(value: any) {
    return this.http.post<IUser>(`${this.baseUrl}account/login`, value.credentials).pipe(
      tap((user: IUser) => {
        if (user) {
          this.handleAuthorization(user, value.returnUrl);
        }
      })
    );
  }

  register(value: any) {
    return this.http.post<IUser>(`${this.baseUrl}account/register`, value).pipe(
      tap(user => {
        if (user) {
          this.handleAuthorization(user, '/shop');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

  initiateLogin() {
    const token = localStorage.getItem('token');
    if (!token) return of(null);

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IUser>(`${this.baseUrl}account`, {headers}).pipe(
      map(user => {
        if (!user) return null;
        localStorage.setItem('token', user.token);
        return user;
      })
    );
  }

  checkEmailExist(email: string) {
    return this.http.get<boolean>(`${this.baseUrl}account/checkemail?email=${email}`);
  }

  private handleAuthorization(user: IUser, returnUrl: string) {
    localStorage.setItem('token', user.token);
    this.router.navigateByUrl(returnUrl || '/shop');
  }
}
