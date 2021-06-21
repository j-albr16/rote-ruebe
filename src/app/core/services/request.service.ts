import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import ExchangeObject from '@core/models/exchange-object';
import {RespondToRequest} from 'rote-ruebe-types';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getIncomingRequests(object?: ExchangeObject): {observable: Observable<Request>, newest: Observable<Request>}{
    return;
  }

  getOutgoingRequests(): {observable: Observable<Request>, newest: Observable<Request>}{
    return;
  }

  respondToRequest(responseRequest: RespondToRequest.Request): Observable<boolean>{
    return;
  }

  sendRequest(request: Request): Observable<boolean>{
    return;
  }
}
