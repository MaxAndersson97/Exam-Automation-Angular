import { MustMatch } from 'src/app/Utils/must-match.validator';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FIlterListData } from 'src/app/model/filterlistdata';
import { Staff } from 'src/app/model/staff';
import { TableHeader } from 'src/app/model/tableheader';
import { ROLES1, STATUS1, UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { StaffService } from 'src/app/services/staff.service';
import { EventObject } from 'src/app/model/eventobject';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2' //for sweet alert
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { ClassSetupService } from '../class-setup/class-setup.service';
import * as _ from 'underscore';

@Component({
    selector: 'app-staff',
    templateUrl: './staff.component.html',
    styleUrls: ['./staff.component.scss']
})
export class StaffComponent implements OnInit, OnDestroy {
    filterListData: FIlterListData[] = new Array<FIlterListData>();
    staffs: Staff[];
    title = 'Staff List';
    tableHeader: TableHeader[] = [
        { columnname: 'FirstName', displayname: 'STAFF NAME', visible: true, sortOrder: '' },
        { columnname: 'Email', displayname: 'EMAIL ID', visible: true, sortOrder: '' },
        { columnname: 'Mobile', displayname: 'MOBILE', visible: true, sortOrder: 'asc' },
        { columnname: 'Role', displayname: 'ROLE', visible: true, sortOrder: '' },
        { columnname: 'CreatedDateTime', displayname: 'REG. DATE', visible: true, sortOrder: '' },
        { columnname: 'DOBFormated', displayname: 'BIRTH DATE', visible: true, sortOrder: '' },
        { columnname: 'Status', displayname: 'STATUS', visible: true, sortOrder: '' },
        // { columnname: '', displayname: '', visible: true, sortOrder: '' },
        //  { columnname: 'action', displayname: 'Action', visible: true, sortOrder: '' }
    ];

    public resetForm: FormGroup;
    public loading = false;
    public submitted = false;
    public subscription: any;

    

    constructor(private router: Router,
        private staffService: StaffService,
        private formBuilder: FormBuilder, private toaster: ToastrService, 
        private classSetupService: ClassSetupService) {
        const fl1: FIlterListData = new FIlterListData();
        fl1.name = 'Role';
        fl1.filterList = ROLES1;
        this.filterListData.push(fl1);
        const fl2: FIlterListData = new FIlterListData();
        fl2.name = 'ProfileStatus';
        fl2.filterList = STATUS1;
        this.filterListData.push(fl2);
    }

    ngOnInit() {
        this.getStaffs();
        this.resetForm = this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required]
          }, {
              validator: MustMatch('password', 'confirmPassword')
            });
    }

    // convenience getter for easy access to form fields
  get f() { return this.resetForm.controls; }

    getStaffs() {
        this.staffService.getStaffList().subscribe(res => {
            this.staffs = res.data;
        }, error =>{
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
             }else{
                // this.toaster.error(error.error['message']);
             }
            this.staffs = [];
           //this.toaster.error(error.error['message']);
        });
    }

    onAddStaffManually() {
        localStorage.removeItem('studentId');

        this.router.navigate(['exam/add-staff-manually']);
    }
    onUploadCSV() {
        localStorage.removeItem('studentId');
        this.router.navigate(['exam/upload-staff-csv']);
    }

    onAddClick(event) {
        this.onAddStaffManually();
    }
    onUploadCSVClick(event) {
        this.onUploadCSV();
    }

    onActionEmitter(event: EventObject) {
        console.log(event);        
        if (event.type === 'EditInfo') {
            localStorage.setItem('studentId', event.data.StudentID);
            localStorage.setItem('InstituteID', event.data.InstituteID);
            this.router.navigate(['/exam/add-staff-manually/information']);
        }else if(event.type === "Status"){
            this.changeStaffStatus(event.data.StudentID);
        }else if(event.type === "Reset"){           
            this.resetPassword(event.data.UserID);
        }
    }

    changeStaffStatus(studentId: string){        
        this.staffService.changeStaffStatus(studentId).subscribe(res =>{  
            this.getStaffs();                                          
            Swal.fire({                
                type: 'success',
                title: '<h4>status changed successfully.</h4>',
                showConfirmButton: false,
                timer: 2000
            })
        }, error =>{
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
             }else{
                 this.toaster.error(error.error['message']);
             }
        }) 
    }

    //reset staff member password
    resetPassword(userId: string){
        this.subscription = this.staffService.resetPassword(userId)
        .subscribe(res=> {            
            if(res['success'] == true){
                Swal.fire({                
                    type: 'success',
                    title: '<h4>'+ res['message'] + '</h4>',
                    showConfirmButton: true,  
                    html: '<h5>New password is: " <b>'+ res['data'] +'</b> "</h5>'                  
                })
            }            
        }, error =>{
            if(error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER){
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
             }else{
                 this.toaster.error(error.error['message']);
             }
        }) 
    }

    onSubmit() {
        this.submitted = true;    
        // stop here if form is invalid
        if (this.resetForm.invalid) {
          return;
        }
        // hide loader img if data is vaild
        this.loading = true;
        this.resetForm.removeControl('confirmPassword')            
      }

      ngOnDestroy() {
        if (this.subscription) {
          this.subscription.unsubscribe();
        }
      }
}
