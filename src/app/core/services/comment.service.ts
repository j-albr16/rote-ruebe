import {Injectable} from '@angular/core';
import ExchangeObject from '@core/models/exchange-object';
import {Observable, Subject} from 'rxjs';
import {Socket} from 'socket.io-client';
import {DisconnectReason, initSpaceSocket} from '@core/utils/io-space';
import {CommentSocket} from 'rote-ruebe-types';
import AppHttpClient from '@core/utils/app-http-client';
import {DomainConverter} from '@core/utils/domain-converter';

export type UnreadCommentCountObj = {exchangeObjectId: string, count: number, comment?: Comment};

export type UnreadCommentCountObs =
  Observable<UnreadCommentCountObj>;

export type UnreadCountMap = Map<UnreadCommentCountObj['exchangeObjectId'], Omit<UnreadCommentCountObj, 'exchangeObjectId'>>

export type CommentListenerMap = Map<string, (comment: Comment) => void>;
export type CommentCountListenerMap = Map<string, (count: number) => void>;

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public commentSocket: Socket;
  private newCommentListenerMap: CommentListenerMap = new Map<string, (comment: Comment) => void>();
  private unreadCountMap: UnreadCountMap;
  private newUnreadCountSub: Subject<UnreadCommentCountObj> = new Subject<UnreadCommentCountObj>();
  private commentCountListenerMap: CommentCountListenerMap = new Map<string, (count: number) => void>();

  constructor(private http: AppHttpClient) {}

  initIo(socket?: Socket): void{  // TODO Add socket Auth
    this.commentSocket = initSpaceSocket(CommentSocket.socketSpace, null, socket)({
      NewComment: (body) => {
        const commentListenerEntry = this.newCommentListenerMap.get(body.exchangeObjectId);
        if (commentListenerEntry) {
          commentListenerEntry(DomainConverter.fromDto(Comment, body));
        }
      },
      UnreadCommentCount: (body) => {
        const currentComment = DomainConverter.fromDto(Comment, body.newComment);
        this.newUnreadCountSub.next({
          exchangeObjectId: body.exchangeObjectId,
          count: body.count,
          comment: currentComment
        });
        this.unreadCountMap?.set(body.exchangeObjectId, {count: body.count, comment: currentComment})
      },
      NewCommentCount: (body) => {
        const commentCountListenerEntry = this.commentCountListenerMap.get(body.exchangeObjectId);
        if (commentCountListenerEntry){
          commentCountListenerEntry(body.commentCount);
        }
      },
    }, {});
  }

  initUnreadMap(initMap: UnreadCountMap): void{
    this.unreadCountMap = initMap;
  }

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
