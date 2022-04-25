import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { Observable, throwError } from 'rxjs';
import { Wing } from '../wing-setup/wing';
import { Institute } from 'src/app/institute';
import { HttpParams, HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  
  constructor(
    private instituteService: InstituteService,
    private http: HttpClient) { }

  /** GET Wings from the server */
  getWings(): Observable<Array<Wing>> {
    const url = environment.apiUrlIp + `/api/wing/list`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params = new HttpParams()
      .set('InstituteUserID', InstituteUserID);
    return this.http.get<Array<Wing>>(url, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        map(response => response['data']),
        catchError(this.handleError<Array<Wing>>('getWings', []))
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
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return throwError(error); // of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(`WingSetupService: ${message}`);
  }
}
