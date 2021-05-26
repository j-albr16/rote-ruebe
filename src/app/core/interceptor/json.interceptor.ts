import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {dateParser} from '@core/utils/dateparser';

@Injectable()
export class JsonInterceptor implements HttpInterceptor {

  constructor() {
  }

  private static parseJson(event: HttpEvent<any>): HttpEvent<any> {
    if (event instanceof HttpResponse && typeof event.body === 'string') {
      return event.clone({body: JSON.parse(event.body, dateParser)});
    }
    return event;
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.responseType === 'json') {
      return this.handleJson(req, next);
    }
    return next.handle(req);
  }

  private handleJson(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = req.clone({responseType: 'text'});
    return next.handle(request).pipe(
      catchError(err => {
        return throwError(err);
      }),
      map((event: HttpEvent<any>) => JsonInterceptor.parseJson(event)));
  }
}
