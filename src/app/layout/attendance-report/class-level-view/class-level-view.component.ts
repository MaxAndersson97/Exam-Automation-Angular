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
  selector: 'app-class-level-view',
  templateUrl: './class-level-view.component.html',
  styleUrls: ['./class-level-view.component.scss']
})
export class ClassLevelViewComponent implements OnInit {

  InstituteID: any ;
  BoardID: any;
  MediumID: any;
  academicList: any =[];
  academicYearsID: any ="";
  AcademicyearsId: any;
  classes: any = [];
  studentFilterObj: any = {};
  sectionList: any = [];
  maxDate: Date;
  currentdate: Date;
  dates: any =[];
  numberofdays:any= 7;
  submitted: boolean = false;
  from_date: any;
  last_date: any;
  month_names:any= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  report_list: any;
  finalreport_list: any;
  Adhoc_list: any;
  className: any;
  submittedfilter: boolean = false;
  nodataavailble: boolean= false;

  todayd: boolean= false;
  sevend: boolean= true;
  thirtyd: boolean= false;
  customd: boolean= false;
  BelowcustomShowLimit: any;

  AYearsID: any ="";
  ASectionID: any ="";
  AClassID: any ="";

  attendancefilterForm = this.fb.group({
    // ClassID: ['', Validators.required], 
    // EA_SectionID: ['', Validators.required], 
    // AcademicSessionID: ['', Validators.required],
    FromDate: [''],
    ToDate: [''],
  });

  customdateForm = this.fb.group({
    cDate: ['', Validators.required]
  })

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

    this.InstituteID = JSON.parse(localStorage.getItem('institute')).InstituteID;
    this.MediumID = JSON.parse(localStorage.getItem('institute')).MediumID;
    this.BoardID = JSON.parse(localStorage.getItem('institute')).BoardID;

    this.getAcademicYears();
    this.getInstituteDDLClass();
    this.addreportlistnew();
  }

  clearfilter(){
    this.attendancefilterForm.reset();
    this.attendancefilterForm.value.FromDate='';
    this.attendancefilterForm.value.ToDate='';
    this.currentdate = new Date();
    this.numberofdays= 7;
    console.log(this.currentdate);
    this.studentFilterObj.academicYearsID= null;
    this.studentFilterObj.ClassID= null;
    this.studentFilterObj.EA_SectionID= null;
    
    this.datearray();

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
    console.log(this.dates, this.from_date, this.last_date);
  }

  getsubjectlevel(item){

    if(this.studentFilterObj.academicYearsID!= undefined && this.studentFilterObj.academicYearsID!= null){
      this.AYearsID= this.studentFilterObj.academicYearsID;
    }
    else{
      this.AYearsID= this.AcademicyearsId;
    }
    
    let subjectid, masterid;
    if(item.SubjectId!="00000000-0000-0000-0000-000000000000"){
      subjectid= item.SubjectId;
      masterid= "00000000-0000-0000-0000-000000000000";
    }
    else{
      subjectid= "00000000-0000-0000-0000-000000000000";
      masterid= item.AttendanceMasterID;
    }
    
    var prepareDataToSave = {
      BoardID: this.BoardID,
      InstituteID: this.InstituteID,
      MediumID: this.MediumID,
      ClassID: item.ClassID,
      SectionID: item.SectionID,
      AcademicYearID: this.AYearsID,
      fromDate: this.from_date,
      toDate: this.last_date,
      SubjectId: subjectid,
      // SubjectId: "00000000-0000-0000-0000-000000000000",
      // AttendanceMasterID: item.AttendanceMasterID
      AttendanceMasterID: masterid,
    }
    console.log(prepareDataToSave);
    localStorage.setItem('attendancesubject', JSON.stringify(prepareDataToSave));
    localStorage.setItem('attendancedates', JSON.stringify(this.dates));
    if( item.TotalStudent != 0) {
    this.router.navigate(['../subject-level-view'], {relativeTo: this.route});
    } else{
     this.toastr.error("There are no students in this subject.")
    }
  }

  getAcademicYears() {
    const getAcademicYearSuccess = (academicYear) => {
      this.academicList = academicYear.filter(x => x.AcademicStatus === 1);
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

  getSectionByClassID(ClassID, indx) {
    this.studentFilterObj['StudentID'] = null;
    this.studentFilterObj['EA_SectionID']=  null;
    this.sectionList = [];
    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section;
      }, error => {
        this.sectionList = [];
      }
    )
  }

  fitersubmit(){
    if((this.studentFilterObj.ClassID!= undefined && this.studentFilterObj.ClassID!= null) ){
        this.submittedfilter= true;
      }
      else{
        this.submittedfilter= false;
      }
  }
  validclass(){
    if((this.studentFilterObj.ClassID!= undefined && this.studentFilterObj.ClassID!= null) ){
      this.submittedfilter= true;
    }
    else{
      this.submittedfilter= false;
    }
  }
  validDate(){
     var compareDayfrom= new Date(this.attendancefilterForm.value.FromDate);
      var compareDayTo= new Date(this.attendancefilterForm.value.ToDate);
      console.log(compareDayfrom, compareDayTo);
      setTimeout(() => {
        console.log(compareDayfrom, compareDayTo);
        this.submittedfilter= true;
      }, 3000);
  }
  get f() { return this.attendancefilterForm.controls; }
  onSubmit() {
    
    // this.submitted = true;
    if(this.attendancefilterForm.value.ToDate==null){
      this.attendancefilterForm.value.ToDate= "";
    }
    console.log(this.attendancefilterForm.value);
    if (this.attendancefilterForm.invalid) {
      this.addreportlistnew();
      return;
    } else {
     
      
      // this.addStudent(this.attendancefilterForm.value);
      
      if(this.attendancefilterForm.value.FromDate!=""){
        var newday = new Date(this.attendancefilterForm.value.FromDate); 
        var date = newday.getDate();
        var month = newday.getMonth(); 
        var year = newday.getFullYear();
        var time = newday.getHours() + ":" + newday.getMinutes() + ":" + newday.getSeconds();
        var dateStr = date + "-" + this.month_names[month] + "-" + year + " "+ time;
        this.from_date= dateStr;
      }
      if(this.attendancefilterForm.value.ToDate!=""){
        var newdayt = new Date(this.attendancefilterForm.value.ToDate); 
        var datet = newdayt.getDate();
        var montht = newdayt.getMonth(); 
        var yeart = newdayt.getFullYear();
        var timet = newdayt.getHours() + ":" + newday.getMinutes() + ":" + newday.getSeconds();
        var dateStrt = datet + "-" + this.month_names[montht] + "-" + yeart + " "+ timet;
        this.last_date= dateStrt;
      }
      if(this.attendancefilterForm.value.ToDate!="" && this.attendancefilterForm.value.FromDate!=""){
        var date1= this.attendancefilterForm.value.FromDate;
        var date2= this.attendancefilterForm.value.ToDate;
        var Difference_In_Time = date2.getTime() - date1.getTime(); 
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        
        let arr = [];
        let newarr = [];
        this.numberofdays= Difference_In_Days + 1;
        for(let i=0;i<this.numberofdays; i++)
        {
          var newday = new Date(this.attendancefilterForm.value.FromDate); 
          newday.setDate(this.attendancefilterForm.value.FromDate.getDate() + i);
          arr.push(newday);
        }
        for(let i=0;i<arr.length; i++){
          var newday = new Date(arr[i]); 
          var date = newday.getDate();
          var month = newday.getMonth(); 
          var year = newday.getFullYear();
          var time = newday.getHours() + ":" + newday.getMinutes() + ":" + newday.getSeconds();
          // var dateStr = date + "-" + this.month_names[month] + "-" + year + " "+ time;
          var dateStr = date + "-" + this.month_names[month];
          newarr.push(dateStr);
        }
        this.dates= newarr;
        console.log(Difference_In_Days, this.dates);
      }
      this.addreportlistnew();
    }
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
  
  addreportlistnew(){
    this.className='';
    this.nodataavailble= false;
    if(this.studentFilterObj.academicYearsID!= undefined && this.studentFilterObj.academicYearsID!= null){
      this.AYearsID= this.studentFilterObj.academicYearsID;
    }
    else{
      this.AYearsID= "30A45000-C363-46A7-9EDF-CD8237D39EFF";
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

    let preprod = {
      "BoardID": this.BoardID,
      "MediumID": this.MediumID,
      "InstituteID": this.InstituteID,
      "ClassID": this.AClassID,
      "SectionID": this.ASectionID,
      "AcademicYearID": this.AcademicyearsId,
      "fromDate": this.from_date,
      "toDate": this.last_date,
      }
    this.shareService.getreportlistNewfirst(preprod).subscribe(res=>{
      console.log(res);

      
          this.report_list= res['data'];  
          
          let arr = [];
          let adhocarr =[];
          
          //----------------new Array-----------
            for (var i = 0, n = this.report_list.length; i < n; ++i){
              let subjectData = this.report_list[i]['lstAttandanceSubjectData'];
              // if(subjectData.length==0){
              //   let element = [];
              //   element['rowSpan'] =  1; 
              //   element['ClassID'] = this.report_list[i]['ClassID'];
              //   element['ClassName'] = this.report_list[i]['ClassName'];
              //   element['ClassTeacherName'] = this.report_list[i]['ClassTeacherName'];
              //   element['SectionID'] = this.report_list[i]['SectionID'];
              //   element['SectionName'] = this.report_list[i]['SectionName'];
              //   element['SectionStatus'] = this.report_list[i]['SectionStatus'];

              //   element['SubjectName'] = '-';
              //   element['TotalStudent'] = '-';
              //   element['lstAttandanceSubjectData']=0;

              //   arr.push(element); 
              // }
              if(subjectData && subjectData!=[]){
                subjectData.forEach((element, indx) => {
                  if(indx ==0){
                      element['rowSpan'] =  (this.report_list[i]['lstAttandanceSubjectData'] && this.report_list[i]['lstAttandanceSubjectData'].length); 

                    if(this.report_list[i]['lstAttandanceSubjectData_adhoc'].length > 0){
                      element['rowSpanad'] =  (this.report_list[i]['lstAttandanceSubjectData'] && this.report_list[i]['lstAttandanceSubjectData'].length) + this.report_list[i]['lstAttandanceSubjectData_adhoc'].length + 1; 
                      console.log(element['rowSpanad']);  
                    }
                    else{
                      element['rowSpanad'] =  (this.report_list[i]['lstAttandanceSubjectData'] && this.report_list[i]['lstAttandanceSubjectData'].length); 
                    }
                    
                    element['ClassName'] = this.report_list[i]['ClassName'];
                    element['ClassTeacherName'] = this.report_list[i]['ClassTeacherName'];
                    element['SectionID'] = this.report_list[i]['SectionID'];
                    element['SectionName'] = this.report_list[i]['SectionName'];
                    element['ClassID'] = this.report_list[i]['ClassID'];
                    element['SectionStatus'] = this.report_list[i]['SectionStatus'];
                    } 
                    element['SectionID'] = this.report_list[i]['SectionID'];
                    element['ClassID'] = this.report_list[i]['ClassID'];
                    arr.push(element); 
                  // this.allconversionmatrix= this.allconversionmatrix.concat(element); 
                });
              }

              
            // ----------Adhoc Arrray
              let adhocData = this.report_list[i]['lstAttandanceSubjectData_adhoc'];
              // if(adhocData.length==0){
              //   let element = [];
              //   element['ClassID'] = this.report_list[i]['ClassID'];
              //   element['ClassName'] = this.report_list[i]['ClassName'];
              //   element['ClassTeacherName'] = this.report_list[i]['ClassTeacherName'];
              //   element['SectionID'] = this.report_list[i]['SectionID'];
              //   element['SectionName'] = this.report_list[i]['SectionName'];
              //   element['SectionName'] = this.report_list[i]['SectionName'];
              //   element['SectionStatus'] = this.report_list[i]['SectionStatus'];

              //   element['SubjectName'] = '-';
              //   element['TotalStudent'] = '-';
              //   element['lstAttandanceSubjectData_adhoc']=0;
              //   arr.push(element); 
              // }  
              if(adhocData && adhocData!=[] ){
                adhocData.forEach((element, indx) => {
                  if(indx ==0){
                    // element['rowSpan'] =  (this.report_list[i]['lstAttandanceSubjectData_adhoc'] && this.report_list[i]['lstAttandanceSubjectData_adhoc'].length); 
                    element['ClassName'] = this.report_list[i]['ClassName'];
                    element['ClassTeacherName'] = this.report_list[i]['ClassTeacherName'];
                    element['SectionID'] = this.report_list[i]['SectionID'];
                    element['SectionName'] = this.report_list[i]['SectionName'];
                    element['ClassID'] = this.report_list[i]['ClassID'];
                    element['SectionStatus'] = this.report_list[i]['SectionStatus'];
                    element['adhocrow']= true;
                    if(subjectData.length==0){
                      element['rowSpanad']= (this.report_list[i]['lstAttandanceSubjectData_adhoc'] && this.report_list[i]['lstAttandanceSubjectData_adhoc'].length);
                    }
                    else{
                      element['rowSpanad']= 0;
                    }
                    // element['SessionName'] = this.report_list[i]['SessionName'];
                    } 
                    element['SectionID'] = this.report_list[i]['SectionID'];
                    element['ClassID'] = this.report_list[i]['ClassID'];
                    arr.push(element); 
                });
              }
              //----------Adhoc Arrray
            }
          
          //----------------new Array--------------

          for (var i = 0, m = arr.length; i < m; ++i){
            arr[i]['lstClassReportInfoMember'].reverse();
          }
          this.dates.reverse();
          console.log(arr);
          this.finalreport_list=arr;
          
          // this.Adhoc_list= adhocarr;
          // if(res['success']){
          //   this.toastr.success(res['message']);  
          //   this.addrolllist(); 
          // }
          // else{
          //  this.toastr.error(res['message']);
          // }
          if((this.studentFilterObj.ClassID!= undefined || this.studentFilterObj.ClassID!= null) && this.studentFilterObj.ClassID!="00000000-0000-0000-0000-000000000000"){
            console.log(this.finalreport_list[0]);
            if(this.finalreport_list.length!=0){
              this.className= this.finalreport_list[0]['ClassName'];
            }
          }

          if(this.finalreport_list.length==0){
            this.nodataavailble= true;
          }
    });
    
  }


  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  
  }
}
