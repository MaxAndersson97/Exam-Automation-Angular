import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';
import { TemplateService } from '../../template-setup/template.service';
import { AcademicYearService } from '../../academic-year/academic-year.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ExamGroupService } from '../../exam-group/exam-group.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import * as _ from 'underscore';

@Component({
  selector: 'app-report-exam',
  templateUrl: './report-exam.component.html',
  styleUrls: ['./report-exam.component.scss']
})
export class ReportExamComponent implements OnInit {
  classes: any = [];
  isSearchValid: boolean = false;
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
  subjectsettings: any = {};
  noDataFound: boolean = true;
  monthsName: any = [];
  academicList: any = [];
  setionsettings: {};

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

    this.subjectsettings = {
      singleSelection: false,
      text: "Select Subject",
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      badgeShowLimit: 1,
      itemsShowLimit: 1,
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
    // this.studentFilterObj.ExamGroupIds= null;
    this.studentFilterObj.ExamGroupIds = '';

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

  getSubject(classId) {
    this.studentFilterObj['SubjectID'] = null;
    this.subjects = [];
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjects = _.filter(subjects, function (obj) {
          return (obj.IsSelected)
        });

        this.subjects.filter((item, indx) => {
          item['itemName'] = item.SubjectName;
          item['id'] = indx;
        })
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

  goToExamComposition() {
    this.router.navigate(['../Exam-composition'], { relativeTo: this.route });

  }

  showResult() {
    let a = [], c = [], b = [];
    if (this.studentFilterObj['ExamGroupIds'] && this.studentFilterObj['ExamGroupIds'][0]) {
      this.studentFilterObj['ExamGroupIds'].map(item => a.push(item.ExamGroupID));
    }

    if (this.studentFilterObj['SubjectID'] && this.studentFilterObj['SubjectID'][0]) {
      this.studentFilterObj['SubjectID'].map(item => c.push(item.SubjectID));
    }
    if (this.studentFilterObj['EA_SectionID'] && this.studentFilterObj['EA_SectionID'][0]) {
      b = this.studentFilterObj['EA_SectionID'].map(item => item.AESectionID);
    }
    let prepare = {
      "AcademicYearId": this.studentFilterObj['academicYearsID'],
      "ClassId": this.studentFilterObj['ClassID'],
      // "SectionIds": [this.studentFilterObj['EA_SectionID']],
      "SectionIds": b,
      "SubjectIds": c,
      "ExamGroupIds": a
    }

    this.shareService.getExamTaken(prepare).subscribe(res => {
      console.log(res);
      if (res['success']) {
        this.noDataFound = false;
        this.preparedChapAnaDataList = res['data'].exams_taken;
        this.monthsName = res['month_name'];
      } else {
        this.noDataFound = true;
        this.preparedChapAnaDataList = [];
      }
    }, error => {
      this.noDataFound = true;
    })
  }

  isSearchFormValid() {
    if (!(!!this.studentFilterObj['academicYearsID'] && !!this.studentFilterObj['SubjectID'] && this.studentFilterObj['SubjectID'].length > 0 && !!this.studentFilterObj['EA_SectionID'] && !!this.studentFilterObj['ClassID'] && !!this.studentFilterObj['ExamGroupIds'] && this.studentFilterObj['ExamGroupIds'].length > 0)) {
      this.isSearchValid = false;
    } else {
      this.isSearchValid = true;
    }
  }


  onItemSelect(item: any) {
    console.log(item);
    console.log(this.studentFilterObj.ExamGroupIds);
    this.isSearchFormValid();
  }
  OnItemDeSelect(item: any) {
    console.log(item);
    console.log(this.studentFilterObj.ExamGroupIds);
    this.isSearchFormValid();
  }
  onSelectAll(items: any) {
    console.log(this.studentFilterObj.ExamGroupIds);
    this.isSearchFormValid();
  }
  onDeSelectAll(items: any) {
    this.studentFilterObj.ExamGroupIds = '';
    this.isSearchFormValid();
  }

  onItemSelect1(item: any) {
    console.log(item);
    this.isSearchFormValid();
  }
  OnItemDeSelect1(item: any) {
    console.log(item);
    this.isSearchFormValid();
  }
  onSelectAll1(items: any) {
    console.log(items);
    this.isSearchFormValid();
  }
  onDeSelectAll1(items: any) {
    console.log(items);
    this.studentFilterObj['SubjectID'] = '';
    this.isSearchFormValid();
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
    this.isSearchFormValid();
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
