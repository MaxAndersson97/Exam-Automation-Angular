import { Injectable } from '@angular/core';
import { Staff } from '../model/staff';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Institute } from '../institute';
import { InstituteService } from '../institute.service';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { map, catchError } from 'rxjs/operators';
import { Student } from '../model/student';
import { getInstitute } from '../Utils/utils';
import { WelcomeService } from '../welcome/welcome.service';
import { ApplicationCacheService } from './application-cache.service';


@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    private dashboardData:any;

    private dashboardObservableData = new Subject();
    $dashboardData: Observable<any> = this.dashboardObservableData.asObservable();

    private staffArray = new BehaviorSubject(new Array<Staff>());
    currentStaffArr: Observable<Staff[]> = this.staffArray.asObservable();

    private dataForTemplateSetting = new BehaviorSubject(new Array<any>());
    currentTemplateSettingArray: Observable<any[]> = this.dataForTemplateSetting.asObservable();

    // private chepterIds = new BehaviorSubject(new Array<any>());
    // currentChepterIds: Observable<any[]> = this.chepterIds.asObservable();

    private templateData = new BehaviorSubject(new Array<any>());
    currentTemplateData: Observable<any> = this.templateData.asObservable();

    // private totalCount = new BehaviorSubject(new Array<any>());
    // currentTotalCount: Observable<any> = this.totalCount.asObservable();

    private openCreateModal = new BehaviorSubject(new Array<any>());
    currentOpenCreateModal: Observable<any> = this.openCreateModal.asObservable();


    private studentArray = new BehaviorSubject(new Array<Student>());
    currentstudentArray: Observable<Student[]> = this.studentArray.asObservable();


    constructor(private instituteService: InstituteService,
        private applicationCacheService : ApplicationCacheService,
        private http: HttpClient, private authService: AuthenticationService, private welcomeService: WelcomeService) { }

    setStaffArray(staffArr: Staff[]) {
      this.staffArray.next(staffArr);
    }
    // getStudentArray(){
    //     return localStorage.getItem('studentArray');
    // }

    setStudentArray(studentArr) {
      this.studentArray.next(studentArr);
    }


    setTemplateSettingArray(templateArr) {
      this.dataForTemplateSetting.next(templateArr);
    }

    setChepterIds(chepterIDs) {
      localStorage.setItem('selectedCheterIds', chepterIDs);
    }

    getChepterIds() {
      return localStorage.getItem('selectedCheterIds');
    }

    setIsOmr(value) {
      localStorage.setItem('isOmr', value);
    }

    getIsOmr() {
      return localStorage.getItem('isOmr');
    }

    setOmrResult(value) {
      localStorage.setItem('omr-result', value);
    }

    getOmrResult() {
      return localStorage.getItem('omr-result');
    }

    setCreatedTemplateData(template) {
      this.templateData.next(template);
    }

    setTotalQuestionCount(totalcount) {
      localStorage.setItem('totalCount', totalcount);
    }

    getTotalQuestionCount() {
      return localStorage.getItem('totalCount');
    }


    setOpenModuleData(isOpen) {
      this.openCreateModal.next(isOpen);
    }

    createDuplicatePaper(templateId) {
      //http://localhost:18342/api/eapapertemplate/edit?InstituteID =e6f45159-38c5-44f2-8a78-d1d50cda2b3d&EAPaperTemplateID=50638fd2-9409-4626-8a35-d16a315cb81d

      const url = environment.apiUrlIp + `/api/eapapertemplate/create_duplicate_paper`;
      return this.http.post(url,{
        "EAPaperTemplateID" : templateId
      }).pipe(
        map(response => response['data'])
      );
    }
    getTemplateDetailsById(templateId) {
      //http://localhost:18342/api/eapapertemplate/edit?InstituteID =e6f45159-38c5-44f2-8a78-d1d50cda2b3d&EAPaperTemplateID=50638fd2-9409-4626-8a35-d16a315cb81d

      const institute: Institute = this.instituteService.getInstitute();
      const { InstituteID, InstituteUserID } = institute;
      const url = environment.apiUrlIp + `/api/eapapertemplate/edit?InstituteID=` + InstituteID + '&EAPaperTemplateID=' + templateId;
      return this.http.get(url).pipe(
        map(response => response['data'])
      );
    }
    countryList() {
      const url = environment.apiUrlIp + '/api/baseclass/country/list';
      return this.http.get(url)
        .pipe(
          map(response => response['data'])
        );
    }
    getStates(countryId: string) {
      const url = environment.apiUrlIp + '/api/baseclass/state/list?CountryID=' + countryId;
      return this.http.get(url)
        .pipe(
          map(response => response['data'])
        );
    }

    //get  user defined system generated question list
    getWorksheetQuestionList(templateID, isOmr?) {
      const url = environment.apiUrlIp + '/api/eapapertemplate/get_template_detail'
      return this.http.post(url, { "EAPaperTemplateID": templateID, "IsOMRPaper": isOmr })
        .pipe(
          map(response => response['data'])
        );
    }

    getWorksheetQuestionListUnAuth(templateID, isOmr?) {
      const url = environment.apiUrlIp + '/api/eapapertemplate/get_template_detail_doc'
      return this.http.post(url, { "EAPaperTemplateID": templateID, "IsOMRPaper": isOmr, "EAExamAssignID": "00000000-0000-0000-0000-000000000000" })
        .pipe(
          map(response => response['data'])
        );
    }

    getInstituteDetail(InstituteUserId) {
      const url = environment.apiUrlIp + '/api/institute/get_institute_detail1?InstituteUserId='+ InstituteUserId;
      return this.http.get(url)
        .pipe(
          map(response => response['data'])
        );
    }

    //SAVE user defined system generated paper
    saveUDSGPaper(savePaper: any) {
      const url = environment.apiUrlIp + '/api/eapapertemplate/add_template_questions';
      return this.http.post(url, savePaper)
        .pipe(
          map(response => response['data'])
        );
    }

    //save header instruction
    saveHeaderInstruction(obj) {
      const url = environment.apiUrlIp + '/api/eapapertemplate/addedit_template_instruction';
      return this.http.post(url, obj)
        .pipe(
          map(response => response['data'])
        );
    }

    //cherrypick multiple header instruction save

    saveCherrypickHeaderInstruction(obj) {
      const url = environment.apiUrlIp + '/api/eapapertemplate/add_header_instructions';
      return this.http.post(url, obj)
        .pipe(
          map(response => response['data'])
        );
    }

    //get replace question list replace_question_list
    getReplaceQuestion(myObj) {
      const url = environment.apiUrlIp + '/api/eapapertemplate/replace_question_list';
      return this.http.post(url, myObj)
        .pipe(
          map(response => response['data'])
        );
    }

    //get all masters list for add_new_question
    getallMasters(myObj) {
      const url = environment.apiUrlIp + '/api/eapapertemplate/cherrypick_question_without_filter_list';
      return this.http.post(url, myObj)
        .pipe(
          map(response => response['data'])
        );
    }

    //get question marks for replace questino filter
    // getQuestionMarks(obj){
    //   const url = environment.apiUrlIp+ '/api/eapapertemplate/replace_question_list';
    //   return this.http.post(url, obj)
    //     .pipe(
    //       map(response => response['data'])
    //     );
    // }

    getAccessLevels() {
      const url = environment.apiUrlIp + '/api/baseclass/user_access_level_list';
      return this.http.get(url)
        .pipe(
          map(response => response['data'])
        );
    }

    deleteInstruction(id) {
      let url = environment.apiUrlIp + '/api/eapapertemplate/instruction_delete?PaperInstructionId=' + id;
      return this.http.get(url)
        .pipe(map(response => response['data']));
    }

    // delete paper
    deletePaper(templateId) {
      // http://localhost:18342/api/eapapertemplate/delete
      let url = environment.apiUrlIp + '/api/eapapertemplate/delete';
      return this.http.post(url, { EAPaperTemplateID: templateId });
    }

    // http://localhost:18342/api/eapapertemplate/get_template_summary?EAPaperTemplateID=3C6C2858-4469-4DE3-B795-B74266444C97

    getTemplateSummary(templateId) {
      let url = environment.apiUrlIp + '/api/eapapertemplate/get_template_summary?EAPaperTemplateID=' + templateId;
      return this.http.get(url)
        .pipe(map(response => response['data']));
    }

    // get assign exam list
    getAssignExamList(data) {
      let url = environment.apiUrlIp + '/api/eaexamassign/list';
      const institute: Institute = this.instituteService.getInstitute();
      const { InstituteID, InstituteUserID } = institute;
      const dataObj = { ...data, InstituteID };

      return this.http.post(url, dataObj)
        .pipe(map(response => response['data']));
    }
    //assign exam to section
    addAssignExam(data) {
      let url = environment.apiUrlIp + '/api/eaexamassign/add';
      const institute: Institute = this.instituteService.getInstitute();
      const { InstituteID, InstituteUserID } = institute;
      const dataObj = { ...data, InstituteID, InstituteUserID };
      return this.http.post(url, dataObj)
        .pipe(map(response => response['data']));
    }

    // changestatus
    changeAssignExamStatus(data) {
      let url = environment.apiUrlIp + '/api/eaexamassign/changestatus';
      return this.http.post(url, data)
        .pipe(map(response => response['data']));
    }

    // eaexamassign/student_list by section
    studentListBySection(data) {
      let url = environment.apiUrlIp + '/api/eaexamassign/student_list';
      const institute: Institute = this.instituteService.getInstitute();
      const { InstituteID } = institute;
      const dataObj = { ...data, InstituteID };
      return this.http.post(url, dataObj)
        .pipe(map(response => response['data']));
    }

    // student list who appeared in exam

    studentListAppearedInExam(EAExamAssignID) {
      let url = environment.apiUrlIp + '/api/eaexamassign/get_exam_appear_student_list?EAExamAssignID=' + EAExamAssignID;
      const institute: Institute = this.instituteService.getInstitute();
      const { InstituteID } = institute;
      // const dataObj = {...data,InstituteID};
      return this.http.get(url)
        .pipe(map(response => response['data']));
    }

    // update student who are present in exam
    // eaexamassign/update_appear_student

    updateAppearedStudent(data) {
      let url = environment.apiUrlIp + '/api/eaexamassign/update_appear_student';
      return this.http.post(url, data)
        .pipe(map(response => response['data']));
    }

    updateSelectedStudent(data) {
      let url = environment.apiUrlIp + '/api/eaexamassign/update';
      return this.http.post(url, data)
        .pipe(map(response => response['data']));
    }

    // Add Marks services start
    getStudentMarks(id) {
      let url = environment.apiUrlIp + '/api/eastudentmarks/student_marks_list?EAExamAssignID=' + id;
      return this.http.get(url)
        .pipe(map(response => response['data']));
    }

    // add marks
    addMarks(data) {
      let url = environment.apiUrlIp + '/api/eastudentmarks/add_marks';
      return this.http.post(url, data)
        .pipe(map(response => response['data']));
    }

    //get csv to download
    getcsvformat(id) {
      let url = environment.apiUrlIp + '/api/eastudentmarks/get?EAExamAssignID=' + id;
      return this.http.get(url)
        .pipe(map(response => response['data']));
    }

    //upload student marks csv
    uplaodStudentMarksCSV(data) {
      console.log(data);
      let url = environment.apiUrlIp + '/api/eastudentmarks/update_student_marks_csv';
      const institute: Institute = getInstitute();
      const formdata = new FormData();
      formdata.append('files', data.file);
      formdata.append('EAExamAssignID', data.EAExamAssignID);

      return this.http.post(url, formdata, {
        reportProgress: true,
        responseType: 'json'
      });
    }

    // change student status
    changeAddMarkStatus(data) {
      let url = environment.apiUrlIp + '/api/eastudentmarks/change_appear_status';
      return this.http.post(url, data);
    }

    setSelectedTempalteID(id) {
      localStorage.setItem('selectedTemplateID', id);
    }
    getSelectedTempalteID() {
      return localStorage.getItem('selectedTemplateID');
    }

    // getReplaceQuestionFilterList(id,isOmr){
    //   let url = environment.apiUrlIp+ '/api/eapapertemplate/replace_question_filter_list?EAPaperTemplateID='+ id +'&IsOMRPaper=' + isOmr;
    //   return this.http.get(url)
    //   .pipe(map(response => response['data']));
    // }

    getReplaceQuestionFilterList(id, isOmr) {
      let url = environment.apiUrlIp + '/api/eapapertemplate/replace_question_filter_list?EAPaperTemplateID=' + id + '&IsOMRPaper=' + isOmr;
      return this.http.get(url)
        .pipe(map(response => response['data']));
    }

    // Report's API
    getStudentChapterTotpicAnalysis(data) {
      let url = environment.apiUrlIp + '/api/eareports/stu_report_chap_topic_analysis';
      return this.http.post(url, data)
        .pipe(map(response => response['data']));
    }

    getStudentSubjectWiseReport(data) {
      let url = environment.apiUrlIp + '/api/eareports/stu_report_sub_level_report';
      return this.http.post(url, data);
    }


    getStudentLearningCurveReport1(data) {
      let url = environment.apiUrlIp + 'api/eareports/stu_report_learning_curve';
      return this.http.post(url, data);
    }

    // complexity-analysis of student

    get_stu_report_complexity_analysis(data) {
      let url = environment.apiUrlIp + 'api/eareports/stu_report_complexity_analysis';
      return this.http.post(url, data);
    }


    //exam report
    getExamTaken(data) {
      let url = environment.apiUrlIp + 'api/eareports/exam_report_exams_taken';
      return this.http.post(url, data);
    }

    exam_report_exam_composition(data) {
      let url = environment.apiUrlIp + 'api/eareports/exam_report_exam_composition';
      return this.http.post(url, data);
    }

    getSubjectPerformance(data) {
      let url = environment.apiUrlIp + 'api/eareports/class_report_sub_performance_report';
      return this.http.post(url, data);
    }

    class_report_chap_topic_analysis(data) {
      let url = environment.apiUrlIp + 'api/eareports/class_report_chap_topic_analysis';
      return this.http.post(url, data);
    }

    class_report_overall_performance(data) {
      let url = environment.apiUrlIp + 'api/eareports/class_report_overall_performance';
      return this.http.post(url, data);
    }

    // getCherryPickFilterlist(data){
    //   const institute: Institute = this.instituteService.getInstitute();
    //   const { InstituteID, InstituteUserID } = institute;
    //      let BoardID= this.welcomeService.getBoardId();
    //      let MediumID =  this.welcomeService.getMediumId();

    //   const dataObj = {...data, InstituteID, BoardID, MediumID};

    //   let url = environment.apiUrlIp+ '/api/eapapertemplate/cherrypick_question_filter_list';
    //   return this.http.post(url, dataObj);
    // }

    getCherryPickFilterlist(data) {
      const institute: Institute = this.instituteService.getInstitute();
      const { InstituteID, InstituteUserID } = institute;
      let BoardID = this.welcomeService.getBoardId();
      let MediumID = this.welcomeService.getMediumId();

      const dataObj = { ...data, InstituteID, BoardID, MediumID };

      let url = environment.apiUrlIp + '/api/eapapertemplate/GetSuggestedQuestionFilterList';
      return this.http.post(url, dataObj);
    }


    //OMR
    getOMRData(examId) {
      let url = environment.apiUrlIp + '/api/omr/list';
      return this.http.post(url, { "EAExamAssignID": examId });
    }

    getOMRRjectedData(examId) {
      let url = environment.apiUrlIp + '/api/omr/list_Rejected';
      return this.http.post(url, { "EAExamAssignID": examId });
    }

    getOMRDetailsByID(id) {
      let url = environment.apiUrlIp + '/api/omr/omr_question_view';
      return this.http.post(url, { 'EAOMRSheetID': id });
    }

    getOMRQuestionList(id) {
      let url = environment.apiUrlIp + '/api/omr/omr_question_list';
      return this.http.post(url, { 'EAExamAssignID': id });
    }

    getOMRQuestionListWithAnswer(id, OMRSheetID) {
      let url = environment.apiUrlIp + '/api/omr/omr_question_list';
      return this.http.post(url,
        {
          'EAExamAssignID': id,
          'EAOMRSheetID': OMRSheetID
        });
    }

    saveOMRManual(data) {
      let url = environment.apiUrlIp + '/api/omr/save_omr_manual';
      return this.http.post(url, data);
    }

    updateOMRManual(data) {
      let url = environment.apiUrlIp + '/api/omr/update_omr_manual';
      return this.http.post(url, data);
    }

    getSavedInstruction(subjectid) {
      let url = environment.apiUrlIp + '/api/eapapertemplate/get_saved_instruction';
      return this.http.post(url, { 'SubjectID': subjectid });
    }

    preserveInstruction(data) {
      let url = environment.apiUrlIp + '/api/eapapertemplate/save_instruction';
      let BoardID = this.welcomeService.getBoardId();
      let MediumID = this.welcomeService.getMediumId();

      const dataObj = { ...data, BoardID, MediumID };
      return this.http.post(url, dataObj);
    }

    getLocality(pincode) {
      const locality = '/api/baseclass/locality/list?Pincode=' + pincode;
      let url = environment.apiUrlIp + locality;
      return this.http.get(url);
    }

    verifyEmailID(data) {
      const locality = '/api/Account/verify_email';
      let url = environment.apiUrlIp + locality;
      return this.http.post(url, data);
    }

    getClassandSubjectList(data) {
      let url = '/api/ea_sectionsmaster/class_setup_teacherwise_list';
      let url1 = environment.apiUrlIp + url;
      return this.http.post(url1, data);
    }

    changeStatusResult(prepare) {
      let url = '/api/eaexamassign/changesresultstatus';
      let url1 = environment.apiUrlIp + url;
      return this.http.post(url1, prepare);
    }

    goWithSystemIntellingence(prepare) {
      let url = '/api/eapapertemplate/add_bloom_and_difficulty_system_intelligence';
      let url1 = environment.apiUrlIp + url;
      return this.http.post(url1, prepare);
    }
    // /api/easubjectmaster/getsubjectsettings

    getSubjectSetting(prepare) {
      let url = '/api/easubjectmaster/getsubjectsettings';
      let url1 = environment.apiUrlIp + url;
      return this.http.post(url1, prepare);
    }

    createPaperWithSystemIntelligence(prepare) {
      let url = '/api/eapapertemplate/add_bloom_and_difficulty_system_intelligence';
      let url1 = environment.apiUrlIp + url;
      return this.http.post(url1, prepare);
    }


    gettestIDByAssign(data) {
      let url = environment.apiUrlIp + '/api/eapapertemplate/get_template_detail_by_examassign';
      return this.http.post(url, data);
    }
    //----------assign Roll No-------

    getstudentlist(data) {
      let url = environment.apiUrlIp + '/api/eastudentmarks/addRollNumber';
      return this.http.post(url, data);
    }
    getallocatedstudentlist(data) {
      let url = environment.apiUrlIp + '/api/eastudentmarks/get_allocationed_student_list';
      return this.http.post(url, data);
    }

    //-------------Dashboard-------
    getDashboardData(data) {
      let url = environment.apiUrlIp + '/api/eadashboardreports/principal_dashboard';
      return this.http.post(url, data);
    }

    setDashboardData(data) {
      this.dashboardData = data;
    }

    getdashboardData() {
      return this.dashboardData;
    }

    setDashboardDataObservable(data) {
      this.dashboardObservableData.next(data);
    }
    getrollforonestudent(data) {
      let url = environment.apiUrlIp + '/api/eastudentmarks/add_roll_number_student';
      return this.http.post(url, data);
    }

    //----------assign Roll No-------


    //---------Attendance Report------------
    getreportlistNew(data) {
      let url = environment.apiUrlIp + '/api/ea_attendance/report_list_new';
      return this.http.post(url, data);
    }
    getreportlistNewfirst(data) {
      let url = environment.apiUrlIp + '/api/ea_attendance/Step1';
      return this.http.post(url, data);
    }
    //---------Attendance Report------------


    //---------Attendance Report------------
    getassignmentreportlist(data) {
      let url = environment.apiUrlIp + '/api/homework/report_list_new';
      return this.http.post(url, data);
    }
    getassignmentreportlistfirst(data) {
      let url = environment.apiUrlIp + '/api/homework/step1';
      return this.http.post(url, data);
    }
    //---------Attendance Report------------

    //---------Update selected Template------------
    getupdateselectedTemplate(data) {
      let url = environment.apiUrlIp + '/api/eapapertemplate/update_selected_template';
      return this.http.post(url, data);
    }
    //---------Update selected Template------------


    //---------Update selected Template------------
    changePassword(data) {
      let url = environment.apiUrlIp + '/api/Account/ChangePassword';
      return this.http.post(url, data);
    }
    //---------Update selected Template------------

    //---------DELETE MLTIPLE USERS ------------
    deleteMultipleUsers(reqObj) {
      let url = environment.apiUrlIp + '/api/baseclass/deletemultiple';
      return this.http.post(url, reqObj);
    }

    //---------DELETE SUBJECT TEACHER MAPPING ------------
    deleteSubjectTeacherMapping(reqObj) {
      let url = environment.apiUrlIp + '/api/ea_sectionsmaster/remove_subjectteacher_mapping';
      return this.http.post(url, reqObj);
    }

    //---------DELETE CLASS TEACHER MAPPING ------------
    deleteClassTeacherMapping(reqObj) {
      let url = environment.apiUrlIp + '/api/ea_sectionsmaster/remove_classteacher_mapping';
      return this.http.post(url, reqObj);
    }

    getDocument(reqObj) {
      let url = environment.docUrlIp + 'api/documents';
      return this.http.post(url, reqObj);
    }

    //--------- ADD USER QUESTION ------------

    saveUserQuestion(myObj) {
      const url = environment.apiUrlIp + '/api/eapapertemplate/save_question_by_user';
      return this.http.post(url, myObj)
        .pipe(
          map(response => response)
        );
    }

  loadFonts() {
    const font = localStorage.getItem('font');
    if (font) {
      const questionArea: any = document.querySelectorAll('.question-preview mathjax.question, .question-preview mathjax.question table, .question-preview .question, .question-preview .question .question-count');
      questionArea.forEach(element => {
        element.style.fontFamily = font;
      });
    }
    const size = localStorage.getItem('font-size');
    if (size) {
      const questionArea: any = document.querySelectorAll('.question-preview mathjax.question, .question-preview mathjax.question p, .question-preview mathjax.question ol, .question-preview mathjax.question table, .question-preview .question, .question-preview .question .question-count ');
      questionArea.forEach(element => {
        element.style.fontSize = size + "px";
      });
    }
  }

  canUserCreateTestOrExam(currentPaperGeneratedCount: number): boolean {
    if (currentPaperGeneratedCount == null)
      currentPaperGeneratedCount = 0;
    var canCreateTestOrExam = false;
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    let userData = JSON.parse(getUserinfo.data)
    /*If Validity date is after Current date then allow user */
    let currentDate = new Date();
    let paperValidityDate = new Date(userData.PaperValidityDate);
    if (currentDate < paperValidityDate && userData.FreePaperGenerationCount > currentPaperGeneratedCount) {
      /*If total freepaperGenerationCount > currentPaperGeneratedCount then allow user */
      canCreateTestOrExam = true;
    }

    return canCreateTestOrExam;
  }

  updateAvailableCreditsCache(currentPaperGeneratedCount: number){
    if (currentPaperGeneratedCount == null)
    currentPaperGeneratedCount = 0;
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    let userData = JSON.parse(getUserinfo.data)
    this.applicationCacheService.setAvailableCreditsCacheModel({
      FreePaperGenerationCount : userData.FreePaperGenerationCount ,
      PaperCreatedCount : currentPaperGeneratedCount,
      ValidityDate : userData.PaperValidityDate,
      dateTime : new Date(),
      userEmail : getUserinfo.userName,
      issuedDate : getUserinfo.issued
    });
  }

  RefreshContent(data) {
    let url = environment.apiUrlIp + '/api/baseclass/remove_ccs_automation';
    return this.http.post(url, data);
  }
}
