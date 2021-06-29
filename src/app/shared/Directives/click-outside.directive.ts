import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective {
  @Output() appClickOutside: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() open: boolean;

  @HostListener('document:click', ['$event']) onClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.open) {
      this.appClickOutside.emit(event)
      console.log('document: click')
    }
  }

  constructor(private elementRef: ElementRef) {
  }

}
