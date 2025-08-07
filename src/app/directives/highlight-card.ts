import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlightCard]',
})
export class HighlightCard implements OnChanges {
  @Input() externalcolor: string = 'black';
  @Input('appHighlightCard') defaultColor: string = 'black';
  constructor(private elemnt: ElementRef) {
    // this.elemnt.nativeElement.style.backgroundColor = this.defaultColor;
  }

  // component lifecycle
  ngOnChanges() {
    this.elemnt.nativeElement.style.backgroundColor = this.defaultColor;
  }

  // we need to define member variable of the class
  @HostListener('mouseover') mouseOver() {
    this.elemnt.nativeElement.style.backgroundColor = this.externalcolor;
  }

  @HostListener('mouseout') mouseOut() {
    this.elemnt.nativeElement.style.backgroundColor = this.defaultColor;
  }
}
