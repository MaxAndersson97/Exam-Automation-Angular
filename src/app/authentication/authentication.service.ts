import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable()
export class AuthenticationService {

    public getToken(): string {
        const user: User = JSON.parse(localStorage.getItem('user'));
        return user && user.accessToken;
    }

    public isAuthenticated(): boolean {
        // get the token
        const token = this.getToken();
        // return a boolean reflecting
        // whether or not the token is expired
        return !!token; // tokenNotExpired(null, token);
    }
}


