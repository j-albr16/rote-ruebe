import {Subject} from 'rxjs';

export default class MemorySubject<T> extends Subject<T>{
  private lastValue?: T;

  constructor() {
    super();
    this.lastValue = null;
  }

  get latestValue(): T{
    return this.latestValue;
  }

  next(value: T): void{
    super.next(value);
    this.lastValue = value;
  }
}
