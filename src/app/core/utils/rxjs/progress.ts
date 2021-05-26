import {Observable, pipe, UnaryFunction} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {HttpDownloadProgressEvent, HttpEvent, HttpEventType, HttpUploadProgressEvent} from '@angular/common/http';
import {ResBody} from 'rote-ruebe-types';


export function handlingProgress<T>(cb: (progress: number) => void)
  : UnaryFunction<Observable<HttpEvent<ResBody<T>>>, Observable<HttpUploadProgressEvent | HttpDownloadProgressEvent>> {
  return pipe(
    filter((event: HttpEvent<ResBody<T>>) => event.type === HttpEventType.UploadProgress || event.type === HttpEventType.DownloadProgress),
    map((event: HttpUploadProgressEvent | HttpDownloadProgressEvent) => {
        cb(Math.round((event.loaded * 100) / event.total));
        return event;
      }
    ),
  );
}

