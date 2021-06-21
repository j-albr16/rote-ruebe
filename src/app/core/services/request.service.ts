import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import ExchangeObject from '@core/models/exchange-object';
import {RespondToRequest, SendRequest} from 'rote-ruebe-types';
import {HttpClient} from '@angular/common/http';
import {IncomingRequest, OutgoingRequest} from '@core/models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }

  getIncomingRequests(object?: ExchangeObject): {observable: Observable<IncomingRequest>, newest: Observable<IncomingRequest>}{
    return;
  }

  getOutgoingRequests(): {observable: Observable<OutgoingRequest>, newest: Observable<OutgoingRequest>}{
    return;
  }

  respondToRequest(responseRequest: RespondToRequest.Request): Observable<Request>{
    return;
  }

  sendRequest(request: SendRequest.Request): Observable<Request>{
    return;
  }
}
