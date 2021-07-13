import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import ExchangeObject from '@core/models/exchange-object';
import {Observable, Subject} from 'rxjs';
import {Socket} from 'socket.io-client';

export type UnreadCommentCountObs =
  Observable<{exchangeObjectId: string, count: number, comment?: Comment}>;

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public commentSocket: Socket;

  constructor(private http: HttpClient) {}

  initIo(socket?: Socket): void{}

  initUnreadMap(initMap: Map<string, {count: number, comment?: Comment}>): void{}

  getComments(object: ExchangeObject): {observable: Observable<Comment>, subject: Subject<number>, newest: Observable<Comment>} {
    return;
  }

  getCommentCount(object: ExchangeObject): Observable<number>{
    return;
  }

  sendComment(comment: Comment): Observable<Comment>{
    return;
  }

  getUnreadCommentCount(): UnreadCommentCountObs{
    return;
  }
}
