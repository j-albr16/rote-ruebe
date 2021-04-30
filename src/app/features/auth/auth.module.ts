import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthFormComponent} from './components/auth-form/auth-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {AuthComponent} from './auth.component';
import {MatButtonModule} from '@angular/material/button';
import {AuthService} from '@core/services';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '@shared/shared.module';
import { AuthPageComponent } from './components/auth-page/auth-page.component';
import AppHttpClient, {appHttpClientCreator} from '@core/utils/app-http-client';
import {HttpClient} from '@angular/common/http';


@NgModule({
  declarations: [AuthFormComponent, AuthComponent, AuthPageComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    AuthService,
    // {provide: AppHttpClient, useFactory: appHttpClientCreator, deps: [HttpClient]},
  ]
})
export class AuthModule {
}
