import {Injectable} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyCount = 0;

  constructor(private spinner: NgxSpinnerService) {
  }

  busy() {
    this.busyCount++;
    this.spinner.show( undefined,{
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333',
      type: 'timer'
    });
  }

  idle() {
    this.busyCount--;
    if (this.busyCount <= 0) {
      this.busyCount = 0;
      this.spinner.hide();
    }
  }
}
