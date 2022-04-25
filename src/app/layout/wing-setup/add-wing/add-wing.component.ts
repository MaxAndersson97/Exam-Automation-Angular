import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { InstituteClass } from '../../institute-class';
import { Staff } from '../../staff';
import { Wing } from '../wing';
import { AddWing } from './add-wing';
import { AddWingService } from './add-wing.service';
import { ToastrService } from 'ngx-toastr';
import { Class } from '../../subject-and-book-setup/class';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-add-wing',
  templateUrl: './add-wing.component.html',
  styleUrls: ['./add-wing.component.scss']
})
export class AddWingComponent implements OnInit {

  @Output() closeEvent = new EventEmitter();

  @Input() editWingSubject: BehaviorSubject<Wing>;
  public selectedWing: Wing;

  staffs: Array<Staff>;
  classes;
  isValidClass = false;
  fromClassIndex = undefined;
  toIndex = undefined;
  addWingform = this.fb.group({
    WingID: [''],
    WingName: [''],
    WingHeadID: [''],
    InstituteUserID: [''],
    InstituteID: [''],
    ClassIdFrom: [''],
    ClassIdTo: [''],
  });

  constructor(
    private fb: FormBuilder,
    private addWingService: AddWingService,
    private toastService: ToastrService) {
  }

  ngOnInit() {
    this.getInstituteDDLClass();
    this.getStaffList();
    this.editWingSubject.subscribe((wing: Wing) => {
      this.selectedWing = wing;
      if (this.selectedWing != null) {
        this.addWingform.patchValue({
          WingName: this.selectedWing.WingName,
          ClassIdFrom: this.selectedWing.ClassIdFrom,
          ClassIdTo: this.selectedWing.ClassIdTo,
          WingHeadID: this.selectedWing.WingHeadID,
          WingID: this.selectedWing.WingID
        });

      } else {
        this.addWingform.patchValue({
          WingName: "",
          ClassIdFrom: null,
          ClassIdTo: null,
          WingHeadID: null
        });
      }
    }, httpError => {
      if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toastService.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toastService.error(httpError.error['message']);

      }
    });
  }

  getStaffList() {
    this.addWingService.getStaffList().subscribe(response =>
      this.staffs = response.filter(item => item.ProfileStatus == 1)
    );

  }

  getInstituteDDLClass() {
    this.addWingService.getInstituteDDLClass()
      .subscribe((classes) => {
        if (classes) {
          this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
          this.classes.forEach((element, index) => {
            element.index = index + 1;
            if (this.selectedWing) {
              if (element.ClassID == this.selectedWing.ClassIdFrom) {
                this.validateClass(element, 'FROM');
              }
              if (element.ClassID == this.selectedWing.ClassIdTo) {
                this.validateClass(element, 'TO');
              }
            }
          });
        } else {
          this.classes = [];
        }
      }, httpError => {
        if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toastService.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toastService.error(httpError.error['message']);

        }
      });
  }
  //  VALIDTE CLASS
  validateClass(event, type) {
    if (type == 'FROM') {
      this.fromClassIndex = event.index;
      if (this.fromClassIndex == this.toIndex) {
        this.isValidClass = true;
      }
      if (this.fromClassIndex < this.toIndex) {
        this.isValidClass = false;
      }
      if (this.fromClassIndex > this.toIndex) {
        this.isValidClass = true;
      }
    } else {
      this.toIndex = event.index;
      if (this.fromClassIndex == this.toIndex) {
        this.isValidClass = true;
      }
      if (this.fromClassIndex < this.toIndex) {
        this.isValidClass = false;
      }
      if (this.fromClassIndex > this.toIndex) {
        this.isValidClass = true;
      }
    }
  }
  addWing(addWing: AddWing) {
    this.addWingService.addWing(addWing)
      .subscribe(res => {
        this.close({ isRefresh: true })
      }, httpError => {
        if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toastService.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toastService.error(httpError.error['message']);
        }
      })
  }

  onSubmit() {
    this.addWing(this.addWingform.value);
  }

  close(data) {
    this.closeEvent.emit(data);
  }

  /* ngOnDestroy(): void {
    this.editWingSubject.unsubscribe();
  } */

}
