import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { AddWingService } from '../../wing-setup/add-wing/add-wing.service';
import { AddStudentService } from '../../add-student-manually/add-student/add-student.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as _ from 'underscore';
import { TemplateService } from '../../template-setup/template.service';
import { AcademicYearService } from '../../academic-year/academic-year.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { elementClassProp } from '@angular/core/src/render3';
import { ModalDirective, BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-report-student',
  templateUrl: './report-student.component.html',
  styleUrls: ['./report-student.component.scss']
})
export class ReportStudentComponent implements OnInit {

  @ViewChild('specific_student1') specificStudent1: ModalDirective;
  classes: any = [];
  sectionList: any = [];
  subjects: any = [];
  students: any = [];
  studentFilterObj: any = {};
  academicYearsID: any = "";
  ChapterandTopicAnalysisData = [];
  ChapterandTopicAnalysisDataAPI = [];
  questionDetailAPI = [];
  ChapterName: any;
  ExamGroupsAPI: any = [];
  examsAPI: any = [];
  ExamGroups: any = [];
  ClassTestList: any = [];
  ExamsList: any = [];
  preparedChapAnaDataList: any = [];
  noDataFound: boolean = true;
  examTypes: any = [];
  exams: any = [];
  tests: any = [];
  totalTestExam: any = [];
  academicList: any = [];

  constructor(private sharedService: SharedDataService,
    private addWingService: AddWingService,
    private addStudentService: AddStudentService,
    private templateService: TemplateService,
    private academicYearService: AcademicYearService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getInstituteDDLClass();
    this.getAcademicYears();
    //  this.getReportData()

    // let  APIres= {
    //   "data": {
    //     "chapter_analysis_data": [
    //       {
    //         "chapter_name": "NO CHAPTER",
    //         "exam_group": [
    //           {
    //             "name": "Class Test",
    //             "test_details": [
    //               {
    //                 "test_name": "Class Test 1",
    //                 "test_percent": 50,
    //                 "total_marks": 6,
    //                 "date_formated": "2021-01-04",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 17",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two friends Seema and Aditya work in the same office at Delhi. In the Christmas vacations, both decided to go to their hometowns represented by Town A and Town B respectively in the figure given below. Town A and Town B are connected by trains from the same station C (in the given figure)in Delhi.Based on the given situation, answer the following questions:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><img alt=\"\" src=\"http://devportal.oyeexams.com/ckfinder/userfiles/images/CBSE_Board_Sample_Paper/10th_Class/Mathmatics/2020/Sample_Question_Paper/QUE_31.png\" style=\"height:100%; width:100%\"></span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type: lower-roman;\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Who will travel more distance, Seema or Aditya, to reach to their hometown?</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Seema and Aditya planned to meet at a location D situated at a point D represented by the mid-point of the line joining the points represented by Town A and Town B. Find the coordinates of the point represented by the point D</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Find the area of the triangle formed by joining the points represented by A, B and C.</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 0,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 18",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">A TV reporter was given a task to prepare a report on the rainfall of the city Dispur of India in a particular year. After collecting the data, he analyzed the data and prepared a report on the rainfall of the city. Using this report, he drew the following graph for a particular time period of 66 days</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><img alt=\"\" src=\"http://devportal.oyeexams.com/ckfinder/userfiles/images/CBSE_Board_Sample_Paper/10th_Class/Mathmatics/2020/Sample_Question_Paper/QUE_34.png\" style=\"height:100%; width:100%\"></span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Based on the above graph, answer the following questions:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type: lower-roman;\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Identify less than type ogive and more than type ogive from the given graph.</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Find the median rainfall of Dispur.</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Obtain the Mode of the data if mean rainfall is 23.4cm.</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 3,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Half Yearly exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Half Yearly 2",
    //                 "test_percent": 0,
    //                 "total_marks": 2,
    //                 "date_formated": "2020-10-05",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 16",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Three coins are tossed. What is the probability of getting two heads.</span></span></p>\r\n",
    //                     "Marks": 0,
    //                     "Total_marks": 2,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               },
    //               {
    //                 "test_name": "Half Yearly Exam 1",
    //                 "test_percent": 0,
    //                 "total_marks": 4,
    //                 "date_formated": "2020-09-07",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 16",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">A container opened at the top and made up of a metal sheet, is in the form of a frustum of a cone of height 16cm&nbsp;with radii of its lower and upper ends as 8cm and 20cm respectively. Find the cost of milk which can completely fill&nbsp;the container, at the rate of Rs. 50 per litre. Also find the cost of metal sheet used to make the container, if it costs Rs. 10 per 100cm<sup>2</sup>.&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\((\\)</span></span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\">&nbsp;Take&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(\\pi=3.14)\\)</span></span></span></p>\r\n",
    //                     "Marks": 0,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Unit Test",
    //             "test_details": [
    //               {
    //                 "test_name": "\"",
    //                 "test_percent": 66.66666666666667,
    //                 "total_marks": 9,
    //                 "date_formated": "2021-03-01",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 4",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two friends Seema and Aditya work in the same office at Delhi. In the Christmas vacations, both decided to go to their hometowns represented by Town A and Town B respectively in the figure given below. Town A and Town B are connected by trains from the same station C (in the given figure)in Delhi.Based on the given situation, answer the following questions:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><img alt=\"\" src=\"http://devportal.oyeexams.com/ckfinder/userfiles/images/CBSE_Board_Sample_Paper/10th_Class/Mathmatics/2020/Sample_Question_Paper/QUE_31.png\" style=\"height:100%; width:100%\"></span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type: lower-roman;\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Who will travel more distance, Seema or Aditya, to reach to their hometown?</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Seema and Aditya planned to meet at a location D situated at a point D represented by the mid-point of the line joining the points represented by Town A and Town B. Find the coordinates of the point represented by the point D</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Find the area of the triangle formed by joining the points represented by A, B and C.</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 0,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 5",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Prove that the sum of the squares of the sides of a rhombus is equal to the sum of the squares of its diagonals.</span></span></p>\r\n",
    //                     "Marks": 3,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 6",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Find the value of p for which the points (-5, 1), (1, p) and (4, -2) are collinear.</span></span></p>\r\n",
    //                     "Marks": 3,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Annual Exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Annual 2",
    //                 "test_percent": 100,
    //                 "total_marks": 6,
    //                 "date_formated": "2020-12-01",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 34",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Three coins are tossed. What is the probability of getting two heads.</span></span></p>\r\n",
    //                     "Marks": 2,
    //                     "Total_marks": 2,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 36",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">A container opened at the top and made up of a metal sheet, is in the form of a frustum of a cone of height 16cm&nbsp;with radii of its lower and upper ends as 8cm and 20cm respectively. Find the cost of milk which can completely fill&nbsp;the container, at the rate of Rs. 50 per litre. Also find the cost of metal sheet used to make the container, if it costs Rs. 10 per 100cm<sup>2</sup>.&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\((\\)</span></span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\">&nbsp;Take&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(\\pi=3.14)\\)</span></span></span></p>\r\n",
    //                     "Marks": 4,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Quarterly Exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Quarterly Exam 1",
    //                 "test_percent": 78.78787878787878,
    //                 "total_marks": 33,
    //                 "date_formated": "2020-07-01",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 11",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">A train covers a distance of 360km at a uniform speed. Had the speed been 5km/ hour more, it would have taken 48 minutes less for the journey. Find the original speed of the train.</span></span></p>\r\n",
    //                     "Marks": 4,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 12",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Prove that in a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.</span></span></p>\r\n",
    //                     "Marks": 4,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 13",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">The table below show the daily expenditure on food of 25 households in a locality. Find the mean daily expenditure on food.</span></span></p>\r\n\r\n<table border=\"2\" cellpadding=\"0\" cellspacing=\"0\" style=\"height:100%; width:100%\">\r\n\t<tbody>\r\n\t\t<tr>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><strong>Daily expenditure (in ₹):</strong></span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">100-150</span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">150-200</span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">200-250</span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">250-300</span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">300-350</span></span></td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><strong>Number of households:</strong></span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">4</span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">5</span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">12</span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">2</span></span></td>\r\n\t\t\t<td style=\"text-align:center; vertical-align:top\"><span style=\"font-size:14px\"><span style=\"font-family:verdana\">2</span></span></td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n",
    //                     "Marks": 4,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 14",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">If a line is drawn parallel to one side of a triangle to intersect the other two sides in distinct points, prove that the other two sides are divided in the same ratio.</span></span></p>\r\n",
    //                     "Marks": 4,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 15",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Solve for x:&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(\\frac{1}{(2\\text{a+ b + 2x})}=\\frac{1}{(2\\text{a})}+\\frac{1}{(\\text{b})}+\\frac{1}{(2\\text{x})}\\)</span></span></span></p>\r\n",
    //                     "Marks": 4,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 16",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Three coins are tossed. What is the probability of getting two heads.</span></span></p>\r\n",
    //                     "Marks": 2,
    //                     "Total_marks": 2,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 17",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">In&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(\\triangle\\text{ABC},\\text{AD}\\perp\\text{BC}.\\)</span></span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\">&nbsp;Prove that.</span></span></p>\r\n\r\n<p><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(\\text{AC}^2=\\text{AB}^2+\\text{BC}^2-2\\text{BC}\\times\\text{BD}\\)</span></span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><img alt=\"\" src=\"http://devportal.oyeexams.com/ckfinder/userfiles/images/Class_10th/Mathematics/2019/30_4_2_Paper_Set/Que_26.png\" style=\"height:100%; width:100%\"></span></span></p>\r\n",
    //                     "Marks": 4,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 18",
    //                     "QuestionDescription": "<p><span style=\"font-family:verdana\"><span style=\"font-size:14px\">Construct a triangle ABC with side BC = 6cm, </span><span style=\"font-size:18px\"><span class=\"equation\">\\(\\angle\\text{B}=45^{\\circ},\\angle\\text{A}=105^{\\circ}.\\)</span></span><span style=\"font-size:14px\"> Then construct another triangle whose sides are&nbsp;</span><span style=\"font-size:18px\"><span class=\"equation\">\\(\\frac{3}{4}\\)</span></span><span style=\"font-size:14px\"> times the corresponding sides of the </span><span style=\"font-size:18px\"><span class=\"equation\">\\(\\triangle\\text{ABC}.\\)</span></span></span></p>\r\n",
    //                     "Marks": 4,
    //                     "Total_marks": 4,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 19",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two friends Seema and Aditya work in the same office at Delhi. In the Christmas vacations, both decided to go to their hometowns represented by Town A and Town B respectively in the figure given below. Town A and Town B are connected by trains from the same station C (in the given figure)in Delhi.Based on the given situation, answer the following questions:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><img alt=\"\" src=\"http://devportal.oyeexams.com/ckfinder/userfiles/images/CBSE_Board_Sample_Paper/10th_Class/Mathmatics/2020/Sample_Question_Paper/QUE_31.png\" style=\"height:100%; width:100%\"></span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type: lower-roman;\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Who will travel more distance, Seema or Aditya, to reach to their hometown?</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Seema and Aditya planned to meet at a location D situated at a point D represented by the mid-point of the line joining the points represented by Town A and Town B. Find the coordinates of the point represented by the point D</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Find the area of the triangle formed by joining the points represented by A, B and C.</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 3,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "chapter_name": "TRIANGLES",
    //         "exam_group": [
    //           {
    //             "name": "Class Test",
    //             "test_details": [
    //               {
    //                 "test_name": "Class Test 1",
    //                 "test_percent": 76.92307692307692,
    //                 "total_marks": 13,
    //                 "date_formated": "2021-01-04",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 10",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All circles are ......... (congruent, similar).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 11",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 12",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Any two similar figures are congruent.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 13",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of each of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their&nbsp;corresponding sides are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 14",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Any two&nbsp;congruent&nbsp;figures are similar.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 15",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding sides are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 16",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">State Pythagoras theorem and its converse.</span></span></p>\r\n",
    //                     "Marks": 3,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "MEDIUM"
    //                   },
    //                   {
    //                     "QueNumber": "Q 6",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons of the same number of sides are similar, if (a) their corresponding angles are and (b) their corresponding sides are ........... (equal, proportional).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 7",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All squares are ........ (similar, congruent).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 8",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding sides are ........... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 9",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding angles are .......... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               },
    //               {
    //                 "test_name": "Class Test 2",
    //                 "test_percent": 100,
    //                 "total_marks": 10,
    //                 "date_formated": "2021-02-01",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 10",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All .......... triangles are similar (isosceles, equilateral).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 14",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding sides are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 15",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 18",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">If the area of two similar triangles are equal, prove that they are congruent.</span></span></p>\r\n",
    //                     "Marks": 3,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 6",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All circles are ......... (congruent, similar).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 7",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All squares are ........ (similar, congruent).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 8",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons of the same number of sides are similar, if (a) their corresponding angles are and (b) their corresponding sides are ........... (equal, proportional).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 9",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding angles are .......... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Annual Exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Annual 1",
    //                 "test_percent": 57.142857142857146,
    //                 "total_marks": 7,
    //                 "date_formated": "2020-11-09",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 10",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding angles are .......... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 13",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding sides are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 15",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 6",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons of the same number of sides are similar, if (a) their corresponding angles are and (b) their corresponding sides are ........... (equal, proportional).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 7",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All circles are ......... (congruent, similar).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 8",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All .......... triangles are similar (isosceles, equilateral).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 9",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding sides are ........... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               },
    //               {
    //                 "test_name": "Annual 2",
    //                 "test_percent": 80,
    //                 "total_marks": 10,
    //                 "date_formated": "2020-12-01",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 10",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons of the same number of sides are similar, if (a) their corresponding angles are and (b) their corresponding sides are ........... (equal, proportional).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 11",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 13",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 15",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding sides are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 18",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">state SAS similarity criterion.</span></span></p>\r\n",
    //                     "Marks": 2,
    //                     "Total_marks": 2,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 6",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding angles are .......... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 7",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All .......... triangles are similar (isosceles, equilateral).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 8",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All squares are ........ (similar, congruent).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 9",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All circles are ......... (congruent, similar).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Half Yearly exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Half Yearly 2",
    //                 "test_percent": 83.33333333333333,
    //                 "total_marks": 6,
    //                 "date_formated": "2020-10-05",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 10",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons of the same number of sides are similar, if (a) their corresponding angles are and (b) their corresponding sides are ........... (equal, proportional).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 14",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 6",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All .......... triangles are similar (isosceles, equilateral).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 7",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All circles are ......... (congruent, similar).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 8",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding angles are .......... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 9",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding sides are ........... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               },
    //               {
    //                 "test_name": "Half Yearly Exam 1",
    //                 "test_percent": 100,
    //                 "total_marks": 10,
    //                 "date_formated": "2020-09-07",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 10",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding angles are .......... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 11",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of each of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their&nbsp;corresponding sides are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 12",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 13",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding sides are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 14",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 15",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Any two similar figures are congruent.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 6",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All .......... triangles are similar (isosceles, equilateral).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 7",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding sides are ........... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 8",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons of the same number of sides are similar, if (a) their corresponding angles are and (b) their corresponding sides are ........... (equal, proportional).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 9",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All circles are ......... (congruent, similar).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Quarterly Exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Quarterly Exam 2",
    //                 "test_percent": 75,
    //                 "date_formated": "2020-08-03",
    //                 "total_marks": 8,
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 10",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All circles are ......... (congruent, similar).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 11",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Any two similar figures are congruent.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 12",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two polygons are similar, if their&nbsp;corresponding sides are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 15",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Write the truth value (T/F) of the following statements:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their&nbsp;corresponding angles are proportional.</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 6",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding sides are ........... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 7",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All squares are ........ (similar, congruent).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 8",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">All .......... triangles are similar (isosceles, equilateral).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 9",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Fill in the blanks using the correct word given in brackets:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Two triangles are similar, if their corresponding angles are .......... (proportional, equal).</span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "chapter_name": "SOME APPLICATIONS OF TRIGNOMETRY",
    //         "exam_group": [
    //           {
    //             "name": "Class Test",
    //             "test_details": [
    //               {
    //                 "test_name": "Class Test 1",
    //                 "test_percent": 0,
    //                 "date_formated": "2021-01-04",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 2",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">The tops of two poles of height 20m and 14m are connected by a wire. If the wire makes an angle of 30° with horizontal, then the length of the wire is:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type: lower-alpha;\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">12m</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">10m</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">8m</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">6m</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 0,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "APPLICATION",
    //                     "DifficultyLevelName": "MEDIUM"
    //                   },
    //                   {
    //                     "QueNumber": "Q 4",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">The height of the vertical pole is&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(\\sqrt{3}\\)</span></span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\"> times the length of its shadow on the ground, then angle of elevation of the sun at that time is:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type: lower-alpha;\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">30º</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">60º</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">45º</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">75º</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 0,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "REMEMBERING",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       },
    //       {
    //         "chapter_name": "AREAS RELATED TO CIRCLES",
    //         "exam_group": [
    //           {
    //             "name": "Class Test",
    //             "test_details": [
    //               {
    //                 "test_name": "Class Test 1",
    //                 "test_percent": 100,
    //                 "date_formated": "2021-01-04",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 1",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">The ratio of the outer and inner perimeters of a circular path is 23 : 22. If the path is 5 metres wide, the diameter of the inner circle is:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type:lower-alpha\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">55m</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">110m</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">220m</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">230m</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "MEDIUM"
    //                   },
    //                   {
    //                     "QueNumber": "Q 3",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">If the circumference of a circle and the perimeter of a square are equal, then:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type:lower-alpha\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Area of the circle = Area of the square.</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Area of the circle &lt; Area of the square.</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Area of the circle &gt; Area of the square.</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">Nothing definite can be said.</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 5",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">The radius of a wheel is 0.25m. The number of revolutions it will make to travel a distance of 11km will be:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type:lower-alpha\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">2800</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">4000</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">5500</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">7000</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "MEDIUM"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Half Yearly exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Half Yearly Exam 1",
    //                 "test_percent": 100,
    //                 "date_formated": "2020-09-07",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 5",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">If the perimeter of a sector of a circle of radius 6.5cm is 29cm, then its area is:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type:lower-alpha\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">58cm<sup>2</sup></span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">52cm<sup>2</sup></span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">25cm<sup>2</sup></span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">56cm<sup>2</sup></span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Unit Test",
    //             "test_details": [
    //               {
    //                 "test_name": "Unit Test 1",
    //                 "test_percent": 100,
    //                 "date_formated": "2021-03-01",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 7",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">In the following figure, the square&nbsp;ABCD&nbsp;is divided into five equal parts, all having same area. The central part is circular and the lines&nbsp;AE,&nbsp;GC,&nbsp;BF&nbsp;and&nbsp;HD&nbsp;lie along the diagonals&nbsp;AC&nbsp;and&nbsp;BD&nbsp;of the square. If&nbsp;AB&nbsp;= 22cm, find:</span></span></p>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">The perimeter of the part&nbsp;ABEF.</span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><img alt=\"\" src=\"http://devportal.oyeexams.com/ckfinder/userfiles/images/Class_10th/Mathematics/NCERT/Mathematics_R_D_Sharma/Chapter_13/Exercise_13_4/Que_17(2).png\" style=\"height:100%; width:100%\"></span></span></p>\r\n",
    //                     "Marks": 3,
    //                     "Total_marks": 3,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "MEDIUM"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Annual Exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Annual 2",
    //                 "test_percent": 100,
    //                 "date_formated": "2020-12-01",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 3",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">In the following figure, the ratio of the areas of two sectors S<sub>1</sub>&nbsp;and S<sub>2</sub>&nbsp;is:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type:lower-alpha\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">5 : 2</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">3 : 5</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">5 :&nbsp;3</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">4 : 5</span></span></li>\r\n</ol>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><img alt=\"\" src=\"http://devportal.oyeexams.com/ckfinder/userfiles/images/Class_10th/Mathematics/NCERT/Mathematics_R_D_Sharma/Chapter_13/MCQ/Que_34.png\" style=\"height:100%; width:100%\"></span></span></p>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           },
    //           {
    //             "name": "Quarterly Exam",
    //             "test_details": [
    //               {
    //                 "test_name": "Quarterly Exam 1",
    //                 "test_percent": 100,
    //                 "date_formated": "2020-07-01",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 20",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">In the following figure, the boundary of the shaded region consists of four semi-circular arcs, the smallest two being equal. If the diameter of the largest is 14cm and of the smallest is 3.5cm, find,</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type:lower-roman\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">The length of the boundary.</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">The area of the shaded region.</span></span></li>\r\n</ol>\r\n\r\n<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\"><img alt=\"\" src=\"http://devportal.oyeexams.com/ckfinder/userfiles/images/Class_10th/Mathematics/NCERT/Mathematics_R_D_Sharma/Chapter_13/Exercise_13_4/Que_42.png\" style=\"height:100%; width:100%\"></span></span></p>\r\n",
    //                     "Marks": 7,
    //                     "Total_marks": 7,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "MEDIUM"
    //                   }
    //                 ]
    //               },
    //               {
    //                 "test_name": "Quarterly Exam 2",
    //                 "test_percent": 100,
    //                 "date_formated": "2020-08-03",
    //                 "paper_details": [
    //                   {
    //                     "QueNumber": "Q 2",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">If the area of a sector of a circle bounded by an arc of length&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(5\\pi\\text{ cm}\\)</span></span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\"> is equal to </span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(20\\pi\\text{ cm}^2,\\)</span></span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\">&nbsp;then the radius of the circle:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type:lower-alpha\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">12cm</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">16cm</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">8cm</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">10cm</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   },
    //                   {
    //                     "QueNumber": "Q 4",
    //                     "QuestionDescription": "<p><span style=\"font-size:14px\"><span style=\"font-family:verdana\">If the area of a sector of a circle bounded by an arc of length&nbsp;</span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(5\\pi\\text{cm}\\)</span></span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\">&nbsp;is equal to </span></span><span style=\"font-size:18px\"><span style=\"font-family:verdana\"><span class=\"equation\">\\(20\\pi\\text{cm}^2,\\)</span></span></span><span style=\"font-size:14px\"><span style=\"font-family:verdana\">&nbsp;then its radius is:</span></span></p>\r\n\r\n<ol start=\"1\" style=\"list-style-type:lower-alpha\">\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">12cm</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">16cm</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">8cm</span></span></li>\r\n\t<li><span style=\"font-size:14px\"><span style=\"font-family:verdana\">10cm</span></span></li>\r\n</ol>\r\n",
    //                     "Marks": 1,
    //                     "Total_marks": 1,
    //                     "BloomTaxonomyName": "ANALYSIS",
    //                     "DifficultyLevelName": "EASY"
    //                   }
    //                 ]
    //               }
    //             ]
    //           }
    //         ]
    //       }
    //     ],
    //     "exam_group": [
    //       {
    //           "name": "Class Test",
    //           "type": [
    //                 "Class Test 1",
    //                 "Class Test 2"
    //               ]
    //       },
    //       {
    //           "name": "Unit Test",
    //           "type": [
    //                 "Unit Test 1"
    //               ]
    //       },
    //       {
    //           "name": "Quarterly Exam",
    //           "type": [
    //                 "Quarterly Exam 1",
    //                 "Quarterly Exam 2"
    //               ]
    //       },
    //       {
    //           "name": "Half Yearly Exam",
    //           "type": [
    //                 "Half Yearly Exam 1",
    //                 "Half Yearly Exam 2"
    //               ]
    //       },
    //       {
    //           "name": "Annual Exam",
    //           "type": [
    //                 "Annual 1",
    //                 "Annual 2"
    //               ]
    //       }
    //     ]
    //   },
    //   "message": "report successful",
    //   "success": true
    // }


  }
  getReportData() {
    let prepareData = {
      "StudentId": this.studentFilterObj.StudentID,
      "SubjectIds": [this.studentFilterObj.SubjectID],
      // "AcademicYearId": this.academicYearsID,
      "AcademicYearId": this.studentFilterObj.academicYearsID,
      "ClassId": this.studentFilterObj.ClassID,
      "SectionIds": [this.studentFilterObj.EA_SectionID],
    }
    this.sharedService.getStudentChapterTotpicAnalysis(prepareData).subscribe(res => {
      console.log(res.chapter_analysis_data);
      if (res.chapter_analysis_data.length > 0 && res.exam_group.length > 0) {
        this.ExamGroupsAPI = res.exam_group;
        this.ExamGroupsAPI.forEach((element, indx) => {
          let typedata = element.type;
          for (var i = 0, n = typedata.length; i < n; ++i) {
            let a = typedata[i];
            this.examsAPI.push(a);
          }
        });
        let chapterdata;
        chapterdata = res.chapter_analysis_data;
        this.Chapterdatanalysis(chapterdata);
        this.noDataFound = false;
      } else {
        this.noDataFound = true;
        this.toastr.error('No data found');

      }
    }, error => {
      this.noDataFound = true;
      this.toastr.error('Please select valid data');
    });

  }

  Chapterdatanalysis(chapterdata) {
    this.ChapterandTopicAnalysisDataAPI = [];
    chapterdata.forEach((element, indx) => {
      element['overallPercentage'] = 0;
      this.examsAPI.forEach((ele, chIndx) => {
        let isMatched = false;
        element['exam_group'].forEach((test, testIndx) => {
          test['test_details'].forEach((detdata, noindex) => {
            if (detdata['test_name'] == ele) {
              isMatched = true;
              element['testMarks' + chIndx] = detdata['test_percent'];
            }
            if (testIndx == element['exam_group'].length - 1 && !isMatched) {
              element['testMarks' + chIndx] = 'N/A';
            }
            if (testIndx == element['exam_group'].length - 1 && chapterdata.length - 1 == indx) {
              // console.log(chapterdata);
            }
          })
        });
      });
    });
    this.ChapterandTopicAnalysisDataAPI = chapterdata;
    console.log(this.ChapterandTopicAnalysisDataAPI)
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
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];
    this.students = [];

    this.addStudentService.getSectionByClassID(ClassID).subscribe(
      section => {
        this.sectionList = section.filter((d: any) => d.SectionStatus == 1);
      }, error => {
      }
    )
  }
  getSubject(classId) {
    this.subjects = [];
    const getInstituteDDLClassSuccess = (subjects) => {
      if (subjects) {
        this.subjects = _.filter(subjects, function (obj) {
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

  getStudentBySection() {

    if (!!this.studentFilterObj.EA_SectionID && !!this.studentFilterObj.ClassID) {
      let data = {
        "AcademicYearID": this.studentFilterObj.academicYearsID,
        "ClassID": this.studentFilterObj.ClassID,
        "SectionID": [this.studentFilterObj.EA_SectionID]
      }
      this.students = [];
      this.sharedService.studentListBySection(data).subscribe(res => {
        this.students = res[0]['LstStudentData'];
      })
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

  showResult(searchData) {
    // debugger;
    if (!!searchData.StudentID && !!searchData.SubjectID) {
      this.getReportData();
    }

  }

  goToSubLevelReport() {
    // student/subject-level
    this.router.navigate(['subject-level'], { relativeTo: this.route });
  }

  gotoLearning() {
    this.router.navigate(['learning-curve'], { relativeTo: this.route });
  }

  getocomplexity() {
    this.router.navigate(['complexity-analysis'], { relativeTo: this.route });
  }

  questionDetails(data) {
    let detaildata = data.exam_group;
    this.ChapterName = data.chapter_name;
    this.questionDetailAPI = [];
    detaildata.forEach((element, indx) => {
      let isMatched = false;
      this.questionDetailAPI.push(element['test_details']);
      // element['test_details'].forEach((test, testIndx) => {
      //   for (var i = 0, n = test['paper_details'].length; i < n; ++i){
      //     let a= test['paper_details'][i];
      //     this.questionDetailAPI.push(a); 
      //   }
      // });     
    });
    console.log(this.questionDetailAPI)
    this.specificStudent1.show();
  }
  closeModel() {
    this.specificStudent1.hide();
  }

  clearFilter() {
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.SubjectID = null;
    this.studentFilterObj.academicYearsID = null;
    this.sectionList = [];
    this.students = [];
    this.noDataFound = true;
  }

  academicChnage() {
    this.studentFilterObj.ClassID = null;
    this.studentFilterObj.EA_SectionID = null;
    this.studentFilterObj.StudentID = null;
    this.studentFilterObj.SubjectID = null;
    this.sectionList = [];
    this.students = [];
  }
}