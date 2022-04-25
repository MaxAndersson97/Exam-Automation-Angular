import { Injectable } from '@angular/core';
import { Institute } from './institute';
import { Observable } from 'rxjs';
import { Result } from './model/result';
import { HttpParams, HttpClient } from '@angular/common/http';
import { WelcomeService } from './welcome/welcome.service';
import { BaseService } from './services/base.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InstituteService extends BaseService {

    constructor(private http: HttpClient, private welcomeService: WelcomeService){
        super(http);
    }

    public getInstitute(): Institute {
        const institute: Institute = JSON.parse(localStorage.getItem('institute'));
        return institute;
    }

    /** GET Institute DDL Class from the server */
    getInstituteDDLClass(): Observable<any> {
        const urlStr = `/api/institute/ddlclass_byrole?BoardID=:BoardID&MediumID=:MediumID&ClassIdFrom=:ClassIdFrom&ClassIdTo=:ClassIdTo`;
        const institute: Institute = this.getInstitute();
        const { InstituteID, InstituteUserID } = institute;
        let url = urlStr
                    .replace(':BoardID', this.welcomeService.getBoardId())
                    .replace(':MediumID', this.welcomeService.getMediumId())
                    .replace(':ClassIdFrom', this.welcomeService.getClassIdFrom())
                    .replace(':ClassIdTo', this.welcomeService.getClassIdTo());
        return this.httpGet(url)
            .pipe(
                map(response => response['data']),
                catchError(err => this.handleError(err))
            );
    }

}
