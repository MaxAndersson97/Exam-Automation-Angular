import { Component, OnInit, ɵConsole } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { AddStudentService } from 'src/app/layout/add-student-manually/add-student/add-student.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { ExamGroupService } from 'src/app/layout/exam-group/exam-group.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as Highcharts from 'highcharts';

import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-subject-performance',
  templateUrl: './subject-performance.component.html',
  styleUrls: ['./subject-performance.component.scss']
})
export class SubjectPerformanceComponent implements OnInit {
  classes: any = [];
  sectionList: any = [];
  subjects: any = [];
  studentFilterObj: any = {
    EA_SectionIDs: null
  };
  academicYearsID: any = "";
  SubjectLevelData = [];
  ExamGroups: any = [];
  ClassTestList: any = [];
  ExamsList: any = [];
  preparedChapAnaDataList: any = [];
  noDataFound: boolean = true;
  setionsettings: {};


  poorValue: any = [];
  avgValue: any = [];
  strongValue: any = [];
  fromAvg: number = 41;
  toAvg: number = 70;
  showFilter: any = false;
  academicList: any = [];
  isSearchValid: boolean = false;
  constructor(private shareService: SharedDataService, private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private templateService: TemplateService,
    private academicYearService: AcademicYearService, private examgroupService: ExamGroupService, private toaster: ToastrService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getAcademicYears();
    this.getInstituteDDLClass();
    this.resetRange();
    this.setionsettings = {
      singleSelection: false,
      text: "Select Sections",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      badgeShowLimit: 1,
      itemsShowLimit: 1
    }
  }


  showFilterBox() {
    this.showFilter = !this.showFilter;
  }

  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicList = academicYear.filter(x => x.AcademicStatus === 1);
      // academicYear.filter(academic => {
      //   if (academic.AcademicStatus == 1) {
      //     this.academicYearsID = academic.AcademicYearID;
      //     this.academicList.push(academic);
      //   }
      // })
    };
    const getAcademicYearFailure = (httpError: HttpErrorResponse) => {
      const { error } = httpError;
      if (error) {
        const { error_description } = error;
        this.academicYearsID = "";
      }
    };
    this.academicYearService.getAcademicYears()
      .subscribe(
        getAcademicYearSuccess,
        getAcademicYearFailure,
        () => console.log('Get AcademicYears Request Complete')
      );
  }
  getInstituteDDLClass() {
    this.studentFilterObj.EA_SectionIDs = null;
    this.sectionList = [];

    this.addWingService.getInstituteDDLClass()
      .subscribe(classes => {
        if (classes) {
          this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
        }
      }, error => {
      }
      );
  }

  getSectionByClassID(ClassID) {
    this.studentFilterObj['EA_SectionIDs'] = null;
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section.filter((d: any) => d.SectionStatus == 1);
        this.sectionList.filter((item, indx) => {
          item['itemName'] = item.SectionName;
          item['id'] = indx;
        })
      }, error => {
      }
    )
  }

  onItemSelect1(item: any) {
    this.isSearchFormValid();
  }
  OnItemDeSelect1(item: any) {
    this.isSearchFormValid();

  }
  onSelectAll1(items: any) {
    this.isSearchFormValid();

  }
  onDeSelectAll1(items: any) {
    this.isSearchFormValid();

  }

  isSearchFormValid() {
    if (!(!!this.studentFilterObj['academicYearsID'] && !!this.studentFilterObj['EA_SectionIDs'] && this.studentFilterObj['EA_SectionIDs'].length > 0 && !!this.studentFilterObj['ClassID'])) {
      this.isSearchValid = false;
    } else {
      this.isSearchValid = true;
    }
  }
  showResult() {

    this.studentFilterObj.fromAvg = this.fromAvg;
    this.studentFilterObj.toAvg = this.toAvg;

    let b = [];
    if (this.studentFilterObj['EA_SectionIDs'] && this.studentFilterObj['EA_SectionIDs'][0]) {
      b = this.studentFilterObj['EA_SectionIDs'].map(item => item.AESectionID);
    }

    let prepareData = {
      "AcademicYearId": this.studentFilterObj['academicYearsID'],
      "ClassId": this.studentFilterObj['ClassID'],
      "SectionIds": b,
      "AvgLower": this.studentFilterObj['fromAvg'],
      "AvgUpper": this.studentFilterObj['toAvg']
    }
    this.shareService.getSubjectPerformance(prepareData).subscribe(res => {
      if (res['success'] && res['data'].length > 0) {
        this.noDataFound = false;
        let strong = [], avg = [], poor = [];
        this.preparedChapAnaDataList = res['data'];
        let allSubjectNames = this.preparedChapAnaDataList.map(item => titleCase(item.SubjectName));
        this.preparedChapAnaDataList.map((item, indx) => {
          let sumOfAll = 0;
          if (item.Strong != 'NaN' && item.Average != 'NaN' && item.Poor != 'NaN') {
            sumOfAll = item.Strong + item.Average + item.Poor;
          } else if (item.Strong == 'NaN') {
            sumOfAll = item.Average + item.Poor;
          } else if (item.Average == 'NaN') {
            sumOfAll = item.Strong + item.Poor;

          } else {
            sumOfAll = item.Strong + item.Average;
          }

          let Strong = (item.Strong !== 'NaN' && !!item.Strong) ? (item.Strong / (sumOfAll)) * 100 : 0;
          let Average = (item.Average !== 'NaN' && !!item.Average) ? (item.Average / (sumOfAll)) * 100 : 0;
          let Poor = (item.Poor !== 'NaN' && !!item.Poor) ? (item.Poor / (sumOfAll)) * 100 : 0;
          strong.push(parseFloat(Strong.toFixed(2)));
          avg.push(parseFloat(Average.toFixed(2)));
          poor.push(parseFloat(Poor.toFixed(2)));

          if (this.preparedChapAnaDataList.length - 1 == indx) {
            console.log(allSubjectNames, strong, avg, poor);
            this.renderGrapgh(allSubjectNames, strong, avg, poor);

          }
        });
      } else {
        this.noDataFound = true;
        this.toaster.error('No data found.');
      }
    }, error => {
      this.noDataFound = true;
      this.toaster.error('Something went wrong.');
    });
  }


  renderGrapgh(categories, series1, series2, series3) {
    let options: any = {
      chart: {
        type: 'column'
      },
      xAxis: {
        categories: categories,
        crosshair: false
      },
      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        title: {
          text: ''
        },
        labels: {
          format: '{value}%',
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color};padding:0">{point.y:.1f}%</span>'

      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          borderWidth: 0
        }
      },
      series: [{
        name: 'Strong',
        data: series1,
        color: '#5C67E6',

      }, {
        name: 'Average',
        data: series2,
        color: '#01CA85',

      },
      {
        name: 'Poor',
        data: series3,
        color: '#00A1FF',

      }]
    }
    setTimeout(() => {
      Highcharts.chart('subject-performance-chart', options);

    }, 10);
  }

  setAllRange(from, toAvg) {

    if (from > 0 && toAvg > 0 && toAvg > from) {
      this.poorValue = [0, from - 1];
      this.avgValue = [from, toAvg];
      this.strongValue = [toAvg + 1, 100];
    }
  }

  resetRange() {
    this.poorValue = [0, 40];
    this.avgValue = [41, 70];
    this.strongValue = [71, 100];
    this.fromAvg = 41;
    this.toAvg = 70;
  }

  saveRange() {
    this.studentFilterObj.fromAvg = this.fromAvg;
    this.studentFilterObj.toAvg = this.toAvg;
    this.showFilterBox();

    this.showResult();
  }

  chapterTUAnalysis() {
    this.router.navigate(['../ct-understanding-analysis'], { relativeTo: this.route });

  }

  overallperformance() {
    this.router.navigate(['../overall-performance-analysis'], { relativeTo: this.route });

  }

  closeDropDown(event) {
    this.showFilter = false;
  }

  clearFilter() {
    this.studentFilterObj.academicYearsID = null;
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionIDs = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.ExamGroupIds = null;
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];
    // this.students=[];
    this.subjects = [];
    this.noDataFound = true;
    // this.isSearchFormValid();
    // this.getExamGroupDetails();
  }

  academicChnage() {
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionIDs = null;
    this.sectionList = [];
  }

}

function titleCase(s) {
  return s
    .replace(/([^A-Z])([A-Z])/g, '$1 $2') // split cameCase
    .replace(/[_\-]+/g, ' ') // split snake_case and lisp-case
    .toLowerCase()
    .replace(/(^\w|\b\w)/g, function (m) { return m.toUpperCase(); }) // title case words
    .replace(/\s+/g, ' ') // collapse repeated whitespace
    .replace(/^\s+|\s+$/, ''); // remove leading/trailing whitespace
}