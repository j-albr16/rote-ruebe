import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../../../app.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {AuthPageComponent} from '../../../features/auth/components/auth-page/auth-page.component';
import ExchangeObject from '@core/models/exchange-object';
import AppHttpClient from '@core/utils/app-http-client';

const routes: Routes = [
  {path: 'dashboard', component: AuthPageComponent},
  {path: 'social', component: AuthPageComponent},
  {path: 'exchange-objects', component: AuthPageComponent},
  {path: 'auth', component: AuthPageComponent},
  {path: '', component: ExchangeObject, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
  {path: ''}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class RoutingModule {
}
