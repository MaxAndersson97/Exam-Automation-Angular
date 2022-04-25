import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaytmIntegrationService } from 'src/app/services/paytm-integration.service';

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.scss']
})
export class PaymentFailedComponent implements OnInit {

  constructor(private router: ActivatedRoute,private  paytmIntegrationService: PaytmIntegrationService) { }

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
            window.location.href= window.location.href.substring(0,window.location.href.indexOf('?'));
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
