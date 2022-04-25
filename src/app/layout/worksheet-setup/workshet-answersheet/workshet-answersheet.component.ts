import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-workshet-answersheet',
  templateUrl: './workshet-answersheet.component.html',
  styleUrls: ['./workshet-answersheet.component.scss']
})
export class WorkshetAnswersheetComponent implements OnInit {
  createTemplateDataObj: any ={};
  HeaderInstruction: any =[];
  QuestionInstruction: any =[];
  schoolInfo: any ={};
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedDataService) { }

  ngOnInit() {
    this.schoolInfo = JSON.parse(localStorage.getItem('schoolProfile'));
    this.route.params.subscribe(id=>{
      this.sharedService.getWorksheetQuestionList(id.id).subscribe(
        result =>{       
          this.createTemplateDataObj = result.paperTemplateInfo;
          this.HeaderInstruction = result.HeaderInstruction;
          this.QuestionInstruction = result.QuestionInstruction;
        }, error =>{
        }
      )
    });
  }
  onActionEmitter(){
    
  }

}
