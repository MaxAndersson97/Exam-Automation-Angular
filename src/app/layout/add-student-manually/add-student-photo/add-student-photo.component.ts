import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddStudentPhotoService } from './add-student-photo.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Student } from 'src/app/model/student';
import { StaffService } from 'src/app/services/staff.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
@Component({
  selector: 'app-add-student-photo',
  templateUrl: './add-student-photo.component.html',
  styleUrls: ['./add-student-photo.component.scss']
})
export class AddStudentPhotoComponent implements OnInit {
  public modalRef: BsModalRef;
  imgURL: any;
  studentID: string = '';
  studentData: any;
  addStudentPhoto = this.fb.group({
    StudentID: '',
    Image: [null, Validators.required]
  });
  isEditMode: boolean = false;
  AcademicYearsID: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private addStudentPhotoService: AddStudentPhotoService,
    private staffService: StaffService,
    private toastr: ToastrService,
    private modalService: BsModalService,) {
  }

  ngOnInit() {
    this.studentData = JSON.parse(localStorage.getItem('studentData'));
    this.studentID = localStorage.getItem('studentId');
    this.AcademicYearsID = localStorage.getItem("academicyr");
    console.log(this.AcademicYearsID);
    if (!!this.studentID) {
        this.isEditMode = true; 
        this.getStudentDetails();
    }else{
      this.isEditMode = false;
      this.studentID = this.studentData.StudentID;
      this.getStudentDetails();
    }
  }

  getStudentDetails() {        
    this.staffService.getStudentDetail(this.studentID, this.AcademicYearsID).subscribe(res => {
        if (res.success === true) {
            this.populateStaffDetails(res.data.studentDetail as Student);                
        }
    });
  }
  populateStaffDetails(student) {
    localStorage.setItem('studentData', JSON.stringify(student));
    this.imgURL = student['ProfileImageLink'];
  }
  // convenience getter for easy access to form fields
  get f() { return this.addStudentPhoto.controls; }  
  
  selectFile(files: FileList) {
    
    const fileToUpload = files[0];
    this.addStudentPhoto.get('Image').patchValue(files[0]);
    console.log(console.log(this.addStudentPhoto));
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
  deleteImage(){
    this.imgURL = '';
    this.addStudentPhoto.get('Image').patchValue(null);
    this.modalRef.hide();
    this.addStudentPhotoService.deleteStudentImage(this.studentData['StudentID']).subscribe(
      res =>{
      this.toastr.success('Image deleted successfully');
    }, err=>{

    })

  }
  confirmDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
}

  uplaodStudentPhoto(imagedata, type) {
    const uplaodStudentPhotoSuccess = (data: any) => {
      if(type == 'saveandupdate'){       
        this.router.navigate(['../'], {relativeTo: this.route})
      }else{
        this.toastr.success('Image Updated successfully');
        this.getStudentDetails();
      }
    };
    const uplaodStudentPhotoFailure = (httpError: HttpErrorResponse) => {
      if(httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(httpError.error['message']);
     }
    };
    this.addStudentPhotoService.uplaodStudentPhoto(imagedata)
      .subscribe(
        uplaodStudentPhotoSuccess,
        uplaodStudentPhotoFailure,
        () => console.log('uplaodStudentPhoto() Request Complete')
      );
  }



  onSubmit() {
      console.log(this.studentData['StudentID']);
      this.addStudentPhoto.patchValue({
      StudentID: this.studentData['StudentID']
    })
    console.log(this.addStudentPhoto);
    this.uplaodStudentPhoto(this.addStudentPhoto.value, 'save');
  }
  saveAndAddMore(){
    this.addStudentPhoto.patchValue({
      StudentID: this.studentData['StudentID']
    })
    localStorage.removeItem('uploadData');
    localStorage.removeItem('studentData');
    localStorage.removeItem('studentId');
    this.uplaodStudentPhoto(this.addStudentPhoto.value, 'saveandupdate');
  }
} 

