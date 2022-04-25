import { Component, OnInit } from '@angular/core';
import { NgxGaugeModule } from 'ngx-gauge';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  prgaugeType = "";
  prgaugeValue  ;
  prgaugeLabel = "";
  prgaugeAppendText = "";
  prgaugeForegroundColor ="";
  prbackgdcolor= "";
  thgaugeType = "";
  thgaugeValue  ;
  thgaugeLabel = "";
  thgaugeAppendText = "";
  thgaugeForegroundColor = "";
  thbackgdcolor= "";
  lagaugeType = "";
  lagaugeValue  ;
  lagaugeLabel = "";
  lagaugeAppendText = "";
  lagaugeForegroundColor = "";
  labackgdcolor= "";

  cognitivegaugeType = "";
  cognitivegaugeValue  ;
  cognitivegaugeForm ;
  cognitivegaugeAppendText = "";
  cognitivegaugeForegroundColor = "";
  cognitivebackgdcolor= "";
  coursegaugeType = "";
  coursegaugeValue  ;
  coursegaugeForm ;
  coursegaugeAppendText = "";
  coursegaugeForegroundColor = "";
  coursebackgdcolor= "";

  thirddivgaugeType="";
  thirddivgaugeValue;
  thirddivgaugeLabel="";
  thirddivgaugeAppendthick;
  thirddivgaugeForegroundColor="";
  thirddivbackgdcolor="";
  onedivgaugeType="";
  onedivgaugeValue;
  onedivgaugethick;
  onedivgaugeAppendText="";
  onedivgaugeForegroundColor="";
  onedivbackgdcolor="";
  twodivgaugeType="";
  twodivgaugeValue;
  twodivgaugeLabel="";
  twodivgaugeAppendthick;
  twodivgaugeForegroundColor="";
  twodivbackgdcolor="";
  fourdivgaugeType="";
  fourdivgaugeValue;
  fourdivgaugeLabel="";
  fourdivgaugeAppendText;
  fourdivgaugeForegroundColor="";
  fourdivbackgdcolor="";

  coursecovObj: any;
  AcademicyearsId: any;

  constructor(private sharedService: SharedDataService,private toastr: ToastrService) { }

  ngOnInit() {
      this.getpractical();
      this.gettheroritical();
      this.getlanguage();

      this.getcognitiveLevel();
      this.getcourseRep();

      this.onediv();
      this.twodiv();
      this.threediv();
      this.fourdiv();    

      this.getDashboardData();

      
      
      // let jsonDahdata= {
      //   "main_page": {
      //     "assessment_score": {
      //       "overall": {
      //         "current_score": "66.69",
      //         "previous_score": "66.69",
      //         "academic_year": "2020/2021",
      //         "previous_academic_year": "2019/2020"
      //       },
      //       "male": {
      //         "current_score": "65.41",
      //         "previous_score": "65.41",
      //         "previous_academic_year": "2019/2020"
      //       },
      //       "female": {
      //         "current_score": "68.27",
      //         "previous_score": "68.27",
      //         "previous_academic_year": "2019/2020"
      //       }
      //     },
      //     "course_coverage": {
      //       "average_score": "0",
      //       "this_year": [],
      //       "last_year": []
      //     },
      //     "assessment_quality": {
      //       "status": "Excellent",
      //       "difficulty_level_per": 53.84,
      //       "cognitive_level": {
      //         "hots": 86,
      //         "lots": 14
      //       },
      //       "course_representation": {
      //         "status": "Balanced",
      //         "percentage": 70.45
      //       }
      //     },
      //     "average_exam_attendance": {
      //       "avg_attendance": 0,
      //       "current_year": [],
      //       "previous_year": []
      //     },
      //     "overall_results": {
      //       "total_passed": 22,
      //       "total_failed": 0,
      //       "first_division": 100,
      //       "second_division": 0,
      //       "third_division": 0,
      //       "failed": 0
      //     },
      //     "exam_taken_obj": {
      //       "exam_taken": 60,
      //       "result_shared": 0,
      //       "pending": 100,
      //       "previous_exam_taken": 60,
      //       "previous_academic_year": "2019/2020"
      //     },
      //     "total_time_saved": {
      //       "total_time_saved_in_hours": 0,
      //       "exam_creation_per": 0,
      //       "marks_sharing_per": 0,
      //       "previous_time_saved_in_hours": 0,
      //       "previous_academic_year": "2019/2020"
      //     },
      //     "low_course_completion": [
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 94.12,
      //         "ytd_assessment": 10,
      //         "result": 69.91
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 93.75,
      //         "ytd_assessment": 10,
      //         "result": 69.11
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 80.65,
      //         "ytd_assessment": 10,
      //         "result": 68.09
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 100,
      //         "ytd_assessment": 10,
      //         "result": 63.95
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 83.33,
      //         "ytd_assessment": 10,
      //         "result": 65.09
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 100,
      //         "ytd_assessment": 10,
      //         "result": 64.02
      //       }
      //     ],
      //     "exam_results_pending": [
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-01",
      //         "pending_for": -258
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-05",
      //         "pending_for": -262
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-05",
      //         "pending_for": -262
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-14",
      //         "pending_for": -271
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-14",
      //         "pending_for": -271
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-06",
      //         "pending_for": -263
      //       }
      //     ],
      //     "no_assessment_for_long": [
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "SubjectTeacher": "Teacher Science",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-01",
      //         "pending_for": -258
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "SubjectTeacher": "Teacher Maths",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-05",
      //         "pending_for": -262
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "SubjectTeacher": "Teacher SocialScience",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-05",
      //         "pending_for": -262
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "SubjectTeacher": "Teacher Science",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-14",
      //         "pending_for": -271
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "SubjectTeacher": "Teacher SocialScience",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-14",
      //         "pending_for": -271
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "SubjectTeacher": "Teacher Maths",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-06",
      //         "pending_for": -263
      //       }
      //     ],
      //     "top_performing_students": [
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "StudentName": "Ajay Sharma",
      //         "Student_ProfileLink": "",
      //         "total_per": 72.12
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "StudentName": "Akhil Sharma",
      //         "Student_ProfileLink": "",
      //         "total_per": 70.55
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Akhil Sharma",
      //         "Student_ProfileLink": "",
      //         "total_per": 70.55
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Abhishek Tyagi",
      //         "Student_ProfileLink": "",
      //         "total_per": 89.94
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Akansha Kapoor",
      //         "Student_ProfileLink": "",
      //         "total_per": 51.27
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Deepak Sharma",
      //         "Student_ProfileLink": "",
      //         "total_per": 54.82
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Akhilesh Pandey",
      //         "Student_ProfileLink": "",
      //         "total_per": 49.27
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Ashutosh Sahoo",
      //         "Student_ProfileLink": "",
      //         "total_per": 55.3
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Aliya Khan",
      //         "Student_ProfileLink": "",
      //         "total_per": 47.09
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Babli Jagdale",
      //         "Student_ProfileLink": "",
      //         "total_per": 75.89
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Anurag Roy",
      //         "Student_ProfileLink": "",
      //         "total_per": 77.1
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Rajkumari Ahirwa",
      //         "Student_ProfileLink": "",
      //         "total_per": 53.36
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Ayush Verma",
      //         "Student_ProfileLink": "",
      //         "total_per": 55.12
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "StudentName": "Aman Chouhan",
      //         "Student_ProfileLink": "",
      //         "total_per": 48.48
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Aman Chouhan",
      //         "Student_ProfileLink": "",
      //         "total_per": 48.48
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Sonu Yadav",
      //         "Student_ProfileLink": "",
      //         "total_per": 55
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "StudentName": "Deepanshi Satija",
      //         "Student_ProfileLink": "",
      //         "total_per": 94.67
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Deepali Rana",
      //         "Student_ProfileLink": "",
      //         "total_per": 75.77
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Trapti Akhtar",
      //         "Student_ProfileLink": "",
      //         "total_per": 93.34
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Aarti Shah",
      //         "Student_ProfileLink": "",
      //         "total_per": 50.91
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Sonam Gupta",
      //         "Student_ProfileLink": "",
      //         "total_per": 92.85
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Amit Verma",
      //         "Student_ProfileLink": "",
      //         "total_per": 71.03
      //       }
      //     ],
      //     "top_performing_faculties": [
      //       {
      //         "class_sec_sub": [
      //           {
      //             "ClassName": "9TH",
      //             "SectionName": "A",
      //             "SubjectName": "SCIENCE"
      //           },
      //           {
      //             "ClassName": "10TH",
      //             "SectionName": "A",
      //             "SubjectName": "SCIENCE"
      //           }
      //         ],
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "Total_per": 66.93
      //       },
      //       {
      //         "class_sec_sub": [
      //           {
      //             "ClassName": "10TH",
      //             "SectionName": "A",
      //             "SubjectName": "MATHEMATICS"
      //           },
      //           {
      //             "ClassName": "9TH",
      //             "SectionName": "A",
      //             "SubjectName": "MATHEMATICS"
      //           }
      //         ],
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "Total_per": 66.56
      //       },
      //       {
      //         "class_sec_sub": [
      //           {
      //             "ClassName": "9TH",
      //             "SectionName": "A",
      //             "SubjectName": "SOCIAL STUDIES"
      //           },
      //           {
      //             "ClassName": "10TH",
      //             "SectionName": "A",
      //             "SubjectName": "SOCIAL STUDIES"
      //           }
      //         ],
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "Total_per": 66.59
      //       }
      //     ],
      //     "class_wise_performance": [
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "course_completed": 11.81,
      //         "overall_result": 69.04,
      //         "best_subject": "SCIENCE",
      //         "best_subject_teacher": "Teacher Science",
      //         "best_subject_teacher_profile": "",
      //         "poor_subject": "SOCIAL STUDIES",
      //         "poor_subject_teacher": "Teacher SocialScience",
      //         "poor_subject_teacher_profile": ""
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "course_completed": 40.65,
      //         "overall_result": 64.35,
      //         "best_subject": "SOCIAL STUDIES",
      //         "best_subject_teacher": "Teacher SocialScience",
      //         "best_subject_teacher_profile": "",
      //         "poor_subject": "SCIENCE",
      //         "poor_subject_teacher": "Teacher Science",
      //         "poor_subject_teacher_profile": ""
      //       }
      //     ],
      //     "board_merit_prediction": [
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "StudentName": "Ajay Sharma",
      //         "Student_ProfileLink": "",
      //         "total_per": 72.12,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "StudentName": "Akhil Sharma",
      //         "Student_ProfileLink": "",
      //         "total_per": 70.55,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Akhil Sharma",
      //         "Student_ProfileLink": "",
      //         "total_per": 70.55,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Abhishek Tyagi",
      //         "Student_ProfileLink": "",
      //         "total_per": 89.94,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Akansha Kapoor",
      //         "Student_ProfileLink": "",
      //         "total_per": 51.27,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Deepak Sharma",
      //         "Student_ProfileLink": "",
      //         "total_per": 54.82,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Akhilesh Pandey",
      //         "Student_ProfileLink": "",
      //         "total_per": 49.27,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Ashutosh Sahoo",
      //         "Student_ProfileLink": "",
      //         "total_per": 55.3,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Aliya Khan",
      //         "Student_ProfileLink": "",
      //         "total_per": 47.09,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Babli Jagdale",
      //         "Student_ProfileLink": "",
      //         "total_per": 75.89,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Anurag Roy",
      //         "Student_ProfileLink": "",
      //         "total_per": 77.1,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Rajkumari Ahirwa",
      //         "Student_ProfileLink": "",
      //         "total_per": 53.36,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Ayush Verma",
      //         "Student_ProfileLink": "",
      //         "total_per": 55.12,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "StudentName": "Aman Chouhan",
      //         "Student_ProfileLink": "",
      //         "total_per": 48.48,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Aman Chouhan",
      //         "Student_ProfileLink": "",
      //         "total_per": 48.48,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Sonu Yadav",
      //         "Student_ProfileLink": "",
      //         "total_per": 55,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "StudentName": "Deepanshi Satija",
      //         "Student_ProfileLink": "",
      //         "total_per": 94.67,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Deepali Rana",
      //         "Student_ProfileLink": "",
      //         "total_per": 75.77,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Trapti Akhtar",
      //         "Student_ProfileLink": "",
      //         "total_per": 93.34,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Aarti Shah",
      //         "Student_ProfileLink": "",
      //         "total_per": 50.91,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "StudentName": "Sonam Gupta",
      //         "Student_ProfileLink": "",
      //         "total_per": 92.85,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "StudentName": "Amit Verma",
      //         "Student_ProfileLink": "",
      //         "total_per": 71.03,
      //         "gap_to_bridge": "In Merit",
      //         "comments": "Perfect Performance"
      //       }
      //     ],
      //     "subject_wise_performance": {
      //       "practical": {
      //         "score": "69.11",
      //         "status": "Good",
      //         "previous_year_avg_score": "69.11",
      //         "previous_year": "2019/2020"
      //       },
      //       "theoretical": {
      //         "score": "",
      //         "status": "",
      //         "previous_year_avg_score": "",
      //         "previous_year": "2019/2020"
      //       },
      //       "language": {
      //         "score": "",
      //         "status": "",
      //         "previous_year_avg_score": "",
      //         "previous_year": "2019/2020"
      //       }
      //     }
      //   },
      //   "top_performing_students": [
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "MATHEMATICS",
      //       "BestSubjectTeacher": "Teacher Maths",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Ajay Sharma",
      //       "ProfileImageLink": "",
      //       "total_per": 72.12
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "MATHEMATICS",
      //       "BestSubjectTeacher": "Teacher Maths",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Akhil Sharma",
      //       "ProfileImageLink": "",
      //       "total_per": 70.55
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Akhil Sharma",
      //       "ProfileImageLink": "",
      //       "total_per": 70.55
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Abhishek Tyagi",
      //       "ProfileImageLink": "",
      //       "total_per": 89.94
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "MATHEMATICS",
      //       "PoorSubjectTeacher": "Teacher Maths",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Akansha Kapoor",
      //       "ProfileImageLink": "",
      //       "total_per": 51.27
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Deepak Sharma",
      //       "ProfileImageLink": "",
      //       "total_per": 54.82
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "MATHEMATICS",
      //       "PoorSubjectTeacher": "Teacher Maths",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Akhilesh Pandey",
      //       "ProfileImageLink": "",
      //       "total_per": 49.27
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Ashutosh Sahoo",
      //       "ProfileImageLink": "",
      //       "total_per": 55.3
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Aliya Khan",
      //       "ProfileImageLink": "",
      //       "total_per": 47.09
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Babli Jagdale",
      //       "ProfileImageLink": "",
      //       "total_per": 75.89
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Anurag Roy",
      //       "ProfileImageLink": "",
      //       "total_per": 77.1
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Rajkumari Ahirwa",
      //       "ProfileImageLink": "",
      //       "total_per": 53.36
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Ayush Verma",
      //       "ProfileImageLink": "",
      //       "total_per": 55.12
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "MATHEMATICS",
      //       "BestSubjectTeacher": "Teacher Maths",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Aman Chouhan",
      //       "ProfileImageLink": "",
      //       "total_per": 48.48
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Aman Chouhan",
      //       "ProfileImageLink": "",
      //       "total_per": 48.48
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Sonu Yadav",
      //       "ProfileImageLink": "",
      //       "total_per": 55
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "MATHEMATICS",
      //       "BestSubjectTeacher": "Teacher Maths",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Deepanshi Satija",
      //       "ProfileImageLink": "",
      //       "total_per": 94.67
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Deepali Rana",
      //       "ProfileImageLink": "",
      //       "total_per": 75.77
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "MATHEMATICS",
      //       "PoorSubjectTeacher": "Teacher Maths",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Trapti Akhtar",
      //       "ProfileImageLink": "",
      //       "total_per": 93.34
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "MATHEMATICS",
      //       "PoorSubjectTeacher": "Teacher Maths",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Aarti Shah",
      //       "ProfileImageLink": "",
      //       "total_per": 50.91
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "BestSubjectTeacher": "Teacher Science",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SOCIAL STUDIES",
      //       "PoorSubjectTeacher": "Teacher SocialScience",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Sonam Gupta",
      //       "ProfileImageLink": "",
      //       "total_per": 92.85
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "BestSubjectTeacher": "Teacher SocialScience",
      //       "BestSubjectTeacherProfileImageLink": "",
      //       "PoorSubjectName": "SCIENCE",
      //       "PoorSubjectTeacher": "Teacher Science",
      //       "PoorSubjectTeacherProfileImageLink": "",
      //       "Name": "Amit Verma",
      //       "ProfileImageLink": "",
      //       "total_per": 71.03
      //     }
      //   ],
      //   "top_performing_faculties": [
      //     {
      //       "class_sec_sub": [
      //         {
      //           "ClassName": "9TH",
      //           "SectionName": "A",
      //           "SubjectName": "SCIENCE"
      //         },
      //         {
      //           "ClassName": "10TH",
      //           "SectionName": "A",
      //           "SubjectName": "SCIENCE"
      //         }
      //       ],
      //       "SubjectTeacher": "Teacher Science",
      //       "SubjectTeacherProfileImageLink": "",
      //       "result_percentage": 66.93,
      //       "course_completed": 96.88,
      //       "assessment_taken": 20,
      //       "avg_attendance": 100,
      //       "score": 6.4841784,
      //       "total_class": 2
      //     },
      //     {
      //       "class_sec_sub": [
      //         {
      //           "ClassName": "10TH",
      //           "SectionName": "A",
      //           "SubjectName": "MATHEMATICS"
      //         },
      //         {
      //           "ClassName": "9TH",
      //           "SectionName": "A",
      //           "SubjectName": "MATHEMATICS"
      //         }
      //       ],
      //       "SubjectTeacher": "Teacher Maths",
      //       "SubjectTeacherProfileImageLink": "",
      //       "result_percentage": 66.56,
      //       "course_completed": 96.77,
      //       "assessment_taken": 20,
      //       "avg_attendance": 100,
      //       "score": 6.441011199999999,
      //       "total_class": 2
      //     },
      //     {
      //       "class_sec_sub": [
      //         {
      //           "ClassName": "9TH",
      //           "SectionName": "A",
      //           "SubjectName": "SOCIAL STUDIES"
      //         },
      //         {
      //           "ClassName": "10TH",
      //           "SectionName": "A",
      //           "SubjectName": "SOCIAL STUDIES"
      //         }
      //       ],
      //       "SubjectTeacher": "Teacher SocialScience",
      //       "SubjectTeacherProfileImageLink": "",
      //       "result_percentage": 66.59,
      //       "course_completed": 81.82,
      //       "assessment_taken": 20,
      //       "avg_attendance": 100,
      //       "score": 5.448393799999999,
      //       "total_class": 2
      //     }
      //   ],
      //   "board_merit_prediction": [
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "MATHEMATICS",
      //       "Name": "Ajay Sharma",
      //       "ProfileImageLink": "",
      //       "total_score": 72.12,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "MATHEMATICS",
      //       "Name": "Akhil Sharma",
      //       "ProfileImageLink": "",
      //       "total_score": 70.55,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Akhil Sharma",
      //       "ProfileImageLink": "",
      //       "total_score": 70.55,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Abhishek Tyagi",
      //       "ProfileImageLink": "",
      //       "total_score": 89.94,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Akansha Kapoor",
      //       "ProfileImageLink": "",
      //       "total_score": 51.27,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Deepak Sharma",
      //       "ProfileImageLink": "",
      //       "total_score": 54.82,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Akhilesh Pandey",
      //       "ProfileImageLink": "",
      //       "total_score": 49.27,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Ashutosh Sahoo",
      //       "ProfileImageLink": "",
      //       "total_score": 55.3,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Aliya Khan",
      //       "ProfileImageLink": "",
      //       "total_score": 47.09,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Babli Jagdale",
      //       "ProfileImageLink": "",
      //       "total_score": 75.89,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Anurag Roy",
      //       "ProfileImageLink": "",
      //       "total_score": 77.1,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Rajkumari Ahirwa",
      //       "ProfileImageLink": "",
      //       "total_score": 53.36,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Ayush Verma",
      //       "ProfileImageLink": "",
      //       "total_score": 55.12,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "MATHEMATICS",
      //       "Name": "Aman Chouhan",
      //       "ProfileImageLink": "",
      //       "total_score": 48.48,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Aman Chouhan",
      //       "ProfileImageLink": "",
      //       "total_score": 48.48,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Sonu Yadav",
      //       "ProfileImageLink": "",
      //       "total_score": 55,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "MATHEMATICS",
      //       "Name": "Deepanshi Satija",
      //       "ProfileImageLink": "",
      //       "total_score": 94.67,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Deepali Rana",
      //       "ProfileImageLink": "",
      //       "total_score": 75.77,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Trapti Akhtar",
      //       "ProfileImageLink": "",
      //       "total_score": 93.34,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Aarti Shah",
      //       "ProfileImageLink": "",
      //       "total_score": 50.91,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SCIENCE",
      //       "Name": "Sonam Gupta",
      //       "ProfileImageLink": "",
      //       "total_score": 92.85,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "BestSubjectName": "SOCIAL STUDIES",
      //       "Name": "Amit Verma",
      //       "ProfileImageLink": "",
      //       "total_score": 71.03,
      //       "gap_to_bridge": "In Merit",
      //       "comments": "Perfect Performance"
      //     }
      //   ],
      //   "key_areas_to_focus": {
      //     "low_course_completion": [
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 94.12,
      //         "ytd_assessment": 10,
      //         "result": 69.91
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 93.75,
      //         "ytd_assessment": 10,
      //         "result": 69.11
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 80.65,
      //         "ytd_assessment": 10,
      //         "result": 68.09
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 100,
      //         "ytd_assessment": 10,
      //         "result": 63.95
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 83.33,
      //         "ytd_assessment": 10,
      //         "result": 65.09
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "ytd_course_com": 100,
      //         "ytd_assessment": 10,
      //         "result": 64.02
      //       }
      //     ],
      //     "exam_results_pending": [
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-01",
      //         "pending_for": -258
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-05",
      //         "pending_for": -262
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-05",
      //         "pending_for": -262
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "TeacherName": "Teacher Science",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-14",
      //         "pending_for": -271
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "TeacherName": "Teacher SocialScience",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-14",
      //         "pending_for": -271
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "TeacherName": "Teacher Maths",
      //         "Teacher_ProfileLink": "",
      //         "Exam_Date": "2021-04-06",
      //         "pending_for": -263
      //       }
      //     ],
      //     "no_assessment_for_long": [
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "SubjectTeacher": "Teacher Science",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-01",
      //         "pending_for": -258
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "SubjectTeacher": "Teacher Maths",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-05",
      //         "pending_for": -262
      //       },
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "SubjectTeacher": "Teacher SocialScience",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-05",
      //         "pending_for": -262
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SCIENCE",
      //         "SubjectTeacher": "Teacher Science",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-14",
      //         "pending_for": -271
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "SOCIAL STUDIES",
      //         "SubjectTeacher": "Teacher SocialScience",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-14",
      //         "pending_for": -271
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "SubjectName": "MATHEMATICS",
      //         "SubjectTeacher": "Teacher Maths",
      //         "SubjectTeacherProfileImageLink": "",
      //         "ExamDateTime": "2021-04-06",
      //         "pending_for": -263
      //       }
      //     ]
      //   },
      //   "class_wise_performance": {
      //     "male": {
      //       "current_score": "65.41",
      //       "previous_score": "65.41",
      //       "academic_year": "2020/2021",
      //       "previous_academic_year": "2019/2020"
      //     },
      //     "female": {
      //       "current_score": "68.27",
      //       "previous_score": "68.27",
      //       "academic_year": "2020/2021",
      //       "previous_academic_year": "2019/2020"
      //     },
      //     "academic_year": [
      //       {
      //         "ClassName": "10TH",
      //         "SectionName": "A",
      //         "course_completed": 11.81,
      //         "overall_result": 69.04,
      //         "total_students": 10,
      //         "ClassTeacher": "Teacher Maths",
      //         "ClassTeacherProfileImageLink": "",
      //         "assessment_taken": 30,
      //         "avg_attendance": 100,
      //         "best_subject": "SCIENCE",
      //         "poor_subject": "SOCIAL STUDIES",
      //         "assessment_taken_prev": 30,
      //         "avg_attendance_prev": 100,
      //         "overall_result_prev": 69.04
      //       },
      //       {
      //         "ClassName": "9TH",
      //         "SectionName": "A",
      //         "course_completed": 40.65,
      //         "overall_result": 64.35,
      //         "total_students": 10,
      //         "ClassTeacher": "Teacher Maths",
      //         "ClassTeacherProfileImageLink": "",
      //         "assessment_taken": 30,
      //         "avg_attendance": 100,
      //         "best_subject": "SOCIAL STUDIES",
      //         "poor_subject": "SCIENCE",
      //         "assessment_taken_prev": 30,
      //         "avg_attendance_prev": 100,
      //         "overall_result_prev": 64.35
      //       }
      //     ]
      //   },
      //   "result_overview": [
      //     {
      //       "ClassName": "10TH",
      //       "SectionName": "A",
      //       "ClassTeacher": "Teacher Maths",
      //       "First Division": 5,
      //       "Second Division": 5,
      //       "Third Division": 0,
      //       "Fail": 0,
      //       "result_remark": "All students passing all subjects",
      //       "First Division_prev": 5,
      //       "Second Division_prev": 5,
      //       "Third Division_prev": 0,
      //       "Fail_prev": 0
      //     },
      //     {
      //       "ClassName": "9TH",
      //       "SectionName": "A",
      //       "ClassTeacher": "Teacher Maths",
      //       "First Division": 5,
      //       "Second Division": 5,
      //       "Third Division": 0,
      //       "Fail": 0,
      //       "result_remark": "All students passing all subjects",
      //       "First Division_prev": 5,
      //       "Second Division_prev": 5,
      //       "Third Division_prev": 0,
      //       "Fail_prev": 0
      //     }
      //   ],
      //   "chapter_wise_and_student_wise_performance_details": {
      //     "01E5ACFD-0E91-422B-9B3A-345F48D26E91": {
      //       "5002CEA9-13D2-4E13-B8A3-61AFC3363A69": {
      //         "59247381-E7FE-42B9-838E-5AAA5EE59A88": {
      //           "chapter_wise_and_student_wise_performance_details": {
      //             "data": [
      //               {
      //                 "Name": "Anurag Roy",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 25,
      //                 "chapter 3": 94.44,
      //                 "chapter 4": 83.33,
      //                 "chapter 5": 80,
      //                 "chapter 6": 68.33,
      //                 "chapter 7": 100,
      //                 "chapter 8": 76.92,
      //                 "chapter 9": 100,
      //                 "chapter 10": 81.03,
      //                 "chapter 11": 66.67,
      //                 "chapter 12": 0,
      //                 "chapter 13": 69.44,
      //                 "chapter 14": 88.24,
      //                 "chapter 15": 82.81,
      //                 "overall_score": 77.64
      //               },
      //               {
      //                 "Name": "Ashutosh Sahoo",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 76.47,
      //                 "chapter 2": 100,
      //                 "chapter 3": 83.33,
      //                 "chapter 4": 50,
      //                 "chapter 5": 80,
      //                 "chapter 6": 58.33,
      //                 "chapter 7": 11.11,
      //                 "chapter 8": 61.54,
      //                 "chapter 9": 0,
      //                 "chapter 10": 55.38,
      //                 "chapter 11": 75,
      //                 "chapter 12": 50,
      //                 "chapter 13": 50.93,
      //                 "chapter 14": 35.29,
      //                 "chapter 15": 57.81,
      //                 "overall_score": 55.82
      //               },
      //               {
      //                 "Name": "Ayush Verma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 82.35,
      //                 "chapter 2": 66.67,
      //                 "chapter 3": 50,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 60,
      //                 "chapter 6": 68.33,
      //                 "chapter 7": 22.22,
      //                 "chapter 8": 53.85,
      //                 "chapter 9": 0,
      //                 "chapter 10": 53.85,
      //                 "chapter 11": 75,
      //                 "chapter 12": 50,
      //                 "chapter 13": 43.52,
      //                 "chapter 14": 70.59,
      //                 "chapter 15": 60.94,
      //                 "overall_score": 54.73
      //               },
      //               {
      //                 "Name": "Babli Jagdale",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 91.67,
      //                 "chapter 3": 83.33,
      //                 "chapter 4": 83.33,
      //                 "chapter 5": 100,
      //                 "chapter 6": 68.33,
      //                 "chapter 7": 88.89,
      //                 "chapter 8": 61.54,
      //                 "chapter 9": 100,
      //                 "chapter 10": 74.87,
      //                 "chapter 11": 66.67,
      //                 "chapter 12": 0,
      //                 "chapter 13": 75.93,
      //                 "chapter 14": 94.12,
      //                 "chapter 15": 68.75,
      //                 "overall_score": 76
      //               },
      //               {
      //                 "Name": "Deepak Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 52.94,
      //                 "chapter 2": 75,
      //                 "chapter 3": 16.67,
      //                 "chapter 4": 83.33,
      //                 "chapter 5": 100,
      //                 "chapter 6": 66.67,
      //                 "chapter 7": 22.22,
      //                 "chapter 8": 61.54,
      //                 "chapter 9": 0,
      //                 "chapter 10": 52.31,
      //                 "chapter 11": 83.33,
      //                 "chapter 12": 50,
      //                 "chapter 13": 44.44,
      //                 "chapter 14": 88.24,
      //                 "chapter 15": 65.62,
      //                 "overall_score": 54.36
      //               },
      //               {
      //                 "Name": "Deepali Rana",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 100,
      //                 "chapter 3": 94.44,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 100,
      //                 "chapter 6": 66.67,
      //                 "chapter 7": 88.89,
      //                 "chapter 8": 76.92,
      //                 "chapter 9": 100,
      //                 "chapter 10": 74.36,
      //                 "chapter 11": 58.33,
      //                 "chapter 12": 0,
      //                 "chapter 13": 69.44,
      //                 "chapter 14": 88.24,
      //                 "chapter 15": 81.25,
      //                 "overall_score": 76.18
      //               },
      //               {
      //                 "Name": "Deepanshi Satija",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 94.12,
      //                 "chapter 2": 83.33,
      //                 "chapter 3": 100,
      //                 "chapter 4": 83.33,
      //                 "chapter 5": 100,
      //                 "chapter 6": 100,
      //                 "chapter 7": 100,
      //                 "chapter 8": 100,
      //                 "chapter 9": 100,
      //                 "chapter 10": 94.36,
      //                 "chapter 11": 91.67,
      //                 "chapter 12": 100,
      //                 "chapter 13": 100,
      //                 "chapter 14": 94.12,
      //                 "chapter 15": 96.88,
      //                 "overall_score": 96.55
      //               },
      //               {
      //                 "Name": "Rajkumari Ahirwa",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 29.41,
      //                 "chapter 2": 100,
      //                 "chapter 3": 50,
      //                 "chapter 4": 33.33,
      //                 "chapter 5": 60,
      //                 "chapter 6": 71.67,
      //                 "chapter 7": 11.11,
      //                 "chapter 8": 61.54,
      //                 "chapter 9": 0,
      //                 "chapter 10": 44.62,
      //                 "chapter 11": 75,
      //                 "chapter 12": 50,
      //                 "chapter 13": 54.63,
      //                 "chapter 14": 64.71,
      //                 "chapter 15": 59.38,
      //                 "overall_score": 52.36
      //               },
      //               {
      //                 "Name": "Sonu Yadav",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 58.82,
      //                 "chapter 2": 91.67,
      //                 "chapter 3": 38.89,
      //                 "chapter 4": 83.33,
      //                 "chapter 5": 100,
      //                 "chapter 6": 66.67,
      //                 "chapter 7": 22.22,
      //                 "chapter 8": 53.85,
      //                 "chapter 9": 50,
      //                 "chapter 10": 49.74,
      //                 "chapter 11": 83.33,
      //                 "chapter 12": 50,
      //                 "chapter 13": 49.07,
      //                 "chapter 14": 88.24,
      //                 "chapter 15": 46.88,
      //                 "overall_score": 54.36
      //               },
      //               {
      //                 "Name": "Trapti Akhtar",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 94.12,
      //                 "chapter 2": 91.67,
      //                 "chapter 3": 100,
      //                 "chapter 4": 83.33,
      //                 "chapter 5": 100,
      //                 "chapter 6": 96.67,
      //                 "chapter 7": 88.89,
      //                 "chapter 8": 92.31,
      //                 "chapter 9": 100,
      //                 "chapter 10": 91.79,
      //                 "chapter 11": 83.33,
      //                 "chapter 12": 100,
      //                 "chapter 13": 95.37,
      //                 "chapter 14": 94.12,
      //                 "chapter 15": 89.06,
      //                 "overall_score": 93.09
      //               }
      //             ],
      //             "chapter_names": [
      //               {
      //                 "chapter_total_score_per": 78.82,
      //                 "AREAS RELATED TO CIRCLES": "chapter 1"
      //               },
      //               {
      //                 "chapter_total_score_per": 82.5,
      //                 "ARTHIMATIC PROGRESSIONS": "chapter 2"
      //               },
      //               {
      //                 "chapter_total_score_per": 71.11,
      //                 "CIRCLES": "chapter 3"
      //               },
      //               {
      //                 "chapter_total_score_per": 71.67,
      //                 "COORDINATE GEOMETRY": "chapter 4"
      //               },
      //               {
      //                 "chapter_total_score_per": 88,
      //                 "INTRODUCTION TO TRIGNOMETRY": "chapter 5"
      //               },
      //               {
      //                 "chapter_total_score_per": 73.17,
      //                 "NO CHAPTER": "chapter 6"
      //               },
      //               {
      //                 "chapter_total_score_per": 55.56,
      //                 "PAIR OF LINEAR EQUATIONS IN TWO VARIABLES": "chapter 7"
      //               },
      //               {
      //                 "chapter_total_score_per": 70,
      //                 "POLYNOMIALS": "chapter 8"
      //               },
      //               {
      //                 "chapter_total_score_per": 55,
      //                 "PROBABILITY": "chapter 9"
      //               },
      //               {
      //                 "chapter_total_score_per": 67.23,
      //                 "QUADRATIC EQUATIONS": "chapter 10"
      //               },
      //               {
      //                 "chapter_total_score_per": 75.83,
      //                 "REAL NUMBERS": "chapter 11"
      //               },
      //               {
      //                 "chapter_total_score_per": 45,
      //                 "SOME APPLICATIONS OF TRIGNOMETRY": "chapter 12"
      //               },
      //               {
      //                 "chapter_total_score_per": 65.28,
      //                 "STATISTICS": "chapter 13"
      //               },
      //               {
      //                 "chapter_total_score_per": 80.59,
      //                 "SURFACE AREAS AND VOLUMES": "chapter 14"
      //               },
      //               {
      //                 "chapter_total_score_per": 70.94,
      //                 "TRIANGLES": "chapter 15"
      //               }
      //             ]
      //           }
      //         },
      //         "4CD58D10-FE73-43DF-88F0-7305E1D1BC4D": {
      //           "chapter_wise_and_student_wise_performance_details": {
      //             "data": [
      //               {
      //                 "Name": "Anurag Roy",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 75,
      //                 "chapter 2": 90.91,
      //                 "chapter 3": 100,
      //                 "chapter 4": 59.42,
      //                 "chapter 5": 100,
      //                 "chapter 6": 94.55,
      //                 "chapter 7": 81.43,
      //                 "chapter 8": 72.84,
      //                 "chapter 9": 76.56,
      //                 "chapter 10": 61.54,
      //                 "chapter 11": 77.14,
      //                 "chapter 12": 95.45,
      //                 "chapter 13": 88.89,
      //                 "chapter 14": 77.78,
      //                 "chapter 15": 33.33,
      //                 "chapter 16": 61.54,
      //                 "overall_score": 78.18
      //               },
      //               {
      //                 "Name": "Ashutosh Sahoo",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 75,
      //                 "chapter 2": 63.64,
      //                 "chapter 3": 28.57,
      //                 "chapter 4": 47.83,
      //                 "chapter 5": 77.78,
      //                 "chapter 6": 36.36,
      //                 "chapter 7": 60,
      //                 "chapter 8": 56.79,
      //                 "chapter 9": 68.75,
      //                 "chapter 10": 53.85,
      //                 "chapter 11": 40,
      //                 "chapter 12": 68.18,
      //                 "chapter 13": 55.56,
      //                 "chapter 14": 44.44,
      //                 "chapter 15": 66.67,
      //                 "chapter 16": 42.31,
      //                 "overall_score": 53.82
      //               },
      //               {
      //                 "Name": "Ayush Verma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 50,
      //                 "chapter 2": 45.45,
      //                 "chapter 3": 28.57,
      //                 "chapter 4": 65.22,
      //                 "chapter 5": 100,
      //                 "chapter 6": 34.55,
      //                 "chapter 7": 42.86,
      //                 "chapter 8": 74.07,
      //                 "chapter 9": 59.38,
      //                 "chapter 10": 92.31,
      //                 "chapter 11": 40,
      //                 "chapter 12": 95.45,
      //                 "chapter 13": 55.56,
      //                 "chapter 14": 66.67,
      //                 "chapter 15": 66.67,
      //                 "chapter 16": 30.77,
      //                 "overall_score": 57.09
      //               },
      //               {
      //                 "Name": "Babli Jagdale",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 72.73,
      //                 "chapter 3": 100,
      //                 "chapter 4": 44.93,
      //                 "chapter 5": 100,
      //                 "chapter 6": 96.36,
      //                 "chapter 7": 85.71,
      //                 "chapter 8": 70.37,
      //                 "chapter 9": 84.38,
      //                 "chapter 10": 23.08,
      //                 "chapter 11": 94.29,
      //                 "chapter 12": 95.45,
      //                 "chapter 13": 82.54,
      //                 "chapter 14": 77.78,
      //                 "chapter 15": 33.33,
      //                 "chapter 16": 34.62,
      //                 "overall_score": 75.64
      //               },
      //               {
      //                 "Name": "Deepak Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 75,
      //                 "chapter 2": 54.55,
      //                 "chapter 3": 100,
      //                 "chapter 4": 43.48,
      //                 "chapter 5": 88.89,
      //                 "chapter 6": 36.36,
      //                 "chapter 7": 72.86,
      //                 "chapter 8": 66.67,
      //                 "chapter 9": 65.62,
      //                 "chapter 10": 61.54,
      //                 "chapter 11": 68.57,
      //                 "chapter 12": 63.64,
      //                 "chapter 13": 30.16,
      //                 "chapter 14": 72.22,
      //                 "chapter 15": 100,
      //                 "chapter 16": 19.23,
      //                 "overall_score": 55.82
      //               },
      //               {
      //                 "Name": "Deepali Rana",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 50,
      //                 "chapter 2": 81.82,
      //                 "chapter 3": 85.71,
      //                 "chapter 4": 49.28,
      //                 "chapter 5": 88.89,
      //                 "chapter 6": 87.27,
      //                 "chapter 7": 71.43,
      //                 "chapter 8": 67.9,
      //                 "chapter 9": 85.94,
      //                 "chapter 10": 92.31,
      //                 "chapter 11": 94.29,
      //                 "chapter 12": 95.45,
      //                 "chapter 13": 90.48,
      //                 "chapter 14": 77.78,
      //                 "chapter 15": 66.67,
      //                 "chapter 16": 53.85,
      //                 "overall_score": 76.36
      //               },
      //               {
      //                 "Name": "Deepanshi Satija",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 81.82,
      //                 "chapter 3": 100,
      //                 "chapter 4": 92.75,
      //                 "chapter 5": 88.89,
      //                 "chapter 6": 85.45,
      //                 "chapter 7": 100,
      //                 "chapter 8": 92.59,
      //                 "chapter 9": 100,
      //                 "chapter 10": 100,
      //                 "chapter 11": 100,
      //                 "chapter 12": 95.45,
      //                 "chapter 13": 98.41,
      //                 "chapter 14": 94.44,
      //                 "chapter 15": 66.67,
      //                 "chapter 16": 96.15,
      //                 "overall_score": 95.09
      //               },
      //               {
      //                 "Name": "Rajkumari Ahirwa",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 50,
      //                 "chapter 2": 72.73,
      //                 "chapter 3": 42.86,
      //                 "chapter 4": 53.62,
      //                 "chapter 5": 88.89,
      //                 "chapter 6": 54.55,
      //                 "chapter 7": 52.86,
      //                 "chapter 8": 53.09,
      //                 "chapter 9": 53.12,
      //                 "chapter 10": 84.62,
      //                 "chapter 11": 71.43,
      //                 "chapter 12": 68.18,
      //                 "chapter 13": 50.79,
      //                 "chapter 14": 66.67,
      //                 "chapter 15": 100,
      //                 "chapter 16": 23.08,
      //                 "overall_score": 55.64
      //               },
      //               {
      //                 "Name": "Sonu Yadav",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 75,
      //                 "chapter 2": 54.55,
      //                 "chapter 3": 42.86,
      //                 "chapter 4": 59.42,
      //                 "chapter 5": 100,
      //                 "chapter 6": 50.91,
      //                 "chapter 7": 31.43,
      //                 "chapter 8": 61.73,
      //                 "chapter 9": 81.25,
      //                 "chapter 10": 100,
      //                 "chapter 11": 65.71,
      //                 "chapter 12": 95.45,
      //                 "chapter 13": 38.1,
      //                 "chapter 14": 72.22,
      //                 "chapter 15": 100,
      //                 "chapter 16": 23.08,
      //                 "overall_score": 57.64
      //               },
      //               {
      //                 "Name": "Trapti Akhtar",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 90.91,
      //                 "chapter 3": 100,
      //                 "chapter 4": 89.86,
      //                 "chapter 5": 100,
      //                 "chapter 6": 96.36,
      //                 "chapter 7": 87.14,
      //                 "chapter 8": 92.59,
      //                 "chapter 9": 96.88,
      //                 "chapter 10": 92.31,
      //                 "chapter 11": 100,
      //                 "chapter 12": 86.36,
      //                 "chapter 13": 100,
      //                 "chapter 14": 88.89,
      //                 "chapter 15": 100,
      //                 "chapter 16": 96.15,
      //                 "overall_score": 93.82
      //               }
      //             ],
      //             "chapter_names": [
      //               {
      //                 "chapter_total_score_per": 75,
      //                 "ACIDS, BASES AND SALTS": "chapter 1"
      //               },
      //               {
      //                 "chapter_total_score_per": 70.91,
      //                 "CARBON AND ITS COMPOUNDS": "chapter 2"
      //               },
      //               {
      //                 "chapter_total_score_per": 72.86,
      //                 "CHEMICAL REACTIONS AND EQUATIONS": "chapter 3"
      //               },
      //               {
      //                 "chapter_total_score_per": 60.58,
      //                 "CONTROL AND COORDINATION": "chapter 4"
      //               },
      //               {
      //                 "chapter_total_score_per": 93.33,
      //                 "ELECTRICITY": "chapter 5"
      //               },
      //               {
      //                 "chapter_total_score_per": 67.27,
      //                 "HEREDITY AND EVOLUTION": "chapter 6"
      //               },
      //               {
      //                 "chapter_total_score_per": 68.57,
      //                 "HOW DO ORGANISMS REPRODUCE?": "chapter 7"
      //               },
      //               {
      //                 "chapter_total_score_per": 70.86,
      //                 "LIFE PROCESSES": "chapter 8"
      //               },
      //               {
      //                 "chapter_total_score_per": 77.19,
      //                 "LIGHT – REFLECTION AND REFRACTION": "chapter 9"
      //               },
      //               {
      //                 "chapter_total_score_per": 76.15,
      //                 "MAGNETIC EFFECTS OF ELECTRIC CURRENT": "chapter 10"
      //               },
      //               {
      //                 "chapter_total_score_per": 75.14,
      //                 "MANAGEMENT OF NATURAL RESOURCES": "chapter 11"
      //               },
      //               {
      //                 "chapter_total_score_per": 85.91,
      //                 "METALS AND NON-METALS": "chapter 12"
      //               },
      //               {
      //                 "chapter_total_score_per": 69.05,
      //                 "OUR ENVIRONMENT": "chapter 13"
      //               },
      //               {
      //                 "chapter_total_score_per": 73.89,
      //                 "PERIODIC CLASSIFICATION OF ELEMENTS": "chapter 14"
      //               },
      //               {
      //                 "chapter_total_score_per": 73.33,
      //                 "SOURCES OF ENERGY": "chapter 15"
      //               },
      //               {
      //                 "chapter_total_score_per": 48.08,
      //                 "THE HUMAN EYE AND COLOURFUL WORLD": "chapter 16"
      //               }
      //             ]
      //           }
      //         },
      //         "99B9A8B9-F36A-4055-ACCF-32A09BCC7AC4": {
      //           "chapter_wise_and_student_wise_performance_details": {
      //             "data": [
      //               {
      //                 "Name": "Anurag Roy",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 58.33,
      //                 "chapter 2": 84.21,
      //                 "chapter 3": 42.31,
      //                 "chapter 4": 50,
      //                 "chapter 5": 75,
      //                 "chapter 6": 81.82,
      //                 "chapter 7": 87.5,
      //                 "chapter 8": 100,
      //                 "chapter 9": 81.48,
      //                 "chapter 10": 72,
      //                 "chapter 11": 51.85,
      //                 "chapter 12": 48.15,
      //                 "chapter 13": 100,
      //                 "chapter 14": 83.33,
      //                 "chapter 15": 95.45,
      //                 "chapter 16": 76.19,
      //                 "chapter 17": 0,
      //                 "chapter 18": 0,
      //                 "chapter 19": 83.33,
      //                 "chapter 20": 86.67,
      //                 "chapter 21": 72.13,
      //                 "chapter 22": 95.24,
      //                 "chapter 23": 100,
      //                 "chapter 24": 100,
      //                 "chapter 25": 96,
      //                 "overall_score": 75.5
      //               },
      //               {
      //                 "Name": "Ashutosh Sahoo",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 29.17,
      //                 "chapter 2": 73.68,
      //                 "chapter 3": 42.31,
      //                 "chapter 4": 55.56,
      //                 "chapter 5": 57.14,
      //                 "chapter 6": 63.64,
      //                 "chapter 7": 62.5,
      //                 "chapter 8": 56.25,
      //                 "chapter 9": 74.07,
      //                 "chapter 10": 42,
      //                 "chapter 11": 48.15,
      //                 "chapter 12": 85.19,
      //                 "chapter 13": 11.11,
      //                 "chapter 14": 76.19,
      //                 "chapter 15": 45.45,
      //                 "chapter 16": 47.62,
      //                 "chapter 17": 0,
      //                 "chapter 18": 0,
      //                 "chapter 19": 50,
      //                 "chapter 20": 70,
      //                 "chapter 21": 59.02,
      //                 "chapter 22": 47.62,
      //                 "chapter 23": 71.43,
      //                 "chapter 24": 58.33,
      //                 "chapter 25": 48,
      //                 "overall_score": 56.26
      //               },
      //               {
      //                 "Name": "Ayush Verma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 41.67,
      //                 "chapter 2": 36.84,
      //                 "chapter 3": 80.77,
      //                 "chapter 4": 50,
      //                 "chapter 5": 75,
      //                 "chapter 6": 36.36,
      //                 "chapter 7": 62.5,
      //                 "chapter 8": 81.25,
      //                 "chapter 9": 40.74,
      //                 "chapter 10": 26,
      //                 "chapter 11": 48.15,
      //                 "chapter 12": 51.85,
      //                 "chapter 13": 44.44,
      //                 "chapter 14": 64.29,
      //                 "chapter 15": 100,
      //                 "chapter 16": 52.38,
      //                 "chapter 17": 0,
      //                 "chapter 18": 100,
      //                 "chapter 19": 66.67,
      //                 "chapter 20": 43.33,
      //                 "chapter 21": 54.1,
      //                 "chapter 22": 66.67,
      //                 "chapter 23": 85.71,
      //                 "chapter 24": 8.33,
      //                 "chapter 25": 56,
      //                 "overall_score": 53.54
      //               },
      //               {
      //                 "Name": "Babli Jagdale",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 62.5,
      //                 "chapter 2": 73.68,
      //                 "chapter 3": 80.77,
      //                 "chapter 4": 50,
      //                 "chapter 5": 82.14,
      //                 "chapter 6": 81.82,
      //                 "chapter 7": 100,
      //                 "chapter 8": 100,
      //                 "chapter 9": 74.07,
      //                 "chapter 10": 56,
      //                 "chapter 11": 51.85,
      //                 "chapter 12": 62.96,
      //                 "chapter 13": 100,
      //                 "chapter 14": 90.48,
      //                 "chapter 15": 95.45,
      //                 "chapter 16": 76.19,
      //                 "chapter 17": 50,
      //                 "chapter 18": 0,
      //                 "chapter 19": 83.33,
      //                 "chapter 20": 63.33,
      //                 "chapter 21": 85.25,
      //                 "chapter 22": 90.48,
      //                 "chapter 23": 85.71,
      //                 "chapter 24": 91.67,
      //                 "chapter 25": 76,
      //                 "overall_score": 76.04
      //               },
      //               {
      //                 "Name": "Deepak Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 33.33,
      //                 "chapter 2": 57.89,
      //                 "chapter 3": 42.31,
      //                 "chapter 4": 61.11,
      //                 "chapter 5": 53.57,
      //                 "chapter 6": 50,
      //                 "chapter 7": 50,
      //                 "chapter 8": 81.25,
      //                 "chapter 9": 74.07,
      //                 "chapter 10": 40,
      //                 "chapter 11": 48.15,
      //                 "chapter 12": 22.22,
      //                 "chapter 13": 66.67,
      //                 "chapter 14": 80.95,
      //                 "chapter 15": 68.18,
      //                 "chapter 16": 47.62,
      //                 "chapter 17": 0,
      //                 "chapter 18": 0,
      //                 "chapter 19": 66.67,
      //                 "chapter 20": 50,
      //                 "chapter 21": 50.82,
      //                 "chapter 22": 76.19,
      //                 "chapter 23": 100,
      //                 "chapter 24": 58.33,
      //                 "chapter 25": 44,
      //                 "overall_score": 54.26
      //               },
      //               {
      //                 "Name": "Deepali Rana",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 54.17,
      //                 "chapter 2": 52.63,
      //                 "chapter 3": 61.54,
      //                 "chapter 4": 61.11,
      //                 "chapter 5": 92.86,
      //                 "chapter 6": 86.36,
      //                 "chapter 7": 87.5,
      //                 "chapter 8": 93.75,
      //                 "chapter 9": 74.07,
      //                 "chapter 10": 52,
      //                 "chapter 11": 70.37,
      //                 "chapter 12": 48.15,
      //                 "chapter 13": 44.44,
      //                 "chapter 14": 92.86,
      //                 "chapter 15": 95.45,
      //                 "chapter 16": 76.19,
      //                 "chapter 17": 50,
      //                 "chapter 18": 100,
      //                 "chapter 19": 83.33,
      //                 "chapter 20": 96.67,
      //                 "chapter 21": 80.33,
      //                 "chapter 22": 71.43,
      //                 "chapter 23": 85.71,
      //                 "chapter 24": 100,
      //                 "chapter 25": 76,
      //                 "overall_score": 74.77
      //               },
      //               {
      //                 "Name": "Deepanshi Satija",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 91.67,
      //                 "chapter 2": 100,
      //                 "chapter 3": 88.46,
      //                 "chapter 4": 88.89,
      //                 "chapter 5": 92.86,
      //                 "chapter 6": 100,
      //                 "chapter 7": 62.5,
      //                 "chapter 8": 100,
      //                 "chapter 9": 100,
      //                 "chapter 10": 82,
      //                 "chapter 11": 100,
      //                 "chapter 12": 96.3,
      //                 "chapter 13": 100,
      //                 "chapter 14": 95.24,
      //                 "chapter 15": 100,
      //                 "chapter 16": 100,
      //                 "chapter 17": 0,
      //                 "chapter 18": 100,
      //                 "chapter 19": 83.33,
      //                 "chapter 20": 96.67,
      //                 "chapter 21": 85.25,
      //                 "chapter 22": 100,
      //                 "chapter 23": 85.71,
      //                 "chapter 24": 100,
      //                 "chapter 25": 84,
      //                 "overall_score": 92.38
      //               },
      //               {
      //                 "Name": "Rajkumari Ahirwa",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 16.67,
      //                 "chapter 2": 52.63,
      //                 "chapter 3": 80.77,
      //                 "chapter 4": 61.11,
      //                 "chapter 5": 50,
      //                 "chapter 6": 40.91,
      //                 "chapter 7": 62.5,
      //                 "chapter 8": 75,
      //                 "chapter 9": 37.04,
      //                 "chapter 10": 28,
      //                 "chapter 11": 51.85,
      //                 "chapter 12": 33.33,
      //                 "chapter 13": 100,
      //                 "chapter 14": 52.38,
      //                 "chapter 15": 100,
      //                 "chapter 16": 47.62,
      //                 "chapter 17": 50,
      //                 "chapter 18": 0,
      //                 "chapter 19": 83.33,
      //                 "chapter 20": 50,
      //                 "chapter 21": 54.1,
      //                 "chapter 22": 76.19,
      //                 "chapter 23": 100,
      //                 "chapter 24": 50,
      //                 "chapter 25": 32,
      //                 "overall_score": 52.09
      //               },
      //               {
      //                 "Name": "Sonu Yadav",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 37.5,
      //                 "chapter 2": 47.37,
      //                 "chapter 3": 80.77,
      //                 "chapter 4": 22.22,
      //                 "chapter 5": 64.29,
      //                 "chapter 6": 36.36,
      //                 "chapter 7": 62.5,
      //                 "chapter 8": 93.75,
      //                 "chapter 9": 51.85,
      //                 "chapter 10": 36,
      //                 "chapter 11": 33.33,
      //                 "chapter 12": 55.56,
      //                 "chapter 13": 11.11,
      //                 "chapter 14": 57.14,
      //                 "chapter 15": 95.45,
      //                 "chapter 16": 23.81,
      //                 "chapter 17": 50,
      //                 "chapter 18": 0,
      //                 "chapter 19": 83.33,
      //                 "chapter 20": 80,
      //                 "chapter 21": 59.02,
      //                 "chapter 22": 90.48,
      //                 "chapter 23": 14.29,
      //                 "chapter 24": 41.67,
      //                 "chapter 25": 20,
      //                 "overall_score": 52.99
      //               },
      //               {
      //                 "Name": "Trapti Akhtar",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 84.21,
      //                 "chapter 3": 80.77,
      //                 "chapter 4": 94.44,
      //                 "chapter 5": 89.29,
      //                 "chapter 6": 100,
      //                 "chapter 7": 87.5,
      //                 "chapter 8": 81.25,
      //                 "chapter 9": 100,
      //                 "chapter 10": 90,
      //                 "chapter 11": 100,
      //                 "chapter 12": 100,
      //                 "chapter 13": 100,
      //                 "chapter 14": 90.48,
      //                 "chapter 15": 100,
      //                 "chapter 16": 100,
      //                 "chapter 17": 100,
      //                 "chapter 18": 100,
      //                 "chapter 19": 100,
      //                 "chapter 20": 100,
      //                 "chapter 21": 83.61,
      //                 "chapter 22": 90.48,
      //                 "chapter 23": 100,
      //                 "chapter 24": 100,
      //                 "chapter 25": 96,
      //                 "overall_score": 93.1
      //               }
      //             ],
      //             "chapter_names": [
      //               {
      //                 "chapter_total_score_per": 52.5,
      //                 "AGRICULTURE": "chapter 1"
      //               },
      //               {
      //                 "chapter_total_score_per": 66.32,
      //                 "CHALLENGES TO DEMOCRACY": "chapter 2"
      //               },
      //               {
      //                 "chapter_total_score_per": 68.08,
      //                 "CONSUMER RIGHT": "chapter 3"
      //               },
      //               {
      //                 "chapter_total_score_per": 59.44,
      //                 "DEMOCRACY AND DIVERSITY": "chapter 4"
      //               },
      //               {
      //                 "chapter_total_score_per": 73.21,
      //                 "DEVELOPMENT": "chapter 5"
      //               },
      //               {
      //                 "chapter_total_score_per": 67.73,
      //                 "FEDERALISM": "chapter 6"
      //               },
      //               {
      //                 "chapter_total_score_per": 72.5,
      //                 "FOREST AND WILDLIFE RESOURCE": "chapter 7"
      //               },
      //               {
      //                 "chapter_total_score_per": 86.25,
      //                 "GENDER, RELIGION AND CASTE": "chapter 8"
      //               },
      //               {
      //                 "chapter_total_score_per": 70.74,
      //                 "GLOBALISATION AND THE INDIAN ECONOMY ": "chapter 9"
      //               },
      //               {
      //                 "chapter_total_score_per": 52.4,
      //                 "LIFE LINES OF NATIONAL ECONOMY": "chapter 10"
      //               },
      //               {
      //                 "chapter_total_score_per": 60.37,
      //                 "MANUFACTURING INDUSTRIES": "chapter 11"
      //               },
      //               {
      //                 "chapter_total_score_per": 60.37,
      //                 "MINERALS AND ENERGY RESOURCE": "chapter 12"
      //               },
      //               {
      //                 "chapter_total_score_per": 67.78,
      //                 "MONEY AND CREDIT": "chapter 13"
      //               },
      //               {
      //                 "chapter_total_score_per": 78.33,
      //                 "NATIONALISM IN INDIA": "chapter 14"
      //               },
      //               {
      //                 "chapter_total_score_per": 89.55,
      //                 "OUTCOMES OF DEMOCRACY": "chapter 15"
      //               },
      //               {
      //                 "chapter_total_score_per": 64.76,
      //                 "POLITICAL PARTIES": "chapter 16"
      //               },
      //               {
      //                 "chapter_total_score_per": 30,
      //                 "POPULAR STRUGGLES AND MOVEMENTS": "chapter 17"
      //               },
      //               {
      //                 "chapter_total_score_per": 40,
      //                 "POWER SHARING": "chapter 18"
      //               },
      //               {
      //                 "chapter_total_score_per": 78.33,
      //                 "PRINT CULTURE AND THE MODERN WORLD": "chapter 19"
      //               },
      //               {
      //                 "chapter_total_score_per": 73.67,
      //                 "RESOURCE AND DEVELOPMENT": "chapter 20"
      //               },
      //               {
      //                 "chapter_total_score_per": 68.36,
      //                 "SECTOR OF THE INDIAN ECONOMY": "chapter 21"
      //               },
      //               {
      //                 "chapter_total_score_per": 80.48,
      //                 "THE AGE OF INDUSTRILISATION": "chapter 22"
      //               },
      //               {
      //                 "chapter_total_score_per": 82.86,
      //                 "THE MAKING OF A GLOBAL WORLD": "chapter 23"
      //               },
      //               {
      //                 "chapter_total_score_per": 70.83,
      //                 "THE RISE OF NATIONALISM IN EUROPE": "chapter 24"
      //               },
      //               {
      //                 "chapter_total_score_per": 62.8,
      //                 "WATER RESOURCE": "chapter 25"
      //               }
      //             ]
      //           }
      //         }
      //       }
      //     },
      //     "6BFAE0FC-78B2-4EC3-8BCB-75138CD2AB8E": {
      //       "AD659800-6528-4E10-9D57-736A94AFB6F8": {
      //         "628B0B65-E4B4-4902-887A-8A3F8E0BB223": {
      //           "chapter_wise_and_student_wise_performance_details": {
      //             "data": [
      //               {
      //                 "Name": "Aarti Shah",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 86.36,
      //                 "chapter 2": 52.94,
      //                 "chapter 3": 90.48,
      //                 "chapter 4": 84.62,
      //                 "chapter 5": 61.9,
      //                 "chapter 6": 70.83,
      //                 "chapter 7": 48.15,
      //                 "chapter 8": 64.29,
      //                 "chapter 9": 50,
      //                 "chapter 10": 56.82,
      //                 "chapter 11": 57.69,
      //                 "chapter 12": 31.82,
      //                 "chapter 13": 55.56,
      //                 "chapter 14": 50,
      //                 "chapter 15": 21.74,
      //                 "chapter 16": 52.17,
      //                 "chapter 17": 52.78,
      //                 "chapter 18": 31.82,
      //                 "chapter 19": 42.31,
      //                 "chapter 20": 44.74,
      //                 "overall_score": 53.09
      //               },
      //               {
      //                 "Name": "Abhishek Tyagi",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 100,
      //                 "chapter 3": 100,
      //                 "chapter 4": 92.31,
      //                 "chapter 5": 90.48,
      //                 "chapter 6": 100,
      //                 "chapter 7": 88.89,
      //                 "chapter 8": 100,
      //                 "chapter 9": 95,
      //                 "chapter 10": 88.64,
      //                 "chapter 11": 88.46,
      //                 "chapter 12": 79.55,
      //                 "chapter 13": 96.3,
      //                 "chapter 14": 100,
      //                 "chapter 15": 95.65,
      //                 "chapter 16": 95.65,
      //                 "chapter 17": 91.67,
      //                 "chapter 18": 95.45,
      //                 "chapter 19": 96.15,
      //                 "chapter 20": 97.37,
      //                 "overall_score": 94
      //               },
      //               {
      //                 "Name": "Ajay Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 90.91,
      //                 "chapter 2": 74.51,
      //                 "chapter 3": 95.24,
      //                 "chapter 4": 92.31,
      //                 "chapter 5": 47.62,
      //                 "chapter 6": 50,
      //                 "chapter 7": 51.85,
      //                 "chapter 8": 100,
      //                 "chapter 9": 65,
      //                 "chapter 10": 86.36,
      //                 "chapter 11": 46.15,
      //                 "chapter 12": 68.18,
      //                 "chapter 13": 70.37,
      //                 "chapter 14": 100,
      //                 "chapter 15": 52.17,
      //                 "chapter 16": 78.26,
      //                 "chapter 17": 50,
      //                 "chapter 18": 72.73,
      //                 "chapter 19": 65.38,
      //                 "chapter 20": 68.42,
      //                 "overall_score": 70.36
      //               },
      //               {
      //                 "Name": "Akansha Kapoor",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 95.45,
      //                 "chapter 2": 50.98,
      //                 "chapter 3": 61.9,
      //                 "chapter 4": 7.69,
      //                 "chapter 5": 85.71,
      //                 "chapter 6": 75,
      //                 "chapter 7": 51.85,
      //                 "chapter 8": 42.86,
      //                 "chapter 9": 35,
      //                 "chapter 10": 65.91,
      //                 "chapter 11": 23.08,
      //                 "chapter 12": 25,
      //                 "chapter 13": 55.56,
      //                 "chapter 14": 67.86,
      //                 "chapter 15": 21.74,
      //                 "chapter 16": 91.3,
      //                 "chapter 17": 50,
      //                 "chapter 18": 36.36,
      //                 "chapter 19": 42.31,
      //                 "chapter 20": 42.11,
      //                 "overall_score": 51.45
      //               },
      //               {
      //                 "Name": "Akhil Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 63.64,
      //                 "chapter 2": 86.27,
      //                 "chapter 3": 95.24,
      //                 "chapter 4": 76.92,
      //                 "chapter 5": 71.43,
      //                 "chapter 6": 50,
      //                 "chapter 7": 62.96,
      //                 "chapter 8": 100,
      //                 "chapter 9": 60,
      //                 "chapter 10": 84.09,
      //                 "chapter 11": 50,
      //                 "chapter 12": 65.91,
      //                 "chapter 13": 51.85,
      //                 "chapter 14": 78.57,
      //                 "chapter 15": 65.22,
      //                 "chapter 16": 91.3,
      //                 "chapter 17": 61.11,
      //                 "chapter 18": 81.82,
      //                 "chapter 19": 73.08,
      //                 "chapter 20": 68.42,
      //                 "overall_score": 71.64
      //               },
      //               {
      //                 "Name": "Akhilesh Pandey",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 95.45,
      //                 "chapter 2": 58.82,
      //                 "chapter 3": 57.14,
      //                 "chapter 4": 15.38,
      //                 "chapter 5": 61.9,
      //                 "chapter 6": 75,
      //                 "chapter 7": 51.85,
      //                 "chapter 8": 71.43,
      //                 "chapter 9": 55,
      //                 "chapter 10": 50,
      //                 "chapter 11": 19.23,
      //                 "chapter 12": 27.27,
      //                 "chapter 13": 48.15,
      //                 "chapter 14": 67.86,
      //                 "chapter 15": 21.74,
      //                 "chapter 16": 56.52,
      //                 "chapter 17": 52.78,
      //                 "chapter 18": 36.36,
      //                 "chapter 19": 50,
      //                 "chapter 20": 42.11,
      //                 "overall_score": 50.18
      //               },
      //               {
      //                 "Name": "Aliya Khan",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 63.64,
      //                 "chapter 2": 64.71,
      //                 "chapter 3": 57.14,
      //                 "chapter 4": 46.15,
      //                 "chapter 5": 61.9,
      //                 "chapter 6": 70.83,
      //                 "chapter 7": 55.56,
      //                 "chapter 8": 50,
      //                 "chapter 9": 50,
      //                 "chapter 10": 52.27,
      //                 "chapter 11": 23.08,
      //                 "chapter 12": 31.82,
      //                 "chapter 13": 44.44,
      //                 "chapter 14": 50,
      //                 "chapter 15": 21.74,
      //                 "chapter 16": 69.57,
      //                 "chapter 17": 38.89,
      //                 "chapter 18": 36.36,
      //                 "chapter 19": 42.31,
      //                 "chapter 20": 42.11,
      //                 "overall_score": 48.36
      //               },
      //               {
      //                 "Name": "Aman Chouhan",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 90.91,
      //                 "chapter 2": 56.86,
      //                 "chapter 3": 61.9,
      //                 "chapter 4": 53.85,
      //                 "chapter 5": 61.9,
      //                 "chapter 6": 66.67,
      //                 "chapter 7": 44.44,
      //                 "chapter 8": 71.43,
      //                 "chapter 9": 40,
      //                 "chapter 10": 45.45,
      //                 "chapter 11": 38.46,
      //                 "chapter 12": 18.18,
      //                 "chapter 13": 51.85,
      //                 "chapter 14": 50,
      //                 "chapter 15": 17.39,
      //                 "chapter 16": 56.52,
      //                 "chapter 17": 55.56,
      //                 "chapter 18": 31.82,
      //                 "chapter 19": 61.54,
      //                 "chapter 20": 42.11,
      //                 "overall_score": 49.09
      //               },
      //               {
      //                 "Name": "Amit Verma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 90.91,
      //                 "chapter 2": 86.27,
      //                 "chapter 3": 90.48,
      //                 "chapter 4": 84.62,
      //                 "chapter 5": 47.62,
      //                 "chapter 6": 54.17,
      //                 "chapter 7": 62.96,
      //                 "chapter 8": 78.57,
      //                 "chapter 9": 65,
      //                 "chapter 10": 72.73,
      //                 "chapter 11": 73.08,
      //                 "chapter 12": 50,
      //                 "chapter 13": 77.78,
      //                 "chapter 14": 82.14,
      //                 "chapter 15": 73.91,
      //                 "chapter 16": 91.3,
      //                 "chapter 17": 61.11,
      //                 "chapter 18": 90.91,
      //                 "chapter 19": 73.08,
      //                 "chapter 20": 68.42,
      //                 "overall_score": 72.73
      //               },
      //               {
      //                 "Name": "Sonam Gupta",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 100,
      //                 "chapter 2": 96.08,
      //                 "chapter 3": 95.24,
      //                 "chapter 4": 100,
      //                 "chapter 5": 90.48,
      //                 "chapter 6": 100,
      //                 "chapter 7": 85.19,
      //                 "chapter 8": 78.57,
      //                 "chapter 9": 100,
      //                 "chapter 10": 86.36,
      //                 "chapter 11": 92.31,
      //                 "chapter 12": 79.55,
      //                 "chapter 13": 81.48,
      //                 "chapter 14": 100,
      //                 "chapter 15": 82.61,
      //                 "chapter 16": 78.26,
      //                 "chapter 17": 88.89,
      //                 "chapter 18": 100,
      //                 "chapter 19": 96.15,
      //                 "chapter 20": 81.58,
      //                 "overall_score": 90
      //               }
      //             ],
      //             "chapter_names": [
      //               {
      //                 "chapter_total_score_per": 87.73,
      //                 "CLIMATE": "chapter 1"
      //               },
      //               {
      //                 "chapter_total_score_per": 72.75,
      //                 "CONSTITUTIONAL DESING": "chapter 2"
      //               },
      //               {
      //                 "chapter_total_score_per": 80.48,
      //                 "DEMOCRATIC RIGHTS": "chapter 3"
      //               },
      //               {
      //                 "chapter_total_score_per": 65.38,
      //                 "DRAINAGE": "chapter 4"
      //               },
      //               {
      //                 "chapter_total_score_per": 68.1,
      //                 "ELECTORAL POLITICS": "chapter 5"
      //               },
      //               {
      //                 "chapter_total_score_per": 71.25,
      //                 "FOOD SECURITY IN INDIA": "chapter 6"
      //               },
      //               {
      //                 "chapter_total_score_per": 60.37,
      //                 "FOREST SOCIETY AND COLONIALISM": "chapter 7"
      //               },
      //               {
      //                 "chapter_total_score_per": 75.71,
      //                 "INDIA – SIZE AND LOCATION": "chapter 8"
      //               },
      //               {
      //                 "chapter_total_score_per": 61.5,
      //                 "NATURAL VEGETATION AND WILDLIFE": "chapter 9"
      //               },
      //               {
      //                 "chapter_total_score_per": 68.86,
      //                 "NAZISM AND THE RISE OF HITLER": "chapter 10"
      //               },
      //               {
      //                 "chapter_total_score_per": 51.15,
      //                 "PASTORALISTS IN THE MODERN WORLD": "chapter 11"
      //               },
      //               {
      //                 "chapter_total_score_per": 47.73,
      //                 "PEOPLE AS RESOURCE": "chapter 12"
      //               },
      //               {
      //                 "chapter_total_score_per": 63.33,
      //                 "PHYSICAL FEATURES OF INDIA": "chapter 13"
      //               },
      //               {
      //                 "chapter_total_score_per": 74.64,
      //                 "POPULATION": "chapter 14"
      //               },
      //               {
      //                 "chapter_total_score_per": 47.39,
      //                 "POVERTY AS A CHALLENGE": "chapter 15"
      //               },
      //               {
      //                 "chapter_total_score_per": 76.09,
      //                 "SOCIALISM IN EUROPE AND THE RUSSIAN REVOLUTION": "chapter 16"
      //               },
      //               {
      //                 "chapter_total_score_per": 60.28,
      //                 "THE FRENCH REVOLUTION": "chapter 17"
      //               },
      //               {
      //                 "chapter_total_score_per": 61.36,
      //                 "THE STORY OF VILLAGE PALAMPUR": "chapter 18"
      //               },
      //               {
      //                 "chapter_total_score_per": 64.23,
      //                 "WHAT IS DEMOCRACY? WHY DEMOCRACY?": "chapter 19"
      //               },
      //               {
      //                 "chapter_total_score_per": 59.74,
      //                 "WORKING OF INSTITUTIONS": "chapter 20"
      //               }
      //             ]
      //           }
      //         },
      //         "18FF90C8-1332-4388-97F1-1B60B05248BA": {
      //           "chapter_wise_and_student_wise_performance_details": {
      //             "data": [
      //               {
      //                 "Name": "Aarti Shah",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 50,
      //                 "chapter 2": 40.48,
      //                 "chapter 3": 50,
      //                 "chapter 4": 31.25,
      //                 "chapter 5": 63.41,
      //                 "chapter 6": 60,
      //                 "chapter 7": 46.15,
      //                 "chapter 8": 47.83,
      //                 "chapter 9": 0,
      //                 "chapter 10": 45.71,
      //                 "chapter 11": 56.25,
      //                 "chapter 12": 73.68,
      //                 "chapter 13": 54.17,
      //                 "chapter 14": 100,
      //                 "chapter 15": 54.84,
      //                 "overall_score": 52.36
      //               },
      //               {
      //                 "Name": "Abhishek Tyagi",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 97.06,
      //                 "chapter 2": 100,
      //                 "chapter 3": 86.36,
      //                 "chapter 4": 68.75,
      //                 "chapter 5": 87.8,
      //                 "chapter 6": 94.74,
      //                 "chapter 7": 78.85,
      //                 "chapter 8": 84.78,
      //                 "chapter 9": 100,
      //                 "chapter 10": 94.29,
      //                 "chapter 11": 90.62,
      //                 "chapter 12": 78.95,
      //                 "chapter 13": 91.67,
      //                 "chapter 14": 69.23,
      //                 "chapter 15": 64.52,
      //                 "overall_score": 87.27
      //               },
      //               {
      //                 "Name": "Ajay Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 70.59,
      //                 "chapter 2": 80.95,
      //                 "chapter 3": 86.36,
      //                 "chapter 4": 71.88,
      //                 "chapter 5": 70.73,
      //                 "chapter 6": 67.37,
      //                 "chapter 7": 75,
      //                 "chapter 8": 69.57,
      //                 "chapter 9": 37.5,
      //                 "chapter 10": 71.43,
      //                 "chapter 11": 68.75,
      //                 "chapter 12": 100,
      //                 "chapter 13": 64.58,
      //                 "chapter 14": 100,
      //                 "chapter 15": 58.06,
      //                 "overall_score": 71.82
      //               },
      //               {
      //                 "Name": "Akansha Kapoor",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 47.06,
      //                 "chapter 2": 64.29,
      //                 "chapter 3": 40.91,
      //                 "chapter 4": 68.75,
      //                 "chapter 5": 53.66,
      //                 "chapter 6": 57.89,
      //                 "chapter 7": 40.38,
      //                 "chapter 8": 63.04,
      //                 "chapter 9": 0,
      //                 "chapter 10": 34.29,
      //                 "chapter 11": 43.75,
      //                 "chapter 12": 73.68,
      //                 "chapter 13": 60.42,
      //                 "chapter 14": 38.46,
      //                 "chapter 15": 32.26,
      //                 "overall_score": 51.82
      //               },
      //               {
      //                 "Name": "Akhil Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 76.47,
      //                 "chapter 2": 71.43,
      //                 "chapter 3": 72.73,
      //                 "chapter 4": 87.5,
      //                 "chapter 5": 75.61,
      //                 "chapter 6": 66.32,
      //                 "chapter 7": 73.08,
      //                 "chapter 8": 58.7,
      //                 "chapter 9": 37.5,
      //                 "chapter 10": 74.29,
      //                 "chapter 11": 65.62,
      //                 "chapter 12": 73.68,
      //                 "chapter 13": 52.08,
      //                 "chapter 14": 61.54,
      //                 "chapter 15": 64.52,
      //                 "overall_score": 68.36
      //               },
      //               {
      //                 "Name": "Akhilesh Pandey",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 38.24,
      //                 "chapter 2": 38.1,
      //                 "chapter 3": 59.09,
      //                 "chapter 4": 59.38,
      //                 "chapter 5": 70.73,
      //                 "chapter 6": 51.58,
      //                 "chapter 7": 51.92,
      //                 "chapter 8": 54.35,
      //                 "chapter 9": 37.5,
      //                 "chapter 10": 54.29,
      //                 "chapter 11": 56.25,
      //                 "chapter 12": 73.68,
      //                 "chapter 13": 31.25,
      //                 "chapter 14": 69.23,
      //                 "chapter 15": 16.13,
      //                 "overall_score": 49.82
      //               },
      //               {
      //                 "Name": "Aliya Khan",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 61.76,
      //                 "chapter 2": 40.48,
      //                 "chapter 3": 45.45,
      //                 "chapter 4": 53.12,
      //                 "chapter 5": 70.73,
      //                 "chapter 6": 49.47,
      //                 "chapter 7": 30.77,
      //                 "chapter 8": 32.61,
      //                 "chapter 9": 0,
      //                 "chapter 10": 37.14,
      //                 "chapter 11": 25,
      //                 "chapter 12": 73.68,
      //                 "chapter 13": 54.17,
      //                 "chapter 14": 61.54,
      //                 "chapter 15": 41.94,
      //                 "overall_score": 46.18
      //               },
      //               {
      //                 "Name": "Aman Chouhan",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 50,
      //                 "chapter 2": 54.76,
      //                 "chapter 3": 45.45,
      //                 "chapter 4": 31.25,
      //                 "chapter 5": 51.22,
      //                 "chapter 6": 47.37,
      //                 "chapter 7": 57.69,
      //                 "chapter 8": 50,
      //                 "chapter 9": 0,
      //                 "chapter 10": 37.14,
      //                 "chapter 11": 43.75,
      //                 "chapter 12": 73.68,
      //                 "chapter 13": 45.83,
      //                 "chapter 14": 38.46,
      //                 "chapter 15": 41.94,
      //                 "overall_score": 47.27
      //               },
      //               {
      //                 "Name": "Amit Verma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 73.53,
      //                 "chapter 2": 83.33,
      //                 "chapter 3": 77.27,
      //                 "chapter 4": 53.12,
      //                 "chapter 5": 70.73,
      //                 "chapter 6": 65.26,
      //                 "chapter 7": 90.38,
      //                 "chapter 8": 69.57,
      //                 "chapter 9": 0,
      //                 "chapter 10": 71.43,
      //                 "chapter 11": 81.25,
      //                 "chapter 12": 73.68,
      //                 "chapter 13": 72.92,
      //                 "chapter 14": 100,
      //                 "chapter 15": 25.81,
      //                 "overall_score": 70
      //               },
      //               {
      //                 "Name": "Sonam Gupta",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 94.12,
      //                 "chapter 2": 90.48,
      //                 "chapter 3": 90.91,
      //                 "chapter 4": 93.75,
      //                 "chapter 5": 100,
      //                 "chapter 6": 93.68,
      //                 "chapter 7": 84.62,
      //                 "chapter 8": 95.65,
      //                 "chapter 9": 100,
      //                 "chapter 10": 97.14,
      //                 "chapter 11": 93.75,
      //                 "chapter 12": 100,
      //                 "chapter 13": 100,
      //                 "chapter 14": 100,
      //                 "chapter 15": 96.77,
      //                 "overall_score": 94.55
      //               }
      //             ],
      //             "chapter_names": [
      //               {
      //                 "chapter_total_score_per": 65.88,
      //                 "ATOMS AND MOLECULES": "chapter 1"
      //               },
      //               {
      //                 "chapter_total_score_per": 66.43,
      //                 "DIVERSITY IN LIVING ORGANISMS": "chapter 2"
      //               },
      //               {
      //                 "chapter_total_score_per": 65.45,
      //                 "FORCE AND LAWS OF MOTION": "chapter 3"
      //               },
      //               {
      //                 "chapter_total_score_per": 61.88,
      //                 "GRAVITATION": "chapter 4"
      //               },
      //               {
      //                 "chapter_total_score_per": 71.46,
      //                 "IMPROVEMENT IN FOOD RESOURCES": "chapter 5"
      //               },
      //               {
      //                 "chapter_total_score_per": 65.37,
      //                 "IS MATTER AROUND US PURE?": "chapter 6"
      //               },
      //               {
      //                 "chapter_total_score_per": 62.88,
      //                 "MATTER IN OUR SURROUNDINGS": "chapter 7"
      //               },
      //               {
      //                 "chapter_total_score_per": 62.61,
      //                 "MOTION": "chapter 8"
      //               },
      //               {
      //                 "chapter_total_score_per": 31.25,
      //                 "NATURAL RESOURCES": "chapter 9"
      //               },
      //               {
      //                 "chapter_total_score_per": 61.71,
      //                 "SOUND": "chapter 10"
      //               },
      //               {
      //                 "chapter_total_score_per": 62.5,
      //                 "STRUCTURE OF THE ATOM": "chapter 11"
      //               },
      //               {
      //                 "chapter_total_score_per": 79.47,
      //                 "THE FUNDAMENTAL UNIT OF LIFE": "chapter 12"
      //               },
      //               {
      //                 "chapter_total_score_per": 62.71,
      //                 "TISSUES": "chapter 13"
      //               },
      //               {
      //                 "chapter_total_score_per": 73.85,
      //                 "WHY DO WE FALL ILL?": "chapter 14"
      //               },
      //               {
      //                 "chapter_total_score_per": 49.68,
      //                 "WORK AND ENERGY": "chapter 15"
      //               }
      //             ]
      //           }
      //         },
      //         "FAA9A1F1-725A-4927-A657-49A73BB58A1C": {
      //           "chapter_wise_and_student_wise_performance_details": {
      //             "data": [
      //               {
      //                 "Name": "Aarti Shah",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 34.48,
      //                 "chapter 2": 39.62,
      //                 "chapter 3": 50,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 48.57,
      //                 "chapter 6": 41.76,
      //                 "chapter 7": 75,
      //                 "chapter 8": 46.67,
      //                 "chapter 9": 66.67,
      //                 "chapter 10": 50,
      //                 "chapter 11": 68.18,
      //                 "chapter 12": 33.33,
      //                 "chapter 13": 56.9,
      //                 "chapter 14": 46.67,
      //                 "chapter 15": 32.26,
      //                 "overall_score": 47.27
      //               },
      //               {
      //                 "Name": "Abhishek Tyagi",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 86.21,
      //                 "chapter 2": 91.51,
      //                 "chapter 3": 50,
      //                 "chapter 4": 100,
      //                 "chapter 5": 94.29,
      //                 "chapter 6": 91.21,
      //                 "chapter 7": 100,
      //                 "chapter 8": 83.33,
      //                 "chapter 9": 89.58,
      //                 "chapter 10": 100,
      //                 "chapter 11": 75,
      //                 "chapter 12": 66.67,
      //                 "chapter 13": 94.83,
      //                 "chapter 14": 90,
      //                 "chapter 15": 96.77,
      //                 "overall_score": 88.55
      //               },
      //               {
      //                 "Name": "Ajay Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 62.07,
      //                 "chapter 2": 69.81,
      //                 "chapter 3": 100,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 71.43,
      //                 "chapter 6": 63.74,
      //                 "chapter 7": 100,
      //                 "chapter 8": 83.33,
      //                 "chapter 9": 64.58,
      //                 "chapter 10": 50,
      //                 "chapter 11": 88.64,
      //                 "chapter 12": 75.76,
      //                 "chapter 13": 86.21,
      //                 "chapter 14": 83.33,
      //                 "chapter 15": 87.1,
      //                 "overall_score": 74.18
      //               },
      //               {
      //                 "Name": "Akansha Kapoor",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 48.28,
      //                 "chapter 2": 28.3,
      //                 "chapter 3": 100,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 54.29,
      //                 "chapter 6": 42.86,
      //                 "chapter 7": 100,
      //                 "chapter 8": 63.33,
      //                 "chapter 9": 62.5,
      //                 "chapter 10": 66.67,
      //                 "chapter 11": 45.45,
      //                 "chapter 12": 78.79,
      //                 "chapter 13": 62.07,
      //                 "chapter 14": 46.67,
      //                 "chapter 15": 61.29,
      //                 "overall_score": 50.55
      //               },
      //               {
      //                 "Name": "Akhil Sharma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 82.76,
      //                 "chapter 2": 51.89,
      //                 "chapter 3": 100,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 74.29,
      //                 "chapter 6": 75.82,
      //                 "chapter 7": 100,
      //                 "chapter 8": 86.67,
      //                 "chapter 9": 62.5,
      //                 "chapter 10": 66.67,
      //                 "chapter 11": 79.55,
      //                 "chapter 12": 81.82,
      //                 "chapter 13": 65.52,
      //                 "chapter 14": 86.67,
      //                 "chapter 15": 83.87,
      //                 "overall_score": 71.64
      //               },
      //               {
      //                 "Name": "Akhilesh Pandey",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 27.59,
      //                 "chapter 2": 40.57,
      //                 "chapter 3": 100,
      //                 "chapter 4": 33.33,
      //                 "chapter 5": 54.29,
      //                 "chapter 6": 41.76,
      //                 "chapter 7": 100,
      //                 "chapter 8": 76.67,
      //                 "chapter 9": 68.75,
      //                 "chapter 10": 66.67,
      //                 "chapter 11": 56.82,
      //                 "chapter 12": 39.39,
      //                 "chapter 13": 24.14,
      //                 "chapter 14": 46.67,
      //                 "chapter 15": 70.97,
      //                 "overall_score": 47.82
      //               },
      //               {
      //                 "Name": "Aliya Khan",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 37.93,
      //                 "chapter 2": 43.4,
      //                 "chapter 3": 100,
      //                 "chapter 4": 33.33,
      //                 "chapter 5": 48.57,
      //                 "chapter 6": 41.76,
      //                 "chapter 7": 100,
      //                 "chapter 8": 46.67,
      //                 "chapter 9": 54.17,
      //                 "chapter 10": 83.33,
      //                 "chapter 11": 59.09,
      //                 "chapter 12": 42.42,
      //                 "chapter 13": 56.9,
      //                 "chapter 14": 26.67,
      //                 "chapter 15": 38.71,
      //                 "overall_score": 46.73
      //               },
      //               {
      //                 "Name": "Aman Chouhan",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 41.38,
      //                 "chapter 2": 32.08,
      //                 "chapter 3": 100,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 51.43,
      //                 "chapter 6": 46.15,
      //                 "chapter 7": 75,
      //                 "chapter 8": 53.33,
      //                 "chapter 9": 79.17,
      //                 "chapter 10": 66.67,
      //                 "chapter 11": 56.82,
      //                 "chapter 12": 75.76,
      //                 "chapter 13": 34.48,
      //                 "chapter 14": 33.33,
      //                 "chapter 15": 61.29,
      //                 "overall_score": 49.09
      //               },
      //               {
      //                 "Name": "Amit Verma",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 62.07,
      //                 "chapter 2": 70.75,
      //                 "chapter 3": 100,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 68.57,
      //                 "chapter 6": 74.73,
      //                 "chapter 7": 100,
      //                 "chapter 8": 76.67,
      //                 "chapter 9": 60.42,
      //                 "chapter 10": 83.33,
      //                 "chapter 11": 59.09,
      //                 "chapter 12": 84.85,
      //                 "chapter 13": 74.14,
      //                 "chapter 14": 53.33,
      //                 "chapter 15": 77.42,
      //                 "overall_score": 70.36
      //               },
      //               {
      //                 "Name": "Sonam Gupta",
      //                 "ProfileImageLink": "",
      //                 "chapter 1": 96.55,
      //                 "chapter 2": 98.11,
      //                 "chapter 3": 100,
      //                 "chapter 4": 66.67,
      //                 "chapter 5": 94.29,
      //                 "chapter 6": 92.31,
      //                 "chapter 7": 100,
      //                 "chapter 8": 96.67,
      //                 "chapter 9": 100,
      //                 "chapter 10": 83.33,
      //                 "chapter 11": 90.91,
      //                 "chapter 12": 93.94,
      //                 "chapter 13": 84.48,
      //                 "chapter 14": 93.33,
      //                 "chapter 15": 96.77,
      //                 "overall_score": 94
      //               }
      //             ],
      //             "chapter_names": [
      //               {
      //                 "chapter_total_score_per": 57.93,
      //                 "AREAS OF PARALLELOGRAMS AND TRIANGLES": "chapter 1"
      //               },
      //               {
      //                 "chapter_total_score_per": 56.6,
      //                 "CIRCLES": "chapter 2"
      //               },
      //               {
      //                 "chapter_total_score_per": 90,
      //                 "CONSTRUCTIONS": "chapter 3"
      //               },
      //               {
      //                 "chapter_total_score_per": 63.33,
      //                 "COORDINATE GEOMETRY": "chapter 4"
      //               },
      //               {
      //                 "chapter_total_score_per": 66,
      //                 "HERON’S FORMULA": "chapter 5"
      //               },
      //               {
      //                 "chapter_total_score_per": 61.21,
      //                 "INTRODUCTION TO EUCLID’S GEOMETRY": "chapter 6"
      //               },
      //               {
      //                 "chapter_total_score_per": 95,
      //                 "LINEAR EQUATIONS IN TWO VARIABLES ": "chapter 7"
      //               },
      //               {
      //                 "chapter_total_score_per": 71.33,
      //                 "LINES AND ANGLES": "chapter 8"
      //               },
      //               {
      //                 "chapter_total_score_per": 70.83,
      //                 "NUMBER SYSTEMS": "chapter 9"
      //               },
      //               {
      //                 "chapter_total_score_per": 71.67,
      //                 "POLYNOMIALS": "chapter 10"
      //               },
      //               {
      //                 "chapter_total_score_per": 67.95,
      //                 "PROBABILITY": "chapter 11"
      //               },
      //               {
      //                 "chapter_total_score_per": 67.27,
      //                 "QUADRILATERALS": "chapter 12"
      //               },
      //               {
      //                 "chapter_total_score_per": 63.97,
      //                 "STATISTICS": "chapter 13"
      //               },
      //               {
      //                 "chapter_total_score_per": 60.67,
      //                 "SURFACE AREAS AND VOLUMES": "chapter 14"
      //               },
      //               {
      //                 "chapter_total_score_per": 70.65,
      //                 "TRIANGLES": "chapter 15"
      //               }
      //             ]
      //           }
      //         }
      //       }
      //     }
      //   },
      //   "class_performance_details": {
      //     "01E5ACFD-0E91-422B-9B3A-345F48D26E91": {
      //       "5002CEA9-13D2-4E13-B8A3-61AFC3363A69": {
      //         "class_performance_details": {
      //           "overall_details": {
      //             "total_students": 10,
      //             "total_girls": 5,
      //             "total_boys": 5,
      //             "total_subjects": 3,
      //             "subject_list": [
      //               "MATHEMATICS",
      //               "SCIENCE",
      //               "SOCIAL STUDIES"
      //             ],
      //             "avg_score_per": 69.04,
      //             "girls_score_per": 74.45,
      //             "boys_score_per": 63.62,
      //             "data": [
      //               {
      //                 "SubjectName": "MATHEMATICS",
      //                 "SubjectTeacher": "Teacher Maths",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "course_completed": 93.75,
      //                 "assessment_taken": 10,
      //                 "avg_attendance": 100,
      //                 "avg_score": 69.11,
      //                 "highest_score": 96.55,
      //                 "Topper": "Deepanshi Satija",
      //                 "TopperProfileImageLink": "",
      //                 "lowest_score": 52.36
      //               },
      //               {
      //                 "SubjectName": "SCIENCE",
      //                 "SubjectTeacher": "Teacher Science",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "course_completed": 94.12,
      //                 "assessment_taken": 10,
      //                 "avg_attendance": 100,
      //                 "avg_score": 69.91,
      //                 "highest_score": 95.09,
      //                 "Topper": "Deepanshi Satija",
      //                 "TopperProfileImageLink": "",
      //                 "lowest_score": 53.82
      //               },
      //               {
      //                 "SubjectName": "SOCIAL STUDIES",
      //                 "SubjectTeacher": "Teacher SocialScience",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "course_completed": 80.65,
      //                 "assessment_taken": 10,
      //                 "avg_attendance": 100,
      //                 "avg_score": 68.09,
      //                 "highest_score": 93.1,
      //                 "Topper": "Trapti Akhtar",
      //                 "TopperProfileImageLink": "",
      //                 "lowest_score": 52.09
      //               }
      //             ]
      //           },
      //           "class_level_subject_detailed_view": {
      //             "subject_data": [
      //               {
      //                 "SubjectName": "MATHEMATICS",
      //                 "SubjectTeacher": "Teacher Maths",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "assessment_taken": 10,
      //                 "avg_score": 69.11,
      //                 "Topper": "Deepanshi Satija",
      //                 "TopperProfileImageLink": "",
      //                 "highest_score": 96.55
      //               },
      //               {
      //                 "SubjectName": "SCIENCE",
      //                 "SubjectTeacher": "Teacher Science",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "assessment_taken": 10,
      //                 "avg_score": 69.91,
      //                 "Topper": "Deepanshi Satija",
      //                 "TopperProfileImageLink": "",
      //                 "highest_score": 95.09
      //               },
      //               {
      //                 "SubjectName": "SOCIAL STUDIES",
      //                 "SubjectTeacher": "Teacher SocialScience",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "assessment_taken": 10,
      //                 "avg_score": 68.09,
      //                 "Topper": "Trapti Akhtar",
      //                 "TopperProfileImageLink": "",
      //                 "highest_score": 93.1
      //               }
      //             ],
      //             "student_data": [
      //               {
      //                 "Name": "Anurag Roy",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 77.64,
      //                 "SCIENCE": 78.18,
      //                 "SOCIAL STUDIES": 75.5,
      //                 "overall_score": 77.1,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Ashutosh Sahoo",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 55.82,
      //                 "SCIENCE": 53.82,
      //                 "SOCIAL STUDIES": 56.26,
      //                 "overall_score": 55.3,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Ayush Verma",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 54.73,
      //                 "SCIENCE": 57.09,
      //                 "SOCIAL STUDIES": 53.54,
      //                 "overall_score": 55.12,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Babli Jagdale",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 76,
      //                 "SCIENCE": 75.64,
      //                 "SOCIAL STUDIES": 76.04,
      //                 "overall_score": 75.89,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Deepak Sharma",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 54.36,
      //                 "SCIENCE": 55.82,
      //                 "SOCIAL STUDIES": 54.26,
      //                 "overall_score": 54.82,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Deepali Rana",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 76.18,
      //                 "SCIENCE": 76.36,
      //                 "SOCIAL STUDIES": 74.77,
      //                 "overall_score": 75.77,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Deepanshi Satija",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 96.55,
      //                 "SCIENCE": 95.09,
      //                 "SOCIAL STUDIES": 92.38,
      //                 "overall_score": 94.67,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Rajkumari Ahirwa",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 52.36,
      //                 "SCIENCE": 55.64,
      //                 "SOCIAL STUDIES": 52.09,
      //                 "overall_score": 53.36,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Sonu Yadav",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 54.36,
      //                 "SCIENCE": 57.64,
      //                 "SOCIAL STUDIES": 52.99,
      //                 "overall_score": 55,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Trapti Akhtar",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 93.09,
      //                 "SCIENCE": 93.82,
      //                 "SOCIAL STUDIES": 93.1,
      //                 "overall_score": 93.34,
      //                 "result_status": "First Division"
      //               }
      //             ]
      //           }
      //         }
      //       }
      //     },
      //     "6BFAE0FC-78B2-4EC3-8BCB-75138CD2AB8E": {
      //       "AD659800-6528-4E10-9D57-736A94AFB6F8": {
      //         "class_performance_details": {
      //           "overall_details": {
      //             "total_students": 10,
      //             "total_girls": 4,
      //             "total_boys": 6,
      //             "total_subjects": 3,
      //             "subject_list": [
      //               "SOCIAL STUDIES",
      //               "SCIENCE",
      //               "MATHEMATICS"
      //             ],
      //             "avg_score_per": 64.35,
      //             "girls_score_per": 60.53,
      //             "boys_score_per": 66.9,
      //             "data": [
      //               {
      //                 "SubjectName": "MATHEMATICS",
      //                 "SubjectTeacher": "Teacher Maths",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "course_completed": 100,
      //                 "assessment_taken": 10,
      //                 "avg_attendance": 100,
      //                 "avg_score": 64.02,
      //                 "highest_score": 94,
      //                 "Topper": "Sonam Gupta",
      //                 "TopperProfileImageLink": "",
      //                 "lowest_score": 46.73
      //               },
      //               {
      //                 "SubjectName": "SCIENCE",
      //                 "SubjectTeacher": "Teacher Science",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "course_completed": 100,
      //                 "assessment_taken": 10,
      //                 "avg_attendance": 100,
      //                 "avg_score": 63.95,
      //                 "highest_score": 94.55,
      //                 "Topper": "Sonam Gupta",
      //                 "TopperProfileImageLink": "",
      //                 "lowest_score": 46.18
      //               },
      //               {
      //                 "SubjectName": "SOCIAL STUDIES",
      //                 "SubjectTeacher": "Teacher SocialScience",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "course_completed": 83.33,
      //                 "assessment_taken": 10,
      //                 "avg_attendance": 100,
      //                 "avg_score": 65.09,
      //                 "highest_score": 94,
      //                 "Topper": "Abhishek Tyagi",
      //                 "TopperProfileImageLink": "",
      //                 "lowest_score": 48.36
      //               }
      //             ]
      //           },
      //           "class_level_subject_detailed_view": {
      //             "subject_data": [
      //               {
      //                 "SubjectName": "MATHEMATICS",
      //                 "SubjectTeacher": "Teacher Maths",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "assessment_taken": 10,
      //                 "avg_score": 64.02,
      //                 "Topper": "Sonam Gupta",
      //                 "TopperProfileImageLink": "",
      //                 "highest_score": 94
      //               },
      //               {
      //                 "SubjectName": "SCIENCE",
      //                 "SubjectTeacher": "Teacher Science",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "assessment_taken": 10,
      //                 "avg_score": 63.95,
      //                 "Topper": "Sonam Gupta",
      //                 "TopperProfileImageLink": "",
      //                 "highest_score": 94.55
      //               },
      //               {
      //                 "SubjectName": "SOCIAL STUDIES",
      //                 "SubjectTeacher": "Teacher SocialScience",
      //                 "SubjectTeacherProfileImageLink": "",
      //                 "assessment_taken": 10,
      //                 "avg_score": 65.09,
      //                 "Topper": "Abhishek Tyagi",
      //                 "TopperProfileImageLink": "",
      //                 "highest_score": 94
      //               }
      //             ],
      //             "student_data": [
      //               {
      //                 "Name": "Aarti Shah",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 47.27,
      //                 "SCIENCE": 52.36,
      //                 "SOCIAL STUDIES": 53.09,
      //                 "overall_score": 50.91,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Abhishek Tyagi",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 88.55,
      //                 "SCIENCE": 87.27,
      //                 "SOCIAL STUDIES": 94,
      //                 "overall_score": 89.94,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Ajay Sharma",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 74.18,
      //                 "SCIENCE": 71.82,
      //                 "SOCIAL STUDIES": 70.36,
      //                 "overall_score": 72.12,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Akansha Kapoor",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 50.55,
      //                 "SCIENCE": 51.82,
      //                 "SOCIAL STUDIES": 51.45,
      //                 "overall_score": 51.27,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Akhil Sharma",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 71.64,
      //                 "SCIENCE": 68.36,
      //                 "SOCIAL STUDIES": 71.64,
      //                 "overall_score": 70.55,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Akhilesh Pandey",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 47.82,
      //                 "SCIENCE": 49.82,
      //                 "SOCIAL STUDIES": 50.18,
      //                 "overall_score": 49.27,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Aliya Khan",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 46.73,
      //                 "SCIENCE": 46.18,
      //                 "SOCIAL STUDIES": 48.36,
      //                 "overall_score": 47.09,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Aman Chouhan",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 49.09,
      //                 "SCIENCE": 47.27,
      //                 "SOCIAL STUDIES": 49.09,
      //                 "overall_score": 48.48,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Amit Verma",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 70.36,
      //                 "SCIENCE": 70,
      //                 "SOCIAL STUDIES": 72.73,
      //                 "overall_score": 71.03,
      //                 "result_status": "First Division"
      //               },
      //               {
      //                 "Name": "Sonam Gupta",
      //                 "ProfileImageLink": "",
      //                 "MATHEMATICS": 94,
      //                 "SCIENCE": 94.55,
      //                 "SOCIAL STUDIES": 90,
      //                 "overall_score": 92.85,
      //                 "result_status": "First Division"
      //               }
      //             ]
      //           }
      //         }
      //       }
      //     }
      //   },
      //   "teacher_performance_overview": {
      //     "2E41C031-7C9A-4817-BFEB-9F2E6DD9F78B": {
      //       "teacher_name": "Teacher Maths",
      //       "teacher_profile": "",
      //       "subject_name": [
      //         "MATHEMATICS"
      //       ],
      //       "current_rank": "",
      //       "previous_rank": "",
      //       "academic_performance_view": {
      //         "class_and_subject_assigned": 2,
      //         "total_students": 20,
      //         "total_assessment": 20,
      //         "avg_attendance": 100,
      //         "avg_time": "",
      //         "avg_course_completed": 96.77,
      //         "avg_assessment_per_class": 1000,
      //         "avg_result": 66.56,
      //         "exam_difficulty_mix": 35.68,
      //         "exam_bloom_mix": 74,
      //         "data": [
      //           {
      //             "ClassID": "01E5ACFD-0E91-422B-9B3A-345F48D26E91",
      //             "ClassName": "10TH",
      //             "SectionID": "5002CEA9-13D2-4E13-B8A3-61AFC3363A69",
      //             "SectionName": "A",
      //             "SubjectID": "59247381-E7FE-42B9-838E-5AAA5EE59A88",
      //             "SubjectName": "MATHEMATICS",
      //             "course_completed": 48.39,
      //             "assessment_taken": 10,
      //             "result_percentage": 69.11,
      //             "avg_attendance": 100
      //           },
      //           {
      //             "ClassID": "6BFAE0FC-78B2-4EC3-8BCB-75138CD2AB8E",
      //             "ClassName": "9TH",
      //             "SectionID": "AD659800-6528-4E10-9D57-736A94AFB6F8",
      //             "SectionName": "A",
      //             "SubjectID": "FAA9A1F1-725A-4927-A657-49A73BB58A1C",
      //             "SubjectName": "MATHEMATICS",
      //             "course_completed": "NaN",
      //             "assessment_taken": 10,
      //             "result_percentage": 64.02,
      //             "avg_attendance": 100
      //           }
      //         ]
      //       },
      //       "cognitive_performance_view": {
      //         "student_base": 20,
      //         "avg_score": 66.56,
      //         "lots_avg_score": 26,
      //         "hots_avg_score": 74,
      //         "data": [
      //           {
      //             "ClassID": "01E5ACFD-0E91-422B-9B3A-345F48D26E91",
      //             "ClassName": "10TH",
      //             "SectionID": "5002CEA9-13D2-4E13-B8A3-61AFC3363A69",
      //             "SectionName": "A",
      //             "SubjectID": "59247381-E7FE-42B9-838E-5AAA5EE59A88",
      //             "SubjectName": "MATHEMATICS",
      //             "assessment_taken": 10,
      //             "result_percentage": 69.11,
      //             "ANALYSIS": 67.35,
      //             "APPLICATION": 78.96,
      //             "CREATING": 95,
      //             "EVALUATION": 70,
      //             "REMEMBERING": 68.04,
      //             "UNDERSTANDING": "NaN"
      //           },
      //           {
      //             "ClassID": "6BFAE0FC-78B2-4EC3-8BCB-75138CD2AB8E",
      //             "ClassName": "9TH",
      //             "SectionID": "AD659800-6528-4E10-9D57-736A94AFB6F8",
      //             "SectionName": "A",
      //             "SubjectID": "FAA9A1F1-725A-4927-A657-49A73BB58A1C",
      //             "SubjectName": "MATHEMATICS",
      //             "assessment_taken": 10,
      //             "result_percentage": 64.02,
      //             "ANALYSIS": 57.93,
      //             "APPLICATION": 60.16,
      //             "CREATING": 75,
      //             "EVALUATION": 68.42,
      //             "REMEMBERING": 70.48,
      //             "UNDERSTANDING": 68.42
      //           }
      //         ]
      //       }
      //     },
      //     "614FDD65-6F19-4B3E-AA7F-571014CFB1E3": {
      //       "teacher_name": "Teacher SocialScience",
      //       "teacher_profile": "",
      //       "subject_name": [
      //         "SOCIAL STUDIES"
      //       ],
      //       "current_rank": "",
      //       "previous_rank": "",
      //       "academic_performance_view": {
      //         "class_and_subject_assigned": 2,
      //         "total_students": 20,
      //         "total_assessment": 20,
      //         "avg_attendance": 100,
      //         "avg_time": "",
      //         "avg_course_completed": 81.82,
      //         "avg_assessment_per_class": 1000,
      //         "avg_result": 66.59,
      //         "exam_difficulty_mix": 0,
      //         "exam_bloom_mix": 0,
      //         "data": [
      //           {
      //             "ClassID": "01E5ACFD-0E91-422B-9B3A-345F48D26E91",
      //             "ClassName": "10TH",
      //             "SectionID": "5002CEA9-13D2-4E13-B8A3-61AFC3363A69",
      //             "SectionName": "A",
      //             "SubjectID": "99B9A8B9-F36A-4055-ACCF-32A09BCC7AC4",
      //             "SubjectName": "SOCIAL STUDIES",
      //             "course_completed": 45.45,
      //             "assessment_taken": 10,
      //             "result_percentage": 68.09,
      //             "avg_attendance": 100
      //           },
      //           {
      //             "ClassID": "6BFAE0FC-78B2-4EC3-8BCB-75138CD2AB8E",
      //             "ClassName": "9TH",
      //             "SectionID": "AD659800-6528-4E10-9D57-736A94AFB6F8",
      //             "SectionName": "A",
      //             "SubjectID": "628B0B65-E4B4-4902-887A-8A3F8E0BB223",
      //             "SubjectName": "SOCIAL STUDIES",
      //             "course_completed": "NaN",
      //             "assessment_taken": 10,
      //             "result_percentage": 65.09,
      //             "avg_attendance": 100
      //           }
      //         ]
      //       },
      //       "cognitive_performance_view": {
      //         "student_base": 20,
      //         "avg_score": 66.59,
      //         "lots_avg_score": 0,
      //         "hots_avg_score": 0,
      //         "data": [
      //           {
      //             "ClassID": "01E5ACFD-0E91-422B-9B3A-345F48D26E91",
      //             "ClassName": "10TH",
      //             "SectionID": "5002CEA9-13D2-4E13-B8A3-61AFC3363A69",
      //             "SectionName": "A",
      //             "SubjectID": "99B9A8B9-F36A-4055-ACCF-32A09BCC7AC4",
      //             "SubjectName": "SOCIAL STUDIES",
      //             "assessment_taken": 10,
      //             "result_percentage": 68.09,
      //             "ANALYSIS": 68.09
      //           },
      //           {
      //             "ClassID": "6BFAE0FC-78B2-4EC3-8BCB-75138CD2AB8E",
      //             "ClassName": "9TH",
      //             "SectionID": "AD659800-6528-4E10-9D57-736A94AFB6F8",
      //             "SectionName": "A",
      //             "SubjectID": "628B0B65-E4B4-4902-887A-8A3F8E0BB223",
      //             "SubjectName": "SOCIAL STUDIES",
      //             "assessment_taken": 10,
      //             "result_percentage": 65.09,
      //             "ANALYSIS": 65.09
      //           }
      //         ]
      //       }
      //     },
      //     "CC72A1AB-0EAE-42A8-A02F-8394563EC08A": {
      //       "teacher_name": "Teacher Science",
      //       "teacher_profile": "",
      //       "subject_name": [
      //         "SCIENCE"
      //       ],
      //       "current_rank": "",
      //       "previous_rank": "",
      //       "academic_performance_view": {
      //         "class_and_subject_assigned": 2,
      //         "total_students": 20,
      //         "total_assessment": 20,
      //         "avg_attendance": 100,
      //         "avg_time": "",
      //         "avg_course_completed": 96.88,
      //         "avg_assessment_per_class": 1000,
      //         "avg_result": 66.93,
      //         "exam_difficulty_mix": 54.67,
      //         "exam_bloom_mix": 84,
      //         "data": [
      //           {
      //             "ClassID": "01E5ACFD-0E91-422B-9B3A-345F48D26E91",
      //             "ClassName": "10TH",
      //             "SectionID": "5002CEA9-13D2-4E13-B8A3-61AFC3363A69",
      //             "SectionName": "A",
      //             "SubjectID": "4CD58D10-FE73-43DF-88F0-7305E1D1BC4D",
      //             "SubjectName": "SCIENCE",
      //             "course_completed": 50,
      //             "assessment_taken": 10,
      //             "result_percentage": 69.91,
      //             "avg_attendance": 100
      //           },
      //           {
      //             "ClassID": "6BFAE0FC-78B2-4EC3-8BCB-75138CD2AB8E",
      //             "ClassName": "9TH",
      //             "SectionID": "AD659800-6528-4E10-9D57-736A94AFB6F8",
      //             "SectionName": "A",
      //             "SubjectID": "18FF90C8-1332-4388-97F1-1B60B05248BA",
      //             "SubjectName": "SCIENCE",
      //             "course_completed": "NaN",
      //             "assessment_taken": 10,
      //             "result_percentage": 63.95,
      //             "avg_attendance": 100
      //           }
      //         ]
      //       },
      //       "cognitive_performance_view": {
      //         "student_base": 20,
      //         "avg_score": 66.93,
      //         "lots_avg_score": 16,
      //         "hots_avg_score": 84,
      //         "data": [
      //           {
      //             "ClassID": "01E5ACFD-0E91-422B-9B3A-345F48D26E91",
      //             "ClassName": "10TH",
      //             "SectionID": "5002CEA9-13D2-4E13-B8A3-61AFC3363A69",
      //             "SectionName": "A",
      //             "SubjectID": "4CD58D10-FE73-43DF-88F0-7305E1D1BC4D",
      //             "SubjectName": "SCIENCE",
      //             "assessment_taken": 10,
      //             "result_percentage": 69.91,
      //             "ANALYSIS": 74.33,
      //             "APPLICATION": 68.43,
      //             "CREATING": 65.53,
      //             "EVALUATION": 65,
      //             "REMEMBERING": 68,
      //             "UNDERSTANDING": 67.84
      //           },
      //           {
      //             "ClassID": "6BFAE0FC-78B2-4EC3-8BCB-75138CD2AB8E",
      //             "ClassName": "9TH",
      //             "SectionID": "AD659800-6528-4E10-9D57-736A94AFB6F8",
      //             "SectionName": "A",
      //             "SubjectID": "18FF90C8-1332-4388-97F1-1B60B05248BA",
      //             "SubjectName": "SCIENCE",
      //             "assessment_taken": 10,
      //             "result_percentage": 63.95,
      //             "ANALYSIS": 64.01,
      //             "APPLICATION": "NaN",
      //             "CREATING": "NaN",
      //             "EVALUATION": "NaN",
      //             "REMEMBERING": "NaN",
      //             "UNDERSTANDING": 30
      //           }
      //         ]
      //       }
      //     }
      //   }
      // }
      // console.log(jsonDahdata);
      // this.sharedService.setDashboardData(jsonDahdata);
      // this.sharedService.setDashboardDataObservable(jsonDahdata);
  }

  getDashboardData() {
    let schoolprofile = JSON.parse(localStorage.getItem('schoolProfile'));  
    this.AcademicyearsId = schoolprofile.AcademicYearID;

    let params = {
      "InstituteId": localStorage.getItem("InstituteID"),
      "AcademicYearId": this.AcademicyearsId
    };

    this.sharedService.getDashboardData(params).subscribe(res=>{
      this.sharedService.setDashboardData(res);
      this.sharedService.setDashboardDataObservable(res);
    }, error=>{
      this.toastr.error(error.error['message']);
    })
  }
    

  getpractical(){
    this.prgaugeType = "full";
    this.prgaugeValue = 42;
    this.prgaugeLabel = "AVERAGE SCORE";
    this.prgaugeAppendText = "%";
    this.prgaugeForegroundColor ="#01CA85";
    this.prbackgdcolor ="#e6fff6";
  }
  gettheroritical(){
    this.thgaugeType = "full";
    this.thgaugeValue = 43;
    this.thgaugeLabel = "AVERAGE SCORE";
    this.thgaugeAppendText = "%";
    this.thgaugeForegroundColor ="#7357CD";
    this.thbackgdcolor= "#efebf9";
  }
  getlanguage(){
    this.lagaugeType = "full";
    this.lagaugeValue = 50;
    this.lagaugeLabel = "AVERAGE SCORE";
    this.lagaugeAppendText = "%";
    this.lagaugeForegroundColor = "#00B3FF";
    this.labackgdcolor = "#e6f7ff";
  }

  getcognitiveLevel(){
    this.cognitivegaugeType = "full";
    this.cognitivegaugeValue = 59;
    this.cognitivegaugeForm = 12;
    this.cognitivegaugeAppendText = "";
    this.cognitivegaugeForegroundColor ="#01CA85";
    this.cognitivebackgdcolor= "#7357CD";
  }
  getcourseRep(){
    this.coursegaugeType = "full";
    this.coursegaugeValue = 44;
    this.coursegaugeForm = 12;
    this.coursegaugeAppendText = "";
    this.coursegaugeForegroundColor = "#01CA85";
    this.coursebackgdcolor = "#e6fff6";
  }

  onediv(){
    this.onedivgaugeType="full";
    this.onedivgaugeValue= 29;
    this.onedivgaugeAppendText="%";
    this.onedivgaugethick= 9;
    this.onedivgaugeForegroundColor="#2757E9";
    this.onedivbackgdcolor="#d1dbfa";
  }
  twodiv(){
    this.twodivgaugeType="full";
    this.twodivgaugeValue= 60;
    this.twodivgaugeLabel="%";
    this.twodivgaugeAppendthick= 9;
    this.twodivgaugeForegroundColor="#00B3FF";
    this.twodivbackgdcolor="#ccf0ff";
  }
  threediv(){
    this.thirddivgaugeType="full";
    this.thirddivgaugeValue= 45;
    this.thirddivgaugeLabel="%";
    this.thirddivgaugeAppendthick= 9;
    this.thirddivgaugeForegroundColor="#967CD6";
    this.thirddivbackgdcolor="#e0d8f3";
  }
  fourdiv(){
    this.fourdivgaugeType="full";
    this.fourdivgaugeValue= 34;
    this.fourdivgaugeLabel="%";
    this.fourdivgaugeAppendText= 9;
    this.fourdivgaugeForegroundColor="#ED3838";
    this.fourdivbackgdcolor="#fbd0d0";
  }


}
