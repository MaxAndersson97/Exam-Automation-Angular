import { Component, OnInit } from '@angular/core';
import { AcademicYearService } from './academic-year.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';


@Component({
  selector: 'app-academic-year',
  templateUrl: './academic-year.component.html',
  styleUrls: ['./academic-year.component.scss']
})
export class AcademicYearComponent implements OnInit {
  isNoAcademicDataAvailable:boolean;
  private academicYears;

  constructor(
    private academicYearService: AcademicYearService,private toastService: ToastrService) {
  }

  ngOnInit() {
    this.getAcademicYears();
  }
  
  
  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicYears = academicYear;
      this.isNoAcademicDataAvailable = true;
    };
    const getAcademicYearFailure = (httpError: HttpErrorResponse) => {
      const { error } = httpError;
      this.isNoAcademicDataAvailable = false;
      // console.log("DDDDDDDD",httpError.error['message']);
      if(httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toastService.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toastService.error(httpError.error['message']);
     }
    };
    this.academicYearService.getAcademicYears()
      .subscribe(
        getAcademicYearSuccess,
        getAcademicYearFailure,
        () => console.log('Get AcademicYears Request Complete')
      );
  }

  titlecaseClassName(className){
    return _.chain(className.split(" ")).map(function(str){
      var tempStr = str.toLowerCase();
      return tempStr.charAt(0).toUpperCase() + tempStr.slice(1);
    }).value().join(" ");
  }

}
