import {State} from './../../store/index';
import {Store} from '@ngrx/store';
import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from "xng-breadcrumb";
import {ActivatedRoute} from "@angular/router";
import {IProduct} from "../../shared/models/product";
import {ShopService} from "../shop.service";
import {addToBasket} from 'src/app/store/effects/effects.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  product: IProduct;
  quantity = 1;

  constructor(private shopService: ShopService, private route: ActivatedRoute, private breadcrumb: BreadcrumbService, private store: Store<State>) {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.breadcrumb.set('@productDetails', ' ');
  }

  ngOnInit(): void {
    this.shopService.getProduct(this.productId).subscribe(prod => {
      this.breadcrumb.set('@productDetails', prod.name);
      this.product = prod;
    });
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addItem() {
    this.store.dispatch(addToBasket({item: this.product, quantity: this.quantity}));
  }

}
