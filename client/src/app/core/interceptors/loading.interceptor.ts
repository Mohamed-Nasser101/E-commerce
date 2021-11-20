import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BusyService} from "../services/busy.service";
import {finalize} from "rxjs/operators";


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private busy: BusyService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('checkemail')) {
      this.busy.busy();
    }
    return next.handle(request).pipe(
      finalize(() => this.busy.idle())
    );
  }
}
