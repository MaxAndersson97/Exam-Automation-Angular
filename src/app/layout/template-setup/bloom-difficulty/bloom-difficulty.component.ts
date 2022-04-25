import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TemplateService } from '../template.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import { debug } from 'util';

@Component({
  selector: 'app-bloom-difficulty',
  templateUrl: './bloom-difficulty.component.html',
  styleUrls: ['./bloom-difficulty.component.scss']
})
export class BloomDifficultyComponent implements OnInit {
  totalQuestionCount: number;
  bloomQuestionList: any;
  difficultyLevelQuestionList: any;
  isFormValid: boolean;
  isBloomValid: boolean;
  isDifficultyValid: boolean;
  totalSumOfBloomQuestionList: number;
  totalDifficultyLevelQuestionList: number;
  selectedTemplateData: any;
  isEdited = false;
  selectedBloomAnDifficltyDataList: any;
  createTemplateDataObj: {};
  templateID: string = '';
  isShowPriviousSelection: boolean;
  
  constructor(private tempalteService: TemplateService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedDataService,
              private toastr: ToastrService) {
}

  ngOnInit() {
    this.route.params.subscribe(params =>{
    this.templateID = params.id;
    this.totalQuestionCount = params.totalQuesCount;
    this.isFormValid = false;
    this.isBloomValid = false;
    this.isDifficultyValid = false 
    this.sharedService.getTemplateDetailsById(this.templateID).subscribe((templatedetail)=>{
      this.createTemplateDataObj = templatedetail;  
       this.tempalteService.editBloomAndDifficultyList(this.templateID).subscribe((result) => {
          this.selectedBloomAnDifficltyDataList = result;
          if(this.selectedBloomAnDifficltyDataList.listEA_BloomCompositionInfoMember != null &&this.selectedBloomAnDifficltyDataList.listEA_DifficultyLevelCompositionInfoMember != null ){
            this.isEdited = true;  
            this.getBloomQuestionCount();
            this.getDifficultyQuestionCount();
          }else{
            this.getBloomQuestionCount();
            this.getDifficultyQuestionCount();
          }
          
       }, error => {
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toastr.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toastr.error(error.error['message']);
       }
       });
      }, error =>{
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toastr.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toastr.error(error.error['message']);
       }
      });
  });
  }
  ShowPriviousSelection(){
    this.isShowPriviousSelection = !this.isShowPriviousSelection;
  }

  closeDropDown(){
    this.isShowPriviousSelection = false;
  }
  getBloomQuestionCount() {
    const chepterIDs = {"chapters": [],  "SubjectID": this.createTemplateDataObj['SubjectID']};
    const getBloomQuestionCountClassSuccess = (bloomQuestion) => {
      this.bloomQuestionList = bloomQuestion;
      if (bloomQuestion) {
        if(!this.isEdited){
          for (let index = 0; index < this.bloomQuestionList.length; index++) {
            this.bloomQuestionList[index].NumberOfQuestions = 0;
          }
        } else {
          for (let index = 0; index < this.bloomQuestionList.length; index++) {
            this.bloomQuestionList[index].NumberOfQuestions = 0;
            for (let childindex = 0; childindex < this.selectedBloomAnDifficltyDataList['listEA_BloomCompositionInfoMember'].length; childindex++) {

              const citerator = this.selectedBloomAnDifficltyDataList['listEA_BloomCompositionInfoMember'][childindex];
              
              if (this.bloomQuestionList[index].BloomTaxonomyID == citerator.BloomTaxonomyID ){
                this.bloomQuestionList[index].NumberOfQuestions = citerator.NumberOfQuestions;
                this.bloomQuestionList[index].BloomCompositionID = citerator.BloomCompositionID;
              }
            }
          }
          }
      } else {
      }
      this.checkValidation()
    };
    const getBloomQuestionCountClassError = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.tempalteService.getBloomtaxonomyQuestioncountlisttemp(chepterIDs).subscribe(
      getBloomQuestionCountClassSuccess,
      getBloomQuestionCountClassError,
      () => console.log('getBloomtaxonomyQuestioncountlist() Request Complete')
    );
  }

  getDifficultyQuestionCount() {
    const chepterIDs = {"chapters": [], "SubjectID": this.createTemplateDataObj['SubjectID'] };
    const getDifficultyQuestionCountSuccess = (difficultyQuestion) => {
      if (difficultyQuestion) {
        this.difficultyLevelQuestionList = difficultyQuestion;
        if(!this.isEdited){
          for (let index = 0; index < this.difficultyLevelQuestionList.length; index++) {
            this.difficultyLevelQuestionList[index].NumberOfQuestions = 0;
          }
        } else {
          for (let index = 0; index < this.difficultyLevelQuestionList.length; index++) {
            this.difficultyLevelQuestionList[index].NumberOfQuestions = 0;
            for (let childindex = 0; childindex < this.selectedBloomAnDifficltyDataList['listEA_DifficultyLevelCompositionInfoMember'].length; childindex++) {
               let citerator = this.selectedBloomAnDifficltyDataList['listEA_DifficultyLevelCompositionInfoMember'][childindex];

               if (this.difficultyLevelQuestionList[index].DifficultyLevelID == citerator.DifficultyLevelID ){
                this.difficultyLevelQuestionList[index].NumberOfQuestions = citerator.NumberOfQuestions;
                this.difficultyLevelQuestionList[index].DifficultyLevelCompositionID = citerator.DifficultyLevelCompositionID;
              }
              
            }
          }
          }
      } else {
        console.log();
      }
      this.checkValidationForBloom();
    };
    const getDifficultyQuestionCountError = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.tempalteService.getDifficultylevelQuestionCountListtemp(chepterIDs).subscribe(
      getDifficultyQuestionCountSuccess,
      getDifficultyQuestionCountError,
      () => console.log('getDifficultyQuestionCount() Request Complete')
    );
  }

  checkValidation() {
    let sum = 0;
    for (const iterator of this.bloomQuestionList) {
      console.log(iterator['NumberOfQuestions']);
      if(!!iterator['NumberOfQuestions']){
        sum = sum + iterator['NumberOfQuestions'];
      }
    }
    this.totalSumOfBloomQuestionList = sum;
    if ( sum == this.totalQuestionCount){
      this.isBloomValid = true;
      this.formValidate();
    }else {
      this.isBloomValid = false;
      this.formValidate();
    }
  }

  checkValidationForBloom() {
    let sum = 0;
    for (const iterator of this.difficultyLevelQuestionList) {
      console.log(iterator['NumberOfQuestions']);
      if (!!iterator['NumberOfQuestions']){
        sum = sum + iterator['NumberOfQuestions'];
      }
    }
    this.totalDifficultyLevelQuestionList = sum;
    if ( sum == this.totalQuestionCount){
      this.isDifficultyValid = true;
      this.formValidate();
    }else {
      this.isDifficultyValid = false;
      this.formValidate();
    }
  }

  formValidate() {
    if ( this.isDifficultyValid && this.isBloomValid ) {
      this.isFormValid = true;
    }else{
      this.isFormValid = false;
    }
  }
  createTemplateData(){
    let bloomArray = [];
    let difficultyArray = [];
    console.log(this.difficultyLevelQuestionList, this.bloomQuestionList);
    for (const iterator of this.difficultyLevelQuestionList) {
      let tempObj;
      if(!this.isEdited && iterator['NumberOfQuestions'] > 0){
        tempObj = {
          DifficultyLevelID: iterator['DifficultyLevelID'],
          NumberOfQuestions: iterator['NumberOfQuestions']
        };
        difficultyArray.push(tempObj);
      }else{
        if(iterator['NumberOfQuestions'] > 0){
          tempObj = {
            DifficultyLevelID: iterator['DifficultyLevelID'],
            NumberOfQuestions: iterator['NumberOfQuestions'],
            DifficultyLevelCompositionID: iterator['DifficultyLevelCompositionID']
          };
          difficultyArray.push(tempObj);
        }
      }
    }

    for (const element of this.bloomQuestionList) {
        let tempObj1;
        if(!this.isEdited && element['NumberOfQuestions'] > 0){
          tempObj1 = {
            BloomTaxonomyID: element['BloomTaxonomyID'],
            NumberOfQuestions: element['NumberOfQuestions']
          };
          bloomArray.push(tempObj1);
        } else {
          if(element['NumberOfQuestions'] > 0){
            tempObj1 = {
              BloomTaxonomyID: element['BloomTaxonomyID'],
              NumberOfQuestions: element['NumberOfQuestions'],
            BloomCompositionID: element['BloomCompositionID']
          };
          bloomArray.push(tempObj1);
        }
      }
    }

    const prepareObjToSave = {
        EAPaperTemplateID: this.createTemplateDataObj['EAPaperTemplateID'],
        listEA_BloomCompositionInfoMember: bloomArray,
        listEA_DifficultyLevelCompositionInfoMember: difficultyArray
      };
    console.log(prepareObjToSave);
    this.tempalteService.addBloomAndDifficulty(prepareObjToSave).subscribe(
      (result) => {
        this.router.navigate([ '../../../summary', this.createTemplateDataObj['EAPaperTemplateID']], { relativeTo: this.route });
    }, (error) => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(error.error['message']);
     }
    });
  }

  gotToTemplateSetting(){
    this.router.navigate([ '../../../template-setting', this.createTemplateDataObj['EAPaperTemplateID']], { relativeTo: this.route });

  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  
  }
}


