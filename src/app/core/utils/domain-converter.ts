export type Type<T> = new (...args: any[]) => T;

export class DomainConverter {
  static fromDto<T>(domain: Type<T>, dto: any): T {
    const instance = Object.create(domain.prototype);
    instance.state = dto;
    return instance as T;
  }

  static toDto<T>(domain: any): T{
    return domain.state as T;
  }
}
