import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ExchangeObject from '@core/models/exchange-object';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

    getComments(object: ExchangeObject): {observable: Observable<Comment>, subject: Subject<number>, newest: Comment} {
      return;
    }

    getCommentCount(object: ExchangeObject): Observable<Comment>{
      return;
    }

    sendComment(comment: Comment): Observable<boolean>{
      return;
    }

    getUnreadCommentCount(): Observable<{ exchangeObjectId: string, amount: number }>{
      return;
    }
}
