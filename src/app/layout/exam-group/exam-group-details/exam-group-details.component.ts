import { Component, OnInit, ViewChild } from '@angular/core';
import { ExamGroupService } from '../exam-group.service';
import { AddExamGroup } from '../add-exam-group';
import { ModalDirective } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
@Component({
  selector: 'app-exam-group-details',
  templateUrl: './exam-group-details.component.html',
  styleUrls: ['./exam-group-details.component.scss']
})
export class ExamGroupDetailsComponent implements OnInit {
  examgroupDataList: AddExamGroup[];
  selectedIndex: number;
  @ViewChild('editExamGroupModal') editExamGroupModal: ModalDirective;
  constructor(private examgroupService: ExamGroupService,
              private fb: FormBuilder,
              private toaster: ToastrService,
              private router: Router,
              private route: ActivatedRoute) { }

  editExamGroupFrm = this.fb.group({
    InstituteUserID: '',
    InstituteID: '',
    BoardID: '',
    MediumID: '',
    ExamGroupID: "",
    ExamGroupName: "",
    ExamGroupCode: "",
    ExamGroupStatus: 1
  });
  ngOnInit() {
    this.getExamGroupDetails();
  }
  get f() { 
    console.log(this.editExamGroupFrm.controls);
    return this.editExamGroupFrm.controls; }
  // get exam group details
  getExamGroupDetails(){
    this.examgroupService.getExamGroupList(0).subscribe(examgroupData => {
       this.examgroupDataList = examgroupData;
       console.log(this.examgroupDataList);

    }, (error)=>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toaster.error(error.error['message']);
     }
    })
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
      ExamGroupStatus: selectedData.ExamGroupStatus
     })

  }

  changeStatus(id){
    this.examgroupService.examGroupChnageStatus(id).subscribe(
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
      ExamGroupID: formVal.ExamGroupID     
    }
    this.examgroupService.addExamGroup(this.editExamGroupFrm.value).subscribe(
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

  navigateToDasboard(){
    this.router.navigate(['../'], {relativeTo: this.route});
    localStorage.setItem('openCreateExamModal', 'true');
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
