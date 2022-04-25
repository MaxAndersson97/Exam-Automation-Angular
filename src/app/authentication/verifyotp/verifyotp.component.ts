import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGE, UNAUTHERIZEDMESSASGESERVER } from 'src/app/Utils/utils';
import { RegisterService } from '../register.service';
import { Credentials } from '../login/credentials';
import { LoginComponent } from '../login/login.component';
import { LoginService } from '../login/login.service';
import { AuthenticationService } from '../authentication.service';
import { WelcomeService } from '../../welcome/welcome.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.scss']
})
export class VerifyotpComponent implements OnInit {

  registrationdata : any = {};

  verifyMobileForm = this.fb.group({
    OTP: ['',[ Validators.required,Validators.pattern('^[0-9]{4,4}$'), Validators.minLength(4), Validators.maxLength(4)]],
  });

  constructor( private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private registerService: RegisterService,
    private loginService: LoginService,
    private authenticationService: AuthenticationService,
    private welcomeService: WelcomeService) { }

  ngOnInit() {
    this.registrationdata = JSON.parse(localStorage.getItem('REGISTRATIONDATA'));
  }

  get f() { return this.verifyMobileForm.controls; }


  verifyOTP(){
    // this.processSignUp();
    // return;
    let mobile = this.registrationdata.CountryCode+this.registrationdata.Mobile;
    this.registerService.verifyOTP(mobile,this.verifyMobileForm.value.OTP).subscribe(result => {
        if(result['type'] == "success") {
          this.toaster.success("OTP verified successfully.");
          this.processSignUp();
        } else {
          this.verifyMobileForm.patchValue({
            'OTP':''
          });
          this.toaster.error(result['message']);
        }
      },error => {
        this.toaster.error(error &&  error.error && error.error['error_description']);
      });
  }
  
  processSignUp() {
    var register = {
      "StudentID": null,
      // "InstituteID": "00000000-0000-0000-0000-000000000000",
      "FirstName": this.registrationdata.FirstName,
      "LastName": this.registrationdata.LastName,
      "MiddleName": "",
      "Role": "GuestTeacher",
      "Mobile": "+"+this.registrationdata.CountryCode+this.registrationdata.Mobile,
      "Email": this.registrationdata.username,
      "SecondaryEmail": this.registrationdata.username,
      "Password": this.registrationdata.password,
      "ConfirmPassword":this.registrationdata.repassword
  }

    this.registerService.processSignup(register).subscribe(result => {
      if(result['success'] == true) {
        localStorage.removeItem('REGISTRATIONDATA');
        this.toaster.success("Your account created successfully.Login to user the system.");
        var credentials = new Credentials();
        credentials.username = this.registrationdata.username;
        credentials.password = this.registrationdata.password;
        var loginComponent = new LoginComponent(this.fb, this.router, this.loginService, this.welcomeService, this.authenticationService, this.toaster);
        loginComponent.login(credentials);
      } else {
        this.toaster.error(result['message']);
        this.router.navigate(['/authentication/login']);
      }
    },error => {
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
        this.router.navigate(['/authentication/login']);
      }else{
        this.toaster.error(error.error['message']);
        this.router.navigate(['/authentication/login']);
      }
    });
  }

  onResendClick() {
    let mobile = this.registrationdata.CountryCode+this.registrationdata.Mobile;
    this.registerService.resendOTP(mobile).subscribe(result => {
      if(result['type'] == "success") {
        this.toaster.success("OTP sent to your mobile number.Please use this to verify your mobile number.");
        this.router.navigate(['/authentication/verifyotp']);
      } else {
        this.toaster.error(result['message']);
      }
    },error => {
      console.log(error);
      this.toaster.error(error &&  error.error && error.error['error_description']);
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
