import { Component, OnInit } from '@angular/core';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { CustomContentService } from '../custom-content.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
@Component({
  selector: 'app-question-bank-setting',
  templateUrl: './question-bank-setting.component.html',
  styleUrls: ['./question-bank-setting.component.scss']
})
export class QuestionBankSettingComponent implements OnInit {

  classesList: any;
  subjects: any;
  searchtextbookForm = this.fb.group({
    ClassID: null,
    SubjectID: null
  });
  questionList : [];
  countChepter: number = 0;
  selectedChepterIDs: any;
  selectedAll: boolean;
  isSaveBtnEnabled: boolean = false;
  isDataShow =  false;
  constructor(private customService: CustomContentService,
              private fb: FormBuilder,
              private toaster: ToastrService,
              private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.selectedAll = false;
    this.getInstituteDDLClass();
    //this.getBookSettingDetails('4cd58d10-fe73-43df-88f0-7305e1d1bc4d');

  }
  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classesList = classes.filter(element => element['IsShowInApp'] === true);
        console.log(classes);
      } else {
        console.log(classes);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    //this.addWingService.getInstituteDDLClass()
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
        // this.subjects = _.filter(this.subjects,function(obj){
        //     return (obj.IsSelected) });
        console.log(subjects);
        //this.getTextBookSettingDetails('4cd58d10-fe73-43df-88f0-7305e1d1bc4d');
      } else {
        console.log(subjects);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    //this.templateService.getInstituteDDLSubject(classId)
    this.customService.getSubjectWithoutInstitute(classId)
      .subscribe(getInstituteDDLClassSuccess,
                getInstituteDDLClassFailure,
        () => console.log());  
    };
    getClassId() {
      var clsId = this.f.ClassID.value;
      console.log(clsId);
      if(!!clsId){
        this.searchtextbookForm.patchValue({
          SubjectID: null
        });
        this.isSaveBtnEnabled = false;
        
        this.getSubject(clsId.MasterID);
      }
    }


  getBookSettingDetails(SubjectID){
    let ClassID = (this.f.ClassID.value).MasterID;
    this.customService.getCCSQestionBank(SubjectID.SubjectID, ClassID).
    subscribe(result =>{
      if(result.length > 0)
      {
        this.isDataShow= true;
        this.isSaveBtnEnabled = true;
        this.questionList = result;
        this.checkIfAllSelected();
      }else{
        this.isSaveBtnEnabled = false;
        this.questionList = [];
      }
      
      
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toaster.error(error.error['message']);
     }
    });
  }
  get f() { return this.searchtextbookForm.controls; }
  onSubmit(){
    const SubjectID = this.f['SubjectID'].value;
    this.getBookSettingDetails(SubjectID);      
  }

  selectAll(indx) {
    let textbookObj = [];
    let isSelected: boolean;
    let myObj = {};
    textbookObj = this.questionList;
    this.selectedAll = !this.selectedAll;
    isSelected = this.selectedAll;
    textbookObj.every(function(item:any) {
      item.ShowInAppStatus = isSelected;
       return true;
     })
}
  checkIfAllSelected() {
    setTimeout(() => {
      let that = this;   
      let myObj = {};
      that.selectedAll = false;
      let lengthofArray = that.questionList.length;
      let tempArray = that.questionList;
      var totalSelected =  0; 
      tempArray.forEach(function(myObj:any, index) {
                 
            if(myObj.ShowInAppStatus) totalSelected++;
            if(index == lengthofArray-1) {
              that.selectedAll  = totalSelected === lengthofArray;
            }
        });
    }, 100);
    }

    saveQuestionPaperSeting(){
      //this.questionList.filter((element, indx) =>{
      for (let index = 0; index < this.questionList.length; index++) {

          let element: any = this.questionList[index];
         element.ShowInAppStatus =  element['ShowInAppStatus'] ? 1 : 0;
      }
      let prepareObj = {
        ListCCS_QuestionBankChapterList: this.questionList,
        "SubjectID": (this.f.SubjectID.value).SubjectID,
        "ClassID":  (this.f.ClassID.value).MasterID
      }
     console.log(prepareObj);
      this.customService.saveQuesPaperSettings(prepareObj).subscribe(
        (result) => {
          console.log(result);
          this.toaster.success(result['message']);
          // this.route.navigate(['../dashboard'], { relativeTo: this.router });
        }, error =>{
          if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
            this.toaster.warning(UNAUTHERIZEDMESSASGE);
         }else{
             this.toaster.error(error.error['message']);
         }
        }
      )
    }

    
}
