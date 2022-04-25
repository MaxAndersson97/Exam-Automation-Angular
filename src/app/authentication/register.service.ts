import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { BaseService } from 'src/app/services/base.service';
import { Result } from 'src/app/model/result';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })

export class RegisterService extends BaseService {

    sendOTP(mobile : string): Observable<Result> {
        const url = 'api/Account/otp_send_mobileverification?mobile='+mobile;
        return this.httpGet(url)
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    verifyOTP(mobile : string,otp : string): Observable<Result> {
        const url = 'api/Account/verify_mobile_otp?mobile='+mobile+'&otp='+otp;
        return this.httpGet(url)
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    processSignup(register : any): Observable<Result> {
        const url = 'api/staff/add_guest';
        
        return  this.httpPost(url, register)
        .pipe(map(res => res )
        , catchError(error => this.handleError(error)));
    }

    resendOTP(mobile : string): Observable<Result> {
        const url = 'api/Account/otp_resend_mobileverification?mobile='+mobile;
        return this.httpGet(url)
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    verifyEmail(email : String): Observable<Result> {
        const url = 'api/Account/check_unique_email?email='+email;

        return this.httpGet(url)
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    removeImage(studentId: any) {
        const url = environment.apiUrlIp + '/api/baseclass/delete_header_image?StudentID=' + studentId;
   
        return  this.httpClient.get(url).pipe(
          map(response => response )
        );
      }

    updateHeaderInfo(bodyData: any) {
        const url = environment.apiUrlIp + '/api/staff/update_header_info';
  
        const formData = new FormData();
        formData.append('PaperHeaderImage', bodyData.PaperHeaderImage);
        formData.append('PaperHeaderName', bodyData.PaperHeaderName);
        formData.append('Address', bodyData.Address);
        formData.append('StudentID', bodyData.StudentID);

        return  this.httpClient.post(url, formData).pipe(
          map(response => response )
        );
      }
}
