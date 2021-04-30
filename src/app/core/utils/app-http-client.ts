import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RouterEnums, routes} from 'rote-ruebe-types';


export default class AppHttpClient extends HttpClient {

  static post<Res, ReqBody = any>(routeKey: RouterEnums, params: { [key: string]: any }, body: ReqBody): Observable<Res> {
    return HttpClient.prototype.post<Res>(routes.get(routeKey), body, {
      params: this.convertParams(params),
    });
  }

  static get<Res, ReqBody = any>(routeKey: RouterEnums, params: { [key: string]: any }, body: ReqBody): Observable<Res> {
    return HttpClient.prototype.get<Res>(routes.get(routeKey), {
      params: this.convertParams(params),
    });
  }

  /**
   * Converts Object with Values of any Type to HttpParams Object
   * @param paramsObject object string keys and values of any type
   */
  static convertParams(paramsObject: { [key: string]: string }): HttpParams {
    const params = new HttpParams();

    Object.keys(paramsObject).forEach(key => {
      params.set(key, paramsObject[key]);
    });

    return params;

  }
}

