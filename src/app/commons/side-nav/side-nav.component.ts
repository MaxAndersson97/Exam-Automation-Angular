import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { StaffService } from 'src/app/services/staff.service';
import { USERROLES } from 'src/app/Utils/utils';
import { map } from 'rxjs/operators';
import { SharedObservablesService } from 'src/app/services/shared-observables.service';
import { applicationConfiguration } from 'src/assets/applicationConfiguration.json';
import { ToastrService } from 'ngx-toastr';

declare var $: any;

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit, OnDestroy {
    @Output() showPaymentPopUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() showChangePassword: EventEmitter<any> = new EventEmitter<any>();
    isExamSetupTrue: boolean = false;
    isAcademicSetting: boolean = true;
    currentIndex: number = 8;
    userProfileInfo: any;
    UserRoles = USERROLES;
    userRegisterFor = 2;
    UserRole = 'Partner';

    AccessLevelData: any = [];

    isHome = false;

    isExamSeupShow = false;
    isReportShow = false;

    examReport = false;
    studentReport = false;
    classReport = false;

    isStaffShow = false;
    isStudentShow = false;
    isInstituteProdileShow = false;
    isAcademicSettingShow = false;
    isCustomContentShow = false;
    isRollNumberShow = false;
    details = applicationConfiguration;
    isCreatePaper = false;
    isCreateOMRPaper = false;
    // submenu
    isExamGroupShow = false;
    isTemplateShow = false;
    isSubjectAndBookShow = false;
    isClassSetupShow = false;
    isWingSetupShow = false;
    isAcademicYearShow = false;

    isWorksheetShow = false;
    isClassExamTestShow = false;
    isAssignExamShow = false;
    isAddMarksShow = false;

    isassignrollno = false;

    isattendancereportshow = false;
    isassignmentreportshow = false;

    userRegisterForstatus = false;
    userRegisterForstatus1 = false;
    userRegisterForvalue: any;
    isGuestTeacher = false;
    isSmallScreen$: Observable<boolean>;
    username: any;
    freePaperCount: number = 0;
    planName: string = undefined;
    showUpgradeNowLink: boolean = false;
    showInfoIcon: boolean = false;
    tooltipText: string = undefined;
    subscriptions: Subscription[] = [];
    constructor(private router: Router,
        private currentRoute: ActivatedRoute,
        private sharedService: SharedDataService,
        private sharedObservablesService: SharedObservablesService,
        private bpObs: BreakpointObserver, private toaster: ToastrService) {
        this.isSmallScreen$ = this.bpObs.observe('(max-width: 991px)').pipe(map(bpState => bpState.matches));

    }
    ngOnDestroy(): void {
        this.subscriptions.forEach(element => {
            element.unsubscribe();
        });
    }

    ngOnInit() {
        let data = JSON.parse(localStorage.getItem('institute'));
        let getUserinfo = JSON.parse(localStorage.getItem('user'));
        if(data && getUserinfo){
        this.username = data.CurrentUser;


        if (getUserinfo.roles.indexOf('GuestTeacher') != -1) {
            this.isGuestTeacher = true;
        }

        this.AccessLevelData = JSON.parse(localStorage.getItem('InstituteAccessLevel'));
        this.subscriptions.push(this.sharedObservablesService.getAvailableCreditsInfo().subscribe(
            (item) => {
                if (item) {
                    this.freePaperCount = item.availableCredits;
                    this.planName = item.planName;
                    this.showUpgradeNowLink = item.showUpgradeNowLink;
                    this.tooltipText = item.toolTipMessage;
                    this.showInfoIcon = item.showInfoIcon;
                }
            }
        ));

        this.sharedObservablesService.refreshAvailableCredits({
            isApiRefresh: false,
            isCacheRefresh: true
        });
        this.userRegisterForvalue = JSON.parse(localStorage.getItem('UserRegisteredFor'));

        if (this.userRegisterForvalue == 3) {
            this.userRegisterForstatus = true;
        }
        if (this.userRegisterForvalue == 1) {
            this.userRegisterForstatus1 = true;
        }

        this.getUserProfile();
        let currentRoute = this.currentRoute['children'][0]['url']['_value'][0]['path'];
        if (currentRoute == 'worksheet-setup' || currentRoute == 'class-test-exam' || currentRoute == 'assign-exam' || currentRoute == 'add-marks') {
            this.clickOnMenu('exam');
        } else if (currentRoute == 'template-setup' || currentRoute == 'exam-group' || currentRoute == 'academic-year' || currentRoute == 'class-setup' || currentRoute == 'subject-and-book-setup' || currentRoute == 'wing-setup') {
            this.clickOnMenu('academic');

        } else if (currentRoute == 'institute-profile') {
            this.clickOnMenu('institute');
        } else if (currentRoute == 'staff' || currentRoute == 'upload-staff-csv' || currentRoute == 'add-staff-manually' || currentRoute == 'imported-staff-data') {
            this.clickOnMenu('staff');

        } else if (currentRoute == 'student' || currentRoute == 'imported-student-data' || currentRoute == 'upload-csv' || currentRoute == 'add-student-manually') {
            this.clickOnMenu('student')

        } else if (currentRoute == 'custom-content') {
            this.clickOnMenu('custom-content');
        }
        else if (currentRoute == 'reports' || currentRoute == 'class-reports' || currentRoute == 'exam-reports') {
            this.clickOnMenu('report');
        } else if (currentRoute == 'create-paper') {
            this.clickOnMenu('paper');

        } else if (currentRoute == 'create-paper-omr') {
            this.clickOnMenu('omr');

        }
        else if (currentRoute == 'assign-roll-no') {
            this.clickOnMenu('assign-roll-no');
        }
        // else if(currentRoute == 'student' ){
        //     this.clickOnMenu('student');
        // }
        else if (currentRoute == 'home' || currentRoute == 'top-performing-students' || currentRoute == 'top-performing-feculties' ||
            currentRoute == 'board-merit-prediction' || currentRoute == 'key-areas-to-focus' || currentRoute == 'class-wise-performance' ||
            currentRoute == 'class-performance-details' || currentRoute == 'chapter-student-performance-details' ||
            currentRoute == 'teacher-performance-overview') {
            this.clickOnMenu('dashboard');
        }
        else if (currentRoute == 'attendance-report') {
            this.clickOnMenu('attendance-report');
        }
        if (currentRoute == 'assignment-report') {
            this.clickOnMenu('assignment-report');
        }
      }
    }

    onMenuClick(url: String) {
        this.router.navigate([url]);
    }

    getUserProfile() {
        //   this.sharedService.getAccessLevels().subscribe(res =>{
        // console.log(res);
        const allMenu = this.AccessLevelData;
        allMenu.forEach((elmt, indx) => {
            // individual menu
            if (elmt.Description == 'Custom App Content' && elmt.isView) {
                this.isCustomContentShow = true;
            }
            if (elmt.Description == 'Institute Profile' && elmt.isView) {
                this.isInstituteProdileShow = true;
            }

            if (elmt.Description == 'Student' && elmt.isView) {
                this.isStudentShow = true;
            }

            if (elmt.Description == 'Staff' && elmt.isView) {
                this.isStaffShow = true;
            }
            // individual menu

            // start academic setting
            if (elmt.Description == 'Exam Group' && elmt.isView) {
                this.isAcademicSettingShow = true;
                this.isExamGroupShow = true;
            }

            if (elmt.Description == 'Exam Template Setup' && elmt.isView) {
                this.isAcademicSettingShow = true;
                this.isTemplateShow = true;
            }
            if (elmt.Description == 'Subject And Book Setup' && elmt.isView) {
                this.isAcademicSettingShow = true;
                this.isSubjectAndBookShow = true;
            }
            if (elmt.Description == 'Academic Year' && elmt.isView) {
                this.isAcademicSettingShow = true;
                this.isAcademicYearShow = true;
            }
            if (elmt.Description == 'Class Setup' && elmt.isView) {
                this.isAcademicSettingShow = true;
                this.isClassSetupShow = true;
            }
            if (elmt.Description == 'Wing Setup' && elmt.isView) {
                this.isAcademicSettingShow = true;
                this.isWingSetupShow = true;
            }
            // end academic setting
            // start exam setup
            if (elmt.Description == 'EA Worksheet' && elmt.isView) {
                this.isExamSeupShow = true;
                this.isWorksheetShow = true;
            }

            if (elmt.Description == 'EA Class Test / Exam' && elmt.isView) {
                this.isExamSeupShow = true;
                this.isClassExamTestShow = true;
            }

            if (elmt.Description == 'Assign Exam' && elmt.isView) {
                this.isAssignExamShow = true;
                this.isExamSeupShow = true;
            } if (elmt.Description == 'Add Marks' && elmt.isView) {
                this.isAddMarksShow = true;
                this.isExamSeupShow = true;
            }
            if (elmt.Description == 'Student Report' && elmt.isView) {
                this.isReportShow = true;
                this.studentReport = true;
            }
            if (elmt.Description == 'Class Report' && elmt.isView) {
                this.isReportShow = true;
                this.classReport = true;

            }
            if (elmt.Description == 'Exam Report' && elmt.isView) {
                this.isReportShow = true;
                this.examReport = true;

            }
            if (elmt.Description == 'Assign Roll No' && elmt.isView) {
                this.isassignrollno = true;
            }
            if (elmt.Description == 'Create Paper' && elmt.isView) {
                this.isCreatePaper = true;
            }
            if (elmt.Description == 'Create MCQ Paper' && elmt.isView) {
                this.isCreateOMRPaper = true;
            }

            if (elmt.Description == 'Assignment Report' && elmt.isView) {
                this.isassignmentreportshow = true;
            }
            if (elmt.Description == 'Attendance Report' && elmt.isView) {
                this.isattendancereportshow = true;
            }
            if (elmt.Description == 'Home' && elmt.isView) {
                this.isHome = true;
            }
            // end exam setup
        });

        // }, error =>{

        // })
    }
    clearLocalStorage() {
        localStorage.removeItem('selectedTemplateData');
        localStorage.removeItem('templateData');
        localStorage.removeItem('OPENMODAL');
        localStorage.removeItem('frmData');
        localStorage.removeItem('showSelection');
        this.sharedService.setOpenModuleData(false);
    }

    openresetpassword() {
        this.showChangePassword.emit(true);
    }
    clickOnMenu(val) {
        switch (val) {
            case 'exam':
                this.currentIndex = 0;

                break;
            case 'academic':
                this.currentIndex = 4;

                break;
            case 'staff':
                this.currentIndex = 1;

                break;
            case 'student':
                this.currentIndex = 2;

                break;
            // case 'attendance-report':
            //     this.currentIndex = 2;

            // break;
            // case 'assignment-report':
            //     this.currentIndex = 2;

            // break;
            case 'institute':
                this.currentIndex = 3;

                break;
            case 'custom-content':
                this.currentIndex = 5;

                break;

            case 'report':
                this.currentIndex = 6;

                break;

            case 'paper':
                this.currentIndex = 7;

                break;

            case 'dashboard':
                this.currentIndex = 8;

                break;

            // case 'assign-roll-no':
            //     this.currentIndex = 9;

            // break;
            case 'assign-roll-no':
                this.currentIndex = 2;

                break;

            case 'omr':
                this.currentIndex = 10;

                break;
            case 'attendance-report':
                this.currentIndex = 11;

                break;
            case 'assignment-report':
                this.currentIndex = 12;

                break;
            default:
                break;
        }

    }

    ClickDashboard() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/dashboard/home']));
    }
    ClickCreatePaper() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/create-paper']));
    }
    ClickCreateOMR() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/create-paper-omr']));
    }
    ClickCreateClassTestExam() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/class-test-exam/dashboard']));
    }
    ClickWorksheet() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/worksheet-setup/dashboard']));
    }
    ClickAssignExam() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/assign-exam/dashboard']));
    }
    ClickAddMarks() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/add-marks/dashboard']));
    }
    ClickStudentReport() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/reports/student']));
    }
    ClickClassReport() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/class-reports/overall-performance-analysis']));
    }
    ClickExamReport() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/exam-reports/Exam-taken-analysis']));
    }
    ClickAttendanceReport() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/attendance-report/class-level-view']));
    }
    ClickAssignmentReport() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/assignment-report/class-level-views']));
    }
    ClickStaff() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/staff']));
    }
    ClickStudent() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/student']));
    }
    ClickAssignRollNo() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/assign-roll-no']));
    }
    ClickInstituteProfile() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/institute-profile/academic']));
    }
    ClickAcademicyear() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/academic-year']));
    }
    ClickClassSetup() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/class-setup']));
    }
    ClicksubjectBook() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/subject-and-book-setup']));
    }
    ClickWingSetup() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/wing-setup']));
    }
    ClickExamTemplateSetup() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/template-setup/dashboard']));
    }
    ClickExamGroup() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/exam-group/dashboard']));
    }
    Clickmastersetting() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/custom-content/dashboard/1']));
    }
    Clickadvancesetting() {
        event.preventDefault();
        this.router.navigateByUrl('/', { skipLocationChange: true })
            .then(() => this.router.navigate(['/exam/custom-content/dashboard/2']));
    }
    openWorksheetModal1() {
        this.showPaymentPopUp.emit();
    }
    clickRefreshContent() {
        let schoolInfo = JSON.parse(localStorage.getItem('schoolProfile'));
        let data = {
            "InstituteID": schoolInfo.InstituteID
        };

        this.sharedService.RefreshContent(data).subscribe(
            result => {
                if (result["success"] == "true" || result["success"] == true) {
                    this.toaster.success("Content Updated successfully in application");
                    let currentUrl = this.router.url;
                    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                        this.router.navigate([currentUrl]);
                    });
                }
                else {
                    this.toaster.error("Due to technical error unable to update content right now, please try after sometime");
                }
            },
            error => {
                this.toaster.error("Due to technical error unable to update content right now, please try after sometime");
            }
        );
    }
}
