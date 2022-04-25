import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Subject } from './subject';
import { Class } from "./class";
import { HttpParams, HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from '../../../../src/environments/environment';
import { Book } from './book';
import { WelcomeService } from '../../welcome/welcome.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectAndBookSetupService {

  constructor(
    private http: HttpClient, private welcomeService: WelcomeService
  ) { }

  /** GET Class List from the server */
  getClassList(): Observable<Array<Class>> {
    const url = environment.apiUrlIp + `/api/institute/ddlclass`;
    const params = new HttpParams()
      .set('BoardID', this.welcomeService.getBoardId())
      .set('MediumID', this.welcomeService.getMediumId())
      .set('ClassIdFrom', this.welcomeService.getClassIdFrom())
      .set('ClassIdTo', this.welcomeService.getClassIdTo());
    
      return this.http.get<Array<Class>>(url, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        map(response => response['data']),
        catchError(this.handleError<Array<Class>>('getClassList', []))
      );
  }
  
  /** GET Subject List By ClassId from the server */
  getSubjectList(classID): Observable<Array<Subject>> {
    const url = environment.apiUrlIp + `/api/easubjectmaster/list`;
    const params = new HttpParams()
      .set('BoardID', this.welcomeService.getBoardId())
      .set('MediumID', this.welcomeService.getMediumId())
      .set('InstituteID', this.welcomeService.getInstitute().InstituteID)
      .set('ClassId', classID)
      .set('isall','true');
      
      return this.http.get<Array<Subject>>(url, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        map(response => response['data']),
        catchError(this.handleError<Array<Subject>>('getClassList', []))
      );
  }
  
  /** GET Books List By SubjectID from the server */
  getBooksList(classID, subjectID): Observable<Array<Book>> {
    const url = environment.apiUrlIp + `/api/easubjectmaster/textbooklist`;
    const params = new HttpParams()
      .set('BoardID', this.welcomeService.getBoardId())
      .set('MediumID', this.welcomeService.getMediumId())
      .set('ClassId', classID)
      .set('SubjectID', subjectID)
      .set('InstituteID', this.welcomeService.getInstitute().InstituteID);
    
      return this.http.get<Array<Book>>(url, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        map(response => response['data']),
        catchError(this.handleError<Array<Book>>('getBooksList', []))
      );
  }
  
  /** Update Subject Details to the server */
  updateSubjectDetails(subjectList, classID): Observable<string> {
    const url = environment.apiUrlIp + `/api/easubjectmaster/add`;
    let subjectDetails = [];
    for(let i = 0; i < subjectList.length; i++) {
      let obj = {
        "InstituteUserID": this.welcomeService.getInstitute().InstituteUserID,
        "InstituteID": this.welcomeService.getInstitute().InstituteID,
        "SubjectID": subjectList[i].SubjectID,
        "ClassID": classID,
        "IsSelected": subjectList[i].IsSelected,
        "listEASubjectBookMappingInfoMember": subjectList[i].listEASubjectBookMappingInfoMember
      };
      subjectDetails.push(obj);
    }
    
    return this.http.post<any>(url, subjectDetails)
        .pipe(
            tap(data => this.log(JSON.stringify(data))),
            catchError(this.handleError<any>('updateSubject'))
        );
  }
  
    
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return throwError(error); // of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    // console.log(`WingSetupService: ${message}`);
  }
}
