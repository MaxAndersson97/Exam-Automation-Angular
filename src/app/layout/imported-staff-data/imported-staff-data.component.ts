import { Component, OnInit, Input } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Staff } from 'src/app/model/staff';
import { StaffService } from 'src/app/services/staff.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { STAFFROLES, GENDER } from 'src/app/Utils/utils';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-imported-staff-data',
    templateUrl: './imported-staff-data.component.html',
    styleUrls: ['./imported-staff-data.component.scss']
})
export class ImportedStaffDataComponent implements OnInit {

    @Input() staffArr: Staff[];
    isError: boolean = false;
    ErrorCount: number = 0;
    countries: any;
    states: any;
    roles: any = STAFFROLES;
    genders: any = GENDER;
    isFormValid: boolean = true;
    firstLastnameInstruction: string = "Name accepts only alphabates. Minimum 3 characters required."
    aadharInstruction: string = "Aadhar accepts only numeric value. Minimum 12 digits required."
    phoneInstruction: string = "Phone accepts only numeric value. Minimum 10 digits required."
    pinInstruction: string = "Pin code accepts only numeric value. Minimum 6 digits required."

    constructor(private sharedService: SharedDataService,
        private staffService: StaffService,
        private toaster: ToastrService,
        private sharedData: SharedDataService,
        private router: Router,
        private datePipe: DatePipe) {
        // var dateFormat = require('dateformat');
        // var now = new Date(dateFormat(now, "dd/mm /yyyy"));
        // console.log("now", now);


    }

    ngOnInit() {

        this.getCountryList();
        this.sharedService.currentStaffArr.subscribe(arr => {
            this.staffArr = arr;
            this.validateData();
        });
    }

    validateData() {

        // let  date = new Date();
        // let formatted = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear();
        // console.log("this.staffArr",formatted);
        this.staffArr.filter((element, index) => {
            element.DOB = this.datePipe.transform(element.DOB, 'dd/MM/yyyy');
            element['isRowValid'] = true;
            element['CountryName'] = element['CountryName'] && element['CountryName'].toUpperCase();
            element['StateName'] =  element['StateName'] && element['StateName'].toUpperCase();
            element['isStateNameValid'] = true;

            element['isEmailValid'] = true;
            element['isCountryNameValid'] = true;
            element['isRoleValid'] = true;
            element['isFirstNameValid'] = true;
            element['isLastNameValid'] = true;
            element['isPinValid'] = true;
            element['isSecEmailValid'] = true;
            element['isAadharValid'] = true;
            element['isMobileValid'] = true;
            element['isFirstNameNew'] = true;
            element['isLastNameNew'] = true;

            this.onChangeAadhar(element.AadharNumber, index);
            this.onChangeMobile1(element.Mobile, index);
            this.onChangePin(element.Pincode, index);
            this.changeFirstName(element.FirstName, index);
            this.changeLastName(element.LastName, index);
            this.onEmailChange(element.Email, index);
            this.onSecEmailChange(element.SecondaryEmail, index);

            if (element.ListUserValidationInfoMember && element.ListUserValidationInfoMember[0]) {
                const errorArray = element.ListUserValidationInfoMember;
                this.toaster.error('We have found some error in Staff information, please resolve first.');
                errorArray.filter((chEl, index) => {
                    this.isRowValid(index);
                    element['isRowValid'] = false;
                    element['isFormValid'] = false;
                    switch (chEl.validationFieldName) {

                        case 'StateName':
                            element['isStateNameValid'] = false;
                            element['stateErrorMessage'] = chEl.message;
                            this.ErrorCount = this.ErrorCount + 1;
                            break;

                        case 'Email':
                            element['isEmailValid'] = false;
                            this.ErrorCount = this.ErrorCount + 1;
                            element['emailErrorMessage'] = chEl.message;
                            break;

                        case 'SecondaryEmail':
                            element['isSecEmailValid'] = false;
                            element['secEmailErrorMessage'] = chEl.message;
                            break;

                        case 'CountryName':
                            element['isCountryNameValid'] = false;
                            this.ErrorCount = this.ErrorCount + 1;
                            element['CountryErrorMessage'] = chEl.message;
                            break;
                        case 'Role':
                            element['isRoleValid'] = false;
                            this.ErrorCount = this.ErrorCount + 1;
                            element['RoleErrorMessage'] = chEl.message;
                            break;
                        case 'FirstName':
                            element['isFirstNameValid'] = false;
                            this.ErrorCount = this.ErrorCount + 1;
                            element['FirstNameErrorMessage'] = "Please enter valid First name";
                            break;

                        case 'LastName':
                            element['isLastNameValid'] = false;
                            this.ErrorCount = this.ErrorCount + 1;
                            element['LastNameErrorMessage'] = "Please enter valid Last name";
                            break;

                        default:
                            break;
                    }
                })
            }
        })


    }

    changeRole(event, indx) {
        //alert('change role.');
        this.staffArr[indx]['Role'] = event.name;
        this.staffArr[indx]['isRoleValid'] = true;
        this.ErrorCount = this.ErrorCount - 1;
        this.isRowValid(indx);
    }

    getCountryList() {
        this.sharedData.countryList().subscribe(response => {
            this.countries = response;
            this.staffArr.filter((element, index) => {
                element['CountryName'] = element['CountryName'].toUpperCase();
                this.countries.filter((couelement, idx) => {
                    if (element['CountryName'] == couelement['CountryName']) {
                        element['CountryName'] = couelement['CountryName'];

                        element['CountryID'] = couelement['CountryID'];
                        this.onChangeCountry(couelement, index);

                    }
                })
            })
        })
    };

    validateCountry(event, indx) {
        this.staffArr[indx]['CountryName'] = event.CountryName;
        this.staffArr[indx]['CountryID'] = event.CountryID;
        this.staffArr[indx]['isCountryNameValid'] = true;
        if (this.ErrorCount > 0) {
            this.ErrorCount = this.ErrorCount - 1;
        }
        console.log(this.ErrorCount);
        this.isRowValid(indx);
    }

    onChangeCountry(event: any, i) {
        this.sharedData.getStates(event.CountryID).subscribe(response => {
            this.states = response;
            this.staffArr.filter((element, index) => {
                element['StateName'] = element['StateName'].toUpperCase();
                this.states.filter((couelement, idx) => {
                    if (element['StateName'] == couelement['StateName']) {
                        element['StateName'] = couelement['StateName'];
                        element['StateID'] = couelement['StateID'];
                    }
                })
                this.staffArr[i].StateID = '';
            })
        })
    }

    onChangeState(event: any, indx) {
        this.staffArr[indx]['StateName'] = event.StateName;
        this.staffArr[indx]['StateID'] = event.StateID;
        this.staffArr[indx]['isStateNameValid'] = true;
        if (this.ErrorCount > 0) {
            this.ErrorCount = this.ErrorCount - 1;
        }
        this.isRowValid(indx);
    }

    onEmailChange(email, indx) {
        let isValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
        if (email != undefined && email != null && email != '') {
            if (isValidate) {
                this.staffArr[indx]['isEmailValid'] = true;
                if (this.ErrorCount > 0) {
                    this.ErrorCount = this.ErrorCount - 1;
                }
                console.log(this.ErrorCount);
                this.isRowValid(indx);
            } else {
                this.staffArr[indx]['isEmailValid'] = false;
                this.staffArr[indx]['emailErrorMessage'] = 'Please enter valid Email';
                this.isRowValid(indx);
            }

        } else {
            this.staffArr[indx]['isEmailValid'] = false;
            this.staffArr[indx]['emailErrorMessage'] = 'Please enter valid Email';
            this.isRowValid(indx);
        }
    }

    onSecEmailChange(email, indx){
        let isValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
        this.staffArr[indx]['SecondaryEmail'] = email;

       if (email != undefined && email != null && email != '') {
            if (isValidate) {
                this.staffArr[indx]['isSecEmailValid'] = true;
                if (this.ErrorCount > 0) {
                    this.ErrorCount = this.ErrorCount - 1;
                }
                this.isRowValid(indx);
            } else {
                this.staffArr[indx]['isSecEmailValid'] = false;
                this.staffArr[indx]['SecEmailErrorMessage'] = 'Please enter valid Secondary Email.';
                this.isRowValid(indx);
            }
        } else {
            this.staffArr[indx]['isSecEmailValid'] = false;
            this.staffArr[indx]['SecEmailErrorMessage'] = 'Please enter valid Secondary Email';
            this.isRowValid(indx);
        }
    }

    changeFirstName(fisrtname, indx) {
      
        this.staffArr[indx]['isFirstNameNew'] = false;
        this.staffArr[indx]['FirstName'] = fisrtname;

        const testFirstname = /^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$/.test(fisrtname);

        if (testFirstname && fisrtname != undefined && fisrtname != null) {
           
            this.staffArr[indx]['isFirstNameValid'] = true;
            if (this.ErrorCount > 0) {
               
                this.ErrorCount = this.ErrorCount - 1;
            }
        } else {
           
            this.staffArr[indx]['isFirstNameValid'] = false;
            this.staffArr[indx]['FirstNameErrorMessage'] = 'Please enter valid First name.';
        }
       
        this.isRowValid(indx);
    }
    // trimValue(event) { event.target.value = event.target.value.trim(); }
    changeLastName(lastname, indx) {
        console.log(lastname, indx)
        this.staffArr[indx]['isLastNameNew'] = false;
        this.staffArr[indx]['LastName'] = lastname;
        // const testFirstname = /^[a-zA-Z][a-zA-Z][a-zA-Z]+$/.test(lastname);

        const testFirstname = /^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$/.test(lastname);

        if (testFirstname && lastname != undefined && lastname != null) {
            this.staffArr[indx]['isLastNameValid'] = true;
            if (this.ErrorCount > 0) {
                this.ErrorCount = this.ErrorCount - 1;
            }
        } else {
            this.staffArr[indx]['isLastNameValid'] = false;
            this.staffArr[indx]['LastNameErrorMessage'] = 'Please enter valid Last name.';
        }
        this.isRowValid(indx);
    }
    numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;

    }
    onChangePin(Pincode, indx) {
        this.staffArr[indx]['Pincode'] = Pincode;
        const testFirstname = /^[0-9]{6,6}$/.test(Pincode);

        if (Pincode != undefined && Pincode != null && Pincode != '') {
            if (testFirstname) {
                this.staffArr[indx]['isPinValid'] = true;
                // if(this.ErrorCount > 0){
                //     this.ErrorCount = this.ErrorCount-1;
                // }
            } else {
                this.staffArr[indx]['isPinValid'] = false;
                this.staffArr[indx]['pinErrorMessage'] = 'Please enter valid pincode.';
            }
        } else {
            this.staffArr[indx]['isPinValid'] = true;
        }
        this.isRowValid(indx);
    }
    onChangeAadhar(AadharNumber, indx) {
        this.staffArr[indx]['AadharNumber'] = AadharNumber;
        const testFirstname = /^[0-9]{12,12}$/.test(AadharNumber);

        if (AadharNumber != undefined && AadharNumber != null && AadharNumber != '') {
            if (testFirstname) {
                this.staffArr[indx]['isAadharValid'] = true;
                // if(this.ErrorCount > 0){
                //     this.ErrorCount = this.ErrorCount-1;
                // }
            } else {
                this.staffArr[indx]['isAadharValid'] = false;
                this.staffArr[indx]['aadharErrorMessage'] = 'Please enter valid Aadhar number.';
            }
        } else {
            this.staffArr[indx]['isAadharValid'] = true;
        }
        this.isRowValid(indx);
    }
    onChangeMobile(Mobile, indx) {
        this.staffArr[indx]['Mobile'] = Mobile;
        const testFirstname = /^[0-9]{10,10}/.test(Mobile);
        if (!this.empty(Mobile)) {
            console.log('mobile', Mobile, testFirstname);
            if (testFirstname) {
                this.staffArr[indx]['isMobileValid'] = true;
                // if(this.ErrorCount > 0){
                //     this.ErrorCount = this.ErrorCount-1;
                // }
            } else {
                this.staffArr[indx]['isMobileValid'] = false;
                this.staffArr[indx]['mobileErrorMessage'] = 'Please enter valid Mobile number.';
            }
        } else {
            console.log('mobile', Mobile, testFirstname);
            this.staffArr[indx]['isMobileValid'] = true;
        }
        console.log(this.ErrorCount, this.staffArr[indx]);
        this.isRowValid(indx);
    }
    empty(str)
{
    if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "")
    {
        return true;
    }
    else
    {
        return false;
    }
    }
    onChangeMobile1(Mobile, indx) {
        this.staffArr[indx]['Mobile'] = Mobile;
        const testFirstname = /^[0-9]{10,10}/.test(Mobile);
        if (!this.empty(Mobile)) {
            console.log('mobile', Mobile, this.empty(Mobile));
            if (testFirstname) {
                this.staffArr[indx]['isMobileValid'] = true;
                // if(this.ErrorCount > 0){
                //     this.ErrorCount = this.ErrorCount-1;
                // }
            } else {
                this.staffArr[indx]['isMobileValid'] = false;
                this.staffArr[indx]['mobileErrorMessage'] = 'Please enter valid Mobile number.';
            }
        } else {
            console.log('mobile', Mobile, testFirstname);
            this.staffArr[indx]['isMobileValid'] = true;
        }
        this.isRowValid(indx);
    }

    emailValidator(c) {
        let isValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(c);
        if (!!c) {
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

    isRowValid(i) {
        let currentStaff = this.staffArr[i];
        if ( currentStaff['isEmailValid'] && currentStaff['isFirstNameValid'] && currentStaff['isLastNameValid'] && currentStaff['isPinValid'] && currentStaff['isAadharValid'] && currentStaff['isMobileValid'] && currentStaff['isRoleValid'] && currentStaff['isSecEmailValid']) {
            this.staffArr[i]['isRowValid'] = true;
            this.validateForm();
        } else {
            this.staffArr[i]['isRowValid'] = false;
            this.validateForm();
        }
    }
    validateForm() {
        for (let index = 0; index < this.staffArr.length; index++) {
            let currentStaff = this.staffArr[index]
            if (currentStaff['isRowValid']) {
                this.isFormValid = true;

            } else {
                this.isFormValid = false;
                break;
            }
        }
    }

    OnSaveAndCloseClick() {
        console.log(this.staffArr);
        this.staffService.saveMultipleStaff(this.staffArr).subscribe(res => {
            this.router.navigate(['exam/staff']);
            if (this.staffArr) {
                this.toaster.success('Multiple staff added successfully');
            } else {
                this.toaster.error('Please try again...!!');
            }

        }, error => {
            this.toaster.error(error.error.message);
            this.staffArr = error.error['data'];
            this.validateData();
        })
    }

    onDeleteRowClick(staff: Staff) {        
        this.staffArr.splice(this.staffArr.indexOf(staff), 1);
        this.validateForm();

    }
    changeDate(event: any, i) {
        console.log(event);

    }

    onAddNewRow() {
        let schoolProfile = JSON.parse(localStorage.getItem('schoolProfile'));
        this.isFormValid = false;
        console.log(schoolProfile);
        this.staffArr.push(new Staff());
        this.staffArr[this.staffArr.length - 1]['isStateNameValid'] = true;
        this.staffArr[this.staffArr.length - 1]['isEmailValid'] = false;
        this.staffArr[this.staffArr.length - 1]['isCountryNameValid'] = true;
        this.staffArr[this.staffArr.length - 1]['isRoleValid'] = false;
        this.staffArr[this.staffArr.length - 1]['isFirstNameValid'] = false;
        this.staffArr[this.staffArr.length - 1]['isFirstNameNew'] = true;
        this.staffArr[this.staffArr.length - 1]['isLastNameNew'] = true;
        this.staffArr[this.staffArr.length - 1]['isLastNameValid'] = false;
        this.staffArr[this.staffArr.length - 1]['isRowValid'] = false;
        this.staffArr[this.staffArr.length - 1]['isPinValid'] = true;
        this.staffArr[this.staffArr.length - 1]['isAadharValid'] = true;
        this.staffArr[this.staffArr.length - 1]['isMobileValid'] = true;
        this.staffArr[this.staffArr.length - 1]['isSecEmailValid'] = true;        
        this.staffArr[this.staffArr.length - 1]['InstituteID'] = schoolProfile['InstituteID'];

    }

    // this will remove only beginning and end of string whitespace.    
    trimming_fn(x) {
        return x ? x.replace(/^\s+|\s+$/gm, '') : '';
    };

}
