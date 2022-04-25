import { Component, OnInit } from '@angular/core';
import { FIlterListData } from 'src/app/model/filterlistdata';
import { Student } from 'src/app/model/student';
import { TableHeader } from 'src/app/model/tableheader';
import { StaffService } from 'src/app/services/staff.service';
import { Router } from '@angular/router';
import { ROLES, STATUS, GENDER } from 'src/app/Utils/utils';
import { StudentListService } from './student-list.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {



  filterListData: FIlterListData[] = new Array<FIlterListData>();

  studentListData: Student[];
    title = 'Student List';
  tableHeader: TableHeader[] = [
      { columnname: 'studentName', displayname: 'STUDENT NAME', visible: true, sortOrder: '' },
      { columnname: 'admissionNo', displayname: 'ADMISSION NUMBER', visible: true, sortOrder: '' },
      { columnname: 'standard', displayname: 'STANDARD', visible: true, sortOrder: '' },
      { columnname: 'section', displayname: 'SECTION', visible: true, sortOrder: '' },        
      { columnname: 'rollno', displayname: 'ROLL NUMBER', visible: true, sortOrder: '' },
      { columnname: 'dob', displayname: 'BIRTH DATE', visible: true, sortOrder: '' },
      { columnname: 'status', displayname: 'STATUS', visible: true, sortOrder: '' },
      { columnname: 'gender', displayname: 'GENDER', visible: true, sortOrder: '' },
      { columnname: 'mobile', displayname: 'MOBILE NUMBER', visible: true, sortOrder: '' },
      { columnname: 'action', displayname: '', visible: true, sortOrder: '' }
  ];

  constructor(
      private staffService: StaffService,
      private router: Router,
      private studentService: StudentListService
  ) {
      const fl1: FIlterListData = new FIlterListData();
      fl1.name = 'Role';
      fl1.filterList = ROLES;
      this.filterListData.push(fl1);
      const fl2: FIlterListData = new FIlterListData();
      fl2.name = 'Status';
      fl2.filterList = STATUS;
      this.filterListData.push(fl2);
      // const fl3: FIlterListData = new FIlterListData();
      // fl3.name = 'Gender';
      // fl3.filterList = GENDER;
      // this.filterListData.push(fl3);
  }

  ngOnInit() {
      this.getStaffs();

  }
  getStaffs() {
    let prepareData = {
      "ClassID": "",
      "EASectionListID": [ ""]
  }
      this.studentService.getStudentList(prepareData).subscribe(res => {
          this.studentListData = res;
          console.log("student",this.studentListData );
      });
  }

  onActionEmitter(event: any) {
      this.router.navigate(['/exam/add-staff-manually/information']);
  }

  onAddClick(event) {
    this.router.navigate(['exam/add-student-manually']);
  }
  onUploadCSVClick(event) {
      this.router.navigate(['exam/upload-csv']);
  }


}
