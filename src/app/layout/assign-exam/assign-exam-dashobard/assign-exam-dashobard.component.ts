import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TemplateService } from '../../template-setup/template.service';
import * as _ from 'underscore';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { AcademicYearService } from '../../academic-year/academic-year.service';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { applicationConfiguration } from "../../../../assets/applicationConfiguration.json";

@Component({
  selector: 'app-assign-exam-dashobard',
  templateUrl: './assign-exam-dashobard.component.html',
  styleUrls: ['./assign-exam-dashobard.component.scss']
})
export class AssignExamDashobardComponent implements OnInit {
  public modalRef: BsModalRef;
  public examDateFormat: string = applicationConfiguration.assignExamDashboardDateFormat;
  @ViewChild('specific_student1') specificStudent1: ModalDirective;
  @ViewChild('changeStatusModal') changeStatus: ModalDirective;
  @ViewChild('AddMarksModal1') AddMarksModal1: ModalDirective;

  assignExamList: any = [];
  classesList: [];
  subjects: [];
  isChangeStFrmValidate: boolean = true;
  selectedAll: boolean;

  PaperModeType: number;
  assignExamListAll: any = [];

  papertypeList = [
    {
      paperName: 'Test',
      paperID: 2
    },
    {
      paperName: 'Exam',
      paperID: 1
    }

  ];
  statusList: any = [
    {
      name: 'Assigned',
      id: 1
    },
    {
      name: 'Cancelled',
      id: 2
    },
    {
      name: 'Postponed',
      id: 3
    },
    {
      name: 'Completed',
      id: 4
    }
  ]

  PaperModeList = [
    { 'name': 'ALL', 'value': 0 },
    { 'name': 'DESCRIPTIVE', 'value': 1 },
    { 'name': 'MCQ', 'value': 2 },
  ];

  collection = [];
  rowsOnPage = 25;
  rowsOnPageTemp = 25;
  public rowsOnPageSet = [25, 50, 100, "ALL"];
  public min = new Date();
  selectedOption: any = null;
  selectedSubjectId: any = null;
  paperType: any = null;
  showFilter: boolean = false;
  academicYears: any[];
  sectionID: any = [];
  academicYearID: any = [];
  sectionList: any;
  isDataFound: boolean;
  selectedStudentDetails: any;
  isStudentSelected: boolean = false;
  selectedExam: any;
  changeStatusObj: any = {
    selectedMoment: null,
    Reason: '',
    ExamStatus: null
  };
  markAttandance: any = '';

  constructor(private sharedService: SharedDataService,
    private templateService: TemplateService,
    private addWingService: AddWingService,
    private academicYearService: AcademicYearService,
    private addStudentService: AddStudentService,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private route: Router,
    private modalservice: BsModalService

  ) { }

  ngOnInit() {
    this.getAssignExamList();
    this.getInstituteDDLClass();
    this.getAcademicYears();
  }
  getAssignExamList() {
    let data = {
      "PaperType": "0",
      "ExamStatus": "",
      "AcademicYearID": "00000000-0000-0000-0000-000000000000",
      "ClassID": "",
      "SubjectID": [],
      "SectionID": [],
      "PeriodFrom": "",
      "PeriodTo": "",
      "RequestFromPage": 1
      // "PageIndex": 1,
      // "PageSize": 25
    }
    this.sharedService.getAssignExamList(data).subscribe(res => {
      if (res && res.length > 0) {
        this.assignExamList = res;
        this.assignExamListAll = res;
        this.assignExamList.filter(exam => {
          let currentDateTime = new Date().getTime();
          let timeArray = exam['EaxmTimeText'].split(':');
          let PaperTime = new Date(exam['EaxmDateText']).getTime() + exam.Duration * 60 * 60000 + timeArray[0] * 60 * 60000 + timeArray[1] * 60000;
          if (PaperTime < currentDateTime) {
            exam.changeStatus = 2;
          }
        })
        let a = this.assignExamList;

        //   a.sort(function(time1, time2) {
        //     time1 = time1.EaxmTimeText;
        //     time2 = time2.EaxmTimeText;
        //     if (time1 < time2) return 1;
        //     if (time1 > time2) return -1;
        //  })

        //   a.sort(function(date1, date2) {
        //     date1 = new Date(date1.EaxmDateText);
        //     date2 = new Date(date2.EaxmDateText);
        //     if (date1 < date2) return 1;
        //     if (date1 > date2) return -1;
        //  })
        this.isDataFound = true;
      }
    }, error => {
      this.assignExamList = [];
      this.isDataFound = false;
    });
  }

  getSubject(classId) {
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

  showFilterBox() {
    this.showFilter = !this.showFilter;
  }


  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classesList = classes.filter(element => element['IsClassShowInPortal'] === true);
      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
    };
    this.addWingService.getInstituteDDLClass()
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }
  getClassIdFilter(classID) {
    console.log(classID);
    if (!!classID) {
      this.selectedSubjectId = null;
      this.getSubject(classID);
      this.getSectionByClassID(classID);
    }
  }
  clearFilter() {
    //this.ddlStatus = null;
    this.selectedOption = null;
    this.selectedSubjectId = null;
    this.paperType = null;
    this.sectionID = null;
    //this.PaperMode = null;
    this.academicYearID = null;
    this.subjects = [];
    this.sectionList = [];
    const prepareData = {
      PaperType: '',
    };
    //this.getSearchResult(prepareData);
    this.filterData(this.selectedOption, this.selectedSubjectId, this.paperType, this.academicYearID, this.sectionID);
  }

  filterData(classId, subjectId, paperType, academicYearID, sectionID) {
    const data = {
      SubjectID: [subjectId],
      ClassID: classId,
      SectionID: [sectionID],
      AcademicYearID: academicYearID,
      PaperType: paperType,
      RequestFromPage: 1
    };
    this.showFilter = !this.showFilter;
    this.sharedService.getAssignExamList(data).subscribe(res => {
      console.log(res);
      if (res && res.length > 0) {
        this.assignExamList = res;
        this.isDataFound = true;
      }
    }, error => {
      this.assignExamList = [];
    });
  }

  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicYears = [];
      academicYear.filter(academic => {
        if (academic.AcademicStatus == 1) {
          this.academicYears.push(academic);
        }
      })
    };
    const getAcademicYearFailure = (httpError: HttpErrorResponse) => {
      const { error } = httpError;
      if (error) {
        const { error_description } = error;
        this.academicYears = [];
      }
    };
    this.academicYearService.getAcademicYears()
      .subscribe(
        getAcademicYearSuccess,
        getAcademicYearFailure,
        () => console.log('Get AcademicYears Request Complete')
      );
  }
  getSectionByClassID(ClassID) {
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section.filter((d: any) => d.SectionStatus == 1);
      }, error => {
        this.sectionList = [];
      }
    )
  }

  // 
  openAssignedStudentBySectionID(exam) {
    this.selectedExam = exam;

    let prepareObj = {
      "AcademicYearID": exam.AcademicYearID,
      "ClassID": "",
      "SectionID": [exam.SectionID],
      "EAExamAssignID": exam.EAExamAssignID
    }
    if (!!!this.markAttandance) {
      this.sharedService.studentListBySection(prepareObj).subscribe(res => {
        this.selectedStudentDetails = res[0]['LstStudentData'];
        console.log(res[0]['LstStudentData'], this.markAttandance);

        this.checkIfAllSelected();

        let isAnySelecetedStudent = this.selectedStudentDetails.find(item => item.IsSelected == true);
        this.isStudentSelected = isAnySelecetedStudent != undefined ? true : false;
        this.specificStudent1.show();
      }, error => {
        console.log(error);
      });
    } else {
      this.sharedService.studentListAppearedInExam(exam.EAExamAssignID).subscribe(res => {
        this.selectedStudentDetails = res;
        let isAnySelecetedStudent = this.selectedStudentDetails.some(item => item.IsAttempted == true);
        this.isStudentSelected = isAnySelecetedStudent;
        if (this.isStudentSelected) {
          if (this.markAttandance == "UploadOmr")
            this.openOMRUploadPage(exam);
          else
            this.submitStudentData();
        } else {
          this.specificStudent1.show()
        }
      }, error => {
        console.log(error);
      });
    }

    // }, error=>{
    //   console.log(error);
    // })
  }

  checkIfAllSelected() {
    let that = this;
    setTimeout(() => {
      var totalSelected = 0;
      that.selectedStudentDetails.filter(function (item: any, indx) {
        if (item.IsSelected) totalSelected++;

        if (indx == that.selectedStudentDetails.length - 1) {
          that.selectedAll = totalSelected === that.selectedStudentDetails.length;
        }
      });
    }, 100);
  }

  closeModel() {
    this.specificStudent1.hide();
  }

  closeChangeModal() {
    this.changeStatus.hide();
  }

  updateStudent(i) {
    this.selectedStudentDetails[i]['IsSelected'] = !this.selectedStudentDetails[i]['IsSelected'];
    let isAnySelecetedStudent = this.selectedStudentDetails.find(item => item.IsSelected == true);
    console.log(isAnySelecetedStudent);
    this.isStudentSelected = isAnySelecetedStudent != undefined ? true : false;
    this.checkIfAllSelected();
  }
  selectAll() {
    let isSelected: boolean;
    this.selectedAll = !this.selectedAll;
    isSelected = this.selectedAll;
    this.selectedStudentDetails.every(function (item: any) {
      item.IsSelected = isSelected;
      return true;
    });
    let isAnySelecetedStudent = this.selectedStudentDetails.find(item => item.IsSelected == true);
    console.log(isAnySelecetedStudent);
    this.isStudentSelected = isAnySelecetedStudent != undefined ? true : false;
  }

  saveSelectStudent() {
    if (this.markAttandance != 'Attandance' && this.markAttandance != 'UploadOmr') {
      let a = [];
      this.selectedStudentDetails.forEach(item => {
        if (item.IsSelected) { a.push(item.StudentID); }
      });
      console.log(a);
      let prepareData = {
        "EAExamAssignID": this.selectedExam.EAExamAssignID,
        "AcademicYearID": this.selectedExam.AcademicYearID,
        "lstCSSInfomember": [
          {
            "PaperClassID": this.selectedExam.ClassID,
            "PaperSubjectID": this.selectedExam.SubjectID,
            "PaperEASectionID": this.selectedExam.SectionID,
            "lstStudentID": a
          }]

      }
      this.sharedService.updateSelectedStudent(prepareData).subscribe(res => {
        console.log(res);
        this.specificStudent1.hide();
        // this.ngOnInit();

        this.toastr.success('Student updated successfully.');
      }, error => {
      })
    } else {
      let a = [];
      this.selectedStudentDetails.forEach(item => {
        if (item.IsSelected) { a.push(item.EAExamAssignStudentMappingID); }
      });
      let prepareData = {
        EAExamAssignID: this.selectedExam.EAExamAssignID,
        "AcademicYearID": null,
        "ClassID": this.selectedExam.ClassID,
        "SectionID": [this.selectedExam.SectionID], // section id is static
        "lstExamAssignStudentMappingID": a
      }

      this.sharedService.updateAppearedStudent(prepareData).subscribe(res => {
        console.log(res);
        if (this.markAttandance == 'Attandance')
          this.submitStudentData();
        else if (this.markAttandance == 'UploadOmr')
          this.openOMRUploadPage(this.selectedExam);

        this.toastr.success('Student updated successfully.');
      }, error => {
      })

      this.specificStudent1.hide();
    }


  }

  // open change status modal
  openChangeStatus(exam) {
    this.selectedExam = exam;
    let currentDateTime = new Date().getTime();
    let timeArray = exam['EaxmTimeText'].split(':');
    let PaperTime = new Date(exam['EaxmDateText']).getTime() + timeArray[0] * 60 * 60000 + exam.Duration * 60000 + timeArray[1] * 60000;

    console.log(PaperTime, currentDateTime);
    if (PaperTime > currentDateTime) {
      if (exam.ExamStatus == 3) {
        let a = exam.EaxmDateText.split('/');
        let b = exam.EaxmTimeText.split(':');
        this.changeStatusObj.ExamDateTime = new Date(a[2], a[0], a[1], b[0], b[1]);

        this.statusList = [
          {
            name: 'Cancelled',
            id: 2
          },
          {
            name: 'Postponed',
            id: 3
          }]
      } else {
        this.statusList = [{
          name: 'Assigned',
          id: 1
        },
        {
          name: 'Cancelled',
          id: 2
        },
        {
          name: 'Postponed',
          id: 3
        }]
      }

    } else {
      if (exam.ExamStatus == 3) {
        this.statusList = [
          {
            name: 'Postponed',
            id: 3
          },
          {
            name: 'Completed',
            id: 4
          }]
      }
      else {
        this.statusList = [{
          name: 'Assigned',
          id: 1
        },
        {
          name: 'Completed',
          id: 4
        }]
      }

    }

    this.changeStatusObj.ExamStatus = exam.ExamStatus;
    this.changeStatusObj.Reason = exam.Reason;
    this.changeStatus.show();
  }

  validateForm(changeStatusObj) {
    if (changeStatusObj.ExamStatus != 4 && changeStatusObj.ExamStatus != 1) {
      if ((!!changeStatusObj.Reason) || (!!changeStatusObj.ExamDateTime)) {
        this.isChangeStFrmValidate = true;

      } else {
        this.isChangeStFrmValidate = false;
      }
    } else {
      this.isChangeStFrmValidate = true;
    }

  }

  omrResult(exam, type) {
    this.sharedService.setOmrResult(type);
    this.route.navigate(['/exam/OMR/details/', exam['EAExamAssignID'], exam.ResultStatus]);
  }

  saveExamStatus() {
    console.log(this.changeStatusObj);
    let prepareData = {
      "EAExamAssignID": this.selectedExam.EAExamAssignID,
      "ExamDateTime": this.changeStatusObj.ExamDateTime,
      "ExamStatus": this.changeStatusObj.ExamStatus,
      "Reason": this.changeStatusObj.Reason
    }

    this.sharedService.changeAssignExamStatus(prepareData).subscribe(res => {
      this.ngOnInit();
      this.changeStatus.hide();
      // this.changeResultStatus();
    }, error => {

    })
  }

  // changeResultStatus(){
  //   let prepareData = {
  //     EAExamAssignID: this.selectedExam['EAExamAssignID'],
  //     ResultStatus: 2
  //   }    
  //   this.sharedService.changeStatusResult(prepareData).subscribe(res=>{
  //     if(res['success']){
  //     }
  //   }, error=>{

  //   })
  // }
  goToPaperSummary(exam) {
    let baseHref = location.href.split('#')[0];
    //console.log(baseHref, 'baselocation');
    window.open(baseHref + '#/exam/class-test-exam/summary/' + exam['EAPaperTemplateID'], '_blank');

  }

  goToModalAnswersheet(exam) {
    let baseHref = location.href.split('#')[0];
    //console.log(baseHref, 'baselocation');
    window.open(baseHref + '#/exam/class-test-exam/answersheet/' + exam['EAPaperTemplateID'], '_blank');

  }

  openMarkAttandance(exam, type) {
    if (exam.ResultStatus == 3 && type == "UploadOmr") {
      this.toastr.success('Marks are already published.');
    } else {
      this.markAttandance = type;
      this.openAssignedStudentBySectionID(exam);
    }
  }

  submitStudentData() {
    this.AddMarksModal1.show();
  };

  addMarksManually() {
    localStorage.removeItem('selectedAddMarks');
    localStorage.setItem('selectedAddMarks', JSON.stringify(this.selectedExam));
    this.route.navigate(['exam/add-marks/add-marks-manually', this.selectedExam.EAExamAssignID]);

  }

  addMarksCSV() {
    localStorage.removeItem('selectedAddMarks');
    localStorage.setItem('selectedAddMarks', JSON.stringify(this.selectedExam));
    this.route.navigate(['exam/add-marks/upload-csv', this.selectedExam.EAExamAssignID]);

  }

  closeAddMarksModal() {
    this.AddMarksModal1.hide();
  }

  goToPreviewPaper(exam) {
    let baseHref = location.href.split('#')[0];
    //console.log(baseHref, 'baselocation');
    localStorage.setItem('assignID', exam['EAExamAssignID']);

    //this.route.navigate(['exam/class-test-exam/view-paper/', exam['EAExamAssignID'],2]);

    window.open(baseHref + '#/exam/class-test-exam/view-paper/' + exam['EAExamAssignID'] + '/2', '_blank');

    // if(exam['IsOMRPaper']==true){
    //   window.open(baseHref + '#/exam/class-test-exam/view-paper/' + exam['EAExamAssignID'] );
    // }
    // else{
    //   window.open(baseHref + '#/exam/class-test-exam/view-paper/' + exam['EAPaperTemplateID'] );
    // }
    // window.open(baseHref + '#/exam/class-test-exam/view-paper/' + exam['EAPaperTemplateID'] );
    // this.route.navigate(['exam/class-test-exam/view-paper/', exam['EAPaperTemplateID']]);
  }

  confirmDeleteWing() {
    // this.currentTemplateID = templateID;
  }

  openOMRUploadPage(exam) {
    this.route.navigate(['/exam/OMR/upload-zip/', exam['EAExamAssignID']]);
    localStorage.setItem('TestID', exam['TestID']);
    //console.log(exam['EAExamAssignID'], exam['TestID']);
  }

  onPaperModeTypeChange() {
    if (this.PaperModeType == 0) {
      this.assignExamList = this.assignExamListAll;
    } else if (this.PaperModeType == 1) {
      this.assignExamList = this.assignExamListAll.filter(x => x.IsOMRPaper == false);
    } else if (this.PaperModeType == 2) {
      this.assignExamList = this.assignExamListAll.filter(x => x.IsOMRPaper == true);
    }
  }

  onShowPageChange(value) {
    if (value === "ALL") {
      this.rowsOnPage = this.assignExamList.length;
    } else {
      this.rowsOnPage = value;
    }
  }
}
