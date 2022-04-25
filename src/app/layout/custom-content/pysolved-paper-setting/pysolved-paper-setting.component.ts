import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { CustomContentService } from '../custom-content.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-pysolved-paper-setting',
  templateUrl: './pysolved-paper-setting.component.html',
  styleUrls: ['./pysolved-paper-setting.component.scss']
})
export class PysolvedPaperSettingComponent implements OnInit {
  classesList: any;
  subjects: any;
  searchtextbookForm = this.fb.group({
    ClassID: null,
    SubjectID: null
  });
  previousPapers : [];
  countChepter: number = 0;
  selectedChepterIDs: any;
  selectedAll: boolean;
  isSaveBtnShow = false;
  isDataShow =  false;
  constructor(private customService: CustomContentService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private route: Router,
private router: ActivatedRoute) { }

  ngOnInit() {
    this.selectedAll = false;
    this.getInstituteDDLClass();
  }
  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classesList = classes.filter(element => element['IsShowInApp'] === true);
      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
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
        //this.getTextBookSettingDetails('4cd58d10-fe73-43df-88f0-7305e1d1bc4d');
      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };
    //this.templateService.getInstituteDDLSubject(classId)
    this.customService.getSubjectWithoutInstitute(classId)
      .subscribe(getInstituteDDLClassSuccess,
                getInstituteDDLClassFailure,
        () => console.log());  
    };
    getClassId() {
      var clsId = this.f.ClassID.value;
      if(!!clsId){
        this.searchtextbookForm.patchValue({
          SubjectID: null
        });
        this.isSaveBtnShow = false;
        this.getSubject(clsId.MasterID);
      }
    }

    getPreviousPapers(SubjectID){
    this.customService.getPreviousYearsPapers(SubjectID.SubjectID).
    subscribe(result =>{
      console.log(result);
      if(result != null && result.length > 0){
        this.isDataShow =  true;
        this.isSaveBtnShow = true;
        this.previousPapers = result;
        this.checkIfAllSelected();
      }else{
        this.isSaveBtnShow = true;
        this.previousPapers = [];
        this.isDataShow =  false;
      }
    }, error =>{
      this.isSaveBtnShow = false;
      this.previousPapers = [];
      this.isDataShow =  false;
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
    this.getPreviousPapers(SubjectID);      
  }

  selectAll(indx) {
    let textbookObj = [];
    let isSelected: boolean;
    let myObj = {};
    myObj = this.previousPapers[indx];
    textbookObj = this.previousPapers[indx]['papersets'];
    myObj['selectedAll'] = !myObj['selectedAll'];
    isSelected = myObj['selectedAll'];
    textbookObj.every(function(item:any) {
      item.IsShowAnswer = isSelected;
       return true;
     })
}
  checkIfAllSelected() {
    setTimeout(() => {
      let textbookArray = [];    
      let myObj = {};
      this.previousPapers.forEach(function(myObj:any, index) {
          let textbookArray = myObj.papersets;
          var totalSelected =  0;
          textbookArray.filter(function(item:any, index) {
            if(item.IsShowAnswer) totalSelected++;
            //return totalSelected === textbookArray.length;
            if(index == textbookArray.length -1) {
              myObj['selectedAll']  = totalSelected === textbookArray.length;
            }
          });
       })
    }, 100);
  }

  savePreviousPapersSetting(){
    const selectedTextBook = [];
    this.countChepter = 0;
    for (let i=0; i< this.previousPapers.length; i++) {
      let chepterList: any;
      const selectedChepaters = [];
      chepterList =  this.previousPapers[i]['papersets'];
      for (let index = 0; index < chepterList.length; index++) {
        const element = chepterList[index];
          this.countChepter = this.countChepter + 1;
          const tempChept = {
            paperID : element.PaperSetID,
            IsShowAnswer : chepterList[index].IsShowAnswer
          }
          selectedTextBook.push(tempChept);
        if(element.ShowAnswers == false){
          this.countChepter =  this.countChepter >0 ? this.countChepter - 1: null;
        };
      }
    };

    const prepareDataToSave = {
      ClassId: (this.f.ClassID.value).MasterID,
      SubjectID: (this.f.SubjectID.value).SubjectID,
      PaperSets: selectedTextBook
    }

    this.customService.savePreviousPaperSetting(prepareDataToSave).subscribe(
      (result) => {
        this.toaster.success(result['message']);
        // this.route.navigate(['../dashboard'], { relativeTo: this.router });  
      }, (error) => {
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      });    
  }
}
