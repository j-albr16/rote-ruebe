import {staticImplements} from './model-helper';
import type ExchangeObject from './exchange-object';
import {IRequest, Status} from 'rote-ruebe-types';


export default class Request implements IRequest{
  public get id(): string { return this.state.id };
  public get amount(): number { return this.state.amount };
  public get number(): number { return this.state.number };
  public get text(): string { return this.state.text };
  public get sender(): string { return this.state.sender };
  public get receiver(): string { return this.state.receiver };
  public get exchangeObjectId(): string { return this.state.exchangeObjectId };
  public get createdAt(): Date { return this.state.createdAt };
  public get read(): boolean { return this.state.read };
  public get status(): Status { return this.state.status };

  constructor(private state: IRequest) {}


}
