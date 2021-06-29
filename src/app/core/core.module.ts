import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from '@core/components/nav-bar/nav-bar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthPageComponent} from '@core/components/auth/auth-page/auth-page.component';
import {AuthFormComponent} from '@core/components/auth/auth-form/auth-form.component';
import {BrowserModule} from '@angular/platform-browser';
import {RoutingModule} from '@core/utils/routing/routing.module';
import {MatNativeDateModule} from '@angular/material/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '../shared/shared.module';
import {UserTagComponent} from './components/auth/user-tag/user-tag.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';
import { BellComponent } from './components/auth/bell/bell.component';
import { NotificationPopupComponent } from './components/auth/notification-popup/notification-popup.component';

@NgModule({
  declarations: [NavBarComponent, AuthPageComponent, AuthFormComponent, UserTagComponent, BellComponent, NotificationPopupComponent],
  imports: [
    CommonModule,
    RoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    SharedModule,
    FormsModule,
    AngularSvgIconModule.forRoot(),
    MatIconModule,
  ],
  providers: [
    MatIconRegistry
  ],
  exports: [
    NavBarComponent
  ],
})
export class CoreModule {
}
