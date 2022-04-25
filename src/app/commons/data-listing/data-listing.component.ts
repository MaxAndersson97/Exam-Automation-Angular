import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { TableHeader } from 'src/app/model/tableheader';
import { HttpErrorResponse } from '@angular/common/http';
import { FIlterListData } from 'src/app/model/filterlistdata';
import { ApplyFilterObject } from 'src/app/model/applyfilter';
import { EventObject } from 'src/app/model/eventobject';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import { ToastrService } from 'ngx-toastr';
import { Institute } from 'src/app/institute';
import { StaffListRequest } from 'src/app/model/stafflistrequest';
import { Student } from 'src/app/model/student';
import { StudentListService } from 'src/app/layout/student-list/student-list.service';
import { AddStudentService } from './../../layout/add-student-manually/add-student/add-student.service';
import { DropDownService } from 'src/app/commons/drop-down.service';
import { InstituteClass } from '../../layout/institute-class';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { InstituteService } from 'src/app/institute.service';
import { ClassSetupService } from 'src/app/layout/class-setup/class-setup.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import * as _ from 'underscore';
import Swal from 'sweetalert2';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { FilterListObject } from 'src/app/model/filterlistobject';
import { ROLES, ROLES1, STATUS } from 'src/app/Utils/utils';
import { Utils } from 'fusioncharts';

@Component({
    selector: 'app-data-listing',
    templateUrl: './data-listing.component.html',
    styleUrls: ['./data-listing.component.scss']
})
export class DataListingComponent implements OnInit {

    roles: FilterListObject[];
    UserID = '';
    SubjectID = '';
    AESectionID = '';
    ClassID = '';
    isAllEnable: boolean = false;

    config: any;
    public modalRef: BsModalRef
    classes: Array<InstituteClass>;
    _tableHeader: TableHeader[];
    _dataArr: any;
    sectionList: [];
    sectionlistcheck: [];
    sectionList2: [];
    tableRowsToBeDisplayed: number;
    totalMemberCount: number = 0;
    isshowgrid: boolean = false;
    isshowlist: boolean = true;
    collection = [];
    rowsOnPage = 25;
    rowsOnPageTemp = 25;
    page = 1;
    public rowsOnPageSet = [25, 50, 100, "ALL"];
    currentPage: 1;

    isAllCheck: boolean = false;
    isDemo: boolean = false;

    checkedcount: Number = 0;

    academicList: any = [];
    academicYearsID: any = "";

    deletemodulenames: String = "";

    selectedClassSectionList: any = [];
    @ViewChild('childModal2') childModal: ModalDirective;
    @ViewChild('changeStaffStatusModal') changeStaffStatusModal: ModalDirective;
    @Input() redirectEditLink: string;
    @Input() title: string;
    @Input() moduleName: string;
    @Output() addClickEmitter: EventEmitter<string> = new EventEmitter<string>();
    @Output() uploadCSVClickEmitter: EventEmitter<string> = new EventEmitter<string>();
    selectedStaff: any;
    sectionList1: any[];
    currentStaff: any = {};
    @Input()
    public set dataArray(val: any) {
        this._dataArr = val;
        this.displayArr = val;
    }
    public get dataArray(): any {
        return this._dataArr;
    }
    displayArr: any;
    displayStudentArr = [];
    isApplyFilterOn = true;

    @Input() filterListData: FIlterListData[];
    @Input()
    public set tableHeaders(val: TableHeader[]) {
        this._tableHeader = val;
    }
    public get tableHeaders(): TableHeader[] {
        return this._tableHeader;
    }
    searchStr: string;
    roleData = ['VicePrincipal', 'Teacher', 'Supervisor', 'Principal', 'Director', 'GuestTeacher'];
    allStatus = [{ 'name': 'Active', 'value': 1 }, { 'name': 'Inactive', 'value': 2 }];
    reasons = ['Resigned', 'Terminated', 'Long Leave', 'Other'];
    changeStatusObj: any = {};
    statusData: number = 0;
    ClassTeacherList: any = [];
    SubjectTeacherList: any = [];
    filtermodel = {
        roleFilterModel: null,
        statusFilterModel: null
    };

    studentFiltermodel = {
        sectionFilterModel: null,
        classFilterModel: null,
        statusFilterModel: null,
        genderFilterModel: null

    };

    sectionFilterModel = {};
    classFilterModel = {};

    sectionFilterModel1 = {};
    classFilterModel1 = {};
    subjectFilterModal1 = {};


    //for class teacher
    classmodl: any = null;
    sectionmodal: any = null;

    //for subject teacher
    classmodl1: any = null;
    sectionmodal1: any = null;
    subjectmodl1: any = null;
    subjectList: any = [];
    subjectList2: any = [];
    selectedClassSectionList1: any = [];
    selectedIndex: number;
    @Output() applyFilterEmitter: EventEmitter<ApplyFilterObject[]> = new EventEmitter<ApplyFilterObject[]>();
    @Output() actionEmitter = new EventEmitter();
    showFilter: Boolean = false;
    applyFilterList: ApplyFilterObject[] = new Array<ApplyFilterObject>();

    constructor(private router: Router,
        private sharedService: SharedDataService,
        private addStudentService: AddStudentService,
        private staffService: StaffService,
        private studentService: StudentListService,
        private toaster: ToastrService,
        private classSetupService: ClassSetupService,
        private instituteService: InstituteService,
        private dropDownService: DropDownService, private modalService: BsModalService,
        private academicYearService: AcademicYearService) {

    }

    ngOnInit() {
        this.roles = [];
        this.isDemo = JSON.parse(localStorage.getItem('schoolProfile')).IsDemo;

        let isOnlyRegister = JSON.parse(localStorage.getItem('schoolProfile')).OnlyRegistration;

        if (isOnlyRegister) {
            this.roles = ROLES1;
        } else {
            this.roles = ROLES;
        }
        this.getInstituteDDLClass();
        if (this.moduleName == 'Student') {
            this.getAcademicYearClass();
        }
        //to prevent the view dropdown close on checkbox click
        document.getElementById("colDDL").addEventListener("click", function (e) {
            e.stopPropagation();
        });
    }

    searchText() {
        this.getStaffs();
    }

    showgrid() {
        this.isshowgrid = true;
        this.isshowlist = false;
    }
    showlist() {
        this.isshowlist = true;
        this.isshowgrid = false;
    }

    getStaffs() {
        const staffListRequest: StaffListRequest = new StaffListRequest();
        const institute: Institute = JSON.parse(localStorage.getItem('institute'));
        staffListRequest.InstituteID = institute.InstituteID;
        staffListRequest.PageIndex = 1;
        staffListRequest.PageSize = 500;
        staffListRequest.Role = [];
        staffListRequest.Role = this.roleData;
        staffListRequest.status = this.statusData;
        staffListRequest.strSearchValue = '';
        staffListRequest["ClassIDs"] = (!!this.filtermodel['ClassID']) ? [this.filtermodel['ClassID']] : [],
            staffListRequest["SubjectIDs"] = (!!this.filtermodel['SubjectID']) ? [this.filtermodel['SubjectID']] : [],
            staffListRequest["SectionIDs"] = (!!this.filtermodel['AESectionID']) ? [this.filtermodel['AESectionID']] : [];
        this.staffService.getStaffListWithParams(staffListRequest).subscribe(res => {
            this.displayArr = res.data;
            for (let i = 1; i <= this.displayArr.length; i++) {
                this.collection.push(`item ${i}`);
            }
        }, error => {
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                // this.toaster.error(error.error['message']);
            }
            this.displayArr = [];
            //this.toaster.error(error.error['message']);
        });
    }

    getStudents() {
        const studentListRequest: Student = new Student();
        const institute: Institute = JSON.parse(localStorage.getItem('institute'));
        studentListRequest.InstituteID = institute.InstituteID;
        if (this.filtermodel['AESectionID']) {
            studentListRequest.EASectionListID = [];
            studentListRequest.EASectionListID.push(this.filtermodel['AESectionID']);
        } else {
            studentListRequest.EASectionListID = ['']
        }
        studentListRequest.ClassID = !!this.filtermodel['ClassID'] ? this.filtermodel['ClassID'] : '00000000-00000000-00000000-00000000';
        studentListRequest.Status = !!this.filtermodel.statusFilterModel ? this.filtermodel.statusFilterModel == 'Active' ? 1 : 2 : null;
        studentListRequest.Gender = !!this.filtermodel['genderFilterModel'] ? this.filtermodel['genderFilterModel'] : '';
        studentListRequest.AcademicYearID = !!this.filtermodel['academicYearsID'] ? this.filtermodel['academicYearsID'] : '00000000-00000000-00000000-00000000';

        this.studentService.getStudentList(studentListRequest).subscribe(res => {
            this.displayArr = [];
            this.displayArr = res;
            for (let i = 1; i <= this.displayArr.length; i++) {
                this.collection.push(`item ${i}`);
            }
        }, error => {
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['message']);
            }
            this.displayArr = [];
        });

    }

    selectChange(event, filterName) {
        if (event.name) {
            if (filterName == 'Role') {
                this.roleData = [event.name];
                this.isApplyFilterOn = true;
                //this.getStaffs();
            } else if (filterName == 'ProfileStatus') {

                switch (event.name) {
                    case 'Active':
                        this.statusData = 1;
                        break;
                    case 'Inactive':
                        this.statusData = 2;
                        break;
                    case 'All Status':
                        this.statusData = 0;
                        break;
                    default:
                        break;
                }

                //this.getStaffs();
            }

            else {
                this.isApplyFilterOn = true;
            }

        } else {
            this.isApplyFilterOn = false;
        }

    }
    selectStudentChange(event, filterName) {
        if (event.name) {
            if (filterName == 'Role') {
                this.roleData = [event.name];
                this.isApplyFilterOn = true;
                //this.getStaffs();
            } else if (filterName == 'Status') {

                switch (event.name) {
                    case 'Active':
                        this.statusData = 1;
                        break;
                    case 'Inactive':
                        this.statusData = 2;
                        break;
                    case 'All Status':
                        this.statusData = 0;
                        break;
                    default:
                        break;
                }

                //this.getStaffs();
            }

            else {
                this.isApplyFilterOn = true;
            }

        } else {
            this.isApplyFilterOn = false;
        }

    }
    onClearFilter() {
        this.isAllEnable = false;
        this.studentFiltermodel = {
            sectionFilterModel: null,
            classFilterModel: null,
            statusFilterModel: null,
            genderFilterModel: null
        }
        this.filtermodel = {
            roleFilterModel: null,
            statusFilterModel: null,

        };
        this.roleData = ['VicePrincipal', 'Teacher', 'Supervisor', 'Principal', 'Director'];
        this.statusData = 0;
        this.showFilter = false;
        this.displayArr = this.dataArray;
        this.sectionList = [];
        this.subjectList = [];
    }

    showFilterBox() {
        this.showFilter = !this.showFilter;
    }
    onApplyStudentFilter() {
        this.showFilter = false;
        if (this.filtermodel['academicYearsID'] != null && this.filtermodel['ClassID'] != null && this.filtermodel['AESectionID'] != null) {
            this.isAllEnable = true;
        }
        this.getStudents();
    }

    onApplyFilter() {
        this.showFilter = false;
        if (this.filtermodel['ClassID'] != null && this.filtermodel['AESectionID'] != null) {
            this.isAllEnable = true;
        }
        this.getStaffs();
    }

    onAddClick() {
        this.addClickEmitter.emit('Add Click');
    }
    onUploadCSVCLick() {
        this.uploadCSVClickEmitter.emit('Upload CSV Click');
    }
    OnCheckBoxSelected(th: TableHeader) {
        if (th.visible === true) {
            th.visible = false;
        } else {
            th.visible = true;
        }
    }
    OnCheckBoxStudentSelected(th: TableHeader) {
        if (th.visible === true) {
            th.visible = false;
        } else {
            th.visible = true;
        }
    }
    onSelection(dt: any, event: any, i) {
        this.currentStaff = !!dt ? dt : this.currentStaff;
        const eventObject: EventObject = new EventObject();
        eventObject.type = event;
        eventObject.data = this.currentStaff;
        console.log("tttttttt", this.currentStaff);

        if (event == 'Status') {
            this.onClearFilter();
            let arrayObj = this.displayArr[i];
            arrayObj.ProfileStatus = arrayObj.ProfileStatus == 1 ? 2 : 1;
        }
        // if (dt === 'twentyfive') {
        //     this.tableRowsToBeDisplayed = 25;
        // }
        // else if (dt === 'fifty') {
        //     this.tableRowsToBeDisplayed = 50;
        // }
        // else if (dt === 'hundred') {
        //     this.tableRowsToBeDisplayed = 100;
        // } else {
        //     this.tableRowsToBeDisplayed = 5;
        // }
        this.actionEmitter.emit(eventObject);
        this.modalRef && this.modalRef.hide();
    }
    getInstituteDDLClass() {
        const getInstituteDDLClassSuccess = (classes: Array<InstituteClass>) => {
            if (classes) {
                this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
            } else {
                this.classes = [];
            }
        };
        const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
            const { error, error_description } = httpError.error;
            console.log(error, error_description);
        };
        this.instituteService.getInstituteDDLClass()
            .subscribe(
                getInstituteDDLClassSuccess,
                getInstituteDDLClassFailure,
                () => console.log('getInstituteDDLClass() Request Complete')
            );
    }

    getSectionByClassID(ClassID) {
        if (!!ClassID) {
            console.log(ClassID);
        }
        this.sectionmodal = null;
        this.addStudentService.getSectionByClassID(ClassID).subscribe(section => {

            // this.sectionList = [];
            // for (let index = 0; index < section.length; index++) {
            //     if(section[index]['SectionStatus']==1){
            //         this.sectionList = section;
            //     }
            // }
            this.sectionList = section;
            console.log(this.sectionList);
            this.studentFiltermodel.sectionFilterModel = '';
        }, error => {
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['message']);
            }
            this.sectionList = [];
            this.studentFiltermodel.sectionFilterModel = '';

        });
    }

    getAcademicYearClass() {
        const getAcademicYearClassSuccess = (academicYear) => {
            this.academicList = academicYear.filter(x => x.AcademicStatus === 1);
        };
        const getAcademicYearClassFailure = (httpError: HttpErrorResponse) => {
            const { error, error_description } = httpError.error;
            this.academicYearsID = "";
        };
        this.academicYearService.getAcademicYears()
            .subscribe(
                getAcademicYearClassSuccess,
                getAcademicYearClassFailure
            );
    }

    selectSection(sectionID) {
    }

    confirmDelete(dt, template: TemplateRef<any>) {
        this.currentStaff = dt;
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    }


    showChildModal(staff): void {
        this.selectedStaff = staff;

        this.getclassAndSubjectAssignedList();
    }

    hideChildModal(): void {
        this.childModal.hide();
    }

    getSectionByClassID1(classobj) {

        if (!!classobj) {
            console.log(classobj);
        }

        this.classFilterModel = classobj;
        this.sectionmodal = null;
        this.addStudentService.getSectionByClassID(classobj['ClassID']).subscribe(section => {
            this.sectionList1 = [];
            this.sectionlistcheck = [];
            this.sectionlistcheck = section;

            for (let index = 0; index < this.sectionlistcheck.length; index++) {
                if (this.sectionlistcheck[index]['SectionStatus'] != 2) {
                    this.sectionList1.push(this.sectionlistcheck[index]);
                }
            }
            console.log(this.sectionList1);
            this.sectionFilterModel = '';

        }, error => {
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['message']);
            }
            this.sectionList1 = [];
            this.sectionFilterModel = '';
        }
        )
    }

    changeSection1(event) {
        this.sectionFilterModel = event;
    }

    deleteclass(i) {
        this.selectedClassSectionList.splice(i, 1);
    }

    addClassTeacher() {
        console.log(this.classFilterModel, this.sectionFilterModel);
        this.selectedClassSectionList.push({ 'classDetails': this.classFilterModel, 'sectionDetails': this.sectionFilterModel, isSaved: false });
        this.sectionmodal = null;
        this.classmodl = null;
        this.classFilterModel = null;
        this.sectionFilterModel = null;
        this.sectionList2 = [];
        console.log(this.selectedClassSectionList);
    }

    addClassTeacher2() {
        console.log(this.sectionmodal1, this.classmodl1, this.subjectmodl1);
        this.selectedClassSectionList1.push({ 'classDetails': this.classFilterModel1, 'sectionDetails': this.sectionFilterModel1, 'subjectDetails': this.subjectFilterModal1, isSaved: false });

        this.sectionmodal1 = null;
        this.classmodl1 = null;
        this.subjectmodl1 = null;
        this.classFilterModel1 = null;
        this.sectionFilterModel1 = null;
        this.subjectFilterModal1 = null;
        this.subjectList2 = [];
        this.sectionList2 = [];
        console.log(this.selectedClassSectionList1);
    }



    saveClassTeacherForSelectedClass() {
        this.selectedClassSectionList.forEach((element, indx) => {
            if (!element.isSaved) {
                this.classSetupService.addOrUpdateClassTeacher(element['classDetails']['ClassID'], element['sectionDetails']['AESectionID'], this.selectedStaff['UserID']).subscribe(res => {
                    console.log("eeeeeeee", res);
                    this.selectedClassSectionList = [];
                    this.toaster.success('Class teacher assigned successfully.');
                }, error => {
                    if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                        this.toaster.warning(UNAUTHERIZEDMESSASGE);
                    } else {
                        this.toaster.error(error.error['message']);
                    }
                });
            }
        });
        this.childModal.hide();
    }

    getSubjectByClassID2(event) {
        this.subjectmodl1 = null;
        this.classSetupService.getSubjectListByClassAndSectionId(event['ClassID']).subscribe(res => {
            this.subjectList2 = [];
            let a = _.filter(res, function (obj) {
                return (obj.IsSelected)
            });

            this.subjectList2 = a;
            this.subjectFilterModal1 = '';
        }, error => {
            this.subjectList2 = [];
            this.subjectFilterModal1 = '';
        });
    }

    getSectionByClassID2(classobj) {
        if (!!classobj) {
            console.log(classobj);
        }
        this.getSubjectByClassID2(classobj);
        this.classFilterModel1 = classobj;
        this.subjectmodl1 = null;
        this.subjectList2 = [];
        this.sectionmodal1 = null;
        this.addStudentService.getSectionByClassID(classobj['ClassID']).subscribe(section => {
            console.log(section);
            this.sectionList2 = [];
            this.sectionlistcheck = [];
            this.sectionlistcheck = section;
            for (let index = 0; index < this.sectionlistcheck.length; index++) {
                if (this.sectionlistcheck[index]['SectionStatus'] != 2) {
                    this.sectionList2.push(this.sectionlistcheck[index]);
                }
            }
            console.log(this.sectionList2);

            this.sectionFilterModel1 = '';

        }, error => {
            this.sectionList2 = [];
            this.sectionFilterModel1 = '';
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['message']);
            }

        }
        )
    }

    changeSection2(event) {
        this.sectionFilterModel1 = event;

    }

    changeSubject2(event) {
        this.subjectFilterModal1 = event;
    }

    deleteclass2(i) {
        this.selectedClassSectionList1.splice(i, 1);
    }
    getclassAndSubjectAssignedList() {
        let data = {
            TeacherID: this.selectedStaff['UserID'],
            InstituteID: this.selectedStaff['InstituteID']
        }
        this.sharedService.getClassandSubjectList(data).subscribe(res => {
            if (res['data']) {

                res['data']['ClassTeacherList'].forEach(element => {
                    element.isSaved = true;
                    element.classDetails = {
                        ClassID: element.ClassID,
                        ClassName: element.ClassName
                    };
                    element.sectionDetails = {
                        SectionName: element['SectionName'],
                        AESectionID: element['AESectionID']
                    }

                });
                this.ClassTeacherList = this.selectedClassSectionList = res['data']['ClassTeacherList'];

                res['data']['SubjectTeacherList'].forEach(element => {
                    element.isSaved = true;
                    element.classDetails = {
                        ClassID: element.ClassID,
                        ClassName: element.ClassName
                    };
                    element.sectionDetails = {
                        SectionName: element['SectionName'],
                        AESectionID: element['AESectionID']
                    }
                    element.subjectDetails = {
                        SubjectName: element['SubjectName'],
                        SubjectID: element['SubjectID'],
                        AESubjectID: element['AESubjectID']
                    }

                });
                this.SubjectTeacherList = this.selectedClassSectionList1 = res['data']['SubjectTeacherList'];

                //   subject
                this.sectionmodal1 = null;
                this.classmodl1 = null;
                this.subjectmodl1 = null;
                this.classFilterModel1 = null;
                this.sectionFilterModel1 = null;
                this.subjectFilterModal1 = null;
                this.subjectList2 = [];
                this.sectionList2 = [];

                // class
                this.sectionmodal = null;
                this.classmodl = null;
                this.classFilterModel = null;
                this.sectionFilterModel = null;
                this.sectionList1 = [];

                this.childModal.show();
            }
        }, error => {

        })
    }


    saveClassTeacherForSelectedClass1() {
        let subjectList2 = [];
        let totaltemplateSubjct = [];
        let aesectionid;
        this.selectedClassSectionList1.forEach((element, indx) => {
            if (!element.isSaved) {
                let tempSubject = {};
                tempSubject["SubjectTeacherUserID"] = this.selectedStaff['UserID'];
                tempSubject["EASubjectID"] = element['subjectDetails']['AESubjectID'];
                tempSubject["SubjectID"] = element['subjectDetails']['SubjectID'];
                tempSubject["EASectionID"] = element.sectionDetails['AESectionID'];
                totaltemplateSubjct = totaltemplateSubjct.concat(tempSubject);
                aesectionid = element.sectionDetails['AESectionID'];
                // this.classSetupService.saveSubjectList(totaltemplateSubjct, element.sectionDetails['AESectionID']).subscribe(res => {
                //     this.selectedClassSectionList1 = [];
                //     this.toaster.success('Subject teacher assigned successfully.');
                // }, error => {
                // if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                //     this.toaster.warning(UNAUTHERIZEDMESSASGE);
                // } else {
                //     this.toaster.error(error.error['message']);
                // }
                // });

            }
        });
        this.multipleSubjectTeacher(aesectionid, totaltemplateSubjct);
        this.childModal.hide();
    }

    multipleSubjectTeacher(aesectionid, totaltemplateSubjct) {
        console.log(totaltemplateSubjct, aesectionid);
        this.classSetupService.saveSubjectList(totaltemplateSubjct, aesectionid).subscribe(res => {
            this.selectedClassSectionList1 = [];
            this.toaster.success('Subject teacher assigned successfully.');
        }, error => {
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['message']);
            }
        });
    }
    saveAllListData() {
        debugger
        console.log(this.selectedClassSectionList, this.selectedClassSectionList1);
        this.saveClassTeacherForSelectedClass();
        this.saveClassTeacherForSelectedClass1();
        this.childModal.hide();

    }
    changeStudentStatus(student) {
        let prepare = {
            "StudentID": student['StudentID'],
            "InstituteID": student['InstituteID'],
            "UserID": student['UserID'],
            "ReasonMessage": '',
            "Other": ''
        }
        this.staffService.changeStaffStatus(prepare).subscribe(res => {
            this.getStudents();
            Swal.fire({
                type: 'success',
                title: '<h4>status changed successfully.</h4>',
                showConfirmButton: false,
                timer: 2000
            })
        }, error => {
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['message']);
            }
        })
    }

    openStaffStatusModal1(staff, i) {
        console.log(staff, i);
        this.selectedStaff = staff;
        this.selectedIndex = i;
        this.changeStatusObj['staffStatus'] = staff.ProfileStatus;

        if (staff.ReasonMessage == 'Other') {
            this.changeStatusObj['reason'] = 'Other';
            this.changeStatusObj.otherReason = staff.ReasonOther;
        } else {
            this.changeStatusObj['reason'] = staff.ReasonMessage ? staff.ReasonMessage : null;
            this.changeStatusObj.otherReason = null;

        }
        console.log(this.changeStatusObj['staffStatus']);
        this.changeStaffStatusModal.show();
    }

    closeChangeModal() {
        this.changeStaffStatusModal.hide();
    }

    saveStaffStatus() {
        let prepare = {
            "StudentID": this.selectedStaff['StudentID'],
            "InstituteID": this.selectedStaff['InstituteID'],
            "UserID": this.selectedStaff['UserID'],
            "ReasonMessage": this.changeStatusObj['reason'],
            "Other": this.changeStatusObj['otherReason'] ? this.changeStatusObj['otherReason'] : ''
        }
        this.staffService.changeStaffStatus(prepare).subscribe(res => {
            this.toaster.success('User status change successfully.');
            this.closeChangeModal();
            this.getStaffs();
        }, error => {
            this.toaster.error('Something went wrong.');
        })
    }

    getSectionForFilter(event) {
        this.filtermodel['AESectionID'] = null;
        this.sectionList = [];
        this.sectionlistcheck = [];
        this.addStudentService.getSectionByClassID(event.ClassID).subscribe(section => {
            this.sectionList = [];
            this.sectionlistcheck = section;
            for (let index = 0; index < this.sectionlistcheck.length; index++) {
                if (this.sectionlistcheck[index]['SectionStatus'] != 2) {
                    this.sectionList.push(this.sectionlistcheck[index]);
                }
            }
            console.log(this.sectionList);
            // this.sectionList = section;
            // this.studentFiltermodel.sectionFilterModel = '';
        }, error => {
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['message']);
            }
            this.sectionList = [];

        });
    }

    selectSubjectChangeforFilter(classID) {
        console.log(event, classID);
        this.filtermodel['SubjectID'] = null;
        this.subjectList = [];
        this.classSetupService.getSubjectListByClassAndSectionId(classID).subscribe(res => {
            this.subjectList = [];
            let a = _.filter(res, function (obj) {
                return (obj.IsSelected)
            });

            this.subjectList = a;
        }, error => {

        });
    }

    checkUncheckAll() {
        this.isAllCheck = !this.isAllCheck;
        if (this.isAllCheck) {
            this.toaster.warning("Please note it have selected all the data within all pages.");
        } else {
            this.checkedcount = 0;
        }

        if (this.searchStr == undefined || this.searchStr == '') {
            if (this.isAllCheck) {
                this.checkedcount = this.displayArr.length;
            } else {
                this.checkedcount = 0;
            }

            this.displayArr.forEach((element, chInx) => {
                element.isChecked = this.isAllCheck;
            });
        } else {
            let filteredRecords = this.displayArr.filter(item =>
                Object.keys(item).some(k => item[k] != null &&
                    item[k].toString().toLowerCase()
                        .includes(this.searchStr.toLowerCase()))

            );
            if (this.isAllCheck) {
                this.checkedcount = filteredRecords.length;
            } else {
                this.checkedcount = 0;
            }
            filteredRecords.forEach((element, chInx) => {
                element.isChecked = this.isAllCheck;
            });
        }
    }

    filtertextBlur() {
        this.isAllCheck = false;
        this.displayArr.forEach((element, chInx) => {
            element.isChecked = false;
        });
        if (this.searchStr == undefined || this.searchStr == '') {
            this.isAllEnable = false;
        } else {
            let filteredRecords = this.displayArr.filter(item =>
                Object.keys(item).some(k => item[k] != null &&
                    item[k].toString().toLowerCase()
                        .includes(this.searchStr.toLowerCase()))

            );
            if (filteredRecords.length > 0) {
                this.isAllEnable = true;
            }
        }
    }


    checkItemenable(item) {
        let cc = 0;
        item.isChecked = !item.isChecked;
        this.displayArr.forEach((element, chInx) => {
            if (element.isChecked) {
                cc = cc + 1;
            }
        });

        if (cc == this.displayArr.length) {
            this.isAllCheck = true;
        } else {
            this.isAllCheck = false;
        }
        this.checkedcount = cc;
    }

    confirmMultiDelete(template: TemplateRef<any>) {
        this.deletemodulenames = "";
        if (this.checkedcount > 0) {
            if (this.moduleName == 'Student') {
                this.deletemodulenames = "User Login,User Profile,Parent StudentMapping,Student AcademicMapping,Attendance Student Mapping,Exam Student Marks Mapping,Homework Submission File,Homework Submission Master,Exam Assigned StudentMapping,Attendance Master";
            } else if (this.moduleName == 'Staff') {
                this.deletemodulenames = "User Login , User Profile,Section Class Teacher Mapping,Section Subject TeacherMapping";
            }
            this.modalRef = this.modalService.show(template, { class: 'modal-md' });
        } else {
            this.toaster.warning("Please select atleast one record to delete.");
        }
    }

    deleteSelected() {
        let selectedItems = [];
        let userType = 0;
        this.displayArr.forEach((element, chInx) => {
            if (element.isChecked) {
                selectedItems.push(element.StudentID);
            }
        });
        if (this.moduleName == 'Student') {
            userType = 1;
        } else if (this.moduleName == 'Staff') {
            userType = 2;
        }

        let reqobject = {
            UserIds: selectedItems,
            userType: userType
        }
        console.log(selectedItems, "916");
        this.sharedService.deleteMultipleUsers(reqobject).subscribe(res => {
            this.deletemodulenames = "";
            this.modalRef.hide();

            this.isAllCheck = false;
            this.displayArr.forEach((element, chInx) => {
                element.isChecked = false;
            });

            if (res['success'] === true) {
                this.toaster.success(res['message']);
                if (this.moduleName == 'Student') {
                    this.getStudents();
                } else if (this.moduleName == 'Staff') {
                    this.getStaffs();
                }
            } else {
                this.toaster.error(res['message']);
            }

        }, error => {
            this.deletemodulenames = "";
            this.modalRef.hide();
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['message']);
            }
        });
    }

    confirmdeleteSubjectTeacherMapping(template: TemplateRef<any>, item) {
        this.clearDeleteData();
        this.SubjectID = item.SubjectID;
        this.AESectionID = item.AESectionID;
        this.UserID = item.SubjectTeacherUserID;
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    }

    deleteSubjectTeacherMapping() {

        let reqobject = {
            SubjectID: this.SubjectID,
            AESectionID: this.AESectionID,
            UserID: this.UserID
        }

        this.sharedService.deleteSubjectTeacherMapping(reqobject).subscribe(res => {
            this.modalRef.hide();
            this.clearDeleteData();
            this.getclassAndSubjectAssignedList();
            if (res['success'] === true) {
                this.toaster.success(res['message']);
            } else {
                this.toaster.error(res['message']);
            }

        }, error => {
            this.modalRef.hide();
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                // this.toaster.error(error.error['message']);
                this.toaster.error(error.error['data'][0]['message']);
            }
        });
    }

    confirmdeleteClassTeacherMapping(template: TemplateRef<any>, item) {
        this.clearDeleteData();
        this.ClassID = item.ClassID;
        this.AESectionID = item.AESectionID;
        this.UserID = item.ClassTeacherUserID;
        this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    }

    deleteClassTeacherMapping() {
        let reqobject = {
            ClassID: this.ClassID,
            AESectionID: this.AESectionID,
            UserID: this.UserID
        }

        this.sharedService.deleteClassTeacherMapping(reqobject).subscribe(res => {
            this.modalRef.hide();
            this.clearDeleteData();
            this.getclassAndSubjectAssignedList();
            if (res['success'] === true) {
                this.toaster.success(res['message']);
            } else {
                this.toaster.error(res['message']);
            }

        }, error => {
            this.modalRef.hide();
            if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
            } else {
                this.toaster.error(error.error['data'][0]['message']);
                //this.toaster.error(error.error['message']);
            }
        });
    }

    clearDeleteData() {
        this.SubjectID = '';
        this.AESectionID = '';
        this.UserID = '';
        this.ClassID = '';
    }

    onShowPageChange(value) {
        if (value === "ALL") {
            this.rowsOnPage = this.displayArr.length;
        } else {
            this.rowsOnPage = value;
        }
    }
}
