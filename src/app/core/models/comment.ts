import {IComment} from 'rote-ruebe-types';
import User from '@core/models/user';
import {DomainConverter} from '@core/utils/domain-converter';


export default class Comment implements IComment {
  public get id(): string { return this.state.id };
  public get text(): string { return  this.state.text};
  public get author(): User { return DomainConverter.fromDto(User, this.state.author)};
  public get exchangeObjectId(): string { return this.state.exchangeObjectId};
  public get updatedAt(): Date { return this.state.updatedAt }
  public get createdAt(): Date { return this.state.createdAt }

  constructor(private state: IComment) {
  }
}

// TODO Discuss renaming to AppComment as there seems to be a native type "Comment"
