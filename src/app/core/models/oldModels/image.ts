import {staticImplements} from './model-helper';

interface ImageAttributes {
  id: string;
  title: string;
  description?: string;
  createdAt: Date;
}

interface ImageMethods {
  toJson(): string;
}

interface ImageStatics {
  new(): ImageMethods;

  fromJson(json: string): Image;
}

@staticImplements<ImageStatics>()
export default class Image implements ImageAttributes {
  public id!: string;
  public title!: string;
  public description?: string;
  public readonly createdAt!: Date;

  constructor(constructor: ImageAttributes) {
    this.id = constructor.id;
    this.title = constructor.title;
    this.description = constructor.description;
    this.createdAt = constructor.createdAt;
  }

  public static fromJson(json: string): Image {
    const object = JSON.parse(json);
    object.createdAt = new Date(object.createdAt);
    return new Image(object);
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

}
