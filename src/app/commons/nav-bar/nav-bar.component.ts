import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, NavigationStart , ActivatedRoute} from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';

import {MustMatch} from '../../helpers/must-match.validator';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output('mobileSidenavOpen') sidenavOpener = new EventEmitter<boolean>();
  userProfileInfo: any;
  currentUrl:string;
  isuserstaff:boolean= false;
  userRole:any;
  currentIndex: any;
  username: any;
  @ViewChild('changeStaffStatusModal') changeStaffStatusModal: ModalDirective;

  setNewPasswordFrm: FormGroup;
  togglePasswordBool = false;
  togglePasswordBool_Reset = false;
  noDataFound: boolean = true;
  isWelcomePage: boolean;
  isSmallScreen$: Observable<boolean>;

  constructor(private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder,private sharedService: SharedDataService,
    private toastr: ToastrService, private bpObs: BreakpointObserver) {
      this.isSmallScreen$ = this.bpObs.observe('(max-width: 991px)').pipe(map(bpState => bpState.matches));
      this.isWelcomePage = this.router.url.includes('/welcome');
      this.setNewPasswordFrm = this.formBuilder.group({
        oldpassword: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
        }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  openMobileSidenav() {
    this.sidenavOpener.emit(true);
  }

  ngOnInit() {
    this.isWelcomePage = this.router.url.includes('/welcome');
    this.router.events.pipe(filter((event)=> event instanceof NavigationStart)).subscribe((val:any) => {
     this.currentUrl = val.url;
     this.isWelcomePage = val.url.includes('/welcome') || this.isWelcomePage;
    });

    if(localStorage.getItem('institute') && localStorage.getItem('user')){
    let data= JSON.parse(localStorage.getItem('institute'));
    this.username= data.CurrentUser;

    this.getUserProfile();

    this.userRole = JSON.parse(localStorage.getItem('user')).roles;

    if(this.userRole=='["Teacher"]' || this.userRole=='["Principal"]' || this.userRole=='["VicePrincipal"]'
    || this.userRole=='["Supervisor"]' || this.userRole=='["Director"]'){
      this.isuserstaff = true;
    }

    this.setNewPasswordFrm = this.formBuilder.group({
      oldpassword: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
      }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }
  }

  get fd() { return this.setNewPasswordFrm.controls; }
  setnewpassword(){
    console.log(this.setNewPasswordFrm.value);
    this.changepassword();
  }
  togglePassword(){
    this.togglePasswordBool =  !this.togglePasswordBool;
  }

  togglePasswordReset(){
    this.togglePasswordBool_Reset =  !this.togglePasswordBool_Reset;
  }

  changepassword(){
    const formvalue = this.setNewPasswordFrm.value;
    let preprod = {
      "OldPassword":  formvalue.oldpassword,
      "NewPassword": formvalue.password,
      "ConfirmPassword": formvalue.confirmPassword,
    }
    console.log(preprod);
    this.sharedService.changePassword(preprod).subscribe(res=>{
      console.log(res);
      this.noDataFound = false;
      if(res['EntryStatus']==true && res['Messages']){
        this.toastr.success(res['Messages']);
        this.changeStaffStatusModal.hide();
      }else{
        // this.noDataFound = true;
        if(res['Messages']==="Incorrect password."){
          this.toastr.error("Incorrect Current Password");
        }
        else{
          this.toastr.error(res['Messages']);
        }

      }

    }, error=>{
      // this.noDataFound = true;
      this.toastr.error('Please select valid data.');


    });
  }

  getUserProfile(){
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    if(getUserinfo.roles.indexOf('Partner') != -1){
        this.userProfileInfo = JSON.parse(localStorage.getItem('schoolProfile'));
    }else{
        //let instituteID = JSON.parse(localStorage.getItem('institute'));
        ///console.log(instituteDetails);
        //this.staffService.getStaffDetail(getUserinfo['userID'], instituteID) ;
    }
}

  openProfile(){
    let data= JSON.parse(localStorage.getItem('institute'));
    localStorage.setItem('studentId', data.StudentID);
    localStorage.setItem('InstituteID', data.InstituteID);
    this.currentIndex= 1;
    let baseHref = location.href.split('#')[0];
    console.log(baseHref, 'baselocation');
    // this.router.navigate(['/exam/add-staff-manually/information'], {relativeTo: this.route});
    window.open("#/exam/add-staff-manually/information","_blank")
  }

  public openresetpassword(){
    // this.router.navigate(['/exam/change-password'], {relativeTo: this.route});

    this.setNewPasswordFrm.reset();
    this.changeStaffStatusModal.show();

  }
  closeChangeModal(){
    this.changeStaffStatusModal.hide();
  }

  onLogoutClick() {
      localStorage.clear();
  }
}
