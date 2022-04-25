import { Component, OnInit, Input, ViewChild, OnDestroy, AfterViewInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { TemplateService } from '../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { MathjaxComponent } from 'src/app/commons/mathjax/mathjax.component';
import { environment } from 'src/environments/environment';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/internal/operators/map';
import { Observable } from 'rxjs/internal/Observable';
import html2canvas from 'html2canvas';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
import jsPDF from "jspdf";

declare const $: any;
@Component({
  selector: 'app-global-pdf-preview',
  templateUrl: './global-pdf-preview.component.html',
  styleUrls: ['./global-pdf-preview.component.scss']
})
export class GlobalPdfPreviewComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() paperTitle: string;
  @ViewChild(MathjaxComponent) childView: MathjaxComponent;
  createTemplateDataObj: any = {};
  isSmallScreen$: Observable<boolean>;;
  HeaderInstruction: any = [];
  QuestionInstruction: any = [];
  schoolInfo: any = {};
  papaerHeader: any = {};
  isShowPaperInfo: boolean = false;
  isShowAnswer: boolean = false;
  base64Img: string | ArrayBuffer;
  templateid: any = '';
  paddingTopValue: boolean = false;
  IsMaxheight: boolean = true;
  boldtext: boolean = true;
  imgcount: number = 0;
  requestOptions;
  isLoad: boolean = false;
  isdownlaodlink = false;
  instituteInfo: any;

  constructor(private tempalteService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService, private bpObs: BreakpointObserver,
    private toastr: ToastrService) {
    this.isSmallScreen$ = this.bpObs.observe('(max-width: 991px)').pipe(map(bpState => bpState.matches));
  }
  ngOnDestroy(): void {
    $('.navbar').addClass('custom-nav');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sharedService.loadFonts();
      this.setImageSize();
    }, 1500);
  }

  private setImageSize() {
    var height: any = localStorage.getItem("ImageSizeHeight") || 20;
    var width: any = localStorage.getItem("ImageSizeWidth") || 20;
    const size: any = localStorage.getItem('font-size') || 20;
    if (size > 20) {
      $('.mathans ol').css({ 'padding-left': (parseInt(size) + 1) + 'px' });
    }

    if (this.IsMaxheight && this.isShowAnswer) {
      $('.main-answer-img img').css({ 'max-height': '150px', 'width': 'auto' });
      $('.main-answer-img img').attr('max-height', '150px');
      $('.main-answer-img img').attr('width', 'auto');
    }
    else {
      if (this.isShowAnswer) {
        $('.main-answer-img img').css({ 'height': 50 + "%", 'width': 50 + "%", 'max-height': 'initial' });
        $('.main-answer-img img').attr('height', 50 + "%");
        $('.main-answer-img img').attr('width', 50 + "%");
      }
      else {
        if (!height) height = 25;
        if (!width) width = 25;
        height = Number.parseInt(height);
        width = Number.parseInt(width);
        $('.main-answer-img img').css({ 'height': height + "%", 'width': width + "%", 'max-height': 'initial' });
        $('.main-answer-img img').attr('height', height + "%");
        $('.main-answer-img img').attr('width', width + "%");
      }
    }

    $('.question #mathContent table').css({ 'margin-top': '5px' });
    $('.main-answer-img table').css({ 'width': "calc(97% - 5rem)", 'margin-top': '5px' });
  }

  ngOnInit() {
    this.isShowPaperInfo = JSON.parse(localStorage.getItem('institute') || "{}").IsDemo;
    this.schoolInfo = JSON.parse(localStorage.getItem('schoolProfile') || "{}");
    this.papaerHeader = JSON.parse(localStorage.getItem('PaperHeader') || "{}" as string);
    $('.navbar').addClass('custom-nav');
    try {
      if (this.getParameterByName("down") == "1") {
        this.isdownlaodlink = true;
      }
      //this.getParameterByName("down"); // window.location.href.split("?down=")[1] == "1";
    } catch (e) {
      this.isdownlaodlink = false;
    }

    this.route.params.subscribe(id => {
      this.templateid = id.id;
      setTimeout(() => {
        let templateid: any = '';
        templateid = id.id;
        if (id.isshowans == 1) {
          this.isShowAnswer = true;
        }
       if( this.isdownlaodlink ){
        this.sharedService.getInstituteDetail(templateid).subscribe(
          result => {
            this.instituteInfo = result;
            this.papaerHeader.InstituteImage = this.instituteInfo.SplashScreenImagePath;
            this.papaerHeader.InstituteName = this.instituteInfo.InstituteName;
            this.papaerHeader.InstituteAddress = this.instituteInfo.InstituteCode;
            console.log(result);
          }, error => {
          });

        }

        this.sharedService.getWorksheetQuestionListUnAuth(templateid).subscribe(
          result => {
            this.createTemplateDataObj = result.paperTemplateInfo;
            this.HeaderInstruction = result.HeaderInstruction;
            this.QuestionInstruction = result.QuestionInstruction;

            setTimeout(() => {
              this.sharedService.loadFonts();
              this.setImageSize();
              $("#obrz1").css({ 'padding-bottom': '60px' });
              this.imgcount = $('.question_main img').length;
            }, 1500);
          }, error => {
          }
        )
      }, 0);
    });
  }

  revisedQuestionDetails() {
    //let myQuestionCollection = [];
    let priviousElmnt: any = {}, alternateIndx = 0;
    this.QuestionInstruction.forEach((element, index) => {
      element = element['Questions'][0];
      priviousElmnt = index > 0 ? this.QuestionInstruction[index - 1] : {};
      console.log(!!priviousElmnt['Questions'] && priviousElmnt['Questions'][0] && priviousElmnt['Questions'][0]['IsOr'])
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
  @ViewChild('pdfContainer') pdfContainer: ElementRef;

  protected async createCanvasPDF(scaleToFit = false) {
    const elContainer = this.pdfContainer.nativeElement as HTMLDivElement;
    const colsPergPage = Number(getComputedStyle(elContainer).getPropertyValue('--cols-per-page')) || 6;
    const totalPages = 1; //Math.ceil((this.lastNonEmptyColumn + 1) / colsPergPage);
    const colWidth = Number(getComputedStyle(elContainer).getPropertyValue('--column-width')) || 210;
    const currentPadding = Number(getComputedStyle(elContainer).getPropertyValue('padding-left')) || 16;

    try {

      if (scaleToFit) {
        const scaleDown = Math.min(
          window.innerWidth / elContainer.offsetWidth,
          window.innerHeight / elContainer.offsetHeight
        );
        const scaleUp = elContainer.clientWidth / window.innerWidth;
        const scale = scaleDown * scaleUp;
        elContainer.style.setProperty('transform', `translate(-${scale / 2}%, -${scale / 2}%) scale(${scale})`);
      }

      elContainer.scroll({ left: currentPadding });
      await new Promise(resolve => setTimeout(resolve));  // wait for scroll to update

      // Calculate page size from first canvas
      const canvas = await html2canvas(elContainer, {
        allowTaint: false,
        useCORS: true
      });
      const image = canvas.toDataURL("image/png");
      const pageSize = { height: canvas.height, width: canvas.width };
      const content = [{
        image,
        width: canvas.width,
        height: canvas.height
      }];

      // Add the rest of the pages
      if (!scaleToFit) {

        for (let i = 1; i < totalPages; i++) {
          await this.showLoader(true, `Generating...<br>${i + 1}/${totalPages}`);

          elContainer.scroll({ left: colsPergPage * i * colWidth + currentPadding });
          await new Promise(resolve => setTimeout(resolve));  // wait for view to update

          const canvas = await html2canvas(elContainer, {
            allowTaint: false,
            useCORS: true
          });
          const image = canvas.toDataURL("image/png");
          content.push({
            image,
            width: canvas.width,
            height: canvas.height
          });
        }
      }

      const docDefinition = {
        pageSize,
        pageMargins: [0, 0, 0, 0],
        content
      };
      var name = `downloaded.pdf`;
      try {
        name = `${this.createTemplateDataObj.ClassName.toLowerCase()}_${this.createTemplateDataObj.SubjectName.toLowerCase()}_${this.createTemplateDataObj.Name.toLowerCase()}_${new Date().getTime().toString()}.pdf`;
        name = name.replace(/\s/g, '');
      } catch (err) {

      }

      if(this.isdownlaodlink) {
        name = this.getParameterByName("name");
      }

      pdfMake.createPdf(docDefinition).download(name);
    } finally {
      elContainer.style.setProperty('transform', '');
      this.generatingPdf = false;
      this.showLoader(false);
      this.isLoad = false;
    }
  }

  createpdf() {
    this.isLoad = true;
    var data = document.getElementById('obrz1');
    var name = `downloaded.pdf`;
    try {
      name = `${this.createTemplateDataObj.ClassName.toLowerCase()}_${this.createTemplateDataObj.SubjectName.toLowerCase()}_${this.createTemplateDataObj.Name.toLowerCase()}_${new Date().getTime().toString()}.pdf`;
      name = name.replace(/\s/g, '');
    } catch (err) {

    }

    if(this.isdownlaodlink) {
      name = this.getParameterByName("name");
    }

    var _self = this;

    html2canvas(data,{ useCORS: true}).then(canvas => {
    var imgWidth = 210;
    var pageHeight = 295;
    var imgHeight = canvas.height * imgWidth / canvas.width;
    var heightLeft = imgHeight;

      //enter code here
      const imgData = canvas.toDataURL('image/png')

      var doc = new jsPDF('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight+15);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight + 15);
        heightLeft -= pageHeight;
      }

       doc.save (name)
       _self.isLoad = false;

    });

    }

   splitMultiPagePDF() {
     this.isLoad = true;
     var htmlWidth = $(".myPDF").width();
     var htmlHeight = $(".myPDF").height();
    var pdfWidth = htmlWidth + (15 * 2);
    // var pdfHeight = (pdfWidth * 1.5) + (15 * 2);
    var pdfHeight = (pdfWidth * 1.5) + 80;

    var doc = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
    var pageCount = Math.ceil(htmlHeight / pdfHeight) - 1;

    var name = `downloaded.pdf`;
      try {
        name = `${this.createTemplateDataObj.ClassName.toLowerCase()}_${this.createTemplateDataObj.SubjectName.toLowerCase()}_${this.createTemplateDataObj.Name.toLowerCase()}_${new Date().getTime().toString()}.pdf`;
        name = name.replace(/\s/g, '');
      } catch (err) {

      }

      if(this.isdownlaodlink) {
        name = this.getParameterByName("name");
      }

      var _self = this;

    html2canvas($(".myPDF")[0], { allowTaint: false, useCORS: true }).then(function(canvas) {
      canvas.getContext('2d');

      var image = canvas.toDataURL("image/png", 1.0);
      doc.addImage(image, 'PNG', 15, 15, htmlWidth, htmlHeight);


      for (var i = 1; i <= pageCount; i++) {
        doc.addPage(pdfWidth, pdfHeight);
        doc.addImage(image, 'PNG', 15, -(pdfHeight * i)+15, htmlWidth, htmlHeight);
      }


      doc.save(name);

      _self.isLoad = false;

    });
  };


  getParameterByName(name) {
    let url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  generatingPdf = false;
  private async showLoader(show: boolean, content?: string) {
    console.log({ show, content })
  }

  dawnloadFile() {
    this.isLoad = true;
    setTimeout(() => {
      this.createCanvasPDF();
    }, 500);
  }

  downPDF() {
    this.isLoad = true;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var urlencoded = new URLSearchParams();
    var name = `downloaded.pdf`;
    try {
      name = `${this.createTemplateDataObj.ClassName.toLowerCase()}_${this.createTemplateDataObj.SubjectName.toLowerCase()}_${this.createTemplateDataObj.Name.toLowerCase()}_${new Date().getTime().toString()}.pdf`;
      name = name.replace(/\s/g, '');
    } catch (err) {

    }
    let fileName = name;
    let windowurl = window.location.href;
    // windowurl = "http://shishukunj.smartstudies.co.in/#/exam/pdf-preview/fa460941-d8ff-4666-a625-41a7ac4fb607/2";
    let url = windowurl + '?down=1&name=' + name;
    var raw = JSON.stringify({ "url": url, "fileName": fileName });
    this.requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(environment.downPdf, this.requestOptions)
      .then((response) => response.blob())
      .then((result) => {
        const url = window.URL.createObjectURL(result);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", name);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this.isLoad = false;
        this.toastr.success('PDF has been downloaded. please check your downloads folder.');
      })
      .catch((error) => {
        console.log("error", error)
        this.isLoad = false;
      }
      );
  }

  dawnloadFileVishal() {
    var fileInput = document.querySelector('#obrz1').innerHTML;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("htmlString", fileInput);

    this.requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(environment.pdfApi, this.requestOptions)
      .then((response) => response.blob())
      .then((result) => {
        const url = window.URL.createObjectURL(result);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "newFile.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.log("error", error));
  }

  openInPDF() {

    var html = document.querySelector('#obrz1').innerHTML;
    // document.body.innerHTML = html;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/html");
    myHeaders.append("Connection", "keep-alive");

    this.requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: html,
      redirect: "follow",
    };

    fetch(environment.pdfApi_Mickey, this.requestOptions)
    .then((response) => {
      console.log(response);
      return response.blob() 
    })
    .then((result) => {
      const url = window.URL.createObjectURL(result);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "newFile.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => console.log("error", error));

    // window.print();

    // window.location.reload();

    //   let html = document.getElementById('obrz').innerHTML;
    //   console.log(html);

    //   document.getElementById('openInPDF_btn').style.display = 'none';
    // //  document.getElementById('downloadPDF_btn').style.display = 'none';
    //   if ($('.mat-drawer').remove().length > 0) {
    //     $('.mat-drawer').remove();
    //   }
    //   window.print();
    //   setTimeout(() => {
    //     document.getElementById('openInPDF_btn').style.display = 'block';
    //     //ocument.getElementById('downloadPDF_btn').style.display = 'block';
    //   }, 1000);
  }

  downloadPDF() {
    this.paddingTopValue = true;
    setTimeout(() => {
      this.paddingTopValue = false;
      var html = document.getElementById('obrz1').innerHTML;
      html = html.replace("#stylepaddingtop", "style={'padding-top':15px;}");
      let d = {
        format: 'PDF',
        html: html,
        templateid: this.templateid
      }
      // alert(d.html)
      this.sharedService.getDocument(d).subscribe(
        result => {
          var a = document.createElement("a");
          a.href = environment.docUrlIp + result;
          a.target = '_blank';
          let fileName = this.templateid + '.pdf';
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(environment.docUrlIp + result);
          a.remove();
          this.paddingTopValue = false;
        }, error => {
        }
      )
    }, 10);
  }

  downloadWord() {

  }

  maxchangeimagesize(value) {
    this.IsMaxheight = value;
    this.setImageSize();
  }

  changetextbold(value) {
    this.boldtext = value;
  }
}
