import { Component, OnInit } from '@angular/core';
import { StaffService } from 'src/app/services/staff.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Result } from 'src/app/model/result';
import { Staff } from 'src/app/model/staff';
import { Router } from '@angular/router';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-upload-staff-csv',
    templateUrl: './upload-staff-csv.component.html',
    styleUrls: ['./upload-staff-csv.component.scss']
})
export class UploadStaffCSVComponent implements OnInit {
    image_upload: boolean = false;
    staffArr: Staff[] = new Array<Staff>();
    data: any;
    showUploaded: boolean = false;
    file: File;
    filename:boolean = false;
    maxDate = new Date();
    constructor(private router: Router, private staffService: StaffService, private sharedService: SharedDataService, private toastr: ToastrService) {
        // console.log("yyyy",this.maxDate);
        // this.maxDate.setDate(this.maxDate.getDate() - 3*365);
     }

    ngOnInit() {
    }


    changeListener($event: any) {
        this.data = $event.target.files;
        console.log("data", this.data[0]);
        this.image_upload = true;  
        this.filename = true;
    }

    postFile(inputValue: any): void {
        console.log("yyyy",this.maxDate);
        this.maxDate.setDate(this.maxDate.getDate() - 3*365);
        console.log("inputValue",inputValue);
        this.file = inputValue[0];
        console.log("file", this.file);
        this.image_upload = true;    
        this.staffService.uploadCSV(this.file).subscribe(response => {
            if (response.data && response.data[0] ) {               
                this.staffArr = response.data;       
                console.log("this.staffArr", this.staffArr);
                         
                this.router.navigate(['/exam/imported-staff-data']);                
                this.sharedService.setStaffArray(this.staffArr);   
                this.image_upload = false;                
            }
    }, error =>{
        console.log(error.error);
        if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
            this.toastr.warning(UNAUTHERIZEDMESSASGE);
        }else{
            this.toastr.error(error.error['message']);
        }
    });
    }
    onUploadAndProceed() {
        this.postFile(this.data);
    }    
}

