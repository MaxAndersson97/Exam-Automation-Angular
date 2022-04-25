import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Route } from '@angular/compiler/src/core';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-mark-attandance',
  templateUrl: './mark-attandance.component.html',
  styleUrls: ['./mark-attandance.component.scss']
})
export class MarkAttandanceComponent implements OnInit {
  selectedStudentDetails: any;
  isStudentSelected: boolean;
  selectedExamID: string = '';
  @Output()  closeEvent = new EventEmitter();
  @Output() submitEvent= new EventEmitter();

  constructor(private sharedService: SharedDataService) { }
  
  ngOnInit() {
    this.selectedExamID = this.sharedService.getSelectedTempalteID();
    this.getStudent();
  }

  updateStudent(i){
    this.selectedStudentDetails[i]['IsAttempted'] = !this.selectedStudentDetails[i]['IsAttempted'];
    let isAnySelecetedStudent = this.selectedStudentDetails.find(item=> item.IsAttempted == true);
    console.log(isAnySelecetedStudent);
    this.isStudentSelected = isAnySelecetedStudent != undefined ? true: false; 
  }
  

  getStudent(){
    this.sharedService.studentListAppearedInExam(this.selectedExamID).subscribe(res=>{
      this.selectedStudentDetails = res;
      let isAnySelecetedStudent = this.selectedStudentDetails.find(item=> item.IsAttempted == true);  
      this.isStudentSelected = isAnySelecetedStudent != undefined ? true: false; 

    }, error=>{
      console.log(error);
    })  
  }
  saveSelectStudent(){
    let prepareData = {
      EAExamAssignID: this.selectedExamID,
      lstExamAssignStudentMappingID: this.selectedStudentDetails.map(item=> item.EAExamAssignStudentMappingID)
    }
    this.sharedService.updateAppearedStudent(prepareData).subscribe(res=>{
       console.log(res);
       this.submitEvent.emit();
      //  this.toastr.success('Student updated successfully.');
    },error=>{
  
    })
  }

  closeModel(){
    this.closeEvent.emit();
  }

}


