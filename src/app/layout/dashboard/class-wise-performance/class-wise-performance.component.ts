import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-class-wise-performance',
  templateUrl: './class-wise-performance.component.html',
  styleUrls: ['./class-wise-performance.component.scss']
})
export class ClassWisePerformanceComponent implements OnInit {

  objData:any;
  class_wise_performance_male:any;
  class_wise_performance_female:any;
  academic_year:any=[];
  classPerformanceMalePercent:any;
  classPerformanceFemalePercent:any
  rowsOnPage = 25;
  page : number;
  public rowsOnPageSet = [25, 50, 100];

  constructor(private sharedService: SharedDataService) { }

  ngOnInit() {
    let data = this.sharedService.getdashboardData();
    if(data){
      this.getDashboardData(data);
    }

    this.sharedService.$dashboardData.subscribe((res) =>{
      this.getDashboardData(res);
    });
  }

  getDashboardData(dashboardData){
    this.class_wise_performance_male= dashboardData.class_wise_performance.male;
    this.class_wise_performance_female= dashboardData.class_wise_performance.female;
    this.academic_year= dashboardData.class_wise_performance.academic_year;
    this.classPerformanceMalePercent = (this.class_wise_performance_male.previous_score/this.class_wise_performance_male.current_score)*100;    
    this.classPerformanceFemalePercent = (this.class_wise_performance_female.previous_score/this.class_wise_performance_female.current_score)*100;
    this.academic_year.sort( function( a, b ) {
      return a.SectionName < b.SectionName ? -1 : a.SectionName > b.SectionName ? 1 : 0;
    });
    this.academic_year.sort( function( a, b ) {
      return a.ClassName < b.ClassName ? -1 : a.ClassName > b.ClassName ? 1 : 0;
    });
  }
}
