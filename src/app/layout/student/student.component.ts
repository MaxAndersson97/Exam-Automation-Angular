import { Component, OnInit, ViewChild } from '@angular/core';
import { FIlterListData } from 'src/app/model/filterlistdata';
import { Student } from 'src/app/model/student';
import { TableHeader } from 'src/app/model/tableheader';
import { StaffService } from 'src/app/services/staff.service';
import { Router } from '@angular/router';
import { ROLES, STATUS, GENDER, UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE, STATUS1 } from 'src/app/Utils/utils';
import { StudentListService } from '../student-list/student-list.service';
import { AcademicYearService } from '../academic-year/academic-year.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalDirective } from 'ngx-bootstrap';
import { DropDownService } from 'src/app/commons/drop-down.service';
import { FormBuilder } from '@angular/forms';
import { AddStudentService } from '../add-student-manually/add-student/add-student.service';
import { EventObject } from 'src/app/model/eventobject';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { AddWingService } from '../wing-setup/add-wing/add-wing.service';
import { InstituteService } from 'src/app/institute.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  filterListData: FIlterListData[] = new Array<FIlterListData>();
  // staffs: Student[];
  @ViewChild('upload_Student_csv') step1: ModalDirective;
  studentListData: any;
  title = 'Student List';
  classes = [];
  academicYears = [];
  sectionList = [];
  tableHeader: TableHeader[] = [
    { columnname: 'Name', displayname: 'STUDENT NAME', visible: true, sortOrder: '' },
    { columnname: 'Email', displayname: 'USER NAME', visible: true, sortOrder: '' },
    // { columnname: 'Email', displayname: 'EMAIL', visible: true, sortOrder: '' },
    { columnname: 'AdmissionNumber', displayname: 'ADMISSION NUMBER', visible: true, sortOrder: '' },
    { columnname: 'ClassNameDisp', displayname: 'STANDARD', visible: true, sortOrder: '' },
    { columnname: 'SectionName', displayname: 'SECTION', visible: true, sortOrder: '' },
    { columnname: 'CurrentRollNumber', displayname: 'ROLL NUMBER', visible: true, sortOrder: '' },
    // { columnname: 'DOB', displayname: 'BIRTH DATE', visible: true, sortOrder: '' },
    { columnname: 'Status', displayname: 'STATUS', visible: true, sortOrder: '' },
    { columnname: 'Gender', displayname: 'GENDER', visible: true, sortOrder: '' },
    { columnname: 'Mobile', displayname: 'MOBILE NUMBER', visible: true, sortOrder: '' },
    // { columnname: 'action', displayname: '', visible: true, sortOrder: '' }
  ];

  csvUploadInfoForm = this.fb.group({
    ClassID: [''],
    AcademicSessionID: [''],
    EA_SectionID: [''],
    ClassName: [''],
    SectionName: [''],
    AcademicSessionName: ['']
  })
  subscription: any;

  constructor(
    private staffService: StaffService,
    private router: Router,
    private studentService: StudentListService,
    private academicYearService: AcademicYearService,
    private fb: FormBuilder,
    private addStudentService: AddStudentService,
    private toaster: ToastrService,
    private instituteService: InstituteService
  ) {
    const fl1: FIlterListData = new FIlterListData();
    fl1.name = 'SectionName';
    fl1.filterList = ROLES;
    this.filterListData.push(fl1);
    const fl2: FIlterListData = new FIlterListData();
    fl2.name = 'Status';
    fl2.filterList = STATUS1;
    this.filterListData.push(fl2);
    const fl3: FIlterListData = new FIlterListData();
    fl3.name = 'Gender';
    fl3.filterList = GENDER;
    this.filterListData.push(fl3);
    // const fl4: FIlterListData = new FIlterListData();
  }

  ngOnInit() {
    // this.studentListData = [];
    this.getStaffs();
    this.getAcademicYears();
    localStorage.removeItem('uploadData');
    localStorage.removeItem('studentData');
    localStorage.removeItem('studentId');

  }

  get f() { return this.csvUploadInfoForm.controls; }
  getStaffs() {
    let prepareData = {
      "ClassID": "00000000-00000000-00000000-00000000",
      "EASectionListID": [""]
    }
    this.studentService.getStudentList(prepareData).subscribe(res => {
      this.studentListData = res;


    }, error => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      } else {
        //this.toaster.error(error.error['message']);
      }
      this.studentListData = [];
    });
  }

  onActionEmitter(event: EventObject) {
    console.log(event);
    if (event.type === 'EditInfo') {
      localStorage.setItem('studentId', event.data.StudentID);
      localStorage.setItem('academicyr', event.data.AcademicYearID);
      localStorage.setItem('studentData', JSON.stringify(event.data));
      this.router.navigate(['/exam/add-student-manually/student']);
    } else if (event.type === "Status") {
      this.changeStaffStatus(event.data.StudentID);
    } else if (event.type === "Reset") {
      this.resetPassword(event.data.UserID);
    }
  }


  changeStaffStatus(studentId: string) {
    this.staffService.changeStaffStatus(studentId).subscribe(res => {
      this.getStaffs();
      Swal.fire({
        type: 'success',
        title: '<h4>status changed successfully.</h4>',
        showConfirmButton: false,
        timer: 2000
      })
    }, error => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toaster.error(error.error['message']);
      }
    })
  }

  //reset staff member password
  resetPassword(userId: string) {
    this.subscription = this.staffService.resetPassword(userId)
      .subscribe(res => {
        if (res['success'] == true) {
          Swal.fire({
            type: 'success',
            title: '<h4>' + res['message'] + '</h4>',
            showConfirmButton: true,
            html: '<h5>New password is: " <b>' + res['data'] + '</b> "</h5>'
          })
        }
      }, error => {
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toaster.error(error.error['message']);
        }
      })
  }

  onAddClick() {
    this.router.navigate(['exam/add-student-manually']);
  }
  onUploadCSVClick() {
    this.sectionList = []; 
    this.getInstituteDDLClass();
    this.csvUploadInfoForm.patchValue({
      ClassID: null,
      AcademicSessionID: null,
      EA_SectionID: null,
      ClassName: null,
      SectionName: null,
      AcademicSessionName: null
    });
    this.step1.show();
  }


  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicYears = [];
      academicYear.filter(academic => {
        if (academic.AcademicStatus == 1) {
          this.academicYears.push(academic);
        }
      })
    };
    const getAcademicYearFailure = (httpError: HttpErrorResponse) => {
      const { error } = httpError;
      if (error) {
        const { error_description } = error;
        this.academicYears = [];
      }
    };
    this.academicYearService.getAcademicYears()
      .subscribe(
        getAcademicYearSuccess,
        getAcademicYearFailure,
        () => console.log('Get AcademicYears Request Complete')
      );
  }
  onSubmit() {
    localStorage.setItem('uploadData', JSON.stringify(this.csvUploadInfoForm.value));
    this.sectionList.forEach(contact => {
    // if (contact.AESectionID == this.csvUploadInfoForm.value.EA_SectionID) {
    //       this.csvUploadInfoForm.patchValue({
    //       EA_SectionID: contact.EA_SectionID, SectionName: contact.SectionName
    //     });
    //   }
    });
  
    this.academicYears.forEach(academics => {
      if(academics.AcademicYearID == this.csvUploadInfoForm.value.AcademicSessionID){
        this.csvUploadInfoForm.patchValue({
          AcademicSessionID: academics.AcademicSessionID, PeriodFrom: academics.PeriodFrom
        });
      }
    })
    this.router.navigate(['exam/upload-csv']);
  }
  getInstituteDDLClass() {

    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
        console.log(classes);
      } else {
        console.log(classes);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.instituteService.getInstituteDDLClass()
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }
  getSectionByClassID(ClassID) {  
    if (!!ClassID.ClassID) {
    }
    this.addStudentService.getSectionByClassID(ClassID.ClassID).subscribe(
      section => {
        this.sectionList = section.filter(x => x.SectionStatus === 1);      
        this.csvUploadInfoForm.controls['EA_SectionID'].patchValue('');
        this.csvUploadInfoForm.controls['ClassName'].patchValue(ClassID.ClassName);
        this.csvUploadInfoForm.controls['SectionName'].patchValue('');
      },
       error => {
        this.sectionList = [];  
        this.csvUploadInfoForm.controls['EA_SectionID'].patchValue(''); 
        this.csvUploadInfoForm.controls['SectionName'].patchValue('');
      }     
    )    
  }

  onSectionChange(event){    
    this.csvUploadInfoForm.controls['SectionName'].patchValue(event.SectionName);
  }

  onChangeAcademicYear(event){
      let pipe = new DatePipe('en-US');
      let a = pipe.transform(event.PeriodFrom, 'yyyy')+'-'+pipe.transform(event.PeriodTo, 'yy');
      this.csvUploadInfoForm.controls['AcademicSessionName'].patchValue(a);
  }
  closeStep1Model() {
    this.step1.hide();
    this.csvUploadInfoForm.patchValue({
      ClassID: null,
      AcademicSessionID: null,
      EA_SectionID: null,
      ClassName: null,
      SectionName: null,
      AcademicSessionName: null
    });
  }

}
