import { Component, OnInit, TemplateRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InstituteProfileService } from 'src/app/layout/institute-profile/institute-profile.service';
import { InstituteProfilePhotoService } from './institute-profile-photo.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-institute-profile-photo',
  templateUrl: './institute-profile-photo.component.html',
  styleUrls: ['./institute-profile-photo.component.scss']
})
export class InstituteProfilePhotoComponent implements OnInit {

  public photoFile;
  public logoFile;
  public imageSrc;
  public logoSrc;
  isLogoSrc = false;
  isImageSrc = false;
  public profile;
  public isDisplayAvailable;
  public modalRef: BsModalRef;
  public type;
  //@ViewChild('addWing') addWingDialog: ModalDirective;

  public uploader: FileUploader = new FileUploader({});;

  constructor(private InstituteProfileService: InstituteProfileService, private modalService: BsModalService,  private toast:ToastrService,
    private insprofService: InstituteProfilePhotoService,
    private toastr: ToastrService) {
   
  }

  ngOnInit() {
    this.getSchoolProfile()
  }

  getSchoolProfile(){
    this.imageSrc = null;
    this.logoSrc = null;
    this.InstituteProfileService.getSchoolProfile().subscribe(res => {
      this.profile = res;
      if (this.profile.SchoolImage) {
        this.imageSrc = this.profile.SchoolImage +"?"+ new Date().valueOf();        
        this.isImageSrc = true;
      }
      if (this.profile.SchoolLogo) {
        this.logoSrc = this.profile.SchoolLogo+"?"+ new Date().valueOf();
        this.isLogoSrc = true;
      }
      this.isDisplayAvailable = true
    });
  }

  

  changeFileOnClick(id:string){
    document.getElementById(id).click();
  }



  changeFile(file: any, type: string) {
    if (file.length > 0) {
      var reader = new FileReader();
      reader.onload = (e: any) => {
        if (type == "logo") {
          this.logoSrc = e.target.result;
        } else {
          this.imageSrc = e.target.result;
        }

      };
      reader.readAsDataURL(file[0]);
      if (type == "logo") {
        this.logoFile = file;
      } else {
        this.photoFile = file;
      }
    }
  }

  removeImage(type, template: TemplateRef<any>) {
   if (type == "logo") {
    if(!this.isLogoSrc){
      this.logoFile = [];
      this.logoSrc = null;
      }else{
        this.type = type;
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});  
      }
    } else {
      if(!this.isImageSrc){
        this.imageSrc = null;
        this.photoFile = [];
      }else{
        this.type = type;
        this.modalRef = this.modalService.show(template, {class: 'modal-md'});  
      }
    }
  
  }

  //delete school image
  deleteImage(){
    console.log(this.type);
    if (this.type == "logo") {
      this.logoFile = [];
      this.logoSrc = null;
      this.insprofService.deleteschoollogo().subscribe(()=>{
        this.toast.success('Image deleted successfully');
       }, error =>{
           if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
             this.toastr.warning(UNAUTHERIZEDMESSASGE);
          }else{
              this.toastr.error(error.error['message']);
          }
       })
    } else {
      this.photoFile = [];
      this.imageSrc = null;

      this.insprofService.deleteProfileImage().subscribe(()=>{
        this.toast.success('Image deleted successfully');
       }, error =>{
           if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
             this.toastr.warning(UNAUTHERIZEDMESSASGE);
          }else{
              this.toastr.error(error.error['message']);
          }
       })
    }
    this.modalRef.hide()

  }


  onSubmit() {
    let fileObj = [];
    let fileType = [];
    if (this.logoFile && this.logoFile[0]) {
      fileObj.push(this.logoFile[0])
      fileType.push("SchoolLogo");
    }
    if (this.photoFile && this.photoFile[0]) {
      fileObj.push(this.photoFile[0])
      fileType.push("SchoolImage");
    }
    let url = "/api/institute/step3";
    this.InstituteProfileService.uploadFile(fileObj, fileType, url)
      .subscribe(
        (res) => {
          if(res.success){
            this.toast.success(res.message);
            this.getSchoolProfile();
          }else{
            this.toast.error(res.message)
          }
        },
        (error) => {
          if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
            this.toastr.warning(UNAUTHERIZEDMESSASGE);
         }else{
             this.toastr.error(error.error['message']);
         }
        }
      );
  }

}
