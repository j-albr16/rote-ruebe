import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@core/guards/auth.guard';
import {AuthPageComponent} from '../../components/auth/auth-page/auth-page.component';
import {AppRoutes} from '@core/utils/enums';
import {HomePageComponent} from '@core/components/home/home-page/home-page.component';


const routes: Routes = [
  {path: AppRoutes.Dashboard, component: HomePageComponent, canActivate: [AuthGuard]},
  {path: AppRoutes.Social, component: HomePageComponent, canActivate: [AuthGuard]},
  {path: AppRoutes.Home, component: HomePageComponent, canActivate: [AuthGuard]},
  {path: AppRoutes.Auth, component: AuthPageComponent},
  // {path: '', component: HomePageComponent, canActivate: [AuthGuard]},
  {path: '', component: HomePageComponent},
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
