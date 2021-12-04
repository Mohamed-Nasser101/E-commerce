import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IDeliveryMethod} from "../shared/models/deliveryMethod";
import {map} from "rxjs/operators";
import {IAddress} from "../shared/models/address";
import {IOrder, IOrderToCreate} from "../shared/models/order";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  createOrder(order: IOrderToCreate) {
    return this.http.post<IOrder>(`${this.baseUrl}orders`, order);
  }

  getDeliveryMethods() {
    return this.http.get<IDeliveryMethod[]>(`${this.baseUrl}orders/deliveryMethods`).pipe(
      map(
        dm => dm.sort((a, b) => b.price - a.price)
      )
    );
  }


}
