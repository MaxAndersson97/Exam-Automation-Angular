import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorksheetService } from '../../worksheet-setup/worksheet.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ClassTestExamService } from '../class-test-exam.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import * as _ from 'underscore';
import { BuyCreditComponent } from 'src/app/commons/buy-credit/buy-credit.component';
import { Payment } from 'src/app/commons/buy-credit/buy-credit.model';
import { ApplicationCacheService } from 'src/app/services/application-cache.service';
import { SharedObservablesService } from 'src/app/services/shared-observables.service';

declare var $: any;
@Component({
  selector: 'app-class-test-exam-dashboard',
  templateUrl: './class-test-exam-dashboard.component.html',
  styleUrls: ['./class-test-exam-dashboard.component.scss']
})
export class ClassTestExamDashboardComponent implements OnInit {
  @ViewChild(BuyCreditComponent) appBuyCredit: BuyCreditComponent | undefined;

  @ViewChild('OutOfCreditDialogTemplate') OutOfCreditDialog: ModalDirective;

  public modalRef: BsModalRef;

  isShowAddButton: boolean = true;

  collection = [];
  rowsOnPage = 25;
  rowsOnPageTemp = 25;
  public rowsOnPageSet = [25, 50, 100, "ALL"];
  currentPaperType: number = 0;
  totalRecords: any;
  papertypeList = [
    {
      paperName: 'Test',
      paperID: 2
    },
    {
      paperName: 'Exam',
      paperID: 1
    }

  ]

  ExamStatus = [{ 'name': 'Assigned', 'value': 1 },
  { 'name': 'Cancelled', 'value': 2 },
  { 'name': 'Postponed', 'value': 3 },
  { 'name': 'Complete', 'value': 4 },
  { 'name': 'Not Assigned', 'value': 0 }
  ];

  PaperStatusList = [
    { 'name': 'Process', 'value': 4 },
    { 'name': 'Approved', 'value': 5 },
    { 'name': 'Rejected', 'value': 6 },
    { 'name': 'Pending', 'value': 7 },
    { 'name': 'Ready', 'value': 8 },
  ];

  PaperModeTypeList = [
    { 'name': 'ALL', 'value': 0 },
    { 'name': 'DESCRIPTIVE', 'value': 1 },
    { 'name': 'MCQ', 'value': 2 },
  ];

  savedClassTestExamTest: [];
  classesList: [];
  subjects: [];
  cheptersList: [];
  ExamGroupList: any;
  templateList: [];
  isEdit: false;
  isTemplateSubmitted: boolean = false;
  selectedTextBook: any[];
  countChepter: number;
  selectedChepterIDs: any;
  savedWorksheetData: any;

  createTemplateDataObj: any = {};
  templateListData: any = [];
  templateListDataAll: any = [];
  showFilter: boolean = false;
  subjectList: any = [];
  standardList: any = [];
  selectedClassId: any = null;
  selectedSubjectId: any = null;
  isDataFound: boolean = false
  paperType: any;
  paperStatus: any;
  paperModeType: number;
  currentTemplateID: any;
  createddate: any;
  createdtime: any;

  isGuestTeacher: boolean = false
  isAssignExamShow: boolean = false;
  page: number = 1;
  searchString: string = "";
  constructor(private fb: FormBuilder,
    private addWingService: AddWingService,
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private worksheetService: WorksheetService,
    private toastr: ToastrService,
    private sharedService: SharedDataService,
    private classTestExamService: ClassTestExamService,
    private modalservice: BsModalService,
    private applicationCacheService: ApplicationCacheService,
    private sharedObservablesService: SharedObservablesService) { }

  ngOnInit() {
    localStorage.removeItem('SUBJECTSETTINGS');
    this.totalRecords = 0;
    this.getInstituteDDLClass();
    this.selectedChepterIDs = [];
    this.getTestAndExamList();

    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    if (getUserinfo.roles.indexOf('GuestTeacher') != -1) {
      this.isGuestTeacher = true;
    }

    let AccessLevelData = JSON.parse(localStorage.getItem('InstituteAccessLevel'));
    AccessLevelData.forEach((elmt, indx) => {
      if (elmt.Description == 'Assign Exam' && elmt.isView) {
        this.isAssignExamShow = true;
      }
    });
  }

  public createDuplicatePaper(templateId) {
    if (this.isShowAddButton) {
      this.sharedService.createDuplicatePaper(templateId).subscribe(
        () => {
          this.toastr.info("Paper created Successfully.");
          this.ngOnInit();
        },
        () => {
          this.toastr.info("Paper creation failed.");
        }
      );
    } else {
      this.appBuyCredit.loadCredits();
      this.OutOfCreditDialog.show();
    }
  }
  hideDropdown() {
    var dropdowns =
      document.getElementsByClassName("dropdown-container");

    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }


  navigatAddexamPage(id) {
    this.router.navigate(['../../assign-exam/add-exam/', id]);
  }

  // class test/exam list functionality start
  getTestAndExamList() {
    const prepareData = {
      PaperType: 0,
      pageIndex: 1,
      pageSize: this.rowsOnPage
    };
    this.getSearchResult(prepareData);

  }





  navigateToWorksheetHome() {
    this.sharedService.setOpenModuleData(true);
    this.router.navigate(['../'], { relativeTo: this.route });
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
    if (!!classID) {
      this.selectedSubjectId = null;
      this.getSubject(classID);
    }
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

  isActiveExamGroup(value) {
    if (value.ExamGroupStatus == 1) {
      return true;
    }
    return false;
  }
  getExamGroupDetails() {
    this.classTestExamService.getExamGroupList(this.currentPaperType).subscribe(examgroupData => {
      this.ExamGroupList = examgroupData;
      this.ExamGroupList = this.ExamGroupList.filter(this.isActiveExamGroup);
    }, (error) => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toastr.error(error.error['message']);
      }
    })
  }


  getActiveTemplateList(preparedData) {
    this.classTestExamService.getTemplateList(preparedData).subscribe(
      (template) => {
        this.templateList = template;
        for (let i = 0; i <= this.templateList.length; i++) {
        }

      }, (error) => {
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toastr.warning(UNAUTHERIZEDMESSASGE);
        } else {
        }
      });
  }

  confirmDeleteWing(template, templateID) {
    this.currentTemplateID = templateID;
    this.modalRef = this.modalservice.show(template, { class: 'modal-md' });
  }

  // delete paper till paper not approved
  deletePaper() {
    this.sharedService.deletePaper(this.currentTemplateID).subscribe(res => {
      this.toastr.success('Paper deleted successfully.');
      this.getTestAndExamList();
      this.modalRef.hide();
    }, error => {
    });
  }

  // editPaper(template){

  //   localStorage.setItem('ispaperedit', "Edit");
  //   if(template['PaperGenerationMethod'] == 1){
  //     this.sharedService.setSelectedTempalteID('00000000-0000-0000-0000-000000000000');
  //     this.router.navigate(['/exam/class-test-exam/templates', template['EAPaperTemplateID']] , {relativeTo: this.route})
  //   }
  //   else{
  //     if(template['PaperTemplateStatus'] != 8){
  //       this.sharedService.setSelectedTempalteID('00000000-0000-0000-0000-000000000000');
  //       this.router.navigate(['../chepters', template['EAPaperTemplateID']], {relativeTo: this.route});
  //     }else{
  //       this.sharedService.setSelectedTempalteID('00000000-0000-0000-0000-000000000000');
  //       this.router.navigate(['../generate-paper', template['EAPaperTemplateID']], {relativeTo: this.route});
  //     }
  //   }

  // }
  editPaper(template) {
    localStorage.setItem('ispaperedit', "Edit");
    localStorage.setItem('isOmr', 'false');
    if (template['PaperGenerationMethod'] == 1) {
      if (template['SelectedEAPaperTemplateID'] == '00000000-0000-0000-0000-000000000000') {
        this.router.navigate(['/exam/class-test-exam/templates', template['EAPaperTemplateID']], { relativeTo: this.route })
      }
      // this.sharedService.setSelectedTempalteID('00000000-0000-0000-0000-000000000000');
      else {
        this.router.navigate(['../chepters', template['EAPaperTemplateID']], { relativeTo: this.route });
      }
    }
    else {
      if (template['PaperTemplateStatus'] != 8) {
        this.sharedService.setSelectedTempalteID('00000000-0000-0000-0000-000000000000');
        this.router.navigate(['../chepters', template['EAPaperTemplateID']], { relativeTo: this.route });
      } else {
        this.sharedService.setSelectedTempalteID('00000000-0000-0000-0000-000000000000');
        this.router.navigate(['../generate-paper', template['EAPaperTemplateID']], { relativeTo: this.route });
      }
    }
  }

  openAddTemplateDialog() {
    if (this.isShowAddButton) {
      this.router.navigate(['../create'], { relativeTo: this.route });
    } else {
      this.appBuyCredit.loadCredits();
      this.OutOfCreditDialog.show();
    }
  }

  closeDropDown(event) {
    this.showFilter = false;
  }

  // onPaperModeTypeChange() {
  //   if (this.PaperModeType == 0) {
  //     this.templateListData = this.templateListDataAll;
  //   } else if (this.PaperModeType == 1) {
  //     this.templateListData = this.templateListDataAll.filter(x => x.IsOMRPaper == false);
  //   } else if (this.PaperModeType == 2) {
  //     this.templateListData = this.templateListDataAll.filter(x => x.IsOMRPaper == true);
  //   }
  // }



  viewAnswerSheet(templateId) {
    let baseHref = location.href.split('#')[0];
    // console.log(baseHref, 'baselocation');
    window.open(baseHref + '#/exam/class-test-exam/answersheet/' + templateId, '_blank');
  }

  closeModalOutOfCredit(event: Payment) {
    this.OutOfCreditDialog.hide();
    if (event)
      this.appBuyCredit.proceedPayment(event.amount, event.currency);
  }

  //Not required anymore
  // onShowPageChange(value) {
  //   if (value === "ALL") {
  //     this.rowsOnPage = this.templateListData.length;
  //   } else {
  //     this.rowsOnPage = value;
  //   }
  // }

  clearFilter() {
    this.selectedClassId = null;
    this.selectedSubjectId = null;
    this.paperType = null;
    this.paperStatus = null;
    this.subjects = [];
    this.searchString = "";
    this.page = 1;
    const prepareData = {
      PaperType: 0,
      PageIndex: 1,
      PageSize: this.rowsOnPage,
      PaperModeType: this.paperModeType
    };
    this.getSearchResult(prepareData);
  }

  filterData() {
    const data = {
      ClassID: this.selectedClassId,
      SubjectID: this.selectedSubjectId,
      PaperType: this.paperType ? this.paperType : 0,
      Status: this.paperStatus,
      PageIndex: 1,
      PageSize: this.rowsOnPage,
      StrSearchValue: this.searchString,
      PaperModeType: this.paperModeType
    };

    this.showFilter = !this.showFilter;
    this.page = 1;
    this.getSearchResult(data);
  }

  getCurrentPage(currentPage) {
    let prepareData = {};
    if (this.paperType) {
      prepareData = {
        ClassID: this.selectedClassId,
        SubjectID: this.selectedSubjectId,
        PaperType: this.paperType ? this.paperType : 0,
        Status: this.paperStatus,
        StrSearchValue: this.searchString,
        PageIndex: currentPage,
        PageSize: this.rowsOnPage,
        PaperModeType: this.paperModeType
      };
    } else {
      prepareData = {
        ClassID: this.selectedClassId,
        SubjectID: this.selectedSubjectId,
        PaperType: 0,
        Status: this.paperStatus,
        StrSearchValue: this.searchString,
        PageIndex: currentPage,
        PageSize: this.rowsOnPage,
        PaperModeType: this.paperModeType
      };
    }
    this.getSearchResult(prepareData);
  }

  onPaperModeTypeChange() {
    this.page = 1;

    const prepareData = {
      PaperType: this.paperType ? this.paperType : 0,
      PageIndex: 1,
      SubjectID: this.selectedSubjectId,
      ClassID: this.selectedClassId,
      ExamStatus: null,
      Status: this.paperStatus,
      PageSize: this.rowsOnPage,
      StrSearchValue: this.searchString,
      PaperModeType: this.paperModeType
    };
    this.getSearchResult(prepareData);
  }

  searchData() {
    const prepareData = {
      PaperType: this.paperType,
      pageIndex: 1,
      pageSize: this.rowsOnPage,
      SubjectID: this.selectedSubjectId,
      ClassID: this.selectedClassId,
      ExamStatus: null,
      Status: this.paperStatus,
      strSearchValue: this.searchString,
      PaperModeType: this.paperModeType
    };
    this.getSearchResult(prepareData);
  }

  getSearchResult(prepareData) {
    this.templateListData = [];
    this.templateService.getTemplateList(prepareData).subscribe((template) => {
      if (template && template.length > 0) {
        this.totalRecords = template[0].TotalRecords;
        let getUserinfo = JSON.parse(localStorage.getItem('user'));
        if (this.isGuestTeacher) {
          let freepapercount = JSON.parse(localStorage.getItem('FREEPAPERCOUNT'));
          let totaltemplate = template[0].TotalPaperCreatedCount;
          localStorage.setItem('TOTALPAPERCOUNT', template[0].TotalPaperCreatedCount);
          this.isShowAddButton = this.sharedService.canUserCreateTestOrExam(totaltemplate);
        }

        this.sharedService.updateAvailableCreditsCache(template[0].TotalPaperCreatedCount);
        this.sharedObservablesService.refreshAvailableCredits({
          isApiRefresh: false,
          isCacheRefresh: true
        });
        if (template.length > 0) {
          for (let i = 0; i < template.length; i++) {
            // if (template[i]['PaperType'] == 1 || template[i]['PaperType'] == 2) {
            this.templateListData.push(template[i]);
            // }
          }
          this.templateListDataAll = this.templateListData;
          // console.log(this.templateListData);
          this.isDataFound = true;
        }
        // console.log("total records:", this.totalRecords, "Records to show:", this.templateListData.length, template.length);

      } else {
        this.templateListData = [];
        this.isDataFound = false;
        this.isShowAddButton = this.sharedService.canUserCreateTestOrExam(0);
      }
    }, (error) => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastr.warning(UNAUTHERIZEDMESSASGE);
      } else {
      }
      if (this.isGuestTeacher) {
        this.isShowAddButton = this.sharedService.canUserCreateTestOrExam(0);
      }
      this.templateListData = [];
    });
  }



}
