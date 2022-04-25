import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-test-exam-generate-paper',
  templateUrl: './class-test-exam-generate-paper.component.html',
  styleUrls: ['./class-test-exam-generate-paper.component.scss']
})
export class ClassTestExamGeneratePaperComponent implements OnInit {
  TemplateID: any ='';
  constructor(private tempalteService: TemplateService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(){
    this.route.params.subscribe(id=>{
      this.TemplateID = id.id;
    })
    
  }

  onActionEmitter(event){
    console.log(event, 'info', this.TemplateID);
      this.router.navigate([ '../../view-paper', this.TemplateID], { relativeTo: this.route });
  }
}
