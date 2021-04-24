import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import User from '@core/models/user';
import {UserFilter} from '@shared/types/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  /**
   * @return an Observable that emits true and completes when the request is accepted by the server. Otherwise it emits an Error
   */
  sendRequest(request: Request): Observable<boolean>{
    throw Error('sendRequest in @core/services/user.service is not implemented');
    return;
  }

  /**
   * @return an Observable that emits the according User model for the given userId.
   */
  getUser(userId: string): Observable<User>{
    throw Error('getUser in @core/services/user.service is not implemented');
    return;
  }
  /**
   * @return an Observable that will emit requested User matching given UserFilter in the order defined by the UserFilter.
   * @return the Subject that lets you request more Users by emitting the wanted number.
   */
  getUsers(filter: UserFilter): {observable: Observable<User>, subject: Subject<number>}{
    throw Error('getUsers in @core/services/user.service is not implemented');
    return;
  }
  /**
   * @return User model of the device User
   */
  getMyUser(): Observable<User>{
    throw Error('getMyUser in @core/services/user.service is not implemented');
    return;
  }
  /**
   * @return Observable either emits true and completes when the server accepts the change or errors
   */
  changeMyUser(changedUser: User): Observable<boolean>{
    throw Error('changeMyUser in @core/services/user.service is not implemented');
    return;
  }
  /**
   * Fetches the User model of given user weather or not it is already cached client side.
   *  @return Observable either emits true and completes when the User is fetched or errors
   */
  refreshUser(user: User): Observable<boolean>{
    throw Error('refreshUser in @core/services/user.service is not implemented');
    return;
  }
}
