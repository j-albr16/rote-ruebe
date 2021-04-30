import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RouterEnums, routes} from 'rote-ruebe-types';
import {Injectable} from '@angular/core';


export function appHttpClientCreator(http: HttpClient): AppHttpClient {
  return new AppHttpClient(http);
}

@Injectable()
export default class AppHttpClient {

  constructor(public http: HttpClient) {
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

  post<Res, ReqBody = any>(routeKey: RouterEnums, body: ReqBody, params: { [key: string]: any } = null): Observable<Res> {
    return this.http.post<Res>(routes.get(routeKey), body, {
      params: AppHttpClient.convertParams(params),
    });
  }

  get<Res, ReqBody = any>(routeKey: RouterEnums, params: { [key: string]: any } = null, body: ReqBody): Observable<Res> {
    return this.http.get<Res>(routes.get(routeKey), {
      params: AppHttpClient.convertParams(params),
    });
  }


}

