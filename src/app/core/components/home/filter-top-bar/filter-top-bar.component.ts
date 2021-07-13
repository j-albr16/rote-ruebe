import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Svg, ViewMode} from '@core/utils/enums';

@Component({
  selector: 'app-filter-top-bar',
  templateUrl: './filter-top-bar.component.html',
  styleUrls: ['./filter-top-bar.component.scss']
})
export class FilterTopBarComponent implements OnInit {
  @Input() b_filter = false;
  @Input() viewMode = ViewMode.List;

  @Output() b_filterChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() viewModeChange: EventEmitter<ViewMode> = new EventEmitter<ViewMode>();
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('searchInput') input: ElementRef;

  // Icons
  filterIcon = Svg.FilterAlt;
  listIcon = Svg.ViewList;
  gridIcon = Svg.GridOn;

  constructor() {
  }

  get b_listMode(): boolean {
    return this.viewMode === ViewMode.List;
  }

  switchFilterMode(): void {
    this.b_filterChange.emit(!this.b_filter);
    this.b_filter = !this.b_filter;
  }

  setListMode(key: keyof typeof ViewMode): void {
    this.viewMode = ViewMode[key];
    this.viewModeChange.emit(this.viewMode);
  }

  searchEvent(): void {
    this.searchEmitter.emit(this.input.nativeElement.value);
  }

  ngOnInit(): void {
  }
}
