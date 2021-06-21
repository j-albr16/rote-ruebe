import {IExchangeObject, IRequest, Status} from 'rote-ruebe-types';
import User from '@core/models/user';
import {DomainConverter} from '@core/utils/domain-converter';


export default class Request implements IRequest{
  public get id(): string { return this.state.id };
  public get amount(): number { return this.state.amount };
  public get number(): number { return this.state.number };
  public get text(): string { return this.state.text };
  public get sender(): User { return DomainConverter.fromDto(User, this.state.sender) };
  public get receiver(): string { return this.state.exchangeObject.provider.id };
  public get createdAt(): Date { return this.state.createdAt };
  public get status(): Status { return this.state.status };
  public get exchangeObject(): IExchangeObject { return this.state.exchangeObject}

  constructor(private state: IRequest) {}
}

export class OutgoingRequest extends Request{}
export class IncomingRequest extends Request{}
