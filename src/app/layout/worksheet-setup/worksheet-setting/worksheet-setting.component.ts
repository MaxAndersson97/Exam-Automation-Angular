import { Component, OnInit } from '@angular/core';
import { TableHeader } from 'src/app/model/tableheader';
import { SharedDataService } from 'src/app/services/shared-data.service';
import {Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-worksheet-setting',
  templateUrl: './worksheet-setting.component.html',
  styleUrls: ['./worksheet-setting.component.scss']
})
export class WorksheetSettingComponent{
  chepterIDs: any = [];
  templateID: string = '';
  constructor(private sharedService: SharedDataService,
              private route: ActivatedRoute,
              private router: Router) { }
              
  tableHeader: TableHeader[] = [
    { columnname: 'Question Nature', displayname: 'Question Nature', visible: true, sortOrder: '' },
    { columnname: 'Pick Chapters Randomly', displayname: 'Pick Chapters Randomly', visible: true, sortOrder: '' },
    { columnname: 'NO. Of QUE.', displayname: 'NO. Of QUE.', visible: true, sortOrder: '' },
    { columnname: 'Marks per que.', displayname: 'MARKS PER QUE.', visible: true, sortOrder: 'asc' },
    { columnname: 'Mandatory', displayname: 'MANDATORY', visible: true, sortOrder: '' },
    { columnname: 'Index', displayname: 'INDEX', visible: true, sortOrder: '' },
    { columnname: 'Chepter', displayname: 'CHAPTER', visible: true, sortOrder: '' },
    { columnname: 'Alternate', displayname: 'ALTERNATE', visible: true, sortOrder: '' },
    { columnname: 'Chepter', displayname: 'CHAPTER', visible: true, sortOrder: '' },
    { columnname: 'delete', displayname: '', visible: true, sortOrder: '' },
    { columnname: 'Action', displayname: '', visible: true, sortOrder: '' },
];

}
