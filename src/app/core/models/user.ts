import AppImage from './app-image';
import {IAppImage, IUser} from 'rote-ruebe-types';
import {DomainConverter} from '@core/utils/domain-converter';



export default class User implements IUser {
  public get id(): string { return this.state.id };
  public get userName(): string { return this.state.userName };
  public get description(): string { return this.state.description };
  public get email(): string { return this.state.email };
  public get image(): AppImage { return DomainConverter.fromDto(AppImage, this.state.image) };
  public get createdAt(): Date { return this.state.createdAt };
  public get updatedAt(): Date { return this.state.updatedAt }

  constructor(private state: IUser) {
  }
}
