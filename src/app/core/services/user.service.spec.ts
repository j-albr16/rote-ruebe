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

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AppHttpClient, UserService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DevLogInterceptor,
          multi: true,
        }]
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

    it('should fetch User 0', () => {
      userService.getUser('0').subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, mockIUser));
      });

      const request = httpTestingController.expectOne(FetchUser.methode.name + '?userId=0');
      request.flush(mockIUser);
      httpTestingController.verify();
    });

    it('should get User 1 without fetching', async () => {
      userService.userMap = new Map<string, User>();

      userService.getUser('1').subscribe( (user) => {});
      const subRequest = await httpTestingController.expectOne(FetchUser.methode.name + '?userId=1');
      subRequest.flush(mockIUser2);

      httpTestingController.verify();

      let b_recieved = false;

      userService.getUser('1').subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, mockIUser2));
        b_recieved = true;
      });

      await httpTestingController.expectNone(FetchUser.methode.name + '?userId=1');
      expect(b_recieved).toBe(true);
      httpTestingController.verify();
    });

    it('should fetch userList', async () => {
      const obsSub = userService.getUserList({orderBy: OrderType.Alphabetical});
      const obs = obsSub.observable;
      const sub = obsSub.subject;

      const sortedMock = mockIUserList.sort((one, two) => (one.userName > two.userName ? 1 : -1));
      let pointer = 0;

      let firstRes: (value) => void;
      let secondRes: (value) => void;

      const firstProm = new Promise((resolve, reject) => {
        firstRes = resolve;
      });
      const secondProm = new Promise((resolve, reject) => {
        secondRes = resolve;
      });

      obs.subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, sortedMock[pointer]));
        pointer += 1;
        if (pointer === 2){
          firstRes(null);
        }
        if (pointer === 5){
          secondRes(null);
        }

      });


      sub.next(2);
      const request = await httpTestingController.expectOne(FetchUserList.methode.name + '?amount=2&furthestUserId=undefined');
      const listResponse: FetchUserList.Response = {userList: sortedMock.slice(0, 2)};
      request.flush(listResponse);

      await firstProm;
      expect(pointer).toEqual(2);



      const request2 = httpTestingController.expectOne(FetchUserList.methode.name + '?amount=3&furthestUserId=1');
      const listResponse2: FetchUserList.Response = {userList: sortedMock.slice(2, 5)};
      request2.flush(listResponse2);

      sub.next(3);
      await secondProm;
      expect(pointer).toEqual(5);

      httpTestingController.verify();
    });
  });
});
