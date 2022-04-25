export class AvailableCreditsInfo{
    public availableCredits : number =0;
    public planName : string =undefined;
    public showUpgradeNowLink : boolean = false;
    public showInfoIcon : boolean = false;
    public toolTipMessage : string = undefined;
}

export class RefreshAvailableCreditsInfoConditions{
    public isCacheRefresh : boolean = false;
    public isApiRefresh : boolean = false;
}

export class AvailableCreditConfigurations {
    public minimumCreditForFreeOrUnlimited:      number = 25;
    public dateRangeByTodayForExpireSoonMessage: number = 7;
    public creditLimitForFree:                   CreditLimitForFree = {
        expireSoon : {
            showToolTipIcon : false,
            showUpgradeNowLink : true,
            tooltipMessage : ""
        },
        expired :{
            showToolTipIcon : false,
            showUpgradeNowLink : true,
            tooltipMessage : ""
        },
        freePlan :{
            showToolTipIcon : false,
            showUpgradeNowLink : true,
            tooltipMessage : ""
        }
    };
    public creditLimitForUnlimited: CreditLimitForUnlimited ={
        expireSoon : {
            showToolTipIcon : false,
            showUpgradeNowLink : true,
            tooltipMessage : ""
        },
        expired :{
            showToolTipIcon : false,
            showUpgradeNowLink : true,
            tooltipMessage : ""
        },
        unlimitedPlan :{
            showToolTipIcon : true,
            showUpgradeNowLink : true,
            tooltipMessage : "Out of credits, call us to add more credit in your unlimited plan"
        }
    };
}

export class CreditLimitForFree {
    public expireSoon: UIControl;
    public expired:    UIControl;
    public freePlan:   UIControl;
}

export class CreditLimitForUnlimited {
    public expireSoon:    UIControl;
    public expired:       UIControl;
    public unlimitedPlan: UIControl;
}

export class UIControl {
    public showUpgradeNowLink: boolean;
    public showToolTipIcon:    boolean;
    public tooltipMessage:     string;
}