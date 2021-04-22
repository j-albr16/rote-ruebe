import type Image from './image';
import {staticImplements} from './model-helper';

interface UserAttributes {
  id: string;
  userName: string;
  description?: string;
  email: string;
  createdAt: Date;
  image?: Image;
  loginToken?: string;
}

type Optional<T> = {
  [P in keyof T]?: T[P];
}



interface UserMethods {
  toJson(): string;
}

interface UserStatics {
  new(): UserMethods;

  fromJson(json: string): User;
}

@staticImplements<UserStatics>()
export default class User implements UserAttributes {
  public id!: string;
  public userName!: string;
  public description?: string;
  public email!: string;
  public image?: Image;
  public loginToken?: string;
  public readonly createdAt!: Date;

  constructor(constructor: UserAttributes) {
    this.id = constructor.id;
    this.userName = constructor.userName;
    this.description = constructor.description;
    this.email = constructor.email;
    this.image = constructor.image;
    this.createdAt = constructor.createdAt;
    this.loginToken = constructor.loginToken;
  }

  public static fromJson(json: UserAttributes): User {
    const object = {...json};
    object.createdAt = new Date(object.createdAt);
    return new User(object);
  }

  public toJson(): string {
    const object: any = {...this};
    object.createdAt = object.createdAt.toISOString();
    return object;
  }

}
