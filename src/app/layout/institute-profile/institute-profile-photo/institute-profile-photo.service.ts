import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { Observable, throwError } from 'rxjs';
import { Staff } from '../../staff';
import { Institute } from 'src/app/institute';
import { tap, map, catchError } from 'rxjs/operators';
import { InstituteClass } from '../../institute-class';
import { AddWing } from '../../wing-setup/add-wing/add-wing';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstituteProfilePhotoService {


  constructor(
    private instituteService: InstituteService,
    private http: HttpClient) { }

  /** GET Staff DDL List from the server */
  getStaffDDLList(): Observable<Array<Staff>> {
    const url = environment.apiUrlIp + `api/staff/ddl/list`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params = new HttpParams()
      .set('InstituteUserID', InstituteUserID);
    return this.http.get<Array<Staff>>(url, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        map(response => response['data']),
        catchError(this.handleError<Array<Staff>>('getStaffDDLList', []))
      );
  }
  /** GET Institute DDL Class from the server */
  getInstituteDDLClass(): Observable<Array<InstituteClass>> {
    const url = environment.apiUrlIp + `/api/institute/ddlclass`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;

    const params = new HttpParams()
      // .set('InstituteUserID', InstituteUserID);
      .set('BoardID', '122313B9-54C5-48C4-A772-8279D6E568B9')
      .set('MediumID', '4481EDB1-C934-4ED0-987B-B8478C5978E0')
      .set('ClassIdFrom', 'DE3C25A4-FB07-47DD-A0F7-84EC1E3F96D3')
      .set('ClassIdTo', '01E5ACFD-0E91-422B-9B3A-345F48D26E91');
    return this.http.get<Array<InstituteClass>>(url, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        map(response => response['data']),
        catchError(this.handleError<Array<InstituteClass>>('getInstituteDDLClass', []))
      );
    /** POST Add Wing from the server */
  }
  addWing(addWing: AddWing): Observable<any> {
    const url = environment.apiUrlIp + `/api/wing/list`;
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params = new HttpParams()
      .set('InstituteUserID', InstituteUserID);
    return this.http.post<any>(url, addWing, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        map(response => response['data']),
        catchError(this.handleError<any>('addWing'))
      );
  }

  deleteProfileImage(){
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteUserID } = institute;
    const url = environment.apiUrlIp + `/api/institute/deleteschoolimage?InstituteUserID=`+ InstituteUserID;
    return this.http.post<any>(url, {});
  }
  deleteschoollogo(){
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteUserID } = institute;
    const url = environment.apiUrlIp + `/api/institute/deleteschoollogo?InstituteUserID=`+ InstituteUserID;
    return this.http.post<any>(url, {});
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
  }
}
