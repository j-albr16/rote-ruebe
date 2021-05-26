import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@core/guards/auth.guard';
import {AuthPageComponent} from '../../components/auth/auth-page/auth-page.component';
import ExchangeObject from '@core/models/exchange-object';
import {MyExchangeObjectFormComponent} from '@features/my-exchange-object/my-exchange-object-form/my-exchange-object-form.component';

const routes: Routes = [
  {path: 'dashboard', component: AuthPageComponent},
  {path: 'social', component: AuthPageComponent},
  {path: 'exchange-objects', component: AuthPageComponent},
  {path: 'exchange-object-form', component: MyExchangeObjectFormComponent},
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
