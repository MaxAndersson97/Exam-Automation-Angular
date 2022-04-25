import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import {MustMatch} from '../../helpers/must-match.validator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  setNewPasswordFrm: FormGroup;
  submitted = false;
  isOTPSentSuccessfully = false;
  isSetNewPassword = false;
  togglePasswordBool = false;
  togglePasswordBool1 = false;
  
  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      mobile: ['', [Validators.required,  Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        )]],
      otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

    this.setNewPasswordFrm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
      }, {
      validator: MustMatch('password', 'confirmPassword')
      });
    }

  sendOtpInstitute(mobile: string) {
    this.forgotPasswordService.sendOtpInstitute(mobile)
    .subscribe(result => {
// tslint:disable-next-line: triple-equals
      const message: boolean = result['message'] =='E-mail sent Successfully';
      if (message) {
          this.isOTPSentSuccessfully = true;
          this.toastr.success(result['message']);
      } else {
        this.isOTPSentSuccessfully = false;
        this.toastr.error(result['message']);
      }
  }, error => {
    this.toastr.error(error.error['error_description']);

  });
  }
  get f() { return this.forgotPasswordForm.controls; }
  get fd() { return this.setNewPasswordFrm.controls; }

  onSubmit() {
    const formvalue = this.forgotPasswordForm.value;
    this.sendOtpInstitute(formvalue.mobile);
  }

  verifyOTP() {
    this.forgotPasswordService.verifyOTP(this.forgotPasswordForm.value)
    .subscribe(result => {
      const message: boolean = result['message'] == 'Your OTP Verified';
      if (message) {
          this.isSetNewPassword = true;
          this.toastr.success(result['message']);
      } else {
        this.isSetNewPassword = false;
        this.toastr.error(result['message']);
      }
  });
  }
  setNewPassword(){
// tslint:disable-next-line: no-debugger
    const uservalues = this.setNewPasswordFrm.value;
    uservalues['username'] = this.forgotPasswordForm && this.forgotPasswordForm.value['mobile'];
    uservalues['otp'] = this.forgotPasswordForm && this.forgotPasswordForm.value['otp'];
    this.forgotPasswordService.setNewPassword(uservalues)
    .subscribe(result => {
      if (result['success']) {
        this.router.navigate(['/authentication']);
        this.toastr.success(result['message']);
      } else {
        this.toastr.error(result['message']);
      }
  });

  }
  // retrict user to enter alphabates
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  togglePassword(){
    this.togglePasswordBool =  !this.togglePasswordBool;
  }

  togglePassword1(){
    this.togglePasswordBool1 =  !this.togglePasswordBool1;
  }

}
