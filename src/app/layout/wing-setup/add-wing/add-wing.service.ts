import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { InstituteService } from 'src/app/institute.service';
import { Institute } from 'src/app/institute';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { AddWing } from './add-wing';
import { WelcomeService } from 'src/app/welcome/welcome.service';
import { BaseService } from 'src/app/services/base.service';
import { StaffService } from 'src/app/services/staff.service';
import { Result } from 'src/app/model/result';
import { ToastService } from 'src/app/commons/toast/toast.service';

@Injectable()
export class AddWingService extends BaseService {

    private isModelOpen = new BehaviorSubject<boolean>(false);

    constructor(
        private instituteService: InstituteService,
        private http: HttpClient,
        private staffService: StaffService,
        private toast: ToastService) { 
            super(http);
        }

    getStaffList(){
        return this.staffService.getStaffList().pipe(
            map(response => response["data"])
        )
    }

    /** GET Institute DDL Class from the server */
    getInstituteDDLClass() {
        return this.instituteService.getInstituteDDLClass();
    }

    /** POST Add Wing from the server */

    addWing(addWing: AddWing): Observable<Result> {
        const url = `/api/wing/add`;
        const institute: Institute = this.instituteService.getInstitute();
        const { InstituteID, InstituteUserID } = institute;
        addWing = { ...addWing, InstituteID, InstituteUserID };
        // const params = new HttpParams()
        //     .set('InstituteUserID', InstituteUserID);
        return this.httpPost(url, addWing)
            .pipe(
                tap(response => this.toast.showToast(response)),
                // map(response => response['data']),
                catchError(error => this.handleError(error))
            );
    }

}
