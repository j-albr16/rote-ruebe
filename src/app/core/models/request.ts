import {staticImplements} from './model-helper';
import type ExchangeObject from './exchange-object';

// TODO: Add Status to Model
// TODO: Add Read to Model
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

  constructor(constructor: RequestAttributes) {
    this.id = constructor.id;
    this.amount = constructor.amount;
    this.text = constructor.text;
    this.sender = constructor.sender;
    this.receiver = constructor.receiver;
    this.exchangeObject = constructor.exchangeObject;
    this.createdAt = constructor.createdAt;
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
