import {staticImplements} from './model-helper';
import type ExchangeObject from './exchange-object';

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

  constructor(constructor: CommentAttributes) {
    this.id = constructor.id;
    this.author = constructor.author;
    this.text = constructor.text;
    this.exchangeObject = constructor.exchangeObject;
  }

  public static fromJson(json: string): Comment {
    return new Comment(JSON.parse(json));
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

}
