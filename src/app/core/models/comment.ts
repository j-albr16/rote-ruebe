import {staticImplements} from './model-helper';
import type ExchangeObject from './exchange-object';
import type User from './user';

interface CommentAttributes {
  id: string;
  text: string;
  author?: User;
  exchangeObject?: ExchangeObject;
}

interface CommentMethods {
  toJson: () => string;
}

interface CommentStatic {
  new(): CommentMethods;

  fromJson(json: string): Comment;
}

@staticImplements<CommentStatic>()
export default class Comment implements CommentAttributes, CommentMethods {
  public id!: string;
  public text!: string;
  public author?: User;
  public exchangeObject?: ExchangeObject;

  constructor(attributes: CommentAttributes) {
    this.id = attributes.id;
    this.author = attributes.author;
    this.text = attributes.text;
    this.exchangeObject = attributes.exchangeObject;
  }

  public static fromJson(json: string): Comment {
    return new Comment(JSON.parse(json));
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

}
