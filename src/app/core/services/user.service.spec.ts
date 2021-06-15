import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import User from '@core/models/user';
import {DomainConverter} from '@core/utils/domain-converter';
import {mock5User} from '../../../../spec/mock-data/user';
import AppHttpClient from '@core/utils/app-http-client';
import {FetchUser, FetchUserList, IUser, OrderType} from 'rote-ruebe-types';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DevLogInterceptor} from '@core/interceptor/dev-log.interceptor';
import {from, Observable, of} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import {ErrorInterceptor} from '@core/interceptor/error.interceptor';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserService, AppHttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DevLogInterceptor,
          multi: true,
        },
        ]
    });
  });

  describe('getUser', () => {

    let userService: UserService;
    let appHttpClient: AppHttpClient;
    let httpTestingController: HttpTestingController;
    let mockIUserList: IUser[];
    let mockIUser: IUser;
    let mockIUser2: IUser;

    beforeEach(() => {
      userService = TestBed.inject(UserService);
      appHttpClient = TestBed.inject(AppHttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      mockIUserList = mock5User;
      mockIUser = mock5User[0];
      mockIUser2 = mock5User[1];
    });

    it('should fetch User 0', done => {
      userService.getUser('0').subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, mockIUser));
        done();
      });
      const res: FetchUser.Response = mockIUser;

      const request = httpTestingController.expectOne(FetchUser.methode.name + '?userId=0');
      request.flush(res);
      httpTestingController.verify();
    });

    it('should get User 1 without fetching', done => {
      userService.userMap = new Map<string, User>();
      userService.userMap.set('1', DomainConverter.fromDto(User, mockIUser2));

      userService.getUser('1').subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, mockIUser2));
        done();
      });

      httpTestingController.expectNone(FetchUser.methode.name + '?userId=1');
      httpTestingController.verify();
    });

    it('should fetch userList 0 to 2', done => {
      const obsSub = userService.getUserList({orderBy: OrderType.Alphabetical});
      const obs: Observable<User> = obsSub.observable;
      const sub = obsSub.subject;

      const sortedMock = mockIUserList.sort((one, two) => (one.userName > two.userName ? 1 : -1));

      let pointer = 0;
      sub.next(2);
      obs.subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, sortedMock[pointer]));

        pointer++;
        if (pointer === 2){
          done();
        }
      });

      const request = httpTestingController.expectOne(FetchUserList.methode.name + '?amount=2');
      const res: FetchUserList.Response = {
        userList: sortedMock.slice(0, 2)
      }
      request.flush(res);


      httpTestingController.verify();
    });

    it('should fetch userList 0 to 5 in two steps', done => {
      const obsSub = userService.getUserList({orderBy: OrderType.Alphabetical});
      const obs: Observable<User> = obsSub.observable;
      const sub = obsSub.subject;

      const sortedMock = mockIUserList.sort((one, two) => (one.userName > two.userName ? 1 : -1));

      let pointer = 0;
      obs.subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, sortedMock[pointer]));

        pointer++;

        if (pointer === 2){
          sub.next(3);
        }

        if (pointer === 5){
          done();
        }
      });

      sub.next(2);

      const request = httpTestingController.expectOne(FetchUserList.methode.name + '?amount=2');
      const res: FetchUserList.Response = {
        userList: sortedMock.slice(0, 2)
      }
      request.flush(res);

      const request2 = httpTestingController.expectOne(FetchUserList.methode.name + '?amount=3&furthestUserId=4');
      const res2: FetchUserList.Response = {
        userList: sortedMock.slice(2, 5)
      }
      request2.flush(res2);


      httpTestingController.verify();
    });
  });
});
