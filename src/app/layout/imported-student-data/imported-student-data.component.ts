import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Student } from 'src/app/model/student';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import { InstituteService } from 'src/app/institute.service';
import { ToastrService } from 'ngx-toastr';
import { InstituteClass } from '../institute-class';
import { HttpErrorResponse } from '@angular/common/http';
import { GENDER } from 'src/app/Utils/utils';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-imported-student-data',
  templateUrl: './imported-student-data.component.html',
  styleUrls: ['./imported-student-data.component.scss']
})
export class ImportedStudentDataComponent implements OnInit {
  studentData: Student[];
  classes: any;
  genders: any = GENDER;
  countries: any[];
  states: any[];
  ErrorCount: number = 0;
  isFormValid: boolean = true;
  uploadedData: any = {};
  firstLastnameInstruction: string = "Name accepts only alphabates. Minimum 3 characters required."
  aadharInstruction: string = "Aadhar accepts only numeric value. Minimum 12 digits required."
  phoneInstruction: string = "Phone accepts only numeric value. Minimum 10 digits required."
  pinInstruction: string = "Pin code accepts only numeric value. Minimum 6 digits required."
  rollnoInstruction: string = "Roll number accepts only numeric value.";
  admissionInstruction: string = "Admission number accepts only numeric value."

  maxDate: Date;

  constructor(private sharedService: SharedDataService,
    private router: Router,
    private staffService: StaffService,
    private sharedData: SharedDataService,
    private toaster: ToastrService,
    private datePipe: DatePipe,
    private instituteService: InstituteService) {

    let currentDate = new Date();
    this.maxDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 3));

  }

  ngOnInit() {
    this.uploadedData = JSON.parse(localStorage.getItem('uploadData'));
    this.sharedService.currentstudentArray.subscribe(arr => {
      this.studentData = arr;
      this.validateData();
      this.getInstituteDDLClass();
      this.getCountryList();
    });
    console.log(this.studentData);

  }

  validateData() {
    this.studentData.filter((element, index) => {
      element.DOB = this.datePipe.transform(element.DOB, 'dd/MM/yyyy');
      element['isRowValid'] = true;
      element['CountryName'] = element['CountryName'].toUpperCase();
      element['StateName'] = element['StateName'].toUpperCase();
      // element['isStateNameValid'] = true;
      // element['isCountryNameValid'] = true;
      //element['isClassNameValid'] = true;
      element['isFirstNameValid'] = true;
      element['isLastNameValid'] = true;
      element['isPinValid'] = true;
      element['isAadharValid'] = true;
      element['isMobileValid'] = true;
      element['isRollNoValid'] = true;
      element['isAdmissionNoValid'] = true;
      element['isStandardValid'] = true;
      element['isSecEmailValid'] = true;
      element['isusernameValid'] = true;
      element['isparentcontactValid'] = true;
      element['isAddressValid'] = true;

      this.onChangeAadhar(element.AadharNumber, index);
      this.onChangeMobile(element.Mobile, index);
      this.onChangeMobile1(element.objParentInfoMember['MobileNumber'], index);
      this.onChangePin(element.Pincode, index);
      this.changeFirstName(element.Name, index);
      this.changeLastName(element.LastName, index);
      this.onEmailChange(element.Email, index);
      this.onSecEmailChange(element.SecondaryEmail, index);
      this.changeAdmissionNumber(element.AdmissionNumber, index);

      this.changeAddress(element.Address, index);
      this.changeUserName(element.Email, index);
      // this.changeCurrentRollNumber(element.CurrentRollNumber, index);

      if (element.ListUserValidationInfoMember && element.ListUserValidationInfoMember[0]) {
        const errorArray = element.ListUserValidationInfoMember;
        this.toaster.error('We have found some error in Student information, please resolve first.');
        errorArray.filter((chEl, index) => {
          //this.isRowValid(index);
          element['isRowValid'] = false;
          element['isFormValid'] = false;
          switch (chEl.validationFieldName) {

            case 'StateName':
              element['isStateNameValid'] = false;
              element['stateErrorMessage'] = chEl.message;
              break;

            // case 'ClassName':
            //   //element['isClassNameValid'] = false;
            //   element['ClassNameErrorMessage'] = chEl.message;
            //   this.ErrorCount = this.ErrorCount + 1;
            //   break;

            case 'Email':
              element['isEmailValid'] = false;
              element['emailErrorMessage'] = chEl.message;
              break;

            case 'SecondaryEmail':
              element['isSecEmailValid'] = false;
              element['secEmailErrorMessage'] = chEl.message;
              break;

            case 'CountryName':
              element['isCountryNameValid'] = false;
              element['CountryErrorMessage'] = chEl.message;
              break;

            case 'CurrentRollNumber':
              element['isRollNoValid'] = false;
              element['RollNoValidErrorMessage'] = chEl.message;
              console.log("roll number error");
              break;

            case 'AdmissionNumber':
              element['isAdmissionNoValid'] = false;
              element['admissionNoValidErrorMessage'] = chEl.message;
              break;


            case 'Name':
              element['isFirstNameValid'] = false;
              element['FirstNameErrorMessage'] = "Please enter valid First name";
              break;

            case 'LastName':
              element['isLastNameValid'] = false;
              element['LastNameErrorMessage'] = "Please enter valid Last name";
              break;

            default:
              break;
          }
        })
      }
    })


  }

  validateCountry(event, indx) {
    this.studentData[indx]['CountryName'] = event.CountryName;
    this.studentData[indx]['CountryID'] = event.CountryID;
    this.studentData[indx]['isCountryNameValid'] = true;
    this.isRowValid(indx);
  }

  onChangeClass(event: any, indx) {
    this.studentData[indx]['ClassName'] = event.ClassName;
    this.studentData[indx]['ClassID'] = event.ClassID;
    //this.studentData[indx]['isClassNameValid'] = true;
    if (this.ErrorCount > 0) {
      this.ErrorCount = this.ErrorCount - 1;
    }
    this.isRowValid(indx);
  }


  onChangeState(event: any, indx) {
    this.studentData[indx]['StateName'] = event.StateName;
    this.studentData[indx]['StateID'] = event.StateID;
    this.studentData[indx]['isStateNameValid'] = true;
    this.isRowValid(indx);
  }

  onEmailChange(email, indx) {
    let isValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    if (email != undefined && email != null && email != '') {
      if (isValidate) {
        this.studentData[indx]['isEmailValid'] = true;
        this.isRowValid(indx);
      } else {
        this.studentData[indx]['isEmailValid'] = false;
        this.studentData[indx]['emailErrorMessage'] = 'Please enter valid Email';
        this.isRowValid(indx);
      }

    } else {
      this.studentData[indx]['isEmailValid'] = false;
      this.studentData[indx]['emailErrorMessage'] = 'Please enter valid Email';
      this.isRowValid(indx);
    }


  }

  changeFirstName(fisrtname, indx) {
    this.studentData[indx]['isFirstNameNew'] = false;
    this.studentData[indx]['Name'] = fisrtname;
    // const testFirstname = /^[a-zA-Z][a-zA-Z][a-zA-Z]+$/.test(fisrtname);
    const testFirstname = /^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$/.test(fisrtname);
    if (testFirstname && fisrtname != undefined && fisrtname != null) {
      this.studentData[indx]['isFirstNameValid'] = true;

    } else {
      this.studentData[indx]['isFirstNameValid'] = false;
      this.studentData[indx]['FirstNameErrorMessage'] = 'Please enter valid First name.';
    }
    this.isRowValid(indx);
  }
  changeLastName(lastname, indx) {
    console.log(lastname, indx)
    this.studentData[indx]['isLastNameNew'] = false;
    this.studentData[indx]['LastName'] = lastname;
    //const testFirstname = /^[a-zA-Z][a-zA-Z][a-zA-Z]+$/.test(lastname);
    const testFirstname = /^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$/.test(lastname);
    if (testFirstname && lastname != undefined && lastname != null) {
      this.studentData[indx]['isLastNameValid'] = true;
    } else {
      this.studentData[indx]['isLastNameValid'] = false;
      this.studentData[indx]['LastNameErrorMessage'] = 'Please enter valid Last name.';
    }
    this.isRowValid(indx);
  }
  changeAddress(address, indx) {
    debugger
    console.log(address, indx)
    this.studentData[indx]['isAddressNew'] = false;
    this.studentData[indx]['Address'] = address;
    const testAddress = /^([a-zA-z0-9/\\''(),-\s]{15,})$/.test(address);
    if (testAddress && address != undefined && address != null) {
      this.studentData[indx]['isAddressValid'] = true;
    } else {
      this.studentData[indx]['isAddressValid'] = false;
      this.studentData[indx]['AddressErrorMessage'] = 'Please enter valid Address.';
    }
    this.isRowValid(indx);
  }

  changeCurrentRollNumber(rollno, indx) {
    this.studentData[indx]['isRollNoValidNew'] = false;
    // this.studentData[indx]['CurrentRollNumber'] = rollno;
    this.studentData[indx]['CurrentRollNumber'] = "";
    const testFirstname = /^[0-9]/.test(rollno);
    console.log(rollno, testFirstname);
    if (rollno != undefined && rollno != null && rollno != '') {
      if (testFirstname) {
        this.studentData[indx]['isRollNoValid'] = true;
      } else {

        this.studentData[indx]['isRollNoValid'] = false;

      }
    } else {
      this.studentData[indx]['isRollNoValid'] = false;
      this.studentData[indx]['RollNoValidErrorMessage'] = 'Please enter valid Roll number.';
    }
    this.isRowValid(indx);
  }

  changeAdmissionNumber(admission, indx) {
    this.studentData[indx]['isAdmissionNoNew'] = false;
    this.studentData[indx]['AdmissionNumber'] = admission;
    const testFirstname = /^[0-9]/.test(admission);
    console.log(admission, testFirstname);
    if (admission != undefined && admission != null && admission != '') {
      // if (testFirstname) {
      this.studentData[indx]['isAdmissionNoValid'] = true;
      // } else {
      //   this.studentData[indx]['isAdmissionNoValid'] = false;
      //   this.studentData[indx]['admissionNoValidErrorMessage'] = 'Please enter valid Admission number.';

      // }
    }
    else {
      this.studentData[indx]['isAdmissionNoValid'] = false;
      this.studentData[indx]['admissionNoValidErrorMessage'] = 'Please enter valid Admission number.';

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
    this.studentData[indx]['Pincode'] = Pincode;
    const testFirstname = /^[0-9]{6,6}$/.test(Pincode);

    if (Pincode != undefined && Pincode != null && Pincode != '') {
      if (testFirstname) {
        this.studentData[indx]['isPinValid'] = true;
        // if(this.ErrorCount > 0){
        //     this.ErrorCount = this.ErrorCount-1;
        // }
      } else {
        this.studentData[indx]['isPinValid'] = false;
        this.studentData[indx]['pinErrorMessage'] = 'Please enter valid pincode.';
      }
    } else {
      this.studentData[indx]['isPinValid'] = true;
    }
    this.isRowValid(indx);
  }
  onChangeAadhar(AadharNumber, indx) {
    this.studentData[indx]['AadharNumber'] = AadharNumber;
    const testFirstname = /^[0-9]{12,12}$/.test(AadharNumber);

    if (AadharNumber != undefined && AadharNumber != null && AadharNumber != '') {
      if (testFirstname) {
        this.studentData[indx]['isAadharValid'] = true;
      } else {
        this.studentData[indx]['isAadharValid'] = false;
        this.studentData[indx]['aadharErrorMessage'] = 'Please enter valid Aadhar number.';
      }
    } else {
      this.studentData[indx]['isAadharValid'] = true;
    }
    this.isRowValid(indx);
  }

  onSecEmailChange(email, indx) {
    let isValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    if (email != undefined && email != null && email != '') {
      if (isValidate) {
        this.studentData[indx]['isSecEmailValid'] = true;
        if (this.ErrorCount > 0) {
          this.ErrorCount = this.ErrorCount - 1;
        }
        this.isRowValid(indx);
      } else {
        this.studentData[indx]['isSecEmailValid'] = false;
        this.studentData[indx]['secEmailErrorMessage'] = 'Please enter valid Secondary Email';
        this.isRowValid(indx);
      }

    } else {
      this.studentData[indx]['isSecEmailValid'] = false;
      this.studentData[indx]['secEmailErrorMessage'] = 'Please enter valid Secondary Email';
      this.isRowValid(indx);
    }
  }

  changeUserName(email, indx) {
    let isValidate = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email);
    if (email != undefined && email != null && email != '') {
      if (isValidate) {
        this.studentData[indx]['isEmailValid'] = true;
        this.isRowValid(indx);
      } else {
        this.studentData[indx]['isEmailValid'] = false;
        this.studentData[indx]['emailErrorMessage'] = 'Please enter User Name';
        this.isRowValid(indx);
      }

    } else {
      this.studentData[indx]['isEmailValid'] = false;
      this.studentData[indx]['emailErrorMessage'] = 'Please enter User Name';
      this.isRowValid(indx);
    }

  }


  onChangeMobile(Mobile, indx) {
    this.studentData[indx]['Mobile'] = Mobile;
    const testFirstname = /^[0-9]{10,10}/.test(Mobile);
    if (Mobile != undefined && Mobile != null && Mobile != '') {
      if (testFirstname) {
        this.studentData[indx]['isMobileValid'] = true;
      } else {
        this.studentData[indx]['isMobileValid'] = false;
        this.studentData[indx]['mobileErrorMessage'] = 'Please enter valid Mobile number.';
      }
    } else {
      this.studentData[indx]['isMobileValid'] = true;
    }
    this.isRowValid(indx);
  }

  onChangeMobile1(MobileNumber, indx) {
    this.studentData[indx].objParentInfoMember['MobileNumber'] = MobileNumber;
    const testFirstname = /^[0-9]{10,10}/.test(MobileNumber);
    if (MobileNumber != undefined && MobileNumber != null && MobileNumber != '') {
      if (testFirstname) {
        this.studentData[indx]['isparentcontactValid'] = true;
      } else {
        this.studentData[indx]['isparentcontactValid'] = false;
        this.studentData[indx]['parentmobileErrorMessage'] = 'Please enter valid Mobile number.';
      }
    } else {
      this.studentData[indx]['isparentcontactValid'] = true;
    }
    this.isRowValid(indx);
  }

  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes: Array<InstituteClass>) => {
      if (classes) {
        this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
        console.log(classes);
      } else {
        console.log(classes);
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.instituteService.getInstituteDDLClass()
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }

  countryStats = [];
  getCountryList() {
    this.sharedData.countryList().subscribe(response => {
      this.countries = response;

      this.studentData.filter((element, index) => {
        element['CountryName'] = element['CountryName'].toUpperCase();
        this.countries.filter((couelement, idx) => {
          if (element['CountryName'] == couelement['CountryName']) {
            element['CountryName'] = couelement['CountryName'];
            element['CountryID'] = couelement['CountryID'];
            var csIndex = this.countryStats.findIndex((cn) => cn.CountryID == couelement['CountryID'])
            if (!(csIndex >= 0)) {
              this.countryStats.push({
                CountryID: couelement['CountryID'],
                callStatus: false
              })
            }
          }
        })
      })
      for (var i = 0; i < this.countryStats.length; i++) {
        var obj = this.countryStats[i];
        this.onChangeCountry(obj, i);
      }
    })
  };

  onChangeCountry(event: any, i) {
    var countryIndex = (this.countryStats || []).findIndex((c) => c.CountryID == event.CountryID);

    if(countryIndex >= 0 && this.countryStats[countryIndex].callStatus) return;

    if(countryIndex >= 0) {
      this.countryStats[countryIndex].callStatus = true;
    }
    this.sharedData.getStates(event.CountryID).subscribe(response => {
      this.states = response;

      this.studentData.filter((element, index) => {
        element['StateName'] = element['StateName'].toUpperCase();
        this.states.filter((couelement, idx) => {
          if (element['StateName'] == couelement['StateName']) {
            element['StateName'] = couelement['StateName'];
            element['StateID'] = couelement['StateID'];
          }
        })
        // this.studentData[i].StateID = '';
      })
    })
  }

  isRowValid(i) {
    let currentStaff = this.studentData[i];
    if (currentStaff['isFirstNameValid'] && currentStaff['isLastNameValid'] && currentStaff['isPinValid'] && currentStaff['isAadharValid'] && currentStaff['isMobileValid'] && currentStaff['isAdmissionNoValid'] && currentStaff['isSecEmailValid'] && currentStaff['isRollNoValid'] && currentStaff['isEmailValid'] && currentStaff['isparentcontactValid']) {
      this.studentData[i]['isRowValid'] = true;
      this.validateForm();
    } else {
      this.studentData[i]['isRowValid'] = false;
      this.validateForm();
    }
  }
  validateForm() {
    for (let index = 0; index < this.studentData.length; index++) {
      let currentStaff = this.studentData[index];

      if (currentStaff['isRowValid']) {
        this.isFormValid = true;

      } else {
        this.isFormValid = false;
        break;
      }
    }
  }

  OnSaveAndCloseClick() {
    this.staffService.saveMultipleStudent(this.studentData).subscribe(res => {
      console.log(res);
      if (res.success) {
        this.router.navigate(['exam/student']);
        if (this.studentData) {
          localStorage.removeItem('uploadData');
          this.toaster.success('Multiple student added successfully');
        } else {
          this.toaster.error('Please try again...!!');
        }
      } else {
        this.toaster.error(res.message);
      }
    }, error => {
      this.toaster.error(error.error.message);
      this.studentData = error.error['data'];
      this.validateData();
      this.isFormValid = false;
    });
  }



  onDeleteRowClick(student: Student) {
    this.studentData.splice(this.studentData.indexOf(student), 1);
    this.validateForm();

  }

  onAddNewRow() {
    let schoolProfile = JSON.parse(localStorage.getItem('schoolProfile'));
    const uploadData = JSON.parse(localStorage.getItem('uploadData'));
    this.isFormValid = false;
    console.log(schoolProfile, uploadData);
    this.isFormValid = false;
    this.studentData.push(new Student());
    this.studentData[this.studentData.length - 1]['isStateNameValid'] = false;
    this.studentData[this.studentData.length - 1]['isFirstNameValid'] = false;
    this.studentData[this.studentData.length - 1]['isFirstNameNew'] = true;
    this.studentData[this.studentData.length - 1]['isLastNameNew'] = true;
    this.studentData[this.studentData.length - 1]['isLastNameValid'] = false;
    this.studentData[this.studentData.length - 1]['isRowValid'] = false;

    //this.studentData[this.studentData.length - 1]['isClassNameValid'] = false;


    this.studentData[this.studentData.length - 1]['isPinValid'] = true;
    this.studentData[this.studentData.length - 1]['isAadharValid'] = true;
    this.studentData[this.studentData.length - 1]['isMobileValid'] = true;
    this.studentData[this.studentData.length - 1]['isRollNoValid'] = false;
    this.studentData[this.studentData.length - 1]['isRollNoValidNew'] = true;
    this.studentData[this.studentData.length - 1]['isAdmissionNoValid'] = false;
    this.studentData[this.studentData.length - 1]['isAdmissionNoNew'] = true;
    this.studentData[this.studentData.length - 1]['MediumID'] = schoolProfile.MediumID;
    this.studentData[this.studentData.length - 1]['BoardID'] = schoolProfile.BoardID;
    this.studentData[this.studentData.length - 1]['CurrentAcademicSessionID'] = uploadData.AcademicSessionID;

    this.studentData[this.studentData.length - 1]['isSecEmailValid'] = false;
    this.studentData[this.studentData.length - 1]['isEmailValid'] = true;
    this.studentData[this.studentData.length - 1]['ClassID'] = uploadData.ClassID;
    this.studentData[this.studentData.length - 1]['InstituteCode'] = schoolProfile.PartnerCode;
    this.studentData[this.studentData.length - 1]['InstituteID'] = schoolProfile.InstituteID;
    this.studentData[this.studentData.length - 1]['EA_SectionID'] = uploadData.EA_SectionID;
    this.studentData[this.studentData.length - 1]['StudentID'] = "00000000-0000-0000-0000-000000000000";
    this.studentData[this.studentData.length - 1]['UserID'] = "00000000-0000-0000-0000-000000000000";
    this.studentData[this.studentData.length - 1]['Status'] = 0;

  }



}
