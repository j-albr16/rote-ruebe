import {Injectable} from '@angular/core';
import User from '@core/models/user';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {
  ErrorBody,
  AuthRoutes,
  ErrorList,
  LogInRequest,
  LogInResponse,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
  SignUpRequest,
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

  public logIn(userData: LogInRequest): Observable<ErrorList | null> {
    return this.http.post<LogInResponse>(AuthRoutes.LogIn, userData).pipe(
      tap(data => {
        this.user = User.fromJson(data);
      }),
      catchError<null, Observable<ErrorList | null>>((err: ErrorBody) => {
        if (err.errorList) {
          return of(err.errorList);
        }
      })
    );
  }

  public singUp(user: SignUpRequest): Observable<ErrorList | null> {
    return this.http.post<null>(AuthRoutes.SignUp, user).pipe(
      catchError<null, Observable<ErrorList | null>>((err: ErrorBody) => {
        if (err.errorList) {
          return of(err.errorList);
        }
      })
    );
  }

  public requestResetPassword(user: RequestResetPasswordRequest): Observable<ErrorList | null> {
    return this.http.post<null>(AuthRoutes.RequestResetPassword, user).pipe(
      catchError<null, Observable<ErrorList | null>>((err: ErrorBody) => {
        if (err.errorList) {
          return of(err.errorList);
        }
      })
    );
  }

  public resetPassword(user: ResetPasswordRequest): Observable<ErrorList | null> {
    return this.http.post<null>(AuthRoutes.ResetPassword, user).pipe(
      catchError<null, Observable<ErrorList | null>>((err: ErrorBody) => {
        if (err.errorList) {
          return of(err.errorList);
        }
      })
    );
  }
}
