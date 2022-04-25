import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-key-areas-to-focus',
  templateUrl: './key-areas-to-focus.component.html',
  styleUrls: ['./key-areas-to-focus.component.scss']
})
export class KeyAreasToFocusComponent implements OnInit {
  objData:any; 
  low_course_completion:any=[];
  exam_results_pending:any=[];
  no_assessment_for_long:any=[];

  constructor(private sharedService: SharedDataService) {  }

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
    this.low_course_completion= dashboardData.key_areas_to_focus.low_course_completion;
    this.exam_results_pending= dashboardData.key_areas_to_focus.exam_results_pending;
    this.no_assessment_for_long= dashboardData.key_areas_to_focus.no_assessment_for_long;
  }

}
