import { Component, OnInit, ɵConsole } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { AddStudentService } from 'src/app/layout/add-student-manually/add-student/add-student.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';

@Component({
  selector: 'app-complexity-analysis-report',
  templateUrl: './complexity-analysis-report.component.html',
  styleUrls: ['./complexity-analysis-report.component.scss']
})
export class ComplexityAnalysisReportComponent implements OnInit {
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
  learning_strength_analysis: any = [];
  chap_strength_analysis: any = [];
  academicList: any = [];

  constructor(private sharedService: SharedDataService,
    private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private templateService: TemplateService,
    private academicYearService: AcademicYearService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getInstituteDDLClass();
    this.getAcademicYears();
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
    this.studentFilterObj.SubjectID = null;
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
  };

  getStudentBySection() {
    this.studentFilterObj['StudentID'] = null;
    if (!!this.studentFilterObj.EA_SectionID && !!this.studentFilterObj.ClassID) {
      let data = {
        // "AcademicYearID": this.academicYearsID,
        "AcademicYearID": this.studentFilterObj.academicYearsID,
        "ClassID": this.studentFilterObj.ClassID,
        "SectionID": [this.studentFilterObj.EA_SectionID]
      }
      this.sharedService.studentListBySection(data).subscribe(res => {
        this.students = res[0]['LstStudentData'];
        console.log(this.students);
      }, error => {
        this.students = [];
      })
    }

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

  showResult(searchData) {
    // debugger;
    console.log(searchData);
    if (!!searchData.StudentID && !!searchData.SubjectID) {
      let prepare = {
        "AcademicYearId": searchData.academicYearsID,
        "ClassId": searchData.ClassID,
        "SectionIds": [
          searchData.EA_SectionID
        ],
        "SubjectIds": [
          searchData.SubjectID
        ],
        "ExamGroupIds": [
          "00000000-0000-0000-0000-000000000000"
        ],
        "StudentId": searchData.StudentID,

      }

      this.sharedService.get_stu_report_complexity_analysis(prepare).subscribe(res => {
        if (res['success']) {
          this.noDataFound = false;
          this.learning_strength_analysis = res['data']['learning_strength_analysis'];
          this.chap_strength_analysis = res['data']['chap_strength_analysis'];
        } else {
          this.learning_strength_analysis = [];
          this.chap_strength_analysis = [];
          this.noDataFound = true;
          this.toastr.error('No data found.');

        }
      }, error => {
        this.toastr.error('please select valid data.');
        this.learning_strength_analysis = [];
        this.chap_strength_analysis = [];
        this.noDataFound = true;
      })
    }
  }

  goToChapterAnalysis() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  gotoLearning() {
    this.router.navigate(['../learning-curve'], { relativeTo: this.route });
  }

  getocomplexity() {
    this.router.navigate(['../complexity-analysis'], { relativeTo: this.route });
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
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];
    this.students = [];
    this.noDataFound = true;
    // this.isSearchFormValid();
  }

  academicChnage() {
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];
    this.students = [];
  }
}
