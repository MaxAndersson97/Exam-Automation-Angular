import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { orderBy,groupBy } from 'lodash';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  
  public canvasWidth = 400;
  public needleValue = 0;
  public centralLabel = '';
  public name = '';
  public bottomLabel = '';
  public options = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 2000,
    arcColors: ['#E52254','#FF7938','#01CA85'],
    arcDelimiters: [33.3,66.6],
    rangeLabel: ['0', '100'],
    needleStartValue: 0,
  };

  prgaugeValue  ;
  prgaugeLabel = "";
  prgaugeForegroundColor ="";
  prbackgdcolor= "";
  thgaugeValue  ;
  thgaugeLabel = "";
  thgaugeForegroundColor = "";
  thbackgdcolor= "";
  lagaugeValue  ;
  lagaugeLabel = "";
  lagaugeForegroundColor = "";
  labackgdcolor= "";

  gaugeType = "";
  cognitivegaugeValue  ;
  cognitivegaugeAppendText = "";
  cognitivebackgdcolor= "";
  coursegaugeValue  ;
  coursegaugeAppendText = "";
  gaugeForegroundColor = "";
  coursebackgdcolor= "";

  divisiongaugethick;
  appendpercentage="";
  thirddivgaugeType="";
  thirddivgaugeValue;
  thirddivgaugeLabel="";
  thirddivgaugeAppendthick;
  thirddivgaugeForegroundColor="";
  thirddivbackgdcolor="";
  onedivgaugeValue;
  onedivgaugethick;
  onedivgaugeForegroundColor="";
  onedivbackgdcolor="";
  twodivgaugeType="";
  twodivgaugeValue;
  twodivgaugeLabel="";
  twodivgaugeAppendthick;
  twodivgaugeForegroundColor="";
  twodivbackgdcolor="";
  fourdivgaugeType="";
  fourdivgaugeValue;
  fourdivgaugeLabel="";
  fourdivgaugeAppendText;
  fourdivgaugeForegroundColor="";
  fourdivbackgdcolor="";
  
  objData: any;
  assessmentcoremale: any;
  assessmentscorefemale: any;
  assessmentscoreoverall: any;
  assessmentscoreoverallcscore: any;
  coursecoverageData: any;
  coursecoverageDataThisYear:any=[];
  coursecoverageDataLastYear:any=[];

  AssessmentQualityData: any;
  difficultyLevel: any=[];
  Average_Attendance: any;
  Average_AttendanceCurrent_Year:any=[];
  Average_AttendancePrevious_Year:any=[];
  overall_Result: any;
  total_passed: any;
  overall_result_max: any;
  total_failed: any;
  exam_taken: any;
  examTakenPercent:any;
  total_time_saved: any;
  totalTimeSavedPercent:any;
  low_course_completion:any=[];
  exam_result_pending:any=[];
  no_assessment_for_long:any=[];
  top_performing_student:any=[];
  top_performing_feculties:any=[];
  class_wise_performance:any=[];
  board_merit_prediction:any=[];
  subject_wise_performance:any;
  subject_wise_performance_Practical:any;
  subject_wise_performance_Theoritical:any;
  subject_wise_performance_Language:any;
  dataSource: any ={};
  categories_avg_attendance = [];
  

  constructor(private sharedService: SharedDataService) {  }

  ngOnInit() {

    this.total_passed=  0;
    this.total_failed= 0;

    this.assesmetScoreChart(0);

    let data = this.sharedService.getdashboardData();
    if(data){
      this.getDashboardData(data);
    }

    this.sharedService.$dashboardData.subscribe((res) =>{
      this.getDashboardData(res);
    });
  }

  getDashboardData(dashboardData){
    
      let mainPage = dashboardData.main_page; 
      // ---------------Assessment Score---------------------------
      this.assessmentcoremale= mainPage.assessment_score['male'];
      this.assessmentscorefemale= mainPage.assessment_score['female'];
      this.assessmentscoreoverall= mainPage.assessment_score['overall'];
      this.assessmentscoreoverallcscore= this.assessmentscoreoverall.current_score;
     
      console.log(this.assessmentscoreoverall.current_score,"125");
      console.log(this.assessmentscoreoverall.previous_score,"126");

      // ---------------Course Coverage---------------------------
      this.coursecoverageData= mainPage.course_coverage;
      if(this.coursecoverageData.this_year.length>0){
        for (var i = 0, n = this.coursecoverageData.this_year.length; i < 12; ++i){  
          this.coursecoverageDataThisYear[i]= this.coursecoverageData.this_year[i]['score'];
        }
      }
      if(this.coursecoverageData.last_year.length>0){
        for (var i = 0, n = this.coursecoverageData.last_year.length; i < 12; ++i){  
          this.coursecoverageDataLastYear[i]= this.coursecoverageData.last_year[i]['score'];
        }
      }
      

      this.getcoursecoveragegraph();
      
      // ---------------Assessment Quality---------------------------
      this.AssessmentQualityData= mainPage.assessment_quality;
      this.difficultyLevel= this.AssessmentQualityData.difficulty_level_per;

      this.gaugeType = "full";
      this.cognitivegaugeValue = this.AssessmentQualityData.cognitive_level['hots'];
      this.cognitivegaugeAppendText = "";
      this.gaugeForegroundColor ="#01CA85";
      this.cognitivebackgdcolor= "#7357CD";

      this.gaugeType = "full";
      this.coursegaugeValue = this.AssessmentQualityData.course_representation['percentage'];
      this.coursegaugeAppendText = "";
      this.coursebackgdcolor = "#e6fff6";
      
      // ---------------Average Exam Attendance---------------------------
      this.Average_Attendance= mainPage.average_exam_attendance;
      if(this.Average_Attendance.current_year.length>0){
        for (var i = 0, n = this.Average_Attendance.current_year.length; i < 12; ++i){  
          this.Average_AttendanceCurrent_Year[i]= this.Average_Attendance.current_year[i]['score'];
          this.categories_avg_attendance.push(this.Average_Attendance.current_year[i]['month'].substring(0,3));
        }
      }
      if(this.Average_Attendance.previous_year.length>0){
        for (var i = 0, n = this.Average_Attendance.previous_year.length; i < 12; ++i){  
          this.Average_AttendancePrevious_Year[i]= this.Average_Attendance.previous_year[i]['score'];
        }
      }
      this.getavgattendancegraph();
       
      // ---------------Overall Results---------------------------
      this.overall_Result= mainPage.overall_results;
      this.total_passed=  this.overall_Result.total_passed;
      this.overall_result_max= this.overall_Result.total_passed + this.overall_Result.total_failed;
      this.total_failed= this.overall_Result.total_failed;

      this.appendpercentage="%";
      this.divisiongaugethick= 9;
      this.onedivgaugeValue= this.overall_Result.first_division;
      this.onedivgaugeForegroundColor="#2757E9";
      this.onedivbackgdcolor="#d1dbfa";

      this.twodivgaugeValue= this.overall_Result.second_division;
      this.twodivgaugeForegroundColor="#00B3FF";
      this.twodivbackgdcolor="#ccf0ff";

      this.thirddivgaugeValue= this.overall_Result.third_division;
      this.thirddivgaugeForegroundColor="#967CD6";
      this.thirddivbackgdcolor="#e0d8f3";

      this.fourdivgaugeValue= this.overall_Result.failed;
      this.fourdivgaugeForegroundColor="#ED3838";
      this.fourdivbackgdcolor="#fbd0d0";
      
      // ---------------Subject-wise Performance---------------------------
      this.subject_wise_performance= mainPage.subject_wise_performance;
      this.subject_wise_performance_Practical= this.subject_wise_performance.practical;
      this.subject_wise_performance_Theoritical= this.subject_wise_performance.theoretical;
      this.subject_wise_performance_Language= this.subject_wise_performance.language;
      this.prgaugeValue = this.subject_wise_performance.practical['score'];
      this.prgaugeLabel = "AVERAGE SCORE";
      this.prgaugeForegroundColor ="#01CA85";
      this.prbackgdcolor ="#e6fff6";
      this.thgaugeValue = this.subject_wise_performance.theoretical['score'];
      this.thgaugeLabel = "AVERAGE SCORE";
      this.thgaugeForegroundColor ="#7357CD";
      this.thbackgdcolor= "#efebf9";
      this.lagaugeValue = this.subject_wise_performance.language['score'];
      this.lagaugeLabel = "AVERAGE SCORE";
      this.lagaugeForegroundColor = "#00B3FF";
      this.labackgdcolor = "#e6f7ff";
      
      // ------------------exam_taken------------
      this.exam_taken=mainPage.exam_taken_obj;
      this.examTakenPercent = (this.exam_taken.previous_exam_taken/this.exam_taken.exam_taken)*100;
  
      // ------------------total_time_saved------------
      this.total_time_saved= mainPage.total_time_saved;
      this.totalTimeSavedPercent = (this.total_time_saved.previous_total_time_saved_in_hours/this.total_time_saved.total_time_saved_in_hours)*100;
      
      // ------------------Top performing Faculties------------
     this.top_performing_feculties= this.topPerformerFaculty(mainPage.top_performing_faculties);

      this.low_course_completion= mainPage.low_course_completion;
      this.exam_result_pending= mainPage.exam_results_pending;
      this.no_assessment_for_long= mainPage.no_assessment_for_long;
      this.top_performing_student = this.topPerformer(mainPage.top_performing_students);
      this.class_wise_performance= mainPage.class_wise_performance;
      this.class_wise_performance.sort( function( a, b ) {
        return a.SectionName < b.SectionName ? -1 : a.SectionName > b.SectionName ? 1 : 0;
      });
      this.class_wise_performance.sort( function( a, b ) {
        return a.ClassName < b.ClassName ? -1 : a.ClassName > b.ClassName ? 1 : 0;
      });
      this.board_merit_prediction= this.topPerformer(mainPage.board_merit_prediction);

      // this.dataSource = {
      //   chart: {
      //       caption: '',
      //       lowerLimit: '0',
      //       upperLimit: '100',
      //       showValue: '1',
      //       numberSuffix: '%',
      //       theme: 'fusion',
      //       showToolTip: '0'
      //   },
      //   colorRange: {
      //       color: [{
      //           minValue: '0',
      //           maxValue: '33.3',
      //           code: '#E52254'
      //       }, {
      //           minValue: '33.4',
      //           maxValue: '66.6',
      //           code: '#FF7938'
      //       }, {
      //           minValue: '66.7',
      //           maxValue: '100',
      //           code: '#01CA85'
      //       }]
      //   },
      //   dials: {
      //         dial: [{
      //             value: this.assessmentscoreoverallcscore.toString()
      //         }]
      //   }
      // }
      // this.assesmetScoreChart(this.assessmentscoreoverallcscore);
      this.needleValue = this.assessmentscoreoverallcscore.toString();
  }

  topPerformer(data){
    let topPerformer = [];
    let grpByClassName = groupBy(data,'ClassName');
    for (let className in grpByClassName){
      let grpBySectionName = groupBy(grpByClassName[className],'SectionName');
      for(let sectionName in grpBySectionName){
        topPerformer.push(orderBy(grpBySectionName[sectionName],['total_per'],['desc'])[0]);
      }
    }
    return topPerformer;
  }

  topPerformerFaculty(data){
    let topPerformer = [];
    let grpByClassName = groupBy(data,(faculty) => {
      return faculty.class_sec_sub[0].ClassName;
    });

    for (let className in grpByClassName){
      let grpBySectionName = groupBy(grpByClassName[className],(faculty) => {
              return faculty.class_sec_sub[0].SectionName;
      });
      for(let sectionName in grpBySectionName){
        topPerformer.push(orderBy(grpBySectionName[sectionName],['Total_per'],['desc'])[0]);
      }
    }
    return topPerformer;
  }
    
  getcoursecoveragegraph(){
    let option: any ={

      chart: {
        type: 'spline',
        title: ''
    },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          crosshair: false,
          type: 'Class Test',
          
      },
  
      yAxis: {
        min: 0,
        max:100,
        tickInterval: 20,
        labels: {
          format: '{value}%',
      }
    },
  
      tooltip: {
          pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },
  
      series: [
        {
          name: 'Class Avg. Score',
          data: this.coursecoverageDataLastYear,
          zIndex: 1,
          color: '#8595A6',
          marker: {
              symbol:'circle',
              fillColor: 'white',
              lineWidth: 2,
              lineColor: '#8595A6'
          }
      },{
          name: 'OverAll Score',
          data: this.coursecoverageDataThisYear,
          zIndex: 1,
          color: '#7357CD',
          marker: {
              fillColor: 'white',
              symbol:'circle',
              lineWidth: 2,
              lineColor: '#7357CD'
          }
      }]
  }
  setTimeout(() => {
    Highcharts.chart('course_coverage_graph', option);
  }, 10);
  }

  getavgattendancegraph(){
    let option: any ={

      chart: {
        type: 'spline',
        title: ''
    },
      xAxis: {
        // categories: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec','Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        categories: this.categories_avg_attendance,
          crosshair: false,
          type: 'Class Test',
          
      },
  
      yAxis: {
        min: 0,
        max:100,
        tickInterval: 20,
        labels: {
          format: '{value}%',
      }
    },
  
      tooltip: {
          pointFormat: '<span style="color:{series.color};padding:0">{point.y}%</span>'

      },
  
      series: [
        {
          name: 'Class Avg. Score',
          data: this.Average_AttendancePrevious_Year,
          zIndex: 1,
          color: '#8595A6',
          marker: {
              symbol:'circle',
              fillColor: 'white',
              lineWidth: 2,
              lineColor: '#8595A6'
          }
      },{
          name: 'OverAll Score',
          data: this.Average_AttendanceCurrent_Year,
          zIndex: 1,
          color: '#7357CD',
          marker: {
              fillColor: 'white',
              symbol:'circle',
              lineWidth: 2,
              lineColor: '#7357CD'
          }
      }]
  }
  setTimeout(() => {
    Highcharts.chart('avg_attendance', option);
    
  }, 10);
  }

  assesmetScoreChart(value){
    this.dataSource = {
      chart: {
          caption: '',
          lowerLimit: '0',
          upperLimit: '100',
          showValue: '1',
          numberSuffix: '%',
          theme: 'fusion',
          showToolTip: '0'
      },
      colorRange: {
          color: [{
              minValue: '0',
              maxValue: '33.3',
              code: '#E52254'
          }, {
              minValue: '33.4',
              maxValue: '66.6',
              code: '#FF7938'
          }, {
              minValue: '66.7',
              maxValue: '100',
              code: '#01CA85'
          }]
      },
      dials: {
            dial: [{
                value: value
            }]
      }
    };
  }
}

