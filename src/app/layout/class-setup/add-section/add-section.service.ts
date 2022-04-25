import { Injectable } from '@angular/core';
import { InstituteService } from 'src/app/institute.service';
import { Observable } from 'rxjs';
import { Institute } from 'src/app/institute';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../services/base.service';
import { Result } from 'src/app/model/result';

@Injectable({
  providedIn: 'root'
})
export class AddSectionService extends BaseService {

  private classId: string;
  private numberOfSection: string;


  constructor(
    private instituteService: InstituteService,
    private http: HttpClient) {
    super(http)
  }

  addMultipleSection(classId:string, numberOfSection:string): Observable<Result>{
    const institute: Institute = this.instituteService.getInstitute();
    const { InstituteID, InstituteUserID } = institute;
    const params: any = {
      InstituteUserID: InstituteUserID,
      InstituteID: InstituteID,
      ClassID: classId,
      NoOfSection: numberOfSection
    }
    let url = '/api/ea_sectionsmaster/addmultiplesection';
    return this.httpPost(url,params);
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
    console.log(`AddSectionService: ${message}`);
  }
}
