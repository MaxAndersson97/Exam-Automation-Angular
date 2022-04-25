import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstituteProfileService } from 'src/app/layout/institute-profile/institute-profile.service';
import { WelcomeService } from 'src/app/welcome/welcome.service';
import * as _ from 'underscore';
import { InstituteProfileAcademicService } from './institute-profile-academic.service';
import { DatePipe } from '@angular/common';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-institute-profile-academic',
  templateUrl: './institute-profile-academic.component.html',
  styleUrls: ['./institute-profile-academic.component.scss']
})
export class InstituteProfileAcademicComponent implements OnInit {


  instituteForm = this.fb.group({
    WingID: [''],
    WingName: [''],
    WingHeadID: [''],
    InstituteUserID: [''],
    InstituteID: [''],
    ClassIdFrom: [''],
    ClassIdTo: [''],
  });

  public schoolProfile;
  public classValue;
  public minClass;
  public maxClass;
  public classList;
  public ticks;
  public classItem;
  rangeStart: any = '';
  rangeEnd: any = '';
  private nameFormat = [{"value":1,"label":"First | Middle | Last"},{"value":2,"label":"Last | First | Middle"}];
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2,
    private InstituteProfileService: InstituteProfileService,
    private InstituteProfileAcademicService: InstituteProfileAcademicService,
    private WelcomeService: WelcomeService, private ToastrService: ToastrService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    
    this.InstituteProfileService.getSchoolProfile().subscribe(res => {
      this.schoolProfile = res;
      var datePipe = new DatePipe('en-US');
      this.schoolProfile.formateMonth =  datePipe.transform(this.schoolProfile.PeriodFrom, 'MMMM');
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(error.error['message']);
     }
    });
    this.InstituteProfileService.getClassList().subscribe(res => {
      var item = [];
      item =  _.pluck(res,"MasterText");      
      this.classItem =  _.compact(_.uniq(item));
      
      this.minClass = 1;
      this.maxClass = this.classItem.length;
      this.classList = this.classItem;
      this.ticks = [];
      for (var i = 0; i < this.maxClass; i++) {
        this.ticks.push(i+1);
      }
      var {ClassNameFrom, ClassNameTo} = this.WelcomeService.getSchoolProfile();
      this.classList[this.minClass-1] = ClassNameFrom;
     // ClassNameFrom = this.rangeStart;
       this.rangeStart = ClassNameFrom;
      this.rangeEnd = ClassNameTo;
      
      ClassNameFrom = Number(this.rangeStart.replace(/\D+/g, ''));
      ClassNameTo = Number(ClassNameTo.replace(/\D+/g, ''));
     
      this.classValue = [ClassNameFrom,ClassNameTo];
    });
    

  }

  onSubmit() {
    let tempObj = {};
    tempObj["Name"] = this.schoolProfile.PartnerName;
    tempObj["StudentNameFormat"] = this.schoolProfile.StudentNameFormat;
    tempObj["StudentID"] = this.schoolProfile.StudentID;
    tempObj["AffiliationNumber"] = this.schoolProfile.AffiliationNumber;
    tempObj["YearOfEstablishment"] = this.schoolProfile.YearOfEstablishment;
    tempObj["TotalStudentCount"] = this.schoolProfile.TotalStudentCount;
    this.InstituteProfileService.submitAcademicDetails(tempObj).subscribe(res => {
      if(res.success){
        this.ToastrService.success(res.message);
        this.WelcomeService.setSchoolDetails();
        this.router.navigate(['/exam/institute-profile/school'])
      }else{
        this.ToastrService.error(res.message)
      }
     
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastr.error(error.error['message']);
     }
    });
  }
}
