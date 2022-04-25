import { Component, OnInit, ɵConsole } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { exit } from 'process';

@Component({
  selector: 'app-imported-student-marks',
  templateUrl: './imported-student-marks.component.html',
  styleUrls: ['./imported-student-marks.component.scss']
})
export class ImportedStudentMarksComponent implements OnInit {
  selectedExamID: any = '';
  selectedExamMarks: number = 0;
  studentList: any = [];
  marksList: any = [];
  questionWiseMarksList: any[];
  selectedExam: any;
  myinterval: any;
  attandance: any = [
    'P', 'A'
  ]
  isFormValid: boolean;
  errorMsg = [];
  isFormValid1: boolean;
  LstStudentMarksMapping = [];

  constructor(private sharedService: SharedDataService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) {
    this.selectedExam = JSON.parse(localStorage.getItem('selectedAddMarks'));
    //  this.myinterval = setInterval(() => { this.saveMarks('auto'); }, 60000);
    // this.myinterval = setInterval(() => { this.saveMarks(); }, 1000);
  }

  ngOnInit() {
    this.route.params.subscribe(id => {
      this.selectedExamID = id.id;
      this.getStudentsMarksDetails(id.id);
    })
  }

  getStudentsMarksDetails(id) {
    this.sharedService.currentstudentArray.subscribe(res => {
      if (res.length > 0) {
        this.studentList = [];
        this.studentList = res;
        this.studentList.filter((item) => {
          item.IsAttempted = item.IsAttempted ? 'P' : 'A';
        });

        let allQuestionAndMarks = [];
        allQuestionAndMarks = [...new Array([].concat(...this.studentList.map((o) => o.LstQuestionMarks)))];
        var resArr = [];
        allQuestionAndMarks[0].filter(function (item) {
          var i = resArr.findIndex(x => x.PaperQuestionId == item['PaperQuestionId']);

          if (i <= -1) {
            resArr.push(
              {
                PaperQuestionId: item['PaperQuestionId'],
                marks: item['Marks'],
                QueNumber: item['QueNumber'],
                QueIndex: item['QueIndex']
              });
          }
        });

        this.questionWiseMarksList = [];

        resArr.forEach(element => {
          let tabIndex = 0;
          let marksobj = {};
          marksobj = { ...element };
          marksobj['studentMarks'] = [];
          marksobj['QIndex'] = element['QueIndex'];
          allQuestionAndMarks[0].forEach((chEle, indx) => {
            let myobj = {};
            let isAttamptet = this.studentList.filter(item => item.EAExamAssignStudentMappingID == chEle.EAExamAssignStudentMappingID);

            if (chEle['PaperQuestionId'] == element['PaperQuestionId']) {
              myobj['EAExamAssignStudentMappingID'] = chEle.EAExamAssignStudentMappingID;
              myobj['ObtainedMark'] = isAttamptet[0].IsAttempted == "P" ? chEle.ObtainedMark : 0;
              myobj['isAttampted'] = isAttamptet[0].IsAttempted == "P" ? true : false;

              myobj['QueIndex'] = chEle.QueIndex;
              myobj['SubQuestionIndex'] = chEle.SubQuestionIndex;
              myobj['IsOr'] = chEle.IsOr;

              marksobj['studentMarks'].push(myobj);
              myobj = {};
            }
            if (indx == allQuestionAndMarks[0].length - 1) {
              this.questionWiseMarksList.push(marksobj);
              this.validateForm();
              this.countTotalMarks();
            }
          })
        });
      }

      setTimeout(() => {
        this.LstStudentMarksMapping = [];
        this.questionWiseMarksList.forEach(element => {
          element.studentMarks.forEach(chElm => {
            let a = {};
            a = {
              "EAExamAssignStudentMappingID": chElm.EAExamAssignStudentMappingID,
              "PaperQuestionId": element.PaperQuestionId,
              "ObtainedMark": chElm.ObtainedMark,
              "QueIndex": chElm.QueIndex,
              "SubQuestionIndex": chElm.SubQuestionIndex,
              "IsOr": chElm.IsOr,
            }
            this.LstStudentMarksMapping.push(a);
          });
        });
        let ExamMarks = this.selectedExam['TotalMarks'];
        this.studentList.forEach(element => {
          var TotalMarks = 0;
          var isvalidMark = true;

          let studentdata = this.LstStudentMarksMapping.filter((d: any) => d.EAExamAssignStudentMappingID === element.EAExamAssignStudentMappingID);

          var idx = this.studentList.indexOf(element);

          this.studentList[idx]['isvalidMark'] = isvalidMark;

          var distinctindex = studentdata.map(item => item.QueIndex).filter((value, index, self) => self.indexOf(value) === index);

          distinctindex.forEach(function (value_di) {
            var loop_internal = false;
            let s_d_i = studentdata.filter((d: any) => d.QueIndex == value_di);
            s_d_i.forEach(function (value) {
              if (!loop_internal && value.ObtainedMark > 0) {
                loop_internal = true;
              } else if (loop_internal && value.ObtainedMark > 0 && value.IsOr == true) {
                isvalidMark = false;
                exit;
              }
            });
          });

          if (isvalidMark) {
            studentdata.forEach(function (value) {
              TotalMarks = TotalMarks + value.ObtainedMark;
            });

            if (TotalMarks > ExamMarks) {
              isvalidMark = false;
            }
          }
          this.studentList[idx]['isvalidMark'] = isvalidMark;
        });
      }, 1000);
    });
    this.questionWiseMarksList = this.questionWiseMarksList.sort((a, b) => a.QIndex > b.QIndex ? 1 : a.QIndex < b.QIndex ? -1 : 0);
  }

  readyToPublish() {
    let prepare = {
      "EAExamAssignID": this.selectedExamID,
      "ResultStatus": 2
    }
    this.sharedService.changeStatusResult(prepare).subscribe(res => {
      if (res) {
        this.toastr.success('Exam is ready to publish.');
      }
    }, error => {

    })
  }

  saveMarks(type) {
    this.errorMsg = [];

    if (this.isFormValid) {
      let ExamMarks = this.selectedExam['TotalMarks'];

      this.LstStudentMarksMapping = [];
      this.questionWiseMarksList.forEach(element => {
        element.studentMarks.forEach(chElm => {
          let a = {};
          a = {
            "EAExamAssignStudentMappingID": chElm.EAExamAssignStudentMappingID,
            "PaperQuestionId": element.PaperQuestionId,
            "ObtainedMark": chElm.ObtainedMark
          }
          this.LstStudentMarksMapping.push(a);
        });
      });
      // this.studentList
      this.studentList.forEach(element => {
        var TotalMarks = 0;
        var studentdata = this.LstStudentMarksMapping.filter((d: any) => d.EAExamAssignStudentMappingID === element.EAExamAssignStudentMappingID);
        studentdata.forEach(function (value) {
          TotalMarks = TotalMarks + value.ObtainedMark;
        });

        var idx = this.studentList.indexOf(element);

        this.studentList[idx]['isvalidMark'] = true;

        if (TotalMarks > ExamMarks) {
          this.studentList[idx]['isvalidMark'] = false;
          this.errorMsg.push("Total Obtained marks should not be greater than toal marks of exam for any student.");
          this.isFormValid = false;
        }
      });

      if (this.isFormValid) {
        let prepareObj = {
          EAExamAssignID: this.selectedExamID,
          EAPaperTemplateID: this.selectedExam.EAPaperTemplateID,
          "IsMultipleMarkerInsert": true,
          "LstStudentMarksMapping": this.LstStudentMarksMapping
        }
        this.sharedService.addMarks(prepareObj).subscribe(res => {
          // this.toastr.success(res['message']);
          if (type == 'manual') {
            this.router.navigate(['../../dashboard'], { relativeTo: this.route });
          }
        }, err => {

        });
      }
    }
  }

  changeAppearStudent(student, indx) {
    setTimeout(() => {
      let prepareObj = {};
      prepareObj['IsAppear'] = student.IsAttempted == 'P' ? true : false;
      prepareObj['EAExamAssignStudentMappingID'] = student.EAExamAssignStudentMappingID;
      this.sharedService.changeAddMarkStatus(prepareObj).subscribe(res => {
        this.studentList[indx]['IsAttempted'] = student.IsAttempted;
        //  start dummy code
        // this.studentList.filter((item)=>{
        //   item.IsAttempted = item.IsAttempted ? 'P' : 'A'
        // });
        let allQuestionAndMarks = [];
        allQuestionAndMarks = [...new Array([].concat(...this.studentList.map((o) => o.LstQuestionMarks)))];
        var resArr = [];
        allQuestionAndMarks[0].filter(function (item) {
          var i = resArr.findIndex(x => x.PaperQuestionId == item['PaperQuestionId']);

          if (i <= -1) {
            resArr.push({ PaperQuestionId: item['PaperQuestionId'], marks: item['Marks'], QueNumber: item['QueNumber'] });
          }
        });
        this.questionWiseMarksList = [];
        resArr.forEach(element => {
          let tabIndex = 0;
          let marksobj = {};
          marksobj = { ...element };
          marksobj['studentMarks'] = [];
          allQuestionAndMarks[0].forEach((chEle, indx) => {
            let myobj = {};
            let isAttamptet = this.studentList.filter(item => item.EAExamAssignStudentMappingID == chEle.EAExamAssignStudentMappingID);
            // console.log(isAttamptet);
            if (chEle['PaperQuestionId'] == element['PaperQuestionId']) {
              myobj['EAExamAssignStudentMappingID'] = chEle.EAExamAssignStudentMappingID;
              myobj['ObtainedMark'] = isAttamptet[0].IsAttempted == "P" ? chEle.ObtainedMark : 0;
              myobj['isAttampted'] = isAttamptet[0].IsAttempted == "P" ? true : false;
              myobj['tabIndex'] = tabIndex = tabIndex + 1;
              marksobj['studentMarks'].push(myobj);
              myobj = {};
            }
            if (indx == allQuestionAndMarks[0].length - 1) {
              this.questionWiseMarksList.push(marksobj);
              this.validateForm();
              this.countTotalMarks();
            }
          })
        })
        // end dummy code

      }, error => {

      })
    }, 10);
  }

  validateForm() {
    this.countTotalMarks()
    this.isFormValid = true;
    this.isFormValid1 = true;
    this.errorMsg = [];
    let error_msg = [];
    let ExamMarks = this.selectedExam['TotalMarks'];

    this.LstStudentMarksMapping = [];
    this.questionWiseMarksList.forEach(element => {
      element.studentMarks.forEach(chElm => {
        let a = {};
        a = {
          "EAExamAssignStudentMappingID": chElm.EAExamAssignStudentMappingID,
          "PaperQuestionId": element.PaperQuestionId,
          "ObtainedMark": chElm.ObtainedMark,
          "QueIndex": chElm.QueIndex,
          "SubQuestionIndex": chElm.SubQuestionIndex,
          "IsOr": chElm.IsOr,
          "marks": element.marks
        }
        this.LstStudentMarksMapping.push(a);
      });
    });

    this.studentList.forEach(element => {
      var TotalMarks = 0;
      var isvalidMark = true;

      let studentdata = this.LstStudentMarksMapping.filter((d: any) => d.EAExamAssignStudentMappingID === element.EAExamAssignStudentMappingID);

      var idx = this.studentList.indexOf(element);

      this.studentList[idx]['isvalidMark'] = isvalidMark;

      var distinctindex = studentdata.map(item => item.QueIndex).filter((value, index, self) => self.indexOf(value) === index);

      distinctindex.forEach(function (value_di) {
        var loop_internal = false;
        let s_d_i = studentdata.filter((d: any) => d.QueIndex == value_di);
        s_d_i.forEach(function (value) {
          if (!loop_internal && value.ObtainedMark > 0) {
            loop_internal = true;
          } else if (loop_internal && value.ObtainedMark > 0 && value.IsOr == true) {
            isvalidMark = false;
            exit;
          }

          if (value.ObtainedMark > 0 && value.ObtainedMark > value.marks) {
            error_msg.push(`${element.StudentName} obtain ${value.ObtainedMark} marks while question (Q ${value.QueIndex}) max mark can be ${value.marks}`);
            isvalidMark = false;
            exit;
          }
        });
      });

      if (isvalidMark) {
        studentdata.forEach(function (value) {
          TotalMarks = TotalMarks + value.ObtainedMark;
        });

        if (TotalMarks > ExamMarks) {
          isvalidMark = false;
          this.isFormValid = false;
        }
      }
      else {
        this.isFormValid = false;
        if (error_msg.length == 0)
          error_msg.push("Marks obtained should not be greater than Marks.");
      }

      this.studentList[idx]['isvalidMark'] = isvalidMark;
    });

    setTimeout(() => {
      if (!this.isFormValid)
        this.errorMsg = error_msg;
    }, 20);
  }

  countTotalMarks() {
    this.studentList.filter(student => {
      student.TotalObtainedMark = 0;
      this.questionWiseMarksList.map(ele => {
        ele.studentMarks.map(item => {
          if (student.EAExamAssignStudentMappingID == item.EAExamAssignStudentMappingID && student.IsAttempted && item.ObtainedMark != null && item.ObtainedMark > 0) {
            student.TotalObtainedMark = +student.TotalObtainedMark + +item.ObtainedMark;
          }
        });
      });
    })
  }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    clearInterval(this.myinterval);
    //localStorage.removeItem('selectedAddMarks');
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }
    return true;
  }
}
