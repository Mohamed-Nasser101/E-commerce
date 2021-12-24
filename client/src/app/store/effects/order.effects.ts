import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {BasketService} from "../../basket/basket.service";
import {makeOrderAction} from "./effects.actions";
import {catchError, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {CheckoutService} from "../../checkout/checkout.service";
import {setBasket} from "../actions/basketItems.action";
import {of, throwError} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../index";
import {IOrderToCreate} from "../../shared/models/order";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {StripeError} from "@stripe/stripe-js";
import {endSubmitting, startSubmitting} from "../actions/submittingOrder.action";


@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private basketService: BasketService, private checkoutService: CheckoutService,
              private toastr: ToastrService, private store: Store<State>, private router: Router) {
  }

  makeOrder = createEffect(() => this.actions$.pipe(
    ofType(makeOrderAction),
    concatLatestFrom(() => this.store.select(s => s.basket)),
    mergeMap(([{orderRequirement}, basket]) => {
      const order: IOrderToCreate = {
        basketId: basket.id,
        deliveryMethodId: orderRequirement.deliveryMethodId,
        shipToAddress: orderRequirement.shipToAddress
      };
      this.store.dispatch(startSubmitting());
      return this.checkoutService.createOrder(order, basket.clientSecret, orderRequirement).pipe(
        switchMap(result => {
          this.store.dispatch(endSubmitting());
          if (result.paymentIntent) {
            return this.basketService.removeBasket().pipe(
              switchMap(() => {
                this.toastr.success('Order Created Successfully');
                this.router.navigate(['checkout/success'], {state: order});
                return of(setBasket({basket: null}));
              })
            );
          }
          return throwError(result.error)
        }),
        catchError(err => of({type: 'StripeErrorHandler', error: err}))
      )
    })
  ));

  StripeErrorHandler = createEffect(() => this.actions$.pipe(
    ofType('StripeErrorHandler'),
    tap(({error}: { error: StripeError }) => {
      this.toastr.error(error.message)
    })
  ), {dispatch: false});
}
