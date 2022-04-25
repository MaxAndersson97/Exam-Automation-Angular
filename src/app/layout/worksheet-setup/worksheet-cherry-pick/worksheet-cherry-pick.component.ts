import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-worksheet-cherry-pick',
  templateUrl: './worksheet-cherry-pick.component.html',
  styleUrls: ['./worksheet-cherry-pick.component.scss']
})
export class WorksheetCherryPickComponent implements OnInit {
  templateID: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params=>{
        this.templateID = params.id;
      });
  }

  onActionEmitter(event){
    this.router.navigate([ '../../generate-paper', this.templateID], { relativeTo: this.route });
    // this.router.navigate([ '../../view-paper', this.templateID,1], { relativeTo: this.route });
  }
}
