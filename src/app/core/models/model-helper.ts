import 'reflect-metadata';

export function staticImplements<T>(): any {
  return <U extends T>(attributes: U) => attributes;
}

