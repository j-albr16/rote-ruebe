import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable, pipe, throwError, UnaryFunction} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ErrorBody, ResBody} from 'rote-ruebe-types';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<ResBody>> {
    return next.handle(req).pipe(
      this.handlingResponse(),
      catchError((err) => {
        console.log('Caught Error');
        return throwError(`HttpError:\n${err.message}`);
      }),
    );
    ;
  }

  handlingResponse(): UnaryFunction<Observable<HttpEvent<ResBody>>, Observable<HttpEvent<any>>> {
    return pipe(
      map(event => {
        if (event.type === HttpEventType.Response) {
          // Extracting Body
          const body = event.body;

          // Error if there is no Res with Body
          if (!body) {
            throw new Error(`Error: No Http Body`);
          }

          // Check if Server Request was Valid
          if (!body.b_valid) {
            throw Error(body.message);
          }

          if (!body.data) {
            return null;
          }

          return event.clone({body: body.data});
        }
        return event;
      }),
    );
  }

}
