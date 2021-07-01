import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services';
import {AppRoutes, navRoute} from '@core/utils/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuth) {
      this.router.navigate([navRoute(AppRoutes.Auth), {authState: 'SignIn'}]).then(succeeded => {
        if (!succeeded) {
          console.log('Redirect did not exceed')
        }
      });
      return false;
    }
    return true;
  }
}
