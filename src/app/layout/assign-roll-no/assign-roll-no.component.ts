import { Component, OnInit } from '@angular/core';

import { AddWingService } from '../wing-setup/add-wing/add-wing.service';
import { AddStudentService } from '../add-student-manually/add-student/add-student.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-assign-roll-no',
  templateUrl: './assign-roll-no.component.html',
  styleUrls: ['./assign-roll-no.component.scss']
})
export class AssignRollNoComponent implements OnInit {

  classes: any = [];
  sectionList: any = [];
  studentFilterObj: any = {};
  aaddrollnolist: any = {};
  assignstudentlist: any = {};
  noDataFound: boolean = true;
  academicYearsID: any ="";
  InstituteID: any ;
  BoardID: any;
  MediumID: any;
  students: any = [];
  academicList: any =[];
  generaterollno: boolean = false;
  showbtn: boolean = false;
  section_ids:any = [];
  sectionlist:any =[];
  selectsectionstatus: boolean = false;
  selectstudentid: any;
  selectstudentsection: any;
  sectionfordefault = [
    {id: 1, name: 'All Section Selected'}
  ]
  
  constructor(
    private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private sharedService: SharedDataService,
    private toastr: ToastrService,
    private shareService: SharedDataService,
    private academicYearService: AcademicYearService){ }

  ngOnInit() {
    this.getAcademicYears();
    this.getInstituteDDLClass();

    this.InstituteID = JSON.parse(localStorage.getItem('institute')).InstituteID;
    this.MediumID = JSON.parse(localStorage.getItem('institute')).MediumID;
    this.BoardID = JSON.parse(localStorage.getItem('institute')).BoardID;
    console.log(this.InstituteID, this.MediumID, this.BoardID);
  }

  changesectionstatus(){
    this.selectsectionstatus= true;
    this.studentFilterObj.EA_SectionID=  null;
  }
  changesectionstatusf(){
    this.selectsectionstatus= false;
  }

  getInstituteDDLClass() {
    this.addWingService.getInstituteDDLClass()
      .subscribe(classes => {
        console.log(classes);

        if (classes) {
          this.classes = classes.filter(element => element['IsClassShowInPortal'] === true);
        }
      }, error => {
      }
      );

  }

  getSectionByClassID(ClassID) {
    this.section_ids=[];
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section;
        this.sectionList.forEach((element, indx) => {
          let cname= element['AESectionID'];
          this.section_ids.push(cname);
        });
        console.log(this.section_ids);
      }, error => {
      }
    )
    this.studentFilterObj.EA_SectionID=  null;
    
  }
  assignbtn(){
    this.generaterollno = true;
    this.showbtn= true;
  }
  assigndisbalebtn(){
    this.generaterollno = false;
    this.showbtn =false;
  }
  getStudentBySection(){
    this.studentFilterObj['StudentID']=  null;
    if(!!this.studentFilterObj.EA_SectionID && !!this.studentFilterObj.ClassID){
      let data = {
        "AcademicYearID": this.academicYearsID,
        "ClassID": this.studentFilterObj.ClassID,
        "SectionID": [this.studentFilterObj.EA_SectionID]
      }  
      this.shareService.studentListBySection(data).subscribe(res=>{
        this.students = res[0]['LstStudentData'];
        console.log(this.students);
      }, error=>{
        this.students =[];
      })
    }
  
  }
  
  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicList = academicYear.filter(x => x.AcademicStatus === 1);;
    };
    const getAcademicYearFailure = (httpError: HttpErrorResponse) => {
      const { error } = httpError;
      if (error) {
        const { error_description } = error;
        this.academicYearsID = "";
      }
    };
    this.academicYearService.getAcademicYears()
      .subscribe(
        getAcademicYearSuccess,
        getAcademicYearFailure,
        () => console.log('Get AcademicYears Request Complete')
    );
  }

  addrollno(){
    let b=[];
    if(this.studentFilterObj['EA_SectionIDs'] && this.studentFilterObj['EA_SectionIDs'][0]){    
      b= this.studentFilterObj['EA_SectionIDs'].map(item=> item.AESectionID);
    }
    if(this.studentFilterObj.EA_SectionID==null){
      this.sectionlist=this.section_ids;
    }
    else if(this.studentFilterObj.EA_SectionID!=null){
      this.sectionlist= [this.studentFilterObj.EA_SectionID];
    }
    
    let preprod = {
      "instituteID":  this.InstituteID,
      "academicYearID": this.studentFilterObj.academicYearsID,
     "boardId": this.BoardID,
     "mediumID": this.MediumID,
      "classId": this.studentFilterObj.ClassID,
      "lstEASectionID": this.sectionlist
    }
    this.sharedService.getstudentlist(preprod).subscribe(res=> {
      this.noDataFound = false;
      if(res['success'] && res['data']) 
      {
        this.aaddrollnolist = res['data'];   
        this.showbtn= true;
      }else  if(!res['success'] && res['data']) {
        this.noDataFound = true;
        this.aaddrollnolist = [];   
        let msg = "";
        for(var i = 0; i < res['data'].length; i++) 
        {
          msg = msg + res['data'][i].message + "</br>";
        }
        this.toastr.error(msg,'', { closeButton: false, timeOut: 4000,enableHtml: true });
      } else {
        this.noDataFound = true;
        if(res['success'] && res['message']=='') {
          this.toastr.info('No student(s) available.'); 
        }
        if (res['success'] && res['message'] != '' && res['message'] == 'Roll no. generated successfully. /n') {
          this.toastr.success('Roll no. generated successfully');
          this.addrolllist();
        }
        if (res['success'] && res['message'] != '' && res['message'] != 'Roll no. generated successfully. /n') {
          // this.toastr.error(res['message']);
          let message = res['message'];
          let newMessage = message.split('/n');
           let checkNullMessage = newMessage.filter(x => x != " ");
          for(var i = 0; i < checkNullMessage.length; i++) 
          {
            this.toastr.error(checkNullMessage[i]);
          }
        }
      }
    }, error=>{
      this.noDataFound = true;
      this.toastr.error('Please select valid data.');
    });
  }

  addrolllist(){
    let b=[];
    if(this.studentFilterObj['EA_SectionIDs'] && this.studentFilterObj['EA_SectionIDs'][0]){    
      b= this.studentFilterObj['EA_SectionIDs'].map(item=> item.AESectionID);
    }
    
    if(this.studentFilterObj.EA_SectionID==null){
      this.sectionlist=this.section_ids;
    }
    else if(this.studentFilterObj.EA_SectionID!=null){
      this.sectionlist= [this.studentFilterObj.EA_SectionID];
    }
    let preprod = {
      "instituteID":  this.InstituteID,
      "academicYearID": this.studentFilterObj.academicYearsID,
      "boardId": this.BoardID,
      "mediumID": this.MediumID,
      "classId": this.studentFilterObj.ClassID,
      "lstEASectionID": this.sectionlist
    }
    this.sharedService.getallocatedstudentlist(preprod).subscribe(res=>{
      this.noDataFound = false;
      if(res['success'] && res['data']){
        this.assignstudentlist = res['data']; 
        this.assignstudentlist.sort( function( a, b ) {
          return a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0;
        });
        this.assignstudentlist.sort( function( a, b ) {
          return a.SectionName < b.SectionName ? -1 : a.SectionName > b.SectionName ? 1 : 0;
        });
        
        console.log(this.assignstudentlist); 
        if(this.assignstudentlist == ''){
          this.toastr.info('No student(s) available.');   
        }
      }else{
        this.noDataFound = true;
        this.toastr.error('No data found.');
      }

    }, error=>{
      this.noDataFound = true;
      this.toastr.info('No student(s) available.');
    });
  }

  addrollnoforone(value){
    console.log(value);
    this.selectstudentid= value.EAStudentAcademicMappingID;
    this.selectstudentsection= value.EA_SectionID;
    let preprod = {
      "instituteID":  this.InstituteID,
      "academicYearID": this.studentFilterObj.academicYearsID,
      "boardId": this.BoardID,
      "mediumID": this.MediumID,
      "classId": this.studentFilterObj.ClassID,
      "lstEASectionID": [this.selectstudentsection],
      "StudentAcademicMappingID": this.selectstudentid
    }
    this.sharedService.getrollforonestudent(preprod).subscribe(res=>{
      this.noDataFound = false;
      if(res['success']){
        this.toastr.success(res['message']);  
        this.addrolllist(); 
      }
      else{
       this.toastr.error(res['message']);
      }
    });
  }

  clearFilter() {
    this.studentFilterObj.academicYearsID= null;
    this.studentFilterObj.ClassID= null;
    this.studentFilterObj.EA_SectionID= null;
    this.studentFilterObj.StudentID= null;
    this.studentFilterObj.ExamGroupIds= null;
    this.sectionList=[];
    this.students=[];
    this.assignstudentlist=[];
    this.selectsectionstatus= false;
    this.noDataFound = true;
  }
}
