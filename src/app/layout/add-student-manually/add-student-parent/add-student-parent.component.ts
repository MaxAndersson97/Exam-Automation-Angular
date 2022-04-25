import { Component, OnInit, ɵConsole } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder,Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddStudentParent } from './add-student-parent';
import { AddStudentParentService } from './add-student-parent.service';
import { DropDownService } from 'src/app/commons/drop-down.service';
import { Country } from 'src/app/country';
import { State } from 'src/app/state';
import { StaffService } from 'src/app/services/staff.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-add-student-parent',
  templateUrl: './add-student-parent.component.html',
  styleUrls: ['./add-student-parent.component.scss']
})
export class AddStudentParentComponent implements OnInit {
  studentData: any;
  submitted = false; 
  countries: Array<Country>;
  states: Array<State>;
  localityList: any=[];
  relationships = ['Mother', 'Father'];
  addressChecked: boolean = false;
  addStudentParentForm = this.fb.group({
    Relationship: '',
    StudentID: '', // NOT FOUND
    FirstName: '',
    MiddleName: '',
    LastName: '',
    ParentEmailID: ['', [Validators.maxLength(100), Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
    Address: '',
    Landmark: '',
    CountryID: null,
    StateID:null,
    City: '',
    PincodeId: [''],
    CountryName: null,
    StateName: null,
    Pincode: ['', [ Validators.pattern('^[0-9]{1,6}$'), Validators.minLength(6), Validators.maxLength(6)]],
    AadharNumber: ['', [Validators.pattern('^[0-9]{1,12}$'), Validators.minLength(12), Validators.maxLength(12)]],
    MobileNumber: ['', [Validators.pattern('^[0-9]{10,10}$'), Validators.minLength(10), Validators.maxLength(10)]],
    ParentStudentMappingID: '' // NOT FOUND
  });
  studentId: string;
  isEditMode: boolean= false;
  AcademicYearsID: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private addStudentParentService: AddStudentParentService,
    private dropDownService: DropDownService,
    private route: ActivatedRoute,
    private staffService: StaffService,
    private toastr: ToastrService,
    private sharedData: SharedDataService
  ) {
  }

  ngOnInit() {    
    this.getCountry();
    this.studentData = JSON.parse(localStorage.getItem('studentData'));
    this.studentId = localStorage.getItem('studentId');
    this.AcademicYearsID = localStorage.getItem("academicyr");
    console.log(this.AcademicYearsID);
    if (this.studentId !== null) {
        this.isEditMode = true;        
        this.getStudentDetails();
    }
  }

  getStudentDetails() {   
    this.staffService.getStudentDetail(this.studentId, this.AcademicYearsID).subscribe(res => {
      if (res.success === true) {
            this.isEditMode = true;
            this.populateStaffDetails(res.data.parentdetail);                
        }
    });
}
  populateStaffDetails(parent: any) {
    if(parent != null){
      this.addStudentParentForm.patchValue({
        Relationship: parent.Relationship,
        StudentID: parent.StudentID, // NOT FOUND
        FirstName: parent.FirstName,
        MiddleName: parent.MiddleName,
        LastName: parent.LastName,
        ParentEmailID: parent.ParentEmailID,
        Address: parent.Address,
        Landmark: parent.Landmark,
        CountryID: parent.CountryID,
        StateID: parent.StateID,
        City: parent.City,
        PincodeId: parent.PincodeId,        
        CountryName:  parent.CountryName,
        StateName: parent.StateName,
        Pincode: parent.Pincode,
        AadharNumber: parent.AadharNumber,
        MobileNumber: parent.MobileNumber, // NOT FOUND FIELD NOT AVAILABLE 
        ParentStudentMappingID: parent.ParentStudentMappingID // NOT FOUND
      });
      this.getState(parent);
      let data ={
        'target':{
          'value': parent.Pincode
        }
    }
      this.getFullAddressDetails(data);
      setTimeout(() => {
        this.addStudentParentForm.patchValue({
           PincodeId: parent['PincodeId'] 
        });
      }, 800);
    }
  }

  getFullAddressDetails(event){
    console.log(event.target.value);
    if(event && event.target && event.target.value){
      this.sharedData.getLocality(event.target.value).subscribe(res=>{
        this.localityList = [];
        this.addStudentParentForm.patchValue({ 
               CountryName : null,
               StateName : null,
               CountryID : null,
               StateID : null,
               City: null,
               PincodeId: ['']
           });
           if(res && res['data'] && res['data']['localitydata'] ){
               this.localityList  = res['data']['localitydata'];
               this.addStudentParentForm.patchValue(
               { CountryName : res['data']['CountryName'].toLowerCase(),
               StateName : res['data']['StateName'].toLowerCase(),
               CountryID : res['data']['CountryID'],
               StateID : res['data']['StateID'],
               City: res['data']['DistrictName'].toLowerCase(),
           });
           };
       }, error=>{
         this.localityList = [];
         this.addStudentParentForm.patchValue({ 
                CountryName : null,
                StateName : null,
                CountryID : null,
                StateID : null,
                City: null,
                PincodeId: ['']
            });
       })
    }
}

  sameAsStudent(){
    this.addressChecked = !this.addressChecked;
    if(!this.addressChecked){
      this.addStudentParentForm.patchValue({
        Address: '',
        Landmark: '',
        CountryID: '',
        StateID: '',
        City: '',
        Pincode: '',
        CountryName : '',
        StateName : '',
        PincodeId: ''
      })
    }else{
      this.addStudentParentForm.patchValue({
        Address: this.studentData.Address,
        CountryID: this.studentData.StudentCountryID,
        CountryName : this.studentData.CountryName,
        StateName : this.studentData.StateName,
        StateID: this.studentData.StateID,
        City: this.studentData.City,
        Pincode: this.studentData.Pincode,
        PincodeId: this.studentData.PincodeId,
      });
      this.studentData['CountryID'] =  this.studentData.StudentCountryID;
      this.getState(this.studentData); 
      let data ={
        'target':{
          'value': this.studentData.Pincode
        }
    }
      this.getFullAddressDetails(data);
      setTimeout(() => {
        this.addStudentParentForm.patchValue({
           PincodeId: this.studentData['PincodeId'] 
        });
      }, 800);
    } 
  }
  


  addStudentParent(addStudentParent: AddStudentParent) {
    const addStudentParentSuccess = (data: any) => {
      if (data['success']) {
        
        if(data.message == 'Student Parent updated successfully.'){
          this.toastr.success('Student Parent updated successfully.');
       }else{
         this.toastr.success('Student Parent updated successfully.');
       }
        this.router.navigate(['../photo'], {relativeTo: this.route});
      } else {
      }
    };
    const addStudentParentFailure = (httpError: HttpErrorResponse) => {
      if(httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(httpError.error['message']);
     }
    };
    this.addStudentParentService.addStudentParent(addStudentParent)
      .subscribe(
        addStudentParentSuccess,
        addStudentParentFailure,
        () => 
        console.log('addStudentParent() Request Complete')
      );
  }

  getCountry() {
    const getCountrySuccess = (countries: Array<Country>) => {
      if (countries) {
        this.countries = countries;
        this.addStudentParentForm.patchValue({ StateID: '' });
        // console.log(countries);
      } else {
        // console.log(countries);
      }
    };
    const getCountryFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      // console.log(error, error_description);
    };
    this.dropDownService.getCountry()
      .subscribe(
        getCountrySuccess,
        getCountryFailure,
        () => console.log('getCountry() Request Complete')
      );
  }

  eraseState(){
    this.addStudentParentForm.patchValue({ StateID: '' });
  }
  getState(CountryID) {
    const getStateSuccess = (states: Array<State>) => {      
      if (!!states) {
        this.states = states;
        console.log(states);
      } else {
        console.log(states);
        this.states = [];
      }
      
    };
    const getStateFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
      this.states = [];
      this.addStudentParentForm.patchValue({ StateID: '' });
    };
    this.dropDownService.getState(CountryID.CountryID)
      .subscribe(
        getStateSuccess,
        getStateFailure,
        () => console.log('getState() Request Complete')
      );
  }

  onSubmit() {
    this.submitted = true; 
    this.addStudentParentForm.patchValue({
      StudentID: this.studentData['StudentID']
     })
     this.addStudentParent(this.addStudentParentForm.value);
  }

}
