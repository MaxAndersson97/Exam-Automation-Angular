import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddStudentPhotoService } from '../../add-student-manually/add-student-photo/add-student-photo.service';
import { StaffService } from 'src/app/services/staff.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { InstituteService } from 'src/app/institute.service';

@Component({
  selector: 'app-add-staff-photo',
  templateUrl: './add-staff-photo.component.html',
  styleUrls: ['./add-staff-photo.component.scss']
})
export class AddStaffPhotoComponent implements OnInit {

  public modalRef: BsModalRef;
  imgURL: any;
  studentID: string = '';
  studentData: any;
  addStudentPhoto = this.fb.group({
    StudentID: '',
    Image: [null, Validators.required]
  });
  isEditMode: boolean = false;
  InstituteID: any="";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private addStudentPhotoService: AddStudentPhotoService,
    private staffService: StaffService,
    private toastr: ToastrService,
    private modalService: BsModalService, private instituteService: InstituteService) {
  }

  ngOnInit() {
    this.InstituteID = this.instituteService.getInstitute().InstituteID;
    this.route.params.subscribe(id=>{
      if (!!id.id) {
        this.studentID = id.id;
        this.getStudentDetails();
      }
    })

  }
  goBack(){
    this.router.navigate(['/exam/satff'])
    console.log(this.router);
  }

  getStudentDetails() {        
    this.staffService.getStaffDetail(this.studentID, this.InstituteID).subscribe(res => {
        if (res.success === true) {
            this.populateStaffDetails(res.data);                
        }
    });
  }
  populateStaffDetails(student) {   
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
    this.addStudentPhotoService.deleteStudentImage(this.studentID).subscribe(
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
        this.router.navigate(['../../'], {relativeTo: this.route});
        localStorage.removeItem('studentId');            
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
      this.addStudentPhoto.patchValue({
      StudentID: this.studentID
    })
    console.log(this.addStudentPhoto);
    this.uplaodStudentPhoto(this.addStudentPhoto.value, 'save');
  }
  saveAndAddMore(){
    this.addStudentPhoto.patchValue({
      StudentID: this.studentID
    })
    localStorage.removeItem('uploadData');
    this.uplaodStudentPhoto(this.addStudentPhoto.value, 'saveandupdate');
  }

}
