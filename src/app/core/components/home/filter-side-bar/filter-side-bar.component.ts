import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExchangeObjectFilter, OrderType} from 'rote-ruebe-types';

interface TextEntry<T> {
  subtitle: string;
  options: TextOption<T>[];
  selected: number;
}

interface TextOption<T = any> {
  text: string;
  setter: T;
}

interface CheckboxChoice {
  label: string;
  value: boolean;
}

const getLastMonday = (): Date => {
  const date = new Date();
  const day = date.getDay();
  const prevMonday = new Date();
  if (date.getDay() === 0) {
    prevMonday.setDate(date.getDay() - 7);
  } else {
    prevMonday.setDate(date.getDay() - (day - 1))
  }
  return prevMonday;
};

@Component({
  selector: 'app-filter-side-bar',
  templateUrl: './filter-side-bar.component.html',
  styleUrls: ['./filter-side-bar.component.scss']
})
export class FilterSideBarComponent implements OnInit {
  @Output() filterChange: EventEmitter<ExchangeObjectFilter> = new EventEmitter<ExchangeObjectFilter>();

  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  date = this.today.getDate();
  lastMonday: Date = getLastMonday();

  creationDate: TextEntry<Date> = {
    options: [
      {text: 'Today', setter: new Date(this.year, this.month, this.date)},
      {text: 'Week', setter: this.lastMonday},
      {text: 'Month', setter: new Date(this.year, this.month, 0)},
      {text: 'Year', setter: new Date(this.year, 0, 0)},
    ], subtitle: 'Creation Date',
    selected: 0,
  };

  orderBy: TextEntry<OrderType> = {
    options: [
      {text: 'Date', setter: OrderType.CreationDate},
      {text: 'Alphabetically', setter: OrderType.Alphabetical}
    ],
    selected: 0,
    subtitle: 'Order By'
  };

  expiryDate: TextEntry<Date> = {
    options: [
      {text: 'Today', setter: new Date(this.year, this.month, this.date)},
      {text: 'Week', setter: this.lastMonday},
      {text: 'Month', setter: new Date(this.year, this.month, 0)},
      {text: 'Year', setter: new Date(this.year, 0, 0)},
    ], subtitle: 'Expiry Date',
    selected: 0,
  };


  // TODO: Extend filter with underneath vars
  filter: ExchangeObjectFilter = {
    newerThan: this.creationDate.options[this.creationDate.selected].setter,
    olderThan: new Date(),
    orderBy: this.orderBy.options[this.orderBy.selected].setter,
  };
  expiryDateFilter = this.expiryDate.options[this.expiryDate.selected].setter;
  freeToTake = true;

  sideFilterTextOptions: TextEntry<Date | OrderType> [] = [
    this.creationDate,
    this.orderBy,
    this.expiryDate,
  ];

  checkboxList: CheckboxChoice[] = [
    {label: 'Free to Take', value: this.freeToTake},
  ];

  filterChangeEvent(): void {
    this.filterChange.emit(this.filter);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
