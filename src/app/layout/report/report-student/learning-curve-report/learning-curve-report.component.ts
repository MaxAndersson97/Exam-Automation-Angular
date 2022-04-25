import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { AddStudentService } from 'src/app/layout/add-student-manually/add-student/add-student.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import { ExamGroupService } from 'src/app/layout/exam-group/exam-group.service';
import * as Highcharts from 'highcharts';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-learning-curve-report',
  templateUrl: './learning-curve-report.component.html',
  styleUrls: ['./learning-curve-report.component.scss']
})

export class LearningCurveReportComponent implements OnInit {
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
  subwise_learning_objective_summary: any = [];
  learning_ability_performance: any = [];
  total_subject: any = [];
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
        "AcademicYearID": this.studentFilterObj['academicYearsID'],
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

  getStudentLearningCurveReport(prepareData) {
    this.shareService.getStudentLearningCurveReport1(prepareData).subscribe(res => {
      console.log(res);

      if (res['success'] && res['data']) {
        this.noDataFound = false;
        this.SubjectLevelData = res['data']['overall_learning_summary']['data'];
        this.subwise_learning_objective_summary = res['data']['subwise_learning_objective_summary']['data'];

        this.learning_ability_performance = res['data']['learning_ability_performance'];
        this.total_subject = res['data']['subwise_learning_objective_summary']['subject_names'];
        this.rank = res['data']['overall_learning_summary']['rank'];
        let categories = [], series1 = [], series2 = [];
        let overallData = [];
        let class_avgData = [];
        this.drawMiddileGraph(this.learning_ability_performance);
        this.SubjectLevelData.forEach((ele, indx) => {
          let a = ele.BloomTaxonomyName;

          if (categories.indexOf(a) == -1) {
            categories.push(titleCase(a));
          }
          overallData.push(parseFloat(ele.overall.toFixed(2)));
          class_avgData.push(parseFloat(ele.class_avg.toFixed(2)));

          if (this.SubjectLevelData.length - 1 == indx) {
            series1['name'] = 'Overall Performance';
            series1['data'] = overallData;
            series2['name'] = 'Class Avg Score ';
            series2['data'] = class_avgData;

            this.renderGrapgh(categories, series1, series2);
          }
        });

        let anlysis = [], remembering = [], application = [], creating = [], understanding = [], evaluation = [], myseries1 = [], myseries2 = [], myseries3 = [], myseries4 = [], myseries5 = [], myseries6 = [];
        let totalseries = {};

        this.subwise_learning_objective_summary.forEach((element, index) => {
          if (element['BloomTaxonomyName'] == 'ANALYSIS')
            anlysis.push(element);

          if (element['BloomTaxonomyName'] == 'REMEMBERING')
            remembering.push(element);

          if (element['BloomTaxonomyName'] == 'APPLICATION')
            application.push(element);

          if (element['BloomTaxonomyName'] == 'CREATING')
            creating.push(element);

          if (element['BloomTaxonomyName'] == 'UNDERSTANDING')
            understanding.push(element);

          if (element['BloomTaxonomyName'] == 'EVALUATION')
            evaluation.push(element);
        })
        let anaysisdata = [], rememberingdata = [], applicationdata = [], creatingdata = [], understandingdata = [], evalutiondata = [];
        anlysis.forEach((element, index) => {
          anaysisdata = element;
        })
        remembering.forEach((element, index) => {
          rememberingdata = element;
        })
        application.forEach((element, index) => {
          applicationdata = element;
        })
        creating.forEach((element, index) => {
          creatingdata = element;
        })
        understanding.forEach((element, index) => {
          understandingdata = element;
        })
        evaluation.forEach((element, index) => {
          evalutiondata = element;
        })
        anaysisdata = Object.values(anaysisdata);
        anaysisdata.splice(0, 1);
        rememberingdata = Object.values(rememberingdata);
        rememberingdata.splice(0, 1);
        applicationdata = Object.values(applicationdata);
        applicationdata.splice(0, 1);
        creatingdata = Object.values(creatingdata);
        creatingdata.splice(0, 1);
        understandingdata = Object.values(understandingdata);
        understandingdata.splice(0, 1);
        evalutiondata = Object.values(evalutiondata);
        evalutiondata.splice(0, 1);
        console.log(rememberingdata);

        for (var i = 0, n = anaysisdata.length; i < n; ++i) {
          if (anaysisdata[i] != "NaN") {
            anaysisdata[i] = parseFloat(anaysisdata[i].toFixed(2));
          }
        }
        for (var i = 0, n = rememberingdata.length; i < n; ++i) {
          if (rememberingdata[i] != "NaN") {
            rememberingdata[i] = parseFloat(rememberingdata[i].toFixed(2));
          }
        }
        for (var i = 0, n = applicationdata.length; i < n; ++i) {
          if (applicationdata[i] != "NaN") {
            applicationdata[i] = parseFloat(applicationdata[i].toFixed(2));
          }
        }
        for (var i = 0, n = creatingdata.length; i < n; ++i) {
          if (creatingdata[i] != "NaN") {
            creatingdata[i] = parseFloat(creatingdata[i].toFixed(2));
          }
        }
        for (var i = 0, n = understandingdata.length; i < n; ++i) {
          if (understandingdata[i] != "NaN") {
            understandingdata[i] = parseFloat(understandingdata[i].toFixed(2));
          }
        }
        for (var i = 0, n = evalutiondata.length; i < n; ++i) {
          if (evalutiondata[i] != "NaN") {
            evalutiondata[i] = parseFloat(evalutiondata[i].toFixed(2));
          }
        }


        this.total_subject.forEach((element, index) => {
          // this.subwise_learning_objective_summary.forEach((ele, indx) => {
          //   if(ele['BloomTaxonomyName'] == 'ANALYSIS'){}
          // anlysis.push(ele);
          // anlysis.push(parseFloat(ele[element].toFixed(2)));

          // if(ele['BloomTaxonomyName'] == 'REMEMBERING')
          //   remembering.push(parseFloat(ele[element].toFixed(2)));

          // if(ele['BloomTaxonomyName'] == 'APPLICATION')
          // application.push(parseFloat(ele[element].toFixed(2)));

          // if(ele['BloomTaxonomyName'] == 'CREATING')
          // creating.push(parseFloat(ele[element].toFixed(2)));

          // if(ele['BloomTaxonomyName'] == 'UNDERSTANDING')
          // understanding.push(parseFloat(ele[element].toFixed(2)));

          // if(ele['BloomTaxonomyName'] == 'EVALUATION')
          // evaluation.push(parseFloat(ele[element].toFixed(2)));

          // });
          // console.log(anlysis, remembering, application, creating, understanding, evaluation);
          if (this.total_subject.length - 1 == index) {
            myseries1['color'] = '00A1FF';
            myseries1['data'] = anaysisdata;
            myseries1['name'] = 'Analysis';

            myseries2['color'] = '00A1FF';
            myseries2['data'] = applicationdata;
            myseries2['name'] = 'Application';

            myseries3['color'] = '00A1FF';
            myseries3['data'] = creatingdata;
            myseries3['name'] = 'Creating';

            myseries4['color'] = '00A1FF';
            myseries4['data'] = evalutiondata;
            myseries4['name'] = 'evaluation';

            myseries5['color'] = '00A1FF';
            myseries5['data'] = rememberingdata;
            myseries5['name'] = 'Remembering';

            myseries6['color'] = '00A1FF';
            myseries6['data'] = understandingdata;
            myseries6['name'] = 'Understanding';

            console.log(myseries1, myseries2);
            let a = this.total_subject.map(item => titleCase(item));
            console.log(a);
            this.renderGrapghForAllBloom(a, myseries1, myseries2, myseries3, myseries4, myseries5, myseries6);
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
  renderGrapghForAllBloom(categories: any[], myseries1, myseries2, myseries3, myseries4, myseries5, myseries6) {
    console.log(myseries1.data);
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
        name: myseries1.name,
        data: myseries1.data,
        color: '#00D264',

      }, {
        name: myseries2.name,
        data: myseries2.data,
        color: '#2352F5',
      },
      {
        name: myseries3.name,
        data: myseries3.data,
        color: '#3A5077',
      },
      {
        name: myseries4.name,
        data: myseries4.data,
        color: '#FF7996',
      },
      {
        name: myseries5.name,
        data: myseries5.data,
        color: '#00A1FF',
      },

      {
        name: myseries6.name,
        // data: myseries6.data,
        data: [50, 20, 10],
        color: '#7357CD',
      },
      ]
    }
    setTimeout(() => {
      Highcharts.chart('learning-objective-container', options);

    }, 10);
  }


  drawMiddileGraph(data) {
    console.log(data);

    // remembering
    if (data['REMEMBERING'] && data['REMEMBERING'].length > 0) {
      let roverall = [], rclass_avg = [], rcategories = [];
      data.REMEMBERING.forEach((element, indx) => {
        if (rcategories.indexOf(element.ExamName) == -1) {
          rcategories.push(titleCase(element.ExamName));
        }
        element['overall'] > 0 ? roverall.push(parseFloat(element['overall'].toFixed(2))) : roverall.push(parseFloat(element['overall']));
        element['class_avg'] > 0 ? rclass_avg.push(parseFloat(element['class_avg'].toFixed(2))) : rclass_avg.push(parseFloat(element['class_avg']));

        if (data.REMEMBERING.length - 1 == indx) {
          console.log(rcategories, roverall, rclass_avg);
          this.renderRememberingGraph(rcategories, roverall, rclass_avg);
        };
      });
    }

    // APPLICATION
    if (data['APPLICATION'] && data['APPLICATION'].length > 0) {
      let aoverall = [], aclass_avg = [], acategories = [];
      data.APPLICATION.forEach((element, indx) => {
        if (acategories.indexOf(element.ExamName) == -1) {
          acategories.push(titleCase(element.ExamName));
        }

        element['overall'] > 0 ? aoverall.push(parseFloat(element['overall'].toFixed(2))) : aoverall.push(parseFloat(element['overall']));
        element['class_avg'] > 0 ? aclass_avg.push(parseFloat(element['class_avg'].toFixed(2))) : aclass_avg.push(parseFloat(element['class_avg']));

        if (data.APPLICATION.length - 1 == indx) {
          console.log(acategories, aoverall, aclass_avg);
          this.renderaApplicationGraph(acategories, aoverall, aclass_avg);
        };
      });
    }

    // EVALUATION
    if (data['EVALUATION'] && data['EVALUATION'].length > 0) {
      let eoverall = [], eclass_avg = [], ecategories = [];
      data.EVALUATION.forEach((element, indx) => {
        if (ecategories.indexOf(titleCase(element.ExamName)) == -1) {
          ecategories.push(element.ExamName);
        }
        element['overall'] > 0 ? eoverall.push(parseFloat(element['overall'].toFixed(2))) : eoverall.push(parseFloat(element['overall']));
        element['class_avg'] > 0 ? eclass_avg.push(parseFloat(element['class_avg'].toFixed(2))) : eclass_avg.push(parseFloat(element['class_avg']));

        if (data.EVALUATION.length - 1 == indx) {
          console.log(ecategories, eoverall, eclass_avg);
          this.renderEvaluationGraph(ecategories, eoverall, eclass_avg);
        };
      });
    }

    //  creating
    if (data['CREATING'] && data['CREATING'].length > 0) {
      let coverall = [], cclass_avg = [], ccategories = [];
      data.CREATING.forEach((element, indx) => {
        if (ccategories.indexOf(element.ExamName) == -1) {
          ccategories.push(titleCase(element.ExamName));
        }
        element['overall'] > 0 ? coverall.push(parseFloat(element['overall'].toFixed(2))) : coverall.push(parseFloat(element['overall']));
        element['class_avg'] > 0 ? cclass_avg.push(parseFloat(element['class_avg'].toFixed(2))) : cclass_avg.push(parseFloat(element['class_avg']));

        if (data.CREATING.length - 1 == indx) {
          console.log(ccategories, coverall, cclass_avg);
          this.renderCreatingGraph(ccategories, coverall, cclass_avg);
        };
      });
    }

    // understanding
    if (data['UNDERSTANDING'] && data['UNDERSTANDING'].length > 0) {
      let uoverall = [], uclass_avg = [], ucategories = [];
      data.UNDERSTANDING.forEach((element, indx) => {
        if (ucategories.indexOf(element.ExamName) == -1) {
          ucategories.push(titleCase(element.ExamName));
        }
        element['overall'] > 0 ? uoverall.push(parseFloat(element['overall'].toFixed(2))) : uoverall.push(parseFloat(element['overall']));
        element['class_avg'] > 0 ? uclass_avg.push(parseFloat(element['class_avg'].toFixed(2))) : uclass_avg.push(parseFloat(element['class_avg']));

        if (data.UNDERSTANDING.length - 1 == indx) {
          console.log(ucategories, uoverall, uclass_avg);
          this.renderUnderstandingGraph(ucategories, uoverall, uclass_avg);
        };
      });
    }

    // analysis
    if (data['ANALYSIS'] && data['ANALYSIS'].length > 0) {
      let anoverall = [], anclass_avg = [], ancategories = [];
      data.ANALYSIS.forEach((element, indx) => {
        if (ancategories.indexOf(element.ExamName) == -1) {
          ancategories.push(titleCase(element.ExamName));
        }
        element['overall'] > 0 ? anoverall.push(parseFloat(element['overall'].toFixed(2))) : anoverall.push(parseFloat(element['overall']));
        element['class_avg'] > 0 ? anclass_avg.push(parseFloat(element['class_avg'].toFixed(2))) : anclass_avg.push(parseFloat(element['class_avg']));

        if (data.ANALYSIS.length - 1 == indx) {
          console.log(ancategories, anoverall, anclass_avg);
          this.renderAnalysisGraph(ancategories, anoverall, anclass_avg);
        };
      });
    }

  }
  renderCreatingGraph(categories: any[], overall: any[], class_avg: any[]) {
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
        pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },

      series: [{
        name: 'OverAll Score',
        data: overall,
        zIndex: 1,
        color: '#00A1FF',
        marker: {
          fillColor: 'white',
          symbol: 'circle',
          lineWidth: 2,
          lineColor: '#00A1FF'
        }
      },
      {
        name: 'Class Avg. Score',
        data: class_avg,
        zIndex: 1,
        color: '#7357CD',
        marker: {
          symbol: 'circle',
          fillColor: 'white',
          lineWidth: 2,
          lineColor: '#7357CD'
        }
      }]
    }
    setTimeout(() => {
      Highcharts.chart('creating-highcharts-description', option);

    }, 10)
  }
  renderaApplicationGraph(categories: any[], overall: any[], class_avg: any[]) {
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
        pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },

      series: [{
        name: 'OverAll Score',
        data: overall,
        zIndex: 1,
        color: '#00A1FF',
        marker: {
          fillColor: 'white',
          symbol: 'circle',
          lineWidth: 2,
          lineColor: '#00A1FF'
        }
      },
      {
        name: 'Class Avg. Score',
        data: class_avg,
        zIndex: 1,
        color: '#7357CD',
        marker: {
          symbol: 'circle',
          fillColor: 'white',
          lineWidth: 2,
          lineColor: '#7357CD'
        }
      }]
    }
    setTimeout(() => {
      Highcharts.chart('application-highcharts-description', option);

    }, 10)
  }

  // remember grapgh
  renderRememberingGraph(categories: any[], overall: any[], class_avg: any[]) {
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
        pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'
      },

      series: [{
        name: 'OverAll Score',
        data: overall,
        zIndex: 1,
        color: '#00A1FF',
        marker: {
          fillColor: 'white',
          symbol: 'circle',
          lineWidth: 2,
          lineColor: '#00A1FF'
        }
      },
      {
        name: 'Class Avg. Score',
        data: class_avg,
        zIndex: 1,
        color: '#7357CD',
        marker: {
          symbol: 'circle',
          fillColor: 'white',
          lineWidth: 2,
          lineColor: '#7357CD'
        }
      }]
    }
    setTimeout(() => {
      Highcharts.chart('remembering-highcharts-description', option);

    }, 10);
  }

  // understanding graph
  renderUnderstandingGraph(categories: any[], overall: any[], class_avg: any[]) {
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
        pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },

      series: [{
        name: 'OverAll Score',
        data: overall,
        zIndex: 1,
        color: '#00A1FF',
        marker: {
          fillColor: 'white',
          symbol: 'circle',
          lineWidth: 2,
          lineColor: '#00A1FF'
        }
      },
      {
        name: 'Class Avg. Score',
        data: class_avg,
        zIndex: 1,
        color: '#7357CD',
        marker: {
          symbol: 'circle',
          fillColor: 'white',
          lineWidth: 2,
          lineColor: '#7357CD'
        }
      }]
    }
    setTimeout(() => {
      Highcharts.chart('understanding-highcharts-description', option);

    }, 10);
  }


  // analysis graph

  renderAnalysisGraph(categories: any[], overall: any[], class_avg: any[]) {
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
        pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },

      series: [{
        name: 'OverAll Score',
        data: overall,
        zIndex: 1,
        color: '#00A1FF',
        marker: {
          fillColor: 'white',
          symbol: 'circle',
          lineWidth: 2,
          lineColor: '#00A1FF'
        }
      },
      {
        name: 'Class Avg. Score',
        data: class_avg,
        zIndex: 1,
        color: '#7357CD',
        marker: {
          symbol: 'circle',
          fillColor: 'white',
          lineWidth: 2,
          lineColor: '#7357CD'
        }
      }]
    }
    setTimeout(() => {
      Highcharts.chart('analysis-highcharts-description', option);

    }, 10);
  }

  // evaluation graph

  renderEvaluationGraph(categories: any[], overall: any[], class_avg: any[]) {
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
        pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },

      series: [{
        name: 'OverAll Score',
        data: overall,
        zIndex: 1,
        color: '#00A1FF',
        marker: {
          fillColor: 'white',
          symbol: 'circle',
          lineWidth: 2,
          lineColor: '#00A1FF'
        }
      },
      {
        name: 'Class Avg. Score',
        data: class_avg,
        zIndex: 1,
        color: '#7357CD',
        marker: {
          symbol: 'circle',
          fillColor: 'white',
          lineWidth: 2,
          lineColor: '#7357CD'
        }
      }]
    }
    setTimeout(() => {
      Highcharts.chart('evaluation-highcharts-description', option);

    }, 10);
  }



  showResult() {
    console.log(this.studentFilterObj);
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
    this.getStudentLearningCurveReport(prepareData);
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

  getocomplexity() {
    this.router.navigate(['../complexity-analysis'], { relativeTo: this.route });
  }

  goToChapterAnalysis() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  goToSubLevelReport() {
    // student/subject-level
    this.router.navigate(['../subject-level'], { relativeTo: this.route });
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