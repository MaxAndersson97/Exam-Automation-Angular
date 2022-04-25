import { Component, OnInit, Output, EventEmitter, ɵConsole  } from '@angular/core';
import { TemplateService } from '../template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { InstituteClass } from '../../institute-class';
import { HttpErrorResponse } from '@angular/common/http';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import * as _ from 'underscore';
import { SharedDataService } from 'src/app/services/shared-data.service';


@Component({
  selector: 'app-template-list',
  templateUrl: './template-list.component.html',
  styleUrls: ['./template-list.component.scss']
})
export class TemplateListComponent implements OnInit {
  templateListData: any;
  subjectList: any;
  standardList: any;
  showFilter: Boolean = false;
  isSubjectOpen: boolean = false;
  templateData: any;
  selectedSubjectId = null;
  selectedOption = null;
  searchString = "";
  @Output() messageEvent = new EventEmitter<string>();
  message: string = "CREATE"
  constructor(
    private tempalteService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private addWingService: AddWingService,
    private sharedService : SharedDataService) {}

  ngOnInit() {
    this.templateData = JSON.parse(localStorage.getItem('templateData'));
    this.subjectList = [];
    this.isSubjectOpen = false;

    this.getTemplateList();
    this.getInstituteDDLClass();
  }
  getInstituteDDLClass() {
    const getInstituteDDLClassSuccess = (classes) => {
      if (classes) {
      this.standardList = classes.filter(element => element['IsClassShowInPortal'] === true);

      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.addWingService.getInstituteDDLClass()
      .subscribe(
        getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  }
  getSubject(classId){
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjectList = _.filter(subjects, function (obj) {
          return (obj.IsSelected)
        });
        this.isSubjectOpen = true;
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.tempalteService.getInstituteDDLSubject(classId)
      .subscribe(getInstituteDDLClassSuccess,
                getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  };
  getTemplateList() {

    const data = {
    };
    this.getSearchResult(data);
  }
  getClassId(classId) {
    console.log(classId);
    if(!!classId){
      this.getSubject(classId);
    }
  }

  filterData(classId, subjectId) {
    const data = {
      SubjectID: subjectId,
      ClassID: classId,
    };

    this.showFilter  = !this.showFilter;
    this.getSearchResult(data);
  }
  getSearchResult(data){
    this.templateListData = [];
    this.tempalteService.getTemplateList(data).subscribe((template) => {
      this.templateListData = template;
      if (template && template.length > 0) {
        this.sharedService.updateAvailableCreditsCache(template[0].TotalPaperCreatedCount);
      }
    }, (error) => {
      console.log(error);
      this.templateListData = [];
    });
  }

  clearFilter(){
   this.getTemplateList();
   this.isSubjectOpen = false;
  }

  changeStatus(index){
    if(this.templateListData[index].PaperTemplateStatus == 1){
      this.templateListData[index].PaperTemplateStatus = 2;

    } else {
      this.templateListData[index].PaperTemplateStatus = 1;

    }
    var prepareData = {
        "EAPaperTemplateID": this.templateListData[index]['EAPaperTemplateID'],
        "PaperTemplateStatus": this.templateListData[index].PaperTemplateStatus
    }

    this.tempalteService.changeStatusOfTemplate(prepareData).subscribe((result) =>
    {console.log(result)
    }, (error) => {console.log(error);})
  }

  viewSummary(){
    this.router.navigate([ '../template-summary'], { relativeTo: this.route });
  }

  goToTemplateHome(){
    localStorage.setItem('OPENMODAL', 'true');
    localStorage.removeItem('selectedTemplateData');
    this.router.navigate([ '../'], { relativeTo: this.route});
  }

  editTemplate(template) {
    console.log(template, 'SELECTEDTEMPLATE');
    localStorage.setItem('OPENMODAL', 'true');
    localStorage.setItem('selectedTemplateData', JSON.stringify(template));
    this.router.navigate([ '../'], { relativeTo: this.route });
  }

}
