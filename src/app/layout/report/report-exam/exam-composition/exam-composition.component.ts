import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { AddStudentService } from 'src/app/layout/add-student-manually/add-student/add-student.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { ExamGroupService } from 'src/app/layout/exam-group/exam-group.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import * as _ from 'underscore';
import * as Highcharts from 'highcharts';



@Component({
  selector: 'app-exam-composition',
  templateUrl: './exam-composition.component.html',
  styleUrls: ['./exam-composition.component.scss']
})
export class ExamCompositionComponent implements OnInit {
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
  examList: any = [];
  exam_chap_composition: any = [];
  exam_bloom_composition: any = [];
  exam_diff_composition: any = [];
  chap_diff_composition: any = [];
  bloom_diff_composition: any = [];
  academicList: any = [];

  bloomTaxonomyList: any = [];
  bloomTaxonomyName: any = "";

  constructor(private shareService: SharedDataService, private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private templateService: TemplateService,
    private academicYearService: AcademicYearService, private examgroupService: ExamGroupService, private toaster: ToastrService, private route: ActivatedRoute,
    private classTestExamService: TemplateService,
    private router: Router,
    private sharedService: SharedDataService) { }

  ngOnInit() {
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
    // this.showResult()
    this.getAcademicYears();
    this.getInstituteDDLClass();
    this.getExamGroupDetails();
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
    this.studentFilterObj['StudentID'] = null;
    this.studentFilterObj['EA_SectionID'] = null;
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section.filter((d: any) => d.SectionStatus == 1);
      }, error => {
      }
    )
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
  getExamList() {
    this.studentFilterObj.EATemplateID = null;
    let prepare = {
      "PaperType": 0,
      "ExamGroupID": this.studentFilterObj['ExamGroupIds'],
      "SubjectID": this.studentFilterObj['SubjectID']
    };
    this.examList = [];
    this.studentFilterObj['EATemplateID'] = null;
    this.classTestExamService.getTemplateList(prepare).subscribe(data => {
      this.examList = data;
      if (data && data.length > 0) {
        this.sharedService.updateAvailableCreditsCache(data[0].TotalPaperCreatedCount);
      }
    }, error => {
      this.examList = [];
    })
  }

  getSubject(classId) {
    this.studentFilterObj['SubjectID'] = null;
    this.subjects = [];
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjects = _.filter(subjects, function (obj) {
          return (obj.IsSelected)
        });
      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.templateService.getInstituteDDLSubject(classId)
      .subscribe(getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }
  goToExamList() {
    this.router.navigate(['../Exam-taken-analysis'], { relativeTo: this.route });
  };

  showResult() {
    let a = [];
    if (this.studentFilterObj['ExamGroupIds'] && this.studentFilterObj['ExamGroupIds'][0]) {
      this.studentFilterObj['ExamGroupIds'].map(item => a.push(item.ExamGroupID));
    }
    let prepare = {
      "AcademicYearId": this.studentFilterObj['academicYearsID'],
      "ClassId": this.studentFilterObj['ClassID'],
      "SectionIds": [this.studentFilterObj['EA_SectionID']],
      "SubjectIds": [this.studentFilterObj['SubjectID']],
      // "ExamGroupIds": [this.studentFilterObj['ExamGroupIds']],
      "ExamGroupIds": a,
      // "EAPaperTemplateID":(!!this.studentFilterObj['EATemplateID']) ? this.studentFilterObj['EATemplateID'] : "00000000-0000-0000-0000-000000000000"
    }
    this.shareService.exam_report_exam_composition(prepare).subscribe(res => {
      if (res['success']) {
        this.noDataFound = false;
        this.exam_chap_composition = res['data']['exam_chap_composition'];
        this.exam_bloom_composition = res['data']['exam_bloom_composition'];
        this.exam_diff_composition = res['data']['exam_diff_composition'];
        this.chap_diff_composition = res['data']['chap_diff_composition'];
        this.bloom_diff_composition = res['data']['bloom_diff_composition'];

        if (this.exam_chap_composition && this.exam_chap_composition.length > 0) {
          let data = [];
          this.exam_chap_composition.map((item, ind) => {
            let obj = {
              name: titleCase(item.ChapterName),
              y: (parseFloat(item.perc_weightage.toFixed(2)))
            }
            data.push(obj);
            if (ind == this.exam_chap_composition.length - 1) {
              this.renderGrapgh('Exam_Chapter_Composition', data);
            }
          })
        }
        if (this.exam_bloom_composition && this.exam_bloom_composition.length > 0) {
          // Exam_Chapter_Difficulty_Composition
          let cdata = [];
          this.exam_bloom_composition.forEach((ele, indx) => {
            let smallArray = [titleCase(ele['BloomTaxonomyName']), parseFloat(Number(ele['perc_weightage'].toFixed(2)).toFixed(2))]
            cdata.push(smallArray);
            if (this.exam_bloom_composition.length - 1 == indx) {
              this.renderDoutGrapgh('Bloom_Chart_Representation', cdata);
            }
          });
        }
        if (this.exam_diff_composition && this.exam_diff_composition.length > 0) {
          // Difficulty_Chart_Representation
          let cdata = [];
          this.exam_diff_composition.forEach((ele, indx) => {
            let smallArray = [titleCase(ele['DifficultyLevelName']), parseFloat(Number(ele['perc_weightage']).toFixed(2))]
            cdata.push(smallArray);
            if (this.exam_diff_composition.length - 1 == indx) {
              console.log(cdata);
              this.renderDoutGrapgh('Difficulty_Chart_Representation', cdata);

            }
          });
        }
        if (this.chap_diff_composition && this.chap_diff_composition.length > 0) {
          let chapterName = this.chap_diff_composition.map(item => titleCase(item.ChapterName));
          let easy = [], medium = [], hard = [];
          this.chap_diff_composition.forEach((ele, index) => {
            easy.push(parseFloat(parseFloat(ele['EASY']).toFixed(2)));
            medium.push(parseFloat(parseFloat(ele['MEDIUM']).toFixed(2)));
            hard.push(parseFloat(parseFloat(ele['HARD']).toFixed(2)));
            if (this.chap_diff_composition.length - 1 == index) {
              console.log(chapterName, easy, medium, hard);
              this.renderGrapghForAllBloom(chapterName, easy, medium, hard);
            }
          });

        }
        if (this.bloom_diff_composition && this.bloom_diff_composition.length > 0) {
          // Exam_Difficulty_Composition

          this.bloomTaxonomyList = this.bloom_diff_composition.map(item => item.BloomTaxonomyName);
          this.bloomTaxonomyName = this.bloomTaxonomyList[0];
          console.log(this.bloomTaxonomyList);
          let dificultyNames = ['EASY', 'MEDIUM', 'HARD'];
          let cdata = [];
          console.log(this.bloom_diff_composition);
          dificultyNames.forEach((element, chIndx) => {
            let smallArray = [titleCase(element), parseFloat(Number(this.bloom_diff_composition[0][element].toFixed(2)).toFixed(2))]
            cdata.push(smallArray);
            if (dificultyNames.length - 1 == chIndx) {
              console.log(cdata);
              this.renderDoutGrapgh('Exam_Difficulty_Last_Composition', cdata);

            }
          });
        }
      } else {
        this.noDataFound = true;
        this.toaster.error('No data found.');
      }

    }, error => {
      this.noDataFound = true;
      this.toaster.error('Please select valid data.');
    })
  }

  reRenderChart(bloomName) {
    if (this.bloom_diff_composition && this.bloom_diff_composition.length > 0) {

      console.log(this.bloomTaxonomyList);
      let dificultyNames = ['EASY', 'MEDIUM', 'HARD'];
      let cdata = [];
      console.log(this.bloom_diff_composition, bloomName);
      this.bloom_diff_composition.forEach((element, parentIndx) => {
        if (element['BloomTaxonomyName'] == bloomName) {
          dificultyNames.forEach((element, chIndx) => {
            let smallArray = [titleCase(element), parseFloat(Number(this.bloom_diff_composition[parentIndx][element]).toFixed(2))]
            cdata.push(smallArray);
            if (dificultyNames.length - 1 == chIndx) {
              console.log(cdata);
              this.renderDoutGrapgh('Exam_Difficulty_Last_Composition', cdata);

            }
          });
        }
      });
    }
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
        tickInterval: 25,
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
      // plotOptions: {
      //     column: {
      //         pointPadding: 0.1,
      //         borderWidth: 0
      //     }
      // },
      series: [{
        name: 'Chapters',
        colorByPoint: true,
        data: series1,


      }]
    }
    setTimeout(() => {
      Highcharts.chart(container, options);
    }, 10);
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
            '#69BB10',
            '#3A5077'
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
        name: 'Browsers',
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

  renderGrapghForAllBloom(categories, myseries1, myseries2, myseries3) {

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
        name: 'Easy',
        data: myseries1,
        color: '#7357CD',

      }, {
        name: 'Medium',
        data: myseries2,
        color: '#01CA85',
      },
      {
        name: 'Hard',
        data: myseries3,
        color: '#2FB9E0',
      }
      ]
    }
    setTimeout(() => {
      Highcharts.chart('Exam_Chapter_Difficulty_Composition', options);

    }, 10);
  }

  onItemSelect(item: any) {
    console.log(item);
    console.log(this.studentFilterObj.ExamGroupIds);
    this.getExamList();
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    this.getExamList();
    console.log(this.studentFilterObj.ExamGroupIds);
  }
  onSelectAll(items: any) {
    this.getExamList();
    console.log(this.studentFilterObj.ExamGroupIds);
  }
  onDeSelectAll(items: any) {
    this.getExamList();
    console.log(this.studentFilterObj.ExamGroupIds);
  }
  clearFilter() {
    this.studentFilterObj.academicYearsID = null;
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.ExamGroupIds = null;
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];
    // this.students=[];
    this.subjects = [];
    this.noDataFound = true;
    // this.isSearchFormValid();
    this.getExamGroupDetails();
  }

  academicChnage() {
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.ExamGroupIds = null;
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];
    this.subjects = [];
    this.getExamGroupDetails();
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