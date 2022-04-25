import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { Wing } from './wing';
import { WingSetupService } from './wing-setup.service';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-wing-setup',
  templateUrl: './wing-setup.component.html',
  styleUrls: ['./wing-setup.component.scss']
})
export class WingSetupComponent implements OnInit {

  public modalRef: BsModalRef;
  @ViewChild('addWing') addWingDialog: ModalDirective;
  public isAddWingModalOpen: boolean = false;
  private wings: Array<Wing> = [];
  private isWingDataAvailable: boolean;
  public isNoWingDataAvailable: boolean = true;
  private editWingSubject: BehaviorSubject<Wing> = new BehaviorSubject(null);

  constructor(
    private wingSetupService: WingSetupService,
    private modalService: BsModalService,
    private toastService: ToastrService) {
  }

  ngOnInit() {
    this.getWings();
  }

  getWings() {
    const getWingSuccess = (wings: Array<Wing>) => {
      this.wings = wings;
      this.isWingDataAvailable = (this.wings.length > 0) ;
      this.isNoWingDataAvailable = false;
    };
    const getWingFailure = (httpError: HttpErrorResponse) => {
      console.log(httpError.error['message']);
      this.isNoWingDataAvailable = true;
      if(httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastService.warning(UNAUTHERIZEDMESSASGE);
     }else{
        //  this.toastService.error(httpError.error['message']);
        
     }
    };
    this.wingSetupService.getWings()
      .subscribe(
        getWingSuccess,
        getWingFailure,
        () => console.log('Get Wings Request Complete')
      );
  }

  showAddWingModal() {
    this.editWingSubject.next(null);
    this.isAddWingModalOpen = true;
  }

  closeAddWingDialog(data: any){
    this.addWingDialog.hide();
    if(data.isRefresh){
      this.getWings();
    }
  }

  editWing(wing: Wing){
    this.editWingSubject.next(wing);
    this.isAddWingModalOpen = true;
  }

  confirmDeleteWing(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }
  
  deleteWing(wing: Wing) {
    this.wingSetupService.deleteWing(wing).subscribe(res => {
      this.toastService.success("Wing deleted successfully");
      this.ngOnInit()
    }, httpError=>{
      if(httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastService.warning(UNAUTHERIZEDMESSASGE);
      }else{
         this.toastService.error(httpError.error['message']);
     
      }
    });
    this.modalRef.hide();
  }

  onHiddenAddWingModal(){
    this.isAddWingModalOpen = false;
  }

  titlecaseClassName(className){
    return _.chain(className.split(" ")).map(function(str){
      var tempStr = str.toLowerCase();
      return tempStr.charAt(0).toUpperCase() + tempStr.slice(1);
    }).value().join(" ");
  }

}
