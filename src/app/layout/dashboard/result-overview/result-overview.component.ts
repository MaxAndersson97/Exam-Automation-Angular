import { Component, OnInit } from '@angular/core';
import {RESULTOVERVIEW} from 'src/app/Utils/utils';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';

import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-result-overview',
  templateUrl: './result-overview.component.html',
  styleUrls: ['./result-overview.component.scss']
})
export class ResultOverviewComponent implements OnInit {
  
  resultOverViewData : any;
  studentResultData : any;
  rowsOnPage = 25;
  page : number;
  public rowsOnPageSet = [25, 50, 100];
  previous_academic_year: any ="";

  classes: any = [];
  sectionList: any = [];
  studentFilterObj: any = {};

  isDataShow  = false;
  
  constructor(private route: ActivatedRoute, 
    private router: Router,
    private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private sharedService: SharedDataService) { }

  ngOnInit() {
    // this.studentResultData = RESULTOVERVIEW.result;
    // this.previous_academic_year = RESULTOVERVIEW.previous_academic_year;

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
    this.resultOverViewData = dashboardData.result_overview;
  }

  navigateToCPDV(){
    this.router.navigate(['../class-performance-details'], {relativeTo: this.route});
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

  onSearchClick() {
    this.studentResultData = [];
    let selectedClassName = this.classes.find(item => item.ClassID == this.studentFilterObj.ClassID).ClassName;
    this.studentResultData.push(this.resultOverViewData.find(item => item.ClassName == selectedClassName));
    if(this.studentResultData.length > 0) {
      this.isDataShow = true;
    } else {
      this.isDataShow = false;
    }
  }

  onClearClick() {
    this.studentFilterObj.academicYearsID= null;
    this.studentFilterObj.ClassID= null;
    this.studentFilterObj.EA_SectionID= null;
    this.sectionList=[];
    this.isDataShow = false;
  }
}
