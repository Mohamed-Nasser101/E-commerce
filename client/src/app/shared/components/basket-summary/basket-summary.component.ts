import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from "rxjs";
import {IBasket, IBasketItem} from "../../models/basket";
import {Store} from "@ngrx/store";
import {State} from "../../../store";

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
  basket$: Observable<IBasket>;
  @Output() increment = new EventEmitter<IBasketItem>();
  @Output() decrement = new EventEmitter<IBasketItem>();
  @Output() remove = new EventEmitter<number>();
  @Input() isBasket = true;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.basket$ = this.store.select(s => s.basket);
  }

  incrementItem(item: IBasketItem) {
    this.increment.emit(item);
  }

  decrementItem(item: IBasketItem) {
    this.decrement.emit(item);
  }

  removeItem(itemId: number) {
    this.remove.emit(itemId)
  }
}
