import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, ModalDirective, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGE, UNAUTHERIZEDMESSASGESERVER } from 'src/app/Utils/utils';
import { CustomContentService } from '../custom-content.service';
import { Result } from 'src/app/model/result';

@Component({
  selector: 'app-add-sample-paper',
  templateUrl: './add-sample-paper.component.html',
  styleUrls: ['./add-sample-paper.component.scss']
})
export class AddSamplePaperComponent implements OnInit {

  paperMasterID : string = '';
  addPaperForm: FormGroup;
  isEdit : boolean = false;
  paperType=0;

  submitted: any;

  classesList: any;
  subjects: any;
  years: any;

  constructor(private customService: CustomContentService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private route: Router,
    private router: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    
    var searchdata = JSON.parse(localStorage.getItem('ADDPAPERDATA'));
    this.paperType = searchdata.paperType;
    this.paperMasterID = searchdata.PaperMasterID;
   

    this.addPaperForm = this.formBuilder.group({
      PaperSetCode: [''],
      PaperSetName: [''],
      PaperDuration: [''],
      PaperTotalMarks: [''],
      PaperPassMark: [''],
      PaperInstruction: [''],
      eaQuestionCount: [''],
      ClassID: [''],
      SubjectID: [''],
      YearID: [''],
      PaperSetType : [''],
      BoardID:'',
      MediumID:'',
      InstituteID:'',
      PaperSetID:''
    });

    this.getInstituteDDLClass();
    this.getYear();

    if(searchdata.PaperMasterID != ''){
      this.isEdit = true;
      this.getPaperDetail(searchdata.PaperMasterID);
    } else {
      this.getSubject(searchdata.ClassID);
      setTimeout(() => {
          this.addPaperForm.patchValue({
            ClassID:searchdata.ClassID,
            YearID:searchdata.YearID,
            SubjectID: searchdata.SubjectID
          });
        }, 800);
    }
  }

  getPaperDetail(paperId){
    this.customService.getPaperById(paperId).subscribe(result => {
      if(result['success'] == false)
      {
        this.toaster.error(result['message']);
      } else {
          this.patchValue(result['data']);
      }
    }, error => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      }else{
         this.toaster.error(error.error['message']);
      }
    });
  }

  patchValue(paperObj: any) {
    this.addPaperForm.patchValue({
      BoardID : paperObj.BoardID,
      MediumID : paperObj.MediumID,
      ClassID:paperObj.ClassID,
      YearID:paperObj.YearID,
      InstituteID:paperObj.InstituteID,
      PaperSetName:paperObj.PaperSetName,
      PaperSetCode:paperObj.PaperSetCode,
      PaperTotalMarks:paperObj.PaperTotalMarks,
      eaQuestionCount:paperObj.QuestionCount,
      PaperDuration:paperObj.PaperDuration,
      PaperPassMark:paperObj.PaperPassMark,
      PaperInstruction:paperObj.PaperInstruction,
      PaperSetType : this.paperType == 1 ? 2 : 3,
      PaperSetID:paperObj.PaperSetID,
    });
    this.getSubject(paperObj.ClassID);
    setTimeout(() => {
      this.addPaperForm.patchValue({
         SubjectID: paperObj.SubjectID
      });
  }, 800);
  }

  onSubmit() {
    let schoolprofile= JSON.parse(localStorage.getItem('schoolProfile'));
    this.addPaperForm.patchValue({
      BoardID : schoolprofile.BoardID,
      MediumID : schoolprofile.MediumID,
      InstituteID:schoolprofile.InstituteID,
      PaperSetType : this.paperType == 1 ? 2 : 3,
    });

    var frmData = this.addPaperForm.value;
    console.log(frmData,"119");
   
    // this.customService.addSamplePaper(frmData).subscribe(reult => {
    //   this.toaster.success(reult['message']);
    // }, error => {
    //   if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
    //     this.toaster.warning(UNAUTHERIZEDMESSASGE);
    //   }else{
    //      this.toaster.error(error.error['message']);
    //   }
    // });
    this.customService.addSamplePaper(frmData).subscribe(result => {
      if(result['success'] == false)
      {
        //this.toaster.error(result['message']);
        var msg = "<ul>";
        for(var i = 0; i < result['data'].length; i++) 
        {
          msg = msg + "<li>"+result['data'][i].message + "</li>";
        }
        msg = msg+"</ul>";
        this.toaster.error(msg,'', { closeButton: false, timeOut: 4000,enableHtml: true });
      } else {        
        this.toaster.success(result['message']);

        var searchdata = JSON.parse(localStorage.getItem('ADDPAPERDATA'));
        searchdata.PaperMasterID = result['data'];
        localStorage.setItem('ADDPAPERDATA', JSON.stringify(searchdata));
        this.route.navigate(['../manage-paper-files'], { relativeTo: this.router });
      }
    }, error => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      }else{
         this.toaster.error(error.error['message']);
      }
    });
  }

  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classesList = classes.filter(element => element['IsShowInApp'] === true);
      } else {
        console.log(classes);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };
    this.customService.getClassWithoutInstitute()
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }

  getSubject(classId){
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjects = subjects;
      } else {
        console.log(subjects);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };
    this.customService.getSubjectWithoutInstitute(classId)
      .subscribe(getInstituteDDLClassSuccess,
                getInstituteDDLClassFailure,
        () => console.log());  
  }

  getYear(){
    const getYearClassSuccess = (years) => {
      this.years = years;
    };
    const getYearClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };
    this.customService.getYearMaster()
      .subscribe(getYearClassSuccess,
        getYearClassFailure,
        () => console.log());  
  }

  getClassId() {
    var clsId = this.f.ClassID.value;
    if(clsId){
      this.addPaperForm.patchValue({
        SubjectID: null,
        ChapterID: null
      });
      this.subjects = [];
      this.getSubject(clsId);
    }
  }

  getSubjectId() {
    var SubjectID = (this.f.SubjectID.value);
    if(!!SubjectID){
      this.addPaperForm.patchValue({       
        ChapterID: null
      });
      //this.getCheptersBySubjectID(SubjectID, this.f.ClassID.value);
    }
  }

  goToFiles() {
    if(this.addPaperForm.get('PaperSetID').value != '') {
      this.route.navigate(['../manage-paper-files'], { relativeTo: this.router });
    }else{
      this.toaster.info('Please create paper first.');
    }
  }

  get f() { return this.addPaperForm.controls; }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }
  
  avoidSpace(event) {
    var k = event ? event.which : event.keyCode;
    if (k == 32) return false;
  }

  onBackClick(){
    if(this.paperType == 1)
    {
      this.route.navigate(['../sample-paper-setting'], { relativeTo: this.router });
    } else if(this.paperType == 2)
    {
      this.route.navigate(['../worksheet-setting'], { relativeTo: this.router });
    }
  }
}
