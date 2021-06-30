import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ExchangeObject from '@core/models/exchange-object';
import {Observable, Subject} from 'rxjs';
import {Socket} from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
    public commentSocket: Socket;

  constructor(private http: HttpClient) {}

    initCustomIo(socket: Socket): void{}

    initUnreadMap(initMap: Map<string, {amount: number, comment?: Comment}>): void{}

    getComments(object: ExchangeObject): {observable: Observable<Comment>, subject: Subject<number>, newest: Observable<Comment>} {
      return;
    }

    getCommentCount(object: ExchangeObject): Observable<Comment>{
      return;
    }

    sendComment(comment: Comment): Observable<Comment>{
      return;
    }

    getUnreadCommentCount(): Observable<{ exchangeObjectId: string, amount: number, comment: Comment }>{
      return;
    }
}
