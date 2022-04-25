import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import {TEACHERPERFORMACEOVERVIEW} from 'src/app/Utils/utils';

@Component({
  selector: 'app-teacher-performance-overview',
  templateUrl: './teacher-performance-overview.component.html',
  styleUrls: ['./teacher-performance-overview.component.scss']
})

export class TeacherPerformanceOverviewComponent implements OnInit {

  selectedTeacher : number;
  isDataShow : boolean;
  objData:any=[];
  teachers:any=[];
  teacherdata:any;
  academic_performance_overview:any=[];
  academic_performance_overview_data:any=[];
  cognitive_performance_overview:any=[];
  cognitive_performance_overview_data:any=[];
  
  constructor(private sharedService: SharedDataService) {
  }

  ngOnInit() {
    let data = this.sharedService.getdashboardData();
    if(data) {
      this.getDashboardData(data);
    }

    this.sharedService.$dashboardData.subscribe((res) =>{
      this.getDashboardData(res);
    });
  }

  getDashboardData(dashboardData){
    let evilResponseProps = Object.keys(dashboardData.teacher_performance_overview);

    for (let index = 0; index < evilResponseProps.length; index++) {
      let elm = dashboardData.teacher_performance_overview[evilResponseProps[index]];
      this.objData.push(elm);
      this.teachers.push(elm.teacher_name);
    }
  }

  onTeacherChage(){
    console.log(this.selectedTeacher,"47");

    this.teacherdata = this.objData[this.selectedTeacher];
    this.academic_performance_overview= this.objData[this.selectedTeacher].academic_performance_view;
    this.academic_performance_overview_data= this.objData[this.selectedTeacher].academic_performance_view.data;
    this.cognitive_performance_overview=this.objData[this.selectedTeacher].cognitive_performance_view;
    this.cognitive_performance_overview_data=this.objData[this.selectedTeacher].cognitive_performance_view.data;
    this.isDataShow = true;
  }
}