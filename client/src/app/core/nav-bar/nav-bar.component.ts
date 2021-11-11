import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {IPagination} from "../../shared/models/pagination";
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {incrementCount} from "../../store/actions/basketCounter.action";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  products: IPagination<IProduct>;
  basketCount$: Observable<number>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.basketCount$ = this.store.select('basketCount');
  }
}
