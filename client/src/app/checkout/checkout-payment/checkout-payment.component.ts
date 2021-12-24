import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {makeOrderAction} from "../../store/effects/effects.actions";
import {StripeCardCvcComponent, StripeCardExpiryComponent, StripeCardNumberComponent, StripeService} from "ngx-stripe";
import {IOrderRequirement} from "../../shared/models/order";
import {CheckoutService} from "../checkout.service";
import {Observable} from "rxjs";
import {B} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm: FormGroup;
  @ViewChild(StripeCardNumberComponent) cardNumber: StripeCardNumberComponent;
  @ViewChild(StripeCardExpiryComponent) cardExpiry: StripeCardExpiryComponent;
  @ViewChild(StripeCardCvcComponent) cardCvc: StripeCardCvcComponent;
  cardErrors = null;
  submittingOrder: Observable<boolean>;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;

  get paymentComplete() {
    return (this.cardNumberComplete && this.cardCvcComplete
      && this.cardExpiryComplete && this.checkoutForm.get('paymentForm').valid);
  }

  constructor(private stripe: StripeService, private store: Store<State>, private checkoutService: CheckoutService) {
  }


  ngOnInit(): void {
    this.submittingOrder = this.store.select(s => s.submittingOrder);
  }

  onChange(event) {
    if (event.error) {
      this.cardErrors = event.error.message;
    } else {
      this.cardErrors = null;
    }
    switch (event.elementType) {
      case 'cardNumber':
        this.cardNumberComplete = event.complete;
        break;
      case 'cardCvc':
        this.cardCvcComplete = event.complete;
        break;
      case 'cardExpiry':
        this.cardExpiryComplete = event.complete;
        break;
    }
  }

  submitOrder() {
    const deliveryMethodId = +this.checkoutForm.get('deliveryForm').get('deliveryMethod').value;
    const shipToAddress = this.checkoutForm.get('addressForm').value;
    this.checkoutService.card = this.cardNumber.element;  //couldn't send it in the state
    const orderRequirement: IOrderRequirement = {
      deliveryMethodId,
      shipToAddress,
      nameOnCard: this.checkoutForm.get('paymentForm').get('nameOnCard').value
    };
    this.store.dispatch(makeOrderAction({orderRequirement: orderRequirement}));
  }
}
