import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from './credentials';
import { User } from '../user';
import { BaseService } from 'src/app/services/base.service';
import { Result } from 'src/app/model/result';

/**
 * Dev credentials:
 * 
 * shishu@gmail.com
 * Brisk@2020
 * 
 * 
 * Prod credentials:
 * 
 * Aditya.parakh223@gmail.com
 * Mss245039
*/

@Injectable({ providedIn: 'root' })
export class LoginService extends BaseService {
    private urls = {
        login: '/token',
        getInstituteDetail: '/api/baseclass/registration',
        getInstituteuserid: '/api/baseclass/getinstituteuserid?CurrentUrl=',
        getSchoolProfile: '/api/institute/get_school_profile?InstituteUserID='
    };

    /** POST: login with credentials to the server */
    login(credentials: Credentials): Observable<User> {
        const { username, password } = credentials;
        const body = `grant_type=password&username=${username}&password=${encodeURIComponent(password)}`;
        // const body = {
        //     "grant_type": "password",
        //     "username": username,
        //     "password": password
        // }
        return this.httpPost(this.urls.login, body)
            .pipe(
                map((user: any) => {
                    const authUser = user;
                    return new User(
                        authUser['access_token'],
                        authUser['token_type'],
                        authUser['expires_in'],
                        authUser['userName'],
                        authUser['roles'],
                        new Date(authUser['.issued']),
                        new Date(authUser['.expires']),
                        authUser['data'],
                        this.getInstituteUrl()
                    );
                }),
                catchError(error => this.handleError(error))
            );
    }

    getInstituteUrl() {
        var schoolURL = "";
        var fullURL = window.location.href;

        if (fullURL.split('/#/authentication')[0]) {
            schoolURL = fullURL.split('/#/authentication')[0].split('//')[1];
            if (schoolURL == 'localhost:4200') { schoolURL = 'shishukunj.smartstudies.co.in'; }
            // if(schoolURL == 'localhost:4200') { schoolURL = 'trialschool.smartstudies.co.in'; }
            // if(schoolURL == 'localhost:4200') { schoolURL = 'livempboard.smartstudies.co.in'; }
            //if (schoolURL == 'localhost:4200') { schoolURL = 'bls.smartstudies.co.in'; }
        }
        return schoolURL;
    }

    /** GET Institute from the server */
    getInstituteUserId(): Observable<Result> {
        var schoolURL = "";
        var fullURL = window.location.href;

        if (fullURL.split('/#/authentication')[0]) {
            schoolURL = fullURL.split('/#/authentication')[0].split('//')[1];
            // if(schoolURL == 'localhost:4200') { schoolURL = 'shishukunj.smartstudies.co.in'; }
            // if(schoolURL == 'localhost:4200') { schoolURL = 'livempboard.smartstudies.co.in'; }
            if (schoolURL == 'localhost:4200') { schoolURL = 'bls.smartstudies.co.in'; }
        }
        return this.httpGet(this.urls.getInstituteuserid + schoolURL)
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    /** GET school profile from the server */
    getSchoolProfile(institute): Observable<Result> {
        return this.httpGet(this.urls.getSchoolProfile + institute.InstituteUserID)
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }

    getInstituteDetail(): Observable<Result> {
        return this.httpGet(this.urls.getInstituteDetail)
            .pipe(
                map(response => response),
                catchError(error => this.handleError(error))
            );
    }
}
