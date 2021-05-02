import {staticImplements} from './model-helper';
import type ExchangeObject from './exchange-object';

interface RequestAttributes {
  id: string;
  amount: number;
  text: string;
  createdAt: Date;
  sender?: string; // userId
  receiver?: string; // userId
  exchangeObject?: ExchangeObject;
}

interface RequestMethods {
  toJson: () => string;
}

interface RequestStatic {
  new(): RequestMethods;
  fromJson: (json: string) => Request;
}

@staticImplements<RequestStatic>()
export default class Request implements RequestAttributes, RequestMethods{
  public id!: string;
  public amount!: number;
  public text!: string;
  public sender?: string;
  public receiver?: string;
  public exchangeObject?: ExchangeObject;
  public readonly createdAt!: Date;

  constructor(attributes: RequestAttributes) {
    this.id = attributes.id;
    this.amount = attributes.amount;
    this.text = attributes.text;
    this.sender = attributes.sender;
    this.receiver = attributes.receiver;
    this.exchangeObject = attributes.exchangeObject;
    this.createdAt = attributes.createdAt;
  }

  public static fromJson(json: string): Request {
    const object = JSON.parse(json);
    object.createdAt = new Date(object.createdAt);
    return new Request(object);
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

}
