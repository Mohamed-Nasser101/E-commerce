import {BasketService} from '../../../basket/basket.service';
import {IBasketTotals} from '../../models/basket';
import {Observable} from 'rxjs';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  basketTotals$: Observable<IBasketTotals>;

  @Input() set shippingPrice(value: number) {
    this.basketTotals$ = this.basketService.getTotals(value);
  };

  constructor(private basketService: BasketService) {
  }

  ngOnInit(): void {
     this.basketTotals$ = this.basketService.getTotals(this.shippingPrice);
  }

}
