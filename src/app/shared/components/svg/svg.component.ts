import {Component, Input, OnInit} from '@angular/core';

export enum Svg {
  Add = 'add',
  CLose = 'close',
  DateRange = 'date_range',
  Delete = 'delete',
  Done = 'done',
  Edit = 'filter',
  Event = 'event',
  FileUpload = 'file_upload',
  FilterAlt = 'filter_alt',
  Folder = 'folder',
  GridOn = 'grid_on',
  List = 'list',
  MoneyOff = 'money_off',
  Grass = 'grass',
  Notification = 'notifications',
  Place = 'place',
  Search = 'search',
  Send = 'send',
  Settings = 'settings',
  ViewList = 'view_list',
  Person = 'person',
  Dashboard = 'dashboard',
  Flower = 'flower',
  AccountCircle = 'account_circle',
  Home = 'home',
}

@Component({
  selector: 'app-svg',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {
  @Input() svgKey: Svg;
  @Input() img: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  get svg(): string {
    if (this.img) {
      return `<img src="${this.img}" alt="${this.svgKey.valueOf()}"/>`
    }
    return `<img src="${this.svgKey.valueOf()}" alt="${this.svgKey.valueOf()}"/>`
  }
}
