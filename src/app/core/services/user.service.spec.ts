import { TestBed, inject } from '@angular/core/testing';
import AppHttpClient from '@core/utils/app-http-client';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { UserService } from './user.service';
import Image from '../models/image';
import User from '../models/user';
import {FetchUser, UserRoutes} from 'rote-ruebe-types';

fdescribe('UserService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AppHttpClient],
      providers: [UserService]
    });
  });

  it(
    'should get users',
    inject(
      [HttpTestingController, UserService],
      (httpMock: HttpTestingController, userService: UserService) => {
        const mockUser: User =
          new User({ id: 'XYC1234',
            description: 'Someething',
            image: new Image({
              id: 'ID01',
              description: 'the Image',
              createdAt: new Date(),
              title: 'TestImage'
            }),
            userName: 'Timmy',
            createdAt:  new Date(),
          });
        userService.getUser('XYC1234').subscribe((user) => {

              expect(user).toEqual(mockUser);

        });

        const mockReq = httpMock.expectOne(UserRoutes.FetchUser);

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        const res: FetchUser.Response = {
          id: mockUser.id,
          description: mockUser.description,
          image: mockUser.image,
          userName: mockUser.userName,
          createdAt:  mockUser.createdAt,
        };
        mockReq.flush(res);

        httpMock.verify();
      }
    )
  )
});
