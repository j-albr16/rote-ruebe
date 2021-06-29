import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@core/guards/auth.guard';
import {AuthPageComponent} from '../../components/auth/auth-page/auth-page.component';
import ExchangeObject from '@core/models/exchange-object';

const routes: Routes = [
  {path: 'dashboard', component: AuthPageComponent},
  {path: 'social', component: AuthPageComponent},
  {path: 'exchange-objects', component: AuthPageComponent},
  {path: 'auth', component: AuthPageComponent},
  {path: '', component: ExchangeObject, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''}
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
