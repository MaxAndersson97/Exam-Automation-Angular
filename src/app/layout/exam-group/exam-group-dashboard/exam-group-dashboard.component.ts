import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalDirective} from 'ngx-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';
import { ExamGroupService } from '../exam-group.service';
import { AddExamGroup } from '../add-exam-group';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
@Component({
  selector: 'app-exam-group-dashboard',
  templateUrl: './exam-group-dashboard.component.html',
  styleUrls: ['./exam-group-dashboard.component.scss']
})
export class ExamGroupDashboardComponent implements OnInit,AfterViewInit {
  @ViewChild('createExamGroup') createExamGroupModal: ModalDirective;
  @ViewChild('editExamGroupModal') editExamGroupModal: ModalDirective;

  examgroupDataList: any = [];
  isDetailsPageCreate: string =  '';
  isDataAvailable: boolean = false;
  selectedIndex: number;
  papertypeList = [
    {
      paperName: 'Test',
      paperID: 2
    },
    {
      paperName: 'Exam',
      paperID: 1
    }

  ]
  constructor(private fb: FormBuilder,
              private examGroupService: ExamGroupService,
              private toaster: ToastrService,
              private router: Router,
              private route: ActivatedRoute ) { }
  addExamGroupFrm = this.fb.group({
    InstituteUserID: '',
    InstituteID: '',
    BoardID: '',
    MediumID: '',
    ExamGroupID: "",
    ExamGroupName: ['', [Validators.required]],
    ExamGroupCode: "",
    ExamGroupStatus: true,
    PaperType: null
  });

  editExamGroupFrm = this.fb.group({
    InstituteUserID: '',
    InstituteID: '',
    BoardID: '',
    MediumID: '',
    ExamGroupID: "",
    ExamGroupName: ['', [Validators.required]],
    ExamGroupCode: "",
    ExamGroupStatus: 1,
    PaperType: null
  });

  
  ngOnInit() {
    this.getExamGroupDetails();
  }

  // convenience getter for easy access to form fields
  get f() { return this.editExamGroupFrm.controls; }

  // convenience getter for easy access to form fields
  get fg() { return this.addExamGroupFrm.controls; }  
  ngAfterViewInit(){
    this.isDetailsPageCreate =  localStorage.getItem('openCreateExamModal');
    if(this.isDetailsPageCreate == 'true'){
      this.openAddExamGroupDialoge();
      localStorage.removeItem('openCreateExamModal');    }
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;

}
  getExamGroupDetails(){
    let PaperType=0;
    this.examGroupService.getExamGroupList(PaperType).subscribe(examgroupData => {
       this.examgroupDataList = examgroupData;
       if(this.examgroupDataList && this.examgroupDataList.length > 0){
        this.isDataAvailable = true;
       }
       console.log(this.examgroupDataList);

    }, (error)=>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
     }else{
        // this.toaster.error(error.error['message']);
     }

    })
  }
  openAddExamGroupDialoge(){
    this.addExamGroupFrm.reset();
    this.createExamGroupModal.show();
  }
  closeModal(){
    this.createExamGroupModal.hide();
  }

  addExamGroup(){
    const formVal = this.addExamGroupFrm.value;
    var prepDataToSave = {
      ExamGroupName: formVal.ExamGroupName,
      ExamGroupCode: formVal.ExamGroupCode,      
    }
    this.examGroupService.addExamGroup(this.addExamGroupFrm.value).subscribe(
      (result) =>{
        if(result.success){
          this.toaster.success(result['message']);
          this.createExamGroupModal.hide();
          this.getExamGroupDetails();
        }else{
          this.toaster.error(result['message']);
        }        
      },(error) =>{
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      }
    )
  }
  openEditModal(i){    
    this.selectedIndex = i;
    this.editExamGroupModal.show();
    const selectedData = this.examgroupDataList[i];
    this.editExamGroupFrm.patchValue({
      InstituteUserID: selectedData.InstituteUserID,
      InstituteID: selectedData.InstituteID,
      BoardID: selectedData.BoardID,
      MediumID: selectedData.MediumID,
      ExamGroupID: selectedData.ExamGroupID,
      ExamGroupName: selectedData.ExamGroupName,
      ExamGroupCode: selectedData.ExamGroupCode,
      ExamGroupStatus: selectedData.ExamGroupStatus,
      PaperType: selectedData.PaperType
     })
  }

  changeStatus(id){
    this.examGroupService.examGroupChnageStatus(id).subscribe(
      (result) =>{
        this.getExamGroupDetails();
        this.toaster.success(result['message']);
      }, error=>{
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      }
    )    
  }

  closeEditModal(){
    this.editExamGroupModal.hide();
    this.editExamGroupModal.hide();
  }

  updateExamGroup(){
    const formVal = this.editExamGroupFrm.value;
    var prepDataToSave = {
      ExamGroupName: formVal.ExamGroupName,
      ExamGroupCode: formVal.ExamGroupCode,
      ExamGroupID: formVal.ExamGroupID,
      PaperType: formVal.ExamGroupStatus    
    }
    this.examGroupService.addExamGroup(this.editExamGroupFrm.value).subscribe(
      (result) =>{
        this.toaster.success(result['message']);
        this.getExamGroupDetails();
        this.editExamGroupModal.hide();
        
      },(error) =>{
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      }
    )
  }
}
