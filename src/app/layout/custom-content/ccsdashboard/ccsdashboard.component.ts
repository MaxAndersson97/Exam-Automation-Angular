import { Component, OnInit } from '@angular/core';
import { CustomContentService } from '../custom-content.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-ccsdashboard',
  templateUrl: './ccsdashboard.component.html',
  styleUrls: ['./ccsdashboard.component.scss']
})
export class CcsdashboardComponent implements OnInit {
  settings: any;
  isAdvanceSetting : boolean = false;
  constructor(private customService: CustomContentService,
              private route: Router,
              private router: ActivatedRoute,
              private toaster: ToastrService) { }

  ngOnInit() {
    this.getAllSettingDetails();
    this.router.params.subscribe(
      data =>{
        console.log(data.id);
        this.isAdvanceSetting = data.id == 1? false: true;

      }, error =>{
        console.log(error);
      })
  }
  // get ccs settings
  getAllSettingDetails(){
    this.customService.getAllSettings().
    subscribe(result =>{
      this.settings = result;
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
     }else{
         this.toaster.error(error.error['message']);
     }
    })
  };
  
  // navigateToAdvanceStting

  goToAdvanceSetting(item){
    switch (item.CustomContentSettingModuleName) {
      case "QUESTION BANK":
        this.route.navigate(['../../question-bank-setting'], { relativeTo: this.router });        
        break;
      case 'TEXTBOOK IN PDF':
        this.route.navigate(['../../textbook-pdf-setting'], { relativeTo: this.router }); 
          break;
      case 'TEXTBOOK SOLUTIONS':
          this.route.navigate(['../../textbook-setting'], { relativeTo: this.router });        
          break;
      case 'VIDEOS':
          this.route.navigate(['../../video-setting'], { relativeTo: this.router });
          break; 
      case 'PREVIOUS YEARS SOLVED PAPERS':
        this.route.navigate(['../../solved-paper-setting'], { relativeTo: this.router });
        break;  
      case 'SAMPLE PAPER':
        this.route.navigate(['../../sample-paper-setting'], { relativeTo: this.router });
        break; 
      case 'WORKSHEET':
        this.route.navigate(['../../worksheet-setting'], { relativeTo: this.router });
        break;    
      default:
        break;
    }
  }

  changeStatus(index){
    if(this.settings[index].ShowInAppStatus == 1){
      this.settings[index].ShowInAppStatus = 2;
    } else {
      this.settings[index].ShowInAppStatus = 1;
    } 
  }

  onSubmit(){
    this.customService.saveCCS(this.settings).subscribe(
      (result) => {
        this.toaster.success(result['message']);
      }, error =>{
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
       }else{
           this.toaster.error(error.error['message']);
       }
      }
    )
  };
}
