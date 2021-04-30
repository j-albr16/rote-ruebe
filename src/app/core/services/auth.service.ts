import {Injectable} from '@angular/core';
import User from '@core/models/user';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ErrorList, LogInUserData, RequestResetPasswordUserData, ResetPasswordUserData, SignInUserData} from '@shared/types/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;

  constructor(private http: HttpClient) {
  }

  get userId(): string {
    return  this.userId;
  }

  get isAuth(): boolean {
    return !!this.user?.loginToken;
  }

  getAuth(): string {
    return this.user.id + ':' + this.user.loginToken;
  }

  // tslint:disable-next-line:typedef
  public logIn(userData: LogInUserData): Observable<ErrorList | null> {
    return this.http.post<any>('/log-in', userData).pipe(
      tap(data => {
        if (data.errorList) {
          return data.errorList;
        }
        this.user = User.fromJson(data.user);
      })
    );
  }

  public singUp(user: SignInUserData): Observable<ErrorList | null> {
    return this.http.post<any>('/sign-up', user).pipe(
      tap(data => {
        if (data.errorList) return data.errorList;
      })
    );
  }

  public requestResetPassword(user: RequestResetPasswordUserData): Observable<ErrorList | null> {
    return this.http.post<any>('/request-reset-password', user).pipe(
      tap(data => {
        if (data.errorList) return data.errorList;
      })
    );
  }

  public resetPassword(user: ResetPasswordUserData): Observable<ErrorList | null> {
    return this.http.post<any>('/reset-password', user).pipe(
      tap(data => {
        if (data.errorList) return data.errorList;
      })
    );
  }
}
