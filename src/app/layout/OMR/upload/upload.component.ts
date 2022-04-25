import { Component, OnInit } from '@angular/core';
import { AddStudent } from '../../add-student-manually/add-student/add-student';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddStudentPhotoService } from '../../add-student-manually/add-student-photo/add-student-photo.service';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  ExamID: any=""; 
  studentArr: AddStudent[] = new Array<AddStudent>();
  data: any ={};
  showUploaded: boolean = false;
  file: File;
  image_upload: boolean = false;
  filename: boolean = false;
  data1: any;
  imgURL: any = "";
  TestID: any;
  show = false;
  progress: number = 0;
 
  constructor(private router: Router, private route: ActivatedRoute, private staffService: StaffService, private sharedService: SharedDataService, private studentService: AddStudentPhotoService, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.params.subscribe(id =>{
      this.ExamID = id.id;
    });
    this.TestID=localStorage.getItem("TestID");
    console.log(this.TestID);
  }

  changeListener($event: any) {
    this.data['file'] ={};
    this.data['file'] = $event.target && $event.target.files[0];
    this.data1 = this.data.file.name;
    this.image_upload = true;
    this.filename = true;
  }

  postFile(inputValue: any): void {
    this.show = true;
    this.progress = 0;
    // setTimeout(() => {
    //   this.progress = 10;
    // }, 500);
    // setTimeout(() => {
    //   this.progress = 30;
    // }, 500);
     //this.move(40);
     
    this.studentService.uplaodOMRZip(inputValue).subscribe(response => {
      //if (response['success']) {
        if(response['body'] != undefined)
        {
          if (response['body']['success'] === true) {
          this.sharedService.setOmrResult('success');
          this.show = false;
          this.toastr.success('OMR uploaded successfully.');
          this.router.navigate(['/exam/OMR/details', this.ExamID, 1]);
          }
        } 
      else {
        const progress = Math.round(100 * response["loaded"] / response["total"]);
        this.progress = progress;
      }
    }, error => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
        this.show = false;
      } else {
        this.toastr.error(error.error['message']);
        this.show = false;
      }
    });
  }

 
//  move() {
//   setTimeout(() => {
//     this.progress = 40;
//   }, 600);
//   setTimeout(() => {
//     this.progress = 60;
//   }, 600);
//   setTimeout(() => {
//     this.progress = 70;
//   }, 600);
//   setTimeout(() => {
//     this.progress = 80;
//   }, 600);
//   setTimeout(() => {
//     this.progress = 91;
//   }, 600);
//   setTimeout(() => {
//     this.progress = 95;
//   }, 600);
//   setTimeout(() => {
//     this.progress = 98;
//   }, 600);
// }

move(progress) {
  setTimeout(() => {
    this.progress = progress;
    if(progress < 80) {
      this.move(progress+10);
    }
  }, 600);
}
 

  onUploadAndProceed() {
    this.data.EAExamAssignID = this.ExamID;
    this.postFile(this.data);
  }

  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    //this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result;
    }
  }

}
