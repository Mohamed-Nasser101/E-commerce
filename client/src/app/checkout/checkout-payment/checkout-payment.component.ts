import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {makeOrderAction} from "../../store/effects/effects.actions";

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
  }

  submitOrder() {
    const deliveryMethodId = +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value;
    const shipToAddress = this.checkoutForm.get('addressForm').value;
    this.store.dispatch(makeOrderAction({deliveryMethodId, shipToAddress}));
  }
}
