import {Injectable} from "@angular/core";
import {Actions, concatLatestFrom, createEffect, ofType} from "@ngrx/effects";
import {BasketService} from "../../basket/basket.service";
import {catchError, map, mergeMap, take} from "rxjs/operators";
import {of} from "rxjs";
import {createBasketIntent, setBasket, updateDeliveryMethodId} from "../actions/basketItems.action";
import {
  addToBasket,
  decrementItem,
  incrementItem,
  loadBasket,
  removeItem,
  setDeliveryMethodId
} from "./effects.actions";
import {Store} from "@ngrx/store";
import {State} from "../index";
import {IBasket} from "../../shared/models/basket";


@Injectable()
export class BasketEffects {
  constructor(private actions$: Actions, private basketService: BasketService, private store: Store<State>) {
  }

  loadBasket = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBasket),
      mergeMap(() => this.basketService.loadBasket().pipe(
        map(basket => setBasket({basket})),
        catchError(err => of({type: 'ErrorHandler', error: err}))
      ))
    )
  );

  addToBasket = createEffect(() => this.actions$.pipe(
    ofType(addToBasket),
    mergeMap((action) => this.store.select(s => s.basket).pipe(
      take(1),
      mergeMap(basket => this.basketService.addItemToBasket(basket, action.item, action.quantity).pipe(
        map(basket => setBasket({basket})),
        catchError(err => of({type: 'ErrorHandler', error: err}))
      ))
    ))
  ));

  incrementItem = createEffect(() => this.actions$.pipe(
    ofType(incrementItem),
    mergeMap(action => this.store.select(s => s.basket).pipe(
      take(1),
      mergeMap(basket => this.basketService.incrementItem(basket, action.item).pipe(
        map(basket => setBasket({basket}))
      ))
    ))
  ));

  decrementItem = createEffect(() => this.actions$.pipe(
    ofType(decrementItem),
    mergeMap(action => this.store.select(s => s.basket).pipe(
      take(1),
      mergeMap(basket => this.basketService.decrementItem(basket, action.item).pipe(
        map(basket => setBasket({basket}))
      ))
    ))
  ));

  removeItem = createEffect(() => this.actions$.pipe(
    ofType(removeItem),
    mergeMap(action => this.store.select(s => s.basket).pipe(
      take(1),
      mergeMap(basket => this.basketService.removeItem(basket, action.itemId).pipe(
        map(basket => setBasket({basket}))
      ))
    ))
  ));

  creteIntent = createEffect(() => this.actions$.pipe(
    ofType(createBasketIntent),
    concatLatestFrom(() => this.store.select(s => s.basket)),
    mergeMap(([action, basket]) => this.basketService.createPaymentIntent(basket.id)
      .pipe(
        map(basket => setBasket({basket})),
        catchError(err => of({type: 'ErrorHandler', error: err}))
      ))
  ));


  setDelivery = createEffect(() => this.actions$.pipe(
    ofType(setDeliveryMethodId),
    concatLatestFrom(() => this.store.select(s => s.basket)),
    mergeMap(([action, basket]) => {
      let newBasket: IBasket = {
        id: basket.id,
        deliveryMethodId: action.deliveryMethodId,
        clientSecret: basket.clientSecret,
        items: [...basket.items],
        paymentIntentId: basket.paymentIntentId
      };
      return this.basketService.updateBasket(newBasket)
        .pipe(
          map(basket => updateDeliveryMethodId({deliveryMethodId: action.deliveryMethodId})),
          catchError(err => of({type: 'ErrorHandler', error: err}))
        )
    })
  ));

}
