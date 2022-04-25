import { Component, OnInit, ɵConsole } from '@angular/core';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { CustomContentService } from '../custom-content.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import { Router, ActivatedRoute } from '@angular/router';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-textbook-pdf-setting',
  templateUrl: './textbook-pdf-setting.component.html',
  styleUrls: ['./textbook-pdf-setting.component.scss']
})
export class TextbookPdfSettingComponent implements OnInit {
  classesList: any;
  subjects: any;
  textBooksList: any;
  searchtextbookForm = this.fb.group({
    ClassID: null,
    SubjectID: null
  });
  isDataShow =  false;
  isSaveBtnEnabled = false;
  constructor(private customService: CustomContentService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private route: Router,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.getInstituteDDLClass();
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

  get f() { return this.searchtextbookForm.controls; }

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

    onSubmit(){
      const SubjectID = this.f['SubjectID'].value;
      this.getBookPDFSettingDetails(SubjectID);      
    }
    getBookPDFSettingDetails(SubjectID){
      this.customService.getTextbooPDFDetails(SubjectID.SubjectID).
      subscribe(result =>{
        console.log(result);
        if(result.length > 0){
          this.isDataShow =  true;
          this.isSaveBtnEnabled = true;
          this.textBooksList = result;
        }else{
          this.isSaveBtnEnabled = false;
          this.textBooksList = [];
        }
       
            
      }, error =>{
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      });
    }
    changeStatus(index){
      if(this.textBooksList[index].IsPDFVisible == false){
        this.textBooksList[index].IsPDFVisible = true;
      } else {
        this.textBooksList[index].IsPDFVisible = false;
      } 
    }

    saveBooksPDFSetting(){
      for (let index = 0; index < this.textBooksList.length; index++) {
          let element: any = this.textBooksList[index];
          element.IsPDFVisible =  element['IsPDFVisible'] ? 1 : 0;
      }
      let body = {
        ClassId: (this.f.ClassID.value).MasterID,
        SubjectID: (this.f.SubjectID.value).SubjectID,
        Textbooks: this.textBooksList
      }
      console.log(body, 'savepdfsettinghs');
      this.customService.savetextbookPDFsettings(body).
      subscribe(result =>{
        this.toaster.success(result['message']);        
      }, error =>{
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      });
    }
}
