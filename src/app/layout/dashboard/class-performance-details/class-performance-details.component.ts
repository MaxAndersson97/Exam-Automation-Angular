import { Component, OnInit } from '@angular/core';
import {CLASSPERFORMANCEDETAILS} from 'src/app/Utils/utils';

import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-class-performance-details',
  templateUrl: './class-performance-details.component.html',
  styleUrls: ['./class-performance-details.component.scss']
})
export class ClassPerformanceDetailsComponent implements OnInit {
  objData:any;
  overall_detail:any=[];
  class_level_subject_details:any=[];
  subject_data:any=[];
  student_data:any=[];
  
  classes: any = [];
  sectionList: any = [];
  studentFilterObj: any = {};

  isDataShow : boolean;

  constructor(
    private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private sharedService: SharedDataService) {
    // this.objData= CLASSPERFORMANCEDETAILS;
   }

  ngOnInit() {
    this.getInstituteDDLClass();

    let data = this.sharedService.getdashboardData();
    if(data){
      this.getDashboardData(data);
    }

    this.sharedService.$dashboardData.subscribe((res) =>{
      this.getDashboardData(res);
    });

  }

  getDashboardData(dashboardData){
    this.objData = dashboardData.class_performance_details;
  }
 

  getInstituteDDLClass() {
    this.addWingService.getInstituteDDLClass()
      .subscribe(classes => {
        if (classes) {
          this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
        }
      }, error => {
      }
      );
  }

  getSectionByClassID(ClassID) {
    this.studentFilterObj.EA_SectionID= null;
    this.sectionList=[];
    this.overall_detail = [];
    this.class_level_subject_details = [];
    this.subject_data = [];
    this.student_data=[];
    this.isDataShow = false;
    
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section;
      }, error => {
      }
    )
  }
  
  onSearchClick() {

    let selectedClassName = this.classes.find(item => item.ClassID == this.studentFilterObj.ClassID).ClassName;
    console.log(selectedClassName);
    console.log(this.studentFilterObj.EA_SectionID);
    let selectedSectionName = this.sectionList.find(item => item.AESectionID == this.studentFilterObj.EA_SectionID).SectionName;
    console.log(selectedSectionName);
   
    let objDataChild = this.objData[selectedClassName][selectedSectionName].class_performance_details;

    this.overall_detail= objDataChild.overall_details;
    this.class_level_subject_details= objDataChild.class_level_subject_detailed_view;
    this.subject_data=this.class_level_subject_details.subject_data;
    this.student_data=this.class_level_subject_details.student_data;
    console.log(this.overall_detail);
    this.isDataShow = true;
  }

  onClearClick(){
    this.studentFilterObj.academicYearsID= null;
    this.studentFilterObj.ClassID= null;
    this.studentFilterObj.EA_SectionID= null;
    this.sectionList=[];
    this.overall_detail = [];
    this.class_level_subject_details = [];
    this.subject_data = [];
    this.student_data=[];
    this.isDataShow = false;
  }
}
