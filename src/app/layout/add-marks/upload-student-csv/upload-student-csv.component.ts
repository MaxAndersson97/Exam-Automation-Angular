import { Component, OnInit } from '@angular/core';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { AddStudent } from '../../add-student-manually/add-student/add-student';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddStudentPhotoService } from '../../add-student-manually/add-student-photo/add-student-photo.service';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-upload-student-csv',
  templateUrl: './upload-student-csv.component.html',
  styleUrls: ['./upload-student-csv.component.scss']
})
export class UploadStudentCsvComponent implements OnInit {
  examID: any = "";
  studentArr: AddStudent[] = new Array<AddStudent>();
  data: any = {};
  showUploaded: boolean = false;
  file: File;
  image_upload: boolean = false;
  filename: boolean = false;
  data1: any;
 
  constructor(private router: Router, private route: ActivatedRoute, private staffService: StaffService, private sharedService: SharedDataService, private studentService: AddStudentPhotoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(id =>{
      //this.getcsvbyexamID(id);
      this.examID = id.id;
    })    
  }

  getcsvbyexamID() {
    let baseHref = location.href.split('#')[0];
    //console.log(baseHref, 'baselocation', this.examID);
    let url = environment.apiUrlIp+ '/api/eastudentmarks/get?EAExamAssignID='+this.examID; 
    window.open(url, '_blank');
  }

  changeListener($event: any) {
    //console.log($event);
    this.data.file = $event.target.files[0];
    this.data['EAExamAssignID'] = this.examID;
    this.data1 = this.data.file.name;
    this.image_upload = true;
    this.filename = true;
  }

  postFile(inputValue: any): void {
    this.sharedService.uplaodStudentMarksCSV(inputValue).subscribe(response => {
      //console.log(response);
      if (response['success'] == true) {
        this.sharedService.setStudentArray(response['data']);
        this.router.navigate(['../../imported-student-marks', this.examID], {relativeTo: this.route});
      } 
      else{
        this.toastr.error(response['message']);
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
    // let schoolProfile = JSON.parse(localStorage.getItem('schoolProfile'));
    // const data = JSON.parse(localStorage.getItem('uploadData'));
    // this.data.ClassID = data.ClassID;
    // this.data.CurrentAcademicSessionID = data.AcademicSessionID;
    // this.data.InstituteCode = schoolProfile.PartnerCode;
    // this.data.EA_SectionID = data.EA_SectionID;
    this.postFile(this.data);
  }

}
