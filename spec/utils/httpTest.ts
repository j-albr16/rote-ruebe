import {HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {HttpType, Methode} from 'rote-ruebe-types';
import AppHttpClient from '@core/utils/app-http-client';


const queryTest = <Req, Res>(httpTestingController: HttpTestingController,
                             methode: Methode<Req, Res>,
                             expectedBody: Req,
                             b_none: boolean) => {
  let request: TestRequest;
  const queryString = '?' + AppHttpClient.convertParams(expectedBody).toString();
  if (!b_none) {
    request = httpTestingController.expectOne(methode.name + queryString)
  } else {
    httpTestingController.expectNone(methode.name + queryString)
  }
  return request;
};

const bodyTest = <Req, Res>(httpTestingController: HttpTestingController,
                            methode: Methode<Req, Res>,
                            expectedBody: Req,
                            b_none: boolean) => {
  let request: TestRequest;
  if (!b_none) {
    request = httpTestingController.expectOne(methode.name);
    expect(request.request.body).toEqual(expectedBody);
  } else {
    httpTestingController.expectNone(methode.name)
  }
  return request;
};

declare function isNone<D, T extends boolean>(x: T): T extends true ? void : D;

export const httpTest = <Req, Res>(httpTestingController: HttpTestingController, methode: Methode<Req, Res>) => {
  return (expectedBody: Req, flush: void | Res) => {
    const b_none: boolean = flush ? false : true;
    let request: TestRequest;
    if (methode.httpType === HttpType.GET) {
      request = queryTest(httpTestingController, methode, expectedBody, b_none);
    } else {
      request = bodyTest(httpTestingController, methode, expectedBody, b_none);
    }
    if (request && flush) {
      request.flush(flush);
    }
  };
};
