import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import AppHttpClient from '@core/utils/app-http-client';
import {AuthService} from '@core/services/auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DevLogInterceptor} from '@core/interceptor/dev-log.interceptor';
import {CommentSocket, FetchCommentList, FetchUserList, IComment, OrderType} from 'rote-ruebe-types';
import {mockICommentList} from '../../../../spec/mock-data/comment';
import ExchangeObject from '@core/models/exchange-object';
import {Observable, Subject} from 'rxjs';
import {DomainConverter} from '@core/utils/domain-converter';
import User from '@core/models/user';
import {io, Socket} from 'socket.io-client';
import MockedSocket from 'socket.io-mock';
import NewComment = CommentSocket.NewComment;
import {Mock} from 'protractor/built/driverProviders';

describe('CommentService', () => {
  let commentService: CommentService;
  let appHttpClient: AppHttpClient;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let mockCommentList: IComment[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CommentService, AppHttpClient, AuthService,
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
  });

  describe('Socket checks', () => {
    let mockSocket: MockedSocket = new MockedSocket();
    beforeEach(() => {
      mockSocket = new MockedSocket();
    });

    it('should init custom Socket', done => {
      commentService.initCustomIo(mockSocket);

      const eventName = 'custom-socket-test';
      const mockString = 'Mock test emit';
      commentService.commentSocket.on(eventName, (testString: string) => {
        expect(testString).toEqual(mockString);
        done();
      });
      mockSocket.clientSocket.emit(eventName, mockString);
    });


  });

  describe('getComments', () => {
    let obs: Observable<Comment>;
    let sub: Subject<number>;
    let newest: Observable<Comment>;
    let mockSocket: MockedSocket = new MockedSocket();
    beforeEach(() => {
      mockSocket = new MockedSocket();
      commentService.initCustomIo(mockSocket);
      const obsSubNew = commentService.getComments({id: '420'} as ExchangeObject);
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

      const request = httpTestingController.expectOne(FetchCommentList.methode.name);
      expect(request.request.body).toEqual({
        amount: 2,
        furthestUserId: undefined,
        exchangeObjectId: '420'
      });

      const res: FetchCommentList.Response = {
        commentList: mockCommentList.slice(0, 2)
      };
      request.flush(res);


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

      const request = httpTestingController.expectOne(FetchCommentList.methode.name);
      expect(request.request.body).toEqual({
        amount: 2,
        furthestUserId: undefined,
        exchangeObjectId: '420'
      });

      const res: FetchCommentList.Response = {
        commentList: mockCommentList.slice(0, 2)
      };
      request.flush(res);

      const request2 = httpTestingController.expectOne(FetchCommentList.methode.name);
      expect(request2.request.body).toEqual({
        amount: 2,
        furthestUserId: 2,
        exchangeObjectId: '420'
      });

      const res2: FetchCommentList.Response = {
        commentList: mockCommentList.slice(2, 4)
      };
      request.flush(res2);


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

      const request = httpTestingController.expectOne(FetchCommentList.methode.name);
      expect(request.request.body).toEqual({
        amount: 2,
        furthestUserId: undefined,
        exchangeObjectId: '420'
      });

      const res: FetchCommentList.Response = {
        commentList: mockCommentList.slice(0, 2)
      };
      request.flush(res);

      const request2 = httpTestingController.expectOne(FetchCommentList.methode.name);
      expect(request2.request.body).toEqual({
        amount: 2,
        furthestUserId: 2,
        exchangeObjectId: '420'
      });

      const res2: FetchCommentList.Response = {
        commentList: mockCommentList.slice(2, 4)
      };
      request.flush(res2);


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

      sub.next(4);

      const request = httpTestingController.expectOne(FetchCommentList.methode.name);
      expect(request.request.body).toEqual({
        amount: 4,
        furthestUserId: undefined,
        exchangeObjectId: '420'
      });

      const res: FetchCommentList.Response = {
        commentList: mockCommentList.slice(0, 4)
      };
      request.flush(res);


      httpTestingController.verify();
    });

    it('should get newest comment', done => {
      newest.subscribe((comment) => {
        expect(comment).toEqual(DomainConverter.fromDto(Comment, mockCommentList[0]));
        done()
      });

      mockSocket.socketClient.emit(NewComment.name, mockCommentList[0]);
    })
  });

  describe('getCommentCount', () => {
      let obs: Observable<{exchangeObjectId: string, amount: number, comment: Comment}>;
      let mockSocket: MockedSocket = new MockedSocket();
      beforeEach(() => {
        mockSocket = new MockedSocket();
        commentService.initCustomIo(mockSocket);
        obs = commentService.getUnreadCommentCount();
      });

      it('should fetch unreadComment with http', done => {});

      it('should get unreadCommentCount without fetching (cache)', done => {});

      it('should get new unreadComment with socket io', () => {});

      it('should get unreadComment{amount: 0}', () => {});


  });

  describe('sendComment', () => {

  });

  describe('getUnreadCommentCount', () => {

  });
});
