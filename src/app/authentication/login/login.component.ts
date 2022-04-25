import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from './login.service';
import { Credentials } from './credentials';
import { User } from '../user';
import { Router } from '@angular/router';
import { Institute } from '../../institute';
import { WelcomeService } from './../../welcome/welcome.service';
import {AuthenticationService} from '../authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    loginForm = this.fb.group({
        username: ['', [Validators.required, this.emailValidator]],
        password: '',
    });

    isRegisterEnable = false;

    togglePasswordBool: boolean = false;
    UserRole: string;
    userRegisterFor: any;
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private loginService: LoginService,
        private welcomeService: WelcomeService,
        private authService: AuthenticationService,
        private toaster: ToastrService) { }

    ngOnInit() {
        this.loginService.getInstituteDetail().subscribe(result=>{
            console.log(result.data.OnlyRegistration);
            if(result.success) {
                this.isRegisterEnable = result.data.OnlyRegistration;
            } else {
                this.toaster.error(result.message);
            }
        }, error => {
            console.log(error);
        });
    }
    get f() { return this.loginForm.controls; }

    public login(credentials: Credentials) {
        localStorage.removeItem('SUBJECTSETTINGS');
        this.loginService.login(credentials).subscribe(result => {
            const user: User = result as User;
            if (user) 
            {
                var dataobject = JSON.parse(user.data);
                if(user.InstituteUrl === dataobject.DomainURL)
                {
                    localStorage.setItem('user', JSON.stringify(user));
                    this.getInstituteUserIdLocal(user);
                    this.toaster.success('User Logged-in successfully');
                } else {
                    localStorage.setItem('user', null);
                    this.toaster.error('This user not associated with this Institute');
                }
            } else {
                localStorage.setItem('user', null);
                this.toaster.error('Please try again...!!');
            }
        }, error => {
            console.log(error);
            this.toaster.error(error &&  error.error && error.error['error_description']);
        });
    }

    getInstituteUserIdLocal(user : User) {

        var dataobject = JSON.parse(user.data);

        const inst: Institute = dataobject as Institute;
        localStorage.setItem('institute', JSON.stringify(inst));
        localStorage.setItem('InstituteID', dataobject.InstituteID);
        this.welcomeService.setInstitute(inst);
        localStorage.setItem('InstituteAccessLevel', JSON.stringify(dataobject.InstituteAccessLevel));        
        localStorage.setItem('UserRegisteredFor', JSON.stringify(dataobject.UserRegisteredFor));

        var PaperHeader = {
            InstituteImage : inst['SchoolImage'],
            InstituteName : inst['GuestInstituteName'] == '' ? inst['PartnerName'] : inst['GuestInstituteName'],
            InstituteAddress : inst['Address'],
        }

        localStorage.setItem('PaperHeader', JSON.stringify(PaperHeader));
        


        const schoolProfile: any = dataobject;
        this.welcomeService.setSchoolProfile(schoolProfile);
        localStorage.setItem('schoolProfile', JSON.stringify(schoolProfile));

        localStorage.setItem('FREEPAPERCOUNT',schoolProfile.FreePaperGenerationCount);

        if(inst['NumberOfLoginTime'] > 1) {

            let getUserinfo = JSON.parse(localStorage.getItem('user'));
            this.userRegisterFor = schoolProfile.UserRegisteredFor;
          
            if(getUserinfo.roles.indexOf('GuestTeacher') != -1 && this.userRegisterFor ==2){
                this.UserRole = 'GuestTeacher';
                // this.router.navigate(['/exam/create-paper']);
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            }  else if(getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor ==2){
                this.UserRole = 'Partner';
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            } else if(getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor ==2){
                this.UserRole = 'Teacher'; 
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            }else if(getUserinfo.roles.indexOf('Principal') != -1  && this.userRegisterFor ==2){
                this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'Principal'; 
            }else if(getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor ==2){
                this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'VicePrincipal';
            }else if(getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor ==2) {
                this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'Supervisor'; 
            }else if(getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor ==2){
                this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'Director'; 
            } else if(getUserinfo.roles.indexOf('GuestTeacher') != -1 && this.userRegisterFor ==1){
                    this.UserRole = 'GuestTeacher';
                    this.router.navigate(['/exam/class-test-exam/dashboard']);
                 // this.router.navigate(['/exam/create-paper']);   
            } else if(getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor == 1){
                this.UserRole = 'Teacher'; 
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            }else if(getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor == 1){
              this.UserRole = 'Partner';
              this.router.navigate(['/exam/class-test-exam/dashboard']);
            }else if(getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor ==1){
                this.UserRole = 'Director';
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            }else if(getUserinfo.roles.indexOf('Principal') != -1  && this.userRegisterFor ==1){
                this.router.navigate(['/exam/class-test-exam/dashboard']);
              this.UserRole = 'Principal'; 
          }
          else if(getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor ==1){
            this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'VicePrincipal'; 
          }else if(getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor ==1){
            this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'Supervisor'; 
          }
          // -------user Register for 3-----
          else if(getUserinfo.roles.indexOf('GuestTeacher') != -1 && this.userRegisterFor ==3){
                this.UserRole = 'GuestTeacher';
                // this.router.navigate(['/exam/create-paper']);
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            } else if(getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor ==3){
                this.UserRole = 'Teacher'; 
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            } else if(getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor == 3) {
                this.UserRole = 'Partner';
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            }else if(getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor ==3) {
                this.UserRole = 'Director';
                this.router.navigate(['/exam/class-test-exam/dashboard']);
            }else if(getUserinfo.roles.indexOf('Principal') != -1  && this.userRegisterFor ==3) {
                this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'Principal'; 
            }else if(getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor ==3) {
                this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'VicePrincipal'; 
            }else if(getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor ==3){
                this.router.navigate(['/exam/class-test-exam/dashboard']);
                this.UserRole = 'Supervisor'; 
            }
        } else {
            this.router.navigate(['/welcome']);
        }
    }

    getInstituteUserId() {
        this.loginService.getInstituteUserId().subscribe(result => {
            const inst: Institute = result.data as Institute;
            if (inst) {
                localStorage.setItem('institute', JSON.stringify(inst));
                localStorage.setItem('InstituteID', inst["InstituteID"]);

                this.welcomeService.setInstitute(inst);
                // this.getSchoolProfile(inst);
                localStorage.setItem('InstituteAccessLevel', JSON.stringify(result.data.InstituteAccessLevel));
                localStorage.setItem('UserRegisteredFor', JSON.stringify(result.data.UserRegisteredFor));
                const schoolProfile: any = result['data']['SchoolProfile'];
                if (schoolProfile) {
                    this.welcomeService.setSchoolProfile(schoolProfile);
                    localStorage.setItem('schoolProfile', JSON.stringify(schoolProfile));
                    
                    if(inst['NumberOfLoginTime'] > 2) {
                            let getUserinfo = JSON.parse(localStorage.getItem('user'));   
                            this.userRegisterFor = schoolProfile.UserRegisteredFor;
                            console.log(this.userRegisterFor, getUserinfo.roles);
                            if(getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor ==2){
                                this.UserRole = 'Partner';
                                this.router.navigate(['/exam/staff']);
                                
                            }else if(getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor ==2){
                                //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
                                this.UserRole = 'Teacher'; 
                                this.router.navigate(['/exam/staff']);
                        
                            }else if(getUserinfo.roles.indexOf('Principal') != -1  && this.userRegisterFor ==2){
                                this.router.navigate(['/exam/staff']);
                               // this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
                                this.UserRole = 'Principal'; 
                            }else if(getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor ==2){
                              this.router.navigate(['/exam/staff']);
                                //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
                                this.UserRole = 'VicePrincipal'; 
                            }else if(getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor ==2){
                              this.router.navigate(['/exam/staff']);
                                //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
                                this.UserRole = 'Supervisor'; 
                            }else if(getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor ==2){
                              this.router.navigate(['/exam/staff']);
                                //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
                                this.UserRole = 'Director'; 
                            }else if(getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor == 1){
                                //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
                                this.UserRole = 'Teacher'; 
                                this.router.navigate(['/exam/custom-content/dashboard/2']);
                                
                            }else if(getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor == 1){
                              this.UserRole = 'Partner';
                              this.router.navigate(['/exam/custom-content/dashboard/2']);
                        
                            }else if(getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor ==1){
                                this.UserRole = 'Director';
                                this.router.navigate(['/exam/custom-content/dashboard/2']);
                            }else if(getUserinfo.roles.indexOf('Principal') != -1  && this.userRegisterFor ==1){
                              this.router.navigate(['/exam/custom-content/dashboard/2']);
                              this.UserRole = 'Principal'; 
                          }else if(getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor ==1){
                            this.router.navigate(['/exam/custom-content/dashboard/2']);
                              this.UserRole = 'VicePrincipal'; 
                          }else if(getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor ==1){
                            this.router.navigate(['/exam/custom-content/dashboard/2']);
                              this.UserRole = 'Supervisor'; 
                          }

                          // -------user Register for 3-----
                          else if(getUserinfo.roles.indexOf('Teacher') != -1 && this.userRegisterFor ==3){
                            //this.userRegisterFor = this.userProfileInfo.UserRegisteredFor;
                            this.UserRole = 'Teacher'; 
                            this.router.navigate(['/exam/staff']);
                            
                            }else if(getUserinfo.roles.indexOf('Partner') != -1 && this.userRegisterFor == 3){
                            this.UserRole = 'Partner';
                            this.router.navigate(['/exam/staff']);
                        
                            }else if(getUserinfo.roles.indexOf('Director') != -1 && this.userRegisterFor ==3){
                                this.UserRole = 'Director';
                                this.router.navigate(['/exam/staff']);
                            }else if(getUserinfo.roles.indexOf('Principal') != -1  && this.userRegisterFor ==3){
                                this.router.navigate(['/exam/staff']);
                                this.UserRole = 'Principal'; 
                            }else if(getUserinfo.roles.indexOf('VicePrincipal') != -1 && this.userRegisterFor ==3){
                                this.router.navigate(['/exam/staff']);
                                this.UserRole = 'VicePrincipal'; 
                            }else if(getUserinfo.roles.indexOf('Supervisor') != -1 && this.userRegisterFor ==3){
                                this.router.navigate(['/exam/staff']);
                                this.UserRole = 'Supervisor'; 
                            }
                    }else{
                        this.router.navigate(['/welcome']);
                    }
    
                } else {
                    localStorage.setItem('schoolProfile', null);
                }
            } else {
                this.toaster.warning(result['message']);
                localStorage.setItem('institute', null);
                // JSON.parse(localStorage.getItem('user'));v
            }
        }, error=>{
            this.toaster.error(error.error['message']);
        });
    }

    onSubmit() {
        this.login(this.loginForm.value);
    }

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
    
}
