import { Component, OnInit } from '@angular/core';
import { StaffListService } from './staff-list.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StaffService } from 'src/app/services/staff.service';
import { TableHeader } from 'src/app/model/tableheader';
import { Staff } from 'src/app/model/staff';
import { FIlterListData } from 'src/app/model/filterlistdata';
import { ROLES, ROLES1, STATUS } from 'src/app/Utils/utils';
import { FilterListObject } from 'src/app/model/filterlistobject';
import { EventObject } from 'src/app/model/eventobject';
import { Route, Router } from '@angular/router';

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit {

    filterListData: FIlterListData[] = new Array<FIlterListData>();
    staffs: Staff[];
    
    tableHeader: TableHeader[] = [
        { columnname: 'FirstName', displayname: 'STAFF NAME', visible: true, sortOrder: '' },
        { columnname: 'Email', displayname: 'EMAIL ID', visible: true, sortOrder: '' },
        { columnname: 'Mobile', displayname: 'MOBILE', visible: true, sortOrder: 'asc' },
        { columnname: 'Role', displayname: 'ROLE', visible: true, sortOrder: '' },        
        // { columnname: 'Assigned', displayname: 'STD/SUB', visible: true, sortOrder: '' },
        { columnname: 'DOBFormated', displayname: 'BIRTH DATE', visible: true, sortOrder: '' },
        { columnname: 'action', displayname: 'ACTION', visible: true, sortOrder: '' }
    ];

    constructor(
        private staffListService: StaffListService,
        private staffService: StaffService,
        private router: Router
    ) {
        const fl1: FIlterListData = new FIlterListData();
        fl1.name = 'Role';
        fl1.filterList = ROLES;
        this.filterListData.push(fl1);
        
        const fl2: FIlterListData = new FIlterListData();
        fl2.name = 'Status';
        fl2.filterList = STATUS;
        this.filterListData.push(fl2);
    }

    ngOnInit() {
        this.getStaffs();

    }
    getStaffs() {
        this.staffService.getStaffList().subscribe(res => {
            this.staffs = res.data;
        });
    }
    onActionEmitter(event: any) {
        console.log('add action');
        localStorage.setItem('studentId', event.data.StudentID);
        localStorage.setItem('InstituteID', event.data.InstituteID);
        this.router.navigate(['/exam/add-staff-manually/information']);
    }
}
