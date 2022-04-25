import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { TemplateService } from '../../template-setup/template.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { CustomContentService } from '../custom-content.service';
import { BsModalRef, ModalDirective, BsModalService } from 'ngx-bootstrap';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-video-advance-setting',
  templateUrl: './video-advance-setting.component.html',
  styleUrls: ['./video-advance-setting.component.scss']
})
export class VideoAdvanceSettingComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  message: string = "CREATE"

  @ViewChild('AddVideos') addVideoModal: ModalDirective;
  @ViewChild('updateVideo') step2form: ModalDirective;
  @ViewChild('deleteVideos') deleteConfirmation: ModalDirective;
  
  VideoMasterID = '';
  addVideoFrm = this.fb.group({
    VideoIndex: [''],
    VideoTitle: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]+$')]],
    VideoURLPath: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2})[/\\w .-?]*/?')]],
    Description: [''],
    Keywords: [''],
    VideoMasterID: ['']
  });
  public modalRef: BsModalRef;
  classesList: any;
  subjects: any;
  videoTag: any;
  searchtextbookForm = this.fb.group({
    ClassID: null,
    SubjectID: null,
    ChapterID: null
  });
  chepterList: [];
  videoDetails: any;
  filterRequestData: {};
  isSaveEnabled: boolean = false;
  isDataShow: boolean = false;
  constructor(
    private customService: CustomContentService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private route: Router,
    private router: ActivatedRoute,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getInstituteDDLClass();
    // const data = {"InstituteID":"76c22da8-aaa5-4fa6-abbd-ef9211c17b1b","InstituteUserID":"6d7e281c-890d-44ab-abda-ccccc03d9180","SubjectID":"59247381-e7fe-42b9-838e-5aaa5ee59a88","ClassID":"01e5acfd-0e91-422b-9b3a-345f48d26e91","ChapterID":"02b35b69-ae50-4e6d-8a78-2d41f3d5b1b5","TopicID":"00000000-0000-0000-0000-000000000000"}
    // this.getBookPDFSettingDetails(data);
  }

  openAddVideoModal(){
    this.addVideoModal.show();
  }

  closeAddTemplateDialog(){
    this.addVideoModal.hide();
    this.onSubmit();
  }
  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classesList = classes.filter(element => element['IsShowInApp'] === true);
        console.log(classes);
      } else {
        console.log(classes);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    //this.addWingService.getInstituteDDLClass()
    this.customService.getClassWithoutInstitute()
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }
  getSubject(classId){
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjects = subjects;
        // this.subjects = _.filter(this.subjects,function(obj){
        //     return (obj.IsSelected) });
        console.log(subjects);
        //this.getTextBookSettingDetails('4cd58d10-fe73-43df-88f0-7305e1d1bc4d');
      } else {
        console.log(subjects);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    //this.templateService.getInstituteDDLSubject(classId)
    this.customService.getSubjectWithoutInstitute(classId)
      .subscribe(getInstituteDDLClassSuccess,
                getInstituteDDLClassFailure,
        () => console.log());  
    };

  get f() { return this.searchtextbookForm.controls; }
  get fd(){
    return this.addVideoFrm.controls;

  }
  getClassId() {
    var clsId = this.f.ClassID.value;
    console.log(clsId);
    if(!!clsId){
      this.searchtextbookForm.patchValue({
        SubjectID: null,
        ChapterID: null
      });
      this.isSaveEnabled = false;
      this.chepterList = [];
      this.subjects = [];
      this.getSubject(clsId.MasterID);
    }
  }

  getSubjectId() {
    console.log(this.f);
    var SubjectID = (this.f.SubjectID.value);
    if(!!SubjectID){
      this.searchtextbookForm.patchValue({       
        ChapterID: null
      });
      this.isSaveEnabled = false;
      this.getCheptersBySubjectID(SubjectID, this.f.ClassID.value);
    }
  }

  getCheptersBySubjectID(SubjectID, ClassID){
    this.customService.getCheptersByBCMS(SubjectID.SubjectID, ClassID.MasterID).    
    subscribe(result =>{
      this.chepterList = result;          
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toaster.error(error.error['message']);
     }
    });
  }
    onSubmit(){
      const prepareData = {
        SubjectID: (this.f['SubjectID'].value).SubjectID,
        ClassID: (this.f['ClassID'].value).MasterID,
        ChapterID: (this.f['ChapterID'].value).ChapterID
      }
      this.filterRequestData = prepareData;
      this.getBookPDFSettingDetails(prepareData);      
    }
    getBookPDFSettingDetails(body){
      this.customService.getVideoList(body).
      subscribe(result =>{
        if(result.objVideoListSeriesAndInstitute){
          this.isDataShow = true;
          this.videoDetails = result.objVideoListSeriesAndInstitute;
          this.isSaveEnabled = true;
        }else{
          this.videoDetails = [];
          this.isSaveEnabled = false;
          this.isDataShow = false;
        }                
      }, error =>{
        this.toaster.error(error.error['message']);
        this.isSaveEnabled = false;
      });
    }
    changeStatus(index, type){
      console.log(index, type);
      if(type == 'institute'){
        const videoList = this.videoDetails['lstVideosListByInstitute'];
        if(videoList[index].ShowInAppStatus == 2){
          videoList[index].ShowInAppStatus = 1;
        } else {
          videoList[index].ShowInAppStatus = 2;
        } 
      }else{
        const videoList = this.videoDetails['lstVideosListByInstituteSeries'];
        if(videoList[index].ShowInAppStatus == 2){
          videoList[index].ShowInAppStatus = 1;
        } else {
          videoList[index].ShowInAppStatus = 2;
        }
      }
    }
    saveTextBookSolutionSetting(){
      //push series video
      const videoList = this.videoDetails['lstVideosListByInstituteSeries'];
      const selectedvideos = [];
      for (let i=0; i< videoList.length; i++) {
        let chepterList: any;   
        chepterList =  videoList[i];
        console.log(chepterList);
          selectedvideos.push({
            VideoGroupID: chepterList.VideoGroupID,
            ShowInAppStatus: chepterList.ShowInAppStatus
          });
      };
      //push institute video
      const instituteVideoList = this.videoDetails['lstVideosListByInstitute'];
      const selectedChepaters = [];
      for (let i=0; i< instituteVideoList.length; i++) {
        let chepterList: any;
        chepterList =  instituteVideoList[i];
       // if(chepterList['ShowInAppStatus'] == 1){
          selectedChepaters.push({
            VideoGroupID: chepterList['VideoGroupID'],
            ShowInAppStatus: chepterList['ShowInAppStatus']
          });
      //};
    }
      let selectedTextBook = [];
      selectedTextBook = [...selectedvideos, ...selectedChepaters];
      const prepareDataToSave = {
        SubjectID: (this.f['SubjectID'].value).SubjectID,
        ClassID: (this.f['ClassID'].value).MasterID,
        ChapterID: (this.f['ChapterID'].value).ChapterID,
        ListCCS_VideoGroupInfoMember: selectedTextBook
      }
      this.customService.saveVideoStatus(prepareDataToSave).subscribe(
        (result) => {
          // this.route.navigate(['../dashboard'], { relativeTo: this.router });  
          this.toaster.success(result['message']); 
        }, (error) => {
          if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
            this.toaster.warning(UNAUTHERIZEDMESSASGE);
         }else{
             this.toaster.error(error.error['message']);
         }
        });  
    }

    editVideo(videoMasterID){
      this.customService.getVideoToEdit(videoMasterID).subscribe(result =>{
            console.log(result);
            this.step2form.show();
            this.addVideoFrm.patchValue({
              VideoIndex: result.VideoIndex,
              VideoTitle: result.VideoTitle,
              VideoURLPath: result.VideoURLPath,
              Description: result.Description,
              Keywords: '',
              VideoMasterID: result.VideoMasterID
            });
            this.videoTag = result.Keywords? result.Keywords.split(","): [];
                
          }, error =>{
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
              this.toaster.warning(UNAUTHERIZEDMESSASGE);
           }else{
               this.toaster.error(error.error['message']);
           }
          })
        
        }
        onSubmitEditVideo(){
          let videoData = this.addVideoFrm.value;
          videoData.ClassID = (this.f.ClassID.value).MasterID;
          videoData.SubjectID = (this.f.SubjectID.value).SubjectID;
          videoData.ChapterID = (this.f.ChapterID.value).ChapterID;
          videoData.TopicID = "00000000-0000-0000-0000-000000000000";
          videoData.VideoMasterID = this.fd.VideoMasterID.value;
          videoData.Keywords = !!this.videoTag ? this.videoTag.toString(): null;
          console.log(videoData);
          this.customService.addNewVideo(videoData).subscribe(reult =>{
            this.toaster.success(reult['message']);
            this.getBookPDFSettingDetails(this.filterRequestData);
            this.step2form.hide();
            
          }, error =>{
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
              this.toaster.warning(UNAUTHERIZEDMESSASGE);
           }else{
               this.toaster.error(error.error['message']);
           }
          })
        } 
        
        close(){
          this.step2form.hide();
        }

        deleteVideo(videoMasterID){
          this.VideoMasterID = videoMasterID;
          this.deleteConfirmation.show();
        }
        cancelDelete(){
          this.VideoMasterID ='';
          this.deleteConfirmation.hide();
        }
        deleteProceed(){
          this.customService.deleteVideo(this.VideoMasterID).subscribe(result=>{
            console.log(result)
            this.toaster.success(result['message']);
            this.cancelDelete();
            this.onSubmit();
          }, error =>{
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
              this.toaster.warning(UNAUTHERIZEDMESSASGE);
           }else{
               this.toaster.error(error.error['message']);
           }
          })
         // this.VideoMasterID = '';


        }

            // retrict user to enter alphabates
    numberOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
  
    }
    addTag(tag){
      console.log(this.fd.Keywords, tag.value);
      this.videoTag.push(tag.value);
      
      this.addVideoFrm.patchValue({
        Keywords: ''
      })
    }
  
    removeTage(i){
      this.videoTag.splice(i, 1);
    }

    }
