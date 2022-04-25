import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Institute } from 'src/app/institute';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {

  constructor(
    private http: HttpClient) { }

  /** GET Institute from the server */
  sendOtpInstitute(email: string): Observable<Institute> {
    const url = environment.apiUrlIp + `/api/Account/otp_send`;
    const params = new HttpParams().set('username', email);
    return this.http.post<Institute>(url, null, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        catchError(this.handleError<Institute>('sendOtpInstitute'))
      );
  }

  verifyOTP(obj) {
    const url = environment.apiUrlIp + `/api/Account/verifyotp`;
    const params = new HttpParams().set('username', obj.mobile).set('otp', obj.otp);
    return this.http.post(url, null, { params })
      .pipe(
        tap(data => this.log(JSON.stringify(data))),
        catchError(this.handleError<Institute>('verifyotp'))
      );
    }

    setNewPassword(obj) {
      const url = environment.apiUrlIp + `/api/Account/SetPassword`;
      const params = new HttpParams().set('username', obj.username).set('newpassword', obj.password).set('OTP', obj.otp);
      var newObj = {
        'username': obj.username,
        'newpassword': obj.password,
        'OTP': obj.otp
      }
      return this.http.post(url, newObj)
        .pipe(
          tap(data => this.log(JSON.stringify(data))),
          catchError(this.handleError<Institute>('SetPassword'))
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
    console.log(`LoginService: ${message}`);
  }
}
