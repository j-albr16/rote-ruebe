import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BehaviorSubject, from, Observable, Subject} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';

import {
  routes,
  UserFilter,
  UserListRequest,
  UserListResponse,
  UserRequest,
  UserResponse,
  UserRoutes,
  ChangeUserRequest,
} from 'rote-ruebe-types';

import MemorySubject from '@core/utils/rxjs/MemorySubject';
import User from '@core/models/user';
import Image from '@core/models/image';
import {AuthService} from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userMap = new Map();

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * @return an Observable that emits the according User model for the given userId.
   */
  getUser(userId: string): Observable<User>{
    if (this.userMap.get(userId) != null){
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
  getUsers(filter: UserFilter): {observable: Observable<User>, subject: Subject<number>}{
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
  getMyUser(): Observable<User>{
    return this.getUser(this.authService.userId);
  }

  /**
   * @return Observable either emits true and completes when the server accepts the change or errors
   */
  changeMyUser(changedUser: ChangeUserRequest): Observable<boolean>{
    const request: ChangeUserRequest = changedUser;
    return this.http.post(routes.get(UserRoutes.ChangeUser), request).pipe(
      map(value => true),
    );
  }

  /**
   * Fetches the User model of given user weather or not it is already cached client side.
   *  @return Observable either emits true and completes when the User is fetched or errors
   */
  refreshUser(userId: string): Observable<boolean>{
    this.userMap.delete(userId);

    return this.getUser(userId).pipe(
      map(value => true),
    )
  }

  private fetchUserList(userFilter: UserFilter, amount: number, furthestUserId?: string): Observable<User>{
    const request: UserListRequest = {
      amount,
      furthestUserId,
      userFilter,
    };

    return this.http.get(routes.get(UserRoutes.FetchUserList), {
      params: this.getParams(request),
    }).pipe(
      mergeMap(value => {
        const res = value as UserListResponse;
        return from(res.userList).pipe(
          map(valueEntry => {
            const userResponse = valueEntry as UserResponse;
            return this.responseToUser(userResponse);
          })
        )
      })
    );
  }


  private fetchUser(userId: string): Observable<User>{
    return this.http.get(routes.get(UserRoutes.FetchUser), {
      params: {userId}
    }).pipe(
      map(value => {
        const res: UserResponse = value as UserResponse;
        return this.responseToUser(res);
      })
    )
  }

  private responseToUser(response: UserResponse): User{
    return new User({
      id: response.id,
      createdAt: response.createdAt,
      description: response.description,
      email: response.email,
      image: new Image(response.image),
      userName: response.userName,
    });
  }

  private getParams(object: any): HttpParams{
    let httpParams = new HttpParams();
    Object.keys(object).forEach( (key) => {
      httpParams = httpParams.append(key, JSON.stringify(object[key]));
    });
    return httpParams;
  }

}
