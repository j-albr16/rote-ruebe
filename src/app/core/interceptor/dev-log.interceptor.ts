import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {finalize, tap} from "rxjs/operators";

const b_logging = true;

@Injectable()
export class DevLogInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      tap(
        event => {
          status = '';
          if (event instanceof HttpResponse) {
            status = 'succeeded';
          }
        },
        error => status = 'failed'
      ),
      finalize(() => {
        if (b_logging){
          console.log('Url: ' + request.url);
          console.log('methode: ' + request.method);
          console.log('ResponseType: ' + request.responseType);
          console.log('Body: ' + request.body?.toString());
          console.log('Params: ' + request.params?.toString());
          console.log('headers: ' + request.headers?.toString());
        }
      })
    );
  }
}
