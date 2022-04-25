import { environment } from "src/environments/environment";

export class paytmInitiateRequestModel {
  public boardID: string;
  public mediumID: string;
  public classID: string;
  public currencyTypeId: string;
  public partnerID: string;
  public amount: number;
  public currencyName: string;
  public mobile: string;
  public email: string;
  public firstName: string;
  public lastName: string;
}


export interface PaytmGetObjectResponseHeadModel {
  responseTimestamp: string;
  version: string;
  signature: string;
}

export class ResultInfo {
  public resultStatus: string;
  public resultCode: string;
  public resultMsg: string;
}

export class PaytmGetObjectResponseBodyModel {
  public resultInfo: ResultInfo;
  public txnId: string;
  public orderId: string;
  public txnAmount: string;
  public txnType: string;
  public mid: string;
  public refundAmt: string;
  public txnDate: string;
  public FreePaperGenerationCount: string;
  public validityDate: string;
  public success: boolean;
  public message: string;
}

export class PaytmGetObjectResponseModel {
  public head: PaytmGetObjectResponseHeadModel;
  public body: PaytmGetObjectResponseBodyModel;
}
