import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { MathjaxComponent } from '../mathjax/mathjax.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { RegisterService } from 'src/app/authentication/register.service';
declare const $: any;
@Component({
  selector: 'app-global-preview-paper',
  templateUrl: './global-preview-paper.component.html',
  styleUrls: ['./global-preview-paper.component.scss']
})
export class GlobalPreviewPaperComponent implements OnInit, AfterViewInit {
  @ViewChild(MathjaxComponent) childView: MathjaxComponent;
  @ViewChild('editHeader') editHeader: ModalDirective;
  @Input() paperTitle: string;
  createTemplateDataObj: any = {};
  HeaderInstruction: any = [];
  QuestionInstruction: any = [];
  schoolInfo: any = {};
  papaerHeader: any = {};
  base64Img: string | ArrayBuffer;
  isShowPaperInfo: boolean = false;
  blocation: any;
  noDataFound: boolean = true;
  TestID: any;
  assignID: any;
  type: number;
  isCheryPick: boolean = false;
  editHeaderForm: FormGroup;
  headerlogoFileName: string = '';
  headerlogoFileSrc: any;
  isHeaderEdit: boolean = false;

  constructor(private tempalteService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private registerService: RegisterService) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.sharedService.loadFonts();
    }, 1500);
  }

  ngOnInit() {
    this.isShowPaperInfo = JSON.parse(localStorage.getItem('institute')).IsDemo;
    this.schoolInfo = JSON.parse(localStorage.getItem('schoolProfile'));
    this.papaerHeader = JSON.parse(localStorage.getItem('PaperHeader'));
    this.route.params.subscribe(id => {

      setTimeout(() => {
        let templateid: any = '';
        templateid = id.id;
        this.assignID = id.id;
        this.type = id.type;

        if (this.type == 1) {
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

                var height: any = localStorage.getItem("ImageSizeHeight");
                var width: any = localStorage.getItem("ImageSizeWidth");
        
                if (!height) height = 25;
                if (!width) width = 25;
                height = Number.parseInt(height);
                width = Number.parseInt(width);
        
                $('#mathContent img').css({ 'height': height + "%", 'width': width + "%" });
                $('#mathContent img').attr('height', height + "%");
                $('#mathContent img').attr('width', width + "%");
              }, 1500);
            }, error => {

            })
        } else if (this.type == 2) {
          this.gettestID(this.assignID);
        }
        this.blocation = location.href.split('#')[0];
      }, 0);
    });

    this.editHeaderForm = this.formBuilder.group({
      PaperHeaderName: [''],
      Address: [''],
      StudentID: '',
      PaperHeaderImage: [null],
    });
  }

  gettestID(assignID) {
    let preprod = {
      "EAExamAssignID": assignID
    }
    this.sharedService.gettestIDByAssign(preprod).subscribe(
      result => {
        let a = result;
        this.createTemplateDataObj = a['data'].paperTemplateInfo;
        this.HeaderInstruction = a['data'].HeaderInstruction;
        this.QuestionInstruction = a['data'].QuestionInstruction;
      }, error => {
      }
    )
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
    this.router.navigate(['../../../summary', this.createTemplateDataObj['EAPaperTemplateID']], { relativeTo: this.route });
  }

  gotToExamList() {
    this.router.navigate(['../../../dashboard'], { relativeTo: this.route });
  }
  openInPDF() {
    //  let baseHref = location.href.split('#')[0];
    //  console.log(baseHref, 'baselocation')
    window.open(this.blocation + '#/exam/pdf-preview/' + this.createTemplateDataObj['EAPaperTemplateID'] + "/2", '_blank');


    // let doc = new jsPDF('p', 'pt', 'a3'); 
    // doc.addHTML(document.getElementById('obrz'),5, 5, {
    //   pagesplit: true, margin:{ top: 30,
    //   bottom: 30,
    //   left: 40,
    //   width: 500,useFor: 'obrz'}},      
    // function (){
    //   doc.save("test.pdf")
    // });

    // var pdf = new jsPDF('p', 'pt', 'a4'),
    // source = document.getElementById('obrz'),
    // margins = {
    //     top: 80,
    //     bottom: 60,
    //     left: 40,
    //     width: 1200
    // };
    // pdf.addHTML(
    // source,  margins.left,
    // margins.top, {
    //     'width': margins.width,
    //     'pagesplit': true,
    //     useFor: 'obrz'
    // },function (dispose) {
    //     pdf.save('Test.pdf');
    // });


  }


  openInWORD(element) {
    //     var header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
    //     "xmlns:w='urn:schemas-microsoft-com:office:word' "+
    //     "xmlns='http://www.w3.org/TR/REC-html40'>"+
    //     "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    // var footer = "</body></html>";
    // var sourceHTML = header+document.getElementById("obrz").innerHTML+footer;

    // var source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    // var fileDownload = document.createElement("a");
    // document.body.appendChild(fileDownload);
    // fileDownload.href = source;
    // fileDownload.download = 'document.doc';
    // fileDownload.click();
    // document.body.removeChild(fileDownload);

    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + document.getElementById('obrz').innerHTML + postHtml;

    var blob = new Blob(['\ufeff', html], {
      type: 'application/msword'
    });

    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    let filename = 'document.doc';

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      // Create a link to the file
      downloadLink.href = url;

      // Setting the file name
      downloadLink.download = filename;

      //triggering the function
      downloadLink.click();
    }

    document.body.removeChild(downloadLink);
  }

  viewAnswerSheet() {
    let baseHref = location.href.split('#')[0];

    if (this.createTemplateDataObj['PaperType'] != 4) {
      window.open(baseHref + '#/exam/class-test-exam/answersheet/' + this.createTemplateDataObj['EAPaperTemplateID'], '_blank');

    } else {
      window.open(baseHref + '#/exam/worksheet-setup/answersheet/' + this.createTemplateDataObj['EAPaperTemplateID'], '_blank');
    }

    // let baseHref = location.href.split('#')[0];
    // console.log(baseHref, 'baselocation')
    // window.open(baseHref+'#/exam/pdf-preview/'+ this.createTemplateDataObj['EAPaperTemplateID'], '_blank'); 


    // this.router.navigate(['../../answersheet', this.createTemplateDataObj['EAPaperTemplateID']], { relativeTo: this.route });
    //this.router.navigate([]).then(result => {  window.open(link, '_blank'); });

  }

  editLogo() {
    this.editHeaderForm.patchValue({
      PaperHeaderName: this.papaerHeader.InstituteName,
      Address: this.papaerHeader.InstituteAddress,
      StudentID: this.schoolInfo.StudentID,
    });
    this.editHeader.show();
    // this.isHeaderEdit = !this.isHeaderEdit;
  }

  saveHeader() {
    this.isHeaderEdit = !this.isHeaderEdit;
  }

  changeListener($event: any) {
    let filedata = $event.target.files;
    this.editHeaderForm.get('PaperHeaderImage').patchValue(filedata[0]);
    this.headerlogoFileName = filedata[0].name;
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    //this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.headerlogoFileSrc = reader.result;
    }
  }

  removeImage(){
    this.registerService.removeImage(this.schoolInfo.StudentID).subscribe(
      ()=>{
        this.toastr.success('Image removed successfully.');    
      },
      ()=>{
        this.toastr.error('Image removed error.');
      }
    );
    this.papaerHeader.InstituteImage = null;
    this.headerlogoFileName = '';
    localStorage.setItem('PaperHeader', JSON.stringify(this.papaerHeader));
    this.headerlogoFileSrc = this.papaerHeader.InstituteImage;
    this.editHeader.hide();
  }

  closeeditheaderDialog() {
    this.editHeader.hide();
  }

  saveheaderData() {
    this.registerService.updateHeaderInfo(this.editHeaderForm.value).subscribe(result => {
      if (result['success'] == false) {
        this.toastr.error(result['message']);
        this.headerlogoFileSrc = null;
      } else {
        this.toastr.success(result['message']);
        var PaperHeader = {
          InstituteImage: result['data'].PaperHeaderImage = '' ? this.papaerHeader.InstituteImage : result['data'].PaperHeaderImage,
          InstituteName: result['data'].PaperHeaderName,
          InstituteAddress: result['data'].PaperHeaderAddress,
        };
        this.headerlogoFileSrc = PaperHeader.InstituteImage;
        localStorage.removeItem('PaperHeader');
        this.papaerHeader = PaperHeader;
        localStorage.setItem('PaperHeader', JSON.stringify(PaperHeader));

        this.editHeader.hide();
      }
    });
  }

  clearInstituteName() {
    this.editHeaderForm.get('PaperHeaderName').patchValue('');
    this.papaerHeader.InstituteName = "";
  }

  clearInstituteAddress() {
    this.papaerHeader.InstituteAddress = "";
    this.editHeaderForm.get('Address').patchValue('');
  }
}
