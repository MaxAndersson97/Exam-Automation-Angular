import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Institute } from './../institute';
import { BaseService } from '../services/base.service';

@Injectable({
  providedIn: 'root'
})
export class WelcomeService extends BaseService {

  constructor(private http: HttpClient) {
    super(http);
  }
 
  institute : any = {};
  schoolProfile: any = {};
  boardId: string = '';
  classIdFrom: string = '';
  classIdTo: string = '';
  mediumID: string = '';
  contactPersonName: string = '';

  setInstitute(institute){
    this.institute = institute; 
  }

  public getInstitute(): Institute {
    const institute: Institute = JSON.parse(localStorage.getItem('institute'));
    return institute;
  }

  // getInstitute(){
  //   return this.institute;
  // }

  setSchoolDetails(){
    const institute: Institute = this.getInstitute();
    const { InstituteUserID } = institute;
    let url =  '/api/institute/get_school_profile';
    url += "?InstituteUserID=" + InstituteUserID;
    return this.httpGet(url)
      .pipe(
        map(response => response['data']),
        map(response => {
          this.setSchoolProfile(response);
          localStorage.setItem('schoolProfile', JSON.stringify(response))
        }),
      ).subscribe();
  }

  setSchoolProfile(schoolProfile){
    this.schoolProfile = schoolProfile;
  }

  getSchoolProfile(){
    const schoolProfile: any = JSON.parse(localStorage.getItem('schoolProfile'));
    return schoolProfile;

    //return this.schoolProfile;
  }

  getBoardId(){
    return this.getSchoolProfile().BoardID;
  }

  getClassIdFrom(){
    return this.getSchoolProfile().ClassIdFrom;
  }

  getClassIdTo(){
    return this.getSchoolProfile().ClassIdTo;
  }

  getMediumId(){
    return this.getSchoolProfile().MediumID;
  }

  getContactPersonName(){
    return this.getSchoolProfile().ContactPersonName;
  }
}