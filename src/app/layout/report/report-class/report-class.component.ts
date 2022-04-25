import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';
import { TemplateService } from '../../template-setup/template.service';
import { AcademicYearService } from '../../academic-year/academic-year.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import * as Highcharts from 'highcharts';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ExamGroupService } from '../../exam-group/exam-group.service';
import { ModalDirective } from 'ngx-bootstrap';

@Component({
  selector: 'app-report-class',
  templateUrl: './report-class.component.html',
  styleUrls: ['./report-class.component.scss']
})
export class ReportClassComponent implements OnInit {
  @ViewChild('ChapterNameModal') Chapter_Name_Modal: ModalDirective;

  classReportOverallPerformance = [];
  overall_performance_distibution = {};
  rank_and_result: any = {};
  top_performers: any = {};
  bottom_performers: any = {};
  top_improvers: any = [];
  top_decliners: any = [];

  classes: any = [];
  sectionList: any = [];
  subjects: any = [];
  students: any = [];
  studentFilterObj: any = {};
  academicYearsID: any = "";
  ChapterandTopicAnalysisData = [];
  ExamGroups: any = [];
  ClassTestList: any = [];
  ExamsList: any = [];
  preparedChapAnaDataList: any = [];
  noDataFound: boolean = true;
  totalMeanClassScore: number = 0;
  topScoreShowLimit: number = 5;
  BelowScoreShowLimit: number = 5;
  customShowLimit: any;
  BelowcustomShowLimit: any;

  poorValue: any = [];
  avgValue: any = [];
  strongValue: any = [];
  fromAvg: number = 41;
  toAvg: number = 70;
  showFilter: any = false;
  indexValue: number = 0;
  indexValueBelow: number = 0;

  setionsettings: {};
  examGroupsettings: any = {};
  examgroupDataList: any = [];
  academicList: any = [];
  selectedStudents: any = [];
  modelType: any = "";
  isSearchValidate: boolean = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService,
    private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private templateService: TemplateService,
    private academicYearService: AcademicYearService,
    private toastr: ToastrService,
    private examgroupService: ExamGroupService) {

  }

  ngOnInit() {
    this.getInstituteDDLClass();
    this.getAcademicYears();
    this.resetRange();
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

    this.setionsettings = {
      singleSelection: false,
      text: "Select Sections",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      badgeShowLimit: 1,
      itemsShowLimit: 1
    }

  }

  closeDropDown(event) {
    this.showFilter = false;
  }
  showFilterBox() {
    this.showFilter = !this.showFilter;
  }
  setAllRange(from, toAvg) {
    console.log(from, toAvg);
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
    this.studentFilterObj.EA_SectionIDs = null;
    this.studentFilterObj.ExamGroupIds = null;
    this.sectionList = [];

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

  getExamGroupDetails() {
    this.examgroupService.getExamGroupList(0).subscribe(examgroupData => {
      this.examgroupDataList = examgroupData;
      //   this.examgroupDataList.filter((item, indx)=>{
      //     item['itemName'] = item.ExamGroupName;
      //     item['id'] = indx;
      // })
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
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toastr.error(error.error['message']);
      }
    })
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

  chapterTUAnalysis() {
    this.router.navigate(['../ct-understanding-analysis'], { relativeTo: this.route });
  }
  subjectPerformanceReport() {
    this.router.navigate(['../sub-performance-report'], { relativeTo: this.route });

  }

  showResult() {
    let b = [];
    if (this.studentFilterObj['EA_SectionIDs'] && this.studentFilterObj['EA_SectionIDs'][0]) {
      b = this.studentFilterObj['EA_SectionIDs'].map(item => item.AESectionID);
    }
    this.studentFilterObj.fromAvg = this.fromAvg;
    this.studentFilterObj.toAvg = this.toAvg;

    let a = [];
    if (this.studentFilterObj['ExamGroupIds'] && this.studentFilterObj['ExamGroupIds'][0]) {

      this.studentFilterObj['ExamGroupIds'].map(item => a.push(item.ExamGroupID));
    }

    let preprod = {
      "AcademicYearId": this.studentFilterObj['academicYearsID'],
      "ClassId": this.studentFilterObj.ClassID,
      "SectionIds": b,
      "SubjectIds": ["00000000-0000-0000-0000-000000000000"],
      "ExamGroupIds": a,
      // "ExamGroupIds":[this.studentFilterObj.ExamGroupIds],
      "AvgLower": this.studentFilterObj.fromAvg,
      "AvgUpper": this.studentFilterObj.toAvg
    }
    this.sharedService.class_report_overall_performance(preprod).subscribe(res => {
      // console.log(res);
      if (res['success'] && res['data']) {
        this.noDataFound = false;
        this.classReportOverallPerformance = res['data'];
        this.overall_performance_distibution = this.classReportOverallPerformance['overall_performance_distibution'];


        this.renderColumGraph(this.classReportOverallPerformance['overall_performance_distibution']);
        this.renderDonutGraph(this.overall_performance_distibution);
        this.rank_and_result = this.classReportOverallPerformance['rank_and_result'];
        let roverall = [];
        let count = 0;
        this.rank_and_result['data'].forEach((element, indx) => {
          let categories = this.rank_and_result['data'].map(student => student['Name']);
          count = +count + (parseFloat(element['score'].toFixed(2)));
          roverall.push(parseFloat(element['score'].toFixed(2)));

          if (this.rank_and_result['data'].length - 1 == indx) {
            this.totalMeanClassScore = (count / (indx + 1));
            this.renderRememberingGraph(categories, roverall);
          };
        });
        this.top_performers = this.classReportOverallPerformance['top_performers'];
        this.bottom_performers = this.classReportOverallPerformance['bottom_performers'];
        this.top_improvers = this.classReportOverallPerformance['top_improvers'];
        this.top_decliners = this.classReportOverallPerformance['top_decliners'];


      } else {
        this.noDataFound = true;
        this.toastr.error('No data found.');
      }

    }, error => {
      this.noDataFound = true;
      this.toastr.error('Please select valid data.');


    });
  }
  renderDonutGraph(data) {
    // console.log(data['data']);
    let cdata = [];
    let smallObj = ['Poor(' + parseFloat(Number(data['data'][0]['Poor']).toFixed(2)) + ')', parseFloat(Number(data['data'][0]['Poor']).toFixed(2))];
    let MediumObj = ['Average(' + parseFloat(Number(data['data'][0]['Average']).toFixed(2)) + ')', parseFloat(Number(data['data'][0]['Average']).toFixed(2))];
    let strongObj = ['Strong(' + parseFloat(Number(data['data'][0]['Strong']).toFixed(2)) + ')', parseFloat(Number(data['data'][0]['Strong']).toFixed(2))];
    // if(smallObj[0] > 0 && MediumObj[0] > 0 && strongObj[0]> 0)
    cdata = [smallObj, MediumObj, strongObj];
    this.renderDoutGrapgh('Bloom_Chart_Representation', cdata);
  }
  renderColumGraph(item) {
    let prepGraph = [], strong, poor, avg;

    // if(item.hasOwnProperty(['strong_performers'])){
    //   strong = item['strong_performers']['count'] || 0; 
    // }
    // if(item.hasOwnProperty(['average_performers'])){
    //   avg = item['average_performers']['count'] || 0;
    // }
    // if(item.hasOwnProperty(['poor_performers'])){
    //   poor = item['poor_performers']['count'] || 0;

    // }

    let cdata = [];
    poor = parseFloat(Number(item['data'][0]['Poor']).toFixed(2));
    avg = parseFloat(Number(item['data'][0]['Average']).toFixed(2));
    strong = parseFloat(Number(item['data'][0]['Strong']).toFixed(2));


    let poorobj = {
      name: 'Poor',
      y: (poor || 0)
    }

    let avgobj = {
      name: 'Average',
      y: (avg || 0)
    }

    let strongobj = {
      name: 'Strong',
      y: (strong || 0)
    }
    prepGraph = [poorobj, avgobj, strongobj];
    this.renderGrapgh('Exam_Chapter_Composition', prepGraph);
  }

  renderDoutGrapgh(container, series) {
    let options: any = {
      chart: {
        renderTo: 'container',
        type: 'pie'
      },
      plotOptions: {
        pie: {
          colors: [
            '#7357CD',
            '#01CA85',
            '#2FB9E0',
            '#5C67E6',
            '#69BB10'
          ],
          shadow: true
        }
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.point.name + '</b>: ' + this.y + ' %';
        }
      },
      series: [{
        name: 'Performance',
        data: series,
        size: '80%',
        innerSize: '60%',
        showInLegend: true,
        dataLabels: {
          enabled: true
        }
      }]
    }
    setTimeout(() => {
      Highcharts.chart(container, options);
    }, 10);
  }

  renderGrapgh(container, series1) {
    let options: any = {
      chart: {
        type: 'column'
      },
      xAxis: {
        // categories: categories,
        type: 'category',
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
          format: '{value}',
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },

      plotOptions: {
        shadow: true,
      },
      series: [{
        colorByPoint: true,
        // name: 'Performance',
        data: series1,
        colors: [
          '#7357CD',
          '#01CA85',
          '#2FB9E0',
          '#5C67E6',
          '#69BB10'
        ]
      }]
    }
    setTimeout(() => {
      Highcharts.chart(container, options);
    }, 10);
  }

  // result and Rank
  renderRememberingGraph(categories: any[], overall: any[]) {
    let option: any = {

      chart: {
        type: 'spline'
      },
      xAxis: {
        categories: categories,
        crosshair: false,
        type: 'Class Test',

      },

      yAxis: {
        min: 0,
        max: 100,
        tickInterval: 20,
        labels: {
          format: '{value}%',
        }
      },

      tooltip: {
        crosshairs: true,
        shared: true,
        valueSuffix: '%'
      },

      series: [{
        name: 'Student',
        data: overall,
        zIndex: 1,
        color: '#4952B9',
        marker: {
          fillColor: 'white',
          symbol: 'circle',
          lineWidth: 2,
          lineColor: '#4952B9'
        }
      }]
    }
    setTimeout(() => {
      Highcharts.chart('remembering-highcharts-description', option);

    }, 10);
  }

  setPageValue(limit) {
    this.topScoreShowLimit = limit;
  }

  setPageValueBelow(limit) {
    this.BelowScoreShowLimit = limit;

  }

  isPositive(num) {
    if (isNaN(num)) {
      return true;
    } else {
      return (num > 0);
    }
  }

  onItemSelect(item: any) {
    console.log(item);
    //this.isSearchFormValid();
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    //this.isSearchFormValid();
  }
  onSelectAll(items: any) {
    //this.isSearchFormValid();
  }
  onDeSelectAll(items: any) {
    //this.isSearchFormValid();
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
    if (!(!!this.studentFilterObj['academicYearsID'] && !!this.studentFilterObj['EA_SectionIDs'] && !!this.studentFilterObj['ClassID'] && !!this.studentFilterObj['ExamGroupIds'] && !!(this.studentFilterObj['ExamGroupIds'].length > 0) && this.studentFilterObj['EA_SectionIDs'].length > 0)) {
      this.isSearchValidate = false;
      console.log(this.isSearchValidate);
    } else {
      this.isSearchValidate = true;
    }
  }


  studentDetails(item) {
    this.selectedStudents = item['data'];
    console.log(item);
    if (item.hasOwnProperty(['worst_performer'])) {
      this.modelType = 'Worst Performers';
    }
    if (item.hasOwnProperty(['top_average_performer'])) {
      this.modelType = 'Average Performers';
    }
    if (item.hasOwnProperty(['top_strong_performer'])) {
      this.modelType = 'Strong Performers';
    }

    this.Chapter_Name_Modal.show();
  }
  closeModal() {
    this.Chapter_Name_Modal.hide();
    console.log('close btn');
  }
  clearFilter() {
    this.studentFilterObj.academicYearsID = null;
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionIDs = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.ExamGroupIds = null;
    // this.studentFilterObj.SubjectID= null;
    this.sectionList = [];
    this.students = [];
    this.subjects = [];
    this.noDataFound = true;
    this.isSearchFormValid();
    this.getExamGroupDetails();
  }

  academicChnage() {
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionIDs = null;
    this.studentFilterObj.ExamGroupIds = null;
    this.sectionList = [];
    this.getExamGroupDetails();
  }

}
