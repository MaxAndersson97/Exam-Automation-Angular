import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { AddStudentService } from 'src/app/layout/add-student-manually/add-student/add-student.service';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import { BsModalService, ModalDirective } from 'ngx-bootstrap';


@Component({
  selector: 'app-chapter-topic-understanding-analysis',
  templateUrl: './chapter-topic-understanding-analysis.component.html',
  styleUrls: ['./chapter-topic-understanding-analysis.component.scss']
})
export class ChapterTopicUnderstandingAnalysisComponent implements OnInit {
  @ViewChild('ChapterNameModal') Chapter_Name_Modal: ModalDirective;
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
  selectedStudents: any = [];
  selectedStudentsabove: any = [];
  selectedStudentsbelow: any = [];
  abovestudents: any = [];
  avgValue: any = 0;
  fromAvg: number = 50;
  toAvg: number = 0;
  showFilter: any = false;
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
    this.resetRange()
  }
  closeDropDown(event) {
    this.showFilter = false;
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
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];

    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section.filter((d: any) => d.SectionStatus == 1);
      }, error => {
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
        "AcademicYearID": this.academicYearsID,
        "ClassID": this.studentFilterObj.ClassID,
        "SectionID": [this.studentFilterObj.EA_SectionID]
      }
      this.sharedService.studentListBySection(data).subscribe(res => {
        this.students = res[0]['LstStudentData'];
        console.log(this.students);
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

  setAllRange(from) {
    console.log(from);
    if (from > 0) {
      this.avgValue = from;
    }
  }

  resetRange() {
    this.avgValue = 50;
    this.fromAvg = 50;
    this.toAvg = 0;
  }

  saveRange() {
    this.studentFilterObj.fromAvg = this.fromAvg;
    this.studentFilterObj.toAvg = this.toAvg;
    this.showFilterBox();
    this.showResult();
  }

  showResult() {
    debugger;
    this.studentFilterObj.fromAvg = this.fromAvg;
    this.studentFilterObj.toAvg = this.toAvg;

    let prepareData = {
      "AcademicYearId": this.studentFilterObj['academicYearsID'],
      "ClassId": this.studentFilterObj['ClassID'],
      "SectionIds": [this.studentFilterObj['EA_SectionID']],
      "SubjectIds": [this.studentFilterObj['SubjectID']],
      "AvgLower": this.studentFilterObj.fromAvg,
      "AvgUpper": this.studentFilterObj['toAvg']
    }
    this.sharedService.class_report_chap_topic_analysis(prepareData).subscribe(res => {
      if (res['success'] && res['data'].length > 0) {
        this.noDataFound = false;
        this.preparedChapAnaDataList = res['data'];
        this.preparedChapAnaDataList.forEach((element, indx) => {
          let above = element['counts']['above'];
          let below = element['counts']['below'];
          this.abovestudents = element.above;
          element['calcBelow'] = (below / (below + above)) * (100);
          element['calcAbove'] = (above / (above + below)) * (100);
        });
        console.log(this.preparedChapAnaDataList);
      } else {
        this.noDataFound = true;
        this.toastr.error('No data found.');
      }
    }, error => {
      this.noDataFound = true;
      this.toastr.error('Something went wrong.');
    });
  }
  showFilterBox() {
    this.showFilter = !this.showFilter;
  }

  studentDetails(item) {
    this.selectedStudents = item;
    console.log(this.selectedStudents);
    console.log(this.selectedStudents.student_details.above, this.selectedStudents.student_details.below);
    this.selectedStudentsabove = this.selectedStudents.student_details.above;
    this.selectedStudentsbelow = this.selectedStudents.student_details.below;
    console.log(this.selectedStudentsabove, this.selectedStudentsbelow);
    this.Chapter_Name_Modal.show();
  }
  closeModal() {
    this.Chapter_Name_Modal.hide();
    console.log('close btn');
  }

  // openInPDF(){
  //   document.getElementById('openInPDF_btn').style.display = 'none';
  //   window.print();
  //   setTimeout(() => {
  //     document.getElementById('openInPDF_btn').style.display = 'block';

  //    }, 5000);

  //   }

  openInPDF() {
    console.log('print this');
    var printContents = document.getElementById('obrz').innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    document.getElementById('openInPDF_btn').style.display = 'none';
    window.print();

    document.body.innerHTML = originalContents;
    setTimeout(() => {
      document.getElementById('openInPDF_btn').style.display = 'block';

    }, 1000);

  }

  overallPerformanceReport() {
    this.router.navigate(['../overall-performance-analysis'], { relativeTo: this.route });

  }

  subjectPerformanceReport() {
    this.router.navigate(['../sub-performance-report'], { relativeTo: this.route });

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
    this.subjects = [];
    this.noDataFound = true;
    // this.isSearchFormValid();
    // this.getExamGroupDetails();
  }

  academicChnage() {
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];
  }
}
