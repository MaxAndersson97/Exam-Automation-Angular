import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-online-exam-papers-worksheet',
  templateUrl: './create-online-exam-papers-worksheet.component.html',
  styleUrls: ['./create-online-exam-papers-worksheet.component.scss']
})
export class CreateOnlineExamPapersWorksheetComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() 
  {
  const element = document.querySelector("#elementID");
    element.scrollIntoView(true);}
}
