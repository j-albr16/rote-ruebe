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

  constructor(attributes: MessageAttributes) {
    this.id = attributes.id;
    this.message = attributes.message;
    this.createdAt = attributes.createdAt;
    this.sender = attributes.sender;
    this.receiver = attributes.receiver;
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
