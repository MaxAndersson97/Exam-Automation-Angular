import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { ToastrService } from 'ngx-toastr';
import { MathjaxComponent } from '../mathjax/mathjax.component';

declare const $: any;
@Component({
  selector: 'app-global-answersheet',
  templateUrl: './global-answersheet.component.html',
  styleUrls: ['./global-answersheet.component.scss']
})
export class GlobalAnswersheetComponent implements OnInit, AfterViewInit {
  @Input() paperTitle: string;
  @ViewChild(MathjaxComponent) childView: MathjaxComponent;
  createTemplateDataObj: any = {};
  HeaderInstruction: any = [];
  QuestionInstruction: any = [];
  schoolInfo: any = {};
  papaerHeader: any = {};
  base64Img: string | ArrayBuffer;
  isShowPaperInfo: boolean = false;
  isCheryPick: boolean = false;
  boldtext: boolean = true;
  constructor(private tempalteService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.isShowPaperInfo = JSON.parse(localStorage.getItem('institute')).IsDemo;
    this.schoolInfo = JSON.parse(localStorage.getItem('schoolProfile'));
    this.papaerHeader = JSON.parse(localStorage.getItem('PaperHeader'));
    this.route.params.subscribe(id => {
      setTimeout(() => {
        let templateid: any = '';
        templateid = id.id;
        this.sharedService.getWorksheetQuestionList(templateid).subscribe(
          result => {
            this.createTemplateDataObj = result.paperTemplateInfo;
            if (this.createTemplateDataObj.PaperGenerationMethod == 3) {
              if (localStorage.getItem('SUBJECTSETTINGS') != null) {
                this.isCheryPick = !(JSON.parse(localStorage.getItem('SUBJECTSETTINGS')).isbloom);
              } else {
                this.isCheryPick = true;
              }
            }
            this.HeaderInstruction = result.HeaderInstruction;
            this.QuestionInstruction = result.QuestionInstruction;
            setTimeout(() => {
              this.sharedService.loadFonts();
              const size: any = localStorage.getItem('font-size');
              if (size > 20) {
                $('.mathans ol').css({ 'padding-left': (parseInt(size) + 1) + 'px' });
              }

              var height: any = localStorage.getItem("ImageSizeHeight");
              var width: any = localStorage.getItem("ImageSizeWidth");

              if (!height) height = 25;
              if (!width) width = 25;
              height = Number.parseInt(height);
              width = Number.parseInt(width);

              $('.main-answer-img img').css({ 'height': height + "%", 'width': width + "%" });
              $('.main-answer-img img').attr('height', height + "%");
              $('.main-answer-img img').attr('width', width + "%");
              $('.main-answer-img table').css({ 'width': "97%", 'margin-top': '5px' });
            }, 1000);

            // this.revisedQuestionDetails();
          }, error => {
          }
        )
      }, 0);
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sharedService.loadFonts();
    }, 3000);
  }

  revisedQuestionDetails() {
    //let myQuestionCollection = [];
    let priviousElmnt: any = {}, alternateIndx = 0;
    this.QuestionInstruction.forEach((element, index) => {
      element = element['Questions'][0];
      priviousElmnt = index > 0 ? this.QuestionInstruction[index - 1] : {};
      //console.log(!!priviousElmnt['Questions'] && priviousElmnt['Questions'][0] && priviousElmnt['Questions'][0]['IsOr'])
      const isPreIsOr = (!!priviousElmnt['Questions'] && priviousElmnt['Questions'][0] && priviousElmnt['Questions'][0]['IsOr']);

      if (isPreIsOr && element['IsOr']) {
        alternateIndx = 0;
        this.QuestionInstruction.splice(index, 1);
        priviousElmnt['Questions'].push(element);
        priviousElmnt['HaveOr'] = true;
      }
    });
  }

  viewSummary() {
    this.router.navigate(['../../summary', this.createTemplateDataObj['EAPaperTemplateID']], { relativeTo: this.route });
  }

  gotToExamList() {
    this.router.navigate(['../../dashboard'], { relativeTo: this.route });
  }
  openInPDF() {
    let baseHref = location.href.split('#')[0];
    window.open(baseHref + '#/exam/pdf-preview/' + this.createTemplateDataObj['EAPaperTemplateID'] + "/1", '_blank');
  }

  changetextbold(value){
    this.boldtext = value;
  }
}
