import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';

@Component({
  selector: 'app-worksheet-list',
  templateUrl: './worksheet-list.component.html',
  styleUrls: ['./worksheet-list.component.scss']
})
export class WorksheetListComponent implements OnInit {
  createTemplateDataObj: any = {};
  templateListData: any = [];
  showFilter: boolean = false;
  subjectList: any = [];
  standardList: any = [];
  ddlStatus: any = '';
  searchString = '';
  selectedOption: any = null;
  selectedSubjectId: any = null;
  constructor(
    private tempalteService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService,
    private addWingService: AddWingService) { }


  ngOnInit() {
    this.sharedService.currentTemplateData.subscribe(obj => {
      this.createTemplateDataObj = obj;
    });
    this.getInstituteDDLClass();
    this.getWorksheetList();
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

  getClassId(classId) {
    console.log(classId, 'selected class id');
    if(!!classId){
      this.getSubject(classId);
    }
  }
  getSubject(classId) {
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjectList = subjects;
      } else {
        console.log(subjects);
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

  getWorksheetList() {
    const prepareData = {
      PaperType: 4,
    };
    this.getSearchResult(prepareData);

  }

  clearFilter(){
    this.ddlStatus = '';
    this.selectedOption= null;
    this.selectedSubjectId = null;

    const prepareData = {
      PaperType: 4,
    };
    this.getSearchResult(prepareData);
  }
  filterData(classId, subjectId, status) {
    const data = {
      SubjectID: subjectId,
      ClassID: classId,
      Status: status

    };

    this.showFilter  = !this.showFilter;
    this.getSearchResult(data);
  }

  getSearchResult(prepareData){
    this.templateListData = [];
    this.tempalteService.getTemplateList(prepareData).subscribe((template) => {
      this.templateListData = template;
      if (template && template.length > 0) {
        this.sharedService.updateAvailableCreditsCache(template[0].TotalPaperCreatedCount);
      }
    }, (error) => {
      console.log(error);
      this.templateListData = [];
    });
  }
  navigateToWorksheetHome(){
    // this.sharedService.setOpenModuleData(true);
    this.router.navigate([ '../'], { relativeTo: this.route });
  }



}
