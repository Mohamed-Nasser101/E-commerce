import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { CoreModule } from "./core/core.module";
import { HomeModule } from "./home/home.module";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import { ToastrModule } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";
import { LoadingInterceptor } from "./core/interceptors/loading.interceptor";
import { StoreModule } from "@ngrx/store";
import { reducers } from "./store";
import { EffectsModule } from "@ngrx/effects";
import { BasketEffects } from "./store/effects/basket.effects";
import { UserEffects } from "./store/effects/user.effects";
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    NgxSpinnerModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([BasketEffects, UserEffects])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
