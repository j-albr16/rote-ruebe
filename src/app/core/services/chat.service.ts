import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import User from '@core/models/user';
import Message from '@core/models/message';
import Chat from '@core/models/chat';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor() {
  }

  getChatList(): {observable: Observable<Chat>, subject: Subject<number>} {
    return;
  }

  getMessages(chat: Chat): { observable: Observable<Message>, subject: Subject<number> } {
    return;
  }

  getNewMessages(): Observable<{chat: Chat, user: User, message: Message, read: boolean }> { // TODO Talk about read:boolean
    return;
  }

  getUnreadChats(): Observable<{chat: Chat, unreadCount: number}> {
    return;
  }

  getChat(chatId: string): Observable<Chat> {
    return;
  }

  sendMessage(message: Message): Observable<boolean> {
    return;
  }
}
