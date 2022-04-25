import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BuyCreditComponent } from 'src/app/commons/buy-credit/buy-credit.component';
import { ApplicationCacheService } from 'src/app/services/application-cache.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UNAUTHERIZEDMESSASGE, UNAUTHERIZEDMESSASGESERVER } from 'src/app/Utils/utils';
import { TemplateService } from '../../template-setup/template.service';

@Component({
  selector: 'app-create-paper-omr',
  templateUrl: './create-paper-omr.component.html',
  styleUrls: ['./create-paper-omr.component.scss']
})
export class CreatePaperOmrComponent implements OnInit {
  isPaperCreatable : boolean = true;
  @ViewChild('OutOfCreditDialogTemplate') OutOfCreditDialog: ModalDirective;
  @ViewChild(BuyCreditComponent) appBuyCredit: BuyCreditComponent | undefined;
  
  constructor(private tempalteService: TemplateService,
    private toastr: ToastrService,
    private sharedService : SharedDataService,
    private applicationCacheService: ApplicationCacheService) { }

  ngOnInit() {
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    
    if(getUserinfo.roles.indexOf('GuestTeacher') != -1) { 
      this.isPaperCreatable = this.sharedService.canUserCreateTestOrExam(
        this.applicationCacheService.getAvailableCreditsCacheModel().PaperCreatedCount);
    }
  }

  buyCredit(){
    this.appBuyCredit.loadCredits();
    this.OutOfCreditDialog.show();
  }

  closeModalOutOfCredit(event){
    this.OutOfCreditDialog.hide();
    if(event)
    this.appBuyCredit.proceedPayment(event.amount,event.currency);
  }

}
