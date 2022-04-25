import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institute } from 'src/app/institute';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { InstituteService } from 'src/app/institute.service';
import { AddExamGroup } from '../exam-group/add-exam-group';

@Injectable({
  providedIn: 'root'
})
export class ClassTestExamService {

  constructor(private http: HttpClient,
    private instituteService: InstituteService) { }

  getExamGroupList(currentPaperType): Observable<AddExamGroup> {
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID} = institute;
    const url = environment.apiUrlIp+ "/api/examgroup/list?InstituteID=" + InstituteID+ '&PaperType='+ currentPaperType;
    return this.http.get(url).pipe(
      map(response => response['data'])
    );
  }

  getTemplateList(data): Observable<any> {
    const url = environment.apiUrlIp+ "/api/eapapertemplate/list"
    return this.http.post(url, data).pipe(
      map(response => response['data'])
    );
  }
  suggestedQuesList(data): Observable<any> {
    const url = environment.apiUrlIp + "/api/eapapertemplate/suggested_question_list"
    return this.http.post(url, data);
  }
}
