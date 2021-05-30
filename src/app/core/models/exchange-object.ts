import {staticImplements} from './model-helper';
import type AppImage from './app-image';
import type User from './user';
import {IAppImage, IExchangeObject, IUser} from 'rote-ruebe-types';


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
  public get b_anonymous(): boolean { return this.state.b_anonymous };
  public get provider(): IUser { return this.state.provider }; // anonymous possible
  public get imageList(): IAppImage[] { return this.state.imageList };
  public get createdAt(): Date { return this.state.createdAt };
  public get updatedAt(): Date { return this.state.updatedAt };

  constructor(private state: IExchangeObject) {}
}
