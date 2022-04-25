import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AcademicYearService } from '../../academic-year/academic-year.service';
import { ToastrService } from 'ngx-toastr';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import * as _ from 'underscore';
import { TemplateService } from '../../template-setup/template.service';
import { ModalDirective, BsModalService } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.scss']
})
export class AddExamComponent implements OnInit {
  academicYears: any =[];
  classes: any =[];
  sectionList: any =[];
  subjects: any=[];
  schoolInfo: any;
  EAPaperTemplateID: any;
  CurrentAcademicSessionID = null;
  selectedMoment: any = null;
  selectedStudentDetails: any = [];
  last: number;
  i: number;
    // Min moment: February 12 2018, 10:30
  public min = new Date();
  AssignedExamList: any=[];
  isStudentSelected: boolean = false;
  isFormValid: boolean= false;
  isAssignExamValid: boolean = false;

  @ViewChild('specific_student') specificStudent: ModalDirective;
  selectedStudentIndx: any;
  natureDropdownSetting ={};
  constructor(private router: Router,
    private route: ActivatedRoute,
    private addStudentService: AddStudentService,
    private academicYearService: AcademicYearService,
    private toaster: ToastrService,
    private addWingService: AddWingService,
    private templateService: TemplateService,
    private sharedService: SharedDataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.natureDropdownSetting = {
      singleSelection: false,
      idField: 'AESectionID',
      textField: 'SectionName',
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 2
    };
    this.schoolInfo = JSON.parse(localStorage.getItem('schoolProfile'));    
    this.route.params.subscribe(id=>{
      this.EAPaperTemplateID = id.id;
      this.getAcademicYears();
      this.getInstituteDDLClass();
    });
    this.AssignedExamList.push({
      index: 1,
      SubjectID: null,
      EA_SectionID: null,
      ClassID: null
    });
  }

  getvalue(){
    // let myDate = this.datePipe.transform(this.selectedMoment, 'dd-LLL-yyyy hh:mm');
    // console.log( myDate, new Date(myDate), this.selectedMoment,
    //   this.CurrentAcademicSessionID);
  }

  validateForm(){
    console.log('current vaslue', this.isFormValid, this.selectedMoment, this.CurrentAcademicSessionID, this.isAssignExamValid);
    if(this.CurrentAcademicSessionID != null && this.selectedMoment != null && this.isAssignExamValid ){
      this.isFormValid = true;
    }else{
      this.isFormValid = false;
    }

  }

  // get academic year for filter
  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicYears = [];
      academicYear.filter(academic => {
        if (academic.AcademicStatus == 1) {
          this.academicYears.push(academic);
        }
      })
    };
    const getAcademicYearFailure = (httpError: HttpErrorResponse) => {
      const { error } = httpError;
      if (error) {
        const { error_description } = error;
        this.academicYears = [];
      }
    };
    this.academicYearService.getAcademicYears()
      .subscribe(
        getAcademicYearSuccess,
        getAcademicYearFailure,
        () => console.log('Get AcademicYears Request Complete')
    );
  }

  // get class for filter
  getInstituteDDLClass() {
    this.addWingService.getInstituteDDLClass()
      .subscribe(classes => {
        if (classes) {
          this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
        }
      }, error => {
      }
      );
  }

  // get section for form
  getSectionByClassID(ClassID, indx) {
    this.validateAssignExam();
    this.AssignedExamList[indx]['EA_SectionID'] = [];
    this.onSelectItem(event, indx);
    this.AssignedExamList[indx]['EA_SectionID'] = null;
    if (!!ClassID) {
    }
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.AssignedExamList[indx]['sectionList'] = section;
      }, error => {
        this.AssignedExamList[indx]['sectionList'] = [];
      }
    )
  }
 // get subject for form
  getSubject(classId, indx) {    
    this.AssignedExamList[indx]['SubjectID'] = null;
    this.subjects =[];
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.AssignedExamList[indx]['subjects'] = _.filter(subjects, function (obj) {
          return (obj.IsSelected)
        });
      } else {
      }
    };
    const getInstituteDDLClassFailure = (httpError: HttpErrorResponse) => {
      const { error, error_description } = httpError.error;
      console.log(error, error_description);
    };
    this.templateService.getInstituteDDLSubject(classId)
      .subscribe(getInstituteDDLClassSuccess,
        getInstituteDDLClassFailure,
        () => console.log('getInstituteDDLClass() Request Complete')
      );
  };

  setStudentDetails(i, studentType){
    if(!(!!this.AssignedExamList[i]['PaperEASectionID']) || this.AssignedExamList[i]['PaperEASectionID'].length <1){
      this.toaster.info('Please select section first');
      return;
    }
    console.log(studentType, 'studentType====');
    this.AssignedExamList[i]['studentType'] = studentType;
    this.selectedStudentIndx = i;
    let data = {};
    this.selectedStudentDetails = [];
    data = {
      "AcademicYearID": this.CurrentAcademicSessionID,
      "ClassID": this.AssignedExamList[i]['ClassID'],
      "SectionID": this.AssignedExamList[i]['PaperEASectionID']
    }
    if(this.AssignedExamList[i]['lstStudentID'] && this.AssignedExamList[i]['lstStudentID'][0] && this.AssignedExamList[i]['studentType'] ==2){
      this.selectedStudentDetails = this.AssignedExamList[i]['lstStudentID'];
      setTimeout(() => {
        this.validateAssignExam();
        console.log(this.AssignedExamList[i]);
        const val = this.AssignedExamList[i]['studentType'];
        if(val == 1){
        }else{ 
          this.specificStudent.show();
        }
      
      }, 10);
    }else if(this.AssignedExamList[i]['studentType'] ==2){

      this.sharedService.studentListBySection(data).subscribe(res=>{
        this.selectedStudentDetails = res;
        this.selectedStudentDetails.forEach(element => {
          element['LstStudentData'].forEach(chEle => {
            chEle['isSelected'] = false;
          });
        });
        setTimeout(() => {
          console.log(this.AssignedExamList[i]);
          const val = this.AssignedExamList[i]['studentType'];
            this.specificStudent.show();
            this.validateAssignExam();      
        }, 10);
        
      }, err=>{
        this.toaster.info('No student(s) available.')
        
      })
    }else{
      // studenttype =1
      console.log('else part==== ');
      this.sharedService.studentListBySection(data).subscribe(res=>{
        this.selectedStudentDetails = res;
        this.selectedStudentDetails.forEach(element => {
          element['LstStudentData'].forEach(chEle => {
            chEle['isSelected'] = true;
          });
        });
         setTimeout(() => {
            this.AssignedExamList[this.selectedStudentIndx]['lstStudentID'] = this.selectedStudentDetails;
            this.isStudentSelected = true;
            this.validateAssignExam();
         }, 10);        
      }, err=>{
        this.AssignedExamList[this.selectedStudentIndx]['lstStudentID'] = [];
        // this.isStudentSelected = ;
        this.validateAssignExam();
        this.toaster.info('No student(s) available.');        
      })


    }
  }

  closeModel(){
    this.specificStudent.hide();
  }

  updateStudent(parentIndx, chIndx){
    let a = 0;
    setTimeout(() => {
      this.selectedStudentDetails[parentIndx]['LstStudentData'][chIndx]['isSelected'] = !this.selectedStudentDetails[parentIndx]['LstStudentData'][chIndx]['isSelected'];
      this.selectedStudentDetails.forEach((element, paIndx) => {
        element['LstStudentData'].forEach((chEle, chIndx) => {
          if(!!chEle['isSelected']){
            a = 1;            
          }
          if(paIndx ==  this.selectedStudentDetails.length -1 && chIndx == element['LstStudentData'].length-1){
            this.isStudentSelected = a==1 ? true : false;
          }
        });
      });
    }, 10);
  }

  selectStudent(){
    this.closeModel();
    this.AssignedExamList[this.selectedStudentIndx]['lstStudentID'] = this.selectedStudentDetails;
    console.log(this.selectedStudentDetails);
  }
  assignToMoreSection(event){
    console.log('assign to more', this.AssignedExamList);
    this.isAssignExamValid = false;
    this.validateForm();
    this.AssignedExamList.push({
      SubjectID: null,
      EA_SectionID: null,
      ClassID: null
    });
  }
  deleteAssignedExam(i){
    this.AssignedExamList.splice(i, 1);
    this.validateAssignExam();
  }

  onSelectItem(event, i){
    setTimeout(() => {
      let currentExam = this.AssignedExamList[i]['EA_SectionID'];
      console.log(currentExam);
      let sectionIDs = [];
      this.AssignedExamList[i]['PaperEASectionID'] = [];
      this.validateAssignExam();
      if(currentExam && currentExam.length > 0){
      currentExam.forEach((ele, indx) => {
        sectionIDs.push(ele.AESectionID);
        if(indx == currentExam.length-1){
          this.AssignedExamList[i]['PaperEASectionID'] = sectionIDs;
          console.log(this.AssignedExamList[i]['PaperEASectionID']);
          this.setStudentDetails(i, 1);
          
        }
      });
    }else{
      this.AssignedExamList[i]['lstStudentID'] = [];
      this.AssignedExamList[i]['PaperEASectionID'] =[];
      this.selectedStudentDetails = [];
    }
      console.log(this.AssignedExamList[i])      
    }, 10);
  }
  validateAssignExam(){
    setTimeout(() => {
      this.isAssignExamValid = false;
      this.AssignedExamList.forEach((ele, indx)=> {
          if((ele.PaperEASectionID && ele.PaperEASectionID.length > 0) && ele.SubjectID!= null && (ele.lstStudentID && ele.lstStudentID.length >0 )&& ele.ClassID != null){
            this.isAssignExamValid = true;
          }else{
            this.isAssignExamValid = false;
            return;
            
          }
      });
      this.validateForm();
    }, 10);
  }

  submitAssignExam(){
    let lstCSSInfomember =[];
    console.log(this.AssignedExamList);
    this.AssignedExamList.forEach(pelemnt => {    

      pelemnt['lstStudentID'].forEach(chEle => {
        console.log(chEle.LstStudentData, 'adsadadas dasd as' );
        let sectionWiseObj = {};
        sectionWiseObj = {        
          "PaperClassID": pelemnt.ClassID,
          "PaperSubjectID": pelemnt.SubjectID, 
          "PaperEASectionID": chEle.SectionID,
          "lstStudentID": chEle.LstStudentData.map(item=> {return item.isSelected ?(item.StudentID): false})
        }       

        lstCSSInfomember.push(sectionWiseObj);
        sectionWiseObj = {};  
        console.log(sectionWiseObj, chEle);
      });
      
    });
    let prepareData = {
      EAExamAssignID: "00000000-0000-0000-0000-000000000000",
      EAPaperTemplateID: this.EAPaperTemplateID,
      AcademicYearID: this.CurrentAcademicSessionID,
      ExamDateTime:  this.datePipe.transform(this.selectedMoment, 'dd-LLL-yyyy HH:mm'),
      ExamStatus: 1,
      Reason: '',
      lstCSSInfomember:lstCSSInfomember
    }

    this.sharedService.addAssignExam(prepareData).subscribe(res=>{
      this.router.navigate(['../../dashboard'], { relativeTo: this.route });
    }, error=>{
      this.toaster.error(error.error.data[0].message);
    })
  }

}
