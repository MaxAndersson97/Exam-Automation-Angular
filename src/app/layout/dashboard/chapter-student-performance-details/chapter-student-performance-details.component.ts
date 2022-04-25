import { Component, OnInit } from '@angular/core';
import {CHAPTERSTUDENTWISE} from 'src/app/Utils/utils';

import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';
import * as _ from 'underscore';
import { HttpErrorResponse } from '@angular/common/http';
import { TemplateService } from '../../template-setup/template.service';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-chapter-student-performance-details',
  templateUrl: './chapter-student-performance-details.component.html',
  styleUrls: ['./chapter-student-performance-details.component.scss']
})
export class ChapterStudentPerformanceDetailsComponent implements OnInit {

  objData:any;
  wise_data:any=[];
  chapter_names:any=[];

  classes: any = [];
  sectionList: any = [];
  studentFilterObj: any = {};
  subjects: any = [];
  isDataShow : boolean;

  constructor(private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private templateService: TemplateService,
    private sharedService: SharedDataService) { 
    // this.objData= CHAPTERSTUDENTWISE.chapter_student_wise;
  }

  ngOnInit() {
    // this.wise_data= this.objData.data;
    // this.subject_Names= this.objData.subject_names;

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
    this.objData = dashboardData.chapter_wise_and_student_wise_performance_details;
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
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section;
      }, error => {
      }
    )
  }
  getSubject(classId) {
    this.subjects =[];
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjects = _.filter(subjects, function (obj) {
          return (obj.IsSelected)
        });
      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.templateService.getInstituteDDLSubject(classId)
      .subscribe(getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  };

  onSearchClick() {
    let selectedClassName = this.classes.find(item => item.ClassID == this.studentFilterObj.ClassID).ClassName;
    console.log(selectedClassName);
    console.log(this.studentFilterObj.EA_SectionID);
    let selectedSectionName = this.sectionList.find(item => item.AESectionID == this.studentFilterObj.EA_SectionID).SectionName;
    console.log(selectedSectionName);
    let selectedSubjectName = this.subjects.find(item => item.SubjectID == this.studentFilterObj.SubjectID).SubjectName;
    console.log(selectedSubjectName);

    console.log(this.objData[selectedClassName][selectedSectionName][selectedSubjectName],selectedSubjectName);

    let objDataChild = this.objData[selectedClassName][selectedSectionName][selectedSubjectName].chapter_wise_and_student_wise_performance_details;

    this.wise_data= objDataChild.data;
    this.chapter_names= objDataChild.chapter_names;
    this.isDataShow = true;
  }

  onClearClick(){
    this.studentFilterObj.academicYearsID= null;
    this.studentFilterObj.ClassID= null;
    this.studentFilterObj.SubjectID= null;
    this.studentFilterObj.EA_SectionID= null;
    this.sectionList=[];
    this.subjects=[];
    this.wise_data = [];
    this.chapter_names = [];
    this.isDataShow = false;
  }
}
