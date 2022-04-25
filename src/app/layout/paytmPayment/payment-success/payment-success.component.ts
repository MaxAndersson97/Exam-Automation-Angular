import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationCacheService } from 'src/app/services/application-cache.service';
import { FacebookPixelsService } from 'src/app/services/facebook-pixels.service';
import { PaytmIntegrationService } from 'src/app/services/paytm-integration.service';
import { SharedObservablesService } from 'src/app/services/shared-observables.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  public renewalDate : string;
  constructor(private dateTime : DatePipe,
    private router: ActivatedRoute,
    private sharedObservablesService : SharedObservablesService,
     private  paytmIntegrationService: PaytmIntegrationService, 
     private applicationCacheService : ApplicationCacheService,
     private fbPixelService: FacebookPixelsService ) { }

  ngOnInit() {
    var currentSnapshot =this.router.snapshot;
    if(currentSnapshot){ 
      if(currentSnapshot.queryParams){
        var orderid =currentSnapshot.queryParams["orderId"];
        if(orderid != undefined){
        this.paytmIntegrationService.refreshDataAfterPaymentDone(orderid).subscribe(
          (success)=>{
            let getUserinfo = JSON.parse(localStorage.getItem('user'));
            let userData = JSON.parse(getUserinfo.data)
            //refreshing payment status
            userData.PaperValidityDate = success.PaperValidityDate;
            userData.FreePaperGenerationCount=success.FreePaperGenerationCount;
            getUserinfo.data = JSON.stringify(userData);
            localStorage.setItem('user',JSON.stringify(getUserinfo));
            
            var date =new Date(userData.PaperValidityDate);
            date.setDate(date.getDate() + 1);
            this.renewalDate = date.toDateString();
            this.renewalDate = this.dateTime.transform(this.renewalDate,'dd-MMM-yyyy');
            window.location.href= window.location.href.substring(0,window.location.href.indexOf('?'));
            
            this.fbPixelService.loadFBPixel('Purchase', {value:0.00, currency:'INR'});
            
            var obj = this.applicationCacheService.getAvailableCreditsCacheModel();
            obj.ValidityDate = userData.PaperValidityDate;
            obj.FreePaperGenerationCount = success.FreePaperGenerationCount;
            this.applicationCacheService.setAvailableCreditsCacheModel(obj);
            this.sharedObservablesService.refreshAvailableCredits({
                isApiRefresh : false,
                isCacheRefresh : true
            }); 
           },
          (error) => {
            //this.paytmIntegrationService.showPaymentResponse(false, "Payment failed.<br/> Please logout and do login!!");
          }
        );
        }
      }
    }
  }
}
