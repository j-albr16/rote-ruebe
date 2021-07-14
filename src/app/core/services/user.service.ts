import {Injectable} from '@angular/core';
import {from, Observable, ReplaySubject, Subject} from 'rxjs';
import {catchError, finalize, map, mergeMap, tap} from 'rxjs/operators';

import {ChangeUser, FetchUserList, UserFilter, FetchUser} from 'rote-ruebe-types';

import User from '@core/models/user';
import {AuthService} from '@core/services/auth.service';
import AppHttpClient from '@core/utils/app-http-client';
import {DomainConverter} from '@core/utils/domain-converter';


@Injectable({
  providedIn: 'root'
})
export class UserService{
  private userMap = new Map<string, User>();

  constructor(private http: AppHttpClient, private authService: AuthService) {
  }

  initUserMap(initUserMap: Map<string, User>): void{
    this.userMap = initUserMap;
  }

  /**
   * @return an Observable that emits the according User model for the given userId.
   */
  getUser(userId: string): Observable<User> {
    if (this.userMap.get(userId) !== null && this.userMap.get(userId) !== undefined) {
      return new Observable<User>(sub => {
        sub.next(this.userMap.get(userId));
        sub.complete();
      });
    }

    return this.fetchUser(userId).pipe(
      tap(user => this.userMap.set(user.id, user)),
    );
  }

  /**
   * @return an Observable that will emit requested User matching given UserFilter in the order defined by the UserFilter.
   * @return the Subject that lets you request more Users by emitting the wanted number.
   */
  getUserList(filter: UserFilter): { observable: Observable<User>, subject: Subject<number> } {
    const userSender = new ReplaySubject<User>();
    const amountSender = new Subject<number>();
    let furthestUser: User = null;

    amountSender
    .subscribe({
      next: (amount) => this.fetchUserList(() => amountSender.complete(), filter, amount, furthestUser?.id).pipe(
        tap(user => this.userMap.set(user.id, user)),
      ).subscribe(user => {

        furthestUser = user;
        userSender.next(user);
      }),
      complete: () => userSender.complete()
    });

    return {
      observable: userSender.asObservable(),
      subject: amountSender,
    };
  }

  /**
   * @return User model of the device User
   */
  getMyUser(): Observable<User> {
    return this.getUser(this.authService.userId);
  }

  /**
   * @return Observable either emits true and completes when the server accepts the change or errors
   */
  changeMyUser(changedUserBody: ChangeUser.Request): Observable<User> {
    return this.http.request(ChangeUser.methode)(changedUserBody).pipe(
      map((userResponse: FetchUser.Response) =>
        DomainConverter.fromDto(User, userResponse)),
      catchError((error, obs) => {
        console.error(error.error.message);
        return obs;
      })
    );
  }

  /**
   * Fetches the User model of given user weather or not it is already cached client side.
   *  @return Observable either emits the refreshed User and completes when the User is fetched or errors
   */
  refreshUser(userId: string): Observable<User> {
    this.userMap.delete(userId);

    return this.getUser(userId);
  }

  private fetchUserList(complete: () => void, userFilter: UserFilter, amount: number, furthestUserId?: string): Observable<User>{
    return this.http.request(FetchUserList.methode)({userFilter, amount, furthestUserId}).pipe(
      mergeMap((response: FetchUserList.Response) => {

        return from(response.userList).pipe(
          map(userResponse => {
            return DomainConverter.fromDto(User, userResponse);
          }),
          finalize(() => {
            if (response.userList.length < amount) {
              complete()
            }
          }),
        );
        }),
      catchError((error, obs) => {
        console.error(error.error.message);
        return obs;
      })
    );
  }


  private fetchUser(userId: string): Observable<User> {
    return this.http.request(FetchUser.methode)({userId}).pipe(
      map((userResponse: FetchUser.Response) =>
        DomainConverter.fromDto(User, userResponse)),
      catchError((error, obs) => {
        console.error(error.error.message);
        return obs;
      })
    );
  }

}
