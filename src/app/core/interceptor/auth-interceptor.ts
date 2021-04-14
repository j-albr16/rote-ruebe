import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from '@core/services';
import {Observable} from 'rxjs';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private auth: AuthService) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getAuthToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken),
    });
    return next.handle(authReq);
  }
}
