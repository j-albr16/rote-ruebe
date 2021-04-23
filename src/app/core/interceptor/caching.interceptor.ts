import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpClient, HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) {
  }

  private cache: Map<HttpRequest<any>, HttpResponse<any>> = new Map();

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    this.b_syncCache(req).subscribe(
      () => {
        // Cache is Sync otherwise Method would throw
        const cashedResponse: HttpResponse<any> = this.cache.get(req);
        if (cashedResponse) {
          // Create new Observable with the Cashed Response
          return of(cashedResponse);
        }
        return this.makeRequestAndCache(req, next);
      },
      () => {
        // Error was Thrown. Cache is not Sync
        return this.makeRequestAndCache(req, next);
      },
    );
  }

  private makeRequestAndCache(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.cache.delete(req);
    return next.handle(req).pipe(
      tap(event => {
        // Saving Response to Cache
        if (event instanceof HttpResponse) {
          const clonedEvent = event.clone({body: event.body.append('createdAt', new Date())});
          this.cache.set(req, clonedEvent);
        }
      }),
    );
  }

  private b_syncCache(req: HttpRequest<any>): Observable<any> {
    return this.http.request(req);
  }
}
