import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddStudentPhotoService } from '../../add-student-manually/add-student-photo/add-student-photo.service';
import { StaffService } from 'src/app/services/staff.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { CustomContentService } from '../custom-content.service';

@Component({
  selector: 'app-manage-sample-paper-files',
  templateUrl: './manage-sample-paper-files.component.html',
  styleUrls: ['./manage-sample-paper-files.component.scss']
})
export class ManageSamplePaperFilesComponent implements OnInit {

  public modalRef: BsModalRef;
  questionPdf_upload: boolean = false;
  questionPdffilename:string = '';
  deletetype = 0;
  answerPdf_upload: boolean = false;
  answerPdffilename:string = '';

  newfilecount: number = 0;
  
  paperType=0;

  public paperdata: any={};

  formPaperFiles = this.fb.group({
    PaperSetID: '',
    question_title: '',
    question_description:'',
    QuestionPdf: [null, Validators.required],
    answer_title:'',
    answer_description:'',
    AnswerPdf: [null, Validators.required],
    InstituteID:''
  });

  constructor(private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private staffService: StaffService,
    private toaster: ToastrService,
    private modalService: BsModalService,
    private customService: CustomContentService) { }

  ngOnInit() {
    let searchdata = JSON.parse(localStorage.getItem('ADDPAPERDATA'));
    this.paperType = searchdata.paperType;
    let schoolprofile= JSON.parse(localStorage.getItem('schoolProfile'));
    this.getPaperDetail(searchdata.PaperMasterID);
    this.formPaperFiles.patchValue({
      PaperSetID: searchdata.PaperMasterID,
      InstituteID:schoolprofile.InstituteID,
    });
  }
  
  get f() { return this.formPaperFiles.controls; }

  getPaperDetail(paperId){
    this.customService.getPaperById(paperId).subscribe(result => {
      if(result['success'] == false)
      {
        this.toaster.error(result['message']);
      } else {
          let responsedata = result['data'];
          this.paperdata = responsedata;
          if(responsedata.Answerpdf != "") {
            this.answerPdf_upload = true;
          }
          if(responsedata.Questionpdf != "") {
            this.questionPdf_upload = true;
          }
      }
    }, error => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      }else{
         this.toaster.error(error.error['message']);
      }
    });
  }

  changeListener($event: any,type:number) {
    this.newfilecount = this.newfilecount + 1;
    if(type == 1) {
      let questiondata = $event.target.files;
      this.formPaperFiles.get('QuestionPdf').patchValue(questiondata[0]);
      this.questionPdf_upload = true;  
      this.questionPdffilename = questiondata[0].name;
    } else if (type == 2) {
      let answerdata = $event.target.files;
      this.answerPdf_upload = true;  
      this.formPaperFiles.get('AnswerPdf').patchValue(answerdata[0]);
      this.answerPdffilename = answerdata[0].name;
    }
  }

  confirmDelete(template: TemplateRef<any>,type:number) {
    this.deletetype = type;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }

  deleteImage() {

    let params = {
      "PaperImageID": this.deletetype == 1 ? this.paperdata.Questionpdf_PaperImageID : this.paperdata.Answerpdf_PaperImageID,
      "ImagePath":this.deletetype == 1 ? this.paperdata.Questionpdf : this.paperdata.Answerpdf
    }
    this.customService.deletePaperFile(params).subscribe(result=> {
      if(result['success'] == false)
      {
        this.toaster.error(result['message']);
      } else 
      {
        this.toaster.success(result['message']);

        if(this.deletetype == 1) {
          this.formPaperFiles.get('QuestionPdf').patchValue(null);
          this.questionPdf_upload = false;
          this.questionPdffilename = '';
        } else if(this.deletetype == 2) {
          this.formPaperFiles.get('AnswerPdf').patchValue(null);
          this.answerPdf_upload = false;
          this.answerPdffilename = '';
        }
        this.modalRef.hide();
      }
    });
  }

  onBackClick(){
    if(this.paperType == 1)
    {
      this.route.navigate(['../sample-paper-setting'], { relativeTo: this.router });
    } else if(this.paperType == 2)
    {
      this.route.navigate(['../worksheet-setting'], { relativeTo: this.router });
    }
  }

  onSubmit() {
    this.customService.uplaodPaperFiles(this.formPaperFiles.value).subscribe(result=> {
      if(result['success'] == false)
      {
        this.toaster.error(result['message']);
      } else {
        this.toaster.success(result['message']);
        // this.answerPdf_upload = true;
        // this.questionPdf_upload = true;
        // this.answerPdffilename = '';
        // this.questionPdffilename = '';
        this.onBackClick();
      }
    });
  }
}
