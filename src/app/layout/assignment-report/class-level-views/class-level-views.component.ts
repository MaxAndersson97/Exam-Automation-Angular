import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AcademicYearService } from 'src/app/layout/academic-year/academic-year.service';
import { AddWingService } from 'src/app/layout/wing-setup/add-wing/add-wing.service';
import { AddStudentService } from 'src/app/layout/add-student-manually/add-student/add-student.service';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-class-level-views',
  templateUrl: './class-level-views.component.html',
  styleUrls: ['./class-level-views.component.scss']
})
export class ClassLevelViewsComponent implements OnInit {

  InstituteID: any ;
  BoardID: any;
  MediumID: any;
  academicList: any =[];
  academicYearsID: any ="";
  AcademicyearsId: any
  classes: any = [];
  studentFilterObj: any = {
    h_status: null
  };
  sectionList: any = [];
  maxDate: Date;
  currentdate: Date;
  dates: any =[];
  numberofdays:any= 7;
  from_date: any;
  last_date: any;
  month_names:any= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  homeworkstatusvalue: any;
  homeworkStatus=[
    { id:1 , name: 'Pending', status: 7},
    { id:2 , name: 'Received', status: 12},
    { id:3 , name: 'Approved', status: 5},
    { id:4 , name: 'Rejected', status: 6},
  ];

  report_list: any;
  finalreport_list: any;
  Adhoc_list: any;
  className: any;
  isSearchValid: boolean = false;
  nodataavailble: boolean= false;

  todayd: boolean= false;
  sevend: boolean= true;
  thirtyd: boolean= false;
  customd: boolean= false;
  BelowcustomShowLimit: any;  

  pendingd: boolean= false;
  receivedd: boolean= true;
  approvedd: boolean= false;
  rejectedd: boolean= false;

  AYearsID: any ="";
  ASectionID: any ="";
  AClassID: any ="";

  attendancefilterForm = this.fb.group({
    FromDate: [''],
    ToDate: [''],
    homeworkStatus: ['']
  });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private academicYearService: AcademicYearService,
    private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private shareService: SharedDataService,
    private fb: FormBuilder,
    private toastr: ToastrService,) {

      let currentDate = new Date();
      this.maxDate = new Date(currentDate.setFullYear(currentDate.getFullYear() ));
     }

     exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, 'sample.xlsx');
			
    }

  ngOnInit() {
    let schoolprofile= JSON.parse(localStorage.getItem('schoolProfile'));  
    this.AcademicyearsId= schoolprofile.AcademicYearID;

    this.currentdate = new Date();
    this.datearray();
    console.log(this.currentdate);
    this.homeworkstatusvalue= 12;

    this.InstituteID = JSON.parse(localStorage.getItem('institute')).InstituteID;

    this.MediumID = JSON.parse(localStorage.getItem('institute')).MediumID;
    this.BoardID = JSON.parse(localStorage.getItem('institute')).BoardID;

    this.getAcademicYears();
    this.getInstituteDDLClass();
    this.addreportlistnew();
  }

  datearray(){
    let arr = [];
    let newarr = [];
    for(let i=0;i<this.numberofdays; i++)
    {
      var newday = new Date(this.currentdate); 
      newday.setDate(this.currentdate.getDate() - i);
      arr.push(newday);
    }
    for(let i=0;i<arr.length; i++){
      var newday = new Date(arr[i]); 
      var date = newday.getDate();
      var month = newday.getMonth(); 
      var year = newday.getFullYear();
      var time = newday.getHours() + ":" + newday.getMinutes() + ":" + newday.getSeconds();
      var dateStr = date + "-" + this.month_names[month] + "-" + year + " "+ time;
      newarr.push(dateStr);
    }
    this.dates= newarr;
    this.dates.reverse();
    this.from_date= this.dates[0];
    this.last_date= this.dates[this.dates.length-1];
    for(let i=0;i<this.dates.length; i++){
      var newday = new Date(this.dates[i]); 
      var date = newday.getDate();
      var month = newday.getMonth(); 
      var dateStr = date + "-" + this.month_names[month];
      this.dates[i]=dateStr;
    }
    this.dates.reverse();
    console.log(this.dates, this.from_date, this.last_date);
  }

  getsubjectlevel(item){
    var prepareDataToSave = {
      BoardID: this.BoardID,
      InstituteID: this.InstituteID,
      MediumID: this.MediumID,
      ClassID: item.ClassID,
      SectionID: item.SectionID,
      AcademicYearID: this.AYearsID,
      fromDate: this.from_date,
      toDate: this.last_date,
      SubjectId: item.SubjectID,
      // "StudentID": "07c4e324-e406-4ea0-9e18-46202ab456e8",
      HomeworkStatus: this.homeworkstatusvalue
    }
    console.log(prepareDataToSave);
    localStorage.setItem('assignmentsubject', JSON.stringify(prepareDataToSave));
    localStorage.setItem('assignmentdates', JSON.stringify(this.dates));

    this.router.navigate(['../subject-level-views'], {relativeTo: this.route});
  }

  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicList = academicYear.filter(x => x.AcademicStatus === 1);
      // academicYear.filter(academic => {
      //   if (academic.AcademicStatus == 1) {
      //     this.academicYearsID = academic.AcademicYearID;
      //     this.academicList.push(academic);
      //   }
      // })
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

  getSectionByClassID(ClassID) {
    this.studentFilterObj['StudentID'] = null;
    this.studentFilterObj['EA_SectionID']=  null;
    this.sectionList = [];
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section.filter(x => x.SectionStatus === 1);;
      }, error => {
        this.sectionList = [];
      }
    )
  }

  get f() { return this.attendancefilterForm.controls; }

  isSearchFormValid(){
    if((this.studentFilterObj.ClassID!= undefined || this.studentFilterObj.ClassID!= null)){
       this.isSearchValid = true;
    }else{
      this.isSearchValid = false;
    }
  }

  clearfilter(){
    this.studentFilterObj.ClassID= null;
    this.studentFilterObj.EA_SectionID= null;
    this.sectionList = [];
    this.studentFilterObj.academicYearsID= null;
    this.studentFilterObj.h_status= null;
    this.isSearchValid = false;

    let schoolprofile= JSON.parse(localStorage.getItem('schoolProfile'));  
    this.AcademicyearsId= schoolprofile.AcademicYearID;

    this.currentdate = new Date();
    this.datearray();
    // this.homeworkstatusvalue= 12;
    this.receivedselected();
    this.sevendaysselected();
    // this.addreportlistnew();
  }

  onSubmit() {
    console.log(this.studentFilterObj);
      this.addreportlistnew();
  }

  addreportlistnew(){
    this.className='';
    if(this.studentFilterObj.academicYearsID!= undefined && this.studentFilterObj.academicYearsID!= null){
      this.AYearsID= this.studentFilterObj.academicYearsID;
    }
    else{
      this.AYearsID= this.AcademicyearsId;
    }

    if(this.studentFilterObj.ClassID!= undefined && this.studentFilterObj.ClassID!= null){
      this.AClassID= this.studentFilterObj.ClassID;
    }
    else{
      this.AClassID= "00000000-0000-0000-0000-000000000000";
    }

    if(this.studentFilterObj.EA_SectionID!= undefined && this.studentFilterObj.EA_SectionID!= null){
      this.ASectionID= this.studentFilterObj.EA_SectionID;
      console.log(this.ASectionID);
    }
    else{
      this.ASectionID= "00000000-0000-0000-0000-000000000000";
    }
    // if(this.studentFilterObj.h_status!=undefined && this.studentFilterObj.h_status!=null){
    //   this.homeworkstatusvalue=this.studentFilterObj.h_status;
    // }
    // else{
    //   this.homeworkstatusvalue= 5;
    // }

    let preprod = {
      "BoardID": this.BoardID,
      "MediumID": this.MediumID,
      "InstituteID": this.InstituteID,
      "ClassID": this.AClassID,
      "SectionID": this.ASectionID,
      "AcademicYearID": this.AYearsID,
      // "AcademicYearID": "4333A672-416B-4BE4-8D09-1C19340CC44A",
      "fromDate": this.from_date,
      "toDate": this.last_date,
      // "StudentID": "07c4e324-e406-4ea0-9e18-46202ab456e8",
      // "SubjectId": "80eb4241-6691-4564-abe1-7ae1a50e3cd4c",
      "HomeworkStatus": this.homeworkstatusvalue
      }
    this.shareService.getassignmentreportlistfirst(preprod).subscribe(res=>{
      console.log(res);

      if(res['success'] && res['data']!=''){
          this.report_list= res['data'];  
          
          let arr = [];
          let adhocarr =[];
          
          //-----Assignment data--------------
          for (var i = 0, n = this.report_list.length; i < n; ++i){
            let subjectData = this.report_list[i]['lsthomeworkInfoReport_Subject'];
            let adhocData = this.report_list[i]['lsthomeworkInfoReport_AdhocSubject'];

            if(subjectData && subjectData!=[]){
              subjectData.forEach((element, indx) => {
                if(indx ==0){
                  if(adhocData.length > 0){
                    element['rowSpanad'] =  (subjectData && subjectData.length) + adhocData.length + 1; 
                    console.log(element['rowSpanad']);  
                  }
                  else{
                    element['rowSpanad'] =  (subjectData && subjectData.length); 
                  }
                  
                  element['ClassName'] = this.report_list[i]['ClassName'];
                  element['SectionName'] = this.report_list[i]['SectionName'];
                } 
                element['ClassID'] = this.report_list[i]['ClassID'];
                element['SectionID'] = this.report_list[i]['SectionID'];
                arr.push(element); 
              });
            }

            if(adhocData && adhocData!=[] ){
              adhocData.forEach((element, indx) => {
                if(indx ==0){
                  element['ClassName'] = this.report_list[i]['ClassName'];
                  element['SectionName'] = this.report_list[i]['SectionName'];
                  element['adhocrow']= true;
                  if(subjectData.length==0){
                    element['rowSpanad']= (adhocData && adhocData.length);
                  }
                  else{
                    element['rowSpanad']= 0;
                  }
                } 
                element['ClassID'] = this.report_list[i]['ClassID'];
                element['SectionID'] = this.report_list[i]['SectionID'];
                arr.push(element); 
              });
            }
          }
          for (var i = 0, m = arr.length; i < m; ++i){
            arr[i]['lstHomeworkInfoReport_Day'].reverse();
          }
          
          console.log(arr);
          this.finalreport_list= arr;
          this.nodataavailble= false;
          //-----Assignment data--------------

          if(this.studentFilterObj.ClassID!= undefined && this.studentFilterObj.ClassID!= null){
            console.log(this.finalreport_list[0]);
            this.className= this.finalreport_list[0]['ClassName'];
          }
      }
      else if(res['data']==''){
        this.toastr.error(res['message']);
        this.finalreport_list= [];
        this.nodataavailble= true;
      }
    });
    
  }

  todayselected(){
    this.numberofdays= 1;
    this.currentdate = new Date();
    this.datearray();
    this.todayd = true;
    this.sevend = false;
    this.thirtyd = false;
    this.customd = false;
    this.BelowcustomShowLimit='';
    this.addreportlistnew();
  }
  sevendaysselected(){
    this.numberofdays= 7;
    this.currentdate = new Date();
    this.datearray();
    this.todayd = false;
    this.sevend = true;
    this.thirtyd = false;
    this.customd = false;
    this.BelowcustomShowLimit='';
    this.addreportlistnew();
  }
  thirtydaysselected(){
    this.numberofdays= 30;
    this.currentdate = new Date();
    this.datearray();
    this.todayd = false;
    this.sevend = false;
    this.thirtyd = true;
    this.customd = false;
    this.BelowcustomShowLimit='';
    this.addreportlistnew();
  }
  onselectcustomdate(value){
    console.log(value);
    this.numberofdays= value;
    this.currentdate = new Date();
    this.datearray();
    this.todayd = false;
    this.sevend = false;
    this.thirtyd = false;
    this.customd = true;
    this.addreportlistnew();
  }

  pendingselected(){
    this.pendingd = true;
    this.receivedd = false;
    this.approvedd = false;
    this.rejectedd = false;
    this.homeworkstatusvalue= 7;
    this.addreportlistnew();
  }
  receivedselected(){
    this.pendingd = false;
    this.receivedd = true;
    this.approvedd = false;
    this.rejectedd = false;
    this.homeworkstatusvalue= 12;
    this.addreportlistnew();
  }
  approvedselected(){
    this.pendingd = false;
    this.receivedd = false;
    this.approvedd = true;
    this.rejectedd = false;
    this.homeworkstatusvalue= 5;
    this.addreportlistnew();
  }
  rejectedselected(){
    this.pendingd = false;
    this.receivedd = false;
    this.approvedd = false;
    this.rejectedd = true;
    this.homeworkstatusvalue= 6;
    this.addreportlistnew();
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  
  }
}
