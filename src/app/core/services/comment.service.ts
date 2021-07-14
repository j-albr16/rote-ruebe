import {Injectable} from '@angular/core';
import ExchangeObject from '@core/models/exchange-object';
import {from, Observable, ReplaySubject, Subject} from 'rxjs';
import {Socket} from 'socket.io-client';
import {initSpaceSocket, ioSender, ioSenderWrapper, WrappedSender} from '@core/utils/io-space';
import {CommentSocket, FetchCommentList} from 'rote-ruebe-types';
import AppHttpClient from '@core/utils/app-http-client';
import {DomainConverter} from '@core/utils/domain-converter';
import {catchError, finalize, map, mergeMap, tap} from 'rxjs/operators';
import Comment from '@core/models/comment';
import SubToExchangeObject = CommentSocket.SubToExchangeObject;
import UnsubToExchangeObject = CommentSocket.UnsubToExchangeObject;

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
  private _commentSocket: Socket;
  public get commentSocket(): Socket{
    return this._commentSocket;
  }
  public set commentSocket(newCommentSocket: Socket){
    this.wrappedSender = ioSenderWrapper(newCommentSocket);
    this._commentSocket = newCommentSocket;
  }
  private wrappedSender: WrappedSender;
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

  getCommentList(object: ExchangeObject): {observable: Observable<Comment>, subject: Subject<number>, newest: Observable<Comment>} {
    if (!this.commentSocket){
      this.initIo();
    }
    const commentSender = new ReplaySubject<Comment>();
    const amountSender = new Subject<number>();
    const newCommentSender = new ReplaySubject<Comment>();
    let furthestComment: Comment = null;

    amountSender
      .subscribe({
        next: (amount) => this.fetchCommentList(() => commentSender.complete(), object.id, amount, furthestComment?.id)
          .subscribe(comment => {
          furthestComment = comment;
          commentSender.next(comment);
        }),
        complete: () => {
          commentSender.complete();
        }
      });
    newCommentSender.subscribe({
      next: () => {},
      complete: () => {
        this.newCommentListenerMap.delete(object.id);
        this.wrappedSender(UnsubToExchangeObject.socketEvent)({
          exchangeObjectId: object.id,
        }, (status) => {})
      }
    });

    this.newCommentListenerMap.set(object.id, (comment) => {
      newCommentSender.next(comment);
    });

    this.wrappedSender(SubToExchangeObject.socketEvent)({
      exchangeObjectId: object.id,
    }, (status) => {});

    return {
      observable: commentSender.asObservable(),
      subject: amountSender,
      newest: newCommentSender.asObservable(),
    };
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

  private fetchCommentList(complete: () => void, exchangeObjectId: string, amount: number, furthestCommentId?: string): Observable<Comment>{
    return this.http.request(FetchCommentList.methode)({exchangeObjectId, amount, furthestCommentId}).pipe(
      mergeMap((response: FetchCommentList.Response) => {

        return from(response.commentList).pipe(
          map(commentResponse => {
            return DomainConverter.fromDto(Comment, commentResponse);
          }),
          finalize(() => {
            if (response.commentList.length < amount) {
              complete();
            }
          }),
        );
      }),
      catchError((error, obs) => {
        console.error(error.error.message);
        return obs;
      })
    );
  }
}
