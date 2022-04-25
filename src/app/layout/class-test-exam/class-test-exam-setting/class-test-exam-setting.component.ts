import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TableHeader } from 'src/app/model/tableheader';

@Component({
  selector: 'app-class-test-exam-setting',
  templateUrl: './class-test-exam-setting.component.html',
  styleUrls: ['./class-test-exam-setting.component.scss']
})
export class ClassTestExamSettingComponent implements OnInit {
  chepterIDs: any = [];
  templateID: String = '';
  isOmr:any = false;
  tableHeader: TableHeader[];
  nonOmrHeader: TableHeader[] = [
    { columnname: 'Question Nature', displayname: 'Question Nature', visible: true, sortOrder: '' },
    { columnname: 'Pick Chapters Randomly', displayname: 'Pick Chapters Randomly', visible: true, sortOrder: '' },
    { columnname: 'NO. Of QUE.', displayname: 'NO. Of QUE.', visible: true, sortOrder: '' },
    { columnname: 'Marks per que.', displayname: 'MARKS', visible: true, sortOrder: 'asc' },
    { columnname: 'Mandatory', displayname: 'MANDATORY', visible: true, sortOrder: '' },
    { columnname: 'Index', displayname: 'INDEX', visible: true, sortOrder: '' },
    { columnname: 'Chepter', displayname: 'CHAPTER', visible: true, sortOrder: ''},
    { columnname: 'Alternate', displayname: 'ALTERNATE', visible: true, sortOrder: '' },
    { columnname: 'Chepter', displayname: 'ALTERNATE CHAPTER', visible: true, sortOrder: '' },
    { columnname: 'delete', displayname: '', visible: true, sortOrder: '' },
    { columnname: 'Action', displayname: '', visible: true, sortOrder: '' },
];

  omrHeader: TableHeader[] = [
    { columnname: 'Question Nature', displayname: 'Question Nature', visible: true, sortOrder: '' },
    { columnname: 'Pick Chapters Randomly', displayname: 'Pick Chapters Randomly', visible: true, sortOrder: '' },
    { columnname: 'NO. Of QUE.', displayname: 'NO. Of QUE.', visible: true, sortOrder: '' },
    { columnname: 'Marks per que.', displayname: 'MARKS', visible: true, sortOrder: 'asc' },
    { columnname: 'Index', displayname: 'INDEX', visible: true, sortOrder: '' },
    { columnname: 'Chepter', displayname: 'CHAPTER', visible: true, sortOrder: ''},
    { columnname: 'delete', displayname: '', visible: true, sortOrder: '' },
    { columnname: 'Action', displayname: '', visible: true, sortOrder: '' },
  ];

  constructor(private sharedService: SharedDataService,
              private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(
      params=>{
        this.sharedService.getTemplateDetailsById(params.classTestExamId).subscribe((templatedetail)=>{
          if(templatedetail['IsOMRPaper'])
           this.tableHeader = this.omrHeader
          else
           this.tableHeader = this.nonOmrHeader;
        });
      });
  }
            
}