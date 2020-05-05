import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) onclick(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) { }

  // @HostListener('click') onclick(eventData: Event) {
  //   // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
  //   this.isOpen = !this.isOpen;
  //   // this.backGroundColor = this.highlightColor;
  // }

}
