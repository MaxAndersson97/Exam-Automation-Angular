import { Component, OnInit } from '@angular/core';
import {TOPPERFORMINGFECULTIES} from 'src/app/Utils/utils';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-top-performing-feculties',
  templateUrl: './top-performing-feculties.component.html',
  styleUrls: ['./top-performing-feculties.component.scss']
})
export class TopPerformingFecultiesComponent implements OnInit {

  top_performing_feculties:any=[];
  collection = [];
  rowsOnPage = 25;
  page : number;
  public rowsOnPageSet = [25, 50, 100];

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
    this.top_performing_feculties= dashboardData.top_performing_faculties;
  }
  
}
