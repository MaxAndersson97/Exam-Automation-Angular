import { AnimationPlayer } from '@angular/animations';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { paytmInitiateRequestModel } from '../model/paytm-integration.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class PaytmIntegrationService extends BaseService {
  successImage ="<img src='https://developer.paytm.com/demo//static/images/success.png' alt='success image' width='60' height='60'>";
  failureImage ="<h4 class='ptm-pay-heading ptm-red-bg ptm-body-color'>Payment Failed<img class='ptm-right ptm-margin0' src='https://staticpg.paytm.in/checkoutjs/803/assets/images/ic-failed.svg'></h4>";
  content ='';
  constructor(private http: HttpClient,private toaster : ToastrService) {
    super(http);
   }
 
   public getTxnToken(requestModel: paytmInitiateRequestModel): Observable<any>{
    var paytmTransactionURL= `api/ea_order/PaytmIntializePayment`;
    return this.httpPost(paytmTransactionURL,requestModel);
   }

   private getOrderDetails(orderId: string): Observable<any>{
    var paytmOrderStatusUrl= `/api/ea_order/orderStatus?orderid=${orderId}`;
    return this.httpGet(paytmOrderStatusUrl);
   }

   public refreshDataAfterPaymentDone(orderId: string): Observable<any>{
      return this.getOrderDetails(orderId)
   }

   public showPaymentResponse(isSuccessfull,contentMessage){
    this.content = isSuccessfull ? this.successImage : this.failureImage;
    this.toaster.show(`<div  class="ptm-msg">
        <div class='modal-body text-center'>\
            ${this.content}\
        </div>
        <div>
          ${contentMessage}
        </div\
      </div>`,"",
   {
    closeButton: true, 
    progressBar: false,
    positionClass: "toast-top-center",
    timeOut: 0,
    enableHtml: true,
    extendedTimeOut: 0,
   }
  );
   }
}
