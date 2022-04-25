import { Component, OnInit } from '@angular/core';
import {TOPPERFORMINGSTUDENT} from 'src/app/Utils/utils';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-top-performing-students',
  templateUrl: './top-performing-students.component.html',
  styleUrls: ['./top-performing-students.component.scss']
})
export class TopPerformingStudentsComponent implements OnInit {
  top_performing_students:any=[];
  rowsOnPage = 25;
  page : number;
  public rowsOnPageSet = [25, 50, 100];

  constructor(private route: ActivatedRoute, private router: Router, private sharedService: SharedDataService) { }

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
    this.top_performing_students= dashboardData.top_performing_students;
  }

  navigateToCWP(){
    this.router.navigate(['../class-performance-details'], {relativeTo: this.route});
  }
}
