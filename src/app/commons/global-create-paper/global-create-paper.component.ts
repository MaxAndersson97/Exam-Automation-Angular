import { Component, OnInit, Input, OnChanges, AfterContentInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { ClassTestExamService } from 'src/app/layout/class-test-exam/class-test-exam.service';
import { UNAUTHERIZEDMESSASGE, UNAUTHERIZEDMESSASGESERVER } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ApplicationCacheService } from 'src/app/services/application-cache.service';
import { SharedObservablesService } from 'src/app/services/shared-observables.service';

@Component({
  selector: 'app-global-create-paper',
  templateUrl: './global-create-paper.component.html',
  styleUrls: ['./global-create-paper.component.scss']
})
export class GlobalCreatePaperComponent implements OnInit{
  @Input() dataTitle: string;
  classesList: [];
  currentUrl:string;
  isOMRPaper:boolean = false;
  showSelection:boolean = false;
  subjects: [];
  cheptersList: [];
  ExamGroupList: any;
  templateList: [];
  selectedSubjectId: any=[];
  currentPaperType: any;
  savedClassTestExamTest: any =[];
  isEdit: boolean= false;
  isGuestTeacher: boolean= false;
  isTemplateEnable: boolean= false;
  globalDataTitle:any=""; 
  papertypeList = [
    {
      paperName: 'Test',
      paperID: 2
    },
    {
      paperName: 'Exam',
      paperID: 1
    }

  ];
  subjectSettings: any=[];

  addClassTestFrm = this.fb.group({
    PaperType: null,
    PaperGenerationMethod: null,
    InstituteUserID: '',
    InstituteID: '',
    BoardID: '',
    MediumID: '',
    ClassID: null,
    SubjectID: null,
    Name: '',
    EAPaperTemplateID: '',
    ExamGroupID: null
  });
  constructor(private fb: FormBuilder, 
              private addWingService: AddWingService, 
              private templateService: TemplateService,
              private router: Router,
              private route: ActivatedRoute,
              private classTestExamService: ClassTestExamService,
              private toastr: ToastrService,
              private sharedService: SharedDataService,
              private applicationCacheService : ApplicationCacheService,
              private sharedObservablesService : SharedObservablesService

             ) { }

  ngOnInit() {
    
        this.currentUrl = this.router.url;
        if(this.currentUrl === '/exam/create-paper-omr')
        this.isOMRPaper = true;

        this.sharedService.setIsOmr(this.isOMRPaper);

        if(this.dataTitle == 'CREATE'){
        this.globalDataTitle = 'CREATE';
        this.dataTitle = 'CTE';
        }else{
        this.globalDataTitle = this.dataTitle;
        }

        // let getUserinfo = JSON.parse(localStorage.getItem('user'));
        // if(getUserinfo.roles.indexOf('GuestTeacher') != -1) {
        //   this.isGuestTeacher = true;
        //   this.getallClassList();
        //   // this.getInstituteDDLClass();
        // }else {
        //   this.isGuestTeacher = false;
        //   this.getInstituteDDLClass();
        // }

        this.getInstituteDDLClass();

        if(this.isGuestTeacher) {
          let AccessLevelData = JSON.parse(localStorage.getItem('InstituteAccessLevel')).filter((d: any) => d.Description == 'Exam Template Setup');
          if(AccessLevelData != null){
            if(AccessLevelData[0].isView){
              this.isTemplateEnable = true;
            } else {
              this.isTemplateEnable = false;
            }
          }else {
            this.isTemplateEnable = false;
          }
        } else {
          this.isTemplateEnable = true;
        }
  }

  setExamType(type){
    this.dataTitle = type;
    if(this.dataTitle == 'WORKSHEET'){
      this.addClassTestFrm.patchValue({
        ExamGroupID: '00000000-0000-0000-0000-000000000000',
        PaperType: '4'
      })
    }else{
      this.addClassTestFrm.patchValue({
        ExamGroupID: null,
        PaperType: null
      })
    }

    if(this.subjectSettings['isfullyautomate'] && this.dataTitle == 'CTE'){
      this.addClassTestFrm.patchValue({
        PaperGenerationMethod: '1'
      })
    }else if(this.subjectSettings['issemiautomate']){
      this.addClassTestFrm.patchValue({
        PaperGenerationMethod: '2'
      })
    }else if(this.subjectSettings['ischerrypick']){
      this.addClassTestFrm.patchValue({
        PaperGenerationMethod: '3'
      })
    }else{
      this.addClassTestFrm.patchValue({
        PaperGenerationMethod: null
      })
    }
  }

  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classesList = classes.filter(element => element['IsClassShowInPortal'] === true);
      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };
    this.addWingService.getInstituteDDLClass()
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }

  getallClassList(){
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        let getclassList = classes.filter(element => element['IsShowInApp'] === true);
        let newclassesList: any=[];

        getclassList.forEach((element, indx) => 
        {
          newclassesList.push({
            "ClassID" : element.MasterID,
            "ClassName": element.MasterText
          });
        });
        this.classesList = newclassesList;
      } else {
        console.log(classes);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    
  }
  
  getClassIdFilter(classID) {
    if (!!classID) {
      this.selectedSubjectId = null;
      this.getSubject(classID);
    }
  }

  getClassId(classID) {
    var clsId = this.addClassTestFrm.controls.ClassID.value;
    if (!!clsId) {
      this.getSubject(clsId);
      // if(this.isGuestTeacher) {
      //   // this.getAllSubject(clsId);
      //   this.getSubject(clsId);
      // } else {
      //   this.getSubject(clsId);
      // }
      this.addClassTestFrm.patchValue({
        'SubjectID': null
      })
    }
  }

  getSubject(classId) {

    this.subjects =[];
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjects = _.filter(subjects, function (obj) {
          return (obj.IsSelected)
        });
      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };
    this.templateService.getInstituteDDLSubject(classId)
      .subscribe(getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  };

  getAllSubject(classId){
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {

        let getSubjectList = subjects;
        let newsubjectList: any=[];

        getSubjectList.forEach((element, indx) => 
        {
          newsubjectList.push({
            "SubjectID" : element.SubjectID,
            "SubjectName": element.SubjectName
          });
        });
        this.subjects = newsubjectList;
      } else {
        console.log(subjects);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    }

  isActiveExamGroup(value) {
    if (value.ExamGroupStatus == 1) {
      return true;
    }
    return false;
  }

  get f() { return this.addClassTestFrm.controls; }
  
  setPaperType(paper) {
    this.ExamGroupList = [];
    if(this.f.PaperType.value == 2){
      this.currentPaperType = 2;      
    }else{
      this.currentPaperType = 1;
    }
    this.getExamGroupDetails();
    this.addClassTestFrm.patchValue({
      'PaperType': this.f.PaperType.value,
      'ExamGroupID': null
    });
  }
  getExamGroupDetails() {    
    this.classTestExamService.getExamGroupList(this.currentPaperType).subscribe(examgroupData => {
      this.ExamGroupList = examgroupData;
      this.ExamGroupList = this.ExamGroupList.filter(this.isActiveExamGroup);
    }, (error) => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toastr.error(error.error['message']);
      }
    })
  }

  useType(type){
    if(type == 'omr')
     this.isOMRPaper = true;
    else
     this.isOMRPaper = false;

    this.sharedService.setIsOmr(this.isOMRPaper);
    this.addTemplate(); 
  }

  submitStepOne() { 
    if(this.currentUrl === '/exam/create-paper' && this.addClassTestFrm.value.PaperGenerationMethod != 1){
      // this.showSelection = true;
      this.isOMRPaper = false;
      this.addTemplate();
    }
    else{
      this.addTemplate();
    }
  }

  addTemplate(){
    var frmData = this.addClassTestFrm.value;
    let addData = {};
    addData = {
      ClassID: frmData.ClassID,
      SubjectID: frmData.SubjectID,
      Name: frmData.Name,
      ExamGroupID: frmData.ExamGroupID,
      PaperGenerationMethod: frmData.PaperGenerationMethod,
      PaperType: !!frmData.PaperType ? frmData.PaperType : 4,
      IsOMRPaper:this.isOMRPaper
    };
    if (!this.isEdit) {

    } else {
      addData = {
        ClassID: frmData.ClassID,
        SubjectID: frmData.SubjectID,
        Name: frmData.Name,
        IsOMRPaper:this.isOMRPaper 
      };
    }
    //addData['PaperType'] = 2;
    const getInstituteDDLClassSuccess = (template) => {
  
      if(template['success'] == false)
      {
        this.toastr.error(template['message']);
        return;
      }
      if (template['data']) {
        this.sharedService.setCreatedTemplateData(template['data']);
        this.savedClassTestExamTest = template['data'];
        this.toastr.success('Class Test/Exam added successfully !!');
  
        if (!this.isEdit) {
          let totalpapercount =  JSON.parse(localStorage.getItem('TOTALPAPERCOUNT'));
          localStorage.removeItem('TOTALPAPERCOUNT');
          localStorage.setItem('TOTALPAPERCOUNT',totalpapercount+1);
        }

        if(frmData.PaperGenerationMethod == 3){
          var obj = this.applicationCacheService.getAvailableCreditsCacheModel();
          if(obj != null){
          obj.PaperCreatedCount = obj.PaperCreatedCount + 1;
          this.applicationCacheService.setAvailableCreditsCacheModel(obj);
          this.sharedObservablesService.refreshAvailableCredits({
            isApiRefresh : false,
            isCacheRefresh : true
          });
        }
        }
        if(this.isOMRPaper){
          this.templateService.setIsomrpaper(this.savedClassTestExamTest['EAPaperTemplateID'])
          .subscribe(
            () => this.gotoChepter(addData,frmData),
            getInstituteDDLClassFailure,
            () => console.log('onSubmit() Request Complete')
          );
        }else{
          this.gotoChepter(addData,frmData);
        }
        }
    };
    const getInstituteDDLClassFailure = (error: HttpErrorResponse) => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toastr.error(error.error['message']);
      }
    };

    this.templateService.addNewTemplate(addData)
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('onSubmit() Request Complete')
      );

      localStorage.setItem('ispaperedit', "addnew");
  }
  
  gotoChepter(addData,frmData){
    if(this.globalDataTitle == 'CREATE'){  
      if(addData['PaperGenerationMethod'] == 2 ){
      if(addData['PaperType'] == 4){
        this.router.navigate(['/exam/worksheet-setup/chepters', this.savedClassTestExamTest['EAPaperTemplateID']]);
      }else{
        this.router.navigate(['/exam/class-test-exam/chepters', this.savedClassTestExamTest['EAPaperTemplateID']]);
      }
    }
      
      if(addData['PaperGenerationMethod'] == 3){
        if(addData['PaperType'] == 4){
          this.router.navigate(['/exam/worksheet-setup/chepters', this.savedClassTestExamTest['EAPaperTemplateID']]);
        }         
        else{
          this.router.navigate(['/exam/class-test-exam/chepters', this.savedClassTestExamTest['EAPaperTemplateID']]);
        }
      }
      
      if(frmData.PaperGenerationMethod == 1){          
        this.router.navigate(['/exam/class-test-exam/templates', this.savedClassTestExamTest['EAPaperTemplateID']] , {relativeTo: this.route})
      }
    }else{   
    if(frmData.PaperGenerationMethod == 2){
      this.router.navigate(['../chepters', this.savedClassTestExamTest['EAPaperTemplateID']], {relativeTo: this.route})

    }else if(frmData.PaperGenerationMethod == 3){
      this.router.navigate(['../chepters', this.savedClassTestExamTest['EAPaperTemplateID']], {relativeTo: this.route})
    }else{          
      this.router.navigate(['../templates', this.savedClassTestExamTest['EAPaperTemplateID']] , {relativeTo: this.route})

    }
    }
  }
  
  getSubjectDetails(){
    let data = {
      "SubjectID":this.addClassTestFrm.controls.SubjectID.value
    }
    this.sharedService.getSubjectSetting(data).subscribe(res=>{
      if(res['data'] && !!res['data']['Setting']){
        let data = res['data']['Setting'];
        let prepareData = {
          isfullyautomate: data.isfullyautomate,
          issemiautomate: data.issemiautomate,
          ischerrypick: data.ischerrypick,
          isbloom: data.isbloom,
          isratioavailable: data.isratioavailable
        };
        
        localStorage.setItem('SUBJECTSETTINGS',JSON.stringify(prepareData));

        if(prepareData['isfullyautomate'] && this.dataTitle == 'CTE' && this.currentUrl != '/exam/create-paper-omr'){
          this.addClassTestFrm.patchValue({
            PaperGenerationMethod: '1'
          })
        }else if(prepareData['issemiautomate']){
          this.addClassTestFrm.patchValue({
            PaperGenerationMethod: '2'
          })
        }else if(prepareData['ischerrypick']){
          this.addClassTestFrm.patchValue({
            PaperGenerationMethod: '3'
          })
        }else{
          this.addClassTestFrm.patchValue({
            PaperGenerationMethod: null
          })
        }
        this.subjectSettings = prepareData;
       }else{
        let prepareData = {
          isfullyautomate: false,
          issemiautomate: false,
          ischerrypick: false,
          isbloom: false,
          isratioavailable: false
        }
        this.addClassTestFrm.patchValue({
          PaperGenerationMethod: null
        })
        this.subjectSettings = prepareData;
       }
    })
  }
}
