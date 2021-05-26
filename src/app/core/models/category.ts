import {staticImplements} from './model-helper';

interface CategoryAttributes {
  id: string;
}

interface CategoryMethods {
  toJson(): string;
}

interface CategoryStatics {
  new(): CategoryMethods;

  fromJson(json: string): Category;
}

@staticImplements<CategoryStatics>()
export default class Category implements CategoryAttributes, CategoryMethods{
  public id: string;

  constructor(attributes: CategoryAttributes) {
    this.id = attributes.id;
  }

  public static fromJson(json: string): Category {
    return new Category(JSON.parse(json));
  }

  public toJson(): string {
    return JSON.stringify(this);
  }
}
