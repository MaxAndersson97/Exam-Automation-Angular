import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-worksheet-generate-paper',
  templateUrl: './worksheet-generate-paper.component.html',
  styleUrls: ['./worksheet-generate-paper.component.scss']
})
export class WorksheetGeneratePaperComponent implements OnInit {
  TemplateID: any ='';
  constructor(private tempalteService: TemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService,
    private toastr: ToastrService) { }

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
