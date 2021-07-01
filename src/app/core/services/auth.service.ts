import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {
  Login,
  RequestResetPassword,
  ResetPassword,
  Signup,
  TryAutoLogin,
} from 'rote-ruebe-types';
import AppHttpClient from '@core/utils/app-http-client';


export function authFactory(authService: AuthService): () => Promise<void> {
  return () => authService.tryAutoLogin();
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginToken: string;
  private _userId: string;

  constructor(private http: AppHttpClient) { // private cookieService: CookieService
  }

  /**
   * Retrieving Userid from authenticated User Model
   */
  get userId(): string {
    return this._userId;
  }

  /**
   * Checking Whether Auth Token is Available in Auth User Model
   */
  get isAuth(): boolean {
    return true;
    // return !!this._loginToken;
  }

  /**
   * Get Auth String for API Authentication
   */
  getAuth(): string {
    return this._userId + ':' + this._loginToken;
  }

  /**
   * Try to Auto Log In. Retrieve Cookies from Browser and Server Validate them,
   * Is Called Right when Auth Service is Init
   */
  public tryAutoLogin(): Promise<void> {
    const token = null; // this.cookieService.getCookie(COOKIES.TOKEN);
    const userId = null; // this.cookieService.getCookie(COOKIES.USER_ID);
    if (!token || !userId) {
      return;
    }
    const userData: TryAutoLogin.Request = {
      id: userId,
      loginToken: token,
    };

    this.http.request(TryAutoLogin.methode)(userData).subscribe(
      (authData) => {
        this._loginToken = authData.loginToken;
        this._userId = authData.id;
      },
      err => {
        if (err) return;
      }
    );
  }

  /**
   * Log In http Request. False => ErrorList. Valid => Auth User Model with Token
   * @param userData email password
   */
  public logIn(userData: Login.Request): Observable<string | null> {
    return this.http.request(Login.methode)(userData).pipe(
      tap(data => {
        this._userId = data.id;
        this._loginToken = data.loginToken;
      }),
      catchError<null, Observable<string | null>>(err => of(err)));
  }

  /**
   * Making API Call to create new User Model
   * @param user User Data for new User. UserName, Password, ConfirmPassword, Email
   */
  public singUp(user: Signup.Request): Observable<string | null> {
    return this.http.request(Signup.methode)(user).pipe(
      catchError<null, Observable<string | null>>(err => of(err))
    );
  }

  /**
   * API Call to Request new Password. Email will be send to User email Address
   * @param user Email
   */
  public requestResetPassword(user: RequestResetPassword.Request): Observable<string | null> {
    return this.http.request(RequestResetPassword.methode)(user).pipe(
      catchError<null, Observable<string | null>>(err => of(err))
    );
  }

  /**
   * API Call to Reset Password
   * @param user Password and Confirm Password.
   */
  public resetPassword(user: ResetPassword.Request): Observable<string | null> {
    return this.http.request(ResetPassword.methode)(user).pipe(
      catchError<null, Observable<string | null>>(err => of(err))
    );
  }
}
