import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-class-test-exam-answersheet',
  templateUrl: './class-test-exam-answersheet.component.html',
  styleUrls: ['./class-test-exam-answersheet.component.scss']
})
export class ClassTestExamAnswersheetComponent implements OnInit {
  createTemplateDataObj: any = {};
  HeaderInstruction: any = [];
  QuestionInstruction: any = [];
  schoolInfo: any = {};
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedDataService) { }

  ngOnInit() {
    this.schoolInfo = JSON.parse(localStorage.getItem('schoolProfile'));
    this.route.params.subscribe(id => {
      this.sharedService.getWorksheetQuestionList(id.id).subscribe(
        result => {
          this.createTemplateDataObj = result.paperTemplateInfo;
          this.HeaderInstruction = result.HeaderInstruction;
          this.QuestionInstruction = result.QuestionInstruction;
        }, error => {
        }
      )
    });
  }
  onActionEmitter() {
  }
}
