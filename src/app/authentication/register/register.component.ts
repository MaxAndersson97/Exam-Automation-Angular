import { copyStyles } from '@angular/animations/browser/src/util';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MustMatch } from 'src/app/helpers/must-match.validator';
import { UNAUTHERIZEDMESSASGE, UNAUTHERIZEDMESSASGESERVER } from 'src/app/Utils/utils';
import { RegisterService } from '../register.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signUpForm = this.fb.group({
    username: ['', [Validators.required, this.emailValidator]],
    password:  ['', [Validators.required, Validators.minLength(8)]],
    repassword:  ['', [Validators.required, Validators.minLength(8)]],
    FirstName: ['', [Validators.required, Validators.pattern('^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$'),Validators.minLength(3)]],
    LastName: ['', [Validators.required, Validators.pattern('^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$'),Validators.minLength(3)]],
    Mobile: ['',[ Validators.required,Validators.pattern('^[0-9]{10,10}$'), Validators.minLength(10), Validators.maxLength(10)]],
    CountryCode:['',[Validators.required]]
  }, {
    validator: MustMatch('password', 'repassword')
  });

  togglePasswordBool: boolean = false;
  togglerePasswordBool: boolean = false;
  isemailavailble: boolean = true;

  countrylist:any = [];

  emailavailablemessage: string  = "";
  
  private _jsonURL = 'assets/country-by_callingcode.json';

  constructor( private fb: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private registerService: RegisterService,
    private http: HttpClient) { }
  
    public getJSON(): Observable<any> {
      return this.http.get(this._jsonURL);
    }
    
  ngOnInit() {
    localStorage.removeItem('REGISTRATIONDATA');
    this.getJSON().subscribe(data => {
      this.countrylist = data; 

      this.signUpForm.patchValue({
        CountryCode : 91,
      })
     });
  }

  get f() { return this.signUpForm.controls; }

  avoidSpace(event) {
    var k = event ? event.which : event.keyCode;
    if (k == 32) return false;
  }

emailValidator(c: FormControl){
         let isValid = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(c.value);  
        if(!!c.value){
            if (isValid) {                 
                return null;  
               } else {  
                return {
                 emailvalidator: {  
                  valid: false  
                 }
                };               
               } 
        } 
        
  }

  togglePassword(){
      this.togglePasswordBool =  !this.togglePasswordBool;
  }

  toggleRePassword(){
    this.togglerePasswordBool =  !this.togglerePasswordBool;
  }

  onSubmit() {
    // console.log(this.signUpForm.value.Mobile,"62");
    // localStorage.setItem('REGISTRATIONDATA', JSON.stringify(this.signUpForm.value));
    // this.router.navigate(['/authentication/verifyotp']);
    
    let mobile = this.signUpForm.value.CountryCode+this.signUpForm.value.Mobile;

    // this.signUpForm.patchValue({
    //   Mobile : mobile
    // });

    this.registerService.sendOTP(mobile).subscribe(result => {
      if(result['type'] == "success") {
        this.toaster.success("OTP sent to your mobile number.Please use this to verify your mobile number.");
        localStorage.setItem('REGISTRATIONDATA', JSON.stringify(this.signUpForm.value));
        this.router.navigate(['/authentication/verifyotp']);
      } else {
        this.toaster.error(result['message']);
        // this.signUpForm.patchValue({
        //   Mobile : oldmobile
        // });
      }
    },error => {
      this.toaster.error(error &&  error.error && error.error['error_description']);
    });
   }

   verifyEmail(){
    this.emailavailablemessage = '';
    if(this.signUpForm.value.username != "")
    {

      let isValid = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.signUpForm.value.username);
      if(isValid){
        this.registerService.verifyEmail(this.signUpForm.value.username).subscribe(result => {
          if(result['success'] == true) {
            this.toaster.success(result['message']);
            this.emailavailablemessage = '';
          } else {
            this.toaster.error(result['message']);
            this.emailavailablemessage = "Email id already exists, try with another one!";
          }
        },error => {
          if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
            this.toaster.warning(UNAUTHERIZEDMESSASGE);
          }else{
            this.toaster.error(error.error['message']);
          }
        });
      } else {
        this.toaster.error("Email must be a valid email address");
      }
    }
   }

   enterevent(event){

    if(event.type == "blur") {
      this.verifyEmail();
    } else {
    const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode == 13) {
        this.verifyEmail();
      }
    }
   }
}
