import {Injectable} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {from, Observable, Subject} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';

import {ChangeUser, FetchUserList, routes, Methode, UserFilter, UserRoutes, FetchUser} from 'rote-ruebe-types';

import MemorySubject from '@core/utils/rxjs/MemorySubject';
import User from '@core/models/user';
import AppImage from '@core/models/app-image';
import {AuthService} from '@core/services/auth.service';
import AppHttpClient from '@core/utils/app-http-client';
import {DomainConverter} from '@core/utils/domain-converter';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userMap = new Map();

  constructor(private http: AppHttpClient, private authService: AuthService) {
  }

  /**
   * @return an Observable that emits the according User model for the given userId.
   */
  getUser(userId: string): Observable<User> {
    if (this.userMap.get(userId) != null) {
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
  getUsers(filter: UserFilter): { observable: Observable<User>, subject: Subject<number> } {
    const userSender = new MemorySubject<User>();
    const amountSender = new Subject<number>();

    amountSender.pipe(
      tap(amount => this.fetchUserList(filter, amount, userSender.latestValue?.id).pipe(
        tap(user => this.userMap.set(user.id, user)),
        map(user => userSender.next(user)),
      ))
    ).subscribe({complete: () => userSender.complete()});
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
  changeMyUser(changedUserBody: ChangeUser.Request, changedUserQueries: ChangeUser.Queries): Observable<boolean> {
    return this.http.request(ChangeUser.methode)(changedUserBody, changedUserQueries).pipe(map(value => true));
  }

  /**
   * Fetches the User model of given user weather or not it is already cached client side.
   *  @return Observable either emits true and completes when the User is fetched or errors
   */
  refreshUser(userId: string): Observable<boolean> {
    this.userMap.delete(userId);

    return this.getUser(userId).pipe(
      map(value => true),
    );
  }

  private fetchUserList(userFilter: UserFilter, amount: number, furthestUserId?: string): Observable<User>{
    return this.http.request(FetchUserList.methode)({userFilter}, {amount, furthestUserId}).pipe(
      mergeMap((value: FetchUserList.Response) => {
        // const res = value as UserListResponse;
        return from(value.userList).pipe(
          // return from(res.userList).pipe(
          map(userResponse => {
            return DomainConverter.fromDto(User, userResponse);
          })
        );
        })
    );
  }


  private fetchUser(userId: string): Observable<User> {
    return this.http.request(FetchUser.methode)(null, {userId}).pipe(
      map((userResponse: FetchUser.Response) =>
      DomainConverter.fromDto(User, userResponse))
    );
  }

}
