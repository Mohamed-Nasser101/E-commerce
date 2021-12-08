import {Component, OnInit} from '@angular/core';
import {OrderService} from "../order.service";
import {ActivatedRoute} from "@angular/router";
import {IOrder} from "../../shared/models/order";
import {BreadcrumbService} from "xng-breadcrumb";
import {Observable, of} from "rxjs";
import {IBasket, IBasketTotals} from "../../shared/models/basket";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderId: number;
  order: IOrder;
  basketClone: Observable<IBasket>;
  totals: Observable<IBasketTotals>;

  constructor(private orderService: OrderService, private route: ActivatedRoute, private breadcrumb: BreadcrumbService) {
    this.orderId = +this.route.snapshot.paramMap.get('id');
    this.breadcrumb.set('@orderDetails', ' ');
  }

  ngOnInit(): void {
    this.orderService.getOrder(this.orderId).subscribe(order => {
      this.breadcrumb.set('@orderDetails', `Order# ${order.id} - ${order.status}`);
      this.order = order;
      this.basketClone = this.orderService.convertToBasketItems(this.order.orderItems);
      this.totals = this.getTotals(order);
    });
  }

  getTotals(order: IOrder) {
    return of({
      total: order.total,
      subtotal: order.subtotal,
      shipping: order.shippingPrice
    });
  }
}
