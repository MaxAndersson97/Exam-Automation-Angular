import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WorksheetService } from '../../worksheet-setup/worksheet.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ClassTestExamService } from '../class-test-exam.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-class-test-exam-template-selection',
  templateUrl: './class-test-exam-template-selection.component.html',
  styleUrls: ['./class-test-exam-template-selection.component.scss']
})
export class ClassTestExamTemplateSelectionComponent implements OnInit {
  templateList: any;
  createTemplateData: any;
  templateID: any;
  booksListWithChepters: any;
  isStep2FormValid: boolean;
  selectedTemplateData: any;

  constructor(private fb: FormBuilder,
    private addWingService: AddWingService,
    private templateService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private worksheetService: WorksheetService,
    private toastr: ToastrService,
    private sharedService: SharedDataService,
    private classTestExamService: ClassTestExamService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params=>{
        this.templateID = params.id;
        this.sharedService.getTemplateDetailsById(this.templateID).subscribe((templatedetail)=>{
        this.createTemplateData = templatedetail;

        const prepareDataToGetTemplateList = {
          "InstituteID": this.createTemplateData['InstituteID'],
          "BoardID": this.createTemplateData['BoardID'],
          "MediumID": this.createTemplateData['MediumID'],
          "ClassID": this.createTemplateData['ClassID'],
          "SubjectID": this.createTemplateData['SubjectID'],
          "Status": 1,
          "PaperType": 3,
        }        
        this.getActiveTemplateList(prepareDataToGetTemplateList);
      })
    });
  }

  getActiveTemplateList(preparedData) {
    this.classTestExamService.getTemplateList(preparedData).subscribe(
      (template) => {
        this.templateList = template;
        //this.openStepTwoForm();
        console.log(this.templateList);
      }, (error) => {
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toastr.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toastr.error(error.error['message']);
        }
      });
  }

  submitStepTwo() {

    let data = {
      "EAPaperTemplateID": this.createTemplateData.EAPaperTemplateID,
      "SelectedEAPaperTemplateID": this.selectedTemplateData['EAPaperTemplateID']
    }  
    this.sharedService.getupdateselectedTemplate(data).subscribe(res=>{
      console.log(res);
      this.router.navigate(['../../chepters', this.templateID], {relativeTo: this.route});
    }, error=>{
      // this.students =[];
    })

    //this.router.navigate(['../../chepters', this.templateID], {relativeTo: this.route});
  }

  // redirect to template summary
  viewTempalteDetails(template){
    let baseHref = location.href.split('#')[0];
    window.open(baseHref+'#/exam/template-setup/summary/'+ template['EAPaperTemplateID'], '_blank');   

  }
  selectedTemplate(template) {
    setTimeout(() => {
      this.isStep2FormValid = true;
      this.selectedTemplateData = template;
      console.log(this.selectedTemplateData['EAPaperTemplateID']);
      this.sharedService.setSelectedTempalteID(this.selectedTemplateData['EAPaperTemplateID']);
     
    }, 10);
  }
}
