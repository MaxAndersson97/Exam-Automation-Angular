import { Component, OnInit, ViewChild,AfterViewInit, Output, EventEmitter, Directive, Input } from '@angular/core';
import { BsModalRef, ModalDirective, BsModalService } from 'ngx-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService } from '../template.service';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InstituteClass } from '../../institute-class';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, NgControl } from '@angular/forms';
import * as _ from 'underscore';
import Swal from 'sweetalert2';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-template-dashboard',
  templateUrl: './template-dashboard.component.html',
  styleUrls: ['./template-dashboard.component.scss']
})
export class TemplateDashboardComponent implements OnInit, AfterViewInit   {
  @Output()  closeEvent = new EventEmitter();
  private pageSize: number = 5;
  public modalRef: BsModalRef;
  templateListData: any;
  subjectList: any;
  standardList: any;
  showFilter: Boolean = false;
  isSubjectOpen: boolean = false;
  templateData: any;
  selectedSubjectId = null;
  selectedOption = null;
  isDataFound: boolean = false;
  @Output() messageEvent = new EventEmitter<string>();
  message: string = "CREATE";
  selectedTemplateData: any = [];
  createddate: any;
  createdtime: any;
  showSelection:boolean = false;
  isOMRPaper:boolean = false;
  showvalues: any = [];
  classesList: Array<InstituteClass>;
  subjects= [];
  addTemplateform1 = this.fb.group({
    PaperType: [''],
    PaperGenerationMethod: [''],
    InstituteUserID: [''],
    InstituteID: [''],
    BoardID: [''],
    MediumID: [''],
    ClassID: null,
    SubjectID: null,
    Name: [''],
    EAPaperTemplateID: [''],
    ExamGroupID: ['']
  });
  addTemplateform = this.fb.group({
    PaperType: [''],
    PaperGenerationMethod: [''],
    InstituteUserID: [''],
    InstituteID: [''],
    BoardID: [''],
    MediumID: [''],
    ClassID: null,
    SubjectID: null,
    Name: [''],
    ClassName: [''],
    SubjectName: [''],
    EAPaperTemplateID: [''],
    ExamGroupID: ['']
  });
  @ViewChild('addTemplate') addTemplateDialog: ModalDirective;
  @ViewChild('editTemplate1') editMyTemplate: ModalDirective;
  collection = [];
  rowsOnPage = 25;
  rowsOnPageTemp = 25;
  public rowsOnPageSet = [25, 50, 100,"ALL"];
  //message:string;
  messageFromTemplateList: string ="";

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private router: Router,
              private route: ActivatedRoute,
              private tempalteService: TemplateService,
              private addWingService: AddWingService,
              private toastr: ToastrService,
              private sharedService : SharedDataService) {
              }

  ngOnInit() {
    this.templateData = JSON.parse(localStorage.getItem('templateData'));
    this.subjectList = [];
    this.isSubjectOpen = false;
    this.getTemplateList();
    this.getInstituteDDLClass();
    this.showSelection= false;
  }
  get f() { return this.addTemplateform1.controls; }
  close(data) {
    this.subjects = [];
    if ( !data.isRefresh&& localStorage.getItem('OPENMODAL')){
      localStorage.removeItem('selectedTemplateData');
      localStorage.removeItem('OPENMODAL')
      //this.router.navigate([ '../template-list'], { relativeTo: this.route });
    } else {
      this.closeEvent.emit(data);
    }
    this.addTemplateform.reset();
    this.addTemplateDialog.hide();
  }
  // page(pageSize: number){
  //    pageSize = 5;
  // }

  ngAfterViewInit(){
    // if (!!this.messageFromTemplateList){
    //   this.addTemplateDialog.show();
    // }
  }


  openAddTemplateDialog() {
    this.addTemplateform1.reset(); 
    this.getInstituteDDLClasses();
    
    this.addTemplateDialog.show();
  }

  getInstituteDDLClasses() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classesList = classes.filter(element => element['IsClassShowInPortal'] === true); 
        console.log(classes);
      } else {
        console.log(classes);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.addWingService.getInstituteDDLClass()
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }

  closeAddTemplateDialog(data: any){
      if (data.isRefresh) {
        this.router.navigate([ '../template-setting', data.TemplateID], { relativeTo: this.route });
      }
      this.addTemplateDialog.hide();
  }

// template lisitng functionality
getInstituteDDLClass() {
  const getInstituteDDLClassSuccess = (classes) => {
    if (classes) {
      this.standardList = classes.filter(element => element['IsClassShowInPortal'] === true);
    } else {
    }
  };
  const getInstituteDDLClassFailure = (error: HttpErrorResponse) => {
    if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
      this.toastr.warning(UNAUTHERIZEDMESSASGE);
   }else{
       this.toastr.error(error.error['message']);
   }
  };
  this.addWingService.getInstituteDDLClass()
    .subscribe(
      getInstituteDDLClassSuccess,
      getInstituteDDLClassFailure,
      () => console.log('getInstituteDDLClass() Request Complete')
    );
}
getSubject(classId){
  this.subjectList =[];
  const getInstituteDDLClassSuccess = (subjects) => {
    if (subjects) {
      this.subjectList = _.filter(subjects,function(obj){
        return (obj.IsSelected);});
      this.isSubjectOpen = true;
      
    } else {
      console.log(subjects);
    }
  };
  const getInstituteDDLClassFailure = (error: HttpErrorResponse) => {
    if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
      this.toastr.warning(UNAUTHERIZEDMESSASGE);
   }else{
       //this.toastr.error(error.error['message']);
   }
  };
  this.tempalteService.getInstituteDDLSubject(classId)
    .subscribe(getInstituteDDLClassSuccess,
              getInstituteDDLClassFailure,
      () => console.log('getInstituteDDLClass() Request Complete')
    );
};

getSubjects(classId){
  this.subjects=  [];
  const getInstituteDDLClassSuccess = (subjects) => {
    if (subjects) {
      this.subjects = subjects;
      this.subjects = _.filter(this.subjects,function(obj){
          return (obj.IsSelected) });
      console.log(subjects);
    } else {
      console.log(subjects);
    }
  };
  const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
    const { error, error_description } = httpError.error;
    console.log(error, error_description);
  };
  this.tempalteService.getInstituteDDLSubject(classId)
    .subscribe(getInstituteDDLClassSuccess,
              getInstituteDDLClassFailure,
      () => console.log('getInstituteDDLClass() Request Complete')
    );
};
getTemplateList() {

  const data = {
    paperType : 3
  };
  this.getSearchResult(data);
}
getClassId(classId) {
  console.log(classId);
  if(!!classId){
    this.getSubject(classId);
    this.selectedSubjectId = null;
      // this.addTemplateform.controls['SubjectID'].patchValue('');
  }

}
getClassIds() {
  var clsId = this.addTemplateform1.controls.ClassID.value;
  if(!!clsId){
    this.getSubjects(clsId);
    this.addTemplateform1.patchValue({
      SubjectID: null
    });
  }
}

filterData(classId, subjectId) {
  const data = {
    SubjectID: subjectId,
    ClassID: classId,
    paperType: 3
  };

  this.showFilter  = !this.showFilter;
  this.getSearchResult(data);
}
getSearchResult(data){
  this.templateListData = [];
  this.tempalteService.getTemplateList(data).subscribe((template) => {
    if(template && template.length > 0){
      this.templateListData = template;
      for (let i = 0; i <= this.templateListData.length; i++) {
        this.collection.push(`item ${i}`);
        this.createddate= this.templateListData[i] && this.templateListData[i]['CreatedDateTime'];
        this.createdtime= this.templateListData[i] && this.templateListData[i]['CreatedDateTime'];
        if(this.createddate){
          this.templateListData[i]['CreatedDateTime'] = this.createddate.split(" ", 1); 
        }
        if(this.createdtime){
          this.templateListData[i]['fortime'] = this.createddate.split(' ').slice(1,2); 
        }
        
      }
      this.isDataFound = true;
      this.sharedService.updateAvailableCreditsCache(template[0].TotalPaperCreatedCount);
       
    }else{
      this.templateListData = [];
      this.isDataFound = false;
    }

  }, (error) => {
    if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
    this.isDataFound = false;

      this.toastr.warning(UNAUTHERIZEDMESSASGE);
   }else{
       this.toastr.error(error.error['message']);
   }
    this.templateListData = [];
  });
}
showFilterBox(){
  this.showFilter = !this.showFilter;
}

clearFilter(){
  this.selectedSubjectId = null;
  this.selectedOption = null;
  this.subjectList = null;
 this.getTemplateList();
 this.isSubjectOpen = false;
}

changeStatus(index){
  if(this.templateListData[index].PaperTemplateStatus == 1){
    this.templateListData[index].PaperTemplateStatus = 2;
   // this.templateListData[index].PaperTemplateStatusText = 'DeActive';

  } else {
    this.templateListData[index].PaperTemplateStatus = 1;
    //this.templateListData[index].PaperTemplateStatusText = 'Active';
  }
  var prepareData = {
      "EAPaperTemplateID": this.templateListData[index]['EAPaperTemplateID'],
      "Status": this.templateListData[index].PaperTemplateStatus
  }

  this.tempalteService.changeStatusOfTemplate(prepareData).subscribe((result) =>
  {
    if(this.templateListData[index].PaperTemplateStatus == 1){
      this.templateListData[index].PaperTemplateStatusText = 'Active';
  
    } else {
      this.templateListData[index].PaperTemplateStatusText = 'InActive';
    }

    Swal.fire({
      type: 'success',
      title: '<h4>status changed successfully.</h4>',
      showConfirmButton: false,
      timer: 2000
    })
  }, (error) => {if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
    this.toastr.warning(UNAUTHERIZEDMESSASGE);
 }else{
     this.toastr.error(error.error['message']);
 }})
}

viewSummary(){
  this.router.navigate([ '../template-summary'], { relativeTo: this.route });
}

editTemplate(template) {
  this.selectedTemplateData = template;
  this.editMyTemplate.show();
    this.addTemplateform.patchValue({
        PaperType: this.selectedTemplateData['PaperType'],
        PaperGenerationMethod: this.selectedTemplateData['PaperGenerationMethod'],
        InstituteUserID: this.selectedTemplateData['InstituteUserID'],
        InstituteID: this.selectedTemplateData['InstituteID'],
        BoardID: this.selectedTemplateData['BoardID'],
        MediumID: this.selectedTemplateData['MediumID'],
        ClassID: this.selectedTemplateData['ClassID'],
        SubjectID: this.selectedTemplateData['SubjectID'],
        Name: this.selectedTemplateData['Name'],
        EAPaperTemplateID: this.selectedTemplateData['EAPaperTemplateID'],
        ExamGroupID: this.selectedTemplateData['ExamGroupID'],
        ClassName: this.selectedTemplateData['ClassName'].toLowerCase(),
        SubjectName: this.selectedTemplateData['SubjectName'].toLowerCase()
      }) ;
      this.getSubject(this.selectedTemplateData['ClassID']);
}

onSubmit(){
  var frmData = this.addTemplateform.value;
  console.log(frmData);
  let addData = {};

    addData = {
      ClassID: frmData.ClassID,
      SubjectID: frmData.SubjectID,
      Name: frmData.Name,
      EAPaperTemplateID: this.selectedTemplateData['EAPaperTemplateID'],
      ExamGroupID: this.selectedTemplateData['ExamGroupID']
    };

  console.log(addData);
  addData["PaperType"] = 3;
  const getInstituteDDLClassSuccess = (template) => {
    console.log(template, 'success template');
    if (template['data']) {
      this.router.navigate([ '../template-setting', template.data.EAPaperTemplateID], { relativeTo: this.route });
      this.editMyTemplate.hide();
      this.getTemplateList();
    } else {
    }
  };
  const getInstituteDDLClassFailure = (error: HttpErrorResponse) => {
    if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
      this.toastr.warning(UNAUTHERIZEDMESSASGE);
   }else{
       this.toastr.error(error.error['message']);
   }
  };

  this.tempalteService.addNewTemplate(addData)
    .subscribe(
      getInstituteDDLClassSuccess,
              getInstituteDDLClassFailure,
      () => console.log('onSubmit() Request Complete')
    );
  }
  
onSubmits(){
  // var frmData = this.addTemplateform1.value;
  // console.log(frmData);
  // this.addTemplateDialog.hide();
  // this.showSelection=true;
  this.isOMRPaper = false;
  this.onSubmitnew(); 
}
useType(type){
  if(type == 'omr')
   this.isOMRPaper = true;
  else
   this.isOMRPaper = false;

  this.onSubmitnew(); 
}
onSubmitnew(){
  var frmData = this.addTemplateform1.value;
  console.log(frmData);
  let addData = {};
  addData = {
    ClassID: frmData.ClassID,
    SubjectID: frmData.SubjectID,
    isOMRPaper: this.isOMRPaper,
    Name: frmData.Name,
    EAPaperTemplateID: '00000000-0000-0000-0000-000000000000',
    ExamGroupID: '00000000-0000-0000-0000-000000000000'
  }; 

  console.log(addData);
  addData["PaperType"] = 3;
  const getInstituteDDLClassSuccess = (template) => {
    console.log(template, 'success template');
    if (template['data']) {
      //localStorage.setItem('templateData', JSON.stringify(template['data']));
      this.close({isRefresh: true, TemplateID: template['data']['EAPaperTemplateID']});
      this.router.navigate([ '../template-setting', template.data.EAPaperTemplateID], { relativeTo: this.route });
      this.showSelection= false;
    } else {
    }
  };
  const getInstituteDDLClassFailure = (error: HttpErrorResponse) => {
    if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
      this.toastr.warning(UNAUTHERIZEDMESSASGE);
   }else{
       this.toastr.error(error.error['message']);
   }
  };

  this.tempalteService.addNewTemplate(addData)
  .subscribe(
    getInstituteDDLClassSuccess,
            getInstituteDDLClassFailure,
    () => console.log('onSubmit() Request Complete')
  );
}

closeEditModal(): void{
  this.editMyTemplate.hide();
}

onShowPageChange(value){
  if(value === "ALL") {
      this.rowsOnPage = this.templateListData.length;
  } else {
      this.rowsOnPage = value;
  }
}

}