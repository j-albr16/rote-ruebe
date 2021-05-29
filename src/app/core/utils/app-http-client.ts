import {HttpClient, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {
  ChatRoutes,
  FetchUserList,
  RouterEnums,
  URLArgs,
  URLType,
  UserFilter,
  Methode, HttpType
} from 'rote-ruebe-types';
import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';


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
  static convertParams(paramsObject: { [key: string]: any }): HttpParams {
    let params = new HttpParams();

    Object.keys(paramsObject).forEach(key => {
      params = params.set(key, JSON.stringify(paramsObject[key]));
    });
    return params;
  }

  static generateQueries(queries: { [key: string]: URLType }): string {
    // Following Schema:
    //   https//:HOST:PORT/PATH/...params?query=data&query2=data2...;
    // Min Path
    let queryString = '';

    // Adding Queries to Path
    // Order is Insignificant
    if (queries) {
      const queryEntryList = Object.entries(queries);
      if (queryEntryList.length > 0) {
        queryString += '?';
        queryEntryList.map(q => `${q[0]}=${q[1]}`);
        queryString += queryEntryList.join('&');
      }
    }
    return queryString;
  }

  request<Req, Res, Queries>(methode: Methode<Req, Res, Queries>): (body: Req, params: Queries) => Observable<any> {
    /*if (methode.httpType === HttpType.POST){
      const func: <D, T, Q>(i: D, q: Q) => Observable<T> =
        <D, T, Q>(body: D, params: Q) =>
        this.http.post<T>(methode.name, body, {
          responseType: 'json',
          params: params ? AppHttpClient.convertParams(params) : null,
        }).pipe(
          map(data => data as T)
        );
      return methode.forming(func);
    }*/
    const func: <D, T, Q>(i: D, q: Q) => Observable<T> =
      <D, T, Q>(body: D, params?: Q) =>
        this.http.request<T>(methode.httpType.toString(), methode.name, {
          responseType: 'json',
          body,
          params: params ? AppHttpClient.convertParams(params) : null,
        }).pipe(
          map(data => data as T)
        );
    return methode.forming(func);
  }

  post<Res, ReqBody = any>(routeKey: RouterEnums, body: ReqBody, queries: { [key: string]: any } = null, b_progress = false)
    : Observable<Res> {
    const url = `${routeKey}${AppHttpClient.generateQueries(queries)}`;
    return this.http.post<Res>(url, body, {
      // params: params ? AppHttpClient.convertParams(params) : null,
      reportProgress: b_progress,
    });
  }

  get<Res, ReqBody = any>(routeKey: RouterEnums, queries: { [key: string]: any } = null, b_progress = false): Observable<Res> {
    const url = `${routeKey}${AppHttpClient.generateQueries(queries)}`;
    return this.http.get<Res>(url, {
      // params: AppHttpClient.convertParams(params),
      reportProgress: b_progress
    });
  }
}

