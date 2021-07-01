import {Component, OnInit} from '@angular/core';
import {ViewMode} from '@core/utils/enums';
import {Svg} from '../../../../shared/components/svg/svg.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  b_filter = false;
  viewMode = ViewMode.List;
  searchText: string;


  constructor() {
  }

  changeSearchText(text: string): void {
    this.searchText = text;
  }

  ngOnInit(): void {
  }

}
