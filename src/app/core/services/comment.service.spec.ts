import { TestBed } from '@angular/core/testing';

import {CommentService, UnreadCommentCountObs} from './comment.service';
import AppHttpClient from '@core/utils/app-http-client';
import {AuthService} from '@core/services/auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DevLogInterceptor} from '@core/interceptor/dev-log.interceptor';
import {CommentSocket, CommentRoutes, FetchCommentList, FetchUnreadCommentCount, IComment, SendComment} from 'rote-ruebe-types';
import {mockICommentList, mockUnreadICommentCountList} from '../../../../spec/mock-data/comment';
import ExchangeObject from '@core/models/exchange-object';
import {Observable, Subject} from 'rxjs';
import {DomainConverter} from '@core/utils/domain-converter';
import MockedServerSocket from 'socket.io-mock'
import { SocketMock, SocketClient } from 'typescript-declarations/socketio-mock';
import Comment from '@core/models/comment';
import NewComment = CommentSocket.NewComment;
import SubToCommentCount = CommentSocket.SubToCommentCount;
import NewCommentCount = CommentSocket.NewCommentCount;
import UnsubToCommentCount = CommentSocket.UnsubToCommentCount;
import UnreadCommentCount = CommentSocket.UnreadCommentCount;
import {timeout} from 'rxjs/operators';
import {Socket} from 'socket.io-client';
import {httpTest} from '../../../../spec/utils/httpTest';


describe('CommentService', () => {
  let commentService: CommentService;
  let appHttpClient: AppHttpClient;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let mockCommentList: IComment[];
  let mockSocketServer: SocketMock;
  let mockSocket: SocketClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        CommentService,
        {provide: 'commentCustomSocket', useValue: mockSocket},
        AppHttpClient,
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DevLogInterceptor,
          multi: true,
        },
      ]
    });
    commentService = TestBed.inject(CommentService);
    authService = TestBed.inject(AuthService);
    appHttpClient = TestBed.inject(AppHttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    mockCommentList = mockICommentList;
    mockSocketServer = new MockedServerSocket();
    mockSocket = mockSocketServer.socketClient;
    commentService.initIo(mockSocket as unknown as Socket);
  });

  describe('Socket checks', () => {

    it('should init custom Socket', done => {
      const eventName = 'custom-socket-test';
      const mockString = 'Mock test emit';
      commentService.commentSocket.on(eventName, (testString: string) => {
        expect(testString).toEqual(mockString);
        done();
      });
      mockSocketServer.emit(eventName, mockString);
    });

  });

  describe('getComments', () => {
    let obs: Observable<Comment>;
    let sub: Subject<number>;
    let newest: Observable<Comment>;
    beforeEach(() => {
      const obsSubNew = commentService.getCommentList({id: '420'} as ExchangeObject);
      obs = obsSubNew.observable;
      sub = obsSubNew.subject;
      newest = obsSubNew.newest;
    });

    it('should fetch commentList 0 to 2', done => {
      let pointer = 0;
      sub.next(2);
      obs.subscribe((comment) => {
        expect(comment).toEqual(DomainConverter.fromDto(Comment, mockCommentList[pointer]));

        pointer++;
        if (pointer === 2){
          done();
        }
      });

      httpTest(httpTestingController, FetchCommentList.methode)({
        exchangeObjectId: '420',
        amount: 2,
        furthestCommentId: undefined,
      }, {
        commentList: mockCommentList.slice(0, 2)
      });

      httpTestingController.verify();

    });

    it('should fetch commentList 0 to 5 in two steps', done => {
      let pointer = 0;
      obs.subscribe((comment) => {
        expect(comment).toEqual(DomainConverter.fromDto(Comment, mockCommentList[pointer]));

        pointer++;
        if (pointer === 2){
          sub.next(2);
        }
        if (pointer === 4){
          done();
        }
      });

      sub.next(2);

      httpTest(httpTestingController, FetchCommentList.methode)({
        exchangeObjectId: '420',
        amount: 2,
        furthestCommentId: undefined
      }, {
        commentList: mockCommentList.slice(0, 2)
      });

      httpTest(httpTestingController, FetchCommentList.methode)({
        exchangeObjectId: '420',
        amount: 2,
        furthestCommentId: '2'
      }, {
        commentList: mockCommentList.slice(2, 4)
      });

      httpTestingController.verify();

    });

    it('should replay Comments when subscribing again later', done => {
      let pointer = 0;
      let pointer2 = 0;
      obs.subscribe((comment) => {
        expect(comment).toEqual(DomainConverter.fromDto(Comment, mockCommentList[pointer]));

        pointer++;
        if (pointer === 2){
          obs.subscribe((comment2) => {
            expect(comment2).toEqual(DomainConverter.fromDto(Comment, mockCommentList[pointer2]));
            pointer2++;
            if (pointer2 === 4 && pointer === 4){
              done();
            }
              });
          sub.next(2);
        }
        if (pointer2 === 4 && pointer === 4){
          done();
        }
      });

      sub.next(2);

      httpTest(httpTestingController, FetchCommentList.methode)({
        exchangeObjectId: '420',
        amount: 2,
        furthestCommentId: undefined,
      }, {
        commentList: mockCommentList.slice(0, 2)
      });

      httpTest(httpTestingController, FetchCommentList.methode)({
        exchangeObjectId: '420',
        amount: 2,
        furthestCommentId: '2',
      }, {
        commentList: mockCommentList.slice(2, 4)
      });

      httpTestingController.verify();
    });

    it('should complete the obsSub after the server sends back less comments than demanded', done => {
      let pointer = 0;
      obs.subscribe({
        next: (comment) => {
          expect(comment).toEqual(DomainConverter.fromDto(Comment, mockCommentList[pointer]));
          pointer++;
        },
        complete: () => {
          done();
        }
      });

      sub.next(5);

      httpTest(httpTestingController, FetchCommentList.methode)({
        exchangeObjectId: '420',
        amount: 5,
        furthestCommentId: undefined,
      }, {
        commentList: mockCommentList.slice(0, 4)
      });

      httpTestingController.verify();
    });

    it('should get newest comment', done => {
      newest.subscribe((comment) => {
        expect(comment).toEqual(DomainConverter.fromDto(Comment, mockCommentList[0]));
        done()
      });

      mockSocketServer.emit(NewComment.name, mockCommentList[0]);
    })
  });

  describe('getCommentCount', () => {

    it('should trigger SubToCommentCount event on socket', done => {
      const obs = commentService.getCommentCount({id: '420' } as ExchangeObject);
      obs.subscribe((commentCount) => {
        expect(commentCount).toEqual(3);
        done();
      });
      mockSocketServer.on(SubToCommentCount.name, (body: SubToCommentCount.body, callback: SubToCommentCount.callback) => {
        expect(body.exchangeObjectId).toEqual('420');
        callback(3);
      });
    });

    it('should receive updated commentCounts', done => {
      const obs = commentService.getCommentCount({id: '420' } as ExchangeObject);
      const stages = [3, 4];

      let pointer = 0;
      obs.subscribe((commentCount) => {
        expect(commentCount).toEqual(stages[pointer]);
        pointer++;
        if (pointer === 2){
          done();
        }
      });
      mockSocketServer.on(SubToCommentCount.name, (body: SubToCommentCount.body, callback: SubToCommentCount.callback) => {
        expect(body.exchangeObjectId).toEqual('420');
        callback(3);
      });
      mockSocketServer.emit(NewCommentCount.name, {exchangeObjectId: '420', commentCount: 4});
    });

    it('should trigger Unsub event when Observable is unsubscribed', done => {
      const obs = commentService.getCommentCount({id: '420' } as ExchangeObject);
      const subsciptiom = obs.subscribe((commentCount) => {});
      mockSocketServer.on(SubToCommentCount.name, (body: SubToCommentCount.body, callback: SubToCommentCount.callback) => {
        expect(body.exchangeObjectId).toEqual('420');
        callback(3);
      });

      mockSocketServer.on(UnsubToCommentCount.name, (body: UnsubToCommentCount.body, callback: UnsubToCommentCount.callback) => {
        expect(body.exchangeObjectId).toEqual('420');
        callback('');
        done();
      });
      subsciptiom.unsubscribe();
    });
  });

  describe('sendComment', () => {
    it('should send http request', done => {
      const obs = commentService.sendComment(DomainConverter.fromDto(Comment, mockCommentList[0]));
      obs.subscribe(comment => {});

      httpTest(httpTestingController, SendComment.methode)({
        text: mockCommentList[0].text,
        exchangeObjectId: mockCommentList[0].exchangeObjectId,
      }, mockCommentList[0]);
    });

    it('should return sent Comment', done => {
      const obs = commentService.sendComment(DomainConverter.fromDto(Comment, mockCommentList[0]));
      obs.subscribe(comment => {
        expect(comment).toEqual(DomainConverter.fromDto(Comment, mockCommentList[0]));
        done();
      });
      httpTest(httpTestingController, SendComment.methode)({
        text: mockCommentList[0].text,
        exchangeObjectId: mockCommentList[0].exchangeObjectId,
      }, mockCommentList[0]);
    });

    it('should close Observable after Comment return', done => {
      const obs = commentService.sendComment(DomainConverter.fromDto(Comment, mockCommentList[0]));

      let commentReturned = false;
      obs.subscribe({
        next: (comment) => {
          expect(comment).toEqual(DomainConverter.fromDto(Comment, mockCommentList[0]));
          commentReturned = true;
          },
        complete: () => {
          if (commentReturned){
            done();
            }
          }
    });
      httpTest(httpTestingController, SendComment.methode)({
        text: mockCommentList[0].text,
        exchangeObjectId: mockCommentList[0].exchangeObjectId,
      }, mockCommentList[0]);
    });
    });

  describe('getUnreadCommentCount', () => {
    let obs: UnreadCommentCountObs;
    let mockUnreadCommentCountList: { exchangeObjectId: string, count: number, comment?: IComment }[];
    beforeEach(() => {
      obs = commentService.getUnreadCommentCount();
      mockUnreadCommentCountList = mockUnreadICommentCountList;
    });

    it('should fetch unreadComment with http', done => {
      let pointer = 0;
      obs.subscribe(unreadComment => {
        const mockCountEntry = mockUnreadCommentCountList[pointer];
        expect(unreadComment).toEqual({
          exchangeObjectId: mockCountEntry.exchangeObjectId,
          count: mockCountEntry.count,
          comment: mockCountEntry.comment ? DomainConverter.fromDto(Comment, mockCountEntry.comment) : null,
        });
        pointer ++;
        if (pointer === 2){
          done();
        }
      });

      httpTest(httpTestingController, FetchUnreadCommentCount.methode)({}, {
        countMap: mockUnreadCommentCountList.slice(0, 2),
      });
    });

    it('should get unreadCommentCount without fetching (cache)', done => {
      const initMap = new Map <string, {count: number, comment?: Comment}>();
      const mockEntry = mockUnreadCommentCountList[0];
      initMap.set(mockEntry.exchangeObjectId, {
        count: mockEntry.count,
        comment: mockEntry.comment ? DomainConverter.fromDto(Comment, mockEntry.comment) : null,
      });
      commentService.initUnreadMap(initMap);
      obs.subscribe(unreadComment => {
        const mockCountEntry = mockUnreadCommentCountList[0];
        expect(unreadComment).toEqual({
          exchangeObjectId: mockCountEntry.exchangeObjectId,
          count: mockCountEntry.count,
          comment: mockCountEntry.comment ? DomainConverter.fromDto(Comment, mockCountEntry.comment) : null,
        });
        done();
      });

      httpTest(httpTestingController, FetchUnreadCommentCount.methode)({});
    });

    it('should get new unreadComments with socket io', done => {
      const initMap = new Map <string, {count: number, comment?: Comment}>();
      commentService.initUnreadMap(initMap);
      let pointer = 0;
      obs.subscribe(unreadComment => {
        const mockCountEntry = mockUnreadCommentCountList[0];
        expect(unreadComment).toEqual({
          exchangeObjectId: mockCountEntry.exchangeObjectId,
          count: mockCountEntry.count,
          comment: mockCountEntry.comment ? DomainConverter.fromDto(Comment, mockCountEntry.comment) : null,
        });
        pointer ++;
        if (pointer === 2) {
          done();
        }
      });
      httpTest(httpTestingController, FetchUnreadCommentCount.methode)({});

      mockSocketServer.emit(UnreadCommentCount.name, mockUnreadCommentCountList[0]);
      setTimeout(() => {
        mockSocketServer.emit(UnreadCommentCount.name, mockUnreadCommentCountList[1]);
      }, 200);
    });
  });
});
