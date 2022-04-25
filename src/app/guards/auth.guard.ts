import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate, ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.service';
import { PaytmIntegrationService } from '../services/paytm-integration.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService,
              private paytmIntegrationService : PaytmIntegrationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // if(state.url.includes('exam/pdf-preview')) {
    //   return true;
    // }

    // if (this.authService.isAuthenticated()) {

    //   // logged in so return true
    //     return true;
    // }

    // // not logged in so redirect to login page with the return url
    // this.router.navigate(['/authentication']);
    // return false;

    return true;
  }
}
