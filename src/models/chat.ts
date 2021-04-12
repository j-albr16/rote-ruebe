import type Message from './message';

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

  constructor(constructor: ChatAttributes) {
    this.userList = constructor.userList;
    this.messageList = constructor.messageList;
  }

  public addMessage(message: Message): void {
    this.messageList.push(message);
  }
}
