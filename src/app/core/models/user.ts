import type Image from './image';
import {staticImplements} from './model-helper';

interface UserAttributes {
  id: string;
  userName: string;
  description?: string;
  email: string;
  createdAt: Date;
  image?: Image;
  password?: string;
}

interface UserMethods {
  toJson(): string;
}

interface UserStatics {
  new(): UserMethods;

  fromJson(json: string): User;
}

@staticImplements<UserStatics>()
export default class User implements UserAttributes, UserMethods {
  public id!: string;
  public userName!: string;
  public description?: string;
  public email!: string;
  public image?: Image;
  public password?: string;
  public readonly createdAt!: Date;

  constructor(constructor: UserAttributes) {
    this.id = constructor.id;
    this.userName = constructor.userName;
    this.description = constructor.description;
    this.email = constructor.email;
    this.image = constructor.image;
    this.password = constructor.password;
    this.createdAt = constructor.createdAt;
  }

  public static fromJson(json: string): User {
    const object = JSON.parse(json);
    object.createdAt = new Date(object.createdAt);
    return new User(object);
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

}
