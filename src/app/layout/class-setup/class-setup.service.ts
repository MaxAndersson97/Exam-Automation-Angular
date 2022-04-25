import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { Observable } from 'rxjs';
import { Institute } from 'src/app/institute';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { InstituteClass } from '../institute-class';
import { BaseService } from '../../services/base.service';
import { WelcomeService } from 'src/app/welcome/welcome.service';
import * as _ from 'underscore';
import { ToastService } from 'src/app/commons/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ClassSetupService extends BaseService {


  constructor(
    private instituteService: InstituteService,
    private http: HttpClient,
    private welcomeService: WelcomeService,
    private toast: ToastService) {
    super(http)
  }

  /** Add Class Teacher  */
  addOrUpdateClassTeacher(ClassID, sectionId, ClassTeacherUserID): Observable<any> {
    let url = '/api/ea_sectionsmaster/addteacher?';
    url += 'ClassID=' + ClassID + '&EASectionID=' + sectionId + '&ClassTeacherUserID=' + ClassTeacherUserID;
    return this.httpPost(url);
  };

  saveSubjectList(subjectList,EASectionID) : Observable<any>{
    let url = '/api/ea_sectionsmaster/add_multi_subject_teacher?EASectionID='+EASectionID;
    return this.httpPost(url,subjectList)
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        map(response => response['data']),
        catchError(error => this.handleError(error))
      );
  };

  /** GET Class List By InstituteId */
  getSubjectListByClassAndSectionId(classID): Observable<Array<any>> {   
   let url = "/api/easubjectmaster/list?"
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID } = institute;
    const BoardID = this.welcomeService.getBoardId();
    const MediumID = this.welcomeService.getMediumId();
    url += 'MediumID=' + MediumID + "&ClassID=" + classID + "&BoardID=" + BoardID + "&InstituteID=" + InstituteID ;
    return this.httpGet(url)
      .pipe(
        map(response => response['data']),
        catchError(error => this.handleError(error))
      );
  }

   /** GET Class List By InstituteId2 */
   getSubjectListByClassAndSectionId2(classID, sectionId): Observable<Array<any>> {
    let url = `/api/ea_sectionsmaster/subject_teacher_list?`;
     const institute: Institute = this.instituteService.getInstitute();
     const { InstituteID } = institute;
     const BoardID = this.welcomeService.getBoardId();
     const MediumID = this.welcomeService.getMediumId();
     url += 'MediumID=' + MediumID + "&ClassID=" + classID + "&BoardID=" + BoardID + "&InstituteID=" + InstituteID + "&AESectionID=" + sectionId ;
     return this.httpGet(url)
       .pipe(
         map(response => response['data']),
         catchError(error => this.handleError(error))
       );
   }

  /** Update Status By SectionId  */
  updateSectionList(AESectionID : string) : Observable<any> {
    let url = `/api/ea_sectionsmaster/updatestatus?AESectionID=`;
    url += AESectionID;
    return this.httpGet(url)
      .pipe(
        map(response => response['data']),
        catchError(error => this.handleError(error))
      );
  }

  /** GET Class List By InstituteId */
  getClassListByInstituteId(): Observable<Array<InstituteClass>> {
    let url = `/api/ea_sectionsmaster/class_setup_list?InstituteID=`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID } = institute;
    url += InstituteID;
    return this.httpGet(url, "true")
      .pipe(
        map(response => response['data']),
        catchError(error => this.handleError(error))
      );
  }

  updateClassSection(instituteClass: InstituteClass){
    let url= '/api/ea_sectionsmaster/Add';
    const callBody = _.pick(instituteClass, "ClassID", "InstituteUserID", "InstituteID","SectionName","AESectionID");
    return this.httpPost(url, callBody)
      .pipe(
        tap(response => this.toast.showToast(response)),
        catchError(error => this.handleError(error))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return throwError(error); // of(result as T);
  //   };
  // }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`ClassSetupService: ${message}`);
  }
}
