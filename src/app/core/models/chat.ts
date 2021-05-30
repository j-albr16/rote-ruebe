import Message from './message';
import User from './user';
import {IChat, IMessage, IUser} from 'rote-ruebe-types';
import {DomainConverter} from '@core/utils/domain-converter';


export default class Chat implements IChat {

  public get id(): string { return this.state.id; }
  public get userList(): IUser[] { return this.state.userList }
  public get messageList(): IMessage[] { return this.state.messageList }
  public get createdAt(): Date { return this.state.createdAt; }
  public get updatedAt(): Date { return this.state.updatedAt; }

  constructor(private state: IChat) {
  }

  public addMessage(message: Message): void {
    this.state.messageList.push(message);
  }
}
