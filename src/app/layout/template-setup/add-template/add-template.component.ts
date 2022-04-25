import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { InstituteClass } from '../../institute-class';
import { HttpErrorResponse } from '@angular/common/http';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { TemplateService } from '../template.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-template',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.scss']
})
export class AddTemplateComponent implements OnInit {
  @Output()  closeEvent = new EventEmitter();
  isModelOpen: Observable<boolean>;
  showSelection:boolean = false;
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
    EAPaperTemplateID: [''],
    ExamGroupID: ['']
  });
  selectedTemplateData: any;
  isEdit: boolean = false;
  classesList: Array<InstituteClass>;
  subjects= [];

  constructor(private fb: FormBuilder,
              private addWingService: AddWingService,
              private templateService: TemplateService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.addTemplateform.reset();
    this.selectedTemplateData =  JSON.parse(localStorage.getItem('selectedTemplateData'));
    console.log(this.selectedTemplateData);
    if(!!this.selectedTemplateData){
      this.isEdit = true;
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
        ExamGroupID: this.selectedTemplateData['ExamGroupID']
      }) ;
      this.getSubject(this.selectedTemplateData['ClassID']);
      localStorage.setItem('OPENMODAL', 'false');
    }    
    this.getInstituteDDLClass();
  }
  get f() { return this.addTemplateform.controls; }
  getInstituteDDLClass() {
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
  getSubject(classId){
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
    this.templateService.getInstituteDDLSubject(classId)
      .subscribe(getInstituteDDLClassSuccess,
                getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  };

  close(data) {
    this.subjects = [];
    console.log(this.isEdit && !data.isRefresh);
    if ( !data.isRefresh&& localStorage.getItem('OPENMODAL')){
      localStorage.removeItem('selectedTemplateData');
      localStorage.removeItem('OPENMODAL')
      //this.router.navigate([ '../template-list'], { relativeTo: this.route });
    } else {
      this.closeEvent.emit(data);
    }
    this.addTemplateform.reset();
  }

  getClassId() {
    var clsId = this.addTemplateform.controls.ClassID.value;
    if(!!clsId){
      this.getSubject(clsId);
      this.addTemplateform.patchValue({
        SubjectID: null
      });
    }
  }

  onSubmits(data){
    if ( !data.isRefresh&& localStorage.getItem('OPENMODAL')){
      localStorage.removeItem('selectedTemplateData');
      localStorage.removeItem('OPENMODAL')
      //this.router.navigate([ '../template-list'], { relativeTo: this.route });
    } else {
      this.closeEvent.emit(data);
    }
    var frmData = this.addTemplateform.value;
    console.log(frmData);
    localStorage.setItem('frmData', JSON.stringify(frmData));
    localStorage.setItem('showSelection', 'true');
    setTimeout(() => {
      this.router.navigate([ '../dashboard'], { relativeTo: this.route });
      this.addTemplateform.reset();
    }, 200);
    
    
  }
  onSubmit(){
    var frmData = this.addTemplateform.value;
    console.log(frmData);
    let addData = {};
    if(!this.isEdit){
      addData = {
        ClassID: frmData.ClassID,
        SubjectID: frmData.SubjectID,
        Name: frmData.Name,
        EAPaperTemplateID: '00000000-0000-0000-0000-000000000000',
        ExamGroupID: '00000000-0000-0000-0000-000000000000'
      };
    } else {
      addData = {
        ClassID: frmData.ClassID,
        SubjectID: frmData.SubjectID,
        Name: frmData.Name,
        EAPaperTemplateID: this.selectedTemplateData['EAPaperTemplateID'],
        ExamGroupID: this.selectedTemplateData['ExamGroupID']
      };
    }

    console.log(addData);
    addData["PaperType"] = 3;
    const getInstituteDDLClassSuccess = (template) => {
      console.log(template, 'success template');
      if (template['data']) {
        //localStorage.setItem('templateData', JSON.stringify(template['data']));
        this.close({isRefresh: true, TemplateID: template['data']['EAPaperTemplateID']});
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

    this.templateService.addNewTemplate(addData)
    .subscribe(
      getInstituteDDLClassSuccess,
              getInstituteDDLClassFailure,
      () => console.log('onSubmit() Request Complete')
    );
  }
}
