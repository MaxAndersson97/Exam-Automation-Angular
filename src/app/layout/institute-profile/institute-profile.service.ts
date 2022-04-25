import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Institute } from 'src/app/institute';
import { InstituteService } from 'src/app/institute.service';
import { BaseService } from 'src/app/services/base.service';
import { WelcomeService } from 'src/app/welcome/welcome.service';

@Injectable({
  providedIn: 'root'
})
export class InstituteProfileService extends BaseService {
  
  constructor(private http: HttpClient, private instituteService: InstituteService, private welcomeService: WelcomeService) {
      super(http)
  }




  getSchoolProfile(): Observable<any> {
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteUserID } = institute;
    let url =  '/api/institute/get_school_profile';
    url += "?InstituteUserID=" + InstituteUserID;
    return this.httpGet(url,"true")
      .pipe(
        map(response => response['data']),
        map(response => {
          return response;
        }),
      );
  }

  submitAcademicDetails(schoolProfile): Observable<any> {
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID } = institute;
    schoolProfile["InstituteID"] = InstituteID;
    let url =  '/api/institute/step1';
    return this.httpPost(url, schoolProfile);
  }

  submitSchoolDetails(schoolProfile): Observable<any> {
    let url = '/api/institute/step2';
    return this.httpPost(url, schoolProfile);
  }

  getCountryList(): Observable<any> {
    let url = '/api/baseclass/country/list';
    return this.httpGet(url)
      .pipe(
        map(response => response['data']),
        map(response => {
          return response;
        }),
      );
  }

  getStateList(countryId): Observable<any> {
    let url =  '/api/baseclass/state/list?CountryID=' + countryId;
    return this.httpGet(url)
      .pipe(
        map(response => response['data']),
        map(response => {
          return response;
        }),
      );
  }

  getClassList(): Observable<any> {
    let url =  '/api/BoardMasters/GetClass?BoardID=' + this.welcomeService.getBoardId() + "&MediumID=" + this.welcomeService.getMediumId();
    return this.httpPost(url)
      .pipe(
        map(response => response['data']),
        map(response => {
          return response;
        }),
      );
  }

  uploadFile(fileObj: File[], key: string[], url): Observable<any> {
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID } = institute;
    const apiUrl =  url;
    const formData: FormData = new FormData();
    if (fileObj.length == key.length) {
      for(let i=0;i<fileObj.length;i++){
        formData.append(key[i], fileObj[i], fileObj[i].name);
      }
    }
    formData.append("InstituteID",InstituteID);
    return  this.httpPost(apiUrl, formData)
        .pipe(map(res => res )
                , catchError(error => this.handleError(error)));
  }

}
