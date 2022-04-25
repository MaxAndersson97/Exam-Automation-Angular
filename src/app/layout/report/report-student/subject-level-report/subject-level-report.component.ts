import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { AddStudentService } from 'src/app/layout/add-student-manually/add-student/add-student.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ExamGroupService } from 'src/app/layout/exam-group/exam-group.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';
import * as Highcharts from 'highcharts';
import * as _ from 'underscore';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
// import * as CanvasJS from '../../../../../assets/canvasjs.min';
// assets/download/CanvasJS.min.js
@Component({
  selector: 'app-subject-level-report',
  templateUrl: './subject-level-report.component.html',
  styleUrls: ['./subject-level-report.component.scss']
})
export class SubjectLevelReportComponent implements OnInit {
  classes: any = [];
  sectionList: any = [];
  subjects: any = [];
  students: any = [];
  studentFilterObj: any = {};
  academicYearsID: any = "";
  SubjectLevelData = [];
  ExamGroups: any = [];
  ClassTestList: any = [];
  ExamsList: any = [];
  preparedChapAnaDataList: any = [];
  examgroupDataList: any = [];
  examGroupsettings: any = {};
  noDataFound: boolean = true;
  rank: any;
  currentStudent: any;
  academicList: any = [];
  isSearchValid: boolean = false;
  constructor(private shareService: SharedDataService, private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private templateService: TemplateService,
    private academicYearService: AcademicYearService, private examgroupService: ExamGroupService, private toaster: ToastrService, private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.getAcademicYears();
    this.getInstituteDDLClass();
    this.getExamGroupDetails();
    this.examGroupsettings = {
      singleSelection: false,
      text: "Select Exam Group",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: false,
      badgeShowLimit: 1,
      itemsShowLimit: 1,
      groupBy: "category"
    };
  }


  renderGrapgh(categories, series1, series2) {
    console.log(categories, series1, series2)
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
        pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },
      plotOptions: {
        column: {
          pointPadding: 0.1,
          borderWidth: 0
        }
      },
      series: [{
        name: series1.name,
        data: series1.data,
        color: '#00A1FF',

      }, {
        name: series2.name,
        data: series2.data,
        color: '#7357CD',

      }]
    }
    setTimeout(() => {
      Highcharts.chart('student-chart-container', options);

    }, 10);
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

    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.ExamGroupIds = null;
    this.sectionList = [];
    this.students = [];

    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section.filter((d: any) => d.SectionStatus == 1);
      }, error => {
        this.sectionList = [];
      }
    )
  }

  onChangeStudent(currentStudent) {
    console.log(currentStudent['selectedValues'][0]['StudentName']);
    this.currentStudent = currentStudent['selectedValues'][0]['StudentName'];
  }

  getStudentBySection() {
    this.studentFilterObj['StudentID'] = null;
    if (!!this.studentFilterObj.EA_SectionID && !!this.studentFilterObj.ClassID) {
      let data = {
        //"AcademicYearID": this.academicYearsID,
        "AcademicYearID": this.studentFilterObj.academicYearsID,
        "ClassID": this.studentFilterObj.ClassID,
        "SectionID": [this.studentFilterObj.EA_SectionID]
      }
      this.shareService.studentListBySection(data).subscribe(res => {
        this.students = res[0]['LstStudentData'];
        console.log(this.students);
      }, error => {
        this.students = [];
      })
    }

  }

  getExamGroupDetails() {
    this.examgroupService.getExamGroupList(0).subscribe(examgroupData => {
      this.examgroupDataList = examgroupData;
      this.examgroupDataList.filter((item, indx) => {
        item['itemName'] = item.ExamGroupName;
        item['id'] = indx;
        if (item.PaperType == 1) {
          item.category = 'Exam';
        } else {
          item.category = 'Test';
        }
      })

    }, (error) => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toaster.error(error.error['message']);
      }
    })
  }

  getStudentSubjectWiseReport(prepareData) {
    this.shareService.getStudentSubjectWiseReport(prepareData).subscribe(res => {
      console.log(res);
      this.rank = res['rank'];
      if (res['success']) {
        this.noDataFound = false;
        this.SubjectLevelData = res['data'];
        let categories = [], series1 = [], series2 = [];
        let overallData = [];
        let class_avgData = [];
        _.groupBy(this.SubjectLevelData, 'SubjectName');
        this.SubjectLevelData.forEach((ele, indx) => {
          let a = ele.SubjectName;

          if (categories.indexOf(a) == -1) {
            categories.push(titleCase(a));
          }
          overallData.push(parseFloat((ele.overall).toFixed(2)));
          class_avgData.push(parseFloat((ele.class_avg).toFixed(2)));
          if (this.SubjectLevelData.length - 1 == indx) {
            series1['name'] = 'Overall Performance';
            series1['data'] = overallData;
            series2['name'] = 'Class Avg Score ';
            series2['data'] = class_avgData;

            this.renderGrapgh(categories, series1, series2);
          }
        });
      } else {
        this.noDataFound = true;
        this.toaster.error('No data found');

      }


    }, error => {
      this.noDataFound = true;
      this.toaster.error('Please select valid data');
    })
  }

  showResult() {
    let a = [];
    if (this.studentFilterObj['ExamGroupIds'] && this.studentFilterObj['ExamGroupIds'][0]) {

      this.studentFilterObj['ExamGroupIds'].map(item => a.push(item.ExamGroupID));
    }

    let prepareData = {
      "AcademicYearId": this.studentFilterObj['academicYearsID'],
      "ClassId": this.studentFilterObj['ClassID'],
      "SectionIds": [this.studentFilterObj['EA_SectionID']],
      "StudentId": this.studentFilterObj['StudentID'],
      "ExamGroupIds": a
    }
    this.getStudentSubjectWiseReport(prepareData);
  }

  onItemSelect(item: any) {
    this.isSearchFormValid();
  }
  OnItemDeSelect(item: any) {
    this.isSearchFormValid();
  }
  onSelectAll(items: any) {
    this.isSearchFormValid();
  }
  onDeSelectAll(items: any) {
    this.isSearchFormValid();
  }


  isSearchFormValid() {
    if (!(!!this.studentFilterObj['academicYearsID'] && !!this.studentFilterObj['EA_SectionID'] && !!this.studentFilterObj['ClassID'] && !!this.studentFilterObj['ExamGroupIds'] && !!(this.studentFilterObj['ExamGroupIds'].length > 0) && !!this.studentFilterObj['StudentID'])) {
      this.isSearchValid = false;
    } else {
      this.isSearchValid = true;
    }
  }
  gotoLearning() {
    this.router.navigate(['../learning-curve'], { relativeTo: this.route });
  }

  getocomplexity() {
    this.router.navigate(['../complexity-analysis'], { relativeTo: this.route });
  }

  goToChapterAnalysis() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  clearFilter() {
    this.studentFilterObj.academicYearsID = null;
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.ExamGroupIds = null;
    this.getExamGroupDetails();
    this.sectionList = [];
    this.students = [];
    this.noDataFound = true;
    this.isSearchFormValid();
  }

  academicChnage() {
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.ExamGroupIds = null;
    this.sectionList = [];
    this.students = [];
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