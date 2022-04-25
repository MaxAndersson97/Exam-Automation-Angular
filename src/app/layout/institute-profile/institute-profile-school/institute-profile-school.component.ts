import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstituteProfileService } from 'src/app/layout/institute-profile/institute-profile.service';
import { WelcomeService } from 'src/app/welcome/welcome.service';
import * as _ from 'underscore';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { SharedDataService } from 'src/app/services/shared-data.service';
@Component({
  selector: 'app-institute-profile-school',
  templateUrl: './institute-profile-school.component.html',
  styleUrls: ['./institute-profile-school.component.scss']
})
export class InstituteProfileSchoolComponent implements OnInit {

  public schoolProfile;
  public countryList;
  public selectedCountry;
  public stateList;
  localityList: any = [];
  constructor(
    private InstituteProfileService: InstituteProfileService,
     private WelcomeService:WelcomeService, 
     private router:Router, 
     private toast:ToastrService, 
     private sharedData: SharedDataService) {
  }

  ngOnInit() {
    this.InstituteProfileService.getSchoolProfile().subscribe(res => {
      console.log(res);
      this.schoolProfile = res;
      this.schoolProfile['Pincode'] = res['PinCode'];
      let pincodeID =  this.schoolProfile['PincodeId'];
      if(this.schoolProfile['Pincode']){
        let data ={
          'target':{
            'value': this.schoolProfile['Pincode']
          }
      }
        this.getFullAddressDetails(data);
        setTimeout(() => {
          this.schoolProfile['PincodeId'] = pincodeID;
        }, 800);
      }
      this.InstituteProfileService.getCountryList().subscribe(res => {
        this.countryList = res;
        _.map(res, (obj) =>{
          if (obj.CountryName == this.schoolProfile.Country) {
            this.schoolProfile.CountryID = obj.CountryID;
            this.countryChanged();
          }

        })
      });
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toast.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toast.error(error.error['message']);
     }
    });

    this.checkpincode();
  }

  countryChanged() {
    this.InstituteProfileService.getStateList(this.schoolProfile.CountryID).subscribe(res => {
      this.stateList = res;
      var index = _.findIndex(this.stateList,{StateID:this.schoolProfile.StateID});
      if(index < 0){
        this.schoolProfile.StateID = null;
      }
    }, error=>{
      this.stateList = [];
      this.schoolProfile.StateID = null;
    });
  }



  onSubmit() {
    console.log(this.schoolProfile);
    let tempObj = {};
    tempObj["StudentID"] = this.schoolProfile.StudentID;
    tempObj["Address1"] = this.schoolProfile.Address1;
    tempObj["Landmark"] = this.schoolProfile.Landmark;
    tempObj["CountryID"] = this.schoolProfile.CountryID;
    tempObj["StateID"] = this.schoolProfile.StateID;
    tempObj["City"] = this.schoolProfile.City;
    tempObj["PinCode"] = this.schoolProfile.Pincode;
    tempObj['PincodeId']= this.schoolProfile.PincodeId;
    this.InstituteProfileService.submitSchoolDetails(tempObj).subscribe(res => {
      if(res.success){
        this.toast.success(res.message);
        this.WelcomeService.setSchoolDetails();
      this.router.navigate(['/exam/institute-profile/photo'])
      }else{
        this.toast.error(res.message)
      }
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toast.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toast.error(error.error['message']);
     }
    });
  }

  checkpincode(){
    if(this.schoolProfile.Pincode==''){
      console.log('ff');
      this.schoolProfile['CountryName'] = '';
     this.schoolProfile['StateName'] = '';
     this.schoolProfile['CountryID'] ='';
     this.schoolProfile['StateID'] = '';
     this.schoolProfile['City']= '';
     this.schoolProfile['Landmark']='';
     this.schoolProfile['PincodeId']='';
    }
  }

  getFullAddressDetails(event){
    if(this.schoolProfile.Pincode==''){
      console.log('ff');
      this.schoolProfile['CountryName'] = '';
     this.schoolProfile['StateName'] = '';
     this.schoolProfile['CountryID'] ='';
     this.schoolProfile['StateID'] = '';
     this.schoolProfile['City']= '';
     this.schoolProfile['Landmark']='';
     this.schoolProfile['PincodeId']='';
    }
    console.log(event.target.value);
    this.sharedData.getLocality(event.target.value).subscribe(res=>{
     console.log(res);
     this.localityList  =[];
     this.schoolProfile['Pincode'] = event.target.value;
     this.schoolProfile['CountryName'] = '';
     this.schoolProfile['StateName'] = '';
     this.schoolProfile['CountryID'] ='';
     this.schoolProfile['StateID'] = '';
     this.schoolProfile['City']= '';
     this.schoolProfile.PincodeId = '';

        if(res && res['data'] && res['data']['localitydata'] ){
            this.localityList  = res['data']['localitydata'];
            this.schoolProfile['Pincode'] = event.target.value;
            this.schoolProfile['CountryName'] = res['data']['CountryName'].toLowerCase();
            this.schoolProfile['StateName'] = res['data']['StateName'].toLowerCase();
            this.schoolProfile['CountryID'] = res['data']['CountryID'];
            this.schoolProfile['StateID'] = res['data']['StateID'];
            this.schoolProfile['City']= res['data']['DistrictName'].toLowerCase();
        };
    })
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

}
