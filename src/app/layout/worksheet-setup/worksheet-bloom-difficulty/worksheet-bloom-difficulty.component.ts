import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-worksheet-bloom-difficulty',
  templateUrl: './worksheet-bloom-difficulty.component.html',
  styleUrls: ['./worksheet-bloom-difficulty.component.scss']
})
export class WorksheetBloomDifficultyComponent implements OnInit {

  totalQuestionCount: any;
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
  chepterIDs: any = [];
  templateID: string = '';
  constructor(private tempalteService: TemplateService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedDataService,
              private toastr: ToastrService
              ) {
}

  ngOnInit() {
    this.route.params.subscribe(
      params=>{
        this.templateID = params.id;
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
      }
    )


    this.isFormValid = false;
    this.isBloomValid = false;
    this.isDifficultyValid = false;
    
    this.totalQuestionCount = this.sharedService.getTotalQuestionCount();
    this.chepterIDs = this.sharedService.getChepterIds();
    console.log(this.chepterIDs, 'at bloom');

    

  }

  getBloomQuestionCount() {
    const chepterIDs = {"chapters": [],  "SubjectID": this.createTemplateDataObj['SubjectID']};
    const getBloomQuestionCountClassSuccess = (bloomQuestion) => {
      this.bloomQuestionList = bloomQuestion;
        console.log(this.bloomQuestionList, 'this.bloomQuestionList');
      if (bloomQuestion) {
        
        if(!this.isEdited){
          
        } else {
          for (let index = 0; index < this.bloomQuestionList.length; index++) {
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
    this.tempalteService.getBloomtaxonomyQuestioncountlist(chepterIDs).subscribe(
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

        } else {
          console.log(this.selectedBloomAnDifficltyDataList);
          for (let index = 0; index < this.difficultyLevelQuestionList.length; index++) {
            for (let childindex = 0; childindex < this.selectedBloomAnDifficltyDataList['listEA_DifficultyLevelCompositionInfoMember'].length; childindex++) {
               let citerator = this.selectedBloomAnDifficltyDataList['listEA_DifficultyLevelCompositionInfoMember'][childindex];
              //  debugger;
               console.log(this.difficultyLevelQuestionList[index].DifficultyLevelID,citerator.DifficultyLevelID);

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
    this.tempalteService.getDifficultylevelQuestionCountList(chepterIDs).subscribe(
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
  // this.isBloomValid = false;
  // this.isDifficultyValid = false;
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
    const createTemplateData = this.createTemplateDataObj;
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
        EAPaperTemplateID: createTemplateData['EAPaperTemplateID'],
        listEA_BloomCompositionInfoMember: bloomArray,
        listEA_DifficultyLevelCompositionInfoMember: difficultyArray
      };
    console.log(prepareObjToSave);
    this.tempalteService.addBloomAndDifficulty(prepareObjToSave).subscribe(
      (result) => {
        //this.router.navigate([ '../../worksheet-list'], { relativeTo: this.route });
        this.router.navigate([ '../../../generate-paper', prepareObjToSave.EAPaperTemplateID], { relativeTo: this.route });
    }, (error) => {
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toastr.warning(UNAUTHERIZEDMESSASGE);
      }else{
          this.toastr.error(error.error['message']);
      }
    });
  }

  gotToTemplateSetting(){
    console.log(this.createTemplateDataObj['EAPaperTemplateID']);
    this.router.navigate([ '../../../setting', this.createTemplateDataObj['EAPaperTemplateID']], { relativeTo: this.route });
  }
}
