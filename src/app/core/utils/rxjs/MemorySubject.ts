import {ReplaySubject} from 'rxjs';

export default class MemorySubject<T> extends ReplaySubject<T>{
  private lastValue?: T;

  constructor() {
    super();
    this.lastValue = null;
  }

  get latestValue(): T{
    return this.lastValue;
  }

  next(value: T): void{
    this.lastValue = value;
    super.next(value);
  }
}
