import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef  } from '@angular/core';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-class-test-exam-bloomdifficulty',
  templateUrl: './class-test-exam-bloomdifficulty.component.html',
  styleUrls: ['./class-test-exam-bloomdifficulty.component.scss']
})
export class ClassTestExamBloomdifficultyComponent implements OnInit {

  isShowPriviousSelection = false;
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
  chepterIDs: any = [];
  templateID: string  = '';
  subjectSetting: any={};
  natureArray;
  natureArraychapterid:any=[];
  natureArraynatureid:any=[];
  naturechapteridliste:any=[];
  naturechapteridlist:any=[];
  constructor(private tempalteService: TemplateService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedDataService,
              private toastr: ToastrService
              ) {
}

  ngOnInit() {
    this.isFormValid = false;
    this.isBloomValid = false;
    this.isDifficultyValid = false;
    // this.natureArray =localStorage.getItem('natureArray');
    this.natureArray = JSON.parse(localStorage.getItem('natureArray')).lstPaperNature;  
    
    this.isBloomValid = this.subjectSetting['isbloom'] ? false: true;
    this.route.params.subscribe(
      params=>{
        this.templateID = params.id;
        this.sharedService.getTemplateDetailsById(this.templateID).subscribe((templatedetail)=>{
          this.createTemplateDataObj = templatedetail; 
            this.getSubjectSetting(this.createTemplateDataObj['SubjectID'], this.createTemplateDataObj['IsOMRPaper'])
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
    );    
    this.totalQuestionCount = Number(this.sharedService.getTotalQuestionCount());
    this.chepterIDs = this.sharedService.getChepterIds();
  }

  getSubjectSetting(subjectID,isOmr) {
    let data = {
      subjectID: subjectID,
      IsOMRPaper:isOmr
    }
    this.sharedService.getSubjectSetting(data).subscribe(res=>{ 
      if(res['data'] && !!res['data']['Setting']){
        let data = res['data']['Setting'];
        let prepareData = {
          isbloom: data.isbloom
        };
        this.subjectSetting = prepareData;
       }else{
        let prepareData = {
          isbloom: false
        }
        this.subjectSetting= prepareData;
       }
    })
  }
  ShowPriviousSelection(){
    this.isShowPriviousSelection =!this.isShowPriviousSelection
  }

  getBloomQuestionCount() {
    this.natureArraychapterid=[];
    this.natureArraynatureid=[];
    this.naturechapteridlist=[];
    
    if(this.natureArray) 
    {
      for (var i = 0, n = this.natureArray.length; i < n; ++i)
      { 
        let nobj = this.naturechapteridlist.find(o => o.NatureId === this.natureArray[i].QuestionNatureID);

        if(nobj != undefined) {
          let chapters = nobj.Chapters;

          let cobj = chapters.find(o => o === this.natureArray[i]['ChaptersList']);
          if(cobj == undefined) 
          {
            chapters.push(this.natureArray[i].ChaptersList);
          }
          nobj.Chapters = chapters;
        } else {
          let chapters = [];
          chapters.push(this.natureArray[i].ChaptersList);
          this.naturechapteridlist.push({Chapters : chapters, NatureId : this.natureArray[i]['QuestionNatureID']});
        }
      }
    }
    const chepterIDs = {"Natures": this.naturechapteridlist, "IsOMRPaper":this.createTemplateDataObj['IsOMRPaper'] };

    const getBloomQuestionCountClassSuccess = (bloomQuestion) => {
      this.bloomQuestionList = bloomQuestion;
      if (bloomQuestion) {    
        if(!this.isEdited){

          for (let index = 0; index < this.bloomQuestionList.length; index++) 
          {
            this.bloomQuestionList[index].NumberOfQuestions = 0;
          }

          this.bloomQuestionList.forEach(element => {
            element['bloomGroup'] = [];
            element['bloomGroup'].push(JSON.parse(JSON.stringify(element)));            
            element['isBlooMerged'] = false;           
          });
        } else {
          for (let index = 0; index < this.bloomQuestionList.length; index++) 
          {
            this.bloomQuestionList[index].NumberOfQuestions = 0;
            for (let childindex = 0; childindex < this.selectedBloomAnDifficltyDataList['listEA_BloomCompositionInfoMember'].length; childindex++) 
            {
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

      this.bloomQuestionList = this.bloomQuestionList.sort((a, b) => a.BloomTaxonomyCode > b.BloomTaxonomyCode ? 1 : a.BloomTaxonomyCode < b.BloomTaxonomyCode ? -1 : 0)

      this.checkValidation()
    };
    const getBloomQuestionCountClassError = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };
    this.tempalteService.getBloomtaxonomyQuestioncountlist(chepterIDs).subscribe(
      getBloomQuestionCountClassSuccess,
      getBloomQuestionCountClassError,
      () => console.log('getBloomtaxonomyQuestioncountlist() Request Complete')
    );
  }

  getDifficultyQuestionCount() {
    this.natureArraychapterid=[];
    this.natureArraynatureid=[];
    this.naturechapteridliste=[];
    
    if(this.natureArray) 
    {
      for (var i = 0, n = this.natureArray.length; i < n; ++i)
      { 
        let nobj = this.naturechapteridliste.find(o => o.NatureId === this.natureArray[i].QuestionNatureID);

        if(nobj != undefined) {
          let chapters = nobj.Chapters;

          let cobj = chapters.find(o => o === this.natureArray[i]['ChaptersList']);
          if(cobj == undefined) 
          {
            chapters.push(this.natureArray[i].ChaptersList);
          }
          nobj.Chapters = chapters;
        } else {
          let chapters = [];
          chapters.push(this.natureArray[i].ChaptersList);
          this.naturechapteridliste.push({Chapters : chapters, NatureId : this.natureArray[i]['QuestionNatureID']});
        }
      }
    }
    const chepterIDs = {"Natures": this.naturechapteridliste, "IsOMRPaper":this.createTemplateDataObj['IsOMRPaper'] };
    const getDifficultyQuestionCountSuccess = (difficultyQuestion) => {
      if (difficultyQuestion) {
        this.difficultyLevelQuestionList = difficultyQuestion;
        if(!this.isEdited){
          for (let index = 0; index < this.difficultyLevelQuestionList.length; index++) {
            this.difficultyLevelQuestionList[index].NumberOfQuestions = 0;
          }
        } else {
          for (let index = 0; index < this.difficultyLevelQuestionList.length; index++) 
          {
            this.difficultyLevelQuestionList[index].NumberOfQuestions =0;
            for (let childindex = 0; childindex < this.selectedBloomAnDifficltyDataList['listEA_DifficultyLevelCompositionInfoMember'].length; childindex++) 
            {
               let citerator = this.selectedBloomAnDifficltyDataList['listEA_DifficultyLevelCompositionInfoMember'][childindex];
               if (this.difficultyLevelQuestionList[index].DifficultyLevelID == citerator.DifficultyLevelID )
               {
                this.difficultyLevelQuestionList[index].NumberOfQuestions = citerator.NumberOfQuestions;
                this.difficultyLevelQuestionList[index].DifficultyLevelCompositionID = citerator.DifficultyLevelCompositionID;
              }
            }
          }
          }
      } else {
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
    if(this.subjectSetting['isbloom']){
      let sum = 0;
      for (const iterator of this.bloomQuestionList) {
        console.log(iterator['NumberOfQuestions']);
        if(!!iterator['NumberOfQuestions']){
          sum = sum + iterator['NumberOfQuestions'];
        }
      }
      this.totalSumOfBloomQuestionList = sum;
      if ( sum == Number(this.totalQuestionCount)){
        this.isBloomValid = true;
        this.formValidate();
      }else {
        this.isBloomValid = false;
        this.formValidate();
      }
    }
  }

  checkValidationForBloom() {
    let sum = 0;
    for (const iterator of this.difficultyLevelQuestionList) {
      if (!!iterator['NumberOfQuestions']){
        sum = sum + iterator['NumberOfQuestions'];
      }
    }
    this.totalDifficultyLevelQuestionList = sum;
    if ( sum == Number(this.totalQuestionCount)){
      this.isDifficultyValid = true;
      this.formValidate();
    }else {
      this.isDifficultyValid = false;
      this.formValidate();
    }
  }

  formValidate() {
    if ( this.isDifficultyValid && (this.isBloomValid) ) {
      this.isFormValid = true;
    }else{
      this.isFormValid = false;
    }
  }
  createTemplateData(){
    const createTemplateData = this.createTemplateDataObj;
    let bloomArray = [];
    let difficultyArray = [];
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

    for (const iterator of this.bloomQuestionList) {
      let tempObjbloom;
      if(!this.isEdited && iterator['NumberOfQuestions'] > 0){
        tempObjbloom = {
          BloomTaxonomyID: iterator['BloomTaxonomyID'],
          NumberOfQuestions: iterator['NumberOfQuestions']
        };
        bloomArray.push(tempObjbloom);
      }else{
        if(iterator['NumberOfQuestions'] > 0){
          tempObjbloom = {
            BloomTaxonomyID: iterator['BloomTaxonomyID'],
            NumberOfQuestions: iterator['NumberOfQuestions'],
            BloomCompositionID: iterator['BloomCompositionID']
          };
          bloomArray.push(tempObjbloom);
        }
      }
    }

    // for (const element of this.bloomQuestionList) {
    //     let tempObj1;
    //     console.log(element);
    //     if(!this.isEdited && element['NumberOfQuestions'] > 0){
    //        if(element['isBlooMerged'])
    //        {
    //         if(element['NumberOfQuestions'] <= element['bloomGroup'].length)
    //         {
    //           for (let index = 0; index < element['NumberOfQuestions']; index++) {                  
    //               tempObj1 = {
    //                 BloomTaxonomyID: element['bloomGroup'][index]['BloomTaxonomyID'],
    //                 NumberOfQuestions: 1
    //               };
    //               bloomArray.push(tempObj1);
    //             }
    //           }else
    //           {
    //            let parts =  getParts(element['NumberOfQuestions'], element['bloomGroup'].length);
    //            console.log(parts);
    //            element['bloomGroup'].forEach((ele, indx) => {
    //             tempObj1 = {
    //               BloomTaxonomyID: ele['BloomTaxonomyID'],
    //               NumberOfQuestions: parts[indx]
    //             };
    //             bloomArray.push(tempObj1);
    //           });
    //         }
    //        }else{
    //         tempObj1 = {
    //           BloomTaxonomyID: element['BloomTaxonomyID'],
    //           NumberOfQuestions: element['NumberOfQuestions'],
    //         BloomCompositionID: element['BloomCompositionID']
    //       };
    //       bloomArray.push(tempObj1);
    //        }
    //     } else {
    //       if(element['NumberOfQuestions'] > 0 && element['isBlooMerged']){        
    //         console.log(element['NumberOfQuestions'] <= element['bloomGroup'].length, 'less question than ');
    //         if(element['NumberOfQuestions'] <= element['bloomGroup'].length){
    //           debugger;  
    //           for (let index = 0; index < element['NumberOfQuestions']; index++) {
                  
    //               tempObj1 = {
    //                 BloomTaxonomyID: element['bloomGroup'][index]['BloomTaxonomyID'],
    //                 NumberOfQuestions: 1,
    //                 BloomCompositionID: element['bloomGroup'][index]['BloomCompositionID']
    //               };
    //               bloomArray.push(tempObj1);
    //             }
    //         }else{
    //            let parts =  getParts(element['NumberOfQuestions'], element['bloomGroup'].length);
    //            console.log(parts, element['NumberOfQuestions'], element['bloomGroup'].length);
    //            element['bloomGroup'].forEach((ele, indx) => {
    //             tempObj1 = {
    //               BloomTaxonomyID: ele['BloomTaxonomyID'],
    //               NumberOfQuestions: parts[indx],
    //               BloomCompositionID: ele['BloomCompositionID']
    //             };
    //             bloomArray.push(tempObj1);
    //           });
  
    //         }
    //     }else{
    //       tempObj1 = {
    //       BloomTaxonomyID: element['BloomTaxonomyID'],
    //       NumberOfQuestions: element['NumberOfQuestions'],
    //       BloomCompositionID: element['BloomCompositionID']
    //       };
    //       bloomArray.push(tempObj1);
    //     }
    //   }
    // }

    let prepareObjToSave:any= {};
    if(this.subjectSetting.isbloom==true){
      prepareObjToSave = {
        EAPaperTemplateID: createTemplateData['EAPaperTemplateID'],
        isbloom: true,
        listEA_BloomCompositionInfoMember: bloomArray,
        listEA_DifficultyLevelCompositionInfoMember: difficultyArray
      };
    }
    if(this.subjectSetting.isbloom!=true){
      prepareObjToSave = {
        EAPaperTemplateID: createTemplateData['EAPaperTemplateID'],
        isbloom: false,
        listEA_BloomCompositionInfoMember: [],
        listEA_DifficultyLevelCompositionInfoMember: difficultyArray
      };
      console.log(prepareObjToSave,"400");
    }
    
    this.tempalteService.addBloomAndDifficulty(prepareObjToSave).subscribe(
      (result) => {
       // this.router.navigate([ '../../dashboard'], { relativeTo: this.route });
       this.router.navigate(['../../../generate-paper', createTemplateData['EAPaperTemplateID']], {relativeTo: this.route});

    }, (error) => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
      }else{
          this.toastr.error(error.error['message']);
      }
    });
  }
  gotToTemplateSetting(){
    this.router.navigate([ '../../../setting', this.createTemplateDataObj['EAPaperTemplateID']], { relativeTo: this.route });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log('dropped Event', event.container.data,
      event.previousIndex,
      event.currentIndex);
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      let bloomData = event.container.data;
      if(event.previousIndex != event.currentIndex && event.previousIndex < event.currentIndex){
        let draggedBloom = JSON.parse(JSON.stringify(bloomData[event.currentIndex]));
        bloomData.splice(event.currentIndex, 1);
        // debugger;
        if(!!draggedBloom['NumberOfQuestions']){
          bloomData[event.currentIndex-1]['NumberOfQuestions'] = +bloomData[event.currentIndex-1]['NumberOfQuestions']+ +draggedBloom['NumberOfQuestions'];
        }
        
        bloomData[event.currentIndex-1]['bloomGroup'].push(draggedBloom);        
        bloomData[event.currentIndex-1]['isBlooMerged'] = true;
      }

      if(event.previousIndex > event.currentIndex){
        let draggedBloom = JSON.parse(JSON.stringify(bloomData[event.currentIndex]));
        bloomData.splice(event.currentIndex, 1);
        // debugger;
        if(!!draggedBloom['NumberOfQuestions']){
          bloomData[event.currentIndex]['NumberOfQuestions'] = +bloomData[event.currentIndex]['NumberOfQuestions']+ +draggedBloom['NumberOfQuestions'];
        }
        bloomData[event.currentIndex]['bloomGroup'].push(draggedBloom);        
        bloomData[event.currentIndex]['isBlooMerged'] = true;
      }

    } else {
      console.log('dropped Event');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

  }

  closeDropDown(event){
    this.isShowPriviousSelection = false;
  }
  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  
  }
}

function getParts(sum, length) {
if(sum == 8 && length == 3 ){
  let a = [3, 3, 2];
  return a;
}else{
    var left = Math.ceil(sum / length),
    right = Math.floor(sum / length),
    first = (sum - right * length) / right;

    return Array.from({ length }, (_, i) => i < first ? left : right);
}


}
