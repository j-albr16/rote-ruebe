import {staticImplements} from './model-helper';
import {IAppImage} from 'rote-ruebe-types';


export default class AppImage implements IAppImage {
  public get id(): string { return this.state.id };
  public get title(): string { return this.state.title };
  public get description(): string { return this.description };
  public get createdAt(): Date { return this.createdAt };
  public get updatedAt(): Date { return this.updatedAt }

  constructor(private state: IAppImage) {}

}
