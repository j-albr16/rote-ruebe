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

  open = true;
  notificationCount = 0;
  bellIcon = Svg.Notification;

  @HostListener('document:click', ['$event']) documentClicked(event): void {
    const clickedOnPopUp = this.notificationPopup.nativeElement.contains(event.target);
    const clickedOnBell = this.bell.nativeElement.contains(event.target);
    if (!clickedOnPopUp && !clickedOnBell && this.open) {
      this.switchOpen(false);
    }
  }

  constructor() {
  }

  switchOpen(value = !this.open): void {
    if (value === this.open) return;
    console.log('Switched Open')
    this.open = value;
  }

}
