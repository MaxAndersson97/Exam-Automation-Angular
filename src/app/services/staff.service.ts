
import { AuthenticationService } from './../authentication/authentication.service';
import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Observable } from 'rxjs';
import { Result } from 'src/app/model/result';
import { Institute } from '../institute';
import { HttpParams, HttpRequest, HttpClient } from '@angular/common/http';
import { Staff } from '../model/staff';
import { StaffListRequest } from '../model/stafflistrequest';
import { environment } from 'src/environments/environment';
import { getInstitute } from '../Utils/utils';
import { map, catchError } from 'rxjs/operators';
import { InstituteService } from '../institute.service';
import { Student } from '../model/student';

@Injectable({
    providedIn: 'root'
})
export class StaffService extends BaseService {

    constructor(public http: HttpClient,
         private instituteService: InstituteService,
         private authService: AuthenticationService,         
         ){
        super(http);
    }


    private urls = {
        saveStaff: '/api/staff/add',
        staffList: '/api/staff/list',
        uploadCSVUrl: '/api/staff/upload_staff_csv',
        saveMultipleStaff: '/api/staff/add_multiple_staff',
        staffDetailUrl: '/api/staff/view?instituteid={instituteId}&studentid={studentId}',
        staffDDLListUrl: '/api/staff/ddl/list?InstituteID={InstituteID}',
        staffStatusUrl: '/api/baseclass/user_status_change?studentid={studentId}',
        saveMultipleStudent: '/api/student/add_multiple_students'
    };

    getStaffDetail(studentId: string, instituteId: string): Observable<Result> {
        const url = this.urls.staffDetailUrl.replace('{instituteId}', instituteId).replace('{studentId}', studentId);
        return this.httpGet(url);
    }
    // getStudentDetail(studentId: string): Observable<Result> {
    //     const url = '/api/student/student_all_detail?studentId='+ studentId;
    //     console.log("iiiiiiiiii",studentId);
        
    //     return this.httpPost(url);
    // }

    getStudentDetail(studentId: string, AcademicYearsID: string): Observable<Result> {
        const url = '/api/student/student_all_detail?studentId='+studentId+'&AcademicYearID='+AcademicYearsID;
        console.log("iiiiiiiiii",studentId);
        
        return this.httpPost(url);
    }
    saveMultipleStaff(staffArr): Observable<Result> {
        console.log(staffArr);
        return this.httpPost(this.urls.saveMultipleStaff, staffArr);
    }

    saveMultipleStudent(studentArr: Student[]): Observable<Result> {
        return this.httpPost(this.urls.saveMultipleStudent, studentArr);
    }
    public saveStaff(staff: Staff): Observable<Result> {
        return this.httpPost(this.urls.saveStaff, staff);
    }

    public getStaffList(): Observable<Result> {
        const staffListRequest: StaffListRequest = new StaffListRequest();

        const institute: Institute = JSON.parse(localStorage.getItem('institute'));
        staffListRequest.InstituteID = institute.InstituteID;
        staffListRequest.PageIndex = 1;
        staffListRequest.PageSize = 500;
        staffListRequest.Role = [
            'VicePrincipal',
            'Teacher',
            'Supervisor',
            'Principal',
            'Director',
            'GuestTeacher'];
        staffListRequest.status = 0;
        staffListRequest.strSearchValue = '';
        return this.httpPost(this.urls.staffList, staffListRequest);
    }

    public getStaffListWithParams(staffListRequest): Observable<Result> {
        return this.httpPost(this.urls.staffList, staffListRequest);
    }

    public getStaffDDLList(): Observable<Result> {
        const institute = this.instituteService.getInstitute();
        const {InstituteID} = institute;
        let url = this.urls.staffDDLListUrl.replace('{InstituteID}', InstituteID);
        return this.httpGet(url)
        .pipe(
            map(response => response.data)
        );
    }

    public uploadCSV(file: File): Observable<any> {
        const institute: Institute = getInstitute();
        const formdata = new FormData();
        formdata.append('files', file);
        formdata.append('InstituteID', institute.InstituteID);
        return this.http.post(environment.apiUrlIp + this.urls.uploadCSVUrl, formdata, {
            reportProgress: true,
            responseType: 'json'
        });
    }

    public getStaffListByRole(role: string[], strSearchValue: string): Observable<Result> {
        const staffListRequest: StaffListRequest = new StaffListRequest();
        const institute: Institute = JSON.parse(localStorage.getItem('institute'));
        staffListRequest.InstituteID = institute.InstituteID;
        staffListRequest.Role = role;
        staffListRequest.status = 1;
        staffListRequest.PageIndex = 1;
        staffListRequest.PageSize = 500;
        staffListRequest.strSearchValue = strSearchValue;
        return this.httpPost(this.urls.staffList, staffListRequest)
            .pipe(
                map(response => response['data']),
                catchError(error => this.handleError(error))
            );
    }

    changeStaffStatus(student){          
        const url = environment.apiUrlIp+'/api/baseclass/user_status_change';          
        const token = `bearer `+ this.authService.getToken();
        return this.http.post(url, student)
          .pipe(            
            map(response => response['data'])        
          );
      }

      resetPassword(userId: string){
        const url = environment.apiUrlIp+'/api/baseclass/generate_random_password?UserID='+ userId;          
        const token = `bearer `+ this.authService.getToken();
        return this.http.post(url, {token});          
      }
}
