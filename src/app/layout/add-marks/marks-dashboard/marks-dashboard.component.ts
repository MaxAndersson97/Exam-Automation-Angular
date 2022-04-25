import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TemplateService } from '../../template-setup/template.service';
import * as _ from 'underscore';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { AcademicYearService } from '../../academic-year/academic-year.service';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';
import { ModalDirective, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-marks-dashboard',
  templateUrl: './marks-dashboard.component.html',
  styleUrls: ['./marks-dashboard.component.scss']
})
export class MarksDashboardComponent implements OnInit {
  @ViewChild('specific_student2') specificStudent2: ModalDirective;
  @ViewChild('changeStatusModal') changeStatus: ModalDirective;
  @ViewChild('AddMarksModal1') AddMarksModal1: ModalDirective;

  assignExamList: any = [];
  assignExamListAll: any = [];
  classesList: [];
  subjects: [];
  PaperModeType: number;

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
  type: any;

  constructor(private sharedService: SharedDataService,
    private templateService: TemplateService,
    private addWingService: AddWingService,
    private academicYearService: AcademicYearService,
    private addStudentService: AddStudentService,
    private toastr: ToastrService,
    private router: ActivatedRoute,
    private route: Router

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
      "RequestFromPage": 2
      // "PageIndex": 1,
      // "PageSize": 25
    }
    this.sharedService.getAssignExamList(data).subscribe(res => {
      if (res && res.length > 0) {
        this.assignExamList = res;
        this.assignExamListAll = res;
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
    this.subjects = [];
    this.sectionList = [];
    this.academicYearID = null;
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
      RequestFromPage: 2
    };

    console.log(data, "200");

    this.showFilter = !this.showFilter;
    this.sharedService.getAssignExamList(data).subscribe(res => {
      console.log(res);
      if (res && res.length > 0) {
        this.assignExamList = res;
        this.isDataFound = true;
      }
    }, error => {
      this.assignExamList = [];
      // this.isDataFound = false;
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
    // this.selectedExam = exam;
    // this.sharedService.studentListAppearedInExam(exam.EAExamAssignID).subscribe(res=>{
    //   this.selectedStudentDetails = res;
    //   let isAnySelecetedStudent = this.selectedStudentDetails.find(item=> item.IsAttempted == true);  
    //   this.isStudentSelected = isAnySelecetedStudent != undefined ? true: false; 
    this.specificStudent2.show();
    // }, error=>{
    //   console.log(error);
    // })
  }

  OpenAddMarks() {
    this.AddMarksModal1.show();
  }

  closeAddMarksModal() {
    this.AddMarksModal1.hide();
  }

  openMarkAttandance(exam, type) {
    this.type = type;
    this.selectedExam = exam;

    this.getStudent();



  }
  viewMarkAttandance(exam, type) {
    this.type = type;
    this.selectedExam = exam;

    this.sharedService.studentListAppearedInExam(this.selectedExam['EAExamAssignID']).subscribe(res => {
      this.selectedStudentDetails = res;
      let isAnySelecetedStudent = this.selectedStudentDetails.some(item => item.IsAttempted == true);

      this.isStudentSelected = isAnySelecetedStudent;
      this.isStudentSelected ? this.addmarksfunction() : this.addmarksfunction();

    }, error => {
      console.log(error);
    })
  }
  addmarksfunction() {
    localStorage.removeItem('selectedAddMarks');
    localStorage.setItem('selectedAddMarks', JSON.stringify(this.selectedExam));
    this.route.navigate(['exam/add-marks/add-marks-manually', this.selectedExam.EAExamAssignID]);
  }

  closeModel() {
    this.specificStudent2.hide();
  }
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
  submitStudentData() {
    //   localStorage.removeItem('selectedAddMarks');
    //   localStorage.setItem('selectedAddMarks', JSON.stringify(this.selectedExam));
    //   if(this.type == 1){     
    //   this.route.navigate(['../upload-csv', this.selectedExam.EAExamAssignID], {relativeTo: this.router});
    // }else{

    //   this.route.navigate(['../add-marks-manually', this.selectedExam.EAExamAssignID], {relativeTo: this.router});

    // }
    this.AddMarksModal1.show();
  }


  updateStudent(i) {
    this.selectedStudentDetails[i]['IsAttempted'] = !this.selectedStudentDetails[i]['IsAttempted'];
    let isAnySelecetedStudent = this.selectedStudentDetails.find(item => item.IsAttempted == true);
    console.log(isAnySelecetedStudent);
    this.isStudentSelected = isAnySelecetedStudent != undefined ? true : false;
  }


  getStudent() {
    this.sharedService.studentListAppearedInExam(this.selectedExam['EAExamAssignID']).subscribe(res => {
      this.selectedStudentDetails = res;
      let isAnySelecetedStudent = this.selectedStudentDetails.some(item => item.IsAttempted == true);

      this.isStudentSelected = isAnySelecetedStudent;
      this.isStudentSelected ? this.submitStudentData() : this.specificStudent2.show();

    }, error => {
      console.log(error);
    })
  }

  saveSelectStudent() {
    //let b= this.selectedStudentDetails.find(item=> item.IsAttempted == true);
    let a = [];
    this.selectedStudentDetails.forEach(item => {
      if (item.IsAttempted) { a.push(item.EAExamAssignStudentMappingID); }
    });

    let prepareData = {
      EAExamAssignID: this.selectedExam['EAExamAssignID'],
      lstExamAssignStudentMappingID: a
    }
    this.sharedService.updateAppearedStudent(prepareData).subscribe(res => {
      console.log(res);
      this.closeModel();
      this.submitStudentData();

    }, error => {

    })
  }

  publishMarks() {
    let prepareData = {
      EAExamAssignID: this.selectedExam['EAExamAssignID'],
      ResultStatus: 3
    }
    this.sharedService.changeStatusResult(prepareData).subscribe(res => {
      if (res['success']) {
        this.closeAddMarksModal();
        this.getAssignExamList();
        this.toastr.success('Exam marks published successfully.');
      }
    }, error => {

    })
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
