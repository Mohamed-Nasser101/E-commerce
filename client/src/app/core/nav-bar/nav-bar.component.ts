import {Component, OnInit} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {IPagination} from "../../shared/models/pagination";
import {Observable} from "rxjs";
import {Basket} from "../../shared/models/basket";
import {Store} from "@ngrx/store";
import {State} from "../../store";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  products: IPagination<IProduct>;
  basketCount$: Observable<Basket>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.basketCount$ = this.store.select(s => s.basket);
  }
}
