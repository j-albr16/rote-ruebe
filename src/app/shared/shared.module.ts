import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {AuthFormComponent} from '../features/auth/components/auth-form/auth-form.component';
import {AuthComponent} from '../features/auth/auth.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '@core/interceptor/auth.interceptor';
import {ErrorInterceptor} from '@core/interceptor/error.interceptor';
import {JsonInterceptor} from '@core/interceptor/json.interceptor';
import {AuthModule} from '../features/auth/auth.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class SharedModule {
}
