import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DropDownService } from 'src/app/commons/drop-down.service';
import { InstituteClass } from '../../institute-class';
import { AddStudentService } from './add-student.service';
import { AddStudent } from './add-student';
import { Country } from 'src/app/country';
import { State } from 'src/app/state';
import { StaffService } from 'src/app/services/staff.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { InstituteService } from 'src/app/institute.service';
import { AcademicYearService } from '../../academic-year/academic-year.service';
import { GENDER, UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import { Student } from 'src/app/model/student';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {
  localityList: any = [];
  classes: Array<InstituteClass>;
  countries: Array<Country>;
  states: Array<State>;
  submitted: boolean = false;
  maxDate: Date;
  sectionList: [];
  sectionlistcheck: [];
  academicYears: any;
  genders: any = GENDER;
  schoolProfile: any;
  addStudentForm = this.fb.group({
    //Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    Name: ['', [Validators.required, Validators.pattern('^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$'),Validators.minLength(3)]],
    MiddleName: ['', [Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    // LastName: ['', [Validators.required, Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    LastName: ['', [Validators.required, Validators.pattern('^([A-z0-9][A-Za-z0-9]*\s+[A-Za-z0-9]*)|([A-z0-9][A-Za-z0-9]*)$'),Validators.minLength(3)]],
    // MotherName: ['', [Validators.pattern('[a-zA-Z]+'), Validators.minLength(3)]],
    MotherName: ['', [Validators.pattern('^([A-z][A-Za-z]*\s+[A-Za-z]*)|([A-z][A-Za-z]*)$'), Validators.minLength(3)]],
    Gender: [''],
    DOB: [''],
    ClassID: ['', Validators.required], //mandatory after discussing with @Shikhi mam
    EA_SectionID: ['', Validators.required], //mandatory after discussing with @Shikhi mam
    AdmissionNumber: ['', [Validators.required]],
    Mobile: ['', [Validators.pattern('^[0-9]{10,10}$'), Validators.minLength(10), Validators.maxLength(10)]],
    // Email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
    Email: ['', [Validators.required, Validators.maxLength(100), Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
      )]],
    CurrentRollNumber: [''],
    Address: [''],
    StudentID: [''],
    PincodeId: [''],
    StudentCountryID: [''],
    CountryName: [''],
    StateID: [''],
    StateName: [''],
    City: [''],
    Pincode: ['', [Validators.pattern('^[0-9]{6,6}$'), Validators.minLength(6), Validators.maxLength(6)]],
    PartnerCode: [''],
    CurrentAcademicSessionID: [''],
    AadharNumber: ['', [Validators.pattern('^[0-9]{12,12}$'), Validators.minLength(12), Validators.maxLength(12)]],
    SecondaryEmail: ['', [Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]]

  });
  studentId: string;
  AcademicYearsID: any;
  InstituteID: string;
  isEditMode: boolean;
  btnUpdate: boolean;
  btnSave: boolean;
  isVerifiedEmail: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dropDownService: DropDownService,
    private addStudentService: AddStudentService,
    private staffService: StaffService,
    private sharedData: SharedDataService,
    private instituteService: InstituteService,
    private academicYearService: AcademicYearService,
    private toaster: ToastrService,
    private addWingService: AddWingService
  ) {
    let currentDate = new Date();
    this.maxDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 3));
  }
  ngOnInit() {
    this.studentId = localStorage.getItem('studentId');
    this.AcademicYearsID = localStorage.getItem("academicyr");
    console.log(this.AcademicYearsID);
 
 
    // this.InstituteID= localStorage.getItem('InstituteID');
    // console.log("aaaaaaaaa", this.studentId);
    
    if (this.studentId !== null) {
      this.isEditMode = true;
      this.getStudentDetails();
    }
    this.getInstituteDDLClass();
    this.getCountry();
    this.getAcademicYears();
    this.schoolProfile = JSON.parse(localStorage.getItem('schoolProfile'));
  }

  getFullAddressDetails(event){
    console.log(event.target.value);
    this.sharedData.getLocality(event.target.value).subscribe(res=>{
     console.log(res);
     this.localityList = [];
     this.addStudentForm.patchValue({ 
            CountryName : null,
            StateName : null,
            CountryID : null,
            StateID : null,
            City: null,
            PincodeId: ['']
        });
        if(res && res['data'] && res['data']['localitydata'] ){
            this.localityList  = res['data']['localitydata'];
            this.addStudentForm.patchValue({ CountryName : res['data']['CountryName'].toLowerCase(),
            StateName : res['data']['StateName'].toLowerCase(),
            CountryID : res['data']['CountryID'],
            StateID : res['data']['StateID'],
            City: res['data']['DistrictName'].toLowerCase(),
        });
        };
      }, error=>{
        this.localityList = [];
        this.addStudentForm.patchValue({ 
            CountryName : null,
            StateName : null,
            CountryID : null,
            StateID : null,
            City: null,
            PincodeId: ['']
        });
      })
}

  getStudentDetails() {
    this.staffService.getStudentDetail(this.studentId,this.AcademicYearsID).subscribe(res => {
      if (res.success === true) {
        this.populateStaffDetails(res.data.studentDetail as Student);
        this.isVerifiedEmail = res.data['StudentRegistration'][0]['IsEmailVerified'];
        console.log(this.isVerifiedEmail);
      }
    }, error => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toaster.error(error.error['message']);
      }
    });
  }
  populateStaffDetails(student: Student): any {
    //this.clearValidation();
    this.btnUpdate = true;
    this.btnSave = true;
    this.setEmailId();
  
    var dateformated;
    if(student['DOBText'] != "31/12/9999") {
      dateformated = moment(student['DOBText'], 'DD/MM/YYYY').toDate(); 
    } else {
      dateformated = '';
    }

    this.addStudentForm.patchValue({
      StudentID: student['StudentID'],
      Name: student['Name'],
      MiddleName: student.MiddleName,
      LastName: student.LastName,
      MotherName: student.MotherName,
      Gender: student.Gender,
      DOB:dateformated,
      ClassID: student.ClassID,
      EA_SectionID: student['EA_SectionID'],
      AdmissionNumber: student.AdmissionNumber,
      Mobile: student.Mobile,
      // Email: this.schoolProfile.PartnerCode + '.' + student.AdmissionNumber ,
      Email: student['EmailID'] ,
      CurrentRollNumber: student.CurrentRollNumber,
      Address: student.Address,
      StudentCountryID: student.StudentCountryID,
      StateID: student.StateID,
      StateName: student.StateName,
      City: student.City,
      PincodeId: student['PincodeId'],
      Pincode: student.Pincode,
      PartnerCode: student.PartnerCode,
      CurrentAcademicSessionID: student.CurrentAcademicSessionID,
      AadharNumber: student.AadharNumber,
      SecondaryEmail: student.SecondaryEmail,
      CountryName: student['CountryName']     
    });
    let data ={
    'target':{
      'value': student.Pincode
    }
    
  }
    this.getFullAddressDetails(data);
    setTimeout(() => {
      this.addStudentForm.patchValue({
         PincodeId: student['PincodeId'] 
      });
  }, 800);
    this.setEmailId();
    this.addStudentService.getSectionByClassID(student.ClassID).subscribe(
      section => {
        this.sectionList = [];
        this.sectionlistcheck = [];
        this.sectionlistcheck = section;
        for (let index = 0; index < this.sectionlistcheck.length; index++) {
          if(this.sectionlistcheck[index]['SectionStatus']!=2){        
            this.sectionList.push(this.sectionlistcheck[index]);
          } 
        }
      }, error => {
      })
    this.getState(student.StudentCountryID);
  }

  getInstituteDDLClass() {
    this.addWingService.getInstituteDDLClass()
      .subscribe(classes => {
        if (classes) {
          this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
        } else {
        }
      }, error => {
      }
      );
  }
  getSectionByClassID(ClassID) {
    if (!!ClassID.ClassID) {
      // console.log(ClassID.ClassID);
    }
    this.addStudentService.getSectionByClassID(ClassID.ClassID).subscribe(
      section => {
        this.sectionList = [];
        this.sectionlistcheck = [];
        this.sectionlistcheck = section;
        for (let index = 0; index < this.sectionlistcheck.length; index++) {
          if(this.sectionlistcheck[index]['SectionStatus']!=2){        
            this.sectionList.push(this.sectionlistcheck[index]);
          } 
        }
        this.addStudentForm.controls['EA_SectionID'].patchValue('');
      }, error => {
        this.sectionList = [];
      }
    )
    //console.log(ClassID);
  }
  getCountry() {
    const getCountrySuccess = (countries: Array<Country>) => {
      if (countries) {
        this.countries = countries;
        // console.log(countries);
      } else {
        // console.log(countries);
      }
    };
    const getCountryFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      this.states = [];
      // console.log(error, error_description);

    };
    this.dropDownService.getCountry()
      .subscribe(
        getCountrySuccess,
        getCountryFailure,
        () => console.log('getCountry() Request Complete')
      );
  }

  getState(CountryID) {
    const getStateSuccess = (states: Array<State>) => {
      if (states) {
        this.states = states;
        // console.log(states);
      } else {
        this.states = [];
        // console.log(states);
      }
    };
    const getStateFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      // console.log(error, error_description);
      this.states = [];
    };
    this.dropDownService.getState(CountryID)
      .subscribe(
        getStateSuccess,
        getStateFailure,
        () => console.log('getState() Request Complete')
      );
  }

  addStudent(addStudent: AddStudent) {
    const addStudentSuccess = (data: any) => 
    {
      if (data.success) {
        addStudent['StudentID'] = data.data;
        localStorage.setItem('studentData', JSON.stringify(addStudent));
        if(data.message == 'student added successfully.'){
           this.toaster.success('Student Added Successfully');
        }else{
          this.toaster.success('Student Updated Successfully');
        }
        this.router.navigate(['../parent'], { relativeTo: this.route });
       
      } else {
         this.toaster.error(data.message);
      }
    };
    const addStudentFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      // console.log(httpError.error['message']);
      if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toaster.error(httpError.error['message']);
      }
    };
    
    this.addStudentService.addStudent(addStudent)
      .subscribe(
        addStudentSuccess,
        addStudentFailure,
        () => console.log('addStudent() Request Complete')
      );
  }
  // convenience getter for easy access to form fields
  get f() { return this.addStudentForm.controls; }
  clearValidation() {

    // this.addStudentForm.get('Name').clearValidators();
    // this.addStudentForm.get('LastName').clearValidators();
    this.addStudentForm.get('ClassID').clearValidators();
    this.addStudentForm.get('EA_SectionID').clearValidators();
    this.addStudentForm.get('AdmissionNumber').clearValidators();
    this.addStudentForm.get('CurrentAcademicSessionID').clearValidators();

  }
  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  onSubmit() {
    this.submitted = true;
    // console.log(this.addStudentForm.value, this.addStudentForm);

    // stop here if form is invalid
    if (this.addStudentForm.invalid) {
      console.log(this.addStudentForm);
      return;
    } else {

      var  datetopost = new Date(this.addStudentForm.get('DOB').value);
      datetopost.setHours(5,30);

      this.addStudentForm.patchValue({
        DOB: datetopost
     });
      this.addStudent(this.addStudentForm.value);
    }
  }
  getCountryList() {
    this.sharedData.countryList().subscribe(response => {
      this.countries = response;
    })
  }
  onChangeCountry(event) {
    if (!this.f.StudentCountryID.value) return
    let countryId = this.f.StudentCountryID.value;
    this.sharedData.getStates(countryId).subscribe(response => {
      this.states = response;
    }, error=>{
      this.states = [];
    })
    this.addStudentForm.patchValue({ StateID: '' });
  }
  onChangeState($event: any) {
    if (!this.f.StateID.value) return
    let stateId = this.f.StateID.value;

  }

  setEmailId() {
    const InstituteID = this.instituteService.getInstitute();

    if (this.addStudentForm.value['AdmissionNumber'] != '' ) {
      // this.addStudentForm.patchValue({Email: this.addStudentForm.value['Email'] })
      this.addStudentForm.patchValue({ Email: this.addStudentForm.value['Email']  });
      this.addStudentForm.patchValue({ PartnerCode: this.schoolProfile.PartnerCode });
    } else {
      this.addStudentForm.patchValue({ Email: null });
    }
    // this.addStudentForm.patchValue({ Email: this.schoolProfile.PartnerCode + '.' + this.addStudentForm.value['AdmissionNumber'] });
  }
  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicYears = [];
      academicYear.filter(academic => {
        if (academic.AcademicStatus == 1) {
          this.academicYears.push(academic);
        }
      })
    };
    const getAcademicYearFailure = (httpError: HttpErrorResponse) => {
      const { error } = httpError;
      if (error) {
        const { error_description } = error;
        this.academicYears = [];
      }
    };
    this.academicYearService.getAcademicYears()
      .subscribe(
        getAcademicYearSuccess,
        getAcademicYearFailure,
        () => console.log('Get AcademicYears Request Complete')
      );

  }
  avoidSpace(event) {
    var k = event ? event.which : event.keyCode;
    if (k == 32) return false;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;

}

verifyEmailID(){
  let prepare = {
    "emailId": this.addStudentForm.get('SecondaryEmail')['value'],
    "StudentId": this.studentId
}
  this.sharedData.verifyEmailID(prepare).subscribe(res=>{
      console.log(res);
      // this.isVerifiedEmail = true;
      this.toaster.success('Activation mail has been sent on your secondary email, Please check your mailbox to verify your account.');

  }, error=>{
    this.isVerifiedEmail = false;
  })
}
  //   toTitleCase(str) {
  //     return str.replace(
  //         /\w\S*/g,
  //         function(txt) {
  //             return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  //         }
  //     );
  // }

}
