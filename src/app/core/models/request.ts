import {IRequest, Status} from 'rote-ruebe-types';
import User from '@core/models/user';
import {DomainConverter} from '@core/utils/domain-converter';


export default class Request implements IRequest{ // TODO make two Request models inherited from this (IncomingRequests, OutgoingRequests)
  public get id(): string { return this.state.id };
  public get amount(): number { return this.state.amount };
  public get number(): number { return this.state.number };
  public get text(): string { return this.state.text };
  public get sender(): User { return DomainConverter.fromDto(User, this.state.sender) };
  // public get receiver(): string { return this.state.receiver }; // TODO will get IExchangeObject to retrieve receiver and id
  public get exchangeObjectId(): string { return this.state.exchangeObjectId };
  public get createdAt(): Date { return this.state.createdAt };
  public get read(): boolean { return this.state.read };
  public get status(): Status { return this.state.status };

  constructor(private state: IRequest) {}


}
