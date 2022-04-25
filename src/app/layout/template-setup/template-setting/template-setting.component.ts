import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TemplateService } from '../template.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-template-setting',
  templateUrl: './template-setting.component.html',
  styleUrls: ['./template-setting.component.scss']
})

export class TemplateSettingComponent implements OnInit {
  @ViewChild('duration') step1: ElementRef;
  @ViewChild('timeconfirmation') timeconfirmation: ModalDirective;
  templateListData: any;
  isShowPriviousSelection: boolean=false;
  checkedPrepareDataForTables = [];
  indexErrorMsg = '';
  indexErrorMsgForIndex = '';
  mandatoryQuesError = '';
  mandatoryErrorMsg = '';
  naturecountErrorMsg = '';
  isMinEditable = false;
  alternateList = [{'value': 'true', 'name': 'Yes'},{'name': 'No', 'value': 'false'}];
  countTotalQuestions: number = 0;
  storeTeampQuestion: number = 0;
  totalMarks: number = 0;
  tempTotalMarksCount: number = 0;
  isFormValid: boolean;
  questionNatureList: any;
  prepareDataForTables: any;
  totalTime: number = 60;
  storeServerResponse = [];
  tempararyData: {};
  isMiddleSectionValid: boolean;
  selectedTemplateNatureList: any;
  count: number =0;
  selectedTemplateData: any;
  isEdit: boolean = false;
  createTemplateData: {};
  templateID: string = '';
  templateData: any;
  showFilter: any = false;
  checkenablebtn: boolean = false;
  isfirsttimesavenature = true;
  addedIndex : number = 0;

  constructor(private tempalteService: TemplateService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedDataService,
              private toastr: ToastrService) {
   }

  ngOnInit() {    
    this.templateData = JSON.parse(localStorage.getItem('templateData'));
    
    this.route.params.subscribe(params =>{
      this.templateID = params.templateID;
      this.sharedService.getTemplateDetailsById(this.templateID).subscribe((templatedetail)=>{
        this.createTemplateData = templatedetail;
        this.tempalteService.editPaperNatureList(this.templateID).subscribe((temp) => {

          if(temp.ListEA_PaperNatureInfoMember && temp.ListEA_PaperNatureInfoMember[0]){
            this.isEdit = true;
            this.selectedTemplateNatureList = temp;
            this.totalTime = this.selectedTemplateNatureList.Duration;
            this.getQuestionNature();
          } else {
              this.getQuestionNature();
          }
        }, error => {
          console.log('please try again', error);
          this.getQuestionNature();
        })
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
      this.toastr.warning(UNAUTHERIZEDMESSASGE);
   }else{
       this.toastr.error(error.error['message']);
   }
  })
})
  }

  Openconfirmation(){
    this.timeconfirmation.show();
    this.isfirsttimesavenature= false;
  }
    
  closeModal(){
    this.timeconfirmation.hide();
  }
  changetotaltime(){
    this.timeconfirmation.hide();
    this.isMinEditable = !this.isMinEditable; 
    this.editDuration();
  }
  closeModalsaveData(){
    this.timeconfirmation.hide();
    this.saveAndProceed();
  }

  checkItemenable(){
    for (var i = 0, n = this.prepareDataForTables.length; i < n; ++i){ 
      if(this.prepareDataForTables[i]['isChecked']==true){
        this.checkenablebtn= true;
        break;
      }
      else if(this.prepareDataForTables[i]['isChecked']==false){
        this.checkenablebtn= false;
      }
    }
    this.allvalmandQues();
  }
  
  editDuration(): void {
    this.isFormValid = false;
    this.totalTime = 0;
    setTimeout(() =>
    {this.step1.nativeElement.value = ''; 
    this.step1.nativeElement.focus();}, 10)
  }
  trackByIndex(index: number, obj: any): any {
    return index;
  }

  getTemplateDetails(){
    this.sharedService.getTemplateDetailsById(this.templateID).subscribe((templatedetail)=>{
      this.createTemplateData = templatedetail;
      console.log('get templae data', this.createTemplateData);
    }, error=>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(error.error['message']);
     }
    })
  }

  getQuestionNature() {
    console.log(this.createTemplateData);
    this.prepareDataForTables = [];
    const chepterIDs = {"chapters": [], 'SubjectID': this.createTemplateData['SubjectID']}
    const getInstituteDDLClassSuccess = (questionNature) => {
      if (questionNature) 
      {
        this.questionNatureList = questionNature;
        if (!this.isEdit)
        {
          for (let index = 0; index < this.questionNatureList.length; index++) 
          {
            this.questionNatureList[index].checkboxSpan =  1;
            this.questionNatureList[index].isChecked =  false;
            this.questionNatureList[index].noOfQuestion =  1;
            this.questionNatureList[index].marks =  1;
            this.questionNatureList[index].mandatory =  1;
            this.questionNatureList[index].index =  0;
            this.questionNatureList[index].alternateQues = 'false';

            this.prepareDataForTables.push(this.questionNatureList[index]);
          }
        } else 
        {
          this.isFormValid = true;
          this.isMiddleSectionValid = true;
          let selectedTmeplateInternalData = this.selectedTemplateNatureList.ListEA_PaperNatureInfoMember;
          
          selectedTmeplateInternalData = selectedTmeplateInternalData.sort((a, b) => a.IndexNumber > b.IndexNumber ? 1 : a.IndexNumber < b.IndexNumber ? -1 : 0)

          console.log(selectedTmeplateInternalData,"175");

          for (let index = 0; index < this.questionNatureList.length; index++) 
          {
            let flag = false;
            for (let cIndex = 0; cIndex < selectedTmeplateInternalData.length; cIndex++) 
            {
              if (this.questionNatureList[index]['QuestionNatureID'] == selectedTmeplateInternalData[cIndex]['QuestionNatureID']) {
                  flag = true;
                  let tempObject = {};
                  tempObject['checkboxSpan'] =  1;
                  tempObject['noOfQuestion'] = selectedTmeplateInternalData[cIndex]['NoOfQuestionPerSet'];
                  tempObject['marks']= selectedTmeplateInternalData[cIndex]['MarksPerQuestion'];
                  tempObject['mandatory']=  selectedTmeplateInternalData[cIndex]['NoOfMandatoryQuestionPerSet'];
                  tempObject['index']= selectedTmeplateInternalData[cIndex]['IndexNumber'];
                  tempObject['alternateQues']= selectedTmeplateInternalData[cIndex]['IsAlternate'].toString();
                  tempObject['EAPaperNatureMasterID']= selectedTmeplateInternalData[cIndex]['EAPaperNatureMasterID'];
                  tempObject['isChecked'] =  true;
                  
                  tempObject['QuestionCount'] =  this.questionNatureList[index]['QuestionCount']
                  tempObject['QuestionNatureCode'] = this.questionNatureList[index]['QuestionNatureCode']
                  tempObject['QuestionNatureID'] = this.questionNatureList[index]['QuestionNatureID']
                  tempObject['QuestionNatureName'] = this.questionNatureList[index]['QuestionNatureName']
                  tempObject['addedIndex'] = selectedTmeplateInternalData[cIndex]['IndexNumber'];
                  
                   this.count = this.count + (+tempObject['index']);
                  
                  this.prepareDataForTables.push(tempObject);                 
                  this.countQuestion(selectedTmeplateInternalData[cIndex]['NoOfQuestionPerSet']);
                 
                  this.countTotalMark(selectedTmeplateInternalData[cIndex]['NoOfMandatoryQuestionPerSet'], selectedTmeplateInternalData[cIndex]['MarksPerQuestion']);
              }
            }
            if(!flag){
              this.questionNatureList[index].checkboxSpan =  1;
              this.questionNatureList[index].isChecked =  false;
              this.questionNatureList[index].noOfQuestion =  1;
              this.questionNatureList[index].marks = 1;
              this.questionNatureList[index].mandatory = 1;
              this.questionNatureList[index].index = 0;
              this.questionNatureList[index].alternateQues = 'false';
              this.questionNatureList[index]['addedIndex'] = this.addedIndex+1;

              this.prepareDataForTables.push(this.questionNatureList[index]);
            }
            index == this.questionNatureList.length-1 ? this.updateCheckedQuestionNatureList() : null;
          }

        let statesSeen = [];
        this.prepareDataForTables.map(x => {
          const stateSpan = statesSeen[x.QuestionNatureName] ? 0 :
            this.prepareDataForTables.filter(y => y.QuestionNatureName === x.QuestionNatureName).length;
            statesSeen[x.QuestionNatureName] = true;
            x.checkboxSpan = stateSpan;
        });
        }
        
      } else {
      }
      this.addedIndex = this.countTotalQuestions;
      this.sortNature();
    };
    const getInstituteDDLClassFailure = (error: HttpErrorResponse) => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(error.error['message']);
     }
    };
    this.tempalteService.getQuestionNature(chepterIDs).subscribe(
      getInstituteDDLClassSuccess,
      getInstituteDDLClassFailure,
      () => console.log('getQuestionNature() Request Complete')
    );
    if(this.prepareDataForTables.length > 0)
    {
      this.checkItemenable();
    } else {
      setTimeout(() => {
        this.checkItemenable();
      }, 2000);
    }
 }

 countIndex(selectedNature){
      
  for (var i = 0, n = this.prepareDataForTables.length; i < n; ++i){
    if(this.prepareDataForTables[i]==0){
      this.prepareDataForTables[i]['index']=0;
    }
  }
  setTimeout(() => {
    if(selectedNature.index < 1) {
      if(this.count){
        selectedNature.index = this.count + 1;
      }else{
        selectedNature.index = 0;
      }
      
      if(selectedNature['isChecked'] && selectedNature.noOfQuestion == selectedNature.mandatory){
        this.count = this.count + selectedNature.noOfQuestion;
        selectedNature['updatedIndex'] = selectedNature.noOfQuestion;
        
      }else{
        this.count = this.count + 1;
        selectedNature['updatedIndex'] = selectedNature.noOfQuestion;
      }      
    }else if(selectedNature['isChecked'] && selectedNature.noOfQuestion == selectedNature.mandatory)
      {
        this.count = this.count - selectedNature['updatedIndex'];
        this.count = this.count + selectedNature.noOfQuestion;
      }   
      
      if(selectedNature['isChecked'] && selectedNature.noOfQuestion > 0 && selectedNature.mandatory > 0 && selectedNature.noOfQuestion == selectedNature.mandatory) {
        this.rearrangeIndex();
      }else{
        setTimeout(() => {
          this.validateIndex();
        }, 50);
      }
  }, 10);
}

revisedIndex(){
  let localCountIndex = 0;
  this.checkedPrepareDataForTables.sort((a, b) => {      
    const naturecomp = (a.index.toString()).localeCompare(b.index);    
    return naturecomp;
  }).forEach((ele, indx)=>{
    if(ele['isChecked']&& ele.noOfQuestion > 1 && ele.mandatory > 1&& ele.noOfQuestion == ele.mandatory){
      console.log(ele.index, ele);
      ele['index']= +localCountIndex+1;  
      localCountIndex = +localCountIndex+ +ele.noOfQuestion;
     
    }else{
     
      localCountIndex = +localCountIndex+1;
      ele['index']= +localCountIndex;
    }
    
  })
  setTimeout(() => {
    this.validateIndex();
  }, 1000);
}
 
  addNewRowwithSpan(item,indx) {
    const statesSeen = {};
    let groupByNatureName = [];

    let allnature = this.prepareDataForTables.filter(a=>a.QuestionNatureID === item.QuestionNatureID)

    console.log(allnature,"328");

    const maxaddedindex = allnature.reduce(function(prev, current) {
      return (prev.index > current.index) ? prev : current
    });

    console.log(maxaddedindex,"324");

    const myData = {
      addedIndex :  this.addedIndex+1,
      noOfQuestion: 1,
      marks: 1,
      mandatory: 1,
      index: this.count + 1,
      alternateQues: 'false',
      isChecked: item.isChecked,
      QuestionCount: item.QuestionCount,
      QuestionNatureCode: item.QuestionNatureCode,
      QuestionNatureID: item.QuestionNatureID,
      QuestionNatureName: item.QuestionNatureName
    };

    this.count =  this.count + 1;    
    this.addedIndex =  this.addedIndex + 1;

    this.prepareDataForTables.push(myData);

    // this.prepareDataForTables.splice(maxaddedindex.indx, 0, myData);

      item.isChecked ?  this.updateCheckedQuestionNatureList(): null;
      this.countIndex(myData);
      groupByNatureName = this.prepareDataForTables.sort((a, b) => {      
      const naturecomp = a.QuestionNatureName.localeCompare(b.QuestionNatureName);    
      return naturecomp;
    }).map(x => {
      const stateSpan = statesSeen[x.QuestionNatureName] ? 0 :
        this.prepareDataForTables.filter(y => y.QuestionNatureName === x.QuestionNatureName).length;
        statesSeen[x.QuestionNatureName] = true;
        x.checkboxSpan = stateSpan;
    });
    this.sortNature();
  }

  onUncheckedAction(index, QuestionNatureName){
    const statesSeen = {};
    let groupByNatureName = []; 
      if(this.prepareDataForTables[index].isChecked==false){
        this.prepareDataForTables[index].mandatory= this.prepareDataForTables[index].noOfQuestion;
      }
      setTimeout(() => {
        for (let index = 0; index < this.prepareDataForTables.length; index++) {
          const element = this.prepareDataForTables[index];
          if(this.prepareDataForTables[index].QuestionNatureName == QuestionNatureName){
            this.prepareDataForTables[index].isChecked = true;
            this.prepareDataForTables[index].addedIndex= this.addedIndex+1;
            this.addedIndex =  this.addedIndex + 1;
            this.countQuesAndMarks(index);
            this.countIndex(this.prepareDataForTables[index]);
          }
          index == this.prepareDataForTables.length-1 ? this.updateCheckedQuestionNatureList(): null;    
        }
      }, 10);
      
  }

  updateCheckedQuestionNatureList(){
    this.checkedPrepareDataForTables = [];
    for (let index = 0; index < this.prepareDataForTables.length; index++) {
      if(this.prepareDataForTables[index].isChecked){        
        this.checkedPrepareDataForTables.push(this.prepareDataForTables[index]);
      } 
        // index == this.prepareDataForTables.length-1? this.revisedIndex(): null;
        index == this.prepareDataForTables.length-1 ? this.rearrangeIndex() : null;
    }
  }

  sortNature() {
    this.prepareDataForTables.sort((a, b) => {
      const naturecomp = a.QuestionNatureCode.localeCompare(b.QuestionNatureCode);
      return naturecomp;      
    });
    
  }

  rearrangeIndex(){
    let localCountIndex = 0;

    let tempobj = [];

    const tempchecked = this.checkedPrepareDataForTables.sort((a, b) => a.addedIndex < b.addedIndex ? -1 : a.addedIndex > b.addedIndex ? 1 : 0)

    for(var i =0; i < tempchecked.length ; i++)
    {
      const objitem = tempchecked[i];
      if(objitem['isChecked'] && objitem.noOfQuestion > 1 && objitem.mandatory > 1 && objitem.noOfQuestion == objitem.mandatory)
      {
        objitem['index']=localCountIndex+1;
        localCountIndex = localCountIndex + objitem.noOfQuestion;
      } else{
        localCountIndex = localCountIndex+1;
        objitem['index']=localCountIndex;
      }
      tempobj.push(objitem);
    }

    this.checkedPrepareDataForTables = tempobj;

    setTimeout(() => {
      this.validateIndex();
    }, 1000);
  }

  removeIndex(selectedNature) {
    
    if(+selectedNature.index > 0){
      if(!selectedNature['isChecked'] && selectedNature.noOfQuestion == selectedNature.mandatory){
        this.count = +this.count - +selectedNature.noOfQuestion;
      }else{
        this.count = +this.count - 1;
      }      
      selectedNature.index = 0;            
    }
    this.validateIndex();
  }

  validateIndex(){
    this.indexErrorMsg = '';
    this.indexErrorMsgForIndex = '';
    this.checkedPrepareDataForTables.filter((element, indx)=>{
      if(element.isChecked && (+element.index < 1 || +element.index > this.count )&& this.indexErrorMsg == '') {
        this.indexErrorMsg = 'Index number cannot be more than selected rows.';
        console.log(this.indexErrorMsg);
        setTimeout(() => {
          this.validateForm();
        }, 10);
      }
    })
    let inddxCount = 0;
    const distinctIndex = Array.from(new Set(this.checkedPrepareDataForTables.map(a => a.index)))
    if(distinctIndex.length != this.checkedPrepareDataForTables.length){
      this.indexErrorMsgForIndex = 'Multiple question set cannot be of same Index.';
      setTimeout(() => {
        this.validateForm();
      }, 10);
    }
  }
  
  onCheckedAction(index, QuestionNatureName)
  {
    for (let index = 0; index < this.prepareDataForTables.length; index++) {
      const element = this.prepareDataForTables[index];
      if(this.prepareDataForTables[index].QuestionNatureName == QuestionNatureName){
        this.prepareDataForTables[index].isChecked = false;
        this.removeQuesAndMarks(index);
        this.removeIndex(this.prepareDataForTables[index]);
      }
      index == this.prepareDataForTables.length-1 ? this.updateCheckedQuestionNatureList(): null;  
    }
    setTimeout(() => {
      this.validateIndex();
    }, 10);
    this.sortNature();
  }

  countQuesAndMarks(i){
    const element = this.prepareDataForTables[i];
      if(element.noOfQuestion > 0){
        this.countTotalQuestions = this.storeTeampQuestion = this.countTotalQuestions + element.noOfQuestion;
        const totalMarksForRow = element.mandatory * element.marks;
        this.totalMarks = this.tempTotalMarksCount = this.totalMarks + totalMarksForRow;
    }
    setTimeout(() => {
      this.validateForm();
    }, 10);
  }

  removeQuesAndMarks(i) {
    const element = this.prepareDataForTables[i];
      if(element.noOfQuestion > 0){
        this.countTotalQuestions = this.storeTeampQuestion = this.countTotalQuestions - element.noOfQuestion;
        const totalMarksForRow = element.mandatory * element.marks;
        this.totalMarks = this.tempTotalMarksCount = this.totalMarks - totalMarksForRow;
       }
    setTimeout(() => {
      this.validateForm();
    }, 10);
  }

  deleteRow(natureIndex) { 
    this.removeQuesAndMarks(natureIndex);
    this.count = this.count-1;
    const statesSeen = {};
    let groupByNatureName = [];
    this.prepareDataForTables.splice(natureIndex, 1);
    this.updateCheckedQuestionNatureList();
    groupByNatureName = this.prepareDataForTables.sort((a, b) => {      
      const naturecomp = a.QuestionNatureName.localeCompare(b.QuestionNatureName);    
      return naturecomp;      
    }).map(x => {
      const stateSpan = statesSeen[x.QuestionNatureName] ? 0 :
        this.prepareDataForTables.filter(y => y.QuestionNatureName === x.QuestionNatureName).length;
        statesSeen[x.QuestionNatureName] = true;
        x.checkboxSpan = stateSpan;        
    });
    this.sortNature();
  }

  countQuestion(count) {
    this.storeTeampQuestion = this.storeTeampQuestion + count;
    this.countTotalQuestions = this.storeTeampQuestion;
  }

  onFocuscountQuestion(count) {
    if(this.storeTeampQuestion > 0 ){
      this.storeTeampQuestion = this.countTotalQuestions - count;
    }

  }

  countTotalMark(question, marks) {
    const totalMarksForRow = question * marks;
    this.tempTotalMarksCount = this.tempTotalMarksCount + totalMarksForRow;
    this.totalMarks = this.tempTotalMarksCount;
  }

  marksvalidation(item){
    const itemrow= item;
    console.log(itemrow);
    if(itemrow.marks==null || itemrow.marks == 0 ){
      this.isFormValid = false;
    }
    else{
      this.isFormValid = true;
    }
  }

  onFocuscountTotalMark(question, marks) {
    if(this.tempTotalMarksCount > 0 ){
      const totalMarksForRow = question * marks;
      this.tempTotalMarksCount = this.tempTotalMarksCount - totalMarksForRow;
    }
  }

  validateMandatoryQues(indx){
    this.mandatoryQuesError = '';
   
    var validateMandatoryQuesfiltereddata = this.prepareDataForTables.filter((d: any) => d.noOfQuestion < d.mandatory && d.isChecked == true);
     if(validateMandatoryQuesfiltereddata.length > 0){
      this.mandatoryQuesError = 'Mandatory questions count cannot be greater than the "No. of Question" count.';
      setTimeout(() => {
        this.validateForm();
      }, 10);
    }
  }

  allvalmandQues() {
    var validateMandatoryQuesfiltereddata = this.prepareDataForTables.filter((d: any) => d.noOfQuestion < d.mandatory && d.isChecked == true);
    if(validateMandatoryQuesfiltereddata.length > 0) {
      this.mandatoryQuesError = 'Mandatory questions count cannot be greater than the "No. of Question" count.';
      this.isFormValid = false;
   } else {
    this.isFormValid = true;
    this.mandatoryQuesError = '';
   }

    if(!this.isFormValid || (!this.checkenablebtn)){
      this.isFormValid = false;
    }
    else if(this.isFormValid && (this.checkenablebtn)){
      this.isFormValid = true;
    }
  }

  checkNaturecountValidation() {

    this.naturecountErrorMsg = '';

    let natureArray = this.prepareDataForTables.filter((d: any) => d.isChecked == true);
 
    for (let i=0; i< natureArray.length; i++) {
      if(natureArray[i].noOfQuestion > natureArray[i].QuestionCount)
      {
        this.naturecountErrorMsg = '"No. of Question" value cannot be greater than the maximum questions available in the selected Nature';
            setTimeout(() => {
              this.isFormValid = false;
            }, 10);
        }
      }
  } 

  validateForm() {
    let flag = true;

    for (let index = 0; index < this.prepareDataForTables.length; index++) 
    {
      const childElement = this.prepareDataForTables[index];
        if (flag && childElement.isChecked) 
        {          
            if (childElement.noOfQuestion < 1  || childElement.mandatory <1 || childElement.noOfQuestion < childElement.mandatory || childElement.index < 1 && !childElement.isChecked) {
              this.isMiddleSectionValid = false;
              flag = false;
              break;
            } else 
            {
              this.isMiddleSectionValid = true;
            }
      }else
      {
        this.isMiddleSectionValid = true;
      }
    }
    this.checkNaturecountValidation();
    this.checkFormValidation();
  }


  checkFormValidation() {
    if (this.isMiddleSectionValid && this.totalTime ) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }

  saveAndProceed() {
    const prepareNatureObject = [];
    const natureArray = this.prepareDataForTables;
    for (let index = 0; index < natureArray.length; index++) {
          if (natureArray[index].isChecked) {
            const myArray = natureArray[index];
              if (!this.isEdit) {
                const tempData = {
                  IsSelected: 'true',
                  NoOfQuestionPerSet: myArray.noOfQuestion,
                  NoOfMandatoryQuestionPerSet: myArray.mandatory,
                  MarksPerQuestion: myArray.marks,
                  IndexNumber: myArray.index,
                  IsAlternate: myArray.alternateQues,
                  QuestionNatureID: myArray['QuestionNatureID'],
                  PaperType :  3
                };
                prepareNatureObject.push(tempData);
              } else {
                const tempData = {
                  IsSelected: 'true',
                  NoOfQuestionPerSet: myArray.noOfQuestion,
                  NoOfMandatoryQuestionPerSet: myArray.mandatory,
                  MarksPerQuestion: myArray.marks,
                  IndexNumber: myArray.index,
                  IsAlternate: myArray.alternateQues,
                  QuestionNatureID: myArray['QuestionNatureID'],
                  EAPaperNatureMasterID: myArray['EAPaperNatureMasterID'],
                  PaperType :  3
                };
                prepareNatureObject.push(tempData);
              }
            //}
          }
        }
    var prepareDataToSave = {
          EAPaperTemplateID: this.createTemplateData['EAPaperTemplateID'],
          PaperType :  3,  
          Duration: this.totalTime,
          lstPaperNature: prepareNatureObject
    }
    console.log(prepareDataToSave);
    this.tempalteService.addPaperNature(prepareDataToSave).subscribe(
      (result) => {
        console.log(result);
        localStorage.setItem('TotalQuestionCount', JSON.stringify(this.countTotalQuestions));
        this.router.navigate([ '../../bloom-difficulty', this.createTemplateData['EAPaperTemplateID'], this.countTotalQuestions], { relativeTo: this.route });
    }, (error) => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(error.error['message']);
     }
    });  
  }

  ShowPriviousSelection(){
    this.isShowPriviousSelection = !this.isShowPriviousSelection;
  }
  
  gotToBloomDifficulty(){
    //localStorage.setItem('TotalQuestionCount', JSON.stringify(this.countTotalQuestions));
    this.router.navigate([ '../../bloom-difficulty', this.createTemplateData['EAPaperTemplateID'], this.countTotalQuestions], { relativeTo: this.route });

  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  
  }

  closeDropDown(event){
    this.showFilter = false;
  }
}
