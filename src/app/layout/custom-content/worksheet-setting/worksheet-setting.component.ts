import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, ModalDirective, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGE, UNAUTHERIZEDMESSASGESERVER } from 'src/app/Utils/utils';
import { CustomContentService } from '../custom-content.service';

@Component({
  selector: 'app-worksheet-setting',
  templateUrl: './worksheet-setting.component.html',
  styleUrls: ['./worksheet-setting.component.scss']
})
export class WorksheetCCSSettingComponent implements OnInit {
  
  @ViewChild('deletePaper') deleteConfirmation: ModalDirective;

  paperMasterID = '';
  
  samplePapers : any = [];

  InstitutesamplePapers : any = [];
  OEsamplePapers : any = [];
  
  countPaperset: number = 0;

  public modalRef: BsModalRef;
  classesList: any;
  subjects: any;
  years: any;

  isSaveEnabled: boolean = false;
  isDataShow: boolean = false;

  searchtextbookForm = this.fb.group({
    ClassID: null,
    SubjectID: null,
    YearID: null
  });

  chepterList: [];

  selectedAll: boolean;

  constructor(private customService: CustomContentService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private route: Router,
    private router: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.selectedAll = false;
    this.getInstituteDDLClass();
    
    var searchdata = JSON.parse(localStorage.getItem('ADDPAPERDATA'));

    if(searchdata != null) {

      if(searchdata.ClassID != ''){
        this.getSubject(searchdata.ClassID);
        setTimeout(() => {
          this.searchtextbookForm.patchValue({       
            ClassID: searchdata.ClassID,
            SubjectID: searchdata.SubjectID
          });
          this.getSamplePapers(searchdata.SubjectID);
        }, 800);
      }
      localStorage.removeItem('ADDPAPERDATA');
    }
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

    getClassId() {
      var clsId = this.f.ClassID.value;
      if(!!clsId){
        this.searchtextbookForm.patchValue({
          SubjectID: null,
          ChapterID: null
        });
        this.isSaveEnabled = false;
        this.chepterList = [];
        this.subjects = [];
        this.getSubject(clsId);
      }
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

    get f() { return this.searchtextbookForm.controls; }

    onSearch() {
      const prepareData = {
        SubjectID: this.f['SubjectID'].value,
        ClassID: this.f['ClassID'].value
        // YearID: (this.f['YearID'].value).YearID
      }
      this.getSamplePapers(prepareData.SubjectID);
    }

    addWorkSheetPaper(){
      const prepareData = {
        PaperMasterID : '',
        paperType : 2,
        SubjectID: this.searchtextbookForm.get('SubjectID').value != null ? this.searchtextbookForm.get('SubjectID').value : '',
        ClassID: this.searchtextbookForm.get('ClassID').value != null ? this.searchtextbookForm.get('ClassID').value : '',
        YearID: this.searchtextbookForm.get('YearID').value != null ? this.searchtextbookForm.get('YearID').value : ''
      }
      localStorage.setItem('ADDPAPERDATA', JSON.stringify(prepareData));
      this.route.navigate(['../add-paper'], { relativeTo: this.router });
    }

    oneditPaperClick(paperMasterID) {
      const prepareData = {
        PaperMasterID : paperMasterID,
        paperType : 2,
        SubjectID: this.searchtextbookForm.get('SubjectID').value != null ? this.searchtextbookForm.get('SubjectID').value : '',
        ClassID: this.searchtextbookForm.get('ClassID').value != null ? this.searchtextbookForm.get('ClassID').value : '',
        YearID: this.searchtextbookForm.get('YearID').value != null ? this.searchtextbookForm.get('YearID').value : ''
      }
      localStorage.setItem('ADDPAPERDATA', JSON.stringify(prepareData));
      this.route.navigate(['../add-paper'], { relativeTo: this.router });
    }

    ondeletePaperClick(paperMasterID) {
      this.paperMasterID = paperMasterID;
      this.deleteConfirmation.show();
    }

    cancelDelete(){
      this.paperMasterID ='';
      this.deleteConfirmation.hide();
    }

    deleteProceed(){
      const params ={
        'PaperSetID': this.paperMasterID,
        'Status':2
      }
      this.customService.deletePaper(params).subscribe(result => {
        if(result['success'] == false)
        {
          this.toaster.error(result['message']);
        } else {
          this.toaster.success(result['message']);
          this.cancelDelete();
          this.onSearch();
        }
      }, error => {
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
        }else{
           this.toaster.error(error.error['message']);
        }
      });
    }

    getSamplePapers(SubjectID) {
      this.samplePapers=[];
      this.customService.getPapersListByType(SubjectID,3).
      subscribe(result =>{
        if(result != null && result.length > 0){

          this.isSaveEnabled = true;
          this.isDataShow =  true;
          this.samplePapers = result;
          this.checkIfAllSelected(0);
          this.dividePapers();
        }else{
          this.toaster.error("No Data Found.");
          this.samplePapers = [];
          this.isDataShow =  false;
          this.dividePapers();
          this.checkIfAllSelected(0);
        }
      }, error =>{
        this.samplePapers = [];
        this.isSaveEnabled = false;
        this.isDataShow =  false;
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      });
    }

    selectAll(indx,type) {
      let textbookObj = [];
      let isSelected: boolean;

      if(type == 1)
      {
        let myObj = {};
        myObj = this.InstitutesamplePapers[indx];

        textbookObj = this.InstitutesamplePapers[indx]['papersetsInstitute'];
        myObj['selectedInstitute'] = !myObj['selectedInstitute'];
        isSelected = myObj['selectedInstitute'];
      } else if(type == 2) {
        let myObj = {};
        myObj = this.OEsamplePapers[indx];

        textbookObj = this.OEsamplePapers[indx]['papersets'];
        myObj['selectedOE'] = !myObj['selectedOE'];
        isSelected = myObj['selectedOE'];
      }

      textbookObj.every(function(item:any) {
        item.IsShowAnswer = isSelected;
         return true;
       });
  }

  checkIfAllSelected(type) {
    setTimeout(() => {
      let textbookArray = [];    
      let myObj = {};
      this.samplePapers.forEach(function(myObj:any, index) 
      {
        if(type == 1) {
            let textbookArray = myObj.papersetsInstitute;
            var totalSelected =  0;
            textbookArray.filter(function(item:any, index) 
            {
              if(item.IsShowAnswer) {
                totalSelected++;
              }
              if(index == textbookArray.length -1) 
              {
                myObj['selectedInstitute']  = totalSelected === textbookArray.length;
              }
            });
         }else if(type==2){
            let textbookArray = myObj.papersets;
            var totalSelected =  0;
            textbookArray.filter(function(item:any, index) 
            {
              if(item.IsShowAnswer) {
                totalSelected++;
              }
              if(index == textbookArray.length -1) 
              {
                myObj['selectedOE']  = totalSelected === textbookArray.length;
              }
            });
         } else {
            let textbookArray = myObj.papersetsInstitute;
            var totalSelected =  0;
            textbookArray.filter(function(item:any, index) 
            {
              if(item.IsShowAnswer) {
                totalSelected++;
              }
              if(index == textbookArray.length -1) 
              {
                myObj['selectedInstitute']  = totalSelected === textbookArray.length;
              }
            });

            textbookArray = myObj.papersets;
            var totalSelected =  0;
            textbookArray.filter(function(item:any, index) 
            {
              if(item.IsShowAnswer) {
                totalSelected++;
              }
              if(index == textbookArray.length -1) 
              {
                myObj['selectedOE']  = totalSelected === textbookArray.length;
              }
            });
         }
       })
    }, 100);
  }

  saveWorkSheetSetting() {
    const selectedPapers = [];
    // this.countPaperset = 0;
    for (let i=0; i< this.samplePapers.length; i++) 
    {
      let paperSetList: any;
      paperSetList =  this.samplePapers[i]['papersets'];

      for (let index = 0; index < paperSetList.length; index++) 
      {
        const element = paperSetList[index];
          // this.countPaperset = this.countPaperset + 1;
          const tempObj = {
            paperID : element.PaperSetID,
            IsShowAnswer : element.IsShowAnswer
          }
          selectedPapers.push(tempObj);
        // if(element.ShowAnswers == false) {
        //   this.countPaperset =  this.countPaperset > 0 ? this.countPaperset - 1: null;
        // };
      }

      paperSetList =  this.samplePapers[i]['papersetsInstitute'];

      for (let index = 0; index < paperSetList.length; index++) 
      {
        const element = paperSetList[index];
          // this.countPaperset = this.countPaperset + 1;
          const tempObj = {
            paperID : element.PaperSetID,
            IsShowAnswer : element.IsShowAnswer
          }
          selectedPapers.push(tempObj);
        // if(element.ShowAnswers == false) {
        //   this.countPaperset =  this.countPaperset > 0 ? this.countPaperset - 1: null;
        // };
      }
    };

    const prepareDataToSave = {
      ClassId: this.f.ClassID.value,
      SubjectID: this.f.SubjectID.value,
      PaperSets: selectedPapers
    }

    this.customService.savePreviousPaperSetting(prepareDataToSave).subscribe(
      (result) => {
        this.toaster.success(result['message']);
      }, (error) => {
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      });    
  }

  dividePapers() {
    const InstitutesamplePapers = [];
    const OEsamplePapers = [];
    this.samplePapers.forEach(function(myObj:any) 
    {
      if(myObj.papersetsInstitute.length > 0) {
        InstitutesamplePapers.push(myObj);
      }
      if(myObj.papersets.length > 0) {
        OEsamplePapers.push(myObj);
      }
    });
    this.InstitutesamplePapers = InstitutesamplePapers;
    this.OEsamplePapers = OEsamplePapers;
  }
}
