import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TopPerformingStudentsComponent } from './dashboard/top-performing-students/top-performing-students.component';
import { BoardMeritPredictionComponent } from './dashboard/board-merit-prediction/board-merit-prediction.component';
import { TopPerformingFecultiesComponent } from './dashboard/top-performing-feculties/top-performing-feculties.component';
import { KeyAreasToFocusComponent } from './dashboard/key-areas-to-focus/key-areas-to-focus.component';
import { ClassWisePerformanceComponent } from './dashboard/class-wise-performance/class-wise-performance.component';
import { ClassPerformanceDetailsComponent } from './dashboard/class-performance-details/class-performance-details.component';
import { ChapterStudentPerformanceDetailsComponent } from './dashboard/chapter-student-performance-details/chapter-student-performance-details.component';
import { TeacherPerformanceOverviewComponent } from './dashboard/teacher-performance-overview/teacher-performance-overview.component';
import { WingSetupComponent } from './wing-setup/wing-setup.component';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { AddStaffManuallyComponent } from './add-staff-manually/add-staff-manually.component';
import { AddStudentManuallyComponent } from './add-student-manually/add-student-manually.component';
import { ClassSetupComponent } from './class-setup/class-setup.component';
import { ImportedStaffDataComponent } from './imported-staff-data/imported-staff-data.component';
import { ImportedStudentDataComponent } from './imported-student-data/imported-student-data.component';
import { InstituteProfileComponent } from './institute-profile/institute-profile.component';
import { StaffComponent } from './staff/staff.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StudentComponent } from './student/student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SubjectAndBookSetupComponent } from './subject-and-book-setup/subject-and-book-setup.component';
import { UploadCSVComponent } from './upload-csv/upload-csv.component';
import { UploadStaffCSVComponent } from './upload-staff-csv/upload-staff-csv.component';
import { LayoutComponent } from './layout.component';
import { InstituteProfilePhotoComponent } from './institute-profile/institute-profile-photo/institute-profile-photo.component';
import { AddStaffSubjectComponent } from './add-staff-manually/add-staff-subject/add-staff-subject.component';
import { AddStudentParentComponent } from './add-student-manually/add-student-parent/add-student-parent.component';
import { AddStudentPhotoComponent } from './add-student-manually/add-student-photo/add-student-photo.component';
import { AddStaffInformationComponent } from './add-staff-manually/add-staff-information/add-staff-information.component';
import { AddStudentComponent } from './add-student-manually/add-student/add-student.component';
import { InstituteProfileAcademicComponent } from './institute-profile/institute-profile-academic/institute-profile-academic.component';
import { InstituteProfileSchoolComponent } from './institute-profile/institute-profile-school/institute-profile-school.component';
import { TemplateSetupComponent } from './template-setup/template-setup.component';
import { TemplateSettingComponent } from './template-setup/template-setting/template-setting.component';
import { TemplateDashboardComponent } from './template-setup/template-dashboard/template-dashboard.component';
import { BloomDifficultyComponent } from './template-setup/bloom-difficulty/bloom-difficulty.component';
import { TemplateSummaryComponent } from './template-setup/template-summary/template-summary.component';
import { TemplateListComponent } from './template-setup/template-list/template-list.component';
import { WorksheetSetupComponent } from './worksheet-setup/worksheet-setup.component';
import { WorksheetDashboardComponent } from './worksheet-setup/worksheet-dashboard/worksheet-dashboard.component';
import { WorksheetSettingComponent } from './worksheet-setup/worksheet-setting/worksheet-setting.component';
import { WorksheetBloomDifficultyComponent } from './worksheet-setup/worksheet-bloom-difficulty/worksheet-bloom-difficulty.component';
import { WorksheetListComponent } from './worksheet-setup/worksheet-list/worksheet-list.component';
import { ExamGroupDashboardComponent } from './exam-group/exam-group-dashboard/exam-group-dashboard.component';
import { ExamGroupDetailsComponent } from './exam-group/exam-group-details/exam-group-details.component';
import { ExamGroupComponent } from './exam-group/exam-group.component';
import { ClassTestExamComponent } from './class-test-exam/class-test-exam.component';
import { ClassTestExamDashboardComponent } from './class-test-exam/class-test-exam-dashboard/class-test-exam-dashboard.component';
import { ClassTestExamSummarryComponent } from './class-test-exam/class-test-exam-summarry/class-test-exam-summarry.component';
import { ClassTestExamSettingComponent } from './class-test-exam/class-test-exam-setting/class-test-exam-setting.component';
import { ClassTestExamBloomdifficultyComponent } from './class-test-exam/class-test-exam-bloomdifficulty/class-test-exam-bloomdifficulty.component';
import { CherryPickComponent } from './class-test-exam/cherry-pick/cherry-pick.component';
import { WorksheetCherryPickComponent } from './worksheet-setup/worksheet-cherry-pick/worksheet-cherry-pick.component';
import { CustomContentComponent } from './custom-content/custom-content.component';
import { TextbookSettingComponent } from './custom-content/textbook-setting/textbook-setting.component';
import { TextbookPdfSettingComponent } from './custom-content/textbook-pdf-setting/textbook-pdf-setting.component';
import { PysolvedPaperSettingComponent } from './custom-content/pysolved-paper-setting/pysolved-paper-setting.component';
import { QuestionBankSettingComponent } from './custom-content/question-bank-setting/question-bank-setting.component';
import { CcsdashboardComponent } from './custom-content/ccsdashboard/ccsdashboard.component';
import { VideoAdvanceSettingComponent } from './custom-content/video-advance-setting/video-advance-setting.component';
import { WorksheetGeneratePaperComponent } from './worksheet-setup/worksheet-generate-paper/worksheet-generate-paper.component';
import { WorksheetPreviewPaperComponent } from './worksheet-setup/worksheet-preview-paper/worksheet-preview-paper.component';
import { WorksheetSummaryComponent } from './worksheet-setup/worksheet-summary/worksheet-summary.component';
import { WorkshetAnswersheetComponent } from './worksheet-setup/workshet-answersheet/workshet-answersheet.component';
import { ClassTestExamPreviewComponent } from './class-test-exam/class-test-exam-preview/class-test-exam-preview.component';
import { ClassTestExamGeneratePaperComponent } from './class-test-exam/class-test-exam-generate-paper/class-test-exam-generate-paper.component';
import { ClassTestExamAnswersheetComponent } from './class-test-exam/class-test-exam-answersheet/class-test-exam-answersheet.component';
import { ClassTestExamChepterSelectionComponent } from './class-test-exam/class-test-exam-chepter-selection/class-test-exam-chepter-selection.component';
import { WorksheetChepterSelectionComponent } from './worksheet-setup/worksheet-chepter-selection/worksheet-chepter-selection.component';
import { ClassTestExamTemplateSelectionComponent } from './class-test-exam/class-test-exam-template-selection/class-test-exam-template-selection.component';
import { GlobalPdfPreviewComponent } from './global-pdf-preview/global-pdf-preview.component';
import { AssignExamDashobardComponent } from './assign-exam/assign-exam-dashobard/assign-exam-dashobard.component';
import { AddExamComponent } from './assign-exam/add-exam/add-exam.component';
import { AssignExamComponent } from './assign-exam/assign-exam.component';
import { AddMarksComponent } from './add-marks/add-marks.component';
import { MarksDashboardComponent } from './add-marks/marks-dashboard/marks-dashboard.component';
import { ImportedStudentMarksComponent } from './add-marks/imported-student-marks/imported-student-marks.component';
import { AddStudentMarksManuallyComponent } from './add-marks/add-student-marks-manually/add-student-marks-manually.component';
import { UploadStudentCsvComponent } from './add-marks/upload-student-csv/upload-student-csv.component';
import { ReportComponent } from './report/report.component';
import { ReportStudentComponent } from './report/report-student/report-student.component';
import { SubjectLevelReportComponent } from './report/report-student/subject-level-report/subject-level-report.component';
import { LearningCurveReportComponent } from './report/report-student/learning-curve-report/learning-curve-report.component';
import { ComplexityAnalysisReportComponent } from './report/report-student/complexity-analysis-report/complexity-analysis-report.component';
import { ReportClassComponent } from './report/report-class/report-class.component';
import { ReportExamComponent } from './report/report-exam/report-exam.component';
import { ExamCompositionComponent } from './report/report-exam/exam-composition/exam-composition.component';
import { ChapterTopicUnderstandingAnalysisComponent } from './report/report-class/chapter-topic-understanding-analysis/chapter-topic-understanding-analysis.component';
import { SubjectPerformanceComponent } from './report/report-class/subject-performance/subject-performance.component';
import { UploadComponent } from './OMR/upload/upload.component';
import { DetailsComponent } from './OMR/details/details.component';
import { AddStaffPhotoComponent } from './add-staff-manually/add-staff-photo/add-staff-photo.component';
import { CreateExamStepOneComponent } from './class-test-exam/create-exam-step-one/create-exam-step-one.component';
import { CreateWorksheetStepOneComponent } from './worksheet-setup/create-worksheet-step-one/create-worksheet-step-one.component';
import { CreatePaperComponent } from './create-paper/create-paper.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ResultOverviewComponent } from './dashboard/result-overview/result-overview.component';
import { AssignRollNoComponent } from './assign-roll-no/assign-roll-no.component';
import { CreatePaperOmrComponent } from './OMR/create-paper-omr/create-paper-omr.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';
import { AssignmentReportComponent } from './assignment-report/assignment-report.component';
import { ClassLevelViewComponent } from './attendance-report/class-level-view/class-level-view.component';
import { SubjectLevelViewComponent } from './attendance-report/subject-level-view/subject-level-view.component';
import { StudentLevelViewComponent } from './attendance-report/student-level-view/student-level-view.component';
import { ClassLevelViewsComponent } from './assignment-report/class-level-views/class-level-views.component';
import { SubjectLevelViewsComponent } from './assignment-report/subject-level-views/subject-level-views.component';
import { StudentLevelViewsComponent } from './assignment-report/student-level-views/student-level-views.component';
import { SamplePaperSettingComponent } from './custom-content/sample-paper-setting/sample-paper-setting.component';
import { AddSamplePaperComponent } from './custom-content/add-sample-paper/add-sample-paper.component';
import { ManageSamplePaperFilesComponent } from './custom-content/manage-sample-paper-files/manage-sample-paper-files.component';
import { WorksheetCCSSettingComponent } from './custom-content/worksheet-setting/worksheet-setting.component';
import { PaymentSuccessComponent } from './paytmPayment/payment-success/payment-success.component';
import { PaymentFailedComponent } from './paytmPayment/payment-failed/payment-failed.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },           
            {
                path: 'paymentSuccess',
                component: PaymentSuccessComponent
            },
            {
                path: 'paymentFailed',
                component: PaymentFailedComponent
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'home',
                        pathMatch: 'full'
                    },
                    {
                        path: 'home',
                        component: HomeComponent
                    },
                    {
                        path: 'top-performing-students',
                        component: TopPerformingStudentsComponent
                    },
                    {
                        path: 'board-merit-prediction',
                        component: BoardMeritPredictionComponent
                    },
                    {
                        path: 'top-performing-feculties',
                        component: TopPerformingFecultiesComponent
                    },
                    {
                        path: 'key-areas-to-focus',
                        component: KeyAreasToFocusComponent
                    },
                    {
                        path: 'class-wise-performance',
                        component: ClassWisePerformanceComponent
                    },
                    {
                        path: 'class-performance-details',
                        component: ClassPerformanceDetailsComponent
                    },
                    {
                        path: 'chapter-student-performance-details',
                        component: ChapterStudentPerformanceDetailsComponent
                    },
                    {
                        path: 'result-overview',
                        component: ResultOverviewComponent
                    },
                    {
                        path: 'teacher-performance-overview',
                        component: TeacherPerformanceOverviewComponent
                    }
                ]
            },

            {
                path: 'pdf-preview/:id/:isshowans',
                component: GlobalPdfPreviewComponent    
            },
            {
                path: 'academic-year',
                component: AcademicYearComponent
            },
            {
                path: 'add-staff-manually',
                component: AddStaffManuallyComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'information',
                        pathMatch: 'full'
                    },
                    {
                        path: 'information',
                        component: AddStaffInformationComponent
                    },
                    {
                        path: 'subject',
                        component: AddStaffSubjectComponent
                    },
                    {
                        path: 'staff-photo/:id',
                        component: AddStaffPhotoComponent
                    },
                ]
            },
            {
                path: 'add-student-manually',
                component: AddStudentManuallyComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'student',
                        pathMatch: 'full'
                    },
                    {
                        path: 'parent',
                        component: AddStudentParentComponent
                    },
                    {
                        path: 'student',
                        component: AddStudentComponent
                    },
                    {
                        path: 'photo',
                        component: AddStudentPhotoComponent
                    }]
            },
            {
                path: 'class-setup',
                component: ClassSetupComponent
            },
     
            {
                path: 'imported-staff-data',
                component: ImportedStaffDataComponent
            },
            {
                path: 'imported-student-data',
                component: ImportedStudentDataComponent
            },
            {
                path: 'institute-profile',
                component: InstituteProfileComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'academic',
                        pathMatch: 'full'
                    },
                    {
                        path: 'academic',
                        component: InstituteProfileAcademicComponent
                    },
                    {
                        path: 'school',
                        component: InstituteProfileSchoolComponent
                    },
                    {
                        path: 'photo',
                        component: InstituteProfilePhotoComponent
                    }]
            },
            {
                path: 'staff',
                component: StaffComponent
            },
            {
                path: 'staff-list',
                component: StaffListComponent
            },            
            {
                path: 'student',
                component: StudentComponent
            },
            {
                path: 'student-list',
                component: StudentListComponent
            },
            {
                path: 'subject-and-book-setup',
                component: SubjectAndBookSetupComponent
            },
            {
                path: 'upload-csv',
                component: UploadCSVComponent
            },
            {
                path: 'upload-staff-csv',
                component: UploadStaffCSVComponent
            },
            {
                path: 'wing-setup',
                component: WingSetupComponent
            },
            {
                path: 'template-setup',
                component: TemplateSetupComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: TemplateDashboardComponent
                    },
                    {
                        path: 'template-setting/:templateID',
                        component: TemplateSettingComponent
                    },
                    {
                        path: 'bloom-difficulty/:id/:totalQuesCount',
                        component: BloomDifficultyComponent
                    },
                    {
                        path: 'summary/:id',
                        component: TemplateSummaryComponent
                    },
                    {
                        path: 'template-list',
                        component: TemplateListComponent
                    },
                ]
            },
            {
                path: 'worksheet-setup',
                component: WorksheetSetupComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: WorksheetDashboardComponent
                    },
                    {
                        path: 'create-worksheet',
                        component: CreateWorksheetStepOneComponent
                    },
                    {
                        path: 'chepters/:id',
                        component: WorksheetChepterSelectionComponent
                    },
                    {
                        path: 'setting/:classTestExamId',
                        component: WorksheetSettingComponent

                    },
                    {
                        path: 'bloom-difficulty/:id/:totalCount',
                        component: WorksheetBloomDifficultyComponent
                    },
                    {
                        path: 'worksheet-list',
                        component: WorksheetListComponent
                    },

                    {
                        path: 'cherry-pick/:id',
                        component: WorksheetCherryPickComponent
                    },
                    {
                        path: 'generate-paper/:id',
                        component: WorksheetGeneratePaperComponent
                    },
                    {
                        path: 'view-paper/:id/:type',
                        component: WorksheetPreviewPaperComponent
                    },
                    {
                        path: 'summary/:id',
                        component: WorksheetSummaryComponent
                    },
                    {
                        path: 'answersheet/:id',
                        component: WorkshetAnswersheetComponent
                    }

                ]
            },
            {
                path: 'exam-group',
                component: ExamGroupComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: ExamGroupDashboardComponent
                    },
                    {
                        path: 'details',
                        component: ExamGroupDetailsComponent
                    },
                ]
            },{
                path: 'class-test-exam',
                component: ClassTestExamComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: ClassTestExamDashboardComponent
                    },
                    {
                        path: 'create',
                        component: CreateExamStepOneComponent
                    },
                    {
                        path: 'chepters/:id',
                        component: ClassTestExamChepterSelectionComponent
                    },
                    {
                        path: 'templates/:id',
                        component: ClassTestExamTemplateSelectionComponent
                    },
                    {
                        path: 'summary/:id',
                        component: ClassTestExamSummarryComponent
                    },
                    {
                        path: 'setting/:classTestExamId',
                        component: ClassTestExamSettingComponent
                    },
                    {
                        path: 'bloom-setting/:id/:totalCount',
                        component: ClassTestExamBloomdifficultyComponent
                    },
                    {
                        path: 'cherry-pick/:id',
                        component: CherryPickComponent
                    },
                    {
                        path: 'generate-paper/:id',
                        component: ClassTestExamGeneratePaperComponent
                    },
                    {
                        path: 'view-paper/:id/:type',
                        component: ClassTestExamPreviewComponent
                    },
                    {
                        path: 'answersheet/:id',
                        component: ClassTestExamAnswersheetComponent
                    }
                ]
            },{
                path: 'custom-content',
                component: CustomContentComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'dashboard/:id',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard/:id',
                        component: CcsdashboardComponent
                    },
                    {
                        path: 'textbook-setting',
                        component: TextbookSettingComponent
                    },
                    {
                        path: 'textbook-pdf-setting',
                        component: TextbookPdfSettingComponent
                    },            
                    {
                        path: 'solved-paper-setting',
                        component: PysolvedPaperSettingComponent
                    },            
                    {
                        path: 'question-bank-setting',
                        component: QuestionBankSettingComponent
                    },            
                    {
                        path: 'video-setting',
                        component: VideoAdvanceSettingComponent
                    },
                    {
                        path: 'sample-paper-setting',
                        component: SamplePaperSettingComponent
                    },
                    {
                        path: 'add-paper',
                        component: AddSamplePaperComponent
                    }, 
                    {
                        path: 'manage-paper-files',
                        component: ManageSamplePaperFilesComponent
                    },
                    {
                        path: 'worksheet-setting',
                        component: WorksheetCCSSettingComponent
                    }
                ]
            }, {
                path: 'assign-exam',
                component: AssignExamComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: AssignExamDashobardComponent
                    },
                    {
                        path: 'add-exam/:id',
                        component: AddExamComponent
                    }
        
                ] 
            },{
                path: 'add-marks',
                component: AddMarksComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'dashboard',
                        pathMatch: 'full'
                    },
                    {
                        path: 'dashboard',
                        component: MarksDashboardComponent
                    },
                    {
                        path: 'imported-student-marks/:id',
                        component: ImportedStudentMarksComponent
                    },
                    {
                        path: 'add-marks-manually/:id',
                        component: AddStudentMarksManuallyComponent
                    },
                    {
                        path: 'upload-csv/:id',
                        component: UploadStudentCsvComponent
                    }
        
                ] 
            }, {
                path: 'reports',
                component: ReportComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'student',
                        pathMatch: 'full'
                    },
                    {
                        path: 'student',
                        component: ReportStudentComponent
                    },
                    {
                        path: 'student/subject-level',
                        component: SubjectLevelReportComponent
                    },
                    {
                        path: 'student/learning-curve',
                        component: LearningCurveReportComponent
                    },
                    {
                        path: 'student/complexity-analysis',
                        component: ComplexityAnalysisReportComponent
                    }
        
                ] 
            }, {
                path: 'class-reports',
                component: ReportComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'overall-performance-analysis',
                        pathMatch: 'full'
                    },
                    {
                        path: 'overall-performance-analysis',
                        component: ReportClassComponent
                    },
                    {
                        path: 'ct-understanding-analysis',
                        component: ChapterTopicUnderstandingAnalysisComponent
                    },            
                    {
                        path: 'sub-performance-report',
                        component: SubjectPerformanceComponent
                    },
                ] 
            },
             {
                path: 'exam-reports',
                component: ReportComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'Exam-taken-analysis',
                        pathMatch: 'full'
                    },
                    {
                        path: 'Exam-taken-analysis',
                        component: ReportExamComponent
                    },
                    
                    {
                        path: 'Exam-composition',
                        component: ExamCompositionComponent
                    }
        
                ] 
            },
            {
                path: 'OMR',
                children: [
                    {
                        path: '',
                        redirectTo: 'upload-zip/:id',
                        pathMatch: 'full'
                    },
                    // {
                    //     path: '',
                    //     redirectTo: 'details',
                    //     pathMatch: 'full'
                    // },
                    {
                        path: 'upload-zip/:id',
                        component: UploadComponent
                    },
                    {
                        path: 'details/:id/:resultStatus',
                        component: DetailsComponent
                    }
        
                ] 
            },    
            
            {
                path: 'create-paper',
                component: CreatePaperComponent,
            },
            {
                path: 'create-paper-omr',
                component: CreatePaperOmrComponent,
            },
            {
                path: 'assign-roll-no',
                component: AssignRollNoComponent,
            },
            {
                path: 'attendance-report',
                component: AttendanceReportComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'class-level-view',
                        pathMatch: 'full'
                    },
                    {
                        path: 'class-level-view',
                        component: ClassLevelViewComponent
                    },
                    {
                        path: 'subject-level-view',
                        component: SubjectLevelViewComponent
                    },
                    {
                        path: 'student-level-view',
                        component: StudentLevelViewComponent
                    }
                ]
            },
            {
                path: 'assignment-report',
                component: AssignmentReportComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'class-level-views',
                        pathMatch: 'full'
                    },
                    {
                        path: 'class-level-views',
                        component: ClassLevelViewsComponent
                    },
                    {
                        path: 'subject-level-views',
                        component: SubjectLevelViewsComponent
                    },
                    {
                        path: 'student-level-views',
                        component: StudentLevelViewsComponent
                    }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
