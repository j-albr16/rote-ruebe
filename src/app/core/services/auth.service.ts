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

  /**
   * Retrieving Userid from authenticated User Model
   */
  get userId(): string {
    return this.user.id;
  }

  /**
   * Checking Whether Auth Token is Available in Auth User Model
   */
  get isAuth(): boolean {
    return !!this.user?.loginToken;
  }

  /**
   * Get Auth String for API Authentication
   */
  getAuth(): string {
    return this.user.id + ':' + this.user.loginToken;
  }

  /**
   * Log In http Request. False => ErrorList. Valid => Auth User Model with Token
   * @param userData email password
   */
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

  /**
   * Making API Call to create new User Model
   * @param user User Data for new User. UserName, Password, ConfirmPassword, Email
   */
  public singUp(user: SignUpRequest): Observable<ErrorList | null> {
    return this.http.post<null>(AuthRoutes.SignUp, user).pipe(
      catchError<null, Observable<ErrorList | null>>((err: ErrorBody) => {
        if (err.errorList) {
          return of(err.errorList);
        }
      })
    );
  }

  /**
   * API Call to Request new Password. Email will be send to User email Address
   * @param user Email
   */
  public requestResetPassword(user: RequestResetPasswordRequest): Observable<ErrorList | null> {
    return this.http.post<null>(AuthRoutes.RequestResetPassword, user).pipe(
      catchError<null, Observable<ErrorList | null>>((err: ErrorBody) => {
        if (err.errorList) {
          return of(err.errorList);
        }
      })
    );
  }

  /**
   * API Call to Reset Password
   * @param user Password and Confirm Password.
   */
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
