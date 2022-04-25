import { Component, OnInit, Input, OnChanges, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalService } from './global.service';
// const MathJax = Window['mathjax'];
declare const $: any;
@Component({
  selector: 'mathjax',
  inputs: ['content'],
  templateUrl: './mathjax.component.html',
  styleUrls: ['./mathjax.component.css']
})
export class MathjaxComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() content: any;
  @Output() htmlChanged = new EventEmitter<any>();
  constructor(public gs: GlobalService, private sanitizer: DomSanitizer, private elementRef: ElementRef) { }

  mathJaxObject;
  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      //this.content = this.sanitizer.bypassSecurityTrustHtml(this.content);
      this.renderMath()
    }
  }

  renderMath() {
    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
    let angObj = this;
    setTimeout(() => {
      angObj.mathJaxObject.Hub.Queue(["Typeset", angObj.mathJaxObject.Hub]);
    }, 1000)
  }

  loadMathConfig() {
    this.mathJaxObject = this.gs.nativeGlobal()['MathJax'];
    this.mathJaxObject.Hub.Config({
      showMathMenu: false,
      tex2jax: { inlineMath: [["$", "$"], ["\\(", "\\)"]], skipHtmlTags: ["script", "style", "textarea", "pre", "code"] },
      menuSettings: { zoom: "Double-Click", zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { scale: 100, linebreaks: { automatic: true } },
      SVG: { linebreaks: { automatic: true } }
    });
  }
  ngAfterViewInit() {
    $('#mathContent').on('change', () => {
      this.elementRef.nativeElement.querySelector('#mathContentoriginal').innerHTML = this.elementRef.nativeElement.querySelector('#mathContentoriginalhtml').value;
      let height = $('#hiddenHeight').val();
      let width = $('#hiddenWidth').val();
      $('#mathContentoriginal img').css({ 'height': height + "%", 'width': width + "%" });
      $('#mathContentoriginal img').attr('height', height + "%");
      $('#mathContentoriginal img').attr('width', width + "%");
      this.htmlChanged.emit(this.elementRef.nativeElement.querySelector('#mathContentoriginal').innerHTML);
    })

  }

  ngOnInit() {
    this.loadMathConfig()
    this.renderMath();
  }
}
