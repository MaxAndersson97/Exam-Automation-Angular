import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-add-student-marks-manually',
  templateUrl: './add-student-marks-manually.component.html',
  styleUrls: ['./add-student-marks-manually.component.scss']
})
export class AddStudentMarksManuallyComponent implements OnInit {
  @ViewChild('student_marks_modal') studentMarksModal  : ModalDirective;
  @ViewChild('AddMarksModal1') AddMarksModal1: ModalDirective;
  studentList: any=[];
  marksList: any=[];
  selectedExam: any = [];
  selectedStudent: any = [];
  isFormValid: boolean = false;
  errorMsg: string;
  examID: any ='';
  searchString: string;
  constructor(private sharedService: SharedDataService,
             private router: ActivatedRoute,
             private route: Router,
             private toastr: ToastrService) { }

  ngOnInit() {
    this.selectedExam =JSON.parse(localStorage.getItem('selectedAddMarks'));
    this.router.params.subscribe(id =>{
      this.examID = id.id;
      this.getStudentsMarksDetails(id.id);
    })    
  }

  getStudentsMarksDetails(id) {
    this.sharedService.getStudentMarks(id).subscribe(res=>{
      if(res.length >0){
        this.studentList = res;
      }
    }, err=>{
    });
  }

  changeStatus(student){
    let prepareData = {
      "EAExamAssignStudentMappingID": student.EAExamAssignStudentMappingID,
      "IsAppear": !student.IsAttempted
    }
    this.sharedService.changeAddMarkStatus(prepareData).subscribe(res=>{
      this.toastr.success(res['message']);
      this.ngOnInit();
    }, err=>{

    })
  }

  openAddMarksModal(student){
    this.selectedStudent = student;
    console.log(this.selectedStudent.LstQuestionMarks);
    this.studentMarksModal.show();
  }

  closeModal(){
    this.studentMarksModal.hide();
  }

  OpenAddMarks(){
    this.AddMarksModal1.show();
  }
    
  closeAddMarksModal(){
    this.AddMarksModal1.hide();
  }

  addMarks() {
    this.errorMsg = "";
    this.isFormValid = true;
    // TotalMarks
    var TotalMarks = 0;

    this.selectedStudent.LstQuestionMarks.forEach(function (value) {
      TotalMarks = TotalMarks + value.ObtainedMark;
    });

    if(TotalMarks > this.selectedExam['TotalMarks'])
    {
      this.errorMsg = "Total Obtained marks should not be greater than toal marks of exam.";
      this.isFormValid = false;
    } else {
      let prepareObj = {
        EAExamAssignID: this.selectedStudent.EAExamAssignID,
        EAPaperTemplateID: this.selectedExam.EAPaperTemplateID,
        "IsMultipleMarkerInsert": false,
        "LstStudentMarksMapping": this.selectedStudent.LstQuestionMarks
      }

      this.sharedService.addMarks(prepareObj).subscribe(res=>{
        this.getStudentsMarksDetails(this.examID);
        this.closeModal();
      }, err=>{
      })
    }
  }

  addMarksInBulk(){    
    this.route.navigate(['../../upload-csv', this.selectedExam.EAExamAssignID], {relativeTo: this.router});
  }
  
  validateMark() {
    this.errorMsg = "";
    this.isFormValid = true;

    var validatedata = this.selectedStudent.LstQuestionMarks.filter((d: any) => d.ObtainedMark < 0 || d.ObtainedMark== null || d.Marks < d.ObtainedMark);

    if(validatedata.length > 0)
    {
      this.isFormValid = false;
      this.errorMsg =  "Marks obtained should not be greater than Marks.";
    }
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  
  }

  readyToPublish(){
    let prepare = {
      "EAExamAssignID": this.selectedExam['EAExamAssignID'],
      "ResultStatus": 3
      }
      this.sharedService.changeStatusResult(prepare).subscribe(res=>{
        if(res){
           this.toastr.success('Exam is ready to publish.');
           this.selectedExam['ResultStatus'] = 3;
           localStorage.setItem('selectedAddMarks', JSON.stringify(this.selectedExam));  
           this.closeAddMarksModal();
        }
      }, error=>{

      })
  }
  
}

