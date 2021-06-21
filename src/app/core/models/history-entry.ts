import {IHistoryEntry, HistoryAction} from 'rote-ruebe-types';

export default class HistoryEntry implements IHistoryEntry {
  public get id(): string { return this.state.id };
  public get text(): string { return this.state.text };
  public get action(): HistoryAction { return this.state.action };
  public get createdAt(): Date { return this.state.createdAt };
  public get updatedAt(): Date { return this.state.updatedAt };

  constructor(private state: IHistoryEntry) {
  }
}
