import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Result } from '../model/result';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    constructor(public httpClient: HttpClient) { }

    protected httpPost(url: string, param?: any, isLoad?:string): Observable<Result> {
        if(!isLoad){
            isLoad = "false";
        }
        let headers = new HttpHeaders();
        headers = headers.set('isLoad', isLoad);
        return this.httpClient.post(environment.apiUrlIp + url, param,{headers: headers})
            .pipe(map(res => {
                const response: Result = res as Result;
                if (response.success === true) {

                } else {
                }
                return response;
            })
                , catchError(error => this.handleError(error)));
    }

    protected httpGet(url: string, isLoad?:string ): Observable<Result> {
        if(!isLoad){
            isLoad = "false";
        }
        let headers = new HttpHeaders();
        headers = headers.set('isLoad', isLoad);
        return this.httpClient.get(environment.apiUrlIp + url,{headers:headers})
            .pipe(map(res => res as Result)
                , catchError(error => this.handleError(error)));
    }

    protected httpGetWithParam(url: string, param: any): Observable<Result> {
        return this.httpClient.get(environment.apiUrlIp + url)
            .pipe(map(res => res as Result)
                , catchError(error => this.handleError(error)));
    }

    public handleError(err: any) {
        if (err !== undefined) {
            return throwError(err);
        }
    }

}
