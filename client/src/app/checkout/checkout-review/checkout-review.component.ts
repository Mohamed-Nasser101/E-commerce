import {Component, Input, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {State} from "../../store";
import {createBasketIntent} from "../../store/actions/basketItems.action";
import {CdkStepper} from "@angular/cdk/stepper";

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper: CdkStepper;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
  }

  createPaymentIntent() {
    this.store.dispatch(createBasketIntent());
    this.appStepper.next();
  }

}
