import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "../../shared/models/product";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {addToBasket} from "../../store/effects/effects.actions";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: IProduct;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
  }

  addItemToBasket() {
    this.store.dispatch(addToBasket({item: this.product, quantity: 1}));
  }
}
