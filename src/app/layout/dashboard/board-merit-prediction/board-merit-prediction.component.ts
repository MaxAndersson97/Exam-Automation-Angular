import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-board-merit-prediction',
  templateUrl: './board-merit-prediction.component.html',
  styleUrls: ['./board-merit-prediction.component.scss']
})
export class BoardMeritPredictionComponent implements OnInit {

  objData:any;
  board_merit_prediction:any=[];
  collection = [];
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
    this.board_merit_prediction= dashboardData.board_merit_prediction;
  }

  navigateToCWP(){
    this.router.navigate(['../class-performance-details'], {relativeTo: this.route});
  }

}
