import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { LoaderService } from './loader/loader.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptorService } from './loader/loader-interceptor.service';
import { DropDownService } from './drop-down.service';
import { DataListingComponent } from './data-listing/data-listing.component';
import { SearchPipe } from '../Utils/search.pipe';
import { TitleCaseExceptPipe } from '../Utils/titlecase.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { ExamSettingComponent } from './exam-setting/exam-setting.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { GlobalSummaryComponent } from './global-summary/global-summary.component';
import { GlobalCherrypickComponent } from './global-cherrypick/global-cherrypick.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GlobalPaperGenerateComponent } from './global-paper-generate/global-paper-generate.component';
import { GlobalPreviewPaperComponent } from './global-preview-paper/global-preview-paper.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { GlobalAnswersheetComponent } from './global-answersheet/global-answersheet.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { GlobalChepterSelectionComponent } from './global-chepter-selection/global-chepter-selection.component';
import { MathjaxComponent } from './mathjax/mathjax.component';
import { GlobalService } from './mathjax/global.service';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { GlobalCreatePaperComponent } from './global-create-paper/global-create-paper.component';
import { SortByPipe } from '../Utils/sort-by.pipe';
import { DoubleClickDirective } from '../helpers/double-click-directive';
import { MatDialogModule, MatTabsModule } from '@angular/material';
import { CkeditorDirective } from '../directives/ckeditor.directive';
import { FooterComponent } from './footer/footer.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AboutUsComponent } from './about-us/about-us.component';
import { CreateOnlineExamPapersWorksheetComponent } from './create-online-exam-papers-worksheet/create-online-exam-papers-worksheet.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BuyCreditComponent } from './buy-credit/buy-credit.component';
import { ApplicationCacheService } from '../services/application-cache.service';


const COMPONENT = [
  NavBarComponent,
  SideNavComponent,
  LoaderComponent,
  DataListingComponent,
  SearchPipe,
  TitleCaseExceptPipe,
  ExamSettingComponent,
  GlobalSummaryComponent,
  GlobalCherrypickComponent,
  GlobalPaperGenerateComponent,
  GlobalPreviewPaperComponent,
  GlobalAnswersheetComponent,
  GlobalChepterSelectionComponent,
  MathjaxComponent,
  GlobalCreatePaperComponent,
  SortByPipe,
  FooterComponent,
  AboutUsComponent, CreateOnlineExamPapersWorksheetComponent, PrivacyPolicyComponent,
  BuyCreditComponent
];

@NgModule({
  imports: [
    AngularMultiSelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgSelectModule,
    PaginationModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    DragDropModule,
    MatTabsModule,
    MatDialogModule,
    NgxPaginationModule,
    FormsModule,
  ],
  declarations: [...COMPONENT, DoubleClickDirective, CkeditorDirective,],
  exports: [...COMPONENT],
  providers: [
    TitleCaseExceptPipe,
    LoaderService,
    DropDownService,
    GlobalService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommonsModule {
  public static forRoot() : ModuleWithProviders<any>{
    return {
      ngModule : CommonsModule,
      providers: [ApplicationCacheService]
    };
  }
 }
