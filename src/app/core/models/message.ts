import {staticImplements} from './model-helper';
import {IMessage, IUser} from 'rote-ruebe-types';


export default class Message implements IMessage {
  public get id(): string { return this.state.id};
  public get message(): string { return this.state.message };
  public get sender(): IUser { return this.state.sender };
  public get receiver(): IUser { return this.state.receiver };
  public get createdAt(): Date { return this.state.createdAt };

  constructor(private state: IMessage) {}

}
