import { RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {CheckoutSuccessComponent} from "./checkout-success/checkout-success.component";

const routes: Routes = [
  { path: '', component: CheckoutComponent },
  { path: 'success', component: CheckoutSuccessComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CheckoutRoutingModule { }
