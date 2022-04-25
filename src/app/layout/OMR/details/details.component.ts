import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})

export class DetailsComponent implements OnInit {
  paperDetails: any=[];
  OMRDetails: any = [];
  questionInfo: any = [];
  isDataFound: boolean;
  selectedStudentData:any = {};
  OMRQuestionList:any = [];
  totalMarks:number;
  assignExamId:any;
  resultStatus:any;
  ResultStatus:any;
  omrCount:any;
  omrRejectedCount:any;
  TestId: any;

  questionModalisUpdate : boolean = false;
  enum ={1:"Active",2:"DeActive",3:"Suspend",4:"Process",5:"Approved",6:"Rejected",7:"Pending", 8:"Ready", 9:"Completed", 10:"InProcess", 11:"Duplicate" }
  
  @ViewChild('student_answer_modal') answerModal: ModalDirective;
  @ViewChild('student_question_modal') questionModal: ModalDirective;

  constructor(public sharedService: SharedDataService, private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(params =>{
      this.assignExamId = params.id;
      this.resultStatus = params.resultStatus;
      if(this.sharedService.getOmrResult() == 'success')
        this.getOMRList(params.id);
      else if(this.sharedService.getOmrResult() == 'failed')
        this.getOMRRejectedList(params.id);
    })
    this.getOMRListcount(this.assignExamId);
    this.getOMRRejectedListcount(this.assignExamId);
  }

  getOMRList(examId){
    this.sharedService.getOMRData(examId).subscribe(res=>{
          this.paperDetails = res['data'];
          if(this.paperDetails && this.paperDetails.length>0){
            this.TestId= this.paperDetails[0]['ExamTestID'];
          }
    }, error=>{
      this.toastr.error(error.error['message']);
    });
  }

  getOMRRejectedList(examId){
    this.sharedService.getOMRRjectedData(examId).subscribe(res=>{
          this.paperDetails = res['data'];
    }, error=>{
      this.toastr.error(error.error['message']);
    });
  }

  changeResultStaus(){
    if(this.resultStatus != 3){
      this.sharedService.changeStatusResult({"EAExamAssignID":this.assignExamId, "ResultStatus":3}).subscribe(res=>{
        this.resultStatus = 3;
        this.toastr.success('Exam marks published successfully.');
      }, error=>{
        this.toastr.error(error.error['message']);
      }); 
    }
  }

  viewOMRSheet(studentData){  
    this.OMRDetails = [];
    this.selectedStudentData = studentData;
    this.sharedService.getOMRDetailsByID(studentData.EAOmrsheetId).subscribe(res =>{
      this.totalMarks = res['TotalMarks'];
      this.OMRDetails = res['data'];
      this.answerModal.show();

      this.OMRDetails.sort(function(quenum1, quenum2) {
        quenum1 = parseInt(quenum1.QuestionNumber);
        quenum2 = parseInt(quenum2.QuestionNumber);
        if (quenum1 > quenum2) return 1;
        if (quenum1 < quenum2) return -1;
     })
    }, error=>{
      this.toastr.error(error.error['message']);
    });

    this.answerModal.show();

  }

  OMRQuestion(studentData){  
    this.OMRQuestionList = [];
    this.selectedStudentData = studentData;
    this.sharedService.getOMRQuestionList(studentData.EAExamAssignID).subscribe(res=>{
      this.OMRQuestionList = res['data'];
      this.questionModalisUpdate = false;
      this.questionInfo = [];
      this.questionModal.show();
      this.OMRQuestionList.sort(function(quenum1, quenum2) {
        quenum1 = quenum1.QueNumber;
        quenum2 = quenum2.QueNumber;
        if (quenum1 > quenum2) return 1;
        if (quenum1 < quenum2) return -1;
     })
    }, error=>{
      this.toastr.error(error.error['message']);
    });
  }

  OMRQuestionEdit(studentData){
    this.OMRQuestionList = [];
    this.selectedStudentData = studentData;
    this.sharedService.getOMRQuestionListWithAnswer(studentData.EAExamAssignID,studentData.EAOmrsheetId).subscribe(res=>{
      this.OMRQuestionList = res['data'];
      this.questionModalisUpdate = true;
      this.questionInfo = [];
      this.questionModal.show();

      this.OMRQuestionList.sort(function(quenum1, quenum2) {
        quenum1 = quenum1.QueNumber;
        quenum2 = quenum2.QueNumber;
        if (quenum1 > quenum2) return 1;
        if (quenum1 < quenum2) return -1;
     })
    }, error=>{
      this.toastr.error(error.error['message']);
    });
  }

  addMarksManual() {
    if(this.questionInfo.length > 0 && this.questionInfo.length == this.OMRQuestionList.length){
      let questionData = {
        "EAExamAssignID": this.selectedStudentData.EAExamAssignID,
        "EAExamAssignStudentMappingID": this.selectedStudentData.EAExamAssignStudentMappingID,
        "TestID": this.selectedStudentData.ExamTestID,
        "RollNumber": this.selectedStudentData.RollNumber,
        "EAPaperTemplateID": this.selectedStudentData.EAPaperTemplateID,
        "lstOMRQuestionOptionInfoMember": this.questionInfo
      }
      this.sharedService.saveOMRManual(questionData).subscribe(res=>{
        if(res['success']){
          this.questionModal.hide();
          this.getOMRList(this.assignExamId);
          this.getOMRListcount(this.assignExamId);
          this.toastr.success(res['message']);    
        }else{
          this.toastr.error(res['message']);    
        }
      }, error=>{
        this.toastr.error(error.error['message']);
      });
    }else{
      this.toastr.error('Please select one option of all questions.');
    }
  }


  
  updateMarksManual() {

    if(this.questionInfo.length > 0){
      let questionData = {
        "EAExamAssignID": this.selectedStudentData.EAExamAssignID,
        "EAExamAssignStudentMappingID": this.selectedStudentData.EAExamAssignStudentMappingID,
        "TestID": this.selectedStudentData.ExamTestID,
        "RollNumber": this.selectedStudentData.RollNumber,
        "EAPaperTemplateID": this.selectedStudentData.EAPaperTemplateID,
        "lstOMRQuestionOptionInfoMember": this.questionInfo,
        "EAOmrSheetId":this.selectedStudentData.EAOmrsheetId
      }
  
      this.sharedService.updateOMRManual(questionData).subscribe(res=>{
        this.questionModalisUpdate = false;
        if(res['success']){
          this.questionModal.hide();
          this.getOMRList(this.assignExamId);
          this.getOMRListcount(this.assignExamId);
          this.toastr.success(res['message']);    
        }else{
          this.toastr.error(res['message']);    
        }
      }, error=>{
        this.toastr.error(error.error['message']);
      });

    } else{
      this.toastr.error('Please select at least one option.');
    }
  }
  
  onSelectOption(value,queIndx,optIndx){

    console.log(this.OMRQuestionList[queIndx]['lstOption'][optIndx]['OptionIndex']);

    let index = this.questionInfo.findIndex((data) => {
                    return data.QuestionID === this.OMRQuestionList[queIndx]['lstOption'][optIndx]['QuestionID'];
                });
    if(index != -1){
      this.questionInfo[index].SelectedAnswer[0] = value;
      this.questionInfo[index].OptionIndex = this.OMRQuestionList[queIndx]['lstOption'][optIndx]['OptionIndex'];
    }else{
      this.questionInfo.push({
        "QuestionID": this.OMRQuestionList[queIndx]['lstOption'][optIndx]['QuestionID'],
        "SelectedAnswer": [value],
        "QuestionIndex": this.OMRQuestionList[queIndx]['QueIndex'],
        "OptionIndex": this.OMRQuestionList[queIndx]['lstOption'][optIndx]['OptionIndex']
      });
    }
  }

  closeModal(from){
    from == 'answer' ? this.answerModal.hide(): this.questionModal.hide();
  }

  omrResult(exam){
    this.ResultStatus=exam;
    this.sharedService.setOmrResult(exam);
    if(exam=='success'){
      this.getOMRList(this.assignExamId);
    }
    if(exam=='failed'){
      this.getOMRRejectedList(this.assignExamId);

    }
    // this.router.navigate(['/exam/OMR/details/', exam['EAExamAssignID'], exam.ResultStatus]);
  }

  getOMRListcount(examId){
    this.sharedService.getOMRData(examId).subscribe(res=>{
          // this.omrCount = res['data'].length;
          let count: 0;
          this.omrCount=0;
          for (let index = 0; index < res['data'].length; index++) {
            if((res['data'][index]['EAOmrsheetStatus']==9) && this.sharedService.getOmrResult() != 'failed'){
              this.omrCount= this.omrCount + 1;
            }
          }
          // (!exam.IsManualEntry || exam.EAOmrsheetStatus == 9) && sharedService.getOmrResult() != 'failed'
    }, error=>{
      this.toastr.error(error.error['message']);
    });
  }

  getOMRRejectedListcount(examId){
    this.sharedService.getOMRRjectedData(examId).subscribe(res=>{
          this.omrRejectedCount = res['data'].length;
    }, error=>{
      this.toastr.error(error.error['message']);
    });
  }

  getomrjson(exam) {
    // href="http://testsrv.oyeexams.com/Uploads/OMRSHEETS/{{enum[exam.EAOmrsheetStatus]}}/JSON/{{exam.jsonFileName}}" 
    if(exam.EAOmrsheetStatus==6){
      window.open(environment.apiUrlIp + '/Uploads/OMRSHEETS/Rejected/JSON/'+exam.jsonFileName, '_blank');
    }
    if(exam.EAOmrsheetStatus==7){
      window.open(environment.apiUrlIp + '/Uploads/OMRSHEETS/Pending/JSON/'+exam.jsonFileName, '_blank');
    }
    if(exam.EAOmrsheetStatus==9){
      window.open(environment.apiUrlIp + '/Uploads/OMRSHEETS/Completed/JSON/'+exam.jsonFileName, '_blank');
    }
    if(exam.EAOmrsheetStatus==11){
      window.open(environment.apiUrlIp + '/Uploads/OMRSHEETS/Duplicate/JSON/'+exam.jsonFileName, '_blank');
    }
  }

  getomrfile(exam) {
    // href="http://testsrv.oyeexams.com/Uploads/OMRSHEETS/{{enum[exam.EAOmrsheetStatus]}}{{exam.OmrSheetFilePath}}"
    if(exam.EAOmrsheetStatus==6){
      window.open(environment.apiUrlIp + '/Uploads/OMRSHEETS/Rejected/'+exam.OmrSheetFilePath, '_blank');
    }
    if(exam.EAOmrsheetStatus==7){
      window.open(environment.apiUrlIp + '/Uploads/OMRSHEETS/Pending/'+exam.OmrSheetFilePath, '_blank');
    }
    if(exam.EAOmrsheetStatus==9){
      window.open(environment.apiUrlIp + '/Uploads/OMRSHEETS/Completed/'+exam.OmrSheetFilePath, '_blank');
    }
    if(exam.EAOmrsheetStatus==11){
      window.open(environment.apiUrlIp + '/Uploads/OMRSHEETS/Duplicate/'+exam.OmrSheetFilePath, '_blank');
    }
    
  }
}
