import {staticImplements} from './model-helper';
import {PathKey, read, write} from '../utils/file';

interface HttpRequestAttributes {
  b_valid: boolean;
  message: string;
  data?: string;
  createdAt: Date;
  name?: string;
}

interface HttpRequestMethods {
  validate(methodeName: string): void;

  log(): Promise<void>;
}

interface HttpRequestStatics {
  new(): HttpRequestMethods;

  fromJson(json: string): HttpRequest;
}

@staticImplements<HttpRequestStatics>()
export default class HttpRequest implements HttpRequestAttributes, HttpRequestMethods {
  public b_valid!: boolean;
  public message!: string;
  public data?: string;
  public name?: string;
  public readonly createdAt!: Date;

  constructor(constructor: HttpRequestAttributes) {
    this.b_valid = constructor.b_valid;
    this.message = constructor.message;
    this.data = constructor.data;
    this.createdAt = constructor.createdAt;
    this.name = constructor.name;
  }

  public static fromJson(json: string): HttpRequest {
    return new HttpRequest(JSON.parse(json));
  }

  public validate(methodeName: string): void {
    if (!this.b_valid) throw new Error(`Error while ${methodeName}:${'-'.repeat(150)}\n${this.message}`);
  }

  public async log(): Promise<void> {
    let log: string = await read(PathKey.HttpLog, 'Http Log:\n');
    log += `${this.createdAt} - ${this.b_valid} Request\t${this.name}\n${this.message}\n`;
    await write(log, PathKey.HttpLog);
  }
}
