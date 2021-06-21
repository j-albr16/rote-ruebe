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

  getIncomingRequests(object?: ExchangeObject): {observable: Observable<Request>, newRequests: Observable<Request>}{
    return;
  }

  // TODO maybe IncomingRequest and OutgoingRequest as two extentions of Request to be clear (since incoming can be read)

  getOutgoingRequests(): {observable: Observable<Request>, newRequests: Observable<Request>}{
    return;
  }

  respondToRequest(responseRequest: RespondToRequest.Request): Observable<boolean>{
    return;
  }

  sendRequest(request: Request): Observable<boolean>{
    return;
  }
}
