import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { TableHeader } from 'src/app/model/tableheader';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import {TitleCaseExceptPipe} from 'src/app/Utils/titlecase.pipe'
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-exam-setting',
  templateUrl: './exam-setting.component.html',
  styleUrls: ['./exam-setting.component.scss']
})
export class ExamSettingComponent implements OnInit {
  @ViewChild('timeconfirmation') timeconfirmation: ModalDirective;
  checkedPrepareDataForTables = [];
  indexErrorMsg = '';
  indexErrorMsgForIndex = '';
  mandatoryQuesError = '';
  mandatoryQuesErrorCount = 0;
  mandatoryErrorMsg = '';
  chaptercountErrorMsg = '';
  naturecountErrorMsg = '';
  naturesetcountErrorMsg = '';
  chapterqcount = '';
  chapterCountErrorMsg: boolean = false;
  isAllDataLoad: boolean = false;
  isOmr:boolean;
  isShowPriviousSelection = false;
  isMinEditable = false;
  isMarkEditable = false;
  isfirsttimesavenature = true;
  alternateList = [{'value': 'true', 'name': 'Yes'},
              {'name': 'No', 'value': 'false'}];

  countTotalQuestions: number = 0;
  storeTeampQuestion: number = 0;
  totalMarks: number = 0;
  tempTotalMarksCount: number = 0;
  isFormValid: boolean;
  questionNatureList: any;
  prepareDataForTables: any;
  prepareDataForTablesTemp: any;
  totalTime: number = 60;
  negativeMark: number = 0;
  storeServerResponse = [];
  tempararyData: {};
  isMiddleSectionValid: boolean;
  selectedTemplateNatureList: any;
  ankitdat:any=[];

  selectedTemplateData: any;
  isEdit: boolean = false;
  checkenablebtn: boolean = false;
  createTemplateData: {};
  _tableHeader: TableHeader[];
  _dataArr: any;
  chepterIDs: any =  [];
  chepterListByNature: any = [];
  templateId: '';
  count: number = 0;
  errorMessage: '';
  chaptersettings: any ={};
  subjectSetting: any ={};
  isNatureSaved = false;

  addedIndex : number = 0;

  @ViewChild('duration') step1: ElementRef;
  @ViewChild('negMark') negMark: ElementRef;

  @Input() pagetitle: string;
  @Output() actionEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public set dataArray(val: any) {
      this._dataArr = val;
      this.displayArr = val;
  }
  public get dataArray(): any {
      return this._dataArr;
  }
  displayArr: any;

  @Input() public set tableHeaders(val: TableHeader[]) {
    this._tableHeader = val;
  }
  public get tableHeaders(): TableHeader[] {
    return this._tableHeader;
  }

  constructor(private tempalteService: TemplateService,
              private router: Router,
              private route: ActivatedRoute,
              private sharedService: SharedDataService,
              private toastr: ToastrService,
              private titleCaseExcept: TitleCaseExceptPipe ) {
   }

  ngOnInit() {   

    this.route.params.subscribe(params => {
      this.getTemplateDetials(params.classTestExamId);
    });

    this.chaptersettings = {
      singleSelection: true,
      text: "Select Chapter",
      enableSearchFilter: false,
      badgeShowLimit: 1,
      itemsShowLimit: 1,
      groupBy: "TextBookName",
      title: true
    };
    // setTimeout(() => {
    //   this.checkItemenable();
    // }, 2000);
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
    // this.totalTime =0
  }
  closeModalsaveData(){
    this.timeconfirmation.hide();
    this.save();
  }

  editChapters(){
    this.router.navigate([ '../../chepters', this.createTemplateData['EAPaperTemplateID']], { relativeTo: this.route });
  }
  
  alternatChange(indx) {
    if(this.prepareDataForTables[indx]['alternateQues'] == 'true')
    {
      this.prepareDataForTables[indx]['AlternativeChaptersDataArray'] = this.prepareDataForTables[indx]['ChaptersDataArray'];
    }
  }

  checkItemenable() {
    var n = this.prepareDataForTables.length;
    this.validateForm();
    for (var i = 0 ; i < n; ++i) 
    { 
      if(this.prepareDataForTables[i]['isChecked']==true){
        this.checkenablebtn= true;
        break;
      }
      else if(this.prepareDataForTables[i]['isChecked']==false){
        this.checkenablebtn= false;
      }
    }
  }

  getSubjectSetting(subjectID,isOmr?) {
    let data = {
      subjectID: subjectID,
      IsOMRPaper:isOmr
    }
    this.sharedService.getSubjectSetting(data).subscribe(res=>{ 
      if(res['data'] && !!res['data']['Setting']){
        let data = res['data']['Setting'];
        let prepareData = {
          isratioavailable: data.isratioavailable
        };
        this.subjectSetting = prepareData;
       }else{
        let prepareData = {
          isratioavailable: false
        }
        this.subjectSetting= prepareData;
       }
    })
  }

  editDuration(): void {
    this.isFormValid = false;
    this.totalTime = 0;
    setTimeout(() =>
    {this.step1.nativeElement.value = ''; 
    this.step1.nativeElement.focus();}, 10)
  }

  editNegMark(): void {
    setTimeout(() =>
    {this.negMark.nativeElement.value = ''; 
    this.negMark.nativeElement.focus();}, 10)
  } 

  ShowPriviousSelection(){
    this.isShowPriviousSelection =!this.isShowPriviousSelection
  }
  
  getTemplateDetials(templateId) {
    
    this.sharedService.getTemplateDetailsById(templateId).subscribe((templatedetail)=>{
        this.createTemplateData = templatedetail;
       
          this.isOmr = templatedetail.IsOMRPaper;    
          this.getSubjectSetting(templatedetail.SubjectID,templatedetail.IsOMRPaper); 

          this.tempalteService.editPaperNatureList(templatedetail.EAPaperTemplateID).subscribe((temp) => {
            if(temp.ListEA_PaperNatureInfoMember && temp.ListEA_PaperNatureInfoMember[0])
            {
              this.isEdit = true;
              this.selectedTemplateNatureList = temp;
              this.totalTime = this.selectedTemplateNatureList.Duration;
              this.negativeMark = this.selectedTemplateNatureList.NegativeMarks;
            }
           this.getWorksheetQuestionNatureList(templatedetail.IsOMRPaper);
         }, error => {
          this.isEdit = false;
          this.getWorksheetQuestionNatureList(templatedetail.IsOMRPaper);
         });
    },error =>{
      this.isEdit = false;
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
       console.log(220);
        this.getWorksheetQuestionNatureList(this.createTemplateData['IsOMRPaper']);
        this.toastr.error(error.error['message']);
     }
    })
  }

  getTemplateDetials_backup(templateId) {
    
    this.sharedService.getTemplateDetailsById(templateId).subscribe((templatedetail)=>{
      this.createTemplateData = templatedetail;
          this.isOmr = this.createTemplateData['IsOMRPaper'];    
          this.getSubjectSetting(this.createTemplateData['SubjectID'],this.createTemplateData['IsOMRPaper']);          
          this.tempalteService.editPaperNatureList(this.createTemplateData['EAPaperTemplateID']).subscribe((temp) => {
            if(temp.ListEA_PaperNatureInfoMember && temp.ListEA_PaperNatureInfoMember[0]){
              this.isEdit = true;
              this.selectedTemplateNatureList = temp;
              this.totalTime = this.selectedTemplateNatureList.Duration;
              this.negativeMark = this.selectedTemplateNatureList.NegativeMarks;
            }
           this.getWorksheetQuestionNatureList(this.createTemplateData['IsOMRPaper']);
         }, error => 
         {
          this.isEdit = false;
          this.getWorksheetQuestionNatureList(this.createTemplateData['IsOMRPaper']);
         });
    },error =>
    {
      this.isEdit = false;
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
        this.getWorksheetQuestionNatureList(this.createTemplateData['IsOMRPaper']);
        this.toastr.error(error.error['message']);
     }
    })
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  getWorksheetQuestionNatureList(isOmr){
    console.log("getWorksheetQuestionNatureList");
      this.chepterIDs =  JSON.parse(this.sharedService.getChepterIds());
      this.prepareDataForTables = [];
      this.prepareDataForTablesTemp = [];
      const prepareData = {
        chapters: this.chepterIDs,
        SubjectID:  '',
        IsOMRPaper:isOmr
      };

      const getInstituteDDLClassSuccess = (questionNature) => {
        if (questionNature) {
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
                this.questionNatureList[index].isRandomChecked = false;            
                this.questionNatureList[index]['ChaptersList'] = '';
                this.questionNatureList[index]['AlternateChaptersList'] = '';
                this.tempalteService.chepterListByQuestionNature(this.questionNatureList[index]['QuestionNatureID'], 
                this.createTemplateData['EAPaperTemplateID'], 
                this.createTemplateData['IsOMRPaper']).subscribe(cheptrsList => {
                console.log("chepterListByQuestionNature");
                let mychapters = [];
                let chaptes = (cheptrsList.map(item => item['Chapters']));
                chaptes.map((items, indx)=>{
                  items.forEach((element, chInx) => {
                    element['itemName'] = "("+element.QuestionCount+") "+this.titleCase(element.ChapterName);
                    element['id'] = indx+'_'+chInx;
                    element.category = element.TextBookName;
                    mychapters.push(element);
                  });
                });
  
                this.questionNatureList[index]['ChaptersDataArray'] = mychapters;
  
                if(mychapters && mychapters.length > 0) {
                    mychapters.sort( function( a, b ) {
                      if (a.TextBookName === "other" || a.TextBookName === "Other") {
                        return 1;
                      }else if (b.TextBookName === 'other' || b.TextBookName === 'Other' ) {
                        return -1;
                      }else{
                        if (a.TextBookName > b.TextBookName) {
                          return 1;
                      }
                      if (b.TextBookName > a.TextBookName) {
                          return -1;
                      }
                      }
                    });
                   } 
                this.questionNatureList[index]['AlternativeChaptersDataArray'] = mychapters;
              });
  
              this.prepareDataForTables.push(this.questionNatureList[index]); 
              for (var i = 0, n = this.prepareDataForTables.length; i < n; ++i){ 
                if( this.prepareDataForTables[i]["ChaptersDataArray"] === undefined ) {
                    this.prepareDataForTables[i]['ChaptersDataArray']=[];
                    this.prepareDataForTables[i]['AlternativeChaptersDataArray']=[];
                }
              }
              
              if(index == this.questionNatureList.length-1){
                this.isAllDataLoad = true;
                let statesSeen = [];
                 this.prepareDataForTables.sort((a, b) => {
                  const naturecomp = a.QuestionNatureName.localeCompare(b.QuestionNatureName);
                  return naturecomp;
                }).map(x => {
                  const stateSpan = statesSeen[x.QuestionNatureName] ? 0 :
                    this.prepareDataForTables.filter(y => y.QuestionNatureName === x.QuestionNatureName).length;
                    statesSeen[x.QuestionNatureName] = true;
                    x.checkboxSpan = stateSpan;
                    
                });
                this.updateCheckedQuestionNatureList()
              }
            }
          }
           else {     
            this.isFormValid = true;
            this.isMiddleSectionValid = true;
            let selectedTmeplateInternalData = this.selectedTemplateNatureList.ListEA_PaperNatureInfoMember;

            selectedTmeplateInternalData = selectedTmeplateInternalData.sort((a, b) => a.IndexNumber > b.IndexNumber ? 1 : a.IndexNumber < b.IndexNumber ? -1 : 0)

            console.log(selectedTmeplateInternalData,"selectedTmeplateInternalData");

            for (let index = 0; index < this.questionNatureList.length; index++) 
            {
              let flag = false;
              for (let cIndex = 0; cIndex < selectedTmeplateInternalData.length; cIndex++) 
              {
                if (this.questionNatureList[index]['QuestionNatureID'] == selectedTmeplateInternalData[cIndex]['QuestionNatureID']) 
                {   
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
                    tempObject['isRandomChecked'] =  false;
                    tempObject['QuestionCount'] =  this.questionNatureList[index]['QuestionCount']
                    tempObject['QuestionNatureCode'] = this.questionNatureList[index]['QuestionNatureCode']
                    tempObject['QuestionNatureID'] = this.questionNatureList[index]['QuestionNatureID']
                    tempObject['QuestionNatureName'] = this.questionNatureList[index]['QuestionNatureName'];
                    tempObject['addedIndex'] = selectedTmeplateInternalData[cIndex]['IndexNumber'];
                    this.addedIndex = selectedTmeplateInternalData[cIndex]['IndexNumber'];
                    this.prepareDataForTables.push(tempObject);
  
                    this.tempalteService.chepterListByQuestionNature(selectedTmeplateInternalData[cIndex]['QuestionNatureID'], this.createTemplateData['EAPaperTemplateID'],this.createTemplateData['IsOMRPaper']).subscribe(cheptrsList => {
                      
                      let mychapters = [];
  
                      let chaptes =[...(cheptrsList.map(item => item['Chapters']))];
  
                      chaptes.map((items, indx)=>{
                        items.forEach((element, chInx) => {
                          element['itemName'] = "("+element.QuestionCount+") "+this.titleCase(element.ChapterName);
                          element['id'] = indx+'_'+chInx;
                          element.category = element.TextBookName;
                          mychapters.push(element);
                        });
                      });
                        tempObject['ChaptersDataArray'] = mychapters;
                        if(mychapters && mychapters.length > 0){
                       
                          mychapters.sort( function( a, b ) {
                              if (a.TextBookName === "other" || a.TextBookName === "Other") {
                                return 1;
                              }else if (b.TextBookName === 'other' || b.TextBookName === 'Other' ) {
                                return -1;
                              }else{
                                if (a.TextBookName > b.TextBookName) {
                                  return 1;
                              }
                              if (b.TextBookName > a.TextBookName) {
                                  return -1;
                              }
                              }
                            });
                           }  
                        tempObject['AlternativeChaptersDataArray'] = mychapters;
                     
                      let selectedChapter = selectedTmeplateInternalData[cIndex]['ChaptersList'] ? selectedTmeplateInternalData[cIndex]['ChaptersList'].toLowerCase() : "";

                      if(selectedChapter != "") {
                        var selectedCL = mychapters.find(item => item['ChapterId'] == selectedChapter);
                        if(selectedCL != undefined)
                        {
                          let selectedcahpter = [];
                          selectedcahpter.push(selectedCL);
                            tempObject['ChaptersList']= selectedcahpter;
                          }else {
                            tempObject['ChaptersList'] = "";
                          }
                      }
                     
                      let selectedAltChapter = !!selectedTmeplateInternalData[cIndex]['AlternateChaptersList'] ? selectedTmeplateInternalData[cIndex]['AlternateChaptersList'].toLowerCase() : "";
  
                      if(selectedAltChapter != "") {
                        var selectedACL = mychapters.find(item => item['ChapterId'] == selectedAltChapter);
                        if(selectedACL != undefined)
                        {
                          if(selectedTmeplateInternalData[cIndex]['IsAlternate'].toString() == "true") {
                            let selectedaltcahpter = [];
                            selectedaltcahpter.push(selectedACL);
                            tempObject['AlternateChaptersList'] = selectedaltcahpter;
                          } else {
                            tempObject['AlternateChaptersList'] = "";  
                          }
                        } else {
                          tempObject['AlternateChaptersList'] = "";
                        }
                      }
  
                      // for (var i = 0, n = this.prepareDataForTables.length; i < n; ++i)
                      // {
                      //   if(this.prepareDataForTables[i]["ChaptersList"] == undefined ) 
                      //   {
                      //       this.prepareDataForTables[i]['ChaptersList']="";
                      //   }
                      // }
                    });
  
                    this.count = this.count + (+tempObject['index']);
                    this.countQuestion(selectedTmeplateInternalData[cIndex]['NoOfQuestionPerSet']);
                    this.countTotalMark(selectedTmeplateInternalData[cIndex]['NoOfMandatoryQuestionPerSet'], selectedTmeplateInternalData[cIndex]['MarksPerQuestion']);
                } 
              }
              if(!flag)
              {
                this.questionNatureList[index].checkboxSpan =  1;
                this.questionNatureList[index].isChecked =  false;
                this.questionNatureList[index].noOfQuestion =  1;
                this.questionNatureList[index].marks = 1;
                this.questionNatureList[index].mandatory = 1;
                this.questionNatureList[index].index = 0;
                //this.questionNatureList[index].index = 1;
                this.questionNatureList[index].alternateQues = 'false';
                this.questionNatureList[index].isRandomChecked = false;              
                this.questionNatureList[index]['ChaptersList'] = '';
                this.questionNatureList[index]['AlternateChaptersList'] = '';
                this.questionNatureList[index]['addedIndex'] = this.addedIndex+1;
                this.addedIndex = this.addedIndex+1;

                this.prepareDataForTables.push(this.questionNatureList[index]);
  
                this.tempalteService.chepterListByQuestionNature(this.questionNatureList[index]['QuestionNatureID'], this.createTemplateData['EAPaperTemplateID'],this.createTemplateData['IsOMRPaper']).subscribe(cheptrsList => {
  
                  let mychapters = [];
                
                  let chaptes =[...(cheptrsList.map(item => item['Chapters']))];
                  chaptes.map((items, indx)=>{
                    items.forEach((element, chInx) => {
                      element['itemName'] = "("+element.QuestionCount+") "+this.titleCase(element.ChapterName);
                      element['id'] = indx+'_'+chInx;
                      element.category = element.TextBookName;
                      mychapters.push(element);
                    });
                  });
                  
                  this.questionNatureList[index]['ChaptersDataArray'] = mychapters;
                  this.questionNatureList[index]['AlternativeChaptersDataArray'] = mychapters;
                });
              }
  
              index == this.questionNatureList.length-1 ? this.updateCheckedQuestionNatureList() : null;

              setTimeout(() => {
                this.isAllDataLoad = true;
              }, 5000);
            }
            
            let statesSeen = [];
            this.prepareDataForTables.map(x => {
              const stateSpan = statesSeen[x.QuestionNatureName] ? 0 :
                this.prepareDataForTables.filter(y => y.QuestionNatureName === x.QuestionNatureName).length;
                statesSeen[x.QuestionNatureName] = true;
                x.checkboxSpan = stateSpan;      
            });
          }
          // this.prepareDataForTables.sort((a, b) => {
          //     const naturecomp = a.QuestionNatureCode.localeCompare(b.QuestionNatureCode);
          //     return naturecomp;      
          //   });
          this.sortNature();
        }
      };
    
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };

    this.tempalteService.getWorksheetQuestionNature(prepareData).subscribe(
      getInstituteDDLClassSuccess,
      getInstituteDDLClassFailure
    );
    console.log(this.prepareDataForTables,"FINAL DATA");
    if(this.prepareDataForTables.length > 0)
    {
      this.checkItemenable();
    } else {
      setTimeout(() => {
        this.checkItemenable();
      }, 2000);
    }
  }

  repushprepared(selectedTmeplateInternalData){
    for (let index = 0; index < this.questionNatureList.length; index++) {
      for (let cIndex = 0; cIndex < selectedTmeplateInternalData.length; cIndex++) {
        if (this.questionNatureList[index]['QuestionNatureID'] != selectedTmeplateInternalData[cIndex]['QuestionNatureID']){
          console.log('hi ');
        }
      }
    }
   
  }

  getChapterObject(chapterID){
  }


  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
 }

  addNewRowwithSpan(item, indx) {
    const statesSeen = {};
    let groupByNatureName = [];

    const maxnature = this.prepareDataForTables.reduce(function(prev, current) {
      return (prev.index > current.index) ? prev : current
    });

    const myData = {
      addedIndex :  this.addedIndex+1,
      noOfQuestion: 1,
      marks: 1,
      mandatory: 1,
      // index: 66,
      index: this.countTotalQuestions+1,
      alternateQues: 'false',
      isChecked: item.isChecked,
      QuestionCount: item.QuestionCount,
      QuestionNatureCode: item.QuestionNatureCode,
      QuestionNatureID: item.QuestionNatureID,
      QuestionNatureName: item.QuestionNatureName,
      ChaptersList: item.ChaptersDataArray,
      AlternateChaptersList : item.ChaptersDataArray,
      ChaptersDataArray: item.ChaptersDataArray,
      AlternativeChaptersDataArray: item.ChaptersDataArray,
      isRandomChecked: false
    };
    this.count =  this.count + 1;

    // let temparray = this.prepareDataForTables.filter((d: any) => d.index == indx);
    this.addedIndex =  this.addedIndex + 1;
    this.prepareDataForTables.splice(indx+1, 0, myData);

    setTimeout(() => {
      let a = this.prepareDataForTables.findIndex(obj => obj.index == myData.index)
      this.prepareDataForTables[a]['ChaptersList'] = '';
      this.prepareDataForTables[a]['AlternateChaptersList'] = '';
     },0);

    this.prepareDataForTables.map(x => {
      const stateSpan = statesSeen[x.QuestionNatureName] ? 0 :
        this.prepareDataForTables.filter(y => y.QuestionNatureName === x.QuestionNatureName).length;
        statesSeen[x.QuestionNatureName] = true;
        x.checkboxSpan = stateSpan;
    });
    item.isChecked ?  this.updateCheckedQuestionNatureList(): null;

    this.sortNature();
  }

  sortNature() {
    this.prepareDataForTables.sort((a, b) => {
      const naturecomp = a.QuestionNatureCode.localeCompare(b.QuestionNatureCode);
      return naturecomp;      
    });
    
  }

  getCheptrListByQuestionNature(natureId, templateId){
    this.tempalteService.chepterListByQuestionNature(natureId, templateId, this.createTemplateData['IsOMRPaper']).subscribe(cheptrsList => {
      // this.chepterListByNature.push(cheptrsList);
      return cheptrsList;
    },(error) => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(error.error['message']);
     }
    });
  }
    // on unchecked any row
    onCheckedAction(index, QuestionNatureName){
      for (let index = 0; index < this.prepareDataForTables.length; index++) 
      {
        const element = this.prepareDataForTables[index];
        if(this.prepareDataForTables[index].QuestionNatureName == QuestionNatureName)
        {
          this.prepareDataForTables[index].isChecked = false;
          this.removeQuesAndMarks(index);
          this.removeIndex(this.prepareDataForTables[index]);
        }
        index == this.prepareDataForTables.length-1 ? this.updateCheckedQuestionNatureList(): null;
      }
    }

  // oncheck any row
  onUncheckedAction(index, QuestionNatureName){
    const statesSeen = {};
    let groupByNatureName = [];
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

  // on checked random chapters
  onUncheckedRandomAction(i){
    const element = this.prepareDataForTables[i];
    element.mandatory = element['noOfQuestion'];
    // element.ChaptersList = [{'id': '0_423', 'itemName': 'All'}];
    
    //-----random chapter code-------
    let chapterid: '';
    for (let index = 0; index < element['ChaptersDataArray'].length; index++) {
      chapterid=element['ChaptersDataArray'][index]['ChapterId'];
      break;
    }
    element.ChaptersList = [{'id': '0_423', 'itemName': 'All', 'ChapterId':chapterid }];
    //-----random chapter code------

    setTimeout(() => {      
      this.validateMandatoryQues(i);
      this.validateForm();
    }, 10);
  }
  // on uncheck random chapters
  onCheckedRandomAction(i){
    console.log('unchecked', this.prepareDataForTables[i]);
    const element = this.prepareDataForTables[i];
    element.ChaptersList = '';
    
    setTimeout(() => {
      this.validateForm();
    }, 10);
  }

  countIndexNew(selectedNature) {
    this.count = this.count + 1;
    selectedNature.index = this.countTotalQuestions + 1;
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

    // this.checkedPrepareDataForTables.sort((a, b) => {      
    //   const naturecomp = (a.addedIndex.toString()).localeCompare(b.addedIndex);
    //   //const naturecomp = (a.index.toString()).localeCompare(b.index);    
    //   return naturecomp;
    // }).forEach((ele, indx)=>
    // {
    //   if(ele['isChecked'] && ele.noOfQuestion > 1 && ele.mandatory > 1 && ele.noOfQuestion == ele.mandatory){
    //     ele['index']= +localCountIndex+1;  
    //     localCountIndex = +localCountIndex+ +ele.noOfQuestion;
    //   }else{
    //     localCountIndex = +localCountIndex+1;
    //     ele['index']= +localCountIndex;
    //   }
    // })

    setTimeout(() => {
      this.validateIndex();
    }, 1000);
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

  removeIndex(selectedNature){
    
    if(selectedNature.index > 0){
      if(!selectedNature['isChecked'] && selectedNature.noOfQuestion == selectedNature.mandatory){
        this.count = +this.count - selectedNature.noOfQuestion;
      }else{
        this.count = +this.count - 1;
      }      
      selectedNature.index = 0;            
    }
  }

  revisedIndex(){
    let localCountIndex = 0;
    this.checkedPrepareDataForTables.sort((a, b) => {      
      const naturecomp = (a.index.toString()).localeCompare(b.index);    
      return naturecomp;
    }).forEach((ele, indx)=>{
      if(ele['isChecked'] && ele.noOfQuestion > 1 && ele.mandatory > 1 && ele.noOfQuestion == ele.mandatory){
        // console.log(ele.index, ele);
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

  validateIndex() {
    this.indexErrorMsg = '';
    this.indexErrorMsgForIndex = '';
    this.checkedPrepareDataForTables.filter((element, indx)=> {
      if(element.isChecked && (element.index < 1 || element.index > this.count) && this.indexErrorMsg == '')
      {
        this.indexErrorMsg = 'Index number can not be more then selected rows.';
        setTimeout(() => {
          this.validateForm();
        }, 10);
      }
    })
    const distinctIndex = Array.from(new Set(this.checkedPrepareDataForTables.map(a => a.index)))
    if(distinctIndex.length != this.checkedPrepareDataForTables.length){
      this.indexErrorMsgForIndex = 'Multiple Question set can not be of same Index.';
      setTimeout(() => {
        this.validateForm();
      }, 10);
    }
  }

  updateCheckedQuestionNatureList(){

    this.checkedPrepareDataForTables = [];
    for (let index = 0; index < this.prepareDataForTables.length; index++) 
    {
      if(this.prepareDataForTables[index].isChecked) { 
        this.checkedPrepareDataForTables.push(this.prepareDataForTables[index]);
      } 
      // index == this.prepareDataForTables.length-1 ? this.revisedIndex() : null;
      index == this.prepareDataForTables.length-1 ? this.rearrangeIndex() : null;
    }
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
  validateMandatoryQues(indx){

    this.mandatoryQuesError = '';
      if(this.prepareDataForTables[indx].isRandomChecked){
        this.prepareDataForTables[indx].mandatory = this.prepareDataForTables[indx].noOfQuestion;
      }
    var validateMandatoryQuesfiltereddata = this.prepareDataForTables.filter((d: any) => d.noOfQuestion < d.mandatory && d.isChecked == true);
     if(validateMandatoryQuesfiltereddata.length > 0){
      this.mandatoryQuesError = 'Mandatory questions count cannot be greater than the "No. of Question" count.';
      setTimeout(() => {
        this.isFormValid = false;
        this.chapterCountErrorMsg =false;
        console.log("validation="+this.isFormValid);
      }, 10);
    }
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
    this.validateMandatoryQues("0");
  }
  onFocuscountTotalMark(question, marks) {
    if(this.tempTotalMarksCount > 0 ){
      const totalMarksForRow = question * marks;
      this.tempTotalMarksCount = this.tempTotalMarksCount - totalMarksForRow;
    }
  }

  getAlternateChaptersId(ChapterId, parentIndx, type) {
    if(type== 'deselect'){
     this.prepareDataForTables[parentIndx]['AlternateChaptersList'] = "";      
    }
    if(type== 'deselectall'){
      this.prepareDataForTables[parentIndx]['AlternateChaptersList'] = "";
    }
    setTimeout(() => {
      this.validateForm();
    }, 10);
  }
  
  getChepterId(ChapterId, parentIndx, type) {

    // console.log(this.prepareDataForTables[parentIndx]['ChaptersList'], ChapterId);

    if(type== 'deselect'){
     this.prepareDataForTables[parentIndx]['ChaptersList'] = "";      
    }
    if(type== 'deselectall'){
      this.prepareDataForTables[parentIndx]['ChaptersList'] = "";
    }
    
    setTimeout(() => {
      this.validateForm();
    }, 10);
  }

  validateForm() {
    let flag = true;

    var validateMandatoryQuesfiltereddata = this.prepareDataForTables.filter((d: any) => d.noOfQuestion < d.mandatory && d.isChecked == true);
    if(validateMandatoryQuesfiltereddata.length > 0){
      this.mandatoryQuesError = 'Mandatory questions count cannot be greater than the "No. of Question" count.';
   }

    for (let index = 0; index < this.prepareDataForTables.length; index++) {
      const childElement = this.prepareDataForTables[index];
        if (flag && childElement.isChecked) 
        {
          childElement.alternateQues = childElement.noOfQuestion > 1 ? 'false': childElement.alternateQues;
            if (childElement.noOfQuestion < 1  || childElement.mandatory <1 || childElement.noOfQuestion < childElement.mandatory || childElement.index < 1 || !childElement.isChecked || !!!childElement.ChaptersList ||(childElement.alternateQues == 'true' && !!!childElement.AlternateChaptersList)) {
              this.isMiddleSectionValid = false;
              flag = false;
              break;
            } else if(childElement.alternateQues == true && childElement.AlternateChaptersList == ''){
              this.isMiddleSectionValid = false;
              flag = false;
              break;
            }else{
              this.isMiddleSectionValid = true;
            }
      }else{
        this.isMiddleSectionValid = true;
      }
    }
    this.checkNaturecountValidation();
    this.checkFormValidation();
  }
  checkFormValidation() {
    if (this.isMiddleSectionValid && this.totalTime && this.indexErrorMsg == '' && this.indexErrorMsgForIndex == '') {
      this.isFormValid = true;
      console.log("validation="+this.isFormValid);
    } else {
      this.isFormValid = false;
      console.log("validation="+this.isFormValid);
    }
  }

  checkchaptercountValidation(item) {
    
    this.chaptercountErrorMsg = '';
    var natureChapters=[];
    let natureArray = this.prepareDataForTables.filter((d: any) => d.isChecked == true);

    for (let i=0; i< natureArray.length; i++) 
    {
      natureChapters = natureArray[i].ChaptersList;

      var checkchaptercountValidationFiltered = natureChapters.filter((e: any) => e.QuestionCount < natureArray[i].noOfQuestion);
    
        if(checkchaptercountValidationFiltered.length > 0)
      {
        this.chaptercountErrorMsg = '"No. of Question" value cannot be greater than the maximum questions available in the selected Chapter';
            setTimeout(() => {
              this.isFormValid = false;
              this.chapterCountErrorMsg =false;
              console.log("validation="+this.isFormValid);
            }, 10);
        }
      }
  } 

  checkNaturecountValidation() {

    this.naturecountErrorMsg = '';
    this.naturesetcountErrorMsg = '';
    let natureArray = this.prepareDataForTables.filter((d: any) => d.isChecked == true);
    for (let i=0; i< natureArray.length; i++) 
    {
        this.checkNatureSetcountValidation(natureArray[i].QuestionNatureID,natureArray[i].QuestionCount);

        if(natureArray[i].noOfQuestion > natureArray[i].QuestionCount)
        {
          this.naturecountErrorMsg = '"No. of Question" value cannot be greater than the maximum questions available in the selected Nature';
              setTimeout(() => {
                this.isFormValid = false;
                this.chapterCountErrorMsg =false;
                console.log("validation="+this.isFormValid);
              }, 10);
        }
      }
  } 

  checkNatureSetcountValidation(natureid,naturequestioncount) {
    let natureArray = this.prepareDataForTables.filter((d: any) => d.QuestionNatureID == natureid);
    let TotalQuestionCount = 0;
    for (let i=0; i< natureArray.length; i++) 
    {
      TotalQuestionCount = TotalQuestionCount+natureArray[i].noOfQuestion;
      if(TotalQuestionCount > naturequestioncount) {
        this.naturesetcountErrorMsg = 'All set question count should not be greater than total no of question exists';
            setTimeout(() => {
              this.isFormValid = false;
            }, 10);
      }
    }
  }

  save() {

    let natureArray = [...this.prepareDataForTables];
    
    for (let index = 0; index < natureArray.length; index++) 
    {
      if(natureArray[index].isChecked && natureArray[index].isRandomChecked)
      {
        let noOfQuestion = natureArray[index]['noOfQuestion'];
        let startIndex  = natureArray[index]['index'];
        const myArray = natureArray[index];
        if(natureArray[index]['ChaptersDataArray'] && noOfQuestion >= natureArray[index]['ChaptersDataArray'].length)
        {
          const a = getParts(noOfQuestion, natureArray[index]['ChaptersDataArray'].length);
          if(natureArray[index]['ChaptersDataArray'] && natureArray[index]['ChaptersDataArray'].length > 0) 
          {
            for (let i = 0; i <= a.length-1; i++) 
            {
              const chapterArray = natureArray[index]['ChaptersDataArray'][i];

              const tempData = {
                IsSelected: 'true',
                isChecked: 'true',
                noOfQuestion: a[i],
                isRandomChecked:true,
                mandatory: a[i],
                marks: myArray.marks,
                index: startIndex,
                alternateQues: 'false',
                QuestionNatureID: myArray['QuestionNatureID'],
                ChaptersList: [chapterArray],
                AlternateChaptersList: "",
                isShowRow: true,
                ChaptersDataArray: myArray['ChaptersDataArray'],
                AlternativeChaptersDataArray: myArray['AlternativeChaptersDataArray'],
                checkboxSpan: i+1,
              };
              startIndex = startIndex+1;
              natureArray.push(tempData);
              if(i == natureArray[index]['ChaptersDataArray'].length-1) {
                natureArray.splice(index, 1);
              }
              // console.log(natureArray,"LINE 1268");
            }
          }
        } else 
        {
          for (let i = 0; i <= noOfQuestion-1; i++) 
          {
            let chapterArray = [];
            //if(natureArray[index]['ChaptersDataArray'])
              chapterArray = natureArray[index]['ChaptersDataArray'][i];            
              const tempData = {
                checkboxSpan: i+1,
                IsSelected: 'true',
                isChecked: 'true',
                noOfQuestion: 1,
                isRandomChecked:true,
                mandatory: 1,
                marks: myArray.marks,
                index: startIndex,
                alternateQues: 'false',
                QuestionNatureID: myArray['QuestionNatureID'],
                ChaptersList: [chapterArray],
                AlternateChaptersList: "",
                isShowRow: true,
                ChaptersDataArray: myArray['ChaptersDataArray'],
                AlternativeChaptersDataArray: myArray['AlternativeChaptersDataArray']
              };
              startIndex = startIndex+1;
              natureArray.push(tempData);
              if(i == noOfQuestion-1) {
                natureArray.splice(index, 1);
              }
          }
        }
      }else
      {
        // this.proceedWorksheet();
      }  
    }

    setTimeout(() => {
      this.proceedWorksheet(natureArray);
    }, 1000);
  }
  // Save nature setting
  proceedWorksheet(natureArray) 
  {
  const prepareNatureObject = [];

  natureArray.sort((a, b) => a.index < b.index ? -1 : a.index > b.index ? 1 : 0)

  for (let index = 0; index < natureArray.length; index++) 
  {
        if (natureArray[index].isChecked) 
        {
          const myArray = natureArray[index];
            if (!this.isEdit) 
            {
              const tempData = {
                IsSelected: 'true',
                NoOfQuestionPerSet: myArray.noOfQuestion,
                NoOfMandatoryQuestionPerSet: myArray.mandatory,
                isRandomChecked:myArray.isRandomChecked,
                MarksPerQuestion: myArray.marks,
                //IndexNumber: myArray.index,
                IndexNumber: index+1,
                IsAlternate: myArray.alternateQues,
                QuestionNatureID: myArray['QuestionNatureID'],
                ChaptersList: myArray.ChaptersList[0]['ChapterId'],
                AlternateChaptersList: myArray.alternateQues == 'true' ? myArray.AlternateChaptersList[0]['ChapterId']: "",
                PaperType :  this.createTemplateData['PaperType']
              };
              prepareNatureObject.push(tempData);
            } 
            else 
            {
              const tempData = 
              {
                IsSelected: 'true',
                NoOfQuestionPerSet: myArray.noOfQuestion,
                NoOfMandatoryQuestionPerSet: myArray.mandatory,
                MarksPerQuestion: myArray.marks,
                isRandomChecked:myArray.isRandomChecked,
                // IndexNumber: myArray.index,
                IndexNumber: index+1,
                IsAlternate: myArray.alternateQues,
                QuestionNatureID: myArray['QuestionNatureID'],
                EAPaperNatureMasterID: myArray['EAPaperNatureMasterID'],
                ChaptersList: myArray.ChaptersList[0]['ChapterId'],
                AlternateChaptersList: myArray.alternateQues == 'true' ? myArray.AlternateChaptersList[0]['ChapterId']: "",
                PaperType :  this.createTemplateData['PaperType']
              };
              prepareNatureObject.push(tempData);
            }
        }

        if(index == natureArray.length -1)
        {
          var prepareDataToSave = {
            EAPaperTemplateID: this.createTemplateData['EAPaperTemplateID'],
            PaperType :  this.createTemplateData['PaperType'],
            Duration: this.totalTime,
            lstPaperNature: prepareNatureObject,
            IsOMRPaper:this.isOmr,
            NegativeMark:this.negativeMark
        }

          localStorage.setItem('natureArray', JSON.stringify(prepareDataToSave));
          
          this.tempalteService.addPaperNature(prepareDataToSave).subscribe(
            (result) => {
              this.isNatureSaved = true;
              if(!this.subjectSetting['isratioavailable']){
              this.sharedService.setTotalQuestionCount(this.countTotalQuestions);
              if(this.pagetitle == 'Worksheet Settings'){
                this.router.navigate([ '../../bloom-difficulty', this.createTemplateData['EAPaperTemplateID'], result['data']], { relativeTo: this.route });
            
              }else{
              this.router.navigate([ '../../bloom-setting', this.createTemplateData['EAPaperTemplateID'], result['data']], { relativeTo: this.route });
              }
              }else{
              }
          }, (error) => {
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
              this.toastr.warning(UNAUTHERIZEDMESSASGE);
            } else{
                this.toastr.error(error.error['message']);
            }
          });
        }
      }
  }

  useSysIntelligance(){
    let data = {
      "EAPaperTemplateID": this.createTemplateData['EAPaperTemplateID']
    }
    this.sharedService.createPaperWithSystemIntelligence(data).subscribe(res=>{
      this.router.navigate(['../../generate-paper', this.createTemplateData['EAPaperTemplateID']], {relativeTo: this.route});

    }, error=>{
       this.toastr.error(error['error']['message']);
    })
  }

navigteToBloom(){
this.sharedService.setTotalQuestionCount(this.countTotalQuestions);
      if(this.pagetitle == 'Worksheet Settings'){
        this.router.navigate([ '../../bloom-difficulty', this.createTemplateData['EAPaperTemplateID'], this.countTotalQuestions], { relativeTo: this.route });
    
      }else{
       this.router.navigate([ '../../bloom-setting', this.createTemplateData['EAPaperTemplateID'], this.countTotalQuestions], { relativeTo: this.route });
    
      }
}
gotToTemplateSetting(){
  console.log(this.countTotalQuestions);
  if(this.pagetitle == 'Worksheet Settings'){
    this.router.navigate([ '../../bloom-difficulty', this.createTemplateData['EAPaperTemplateID'],this.createTemplateData['TotalQuestionCount'] ], { relativeTo: this.route });

  }else{
   this.router.navigate([ '../../bloom-setting', this.createTemplateData['EAPaperTemplateID'], this.createTemplateData['TotalQuestionCount']], { relativeTo: this.route });
  }
}

numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
    return false;
  }
  return true;
}

closeDropDown(event){
  this.isShowPriviousSelection = false;
}
}

function getParts(sum, length) {
  var left = Math.ceil(sum / length),
      right = Math.floor(sum / length),
      first = (sum - right * length) / right;

  return Array.from({ length }, (_, i) => i < first ? left : right);
} 