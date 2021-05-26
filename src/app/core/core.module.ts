import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from '@core/components/nav-bar/nav-bar.component';
import {ProfileMenuComponent} from './components/profile-menu/profile-menu.component';
import {RouterModule} from '@angular/router';
import {CookieConsentComponent} from './components/cookie-consent/cookie-consent.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthPageComponent} from '@core/components/auth/auth-page/auth-page.component';
import {AuthFormComponent} from '@core/components/auth/auth-form/auth-form.component';
import {BrowserModule} from '@angular/platform-browser';
import {RoutingModule} from '@core/utils/routing/routing.module';
import {MaterialModule} from '@core/utils/material/material.module';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [NavBarComponent, ProfileMenuComponent, CookieConsentComponent, AuthPageComponent, AuthFormComponent],
  imports: [
    CommonModule,
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // Material Modules
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [
    NavBarComponent
  ],
})
export class CoreModule {
}
