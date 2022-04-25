import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx'; 
@Component({
  selector: 'app-student-level-view',
  templateUrl: './student-level-view.component.html',
  styleUrls: ['./student-level-view.component.scss']
})
export class StudentLevelViewComponent implements OnInit {

  studentdetails: any;
  studentlevellist: any;
  dates: any;
  studentname: any;
  className: any;
  subjectName: any;
  nodataavailble: boolean= false;

  todayd: boolean= false;
  sevend: boolean= true;
  thirtyd: boolean= false;
  customd: boolean= false;
  BelowcustomShowLimit: any;

  numberofdays:any;
  currentdate: Date;
  month_names:any= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  from_date: any;
  last_date: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private shareService: SharedDataService,
    private toastr: ToastrService,) { }

  ngOnInit() {
    this.studentdetails = JSON.parse(localStorage.getItem('attendancestudent'));  
    this.dates = JSON.parse(localStorage.getItem('attendancedates'));  
    console.log(this.studentdetails);

    this.numberofdays= 7;
    this.currentdate = new Date();
    this.datearray();

    this.studentlistnew();
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
     XLSX.writeFile(wb, `Class ${this.className} ${this.studentname}.xlsx`);
 
    
  }
  studentlistnew(){
    this.nodataavailble= false;
    this.shareService.getreportlistNew(this.studentdetails).subscribe(res=>{
      console.log(res);

      if(res['success'] && res['data']!=''){

        let data= res['data'];
        let arr = [];
        
        //----------------new Array-----------
          for (var i = 0, n = data.length; i < n; ++i){
            let subjectData = data[i]['lstAttandanceSubjectData'];
            // if(subjectData.length==0){
            //   let element = [];
            //   element['rowSpan'] =  1; 
            //   element['ClassID'] = data[i]['ClassID'];
            //   element['ClassName'] = data[i]['ClassName'];
            //   element['ClassTeacherName'] = data[i]['ClassTeacherName'];
            //   element['SectionID'] = data[i]['SectionID'];
            //   element['SectionName'] = data[i]['SectionName'];
            //   element['SectionName'] = data[i]['SectionName'];
            //   element['SectionStatus'] = data[i]['SectionStatus'];

            //   element['SubjectName'] = '-';
            //   element['TotalStudent'] = '-';
            //   element['lstAttandanceSubjectData']=0;
            //   console.log(element['lstAttandanceSubjectData']);
            //   arr.push(element); 
            // }
            if(subjectData && subjectData!=[]){
              subjectData.forEach((element, indx) => {
                element['lstSubjectListReportInfoMember'].forEach((childelement, index) => {
                  if(index ==0 && indx==0){
                    if(data[i]['lstAttandanceSubjectData_adhoc'].length > 0){
                      childelement['rowSpan'] =  (data[i]['lstAttandanceSubjectData'] && data[i]['lstAttandanceSubjectData'].length) + data[i]['lstAttandanceSubjectData_adhoc'].length + 1; 
                    }
                    else{
                      childelement['rowSpan'] =  (data[i]['lstAttandanceSubjectData'] && data[i]['lstAttandanceSubjectData'].length); 
                    }
                  }
                  if(index ==0){
                    childelement['ClassName'] = data[i]['ClassName'];
                    childelement['ClassTeacherName'] = data[i]['ClassTeacherName'];
                    childelement['SectionID'] = data[i]['SectionID'];
                    childelement['SectionName'] = data[i]['SectionName'];
                    childelement['ClassID'] = data[i]['ClassID'];
                    childelement['SubjectName'] = element['SubjectName'];
                    childelement['SessionName'] = element['SessionName'];
                    console.log(childelement);
                    } 
                    arr.push(childelement); 
                });
              });
            }

            // ----------Adhoc Arrray
            let adhocData = data[i]['lstAttandanceSubjectData_adhoc'];
            // if(adhocData.length==0){
            //   let element = [];
            //   element['ClassID'] = data[i]['ClassID'];
            //   element['ClassName'] = data[i]['ClassName'];
            //   element['ClassTeacherName'] = data[i]['ClassTeacherName'];
            //   element['SectionID'] = data[i]['SectionID'];
            //   element['SectionName'] = data[i]['SectionName'];
            //   element['SectionName'] = data[i]['SectionName'];
            //   element['SectionStatus'] = data[i]['SectionStatus'];

            //   element['SubjectName'] = '-';
            //   element['TotalStudent'] = '-';
            //   element['lstAttandanceSubjectData_adhoc']=0;
            //   arr.push(element); 
            // }
            if(adhocData && adhocData!=[]){
              adhocData.forEach((element, indx) => {
                element['lstSubjectListReportInfoMember'].forEach((childelement, index) => {
                  if(index ==0 && indx==0){
                    childelement['adhocrow']= true;
                  }
                  if(index ==0){
                    childelement['ClassName'] = data[i]['ClassName'];
                    childelement['ClassTeacherName'] = data[i]['ClassTeacherName'];
                    childelement['SectionID'] = data[i]['SectionID'];
                    childelement['SectionName'] = data[i]['SectionName'];
                    childelement['ClassID'] = data[i]['ClassID'];
                    childelement['SubjectName'] = element['SubjectName'];
                    childelement['SessionName'] = element['SessionName'];
                    } 
                    
                    arr.push(childelement); 
                  });
              });
            }
            //----------Adhoc Arrray

          }
          for (var i = 0, m = arr.length; i < m; ++i){
            arr[i]['lstStudentReportInfoMember'].reverse();
          }
          this.dates.reverse();
          console.log(arr);
          this.studentlevellist= arr;

          this.studentname= this.studentlevellist[0]['StudentName'];
          this.className= this.studentlevellist[0]['ClassName'] + ' ' + this.studentlevellist[0]['SectionName'];
          this.subjectName= this.studentlevellist[0]['SubjectName'];
        //----------------new Array--------------

      }
      else if(res['data']==''){
        this.toastr.error(res['message']);
        this.studentlevellist= [];
        this.nodataavailble= true;
      }
    })
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
    this.studentlistnew();
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
    this.studentlistnew();
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
    this.studentlistnew();
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
    this.studentlistnew();
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
    this.studentdetails.fromDate= this.from_date;
    this.studentdetails.toDate= this.last_date;
    console.log(this.studentdetails);
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  
  }

}
