export class BuyCreditPopupInfo{
    public data : BuyCreditPopupInfoData = new BuyCreditPopupInfoData();
    public success : boolean= false;
    public message : string="";
}

export class BuyCreditPopupInfoData{
    public EACreditPopupMsg : string ="";
    public PriceINR : number =0 ;
    public PriceUSD : number =0;
}

export class Payment{
    public amount : number;
    public currency : string;
}
export  function onScriptLoad(txnToken, orderId,mid) {
    var config = {
        "root": "",
        "flow": "DEFAULT",
        "merchant":{
             "name":" ",
              "mid":mid,
             "logo":"../../../assets/images/logo.png"
         },
         "style":{
             "headerBackgroundColor":"#8dd8ff",
             "headerColor":"#3f3f40"
        },
        "data": {
            "orderId": orderId,
            "token": txnToken,
            "tokenType": "TXN_TOKEN"
        },
        "handler":{
             "notifyMerchant": function (eventName, data) {
                if(eventName == 'SESSION_EXPIRED'){
                    alert("Your session has expired!!");
                    location.reload();
                }
             }
        }
    };
    var paytm;
    paytm = window;
    if (paytm.Paytm && paytm.Paytm.CheckoutJS) {
        // initialze configuration using init method
        paytm.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            console.log('Before JS Checkout invoke');
            // after successfully update configuration invoke checkoutjs
            paytm.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
            console.log("Error => ", error);
        });
    }
}
 