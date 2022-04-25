import { Component, OnInit } from '@angular/core';
import { AddStudent } from '../add-student-manually/add-student/add-student';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddStudentPhotoService } from '../add-student-manually/add-student-photo/add-student-photo.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.scss']
})
export class UploadCSVComponent implements OnInit {
  studentArr: AddStudent[] = new Array<AddStudent>();
  data: any;
  showUploaded: boolean = false;
  file: File;
  image_upload: boolean = false;
  filename: boolean = false;
  data1: any;
 
  constructor(private router: Router, private route: ActivatedRoute, private staffService: StaffService, private sharedService: SharedDataService, private studentService: AddStudentPhotoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.data = {};
    const data = JSON.parse(localStorage.getItem('uploadData'));
    this.data.ClassName = data.ClassName;
    this.data.SectionName = data.SectionName
    console.log("data",data);
    
  }

  changeListener($event: any) {
    this.data.file = $event.target.files[0];
    this.data1 = this.data.file.name;
    this.image_upload = true;
    this.filename = true;
  }

  postFile(inputValue: any): void {
    //this.file = file;
    this.studentService.uplaodStudentCSV(inputValue).subscribe(response => {
      console.log(response);
      if (response.data && response.data[0]) {
        this.studentArr = response.data;
        this.router.navigate(['/exam/imported-student-data']);
        this.sharedService.setStudentArray(this.studentArr);

        // this.image_upload = false;   
      }
    }, error => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toastr.error(error.error['message']);
      }
    });
  }
  onUploadAndProceed() {
    let schoolProfile = JSON.parse(localStorage.getItem('schoolProfile'));
    const data = JSON.parse(localStorage.getItem('uploadData'));
    this.data.ClassID = data.ClassID;
    this.data.CurrentAcademicSessionID = data.AcademicSessionID;
    this.data.InstituteCode = schoolProfile.PartnerCode;
    this.data.EA_SectionID = data.EA_SectionID;
    this.postFile(this.data);
  }
}
