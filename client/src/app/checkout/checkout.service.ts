import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {IDeliveryMethod} from "../shared/models/deliveryMethod";
import {map, mergeMap} from "rxjs/operators";
import {IOrder, IOrderRequirement, IOrderToCreate} from "../shared/models/order";
import {StripeCardNumberElement} from "@stripe/stripe-js";
import {StripeService} from "ngx-stripe";


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = environment.baseUrl;
  card: StripeCardNumberElement

  constructor(private http: HttpClient, private stripe: StripeService) {
  }

  createOrder(order: IOrderToCreate, clientSecret: string, requirement: IOrderRequirement) {
    return this.http.post<IOrder>(`${this.baseUrl}orders`, order).pipe(
      mergeMap(order =>
        this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.card,
            billing_details: {
              name: requirement.nameOnCard
            }
          }
        })
      )
    );
  }

  getDeliveryMethods() {
    return this.http.get<IDeliveryMethod[]>(`${this.baseUrl}orders/deliveryMethods`).pipe(
      map(
        dm => dm.sort((a, b) => b.price - a.price)
      )
    );
  }
}
