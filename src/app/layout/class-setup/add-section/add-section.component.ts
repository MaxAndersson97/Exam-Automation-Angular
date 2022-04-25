import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InstituteService } from 'src/app/institute.service';
import { StaffService } from 'src/app/services/staff.service';
import { AddSectionService } from './add-section.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';


@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['../class-setup.component.scss']
})
export class AddSectionComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();
  public classList;
  private classId: string;
  private numberOfSection: string;
  public addSectionform  = this.fb.group({
    ClassID: [],
    NumberOfSection: []
  })

  constructor(
    private fb: FormBuilder,
    private instituteService: InstituteService,
    private staffService : StaffService,
    private addSectionService : AddSectionService,
    private toastService: ToastrService
  ) {}

  addSection(){
    this.addSectionService.addMultipleSection((this.addSectionform.value.ClassID).ClassID, this.addSectionform.value.NumberOfSection).subscribe(res => {
      this.toastService.success("Section added successfully");
      this.close({isRefresh: true});
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastService.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastService.error(error.error['message']);
     }
    });
  }

  close(data){
    this.closeEvent.emit(data);
  }

  validateSectionNo(newValue){
    console.log(newValue);

  }

  ngOnInit() {
    this.instituteService.getInstituteDDLClass().subscribe(classList => {
      this.classList = classList.filter(element => element['IsClassShowInPortal'] === true);
    })
  }

}
