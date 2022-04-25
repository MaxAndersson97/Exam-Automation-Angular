import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { InstituteService } from 'src/app/institute.service';
import { Institute } from 'src/app/institute';
import { HttpParams, HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Staff } from '../layout/staff';
import { InstituteClass } from '../layout/institute-class';
import { Country } from '../country';
import { State } from '../state';
import { environment } from 'src/environments/environment';

@Injectable()
export class DropDownService {

    constructor(
        private instituteService: InstituteService,
        private http: HttpClient) { }


    /** GET Staff DDL List from the server */
    getStaffDDLList(): Observable<Array<Staff>> {
        const url = environment.apiUrlIp + `/api/staff/ddl/list`;
        const institute: Institute = this.instituteService.getInstitute();
        const { InstituteID, InstituteUserID } = institute;
        const params = new HttpParams()
            .set('InstituteID', InstituteID);
        return this.http.get<Array<Staff>>(url, { params })
            .pipe(
                tap(data => this.log(JSON.stringify(data))),
                map(response => response['data']),
                catchError(this.handleError<Array<Staff>>('getStaffDDLList', []))
            );
    }
    /** GET Country from the server */
    getCountry(): Observable<Array<Country>> {
        const url = environment.apiUrlIp + `/api/baseclass/country/list`;
        // const institute: Institute = this.instituteService.getInstitute();
        // const { InstituteID, InstituteUserID } = institute;

        // const params = new HttpParams()
        //     // .set('InstituteUserID', InstituteUserID);
        //     .set('BoardID', '122313B9-54C5-48C4-A772-8279D6E568B9')
        //     .set('MediumID', '4481EDB1-C934-4ED0-987B-B8478C5978E0')
        //     .set('ClassIdFrom', 'DE3C25A4-FB07-47DD-A0F7-84EC1E3F96D3')
        //     .set('ClassIdTo', '01E5ACFD-0E91-422B-9B3A-345F48D26E91');
        return this.http.get<Array<Country>>(url)
            .pipe(
                tap(data => this.log(JSON.stringify(data))),
                map(response => response['data']),
                catchError(this.handleError<Array<Country>>('getCountry', []))
            );
    }


    /** GET State from the server */
    getState(CountryID): Observable<Array<State>> {
        const url =environment.apiUrlIp +  `/api/baseclass/state/list`;
        // const institute: Institute = this.instituteService.getInstitute();
        // const { InstituteID, InstituteUserID } = institute;

        const params = new HttpParams()
            .set('CountryID', CountryID);
        //     .set('BoardID', '122313B9-54C5-48C4-A772-8279D6E568B9')
        //     .set('MediumID', '4481EDB1-C934-4ED0-987B-B8478C5978E0')
        //     .set('ClassIdFrom', 'DE3C25A4-FB07-47DD-A0F7-84EC1E3F96D3')
        //     .set('ClassIdTo', '01E5ACFD-0E91-422B-9B3A-345F48D26E91');
        return this.http.get<Array<State>>(url, { params })
            .pipe(
                tap(data => this.log(JSON.stringify(data))),
                map(response => response['data']),
                catchError(this.handleError<Array<State>>('getState', []))
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
    }
}
