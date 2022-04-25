import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Institute } from 'src/app/institute';
import { InstituteService } from 'src/app/institute.service';
import { BaseService } from 'src/app/services/base.service';
import { Wing } from './wing';

@Injectable({
    providedIn: 'root'
})
export class WingSetupService extends BaseService {

    constructor(
        private instituteService: InstituteService,
        private http: HttpClient
        ) { 
            super(http);
        }

    /** GET Wings from the server */
    getWings(): Observable<Array<Wing>> {
        const institute: Institute = this.instituteService.getInstitute();
        if (institute !== null) {
            const { InstituteID } = institute;
            const url = `/api/wing/list?InstituteID=${InstituteID}`;
            // const url = `/api/wing/list?InstituteID=E6F45159-38C5-44F2-8A78-D1D50CDA2B3D`;
            return this.httpGet(url, "true")
                .pipe(
                    map(response => response['data']),
                    catchError(error => this.handleError(error))
                );
        }
    }

    deleteWing(wing: Wing): Observable<any> {
        const url = `/api/wing/delete?wingid=${wing.WingID}`;
        return this.httpGet(url)
            .pipe(
                catchError(error => this.handleError(error))
            );
    }
    
    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log(`WingSetupService: ${message}`);
    }
}
