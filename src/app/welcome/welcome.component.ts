import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { FacebookPixelsService } from '../services/facebook-pixels.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userProfileInfo: any;
  userRegisterFor: any;
  UserRole: any;

  constructor(private router: Router,
    private spinner: SpinnerVisibilityService, 
    private fbPixelService: FacebookPixelsService) { }

  ngOnInit() {
    //this.getUserProfile()
  }

  getUserProfile() {
    this.spinner.show();
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    this.userProfileInfo = JSON.parse(localStorage.getItem('schoolProfile'));
    this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
    this.fbPixelService.loadFBPixel('CompleteRegistration');

    if (getUserinfo.roles.indexOf('GuestTeacher') != -1 && this.userRegisterFor == 2) {
      this.UserRole = 'GuestTeacher';
      // this.router.navigate(['/exam/create-paper']);   
      this.router.navigate(['/exam/class-test-exam/dashboard']);
    } else if (getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor == 2) {
      this.UserRole = 'Partner';
      this.router.navigate(['/exam/class-test-exam/dashboard']);
    } else if (getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor == 2) {
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Teacher';
      this.router.navigate(['/exam/class-test-exam/dashboard']);
    } else if (getUserinfo.roles.indexOf('Principal') != -1 && this.userRegisterFor == 2) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      // this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Principal';
    } else if (getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor == 2) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'VicePrincipal';
    } else if (getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor == 2) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Supervisor';
    } else if (getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor == 2) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Director';
    } else if (getUserinfo.roles.indexOf('GuestTeacher') != -1 && this.userRegisterFor == 1) {
      this.UserRole = 'GuestTeacher';
      // this.router.navigate(['/exam/create-paper']);   
      this.router.navigate(['/exam/class-test-exam/dashboard']);
    } else if (getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor == 1) {
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Teacher';
      this.router.navigate(['/exam/class-test-exam/dashboard']);

    } else if (getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor == 1) {
      this.UserRole = 'Partner';
      this.router.navigate(['/exam/class-test-exam/dashboard']);

    } else if (getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor == 1) {
      this.UserRole = 'Director';
      this.router.navigate(['/exam/class-test-exam/dashboard']);
    } else if (getUserinfo.roles.indexOf('Principal') != -1 && this.userRegisterFor == 1) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      this.UserRole = 'Principal';
    } else if (getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor == 1) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      this.UserRole = 'VicePrincipal';
    } else if (getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor == 1) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      this.UserRole = 'Supervisor';
    }

    //-----------user register for 3
    else if (getUserinfo.roles.indexOf('GuestTeacher') != -1 && this.userRegisterFor == 3) {
      this.UserRole = 'GuestTeacher';
      // this.router.navigate(['/exam/create-paper']);   
      this.router.navigate(['/exam/class-test-exam/dashboard']);
    }
    if (getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor == 3) {
      this.UserRole = 'Partner';
      this.router.navigate(['/exam/class-test-exam/dashboard']);
    } else if (getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor == 3) {
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Teacher';
      this.router.navigate(['/exam/class-test-exam/dashboard']);

    } else if (getUserinfo.roles.indexOf('Principal') != -1 && this.userRegisterFor == 3) {
      this.router.navigate(['/exam/staff']);
      // this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Principal';
    } else if (getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor == 3) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'VicePrincipal';
    } else if (getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor == 3) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Supervisor';
    } else if (getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor == 3) {
      this.router.navigate(['/exam/class-test-exam/dashboard']);
      //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
      this.UserRole = 'Director';
    }
  }
}
