import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from './user.service';
import User from '@core/models/user';
import {DomainConverter} from '@core/utils/domain-converter';
import {mock5User} from '../../../../spec/mock-data/user';
import AppHttpClient from '@core/utils/app-http-client';
import {ChangeUser, FetchUser, FetchUserList, IUser, OrderType} from 'rote-ruebe-types';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {DevLogInterceptor} from '@core/interceptor/dev-log.interceptor';
import {Observable} from 'rxjs';
import {AuthService} from '@core/services/auth.service';



describe('UserService', () => {
  let userService: UserService;
  let appHttpClient: AppHttpClient;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let mockIUserList: IUser[];
  let mockIUser: IUser;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ UserService, AppHttpClient, AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: DevLogInterceptor,
          multi: true,
        },
        ]
    });
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    appHttpClient = TestBed.inject(AppHttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('getUser', () => {

    beforeEach(() => {
      mockIUser = mock5User[0];
    });

    it('should fetch User from Mock', done => {
      userService.getUser('0').subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, mockIUser));
        done();
      });
      const res: FetchUser.Response = mockIUser;

      const request = httpTestingController.expectOne(FetchUser.methode.name + '?userId=0');
      request.flush(res);
      httpTestingController.verify();
    });

    it('should get cached User without fetching', done => {
      const testUserMap = new Map<string, User>();
      testUserMap.set('0', DomainConverter.fromDto(User, mockIUser));
      userService.initUserMap(testUserMap);

      userService.getUser('0').subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, mockIUser));
        done();
      });

      httpTestingController.expectNone(FetchUser.methode.name + '?userId=1');
      httpTestingController.verify();
    });



    });

  describe('refreshUser', () => {

    beforeEach(() => {
      mockIUser = mock5User[1];
    });

    it('should fetch cached User on refreshUser()', done => {
      const testUserMap = new Map<string, User>();
      testUserMap.set('1', DomainConverter.fromDto(User, mockIUser));
      userService.initUserMap(testUserMap);

      const changedMock = JSON.parse(JSON.stringify(mockIUser));
      changedMock.description = 'New Description like there never was';

      userService.refreshUser('1').subscribe((user) => {
        expect(user).toEqual(DomainConverter.fromDto(User, changedMock));

        done();
      });

      const request = httpTestingController.expectOne(FetchUser.methode.name + '?userId=1');

      request.flush(changedMock);
      httpTestingController.verify();
    });
  });

  describe('changeUser', () => {

    beforeEach(() => {
      mockIUser = mock5User[0];
    });

    it('should post a changed User', done => {
      const req: ChangeUser.Request = {
        userId: mockIUser.id,
        userName: mockIUser.userName,
        description: mockIUser.description,
        image: mockIUser.image
      };
      userService.changeMyUser(req).subscribe((success) => {
        expect(success).toBeTrue();
        done();
      });

      const request = httpTestingController.expectOne(ChangeUser.methode.name);

      expect(request.request.body).toEqual(req);

      request.flush({});
      httpTestingController.verify();
    });
  });

  describe('getUserList', () => {

    beforeEach(() => {
      mockIUserList = mock5User;
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

      const request = httpTestingController.expectOne(FetchUserList.methode.name);
      expect(request.request.body).toEqual({
        amount: 2,
        furthestUserId: undefined,
        userFilter: {
          orderBy: OrderType.Alphabetical,
        }
      });

      const res: FetchUserList.Response = {
        userList: sortedMock.slice(0, 2)
      };
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

      const request = httpTestingController.expectOne(FetchUserList.methode.name);
      expect(request.request.body).toEqual({
        amount: 2,
        furthestUserId: undefined,
        userFilter: {
          orderBy: OrderType.Alphabetical,
        }
      });

      const res: FetchUserList.Response = {
        userList: sortedMock.slice(0, 2)
      };
      request.flush(res);

      const request2 = httpTestingController.expectOne(FetchUserList.methode.name);
      expect(request2.request.body).toEqual({
        amount: 3,
        furthestUserId: '4',
        userFilter: {
          orderBy: OrderType.Alphabetical,
        }
      });
      const res2: FetchUserList.Response = {
        userList: sortedMock.slice(2, 5)
      };
      request2.flush(res2);


      httpTestingController.verify();
    });

    it('should complete the obsSub after the server sends back less Users than demanded', done => {
      const obsSub = userService.getUserList({orderBy: OrderType.Alphabetical});
      const obs: Observable<User> = obsSub.observable;
      const sub = obsSub.subject;

      const sortedMock = mockIUserList.sort((one, two) => (one.userName > two.userName ? 1 : -1));

      let pointer = 0;
      obs.subscribe({
        next: (user) => {
          expect(user).toEqual(DomainConverter.fromDto(User, sortedMock[pointer]));
          pointer++;
        },
        complete: () => {
          done();
        }
      });

      sub.next(5);

      const request = httpTestingController.expectOne(FetchUserList.methode.name);
      expect(request.request.body).toEqual({
        amount: 5,
        furthestUserId: undefined,
        userFilter: {
          orderBy: OrderType.Alphabetical,
        }
      });

      const res: FetchUserList.Response = {
        userList: sortedMock.slice(0, 3)
      };
      request.flush(res);


      httpTestingController.verify();
    });
  });

  describe('getMyUser', () => {
    let spy: any;

    beforeEach(() => {
      mockIUser = mock5User[0];
      spy = spyOnProperty(authService, 'userId', 'get').and.returnValue(mockIUser.id);
    });

    it('should return User by UserId of authService', done => {
      const initUserMap = new Map<string, User>();
      initUserMap.set(mockIUser.id, DomainConverter.fromDto(User, mockIUser));
      userService.initUserMap(initUserMap);

      userService.getMyUser().subscribe(user => {
        expect(user).toEqual(DomainConverter.fromDto(User, mockIUser));
        done();
      });

      expect(spy).toHaveBeenCalled();
    })
  });

});
