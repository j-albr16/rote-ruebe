import {staticImplements} from './model-helper';

interface MessageAttributes {
  id: string;
  message: string;
  createdAt: Date;
  sender: string; // userId
  receiver: string; // userId
}

interface MessageMethods {
  toJson(): string;
}

interface MessageStatic {
  new(): MessageMethods;
  fromJson(json: string): Message;
}


@staticImplements<MessageStatic>()
export default class Message implements MessageAttributes, MessageMethods {
  public id!: string;
  public message!: string;
  public sender!: string;
  public receiver!: string;
  public readonly createdAt!: Date;

  constructor(constructor: MessageAttributes) {
    this.id = constructor.id;
    this.message = constructor.message;
    this.createdAt = constructor.createdAt;
    this.sender = constructor.sender;
    this.receiver = constructor.receiver;
  }

  public static fromJson(json: string): Message {
    const object = JSON.parse(json);
    object.createdAt = new Date(object.createdAt);
    return new Message(object);
  }

  public toJson(): string {
    return JSON.stringify(this);
  }
}
