import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Institute } from 'src/app/institute';
import { WelcomeService } from 'src/app/welcome/welcome.service';

@Injectable({
  providedIn: 'root'
})
export class AddStudentPhotoService{

  constructor(
    private instituteService: InstituteService,
    private http: HttpClient,
    private welcomeService: WelcomeService) {}

  /** Upload Student Photo to server */
  uplaodStudentPhoto(body): Observable<any> {    
    const formData = new FormData();
    formData.append('file', body.Image);
    formData.append('StudentID', body.StudentID);
    console.log(body.Image);
    const url = environment.apiUrlIp + `/api/baseclass/upload_user_image`;
    const req = new HttpRequest('POST', url, formData, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req)
      
  }

  deleteStudentImage(studentID){
    const url = environment.apiUrlIp + '/api/baseclass/delete_user_image?StudentID='+studentID;
    const req = new HttpRequest('POST', url, {});
    return this.http.request(req)
      
  }

  uplaodStudentCSV(body): Observable<any> {
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID } = institute;
    const formData = new FormData();
    formData.append('files', body.file);
    formData.append('CurrentAcademicSessionID', body.CurrentAcademicSessionID);
    formData.append('ClassID', body.ClassID);
    formData.append('MediumID',this.welcomeService.getMediumId());
    formData.append('BoardID',this.welcomeService.getBoardId());
    formData.append('InstituteID', InstituteID);
    formData.append('InstituteCode', body.InstituteCode);
    formData.append('EA_SectionID', body.EA_SectionID);
    const url = environment.apiUrlIp + `/api/student/upload_student_csv`;
    // const req = new HttpRequest('POST', url, formData, {
    //   reportProgress: true,
    //   responseType: 'text'
    // });
    // return this.http.request(req)
    return this.http.post( url, formData, {
        // reportProgress: true,
        responseType: 'json'
      });
      
  }

  uplaodOMRZip(body){
    let TestID=localStorage.getItem("TestID");
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID } = institute;
    const formData = new FormData();
    formData.append('files', body.file);
    formData.append('InstituteID', InstituteID);
    formData.append('EAExamAssignID', body.EAExamAssignID);
    formData.append('TestID', TestID);
    const url = environment.apiUrlIp + '/api/omr/upload_omr_files';
    // return this.http.post( url, formData, {
    //     responseType: 'json'
    //   });
    return this.http.post<any>(url, formData, {
      reportProgress: true,
      responseType: 'json',
      observe: 'events'
    });
  }
 
}
