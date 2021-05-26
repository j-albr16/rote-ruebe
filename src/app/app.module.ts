import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {authFactory, AuthService} from '@core/services/index';
import {AuthInterceptor} from '@core/interceptor/auth.interceptor';
import {ErrorInterceptor} from '@core/interceptor/error.interceptor';
import {JsonInterceptor} from '@core/interceptor/json.interceptor';
import {RoutingModule} from '@core/utils/routing/routing.module';
import {CoreModule} from '@core/core.module';
import AppHttpClient, {appHttpClientCreator} from '@core/utils/app-http-client';
import {CookieService} from '@core/services/cookie.service';
import DynamicForm, {appDynamicFormGenerator} from '@core/utils/form/dynamic-form';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from '@core/utils/material/material.module';
import {FeaturesModule} from '@features/features.module';

const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: JsonInterceptor, multi: true}
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    CoreModule,
    FeaturesModule
  ],
  providers: [
    AuthService,
    CookieService,
    httpInterceptorProviders,
    {provide: AppHttpClient, useFactory: appHttpClientCreator, deps: [HttpClient]},
    {provide: APP_INITIALIZER, useFactory: authFactory, deps: [AuthService]},
    {provide: DynamicForm, useFactory: appDynamicFormGenerator, deps: [FormBuilder]}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
