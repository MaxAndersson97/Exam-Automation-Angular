import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { Observable } from 'rxjs';
import { Institute } from 'src/app/institute';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Result } from 'src/app/model/result';

@Injectable({
  providedIn: 'root'
})
export class AcademicYearService{
  constructor(
    private instituteService: InstituteService,
    private http: HttpClient) { 
      
    }
  getAcademicYears(): Observable<Result>{
    let url = `/api/academicyear/list`;
    const institute: Institute = this.instituteService.getInstitute();
    url = url + '?InstituteUserID='+institute.InstituteUserID +'&InstituteID='+ institute.InstituteID;
    return this.http.post(environment.apiUrlIp + url, {})
      .pipe(
        map(response => response['data'])
      );
  }
}
