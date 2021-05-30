import type AppImage from './app-image';
import {staticImplements} from './model-helper';
import {IAppImage, IUser} from 'rote-ruebe-types';



export default class User implements IUser {
  public get id(): string { return this.state.id };
  public get userName(): string { return this.state.userName };
  public get description(): string { return this.state.description };
  public get email(): string { return this.state.email };
  public get image(): IAppImage { return this.state.image };
  public get createdAt(): Date { return this.state.createdAt };
  public get updatedAt(): Date { return this.state.updatedAt }

  constructor(private state: IUser) {
  }
}
