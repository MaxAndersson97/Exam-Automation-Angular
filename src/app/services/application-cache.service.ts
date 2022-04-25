import { Injectable } from '@angular/core';
import { AvailableCreditsCacheModel } from '../model/applicationCache.models';

@Injectable({
  providedIn: 'root'
})
export class ApplicationCacheService {
  private cachedAvailableCreditsInfo : AvailableCreditsCacheModel;

  constructor() { }

  public getAvailableCreditsCacheModel(){
    if(this.cachedAvailableCreditsInfo === undefined)
      return this.cachedAvailableCreditsInfo;
    else{
      let getUserinfo = JSON.parse(localStorage.getItem('user'));
      if(getUserinfo.issued != this.cachedAvailableCreditsInfo.issuedDate ){
        this.clearCache();
      }
      return this.cachedAvailableCreditsInfo;
    }
  }

  public setAvailableCreditsCacheModel(cachedObject : AvailableCreditsCacheModel){
    console.log("Updated application cache of available credits is " + JSON.stringify(cachedObject));
    if(this.cachedAvailableCreditsInfo === undefined){
      this.cachedAvailableCreditsInfo = cachedObject;
    }
    else{
      this.cachedAvailableCreditsInfo.FreePaperGenerationCount = cachedObject.FreePaperGenerationCount;
      this.cachedAvailableCreditsInfo.PaperCreatedCount = cachedObject.PaperCreatedCount;
      this.cachedAvailableCreditsInfo.ValidityDate = cachedObject.ValidityDate;
      this.cachedAvailableCreditsInfo.userEmail = cachedObject.userEmail;
    }
  }

  public clearCache(){
    this.clearAvailableCreditsCache();
    console.log("Cache cleared");
  }

  private clearAvailableCreditsCache(){
    this.cachedAvailableCreditsInfo = undefined;
  }
}
