import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-summary',
  templateUrl: './template-summary.component.html',
  styleUrls: ['./template-summary.component.scss']
})
export class TemplateSummaryComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }
  navigateToNext(){
    this.router.navigate([ '../'], { relativeTo: this.route});
  }

}
