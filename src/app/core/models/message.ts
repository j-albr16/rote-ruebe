import {staticImplements} from './model-helper';
import {IMessage, IUser} from 'rote-ruebe-types';
import {DomainConverter} from '@core/utils/domain-converter';
import User from '@core/models/user';


export default class Message implements IMessage {
  public get id(): string { return this.state.id};
  public get message(): string { return this.state.message };
  public get sender(): User { return DomainConverter.fromDto(User, this.state.sender) };
  public get receiver(): User { return DomainConverter.fromDto(User, this.state.receiver) };
  public get createdAt(): Date { return this.state.createdAt };

  constructor(private state: IMessage) {}

}
