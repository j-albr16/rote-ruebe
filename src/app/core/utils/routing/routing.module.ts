import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../../../app.component';
import {AuthGuard} from '@core/guards/auth.guard';
import {AuthPageComponent} from '../../../features/auth/components/auth-page/auth-page.component';

const routes: Routes = [
  {path: 'dashboard', component: AppComponent},
  {path: 'social', component: AppComponent},
  {path: 'exchange-objects', component: AppComponent},
  {path: 'auth', component: AuthPageComponent},
  {path: '', component: AppComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: ''},
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule,
  ]
})
export class RoutingModule {
}
