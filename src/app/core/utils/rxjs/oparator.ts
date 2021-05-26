import {Observable, pipe} from 'rxjs';
import {filter} from 'rxjs/operators';
import {HttpEvent, HttpEventType} from '@angular/common/http';


// export function response<T>(): any {
//   return pipe(
//     filter((event) => !!event.type)
//   );
// }
