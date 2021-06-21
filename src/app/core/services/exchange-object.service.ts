import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import User from '@core/models/user';
import ExchangeObject from '@core/models/exchange-object';
import {HttpClient} from '@angular/common/http';
import {ExchangeObjectFilter} from 'rote-ruebe-types';

@Injectable({
  providedIn: 'root'
})
export class ExchangeObjectService {

  constructor(private http: HttpClient) { }

  getExchangeObjects(filter: ExchangeObjectFilter): {observable: Observable<ExchangeObject>, subject: Subject<number>}{
    return;
  }

  getNewExchangeObjects(): { observable: Observable<ExchangeObject>, subject: Subject<number>, newObjects: Observable<ExchangeObject> }{
    return;
  }
}
