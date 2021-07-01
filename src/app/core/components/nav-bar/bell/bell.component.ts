import {HostListener, AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Svg} from '../../../../shared/components/svg/svg.component';

@Component({
  selector: 'app-bell',
  templateUrl: './bell.component.html',
  styleUrls: ['./bell.component.scss']
})
export class BellComponent {
  @ViewChild('notificationPopup') notificationPopup: ElementRef;
  @ViewChild('bell') bell: ElementRef;

  open = false;
  notificationCount = 0;
  bellIcon = Svg.Notification;

  constructor() {
  }

  switchOpen(value = !this.open): void {
    if (value === this.open) return;
    this.open = value;
  }

}
