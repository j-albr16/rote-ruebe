import type Message from './message';
import type User from './user';

interface ChatAttributes {
  userList: User[];
  messageList: Message[];
}

interface ChatMethods {
  addMessage(message: Message): void;
}

export default class Chat implements ChatAttributes, ChatMethods {
  public readonly userList!: User[];
  public readonly messageList!: Message[];

  constructor(attributes: ChatAttributes) {
    this.userList = attributes.userList;
    this.messageList = attributes.messageList;
  }

  public addMessage(message: Message): void {
    this.messageList.push(message);
  }
}
