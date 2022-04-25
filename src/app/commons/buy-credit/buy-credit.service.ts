import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseService } from '../../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class BuyCreditService extends BaseService {

  constructor(private http: HttpClient) {
    super(http);
   }

   getBuyCreditPopupInfo(): Observable<any>{
    const url = "/api/settings/payment_setting_list";
    return this.httpGet(url);
  }
}

export enum CurrencyType{
    USD = 0,
    INR = 1,
}
