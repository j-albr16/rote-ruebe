import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import User from '@core/models/user';
import Message from '@core/models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() { }
  /**
   * @return Returns an Observable that emits the last Message of each given user in userList as a {User, Message} Object
   */
  getLatestMessage(userList: User[]): Observable<{user: User, message: Message}>{
    throw Error('getLatestMessage in @core/services/chat.service is not implemented');
    return;
  }

  /**
   * @return The Observable will emit requested Messages from given User in the order old -> new.
   * @return With the Subject you can request more Messages by emitting the wanted number.
   */
  getMessages(user: User): {observable: Observable<Message>, subject: Subject<number>} {
    throw Error('getMessages in @core/services/chat.service is not implemented');
    return;
  }

  /**
   * @return The returned Observable will emit new incoming Messages until unsubscribed
   */
  getNewMessages(): Observable<{ user: User, message: Message}>{
    throw Error('getNewMessages in @core/services/chat.service is not implemented');
    return;
  }

  /**
   * @return Returns a {User, number} Object that describes the number of unread Messages in the chat with associated user.
   * @return After the initial emit it will emit new UnreadMessages until unsubscribed
   */
  getUnreadMessages(): Observable<{user: User, amount: number}>{
    throw Error('getUnreadMessages in @core/services/chat.service is not implemented');
    return;
  }

  /**
   * Marks every Message the device User has with the given User as read.
   * Will instantly mark any new Message with given User as read as long as given Observable is not completed.
   */
  markMessagesAsRead(userObs: Observable<User>): void{
    throw Error('markMessagesAsRead in @core/services/chat.service is not implemented');
    return;
  }

  /**
   * Sends a chat message to the Server
   * @return the Observable will emit true if the Message is send successfully.
   */
  sendMessage(message: Message): Observable<boolean>{
    throw Error('sendMessage in @core/services/chat.service is not implemented');
    return;
  }
}
