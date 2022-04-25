import { EventEmitter, Component, OnInit, Output } from '@angular/core';
import { paytmInitiateRequestModel } from 'src/app/model/paytm-integration.model';
import { FacebookPixelsService } from 'src/app/services/facebook-pixels.service';
import { PaytmIntegrationService } from 'src/app/services/paytm-integration.service';
import { environment } from 'src/environments/environment';
import { BuyCreditPopupInfo, BuyCreditPopupInfoData, onScriptLoad, Payment } from './buy-credit.model';
import { BuyCreditService, CurrencyType } from './buy-credit.service';
declare var $: any;
@Component({
  selector: 'app-buy-credit',
  templateUrl: './buy-credit.component.html',
  styleUrls: ['./buy-credit.component.scss']
})
export class BuyCreditComponent implements OnInit {
  @Output() closePopupEvent: EventEmitter<any> = new EventEmitter();
  public buyCreditPoupInfo: BuyCreditPopupInfo = new BuyCreditPopupInfo();
  public currency = CurrencyType;
  constructor(private paytmIntegrationService: PaytmIntegrationService,
    private buyCreditSvc: BuyCreditService, private fbPixelService: FacebookPixelsService) { }

  ngOnInit() {
  }

  public loadCredits() {
    this.buyCreditSvc.getBuyCreditPopupInfo().subscribe(
      (success) => {
        this.buyCreditPoupInfo = JSON.parse(JSON.stringify(success));
      },
      (error) => {
        this.setDefault();
      }
    );
  }

  private setDefault() {
    this.buyCreditPoupInfo = new BuyCreditPopupInfo();
    this.buyCreditPoupInfo.data = new BuyCreditPopupInfoData();
  }

  public payNow(currencyType: CurrencyType) {
    var payment: Payment = new Payment();
    if (currencyType == CurrencyType.USD) {
      payment.amount = this.buyCreditPoupInfo.data.PriceUSD;
      payment.currency = "USD";
    }
    else if (currencyType == CurrencyType.INR) {
      payment.amount = this.buyCreditPoupInfo.data.PriceINR;
      payment.currency = "INR";
    }

    this.closePopupEvent.emit(payment);
  }

  public proceedPayment(amount: number, currency: string) {
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    let userData = JSON.parse(getUserinfo.data);
    var requestModel = new paytmInitiateRequestModel();
    requestModel.boardID = userData.BoardID;
    requestModel.classID = "e493e8ad-08ba-4266-a73a-9c785b7be41f";
    requestModel.mediumID = userData.MediumID;
    requestModel.currencyTypeId = "bf61dbdb-fcfa-4a20-abbb-c9baed28a863";
    requestModel.partnerID = "95a8b917-d3a0-4a40-9efc-026593b3761e";
    requestModel.amount = amount;
    requestModel.currencyName = currency;
    requestModel.mobile = userData.MobileNumber;
    requestModel.email = getUserinfo.userName;
    requestModel.firstName = "FirstName";
    requestModel.lastName = "lastName";

    this.paytmIntegrationService.getTxnToken(requestModel).subscribe(
      (success) => {
        var orderNumber = success.OrderNumber;
        var txnToken = success.data.body.txnToken;
        this.fbPixelService.loadFBPixel('InitiateCheckout');
        onScriptLoad(txnToken, orderNumber, environment.paytmMerchantId);
      }
    );
  }

  closePopup() {
    this.closePopupEvent.emit();
  }
}
