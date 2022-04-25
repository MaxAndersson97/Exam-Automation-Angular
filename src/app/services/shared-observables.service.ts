import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TemplateService } from '../layout/template-setup/template.service';
import { AvailableCreditConfigurations, AvailableCreditsInfo, RefreshAvailableCreditsInfoConditions } from '../model/availableCredits';
import { availableCreditConfigurations } from '../../assets/availableCreditConfigurations.json';
import { ApplicationCacheService } from './application-cache.service';
import { SharedDataService } from './shared-data.service';
@Injectable({
  providedIn: 'root'
})
export class SharedObservablesService {
  totalRecords: any;
  constructor(private templateService: TemplateService,
    private sharedDataService: SharedDataService,
    private applicationCacheService: ApplicationCacheService) {
    this.totalRecords = 0;
  }

  private refreshAvailableCreditsInfoObservable: Subject<AvailableCreditsInfo> = new Subject<AvailableCreditsInfo>();

  public getAvailableCreditsInfo(): Observable<AvailableCreditsInfo> {
    return this.refreshAvailableCreditsInfoObservable.asObservable();
  }

  public refreshAvailableCredits(conditions: RefreshAvailableCreditsInfoConditions) {
    var availableCreditsInfoObj = new AvailableCreditsInfo();
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    let userData = JSON.parse(getUserinfo.data);
    let createdPaperCount = 0;
    let freePaperCount = userData.FreePaperGenerationCount;
    let isGuestTeacher: boolean = false;
    if (getUserinfo.roles.indexOf('GuestTeacher') != -1) {
      isGuestTeacher = true;
    }
    if (isGuestTeacher) {
      if (conditions.isApiRefresh) {
        const prepareData = {
          PaperType: 0,
          pageIndex: 1,
          pageSize: 25
        };
        this.templateService.getTemplateList(prepareData).subscribe((template) => {
          if (template && template.length > 0) {
            this.totalRecords = template[0].TotalRecords;
            createdPaperCount = template[0].TotalPaperCreatedCount;
            freePaperCount = userData.FreePaperGenerationCount - createdPaperCount;
            availableCreditsInfoObj = this.resetAvailableCreditInfo(freePaperCount, userData.PaperValidityDate);
            this.sharedDataService.updateAvailableCreditsCache(createdPaperCount);
            this.refreshAvailableCreditsInfoObservable.next(availableCreditsInfoObj);
          }
          else {
            availableCreditsInfoObj = this.resetAvailableCreditInfo(freePaperCount, userData.PaperValidityDate);
            this.sharedDataService.updateAvailableCreditsCache(0);
            this.refreshAvailableCreditsInfoObservable.next(availableCreditsInfoObj);
          }
        },
          () => {
            availableCreditsInfoObj = this.resetAvailableCreditInfo(freePaperCount, userData.PaperValidityDate);
            this.sharedDataService.updateAvailableCreditsCache(0);
            this.refreshAvailableCreditsInfoObservable.next(availableCreditsInfoObj);
          }
        );
      }
      else {
        var cachedApplicationCreditsObject = this.applicationCacheService.getAvailableCreditsCacheModel();
        if (cachedApplicationCreditsObject === undefined) {
          this.refreshAvailableCredits({
            isApiRefresh: true,
            isCacheRefresh: false
          });
        }
        else {
          freePaperCount = cachedApplicationCreditsObject.FreePaperGenerationCount - cachedApplicationCreditsObject.PaperCreatedCount;
          availableCreditsInfoObj = this.resetAvailableCreditInfo(freePaperCount, userData.PaperValidityDate);
          this.refreshAvailableCreditsInfoObservable.next(availableCreditsInfoObj);
        }
      }
    }
  }

  private resetAvailableCreditInfo(availCredit: number, validityDateString: string): AvailableCreditsInfo {
    var availableCreditConfigurationsObj: AvailableCreditConfigurations = JSON.parse(JSON.stringify(availableCreditConfigurations));
    var minimumCreditForFreeOrUnlimited = availableCreditConfigurations.minimumCreditForFreeOrUnlimited;
    var availableCreditsInfoObj = new AvailableCreditsInfo();
    var dateRangeByTodayForExpireSoonMessage = availableCreditConfigurations.dateRangeByTodayForExpireSoonMessage;
    var validityDateObj = new Date(validityDateString);
    var isExpire: boolean = false;
    var isExpired: boolean = false;
    var isActual: boolean = false;
    var isFree: boolean = false;
    var currentDate = new Date();
    var currentDatePlusSevenDays = new Date();
    currentDatePlusSevenDays.setDate(currentDatePlusSevenDays.getDate() + (dateRangeByTodayForExpireSoonMessage));

    if (availCredit <= minimumCreditForFreeOrUnlimited) isFree = true;
    else isFree = false;

    if (validityDateObj <= currentDate) {
      availableCreditsInfoObj.planName = "Expired";
      isExpired = true;
      /* Credits are expired*/
    }
    else if (validityDateObj > currentDate) {
      if (validityDateObj > currentDate && validityDateObj <= currentDatePlusSevenDays) {
        /* Credits are expiring in week*/
        isExpire = true;
        availableCreditsInfoObj.planName = "Expire Soon";
      }
      else {
        isActual = true;
        /*Credits expirations will happen later */
        if (isFree) availableCreditsInfoObj.planName = "FREE";
        else availableCreditsInfoObj.planName = "Unlimited Plan";
      }
    }

    var tupleObj = this.setVisibilityOfUpgradeOrInfoIcon(isExpired, isExpire, isActual, isFree);
    availableCreditsInfoObj.showUpgradeNowLink = tupleObj[0];
    availableCreditsInfoObj.showInfoIcon = tupleObj[1];
    availableCreditsInfoObj.toolTipMessage = tupleObj[2];
    availableCreditsInfoObj.availableCredits = availCredit;
    if (availCredit == 0) availableCreditsInfoObj.planName = "Out of credits";
    return availableCreditsInfoObj;
  }

  private setVisibilityOfUpgradeOrInfoIcon(isExpired: boolean, isExpire: boolean, isActual: boolean, isFreePlan: boolean): [boolean, boolean, string] {
    var tupleToreturn: [boolean, boolean, string] = [false, false, undefined];
    if (isFreePlan) {
      if (isActual) {
        tupleToreturn[0] = availableCreditConfigurations.creditLimitForFree.freePlan.showUpgradeNowLink;
        tupleToreturn[1] = availableCreditConfigurations.creditLimitForFree.freePlan.showToolTipIcon;
        tupleToreturn[2] = availableCreditConfigurations.creditLimitForFree.freePlan.tooltipMessage;
      }
      else if (isExpire) {
        tupleToreturn[0] = availableCreditConfigurations.creditLimitForFree.expireSoon.showUpgradeNowLink;
        tupleToreturn[1] = availableCreditConfigurations.creditLimitForFree.expireSoon.showToolTipIcon;
        tupleToreturn[2] = availableCreditConfigurations.creditLimitForFree.expireSoon.tooltipMessage;
      }
      else if (isExpired) {
        tupleToreturn[0] = availableCreditConfigurations.creditLimitForFree.expired.showUpgradeNowLink;
        tupleToreturn[1] = availableCreditConfigurations.creditLimitForFree.expired.showToolTipIcon;
        tupleToreturn[2] = availableCreditConfigurations.creditLimitForFree.expired.tooltipMessage;
      }
    }
    else if (!isFreePlan) {
      if (isActual) {
        tupleToreturn[0] = availableCreditConfigurations.creditLimitForUnlimited.unlimitedPlan.showUpgradeNowLink;
        tupleToreturn[1] = availableCreditConfigurations.creditLimitForUnlimited.unlimitedPlan.showToolTipIcon;
        tupleToreturn[2] = availableCreditConfigurations.creditLimitForUnlimited.unlimitedPlan.tooltipMessage;
      }
      else if (isExpire) {
        tupleToreturn[0] = availableCreditConfigurations.creditLimitForUnlimited.expireSoon.showUpgradeNowLink;
        tupleToreturn[1] = availableCreditConfigurations.creditLimitForUnlimited.expireSoon.showToolTipIcon;
        tupleToreturn[2] = availableCreditConfigurations.creditLimitForUnlimited.expireSoon.tooltipMessage;
      }
      else if (isExpired) {
        tupleToreturn[0] = availableCreditConfigurations.creditLimitForUnlimited.expired.showUpgradeNowLink;
        tupleToreturn[1] = availableCreditConfigurations.creditLimitForUnlimited.expired.showToolTipIcon;
        tupleToreturn[2] = availableCreditConfigurations.creditLimitForUnlimited.expired.tooltipMessage;
      }
    }

    return tupleToreturn;
  }
}
