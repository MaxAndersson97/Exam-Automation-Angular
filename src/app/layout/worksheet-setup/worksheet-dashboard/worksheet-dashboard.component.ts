import { Component, OnInit, ViewChild, HostListener, AfterViewInit, OnDestroy } from '@angular/core';
import { BsModalRef, ModalDirective, BsModalService } from 'ngx-bootstrap';
import { FormBuilder } from '@angular/forms';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { WorksheetService } from '../worksheet.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import * as _ from 'underscore';
import Swal from 'sweetalert2' //for sweet alert
import { BuyCreditComponent } from 'src/app/commons/buy-credit/buy-credit.component';
import { SharedObservablesService } from 'src/app/services/shared-observables.service';
declare var $: any;
@Component({
  selector: 'app-worksheet-dashboard',
  templateUrl: './worksheet-dashboard.component.html',
  styleUrls: ['./worksheet-dashboard.component.scss']
})
export class WorksheetDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('addWorksheetstep1') createWoeksheetModal: ModalDirective;
  @ViewChild('addWorksheetstep2') step2: ModalDirective;
  @ViewChild('noBooksAvalModal') noBooksAvalMdl: ModalDirective;
  @ViewChild('confirmationBox') confirmationBox: ModalDirective;
  @ViewChild('OutOfCreditDialogTemplate') OutOfCreditDialog: ModalDirective;
  @ViewChild(BuyCreditComponent) appBuyCredit: BuyCreditComponent | undefined;

  collection = [];
  rowsOnPage = 25;
  rowsOnPageTemp = 25;
  public rowsOnPageSet = [25, 50, 100, "ALL"];
  savedWorksheetData: [];
  totalRecords: any;
  addWorksheetFrm = this.fb.group({
    PaperType: 4,
    PaperGenerationMethod: ['3'],
    InstituteUserID: '',
    InstituteID: '',
    BoardID: '',
    MediumID: '',
    ClassID: null,
    SubjectID: null,
    Name: '',
    EAPaperTemplateID: '',
    ExamGroupID: ''
  });
  classesList: [];
  subjects: [];
  cheptersList: [];
  isEdit: false;
  public modalRef: BsModalRef;
  routeSub: any;
  isFormOpen: boolean = false;
  selectedTextBook: any;
  countChepter: number = 0;
  selectedBooksCount: number = 0;
  selectedChepterIDs: any;
  isOpenModal: false;
  status = [
    { 'name': 'Process', 'value': 4 },
    { 'name': 'Approved', 'value': 5 },
    { 'name': 'Rejected', 'value': 6 },
    { 'name': 'Pending', 'value': 7 },
    { 'name': 'Ready', 'value': 8 }
  ];
  createTemplateDataObj: any = {};
  templateListData: any = [];
  showFilter: boolean = false;
  subjectList: any = [];
  standardList: any = [];
  ddlStatus: any = null;
  selectedOption: any = null;
  selectedSubjectId: any = null;
  isDataFound: boolean = false;
  currentTemplateID: any;
  createddate: any;
  createdtime: any;
  page: number = 1;
  searchString: string = "";
  isGuestTeacher: boolean = false;
  isShowAddButton: boolean = true;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.isFormOpen) {
      $event.returnValue = true;
    }
  }

  constructor(private fb: FormBuilder,
    private addWingService: AddWingService,
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private worksheetService: WorksheetService,
    private modalService: BsModalService,
    private toastService: ToastrService,
    private sharedService: SharedDataService,
    private sharedObservablesService: SharedObservablesService) { }

  ngOnInit() {
    localStorage.removeItem('subjectSetting');
    this.selectedChepterIDs = [];
    this.getInstituteDDLClass();
    this.totalRecords = 0;
    this.sharedService.currentTemplateData.subscribe(obj => {
      this.createTemplateDataObj = obj;
    }, error => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastService.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toastService.error(error.error['message']);
      }
    });

    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    if (getUserinfo.roles.indexOf('GuestTeacher') != -1) {
      this.isGuestTeacher = true;
    }
    this.getWorksheetList();

  }

  public createDuplicatePaper(templateId) {
    if (this.isShowAddButton) {
      this.sharedService.createDuplicatePaper(templateId).subscribe(
        () => {
          this.toastService.info("Paper created Successfully.");
          this.ngOnInit();
        },
        () => {
          this.toastService.info("Paper creation failed.");
        }
      );
    } else {
      this.appBuyCredit.loadCredits();
      this.OutOfCreditDialog.show();
    }
  }
  // ngAfterViewInit(){
  //     this.sharedService.currentOpenCreateModal.subscribe(val => {
  //       this.isOpenModal = val;
  //       //console.log(this.isOpenModal);
  //       if(val == true){
  //         this.createWoeksheetModal.show();
  //         this.addWorksheetFrm.reset();
  //       }
  //       this.addWorksheetFrm.patchValue({
  //         PaperGenerationMethod: '3'
  //       })

  //     }, error=>{
  //       if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
  //         this.toastService.warning(UNAUTHERIZEDMESSASGE);
  //      }else{
  //          this.toastService.error(error.error['message']);
  //      }
  //     });
  //   }


  // worksheet listing functionality
  getWorksheetList() {
    const prepareData = {
      PaperType: 4,
      pageIndex: 1,
      pageSize: this.rowsOnPage,
      strSearchValue: this.searchString
    };
    this.getSearchResult(prepareData);
  }
  showFilterBox() {
    this.showFilter = !this.showFilter;
  }

  clearFilter() {
    this.ddlStatus = null;
    this.selectedOption = null;
    this.selectedSubjectId = null;
    this.subjects = [];
    this.searchString = "";
    this.page = 1;
    const prepareData = {
      PaperType: 4,
      pageIndex: 1,
      pageSize: this.rowsOnPage
    };
    this.getSearchResult(prepareData);
  }

  getCurrentPage(currentPage) {
    const prepareData = {
      PaperType: 4,
      pageIndex: currentPage,
      pageSize: this.rowsOnPage,
      SubjectID: this.selectedSubjectId,
      ClassID: this.selectedOption,
      ExamStatus: null,
      Status: this.ddlStatus,
      strSearchValue: this.searchString
    };
    this.getSearchResult(prepareData);
  }

  filterData(classId, subjectId, status) {
    const data = {
      SubjectID: subjectId,
      ClassID: classId,
      Status: status,
      PaperType: 4,
      pageIndex: 1,
      pageSize: this.rowsOnPage
    };

    this.showFilter = !this.showFilter;
    this.getSearchResult(data);
  }

  searchData() {
    const prepareData = {
      PaperType: 4,
      pageIndex: 1,
      pageSize: this.rowsOnPage,
      SubjectID: this.selectedSubjectId,
      ClassID: this.selectedOption,
      ExamStatus: null,
      Status: this.ddlStatus,
      strSearchValue: this.searchString
    };
    this.getSearchResult(prepareData);
  }

  getSearchResult(prepareData) {
    this.templateListData = [];
    this.templateService.getTemplateList(prepareData).subscribe((template) => {
      if (template && template.length > 0) {
        this.totalRecords = template[0].TotalRecords;
        if (this.isGuestTeacher) {
          let freepapercount = JSON.parse(localStorage.getItem('FREEPAPERCOUNT'));
          let totaltemplate = template[0].TotalPaperCreatedCount;
          localStorage.setItem('TOTALPAPERCOUNT', template[0].TotalPaperCreatedCount);
          // if(totaltemplate >= freepapercount) {
          //   this.isShowAddButton = false;
          // }
          this.isShowAddButton = this.sharedService.canUserCreateTestOrExam(totaltemplate);
        }

        this.sharedService.updateAvailableCreditsCache(template[0].TotalPaperCreatedCount);
        this.sharedObservablesService.refreshAvailableCredits({
          isApiRefresh: false,
          isCacheRefresh: true
        });
        this.templateListData = template;
        for (let i = 0; i <= this.templateListData.length; i++) {
          this.collection.push(`item ${i}`);
          this.createddate = this.templateListData[i] && this.templateListData[i]['CreatedDateTime'];
          this.createdtime = this.templateListData[i] && this.templateListData[i]['CreatedDateTime'];
          if (this.createddate) {
            this.templateListData[i]['CreatedDateTime'] = this.createddate.split(" ", 1);
          }
          if (this.createdtime) {
            this.templateListData[i]['fortime'] = this.createddate.split(' ').slice(1, 2);
          }
        }
        this.isDataFound = true;
      } else {
        this.templateListData = [];
        //this.isDataFound = false;
      }
    }, (error) => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastService.warning(UNAUTHERIZEDMESSASGE);
      } else {
        // this.toastService.error(error.error['message']);
      }
      this.templateListData = [];
      if (this.isGuestTeacher) {
        let freepapercount = JSON.parse(localStorage.getItem('FREEPAPERCOUNT'));
        let totaltemplate = JSON.parse(localStorage.getItem('TOTALPAPERCOUNT'));
        // if(totaltemplate >= freepapercount) {
        //   this.isShowAddButton = false;
        // }
        this.isShowAddButton = this.sharedService.canUserCreateTestOrExam(0);
      }
    });
  }
  navigateToWorksheetHome() {
    // this.createWoeksheetModal.show();
    if (this.isShowAddButton) {
      this.router.navigate(['../create-worksheet'], { relativeTo: this.route });
    } else {
      this.appBuyCredit.loadCredits();
      this.OutOfCreditDialog.show();
    }
  }
  get f() { return this.addWorksheetFrm.controls; }

  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
        this.classesList = classes.filter(element => element['IsClassShowInPortal'] === true);
      } else {
        this.classesList = [];
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      this.classesList = [];
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
    }
  }
  getClassId() {
    var clsId = this.addWorksheetFrm.controls.ClassID.value;
    if (!!clsId) {
      //this.f.SubjectID['value'] = null;
      this.addWorksheetFrm.patchValue({
        'SubjectID': null
      });
      this.subjects = [];
      this.getSubject(clsId);
    }
  }
  getSubject(classId) {
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjects = _.filter(subjects, function (obj) {
          return (obj.IsSelected)
        });
      } else {
        this.subjects = [];
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
      this.subjects = [];
    };
    this.templateService.getInstituteDDLSubject(classId)
      .subscribe(getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  };
  submitStepOne(frmData) {
    var frmData = this.addWorksheetFrm.value;
    let addData = {};
    if (!this.isEdit) {
      addData = {
        ClassID: frmData.ClassID,
        SubjectID: frmData.SubjectID,
        Name: frmData.Name,
        EAPaperTemplateID: '00000000-0000-0000-0000-000000000000',
        ExamGroupID: '00000000-0000-0000-0000-000000000000',
        PaperGenerationMethod: frmData.PaperGenerationMethod
      };
    } else {
      addData = {
        ClassID: frmData.ClassID,
        SubjectID: frmData.SubjectID,
        Name: frmData.Name,
        // EAPaperTemplateID: this.selectedTemplateData['EAPaperTemplateID'],
        // ExamGroupID: this.selectedTemplateData['ExamGroupID']
      };
    }
    addData['PaperType'] = 4;
    const getInstituteDDLClassSuccess = (template) => {
      if (template['data']) {
        this.sharedService.setCreatedTemplateData(template['data']);
        this.createWoeksheetModal.hide();
        this.sharedService.setOpenModuleData(false);
        this.router.navigate(['../chepters', template['data']['EAPaperTemplateID']], { relativeTo: this.route });

      } else {
        this.isFormOpen = false;
      }
    };
    const getInstituteDDLClassFailure = (error: HttpErrorResponse) => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastService.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toastService.error(error.error['message']);
      }
    };

    this.templateService.addNewTemplate(addData)
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('onSubmit() Request Complete')
      );
  }

  openWorksheetModal1() {
    // this.isFormOpen = true;
    // this.createWoeksheetModal.show();
    //this.sharedService.setOpenModuleData(false);
    // this.subjects = [];

    if (this.isShowAddButton) {
      this.router.navigate(['../create-worksheet'], { relativeTo: this.route });
    } else {
      this.appBuyCredit.loadCredits();
      this.OutOfCreditDialog.show();
    }

  }
  openStepTwoForm() {
    this.addWorksheetFrm.reset();
    this.isFormOpen = true;
    this.createWoeksheetModal.hide();
    this.step2.show();
  }

  goBackStepOne() {
    this.isFormOpen = true;
    this.step2.hide();

    this.createWoeksheetModal.show();
  }

  countBooksAndChepter() {
    setTimeout(() => {
      this.selectedTextBook = [];
      this.countChepter = 0;
      this.selectedBooksCount = 0;
      for (let i = 0; i < this.cheptersList.length; i++) {
        let chepterList: any;
        const selectedChepaters = [];
        chepterList = this.cheptersList[i]['listEAChapterInfoMember'];
        for (let index = 0; index < chepterList.length; index++) {
          const element = chepterList[index];
          if (element.isChecked == true) {
            this.countChepter = this.countChepter + 1;
            const tempChept = {
              ChapterID: element.ChapterID,
              Topics: []
            }
            selectedChepaters.push(tempChept);
          }
          if (chepterList.length - 1 == index && selectedChepaters.length > 0) {
            console.log(this.selectedTextBook)
            this.selectedTextBook.push({
              TextBookID: this.cheptersList[i]['TextBookID'],
              Source: 3,
              Chapters: selectedChepaters
            });
          }
        }
      };
    }, 10);
  }

  submitStepTwo() {

    this.APICall();
  }

  APICall() {
    const selectedTextBook = [];
    this.countChepter = 0;
    for (let i = 0; i < this.cheptersList.length; i++) {
      let chepterList: any;
      const selectedChepaters = [];
      chepterList = this.cheptersList[i]['listEAChapterInfoMember'];
      for (let index = 0; index < chepterList.length; index++) {
        const element = chepterList[index];
        if (element.isChecked) {
          this.countChepter = this.countChepter + 1;
          const tempChept = {
            ChapterID: element.ChapterID,
            Topics: []
          }
          this.selectedChepterIDs.push(tempChept.ChapterID);
          selectedChepaters.push(tempChept);
        } else if (element.isChecked == false) {
          this.countChepter = this.countChepter > 0 ? this.countChepter - 1 : null;
        };
        if (chepterList.length - 1 == index && selectedChepaters.length > 0) {
          selectedTextBook.push({
            TextBookID: this.cheptersList[i]['TextBookID'],
            Source: 3,
            Chapters: selectedChepaters
          });
        }
      }
    };
    this.sharedService.setChepterIds(JSON.stringify(this.selectedChepterIDs));

    const prepareDataToSave = {
      EAPaperTemplateID: this.savedWorksheetData['EAPaperTemplateID'],
      Selected_EAPaperTemplateID: "00000000-0000-0000-0000-000000000000",
      TextBooks: selectedTextBook
    }
    this.worksheetService.saveChepterForWorksheet(prepareDataToSave).subscribe(
      (result) => {
        console.log(result['PaperGenerationMethod']);
        if (this.savedWorksheetData['PaperGenerationMethod'] == 2) {
          this.router.navigate(['../worksheet-setting', this.savedWorksheetData['EAPaperTemplateID']], { relativeTo: this.route });
        } else {
          this.router.navigate(['../cherry-pick', this.savedWorksheetData['EAPaperTemplateID']], { relativeTo: this.route });

        }

      }, (error) => {
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toastService.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toastService.error(error.error['message']);
        }

      });
  }
  hideModel() {
    this.noBooksAvalMdl.hide();
  }


  createPaperManually() {
    this.noBooksAvalMdl.hide();
    this.confirmationBox.show();

  }
  navigateToDashboard() {
    this.isFormOpen = false;
    this.confirmationBox.hide();
    this.step2.hide();
  }

  hideConfrmtionModal() {
    this.confirmationBox.hide();
  }

  // delete paper till paper not approved
  //   deletePaper(templateid){
  //     Swal.fire({
  //       title: 'Are you sure?',
  //       text: "You won't be able to revert this!",
  //       type: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) => {
  //       if (result.value) {
  //         this.sharedService.deletePaper(templateid).subscribe(res=>{
  //         this.toastService.success('Paper deleted successfully.');
  //         this.getWorksheetList();
  //         }, error =>{

  //         });
  //       }
  //     })
  // }
  closeStep1Model() {
    this.isFormOpen = false;
    this.sharedService.setOpenModuleData(false);
    this.createWoeksheetModal.hide();
    this.subjects = [];
  }
  confirmDeleteWing(template, templateID) {
    this.currentTemplateID = templateID;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
  }
  // delete paper till paper not approved
  deletePaper() {
    console.log(this.currentTemplateID, 'currenttemplateid');
    this.sharedService.deletePaper(this.currentTemplateID).subscribe(res => {
      this.toastService.success('Paper deleted successfully.');
      this.getWorksheetList();
      this.modalRef.hide();
    }, error => {
    });
  }

  ngOnDestroy() {
    this.sharedService.setOpenModuleData(false);
  }

  closeModalOutOfCredit(event) {
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


}
