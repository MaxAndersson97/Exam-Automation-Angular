import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-subject-level-views',
  templateUrl: './subject-level-views.component.html',
  styleUrls: ['./subject-level-views.component.scss']
})
export class SubjectLevelViewsComponent implements OnInit {

  subjectdetails: any;
  subjectlevellist: any;
  dates: any;
  subjectName: any;
  className: any;
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
    this.subjectdetails = JSON.parse(localStorage.getItem('assignmentsubject'));  
    this.dates = JSON.parse(localStorage.getItem('assignmentdates'));  
    console.log(this.subjectdetails);


    this.numberofdays= 7;
    this.currentdate = new Date();
    this.datearray();

    this.subjectlistnew();
  }
  getstudentlevel(item){
    console.log(item);
    var prepareDataToSave = {
      BoardID: this.subjectdetails.BoardID,
      InstituteID: this.subjectdetails.InstituteID,
      MediumID: this.subjectdetails.MediumID,
      ClassID: this.subjectdetails.ClassID,
      SectionID: this.subjectdetails.SectionID,
      AcademicYearID: this.subjectdetails.AcademicYearID,
      fromDate: this.subjectdetails.fromDate,
      toDate: this.subjectdetails.toDate,
      SubjectId: "",
      StudentID: item.StudentID,
      HomeworkStatus: this.subjectdetails.HomeworkStatus,
    }
    localStorage.setItem('assignmentstudent', JSON.stringify(prepareDataToSave));
    localStorage.setItem('assignmentdates', JSON.stringify(this.dates));
    this.router.navigate(['../student-level-views'], {relativeTo: this.route});
  }

  subjectlistnew(){
    this.subjectName= '';
    this.className= '';
    this.nodataavailble= false;
    this.shareService.getassignmentreportlist(this.subjectdetails).subscribe(res=>{
      console.log(res);
      if(res['success'] && res['data']!=''){
        let data= res['data'];
        let arr = [];
        
        //----------------new Array-----------
          for (var i = 0, n = data.length; i < n; ++i){
            let subjectData = data[i]['lsthomeworkInfoReport_Subject'];
            if(subjectData && subjectData!=[]){
              subjectData.forEach((element, indx) => {
                element['lstHomeworkInfoReport_Student'].forEach((childelement, index) => {
                  if(index ==0){
                    childelement['rowSpan'] =  element['lstHomeworkInfoReport_Student'].length; 
                    childelement['ClassName'] = data[i]['ClassName'];
                    childelement['SectionID'] = data[i]['SectionID'];
                    childelement['SectionName'] = data[i]['SectionName'];
                    childelement['ClassID'] = data[i]['ClassID'];
                    childelement['SubjectName'] = element.SubjectName;
                    } 
                    arr.push(childelement); 
                });
              });
            }

            let adhocData = data[i]['lsthomeworkInfoReport_AdhocSubject'];
          if(adhocData && adhocData!=[]){
            adhocData.forEach((element, indx) => {
              element['lstHomeworkInfoReport_Student'].forEach((childelement, index) => {
                if(index ==0){
                  childelement['ClassName'] = data[i]['ClassName'];
                  childelement['ClassTeacherName'] = data[i]['ClassTeacherName'];
                  childelement['SectionID'] = data[i]['SectionID'];
                  childelement['SectionName'] = data[i]['SectionName'];
                  childelement['ClassID'] = data[i]['ClassID'];
                  childelement['SectionStatus'] = data[i]['SectionStatus'];
                  childelement['SubjectName'] = element.SubjectName;
                  childelement['SubjectTeacherName'] = element.SubjectTeacherName;
                  childelement['adhocrow']= true;
                  if(subjectData.length==0){
                    childelement['rowSpan']= (adhocData && adhocData.length);
                  }
                  else{
                    childelement['rowSpan']= 0;
                  }
                  } 
                  arr.push(childelement); 
              });
            });
          }
          }

          for (var i = 0, m = arr.length; i < m; ++i){
            arr[i]['lstHomeworkInfoReport_Day'].reverse();
          }
          this.dates.reverse();
          console.log(arr);
          this.subjectlevellist= arr;

          this.subjectName= this.subjectlevellist[0]['SubjectName'];
          this.className= this.subjectlevellist[0]['ClassName'] + ' ' + this.subjectlevellist[0]['SectionName'];
        //----------------new Array-------------
        }
        else if(res['data']==''){
          this.toastr.error(res['message']);
          this.subjectlevellist= [];
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
    this.subjectlistnew();
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
    this.subjectlistnew();
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
    this.subjectlistnew();
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
    this.subjectlistnew();
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
    this.subjectdetails.fromDate= this.from_date;
    this.subjectdetails.toDate= this.last_date;
    console.log(this.subjectdetails);
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  
  }
}
