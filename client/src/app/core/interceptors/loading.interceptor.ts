import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BusyService} from "../services/busy.service";
import {finalize} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  notShowLoad = environment.notShowLoad;

  constructor(private busy: BusyService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.notShowLoad.some(link => request.url.includes(link))) {
      this.busy.busy();
    }
    return next.handle(request).pipe(
      finalize(() => this.busy.idle())
    );
  }
}
