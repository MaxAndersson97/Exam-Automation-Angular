import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileserviceService {

  constructor(private httpclient: HttpClient) { }
  public uploadfile(formdata): Observable<any> {
    const url = environment.apiUrlIp;
    return this.httpclient.post<any>(`${url}/api/baseclass/upload_images_by_user_for_questions`, formdata);
//    return this.httpclient.post<any>('http://uatsrv.oyeexams.com/api/baseclass/upload_images_by_user_for_questions', formdata);

  }
}
