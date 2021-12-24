import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {CheckoutService} from "../checkout.service";
import {IDeliveryMethod} from "../../shared/models/deliveryMethod";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {Observable} from "rxjs";
import {setDeliveryMethodId} from "../../store/effects/effects.actions";

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  @Output() shippingPrice = new EventEmitter<number>();
  deliveryMethods: Observable<IDeliveryMethod[]>;

  constructor(private checkoutService: CheckoutService, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.deliveryMethods = this.checkoutService.getDeliveryMethods()
  }

  setShippingPrice(method: IDeliveryMethod) {
    this.shippingPrice.emit(method.price);
    this.store.dispatch(setDeliveryMethodId({deliveryMethodId: method.id}));
  }
}
