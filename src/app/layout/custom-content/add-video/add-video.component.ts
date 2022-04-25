import { Component, OnInit, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomContentService } from '../custom-content.service';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss']
})
export class AddVideoComponent implements OnInit {
  @Output()  closeEvent = new EventEmitter();
  filterData: {};
  @Input() public set filterdata(val: any) {  
    this.filterData = val;
}
public get dataArray(): any {
  return this.filterData;
}
  addVideoFrm = this.fb.group({
    VideoIndex: [''],
    VideoTitle: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9 ]+$')]],
    VideoURLPath: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2})[/\\w @./#&+-?^!%~$]*/?')]],
    Description: [''],
    Keywords: [''],
  });
  VideMasterID: string = '';
  videoTag: any;
  constructor( private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private customService: CustomContentService, 
    private toaster: ToastrService) { }

  ngOnInit() {
    this.videoTag = [];  
  }


  get f(){
    return this.addVideoFrm.controls;

  }
    // retrict user to enter alphabates
    numberOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
  
    }

  close(){
    this.addVideoFrm.reset();
    this.closeEvent.emit();
    this.videoTag = [];
  }

  onSubmit(){
    let videoData = this.addVideoFrm.value;
    videoData.Keywords = this.videoTag.toString();
    videoData.ClassID = this.dataArray.ClassID;
    videoData.SubjectID = this.dataArray.SubjectID;
    videoData.ChapterID = this.dataArray.ChapterID;
    videoData.TopicID = "00000000-0000-0000-0000-000000000000";

    this.customService.addNewVideo(videoData).subscribe(reult =>{
      this.toaster.success(reult['message']);
      this.close();
    }, error =>{
      if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      }else{
         this.toaster.error(error.error['message']);
      }
    })
  }

  urlValidate(event){
  }

  addTag(tag){
    this.videoTag.push(tag.value);
    
    this.addVideoFrm.patchValue({
      Keywords: ''
    })
  }

  removeTage(i){
    this.videoTag.splice(i, 1);
  }

}
