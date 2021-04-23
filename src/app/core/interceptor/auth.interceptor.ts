import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/index';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth: string = this.auth.getAuth();
    const authRequest = req.clone({
      url: `${environment.apiUrl}${req.url}`,
      headers: req.headers.set('Authorization', auth),
    });
    return next.handle(authRequest);
  }
}
