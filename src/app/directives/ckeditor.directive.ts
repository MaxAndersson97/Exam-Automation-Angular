import { Directive, Input, OnInit } from '@angular/core';
declare const CKEDITOR: any;
declare const $: any;
@Directive({
  selector: '[appCkeditor]'
})
export class CkeditorDirective implements OnInit {
  @Input() id: any;
  @Input() ckdata: any;
  constructor() { }
  ngOnInit(): void {
    setTimeout(() => {
      CKEDITOR.replace(this.id, {
        extraAllowedContent: 'img[alt,border,width,height,align,vspace,hspace,!src];',
        extraPlugins: 'dialog,clipboard,lineutils,widget,mathjax',
        entities: false,
        filebrowserBrowseUrl: 'javascript:void(0)',
        mathJaxLib: 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
        mathJaxClass: 'equation',
        font_names: 'Arial/Arial, Helvetica, sans-serif;' + 'Times New Roman/Times New Roman, Times, serif;' + 'Verdana;' + 'Calibri;',
      });
      CKEDITOR.config.allowedContent = true;
      if (this.ckdata) {
        CKEDITOR.instances[this.id].setData(this.ckdata);
      }
    }, 100);
    CKEDITOR.on('dialogDefinition', function (ev) {
      var dialogName = ev.data.name;
      var dialogDefinition = ev.data.definition;
      if (dialogName == 'image') { //dialogName is name of dialog and identify which dialog is fired.  
        var infoTab = dialogDefinition.getContents('info'); // get tab of the dialog  
        var browse = infoTab.get('browse'); //get browse server button  
        browse.onClick = function () {
          $('#imgupload').trigger('click');
        };
      }
    });
    CKEDITOR.on('instanceReady', function (ev) {

      // Ends self closing tags the HTML4 way, like <br>.
      ev.editor.dataProcessor.htmlFilter.addRules({
        elements: {
          $: function (element) {
            // Output dimensions of images as width and height
            if (element.name == 'img') {
              var style = element.attributes.style;
              if (style) {
                // Get the width from the style.
                var match = style.split(';');

                match.forEach(elm => {
                  if (elm.indexOf('width') != -1 && elm.split(':')[1] && elm.split(':')[1].length > 0) {
                    element.attributes.width = elm.split(':')[1].trim();
                  } else if (elm.indexOf('height') != -1 && elm.split(':')[1] && elm.split(':')[1].length > 0) {
                    element.attributes.height = elm.split(':')[1].trim();
                  }
                });
              }
            }
            return element;
          }
        }
      });
    });
  }
}
