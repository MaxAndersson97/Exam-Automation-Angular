import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { StaffService } from 'src/app/services/staff.service';
import * as _ from 'underscore';
import { InstituteClass } from '../institute-class';
import { ClassSetupService } from './class-setup.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-class-setup',
  templateUrl: './class-setup.component.html',
  styleUrls: ['./class-setup.component.scss']
})
export class ClassSetupComponent implements OnInit {
  public modalRef: BsModalRef;
  public isCreateSectionModalOpen: boolean = false;
  private classTeachers;
  public classList: Array<InstituteClass>;
  @ViewChild('createSection') createSection: ModalDirective;
  @ViewChild('childModal') childModal: ModalDirective;
  selectedClass: InstituteClass;
  subjectList: Array<any>;
  sectionOldValue: string;
  sectionNameError: boolean = true;
  isDataShow: boolean = false;
  constructor(
    private staffService: StaffService,
    private classSetupService: ClassSetupService,
    private modalService: BsModalService,
    private toaster: ToastrService) {
  }

  showChildModal(classObj): void {
    this.subjectList = [];
    this.selectedClass = classObj;
    if (this.selectedClass) {
      const classId = this.selectedClass.ClassID;
      const sectionId = this.selectedClass.AESectionID;
      this.classSetupService.getSubjectListByClassAndSectionId(classId).subscribe(res => {
        let subjectList1 = _.filter(res, function (obj) {
          return (obj.IsSelected)
        });
        let subjectList2: Array<any>;
        this.classSetupService.getSubjectListByClassAndSectionId2(classId, sectionId).subscribe(res1 => {
          subjectList2 = _.filter(res1, function (obj1) {
            return (obj1);
          });
          console.log(subjectList2,"49");
          this.subjectList = _.each(subjectList1, function (obj3, index) {
            // let itemObj = _.where(subjectList2, { AESubjectID: obj3.AESubjectID })[0];
            let itemObj = _.where(subjectList2, { SubjectID: obj3.SubjectID })[0];
            obj3.SubjectTeacherUserID = itemObj ? itemObj.SubjectTeacherUserID : null;
            return obj3;
          })
        }, error => {
          if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
            this.toaster.warning(UNAUTHERIZEDMESSASGE);
          } else {
            this.toaster.error(error.error['message']);
          }
        });
        this.childModal.show();
      }, error => {
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toaster.error(error.error['message']);
        }
      });
    }


  }

  hideChildModal(): void {
    this.selectedClass = undefined;
    this.childModal.hide();
  }

  showCreateSectionModal() {
    this.isCreateSectionModalOpen = true;
  }

  saveSubjectList() {
    const subjectList = [];
    for (var i = 0; i < this.subjectList.length; i++) {
      let tempSubject = {};
      tempSubject["SubjectTeacherUserID"] = this.subjectList[i].SubjectTeacherUserID;
      tempSubject["EASubjectID"] = this.subjectList[i].AESubjectID;
      tempSubject["SubjectID"] = this.subjectList[i].SubjectID;
      if (this.subjectList[i].SubjectTeacherUserID !='00000000-0000-0000-0000-000000000000' && this.subjectList[i].AESubjectID && this.subjectList[i].SubjectID) {
        subjectList.push(tempSubject);
      }

    }
    if (this.selectedClass) {
      this.classSetupService.saveSubjectList(subjectList, this.selectedClass.AESectionID).subscribe(res => {
        this.childModal.hide();
        if (subjectList) {
          this.toaster.success('Subject teacher added successfully');
        } else {
          this.toaster.error('Please try again...!!');
        }
      }, error => {
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toaster.error(error.error['message']);
        }
      });
    }
  }

  onClassTeacherChange(classObj: InstituteClass) {
    this.classSetupService.addOrUpdateClassTeacher(classObj.ClassID, classObj.AESectionID, classObj.ClassTeacherUserID).subscribe(res => {
    console.log("eeeeeeee",res);
    
      if (classObj.ClassID) {
        this.toaster.success('Class teacher added successfully');
      }
     else {
        this.toaster.error('Please try again...!!');
      }
     
    }, error => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toaster.error(error.error['message']);
      }
    });
  }

  teacherTrackByFn(index, item) {
    return item.UserID;
  }

  updateSectionList(institutionClass) {
    this.classSetupService.updateSectionList(institutionClass.AESectionID).subscribe(
      (result) => {      
        institutionClass.SectionStatus = institutionClass.SectionStatus === 1 ? 2 : 1;
        Swal.fire({
          type: 'success',
          title: '<h4>status changed successfully.</h4>',
          showConfirmButton: false,
          timer: 2000
        })
      }, error => {
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toaster.error(error.error['message']);
        }
      });
     
  }

  closeCreateSectionDialog(data: any) {
    this.createSection.hide();
    if (data.isRefresh) {
      this.ngOnInit();
    }
  }

  onSectionChange(instituteClass: InstituteClass) {
    if (this.sectionOldValue === instituteClass.SectionName) {
      return;
    }
    if (!this.sectionNameError) {
      instituteClass.SectionName = this.sectionOldValue;
      this.sectionNameError = !this.sectionNameError;
      return;
    }
    console.log(this.sectionOldValue, instituteClass.SectionName);
    this.classSetupService.updateClassSection(instituteClass).subscribe(res => {
      if (!res.success) {
        instituteClass.SectionName = this.sectionOldValue;
      };
    }, error => {
      if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
        this.toaster.warning(UNAUTHERIZEDMESSASGE);
      } else {
        this.toaster.error(error.error['message']);
      }
      instituteClass.SectionName = this.sectionOldValue;
    });
  }
  public typed(value: any): void {
    console.log('New search input: ', value);
  }

  onHideCreateSectionModal() {
    this.isCreateSectionModalOpen = false;
  }

  ngOnInit() {
    this.classSetupService.getClassListByInstituteId().subscribe(res => {
      if(res && res.length > 0){
        let roles: string[] = ["Teacher"];
        this.staffService.getStaffListByRole(roles, "").subscribe(resc => {      
          this.classTeachers = resc;    
          
          this.classTeachers = this.classTeachers.filter((i) => {
              i.fullName = i.FirstName + ' ' + i.LastName;
              return i;        
          });
      this.classList = res;
      this.isDataShow = true;
        }, error =>{
          this.classList = res;
          this.isDataShow = true;
        });


      }else{
        this.classList = [];
        this.isDataShow = false;
      }

    }, error =>{
      console.log(error);
    });

  }

  titlecaseClassName(className) {
    return _.chain(className.split(" ")).map(function (str) {
      var tempStr = str.toLowerCase();
      return tempStr.charAt(0).toUpperCase() + tempStr.slice(1);
    }).value().join(" ");
  }

  validateSectionName(sectionname) {
    console.log((/^(?!.*\.)(?=.*[A-Z][0-9]).+$/).test(sectionname));
    this.sectionNameError = (/^(?!.*\.)(?=.*[A-Z]).+$/).test(sectionname);

  }

}
