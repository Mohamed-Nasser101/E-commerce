import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account/account.service";
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {State} from "../store";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  checkoutForm: FormGroup;
  deliveryPrice = 0;
  // subscription: Subscription;

  constructor(private fb: FormBuilder, private accountService: AccountService, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressValues();
    // this.subscription = this.store.select(x => x.basket).pipe(map(b => b.deliveryMethodId))
    //   .subscribe(value => {
    //     if (value) {
    //       this.checkoutForm.get('deliveryForm').get('deliveryMethod').patchValue(value.toString());
    //     }
    //   });
  }

  createCheckoutForm() {
    this.checkoutForm = this.fb.group({
      addressForm: this.fb.group({
        firstName: [null, [Validators.required]],
        lastName: [null, [Validators.required]],
        street: [null, [Validators.required]],
        city: [null, [Validators.required]],
        state: [null, [Validators.required]],
        zipCode: [null, [Validators.required]]
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: [null, [Validators.required]]
      }),
      paymentForm: this.fb.group({
        nameOnCard: [null, [Validators.required]]
      })
    });
  }

  getAddressValues() {
    this.accountService.getUserAddress().subscribe(address => {
      if (address) {
        this.checkoutForm.get('addressForm').patchValue(address);
      }
    }, console.log);
  }

  updatePrice(price: number) {
    this.deliveryPrice = price;
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }
}
