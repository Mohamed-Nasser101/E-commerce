import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {BasketService} from "../../basket/basket.service";
import {makeOrderAction} from "./effects.actions";
import {catchError, map, mergeMap, take} from "rxjs/operators";
import {CheckoutService} from "../../checkout/checkout.service";
import {setBasket} from "../actions/basketItems.action";
import {of} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../index";
import {IOrderToCreate} from "../../shared/models/order";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions, private basketService: BasketService, private checkoutService: CheckoutService,
              private toastr: ToastrService, private store: Store<State>, private router: Router) {
  }

  makeOrder = createEffect(() => this.actions$.pipe(
    ofType(makeOrderAction),
    concatLatestFrom(() => this.store.select(s => s.basket)),
    mergeMap(([action, basket]) => {
      const order: IOrderToCreate = {
        basketId: basket.id,
        deliveryMethodId: action.deliveryMethodId,
        shipToAddress: action.shipToAddress
      };
      return this.checkoutService.createOrder(order).pipe(
        map(order => {
          this.basketService.removeLocalBasket();
          this.toastr.success('Order Created Successfully');
          this.router.navigate(['checkout/success'], {state: order});
          return setBasket({basket: null})
        }),
        catchError(err => of({type: 'ErrorHandler', error: err}))
      )
    })
  ));
}
