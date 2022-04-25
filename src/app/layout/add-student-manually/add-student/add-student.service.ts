import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { Observable, throwError } from 'rxjs';
import { Institute } from 'src/app/institute';
import { HttpParams, HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { AddStudent } from './add-student';
import { environment } from 'src/environments/environment';
import { WelcomeService } from 'src/app/welcome/welcome.service';

@Injectable({
  providedIn: 'root'
})
export class AddStudentService {


  constructor(
    private instituteService: InstituteService,
    private http: HttpClient, private welcomeService: WelcomeService) { }

  /** POST Add Student from the server */

  addStudent(addStudent): Observable<any> {
    const url = environment.apiUrlIp + `/api/student/add`;
    const institute: Institute = this.instituteService.getInstitute();
    const BoardID = this.welcomeService.getBoardId();
    const MediumID = this.welcomeService.getMediumId()
    const { InstituteID, InstituteUserID } = institute;
     addStudent = { ...addStudent, InstituteID, BoardID,  MediumID, InstituteUserID};
    return this.http.post<any>(url, addStudent);
  }
  
  getSectionByClassID(classID){
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const url = environment.apiUrlIp + '/api/ea_sectionsmaster/list?ClassID='+ classID+'&InstituteID='+InstituteID;
    return this.http.get<any>(url)
    .pipe(
      map(response => response['data']))
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
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return throwError(error); // of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`StudentSetupService: ${message}`);
  }
}
