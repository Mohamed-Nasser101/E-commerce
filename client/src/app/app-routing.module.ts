import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./core/not-found/not-found.component";
import {ServerErrorComponent} from "./core/server-error/server-error.component";
import {AuthGuard} from "./core/guards/auth.guard";


const routes: Routes = [
  {path: '', component: HomeComponent, data: {breadcrumb: 'Home'}},
  {path: 'not-found', component: NotFoundComponent, data: {breadcrumb: 'Not Found'}},
  {path: 'server-error', component: ServerErrorComponent, data: {breadcrumb: 'Server Error'}},
  {
    path: 'shop', loadChildren: () => import('./shop/shop.module').then(mod => mod.ShopModule),
    data: {breadcrumb: 'Shop'}
  },
  {
    path: 'basket', loadChildren: () => import('./basket/basket.module').then(mod => mod.BasketModule),
    data: {breadcrumb: 'Basket'}
  },
  {
    path: 'checkout', loadChildren: () => import('./checkout/checkout.module').then(mod => mod.CheckoutModule),
    data: {breadcrumb: 'Checkout'},
    canActivate: [AuthGuard]
  },
  {
    path: 'account', loadChildren: () => import('./account/account.module').then(mod => mod.AccountModule),
    data: {breadcrumb: {skip: true}}
  },
  {
    path: 'orders', loadChildren: () => import('./order/order.module').then(mod => mod.OrderModule),
    data: {breadcrumb: 'Orders'},
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {preloadingStrategy: QuicklinkStrategy})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
