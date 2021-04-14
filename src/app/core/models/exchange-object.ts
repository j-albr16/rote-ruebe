import {staticImplements} from './model-helper';
import type Image from './image';
import type User from './user';

interface ExchangeObjectAttributes {
  id: string;
  title: string;
  description: string;
  amount?: number;
  number?: number;
  createdAt: Date;
  place: string;
  exchange: string;
  expiryDate?: Date;
  b_free: boolean;
  b_anonymous: boolean;
  provider?: User; // anonymous possible
  imageList: Image[];
// TODO: Implement Category Implement Tag
}

interface ExchangeObjectMethods {
  toJson(): string;
}

interface ExchangeObjectStatic {
  new(): ExchangeObjectMethods;

  fromJson(json: string): ExchangeObject;
}

@staticImplements<ExchangeObjectStatic>()
export default class ExchangeObject implements ExchangeObjectMethods, ExchangeObjectAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public amount?: number;
  public number?: number;
  public place!: string;
  public exchange!: string;
  public expiryDate?: Date;
  public b_free!: boolean;
  public b_anonymous!: boolean;
  public provider?: User; // anonymous possible
  public imageList!: Image[];
  public readonly createdAt!: Date;

  constructor(constructor: ExchangeObjectAttributes) {
    this.id = constructor.id;
    this.title = constructor.title;
    this.description = constructor.description;
    this.amount = constructor.amount;
    this.number = constructor.number;
    this.createdAt = constructor.createdAt;
    this.place = constructor.place;
    this.exchange = constructor.exchange;
    this.expiryDate = constructor.expiryDate;
    this.b_free = constructor.b_free;
    this.provider = constructor.provider;
    this.imageList = constructor.imageList;
    this.b_anonymous = constructor.b_anonymous;
  }

  public static fromJson(json: string): ExchangeObject {
    const object = JSON.parse(json);
    object.createdAt = new Date(object.createdAt);
    return new ExchangeObject(object);
  }

  public toJson(): string {
    return JSON.stringify(this);
  }


}
