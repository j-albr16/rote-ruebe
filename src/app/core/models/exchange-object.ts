import {staticImplements} from './model-helper';
import AppImage from './app-image';
import User from './user';
import {IAppImage, IExchangeObject, IUser} from 'rote-ruebe-types';
import {DomainConverter} from '@core/utils/domain-converter';
import {IHistoryEntry} from 'rote-ruebe-types/src/method-interfaces/index';


export default class ExchangeObject implements IExchangeObject {
  public get id(): string { return this.state.id };
  public get title(): string { return this.state.title };
  public get description(): string { return this.state.description };
  public get amount(): number { return this.state.amount };
  public get number(): number { return this.state.number};
  public get place(): string { return this.state.place};
  public get exchangeWay(): string { return this.state.exchangeWay };
  public get expiryDate(): Date { return this.state.expiryDate };
  public get b_free(): boolean { return this.state.b_free };
  public get b_completed(): boolean { return this.state.b_completed };
  public get b_anonymous(): boolean { return this.state.b_anonymous };
  public get history(): IHistoryEntry[] { return this.state.history }; // TODO History Entry should be a class in client i think
  public get provider(): User { return DomainConverter.fromDto(User, this.state.provider) }; // anonymous possible
  public get imageList(): AppImage[] { return this.state.imageList.map(iAppImage => DomainConverter.fromDto(AppImage, iAppImage)) };
  public get createdAt(): Date { return this.state.createdAt };
  public get updatedAt(): Date { return this.state.updatedAt };

  constructor(private state: IExchangeObject) {}
}
