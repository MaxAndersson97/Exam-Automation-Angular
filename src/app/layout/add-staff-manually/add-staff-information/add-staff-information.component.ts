import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Result } from 'src/app/model/result';
import { StaffService } from 'src/app/services/staff.service';
import { Institute } from 'src/app/institute';
import { Staff } from 'src/app/model/staff';
import { MustMatch } from 'src/app/Utils/must-match.validator';
import { STAFFROLES,GENDER, UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import Swal from 'sweetalert2' //for sweet alert
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { InstituteService } from 'src/app/institute.service';
import * as moment from 'moment';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
    selector: 'app-add-staff-information',
    templateUrl: './add-staff-information.component.html',
    styleUrls: ['./add-staff-information.component.scss']
})
export class AddStaffInformationComponent implements OnInit {    
    addStaffForm: FormGroup;  
    submitted = false;  
    studentId: string;
    InstituteID: string;
    bsValue = new Date();    
    maxDate = new Date();
    isEditMode: boolean = false;  
    countries: any;  
    states: any;
    UserId: any;
    roles: any = STAFFROLES;
    genders: any = GENDER;
    // isEdit = false;
    btnUpdate: boolean;
    btnSave:boolean;
    isVerifiedEmail: boolean = false;
    localityList: any =[];
    staffInformationData: any={};
    constructor(
        private router: Router,
        private staffService: StaffService,
        private sharedData: SharedDataService,
        private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private instituteService: InstituteService
    ) {                    
        let currentDate = new Date();
        this.maxDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 18));
        // this.maxDate.setDate(this.maxDate.getDate() - 18 * 365);
        
        // console.log("ggggg",this.maxDate.setDate(this.maxDate.getDate() - 3 * 365));
    }   

    ngOnInit() {
        // this.getCountryList();

        this.addStaffForm = this.formBuilder.group({
            StudentID: [''],
            UserID: [''],
            InstituteID: ['', Validators.required],
            // FirstName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
            FirstName: ['', [Validators.required, Validators.pattern('^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$'),Validators.minLength(3)]],
            // LastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
            LastName: ['', [Validators.required, Validators.pattern('^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$'),Validators.minLength(3)]],
            // MiddleName: ['', [Validators.pattern('[a-zA-Z]+'),Validators.minLength(3)]],
            // MiddleName: ['', [Validators.pattern('^([A-z][A-Za-z]*\s+[A-Za-z]*)|([A-z][A-Za-z]*)$'), Validators.minLength(3)]],
            MiddleName: ['', [Validators.pattern('^([A-z][A-Za-z]*\s+[A-Za-z]*)|([A-z][A-Za-z]*)$'), Validators.minLength(3)]],
            Role: ['', [Validators.required]],
            Gender: [''],
            PincodeId: [''],            
            DOB: [''],
            Address: [''],
            Landmark: [''],
            CountryID: [''],
            CountryName: [''],
            StateID: [''],
            StateName: [''],
            City: [''],
            Pincode: ['', [ Validators.pattern('^[0-9]{6,6}$'), Validators.minLength(6), Validators.maxLength(6)]],
            AadharNumber: ['', [ Validators.pattern('^[0-9]{12,12}$'), Validators.minLength(12), Validators.maxLength(12)]],
            Mobile: [''],            
            Email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            SecondaryEmail: ['', [Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            Password: ['', [Validators.required, Validators.minLength(8)]],
            ConfirmPassword: ['', [Validators.required]],
        }, {
            validator: MustMatch('Password', 'ConfirmPassword')
        });

        //SecondaryEmail: ['', [Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],

        this.studentId = localStorage.getItem('studentId');
        this.InstituteID = localStorage.getItem('InstituteID');
        if (this.studentId !== null) {
            this.isEditMode = true;        
            this.getStaffDetails();
        }
    }
    get f() { return this.addStaffForm.controls; } 
    goBack(){
        this.router.navigate(['/exam/satff'])
        console.log(this.router);
    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }
    getFullAddressDetails(event){
        console.log(event.target.value);
        this.sharedData.getLocality(event.target.value).subscribe(res=>{
         console.log(res);
         this.localityList = [];
         this.addStaffForm.patchValue({ 
                CountryName : null,
                StateName : null,
                CountryID : null,
                StateID : null,
                City: null,
                PincodeId: ['']
            });
            if(res && res['data'] && res['data']['localitydata'] ){
                this.localityList  = res['data']['localitydata'];
                this.addStaffForm.patchValue({ CountryName : res['data']['CountryName'].toLowerCase(),
                StateName : res['data']['StateName'].toLowerCase(),
                CountryID : res['data']['CountryID'],
                StateID : res['data']['StateID'],
                City: res['data']['DistrictName'].toLowerCase(),
            });
            };
        }, error=>{
            this.localityList = [];
            this.addStaffForm.patchValue({ 
                CountryName : null,
                StateName : null,
                CountryID : null,
                StateID : null,
                City: null,
                PincodeId: ['']
            });
        })
    }

    getStaffDetails() {        
        this.staffService.getStaffDetail(this.studentId, this.InstituteID).subscribe(res => {
            if (res.success === true) {
                this.populateStaffDetails(res.data as Staff);
                this.isVerifiedEmail = res.data['IsEmailVerified'];
                this.UserId = res.data['UserID'];
            }
        }, error =>{
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
                this.toastr.warning(UNAUTHERIZEDMESSASGE);
             }else{
                 this.toastr.error(error.error['message']);
             }
        });
    }
    populateStaffDetails(staff: Staff): any {
        this.clearValidation();
        this.btnUpdate = true;
        this.btnSave = true;
        this.staffInformationData = staff;

        var dateformated = moment(staff['DOBFormated'], 'DD/MM/YYYY').toDate(); 

        this.addStaffForm.patchValue({
            StudentID: staff.StudentID,
            InstituteID: staff.InstituteID,
            UserID: staff.UserID,
            FirstName: staff.FirstName,
            LastName: staff.LastName,
            MiddleName: staff.MiddleName,
            
            Role: staff.Role,
            Gender: staff.Gender,
            DOB:staff['DOBFormated'] != "" ? dateformated : '',
            Address: staff.Address,
            Landmark: staff.Landmark,
            CountryID: staff.CountryID,
            CountryName: staff.CountryName,
            StateID: staff.StateID,
            StateName: staff.StateName,
            City: staff.City,
            Pincode: staff.Pincode,
            AadharNumber: staff.AadharNumber,
            Mobile: staff.Mobile,
            Email: staff.Email.toLocaleLowerCase(),
            SecondaryEmail: staff.SecondaryEmail.toLocaleLowerCase(),
            Password: staff.Password,
            ConfirmPassword: staff.ConfirmPassword
        });
        let data ={
            'target':{
              'value': staff.Pincode
            }
        }
        this.getFullAddressDetails(data);
        setTimeout(() => {
            this.addStaffForm.patchValue({
               PincodeId: staff['PincodeId'] 
            });
        }, 800);
    }  
    
    //remove some validations on edit mode
    clearValidation(){      
        this.addStaffForm.get('Role').clearValidators();
        // this.addStaffForm.get('Email').clearValidators();
        // this.addStaffForm.get('SecondaryEmail').clearValidators();
        this.addStaffForm.get('Password').clearValidators();
        this.addStaffForm.get('ConfirmPassword').clearValidators();
    }

    onSubmit() {        
        this.submitted = true;     
        var  datetopost = new Date(this.addStaffForm.get('DOB').value);
        console.log(datetopost.toString());
        const institute: Institute = JSON.parse(localStorage.getItem('institute'));
        if(datetopost.toString() != "Invalid Date") {
            datetopost.setHours(5,30);
            this.addStaffForm.patchValue({
                InstituteID: institute.InstituteID,
                StudentID: this.studentId,
                UserID: this.UserId,
                DOB:datetopost
            });
        } else {
            this.addStaffForm.patchValue({
                InstituteID: institute.InstituteID,
                StudentID: this.studentId,
                UserID: this.UserId
            });
        }
        // stop here if form is invalid
        if (this.addStaffForm.invalid || !(this.addStaffForm.controls.SecondaryEmail.value)) {
            return;
        }
        this.staffService.saveStaff(this.addStaffForm.value).subscribe(res => {
            this.studentId= res.data;
            this.InstituteID = this.instituteService.getInstitute().InstituteID;

            if (res.success === true) {
                this.toastr.success(res.message);
                this.staffService.getStaffDetail(this.studentId, this.InstituteID).subscribe(res => {
                    if (res.success === true) {
                        if(res.data && !!res.data['StudentID']){
                            localStorage.setItem('studentId', this.studentId);
                            this.router.navigate(['/exam/add-staff-manually/staff-photo', res.data['StudentID']]);                
                        }
                    }
                }, error =>{
                    if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
                        this.toastr.warning(UNAUTHERIZEDMESSASGE);
                     }else{
                         this.toastr.error(error.error['message']);
                     }
                });
                
            } else {
            }
        }, error =>{
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
                this.toastr.warning(UNAUTHERIZEDMESSASGE);
             }else{
                 this.toastr.error(error.error['message']);
             }
        });
    }

    avoidSpace(event) {
        var k = event ? event.which : event.keyCode;
        if (k == 32) return false;
    }

    goToPhoto(){
        if(this.staffInformationData && !!this.staffInformationData['StudentID']){
            this.router.navigate(['/exam/add-staff-manually/staff-photo', this.staffInformationData.StudentID]);
        }else{
            this.toastr.info('Please create staff first.');
        }
    }

    verifyEmailID(){
        console.log(this.addStaffForm.get('SecondaryEmail')['value']);
        let prepare = {
            "emailId": this.addStaffForm.get('SecondaryEmail')['value'],
            "StudentId": this.studentId
        }
        this.sharedData.verifyEmailID(prepare).subscribe(res=>{
            console.log(res);
            // this.isVerifiedEmail = true;
            this.toastr.success('Activation mail has been sent on your secondary email, Please check your mailbox to verify your account.');
        }, error=>{
          this.isVerifiedEmail = false;
        })
      }
}

function titleCase(s) { 
    return s
        .replace(/([^A-Z])([A-Z])/g, '$1 $2') // split cameCase
        .replace(/[_\-]+/g, ' ') // split snake_case and lisp-case
        .toLowerCase()
        .replace(/(^\w|\b\w)/g, function(m) { return m.toUpperCase(); }) // title case words
        .replace(/\s+/g, ' ') // collapse repeated whitespace
        .replace(/^\s+|\s+$/, ''); // remove leading/trailing whitespace
  }