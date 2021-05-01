import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ErrorBody, ResBody} from 'rote-ruebe-types';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {
  }

  throwErrorBody(message: string, errorList = null): ErrorBody {
    return {
      errorMessage: message,
      errorList,
    };
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpResponse<ResBody>> {
    return next.handle(req).pipe(
      catchError((err) => {
        return throwError(this.throwErrorBody(`HttpError:\n${err}`));
      }),
      tap((event: HttpResponse<ResBody>) => {
        const body = event.body;
        if (!body) {
          return throwError(this.throwErrorBody(`Error: No Http Body`));
        }
        if (!body.b_valid) {
          return of(body.data);
        }
        return body;
      })
    );
  }
}
