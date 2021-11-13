import { incrementItem, decrementItem, removeItem } from './../store/effects/effects.actions';
import { Store } from '@ngrx/store';
import { IBasket, IBasketItem } from './../shared/models/basket';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { State } from '../store';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket$: Observable<IBasket>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.basket$ = this.store.select(s => s.basket);
  }

  incrementItem(item: IBasketItem) {
    this.store.dispatch(incrementItem({ item }));
  }

  decrementItem(item: IBasketItem) {
    this.store.dispatch(decrementItem({ item }));
  }

  removeItem(itemId: number) {
    this.store.dispatch(removeItem({ itemId }));
  }

}
