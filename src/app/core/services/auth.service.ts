import {Injectable} from '@angular/core';
import User from '@core/models/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {
  AuthRoutes,
  ErrorList, LogInRequest, LogInResponse, RequestResetPasswordRequest, ResetPasswordRequest,
  routes, SignUpRequest,
} from 'rote-ruebe-types';
import AppHttpClient from '@core/utils/app-http-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  constructor(private http: AppHttpClient) {
  }

  get userId(): string {
    return this.user.id;
  }

  get isAuth(): boolean {
    return !!this.user?.loginToken;
  }

  getAuth(): string {
    return this.user.id + ':' + this.user.loginToken;
  }

  public logIn(userData: LogInRequest): Observable<void | string> {
    return this.http.post<void | string>(AuthRoutes.LogIn, userData).pipe(
      tap(data => {
        if (data.errorList) {
          return data.errorList;
        }
        this.user = User.fromJson(data.user);
      })
    );
  }

  public singUp(user: SignUpRequest): Observable<ErrorList | null> {
    return this.http.post<any>('/sign-up', user).pipe(
      tap(data => {
        if (data.errorList) return data.errorList;
      })
    );
  }

  public requestResetPassword(user: RequestResetPasswordRequest): Observable<ErrorList | null> {
    return this.http.post<any>(routes.get(AuthRoutes.RequestResetPassword), user).pipe(
      tap(data => {
        if (data.errorList) return data.errorList;
      })
    );
  }

  public resetPassword(user: ResetPasswordRequest): Observable<ErrorList | null> {
    return this.http.post<any>('/reset-password', user).pipe(
      tap(data => {
        if (data.errorList) return data.errorList;
      })
    );
  }
}
