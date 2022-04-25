import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { CommonsModule } from '../commons/commons.module';
import { WingSetupComponent } from './wing-setup/wing-setup.component';
import { AcademicYearComponent } from './academic-year/academic-year.component';
import { SubjectAndBookSetupComponent } from './subject-and-book-setup/subject-and-book-setup.component';
import { ClassSetupComponent } from './class-setup/class-setup.component';
import { StudentComponent } from './student/student.component';
import { AddStaffManuallyComponent } from './add-staff-manually/add-staff-manually.component';
import { AddStudentManuallyComponent } from './add-student-manually/add-student-manually.component';
import { ImportedStaffDataComponent } from './imported-staff-data/imported-staff-data.component';
import { ImportedStudentDataComponent } from './imported-student-data/imported-student-data.component';
import { StudentListComponent } from './student-list/student-list.component';
import { UploadCSVComponent } from './upload-csv/upload-csv.component';
import { UploadStaffCSVComponent } from './upload-staff-csv/upload-staff-csv.component';
import { AddStaffInformationComponent } from './add-staff-manually/add-staff-information/add-staff-information.component';
import { AddStaffSubjectComponent } from './add-staff-manually/add-staff-subject/add-staff-subject.component';
import { AddStudentParentComponent } from './add-student-manually/add-student-parent/add-student-parent.component';
import { AddStudentComponent } from './add-student-manually/add-student/add-student.component';
import { AddStudentPhotoComponent } from './add-student-manually/add-student-photo/add-student-photo.component';
import { AcademicYearService } from './academic-year/academic-year.service';
import { AddStaffManuallyService } from './add-staff-manually/add-staff-manually.service';
import { AddStaffInformationService } from './add-staff-manually/add-staff-information/add-staff-information.service';
import { AddStudentManuallyService } from './add-student-manually/add-student-manually.service';
import { AddStudentService } from './add-student-manually/add-student/add-student.service';
import { AddStudentParentService } from './add-student-manually/add-student-parent/add-student-parent.service';
import { AddStudentPhotoService } from './add-student-manually/add-student-photo/add-student-photo.service';
import { ClassSetupService } from './class-setup/class-setup.service';
import { DashboardService } from './dashboard/dashboard.service';
import { ImportedStaffDataService } from './imported-staff-data/imported-staff-data.service';
import { StudentService } from './student/student.service';
import { SubjectAndBookSetupService } from './subject-and-book-setup/subject-and-book-setup.service';
import { UploadStaffCsvService } from './upload-staff-csv/upload-staff-csv.service';
import { WingSetupService } from './wing-setup/wing-setup.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InstituteService } from '../institute.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AddWingComponent } from './wing-setup/add-wing/add-wing.component';
import { AddWingService } from './wing-setup/add-wing/add-wing.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StudentListService } from './student-list/student-list.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AddSectionComponent } from './class-setup/add-section/add-section.component';
import { AddSectionService } from './class-setup/add-section/add-section.service';
import { PopoverModule } from 'ngx-bootstrap';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { TemplateSetupComponent } from './template-setup/template-setup.component';
import { AddTemplateComponent } from './template-setup/add-template/add-template.component';
import { TemplateSettingComponent } from './template-setup/template-setting/template-setting.component';
import { TemplateDashboardComponent } from './template-setup/template-dashboard/template-dashboard.component';
import { BloomDifficultyComponent } from './template-setup/bloom-difficulty/bloom-difficulty.component';
import { TemplateSummaryComponent } from './template-setup/template-summary/template-summary.component';
import { TemplateListComponent } from './template-setup/template-list/template-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
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
// import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WorksheetGeneratePaperComponent } from './worksheet-setup/worksheet-generate-paper/worksheet-generate-paper.component';


import { WorksheetPreviewPaperComponent } from './worksheet-setup/worksheet-preview-paper/worksheet-preview-paper.component';
import { WorksheetSummaryComponent } from './worksheet-setup/worksheet-summary/worksheet-summary.component';
import { WorkshetAnswersheetComponent } from './worksheet-setup/workshet-answersheet/workshet-answersheet.component';
import { ClassTestExamPreviewComponent } from './class-test-exam/class-test-exam-preview/class-test-exam-preview.component';
import { ClassTestExamGeneratePaperComponent } from './class-test-exam/class-test-exam-generate-paper/class-test-exam-generate-paper.component';
import { ClassTestExamAnswersheetComponent } from './class-test-exam/class-test-exam-answersheet/class-test-exam-answersheet.component';
import { WorksheetChepterSelectionComponent } from './worksheet-setup/worksheet-chepter-selection/worksheet-chepter-selection.component';
import { ClassTestExamChepterSelectionComponent } from './class-test-exam/class-test-exam-chepter-selection/class-test-exam-chepter-selection.component';
import { ClassTestExamTemplateSelectionComponent } from './class-test-exam/class-test-exam-template-selection/class-test-exam-template-selection.component';
import { GlobalPdfPreviewComponent } from './global-pdf-preview/global-pdf-preview.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UploadComponent } from './OMR/upload/upload.component';
import { DetailsComponent } from './OMR/details/details.component';
import { AddStaffPhotoComponent } from './add-staff-manually/add-staff-photo/add-staff-photo.component';
import { CreateExamStepOneComponent } from './class-test-exam/create-exam-step-one/create-exam-step-one.component';
import { CreateWorksheetStepOneComponent } from './worksheet-setup/create-worksheet-step-one/create-worksheet-step-one.component';
import { CreatePaperComponent } from './create-paper/create-paper.component';
import { NgxGaugeModule } from 'ngx-gauge';
import { TopPerformingStudentsComponent } from './dashboard/top-performing-students/top-performing-students.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeComponent } from './dashboard/home/home.component';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';

// Load Widgets
import * as Widgets from 'fusioncharts/fusioncharts.widgets';

// Load FusionTheme Theme
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'
import { BrowserModule } from '@angular/platform-browser';
import { BoardMeritPredictionComponent } from './dashboard/board-merit-prediction/board-merit-prediction.component';
import { TopPerformingFecultiesComponent } from './dashboard/top-performing-feculties/top-performing-feculties.component';
import { KeyAreasToFocusComponent } from './dashboard/key-areas-to-focus/key-areas-to-focus.component';
import { ClassWisePerformanceComponent } from './dashboard/class-wise-performance/class-wise-performance.component';
import { ClassPerformanceDetailsComponent } from './dashboard/class-performance-details/class-performance-details.component';
import { ChapterStudentPerformanceDetailsComponent } from './dashboard/chapter-student-performance-details/chapter-student-performance-details.component';
import { ResultOverviewComponent } from './dashboard/result-overview/result-overview.component';
import { TeacherPerformanceOverviewComponent } from './dashboard/teacher-performance-overview/teacher-performance-overview.component';
import { AssignRollNoComponent } from './assign-roll-no/assign-roll-no.component';
import { CreatePaperOmrComponent } from './OMR/create-paper-omr/create-paper-omr.component';

import { GaugeChartModule } from 'angular-gauge-chart';
import { MatSidenavModule } from '@angular/material';
import { InstituteProfileComponent } from './institute-profile/institute-profile.component';
import { InstituteProfileAcademicComponent } from './institute-profile/institute-profile-academic/institute-profile-academic.component';
import { InstituteProfileSchoolComponent } from './institute-profile/institute-profile-school/institute-profile-school.component';
import { CustomContentComponent } from './custom-content/custom-content.component';
import { TextbookSettingComponent } from './custom-content/textbook-setting/textbook-setting.component';
import { VideoAdvanceSettingComponent } from './custom-content/video-advance-setting/video-advance-setting.component';
import { TextbookPdfSettingComponent } from './custom-content/textbook-pdf-setting/textbook-pdf-setting.component';
import { PysolvedPaperSettingComponent } from './custom-content/pysolved-paper-setting/pysolved-paper-setting.component';
import { QuestionBankSettingComponent } from './custom-content/question-bank-setting/question-bank-setting.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffComponent } from './staff/staff.component';
import { InstituteProfilePhotoComponent } from './institute-profile/institute-profile-photo/institute-profile-photo.component';
import { CcsdashboardComponent } from './custom-content/ccsdashboard/ccsdashboard.component';
import { AddVideoComponent } from './custom-content/add-video/add-video.component';
import { AssignExamDashobardComponent } from './assign-exam/assign-exam-dashobard/assign-exam-dashobard.component';
import { AssignExamComponent } from './assign-exam/assign-exam.component';
import { AddExamComponent } from './assign-exam/add-exam/add-exam.component';
import { AddMarksComponent } from './add-marks/add-marks.component';
import { MarksDashboardComponent } from './add-marks/marks-dashboard/marks-dashboard.component';
import { MarkAttandanceComponent } from './add-marks/mark-attandance/mark-attandance.component';
import { ImportedStudentMarksComponent } from './add-marks/imported-student-marks/imported-student-marks.component';
import { AddStudentMarksManuallyComponent } from './add-marks/add-student-marks-manually/add-student-marks-manually.component';
import { ReportComponent } from './report/report.component';
import { ReportStudentComponent } from './report/report-student/report-student.component';
import { ReportClassComponent } from './report/report-class/report-class.component';
import { ReportExamComponent } from './report/report-exam/report-exam.component';
import { UploadStudentCsvComponent } from './add-marks/upload-student-csv/upload-student-csv.component';
import { SubjectLevelReportComponent } from './report/report-student/subject-level-report/subject-level-report.component';
import { LearningCurveReportComponent } from './report/report-student/learning-curve-report/learning-curve-report.component';
import { ComplexityAnalysisReportComponent } from './report/report-student/complexity-analysis-report/complexity-analysis-report.component';
import { ChapterTopicUnderstandingAnalysisComponent } from './report/report-class/chapter-topic-understanding-analysis/chapter-topic-understanding-analysis.component';
import { ExamCompositionComponent } from './report/report-exam/exam-composition/exam-composition.component';
import { SubjectPerformanceComponent } from './report/report-class/subject-performance/subject-performance.component';
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
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { PaymentSuccessComponent } from './paytmPayment/payment-success/payment-success.component';
import { PaymentFailedComponent } from './paytmPayment/payment-failed/payment-failed.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        AngularMultiSelectModule,
        CommonModule,        
        LayoutRoutingModule,
        CommonsModule,
        HttpClientModule,
        ReactiveFormsModule,
        AuthenticationModule,
        BsDatepickerModule.forRoot(),
        NgMultiSelectDropDownModule.forRoot(),
        FormsModule,
        NgxPaginationModule,
        // PaginationModule.forRoot(),
        BsDropdownModule.forRoot(),
        ModalModule.forRoot(),
        PopoverModule.forRoot(),
        FileUploadModule,
        NgxBootstrapSliderModule,
        NgSelectModule,
        NgxPaginationModule,
        OwlDateTimeModule, 
        OwlNativeDateTimeModule,
        NgxGaugeModule,
        DragDropModule,
        GaugeChartModule,
        MatSidenavModule,
        SharedModule
    ],
    declarations: [
      
        DashboardComponent,
        LayoutComponent,
        WingSetupComponent,
        AcademicYearComponent,
        SubjectAndBookSetupComponent,
        ClassSetupComponent,
        AddSectionComponent,
        StudentComponent,
        AddStaffManuallyComponent,
        AddStudentManuallyComponent,
        ImportedStaffDataComponent,
        ImportedStudentDataComponent,
        StudentListComponent,
        UploadCSVComponent,
        UploadStaffCSVComponent,
        AddStaffInformationComponent,
        AddStaffSubjectComponent,
        AddStudentParentComponent,
        AddStudentComponent,
        AddStudentPhotoComponent,
        AddWingComponent,
        TemplateSetupComponent,
        AddTemplateComponent,
        TemplateSettingComponent,
        TemplateDashboardComponent,
        BloomDifficultyComponent,
        TemplateSummaryComponent,
        TemplateListComponent,
        WorksheetSetupComponent,
        WorksheetDashboardComponent,
        WorksheetSettingComponent,
        WorksheetBloomDifficultyComponent,
        WorksheetListComponent,
        ExamGroupDashboardComponent,
        ExamGroupDetailsComponent,
        ExamGroupComponent,
        ClassTestExamComponent,
        ClassTestExamDashboardComponent,
        ClassTestExamSummarryComponent,
        ClassTestExamSettingComponent,
        ClassTestExamBloomdifficultyComponent,
        CherryPickComponent,
        WorksheetCherryPickComponent,
      
        WorksheetGeneratePaperComponent,
        WorksheetPreviewPaperComponent,
        WorksheetSummaryComponent,
        WorkshetAnswersheetComponent,
        ClassTestExamPreviewComponent,
        ClassTestExamGeneratePaperComponent,
        ClassTestExamAnswersheetComponent,
        WorksheetChepterSelectionComponent,
        ClassTestExamChepterSelectionComponent,
        ClassTestExamTemplateSelectionComponent,
        GlobalPdfPreviewComponent,
        UploadComponent,
        DetailsComponent,
        AddStaffPhotoComponent,
        CreateExamStepOneComponent,
        CreateWorksheetStepOneComponent,
        CreatePaperComponent,
        TopPerformingStudentsComponent,
        HomeComponent,
        BoardMeritPredictionComponent,
        TopPerformingFecultiesComponent,
        KeyAreasToFocusComponent,
        ClassWisePerformanceComponent,
        ClassPerformanceDetailsComponent,
        ChapterStudentPerformanceDetailsComponent,
        ResultOverviewComponent,
        TeacherPerformanceOverviewComponent,
        AssignRollNoComponent,
        CreatePaperOmrComponent,
        InstituteProfileComponent,
        InstituteProfileAcademicComponent,
        InstituteProfileSchoolComponent,
        CustomContentComponent, 
        TextbookSettingComponent, 
        VideoAdvanceSettingComponent, 
        TextbookPdfSettingComponent, 
        PysolvedPaperSettingComponent, 
        QuestionBankSettingComponent,
        StaffListComponent,
        StaffComponent,
        InstituteProfilePhotoComponent,
        CcsdashboardComponent,
        AddVideoComponent,
        AssignExamDashobardComponent,
        AssignExamComponent,
        AddExamComponent,
        AddMarksComponent,
        MarksDashboardComponent,
        MarkAttandanceComponent,
        ImportedStudentMarksComponent,
        AddStudentMarksManuallyComponent,
        ReportComponent,
        ReportStudentComponent,
        ReportClassComponent,
        ReportExamComponent,
        UploadStudentCsvComponent,
        SubjectLevelReportComponent,
        LearningCurveReportComponent,
        ComplexityAnalysisReportComponent,
        ChapterTopicUnderstandingAnalysisComponent,
        ExamCompositionComponent,
        SubjectPerformanceComponent,
        AttendanceReportComponent,
        AssignmentReportComponent,
        ClassLevelViewComponent,
        SubjectLevelViewComponent,
        StudentLevelViewComponent,
        ClassLevelViewsComponent,
        SubjectLevelViewsComponent,
        StudentLevelViewsComponent,
        SamplePaperSettingComponent,
        AddSamplePaperComponent,
        ManageSamplePaperFilesComponent,
        WorksheetCCSSettingComponent,
        PaymentSuccessComponent,
        PaymentFailedComponent
    ],
    providers: [
        AcademicYearService,
        AddStaffManuallyService,
        AddStaffInformationService,
        AddStudentManuallyService,
        AddStudentService,
        AddStudentParentService,
        AddStudentPhotoService,
        ClassSetupService,
        AddSectionService,
        DashboardService,
        ImportedStaffDataService,
        StudentService,
        StudentListService,
        SubjectAndBookSetupService,
        UploadStaffCsvService,
        WingSetupService,
        InstituteService,
        AddWingService,
    ]
})
export class LayoutModule { }
