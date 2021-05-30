
import {IComment, IUser} from 'rote-ruebe-types';


export default class Comment implements IComment {
  public get id(): string { return this.state.id };
  public get text(): string { return  this.state.text};
  public get author(): IUser { return this.state.author};
  public get exchangeObjectId(): string { return this.state.exchangeObjectId};
  public get updatedAt(): Date { return this.state.updatedAt }
  public get createdAt(): Date { return this.state.createdAt }

  constructor(private state: IComment) {
  }
}

