import { Directive, Output,EventEmitter,HostListener,ElementRef } from '@angular/core';

@Directive({
  selector: '[appDoubleClick]'
})
export class DoubleClickDirective {

  @Output() onCopy = new EventEmitter();
  
  element:any;

  constructor(elm: ElementRef) { 
    this.element = elm.nativeElement;
  }

  @HostListener('dblclick', ['$event'])
  onDblClick(event) {
    const selection = getSelection();
    const range = document.createRange();

    range.selectNodeContents(this.element);
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    this.onCopy.emit(range);
  }

}