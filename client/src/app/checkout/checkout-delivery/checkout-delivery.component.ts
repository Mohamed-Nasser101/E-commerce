import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CheckoutService} from "../checkout.service";
import {IDeliveryMethod} from "../../shared/models/deliveryMethod";

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  @Output() shippingPrice = new EventEmitter<number>();
  deliveryMethods: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService) {
  }

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe(
      dm => this.deliveryMethods = dm
      , console.log
    );
  }

  setShippingPrice(price: number) {
    this.shippingPrice.emit(price);
  }
}
