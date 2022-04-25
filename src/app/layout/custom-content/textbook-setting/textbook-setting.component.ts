import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import * as _ from 'underscore';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { CustomContentService } from '../custom-content.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-textbook-setting',
  templateUrl: './textbook-setting.component.html',
  styleUrls: ['./textbook-setting.component.scss']
})
export class TextbookSettingComponent implements OnInit {
  
  classesList: any;
  subjects: any;
  searchtextbookForm = this.fb.group({
    ClassID: null,
    SubjectID: null
  });
  subjectList : [];
  countChepter: number = 0;
  selectedChepterIDs: any;
  selectedAll: boolean;
  isSaveButtonEnabled = false;
  isDataShow = false;
  constructor(private customService: CustomContentService,
              private fb: FormBuilder,
              private toaster: ToastrService,
              private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    // this.selectedAll = false;
    this.getInstituteDDLClass();
    //this.getBookSettingDetails('4cd58d10-fe73-43df-88f0-7305e1d1bc4d');

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
      this.isSaveButtonEnabled = false;
      
      this.getSubject(clsId.MasterID);
    }
  }


  getBookSettingDetails(SubjectID){
    this.customService.getTextbookSettingDetails(SubjectID.SubjectID).
    subscribe(result =>{
      if(result.length >0 ){
        this.isDataShow =  true;
        this.subjectList = result;
        this.isSaveButtonEnabled = true;
        this.checkIfAllSelected();
      }else{
        this.isSaveButtonEnabled = false;
        this.subjectList = [];
      }
    }, error =>{
      this.isSaveButtonEnabled = false;
      this.subjectList = [];
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
    this.getBookSettingDetails(SubjectID);      
  }

  saveTextBookSolutionSetting(){
    const selectedTextBook = [];
    this.countChepter = 0;
    for (let i=0; i< this.subjectList.length; i++) {
      let chepterList: any;
      const selectedChepaters = [];
      chepterList =  this.subjectList[i]['TextBookChapters'];
      for (let index = 0; index < chepterList.length; index++) {
        const element = chepterList[index];
        //if(element.ShowAnswers) {
          this.countChepter = this.countChepter + 1;
          const tempChept = {
            ChapterID: element.ChapterTopicID,
            IsShowAnswer: element.ShowAnswers ? 1 : 0 
          }
          selectedChepaters.push(tempChept);
        //}
        if (chepterList.length - 1 == index && selectedChepaters.length > 0) {
            selectedTextBook.push({
              TextBookID: this.subjectList[i]['TextBookID'],
              IsTextbookVisible: this.subjectList[i]['IsTextbookVisible'],
              Chapters: selectedChepaters
            });
          }else if(chepterList.length - 1 == index && selectedChepaters.length < 1){
            if(this.subjectList[i]['IsTextbookVisible']){
              selectedTextBook.push({
                TextBookID: this.subjectList[i]['TextBookID'],
                IsTextbookVisible: this.subjectList[i]['IsTextbookVisible'],
                Chapters: []
              });
            }
          }
      }
    };

    const prepareDataToSave = {
      ClassId: (this.f.ClassID.value).MasterID,
      SubjectID: (this.f.SubjectID.value).SubjectID,
      TextBooks: selectedTextBook
    }
    this.customService.savetextbooksettings(prepareDataToSave).subscribe(
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

  selectAll(indx) {
    let textbookObj = [];
    let isSelected: boolean;
    let myObj = {};
    myObj = this.subjectList[indx];
    textbookObj = this.subjectList[indx]['TextBookChapters'];
    myObj['selectedAll'] = !myObj['selectedAll'];
    isSelected = myObj['selectedAll'];
    textbookObj.every(function(item:any) {
      item.ShowAnswers = isSelected;
       return true;
     })
}
  checkIfAllSelected() {
     setTimeout(() => {
      
      let textbookArray = [];
    
      let myObj = {};
  
      this.subjectList.forEach(function(myObj:any, index) {
          let textbookArray = myObj.TextBookChapters;
          var totalSelected =  0;
          textbookArray.filter(function(item:any, indx) {
            if(item.ShowAnswers) totalSelected++;
            if(indx == textbookArray.length -1) {
              myObj['selectedAll']  = totalSelected === textbookArray.length;
            }
          });
       })
     }, 100);
  }
}
