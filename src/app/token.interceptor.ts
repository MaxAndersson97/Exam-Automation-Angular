import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpParams,
    HttpParameterCodec
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.includes('api')) {
            return next.handle(request.clone({
                url: request.url,
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                },
            }));
        } else if (request.url.includes('token')) {
           const body = request.body.toString();
            return next.handle(request.clone({
                url: request.url,
                setHeaders: {
                    body,
                    "Content-Type": "application/x-www-form-urlencoded",
                },

            }));
        }
        // else if(request.url.includes('upload_student_image')) {
        //     console.log();
        //     const body = new HttpParams({ encoder: new CustomEncoder(), fromString: request.body.toString() });
        //     return next.handle(request.clone({
        //         url: request.url,
        //         setHeaders: {
                    
        //             Authorization: `Bearer ${this.auth.getToken()}`
        //         },
        //     }));
        // }
        return next.handle(request);
    }
}

class CustomEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }

    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }

    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }

    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}
