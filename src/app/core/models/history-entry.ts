import {DomainConverter} from '@core/utils/domain-converter';
import {IHistoryEntry} from 'rote-ruebe-types';
import {Timestamp} from 'rote-ruebe-types/src/utils/index';
import {HistoryAction} from 'rote-ruebe-types/src/method-interfaces/my-exchange-object';
import {version} from 'punycode';

/*export interface IHistoryEntry extends Timestamp {
  id: string;
  text: string;
  action: HistoryAction;
}*/


export default class HistoryEntry implements IHistoryEntry {
  public get id(): string { return this.state.id };
  public get text(): string { return this.state.text };
  public get action(): HistoryAction { return this.state.action };
  public get createdAt(): Date { return this.state.createdAt };
  public get updatedAt(): Date { return this.state.updatedAt };

  constructor(private state: IHistoryEntry) {
  }
}
