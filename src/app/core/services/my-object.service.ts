import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import ExchangeObject from '@core/models/exchange-object';
import HistoryEntry from '@core/models/history-entry';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MyObjectService {

  constructor(private http: HttpClient) { }

  getMyObjects(): Observable<ExchangeObject>{
    return;
  }

  changeObject(changedObject: ExchangeObject): Observable<ExchangeObject>{
    return;
  }

  createObject(newObject: ExchangeObject): Observable<boolean>{
    return;
  }

  completeExchangeObject(object: ExchangeObject): Observable<boolean>{
    return;
  }

  getHistory(object: ExchangeObject): Observable<HistoryEntry>{
    return;
  }
}
