import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  Output
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements AfterViewChecked {
  @Output() appClickOutside: EventEmitter<boolean> = new EventEmitter<boolean>();
  wasInit = false;
  bondedHandler = this.clickEventHandler.bind(this);

  constructor(private el: ElementRef) {
  }

  clickEventHandler(event: MouseEvent): void {
    const clickedOnSelf = this.el.nativeElement.contains(event.target);
    if (!clickedOnSelf && this.wasInit) {
      // console.log('Document Clicked');
      this.appClickOutside.emit(false);
      this.removeClickEventListener();
    }
  }

  addClickEventListener(): void {
    document.body.addEventListener('click', this.bondedHandler, true);
    // console.log('Added Click Event Listener')
  }

  removeClickEventListener(): void {
    document.body.removeEventListener('click', this.bondedHandler, true);
    // console.log('Removed Click Event Listener')
  }

  ngAfterViewChecked(): void {
    // Only Execute Once
    if (this.wasInit) return;
    this.wasInit = true;

    this.addClickEventListener();
  }
}
