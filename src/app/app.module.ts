import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from '@core/services/index';
import {AuthInterceptor} from '@core/interceptor/auth.interceptor';
import {ErrorInterceptor} from '@core/interceptor/error.interceptor';
import {JsonInterceptor} from '@core/interceptor/json.interceptor';
import {AuthModule} from './features/auth/auth.module';
import {SharedModule} from '@shared/shared.module';
import {RoutingModule} from '@core/utils/routing/routing.module';
import {CoreModule} from '@core/core.module';

const httpInterceptorProviders = [
  {provider: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provider: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  {provider: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true}
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    SharedModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [
    AuthService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
