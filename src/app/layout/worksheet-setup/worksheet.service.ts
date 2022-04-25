import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Institute } from 'src/app/institute';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { WelcomeService } from 'src/app/welcome/welcome.service';

@Injectable({
  providedIn: 'root'
})
export class WorksheetService {

  constructor(private instituteService: InstituteService,
    private http: HttpClient, private welcomeService: WelcomeService) { }

  /** GET chepters by subjects */
  getCheptersBySubject(SubjectID, classID, EAPaperTemplateID,isOmr?) {
    const url = environment.apiUrlIp + `/api/eapapertemplate/chapterlist_questioncount`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params ={  
      'InstituteID': InstituteID,
      'SubjectID': SubjectID,
      "BoardID":  this.welcomeService.getBoardId(),
      "MediumID": this.welcomeService.getMediumId(),
      "ClassID": classID,
      "EAPaperTemplateID": EAPaperTemplateID,
      "IsOMRPaper":isOmr
    }
    return this.http.post(url, params).pipe(      
      map(response => response['data'])
  );
  }  

  // save chepters for a worksheet
  saveChepterForWorksheet(obj) {
    const url = environment.apiUrlIp + `/api/eapapertemplate/save_paperchapter_mapping`;
    return this.http.post<any>(url, obj);
  }
}
