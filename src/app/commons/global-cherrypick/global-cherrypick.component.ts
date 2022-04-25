import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ClassTestExamService } from 'src/app/layout/class-test-exam/class-test-exam.service';
import { ModalDirective } from 'ngx-bootstrap';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { MathjaxComponent } from '../mathjax/mathjax.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, tap } from 'rxjs/operators';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FileserviceService } from 'src/app/services/fileservice.service';
import { FacebookPixelsService } from 'src/app/services/facebook-pixels.service';
import { SharedObservablesService } from 'src/app/services/shared-observables.service';
import { ApplicationCacheService } from 'src/app/services/application-cache.service';
import { SpinnerVisibilityService } from 'ng-http-loader';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare const $: any;

declare const CKEDITOR: any;
@Component({
  selector: 'app-global-cherrypick',
  templateUrl: './global-cherrypick.component.html',
  styleUrls: ['./global-cherrypick.component.scss']
})
export class GlobalCherrypickComponent implements OnInit {
  @ViewChild('suggestedQuestionList') suggestedQuestionList: TemplateRef<any>;
  @ViewChild('timeconfirmation') timeconfirmation: ModalDirective;
  @ViewChild('questionPaperInstructionModal') CreateInstruction: ModalDirective;
  @ViewChild('duration') step1: ElementRef;
  @ViewChild('marks') step2: ElementRef;
  @ViewChild('negMark') negMark: ElementRef;
  @ViewChild('addQuestionModal') addQuestion: ModalDirective;

  @Input() title: string;
  @Output() actionEmitter: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild(MathjaxComponent) childView: MathjaxComponent;
  isTimeEditable: boolean = false;
  number: number = 0;
  refreshSelectedUnselected: boolean = false;
  selectedItem: any;
  isPreserveInstruction: boolean = false;
  isShowPriviousSelection = false;
  createTemplateData: any;
  chepterIDs: [];
  natureListData: [];
  difficultyListData: [];
  bloomListData: [];
  filtersObj: any = {};
  natureDropdownSetting = {};
  bloomDropdownSetting = {};
  lengthDropdownSetting = {};
  marksDropdownSetting = {};
  difficultyDropdownSetting = {};
  paperSets: {};
  suggestedQuestionsList: any = [];
  addedQuestionList: any = [];
  isFiltersValid: boolean = false;
  headerInstructionList: any = [];
  instructionValue: any = "";
  selectedIndex: number = undefined;
  selectedInstruction: string = "";
  totalTime: number = 60;
  negativeMark: number = 0;
  totalMarks: number = 0;
  totalQuestionMarksCount: number = 0;
  validMarks: boolean = false;
  createTemplateDataObj: any;
  HeaderInstruction: any;
  QuestionInstruction: any;
  anyOneAlternateOpen: boolean = false;
  selectedAlternateIndex: number;
  selectedQuestionId: any;
  addedquestionIndex: number = 0;
  originalIndex: any;
  chapterDropdownSetting: any = {};
  isShowPaperInfo: boolean = false;
  savedInstruction: any[] = [];
  matches: any = [];
  allFiltersList: any = {
    'ChaptersList': [],
    'QuestionMarks': [],
    'NatureList': [],
    'BloomTexonomylList': [],
    'DifficultyLevelList': [],
    'allchapterlist': [],
    'paperSets': [{ 'itemName': 'Yes', 'id': 0 }]
  };

  dialogRef: MatDialogRef<TemplateRef<any>>;

  // paginate show more
  allSuggestdQuestionList: any = [];
  totalNoOfPages: number = 0;
  pagesize = 20;
  pageNumber: number = 1;
  lastIndex: number = 0;

  chapterlistt: any = [];
  chapterlistf: any = [];
  isfirsttimesavenature = true;
  modalopentype = 0;

  isbloomenable = false;

  isasc = true;

  smallScreen$: Observable<boolean>;
  mobileFilterClosed: boolean = true;

  allmasterData: any;

  addQuestionForm: FormGroup;
  addQueChapters: any = [];
  addQueTopics: any = [];
  addQueBloom: any = [];
  addQueDifficulty: any = [];
  addQueNature: any = [];
  addQueLength: any = [];
  addQueType: any = [];
  addQueAnswerOption: any = [];
  addnumberOfOption: any = [];
  addAnswerType: any = [];
  addRightAnswer: any = [];
  numberOfOption = 0;

  selectedNature = '';
  isShowMcqData = false;
  isShowRightAnswer = false;

  ChapterID = '';
  TopicID = '';
  QuestionDescription = '';
  QuestionAnswer = '';
  RightAnswer = [];
  QuestionMark = '';
  BloomTaxonomyID = '';
  DifficultyLevelID = '';
  QuestionLengthID = '';
  QuestionNatureID = '';
  QuestionType = '';
  isAnswered = '';
  haveAnswer = false;
  AnswerType = '';
  AnswerOptions = [];
  allresult = '';
  updatedQue: number;
  beforelen: number

  schoolInfo: any = {};
  scrollableH = 0;
  IsOmr: any = '';
  IsOwnQuestions = false;

  constructor(private tempalteService: TemplateService,
    private http: HttpClient,
    private dialog: MatDialog,
    private spinnerService: SpinnerVisibilityService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedDataService,
    private classTestExamService: ClassTestExamService,
    private toastr: ToastrService,
    private bpObs: BreakpointObserver,
    private fservice: FileserviceService,
    private facebookPixel: FacebookPixelsService,
    private sharedObservablesService: SharedObservablesService,
    private applicationCacheService: ApplicationCacheService) {

    this.smallScreen$ = this.bpObs.observe('(max-width: 767px)').pipe(tap(() => { this.mobileFilterClosed = true; }), map(e => e.matches));

  }

  ngOnInit() {

    this.IsOmr = this.sharedService.getIsOmr();

    this.addedQuestionList = [];
    this.route.params.subscribe(params => {
      this.getTemplateDetials(params.id);
      this.isShowPaperInfo = JSON.parse(localStorage.getItem('institute')).IsDemo;
    });

    this.natureDropdownSetting = {
      singleSelection: false,
      text: "Nature",
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };

    this.bloomDropdownSetting = {
      singleSelection: false,
      text: "Bloom",
      idField: 'BloomTaxonomyID',
      textField: 'BloomTaxonomyName',
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };

    this.lengthDropdownSetting = {
      singleSelection: false,
      text: "Length",
      idField: 'BloomTaxonomyID',
      textField: 'BloomTaxonomyName',
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };

    this.difficultyDropdownSetting = {
      singleSelection: false,
      text: "Difficulty",
      idField: 'DifficultyLevelID',
      textField: 'DifficultyLevelName',
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    }

    this.paperSets = {
      singleSelection: true,
      text: "Only Previous paper",
      idField: 'paperSetId',
      textField: 'paperSetName',
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    }

    this.chapterDropdownSetting = {
      singleSelection: false,
      text: "Chapter",
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
      groupBy: "category"
    }

    this.marksDropdownSetting = {
      singleSelection: false,
      text: "Marks",
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };

    // this.marksDropdownSetting = {
    //   singleSelection: false,
    //   text: "Select Marks",
    //   idField: 'MarksID',
    //   textField: 'Marks',
    //   selectAllText: 'SELECT ALL',
    //   unSelectAllText: 'DESELECT ALL',
    //   itemsShowLimit: 1,
    //   badgeShowLimit: 1,
    // }

    if (localStorage.getItem('SUBJECTSETTINGS') != null) {
      this.isbloomenable = JSON.parse(localStorage.getItem('SUBJECTSETTINGS')).isbloom;
    }

    this.schoolInfo = JSON.parse(localStorage.getItem('schoolProfile'));


    $(window).scroll(() => {
      var window_top = $(window).scrollTop();
      var div_top = ($(".mat-tab-header").length > 0) ? $(".mat-tab-header").offset().top : 0;
      if (window_top > div_top && $(".sticky").length == 0) {
        this.scrollableH = div_top;
        $(".mat-tab-header").addClass("sticky");
      } else if (window_top < this.scrollableH) {
        $(".mat-tab-header").removeClass("sticky");
      }
    });

  }

  Openconfirmation(type) {
    this.timeconfirmation.show();
    this.isfirsttimesavenature = false;
    this.modalopentype = type;
  }



  closeModal() {
    this.timeconfirmation.hide();
  }
  changetotaltime() {
    this.timeconfirmation.hide();
    this.isTimeEditable = !this.isTimeEditable;
    this.editDuration('TIME');
  }
  closeModalsaveData() {
    this.timeconfirmation.hide();
    if (this.modalopentype == 1) {
      this.openInstructionModal();
    } else if (this.modalopentype == 2) {
      this.saveDraftPaper()
    }
  }
  reloadchapterlist() {
    if (this.filtersObj.ChapterID.length == this.allFiltersList.allchapterlist.length) {
    }
    this.reloadchapterlist();
  }

  editDuration(type): void {
    if (type == 'TIME') {
      setTimeout(() => {
        this.step1.nativeElement.value = null;
        this.totalTime = 0;
        this.step1.nativeElement.focus();
      }, 10)
    }
  }

  editMark(): void {
    setTimeout(() => {
      this.negMark.nativeElement.value = null;
      this.negativeMark = null;
      this.negMark.nativeElement.focus();
    }, 10)
  }

  getTemplateDetials(templateId) {
    this.sharedService.getWorksheetQuestionList(templateId).subscribe(
      result => {
        this.createTemplateData = result.paperTemplateInfo;


        this.totalMarks = this.createTemplateData['TotalMarks'];
        if (this.createTemplateData['Duration'] == 0) {
          this.totalTime = 60;
          this.isfirsttimesavenature = true;
          this.modalopentype = 0;
        } else {
          this.totalTime = this.createTemplateData['Duration'];
          this.isfirsttimesavenature = false;
          this.modalopentype = 0;
        }

        this.negativeMark = this.createTemplateData['NegativeMarks'];
        this.headerInstructionList = result.HeaderInstruction;
        this.QuestionInstruction = result.QuestionInstruction;

        this.filterSelectedQue(this.QuestionInstruction);
        this.chepterIDs = JSON.parse(this.sharedService.getChepterIds());
        this.applyFilter(true);

      }, error => {
      }
    )
  }

  filterSelectedQue(quesList) {
    let addedQuestion: any = [];
    quesList.forEach((ele, indx) => {
      if (ele['Questions'] && ele['Questions'].length > 0) {
        addedQuestion.push(...ele.Questions);
      }
      this.addedQuestionList = addedQuestion;
      this.reviseIndexAddedQueList();
      this.validateTotalMarks();
    });
    this.updatedQue = this.addedQuestionList.length;
    // alert(this.addedQuestionList.length)
  }

  titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  getfilterList(res) {
    this.chapterlistf = [];
    this.chapterlistt = [];

    this.chapterlistf = [];
    this.chapterlistt = [];
    this.allFiltersList = res['data'];

    var markList = [];
    this.allFiltersList['QuestionMarks'].forEach(element => {
      markList.push({ 'MarksID': element, "Marks": element });
    });

    this.allFiltersList['markList'] = markList;

    this.allFiltersList['ChaptersList'].forEach((element, indx) => {

      let cname = element['Chapters'];
      for (var i = 0, n = cname.length; i < n; ++i) {
        cname[i]['itemName'] = element['ChapterName'];
        cname[i]['id'] = indx + '_' + [i];
        cname[i]['category'] = element.TextBookName;
      }
      this.chapterlistt.push(cname);
    });
    for (var i = 0, n = this.chapterlistt.length; i < n; ++i) {
      this.chapterlistf = this.chapterlistf.concat(this.chapterlistt[i]);
    }
    this.allFiltersList['allchapterlist'] = this.chapterlistf;
    this.allFiltersList['allchapterlist'].forEach((element, indx) => {
      element['itemName'] = this.titleCase(element['ChapterName']);
      element['ChapterName'] = this.titleCase(element['ChapterName']);
      element['id'] = indx;

    });

    this.allFiltersList['DifficultyLevelList'].forEach((element, indx) => {
      // element['itemName'] = "( " + element['QuestionCount'] +" ) "+ this.titleCase(element['DifficultyLevelName']);
      element['itemName'] = this.titleCase(element['DifficultyLevelName']);
      element['id'] = indx;
    });

    this.allFiltersList['BloomTexonomylList'].forEach((element, indx) => {
      // element['itemName'] = "( " +element['QuestionCount']+" ) "+this.titleCase(element['BloomTaxonomyName']);
      element['itemName'] = this.titleCase(element['BloomTaxonomyName']);
      element['id'] = indx;
    });

    this.allFiltersList['NatureList'].forEach((element, indx) => {
      // element['itemName'] = "( " +element['QuestionCount']+" ) "+this.titleCase(element['QuestionNatureName']);
      element['itemName'] = this.titleCase(element['QuestionNatureName']);
      element['id'] = indx;
    });

    this.allFiltersList['QuestionLengthList'].forEach((element, indx) => {
      element['itemName'] = this.titleCase(element['QuestionLengthName']);
      element['id'] = indx;
    });

    this.allFiltersList['markList'].forEach((element, indx) => {
      element['itemName'] = element['Marks'];
      element['id'] = indx;
    });

    this.allFiltersList['paperSets'] = [{ 'itemName': 'Yes', 'id': 0 }];
  }

  onDeSelectAll(number, isloadfilter: boolean) {

    if (number == 1) {
      this.filtersObj.ChapterID = [];
    }
    if (number == 2) {
      this.filtersObj.Marks = [];
    }
    if (number == 3) {
      this.filtersObj.nature = [];
    }
    if (number == 4) {
      this.filtersObj.questionlength = [];
    }
    if (number == 5) {
      this.filtersObj.bloom = [];
    }
    if (number == 6) {
      this.filtersObj.difficulty = [];
    }
    if (number == 7) {
      this.filtersObj.paperSets = [];
    }
    if (isloadfilter) {
      this.onChaperSelectionChange();
    }
    this.onSelectItem(false);
  }

  onSelectItem(isloadfilter: boolean) {
    if (
      (this.filtersObj.nature != undefined && this.filtersObj.nature.length > 0) ||
      (this.filtersObj.bloom != undefined && this.filtersObj.bloom.length > 0) ||
      (this.filtersObj.difficulty != undefined && this.filtersObj.difficulty.length > 0) ||
      (this.filtersObj.paperSets != undefined && this.filtersObj.paperSets.length > 0) ||
      (this.filtersObj.questionlength != undefined && this.filtersObj.questionlength.length > 0) ||
      (this.filtersObj.Marks != undefined && this.filtersObj.Marks.length > 0) ||
      (this.filtersObj.ChapterID != undefined && this.filtersObj.ChapterID.length > 0)
    ) {
      this.isFiltersValid = true;
    } else {
      this.isFiltersValid = false;
    }

    if (isloadfilter && this.isFiltersValid) {
      if (this.number == 2)
        ($("#marksDropdown").find(".cuppa-dropdown").find(".dropdown-list")).hide();
      else if (this.number == 3)
        ($("#natureDropdown").find(".cuppa-dropdown").find(".dropdown-list")).hide();
      else if (this.number == 4)
        ($("#lengthDropdown").find(".cuppa-dropdown").find(".dropdown-list")).hide();
      else if (this.number == 5)
        ($("#bloomDropdown").find(".cuppa-dropdown").find(".dropdown-list")).hide();
      else if (this.number == 6)
        ($("#difficultyDropdown").find(".cuppa-dropdown").find(".dropdown-list")).hide();
      //this.onDeSelectAll(this.number,false);
      this.onChaperSelectionChange();
    }
  }

  onGroupSelect(e, isloadfilter: boolean) {
    this.isFiltersValid = true;
    if (this.filtersObj.ChapterID.length == this.allFiltersList.allchapterlist.length) {
      this.onSelectItem(false);
    } else if (isloadfilter) {
      this.onChaperSelectionChange();
    }
  }

  onGroupDeSelect(e, isloadfilter: boolean) {
    this.isFiltersValid = false;
    if (this.filtersObj.ChapterID.length == this.allFiltersList.allchapterlist.length) {
      this.onSelectItem(false);
    } else if (isloadfilter) {
      this.onChaperSelectionChange();
    }
  }

  marksvalid() {
    this.isFiltersValid = true;
  }

  callFilter() {
    this.pageNumber = 1;
    this.suggestedQuestionsList = [];
    this.applyFilter();
  }

  applyFilter(callSubjectApi: boolean = false) {
    const QuestionNatureIDs = [];
    const DifficultyLevelIDs = [];
    const BloomTaxonomyIDs = [];
    const QuestionLengthIDs = [];
    const Marks = [];

    if (!!this.filtersObj.nature) {
      for (const iterator of this.filtersObj.nature) {
        QuestionNatureIDs.push(iterator.QuestionNatureID);
      }
    }

    if (!!this.filtersObj.bloom) {
      for (const iterator of this.filtersObj.bloom) {
        BloomTaxonomyIDs.push(iterator.BloomTaxonomyID);
      }
    }

    if (!!this.filtersObj.difficulty) {
      for (const iterator of this.filtersObj.difficulty) {
        DifficultyLevelIDs.push(iterator.DifficultyLevelID);
      }
    }
    if (this.filtersObj.questionlength) {
      for (const iterator of this.filtersObj.questionlength) {
        QuestionLengthIDs.push(iterator.QuestionLengthID);
      }
    }

    if (this.filtersObj.Marks) {
      for (const iterator of this.filtersObj.Marks) {
        Marks.push(iterator.Marks);
      }
    }

    let ChapterIDs = [];
    if (!!this.filtersObj['ChapterID']) {
      for (const iterator of this.filtersObj['ChapterID']) {
        ChapterIDs.push(iterator.ChapterID);
      }
    }

    let isFilterByPaperSets = false;
    if (!!this.filtersObj['paperSets']) {
      for (const iterator of this.filtersObj['paperSets']) {
        isFilterByPaperSets = iterator.itemName == 'Yes';
      }
    }

    const prepareData = {
      "EAPaperTemplateID": this.createTemplateData['EAPaperTemplateID'],
      "ClassID": this.createTemplateData['ClassID'],
      "SubjectID": this.createTemplateData['SubjectID'],
      "QuestionNatureIDs": QuestionNatureIDs,
      "DifficultyLevelIDs": DifficultyLevelIDs,
      "BloomTaxonomyIDs": BloomTaxonomyIDs,
      "QuestionLengthIDs": QuestionLengthIDs,
      "PageIndex": this.pageNumber,
      "PageSize": this.pagesize,
      'Marks': Marks,
      'ChapterIDs': ChapterIDs.length == 0 ? this.chepterIDs : ChapterIDs,
      "IsOMRPaper": this.createTemplateData['IsOMRPaper'],
      "IsFilterByPaperSet": isFilterByPaperSets,
      "IsOwnQuestions": this.IsOwnQuestions
    };



    let prepareObj = {
      "SubjectID": this.createTemplateData['SubjectID'],
      "ClassID": this.createTemplateData['ClassID'],
      "EAPaperTemplateID": this.createTemplateData['EAPaperTemplateID'],
      "ChapterIDs": this.chepterIDs,
      "IsOMRPaper": this.createTemplateData['IsOMRPaper'],
      "IsOwnQuestions": this.IsOwnQuestions
    };
    var subscriptions: Observable<any>[] = [];
    subscriptions.push(this.classTestExamService.suggestedQuesList(prepareData));
    subscriptions.push(this.sharedService.getCherryPickFilterlist(prepareObj));
    if (this.createTemplateData.PaperGenerationMethod == 3 && callSubjectApi) {
      let data = {
        "SubjectID": this.createTemplateData.SubjectID
      };
      subscriptions.push(this.sharedService.getSubjectSetting(data));
    }
    forkJoin(subscriptions).subscribe(
      (res) => {
        var subjectApiResult = null, sugestedQuestionsApiResult = null, getSuggestionsApiResult = null;
        if (res.length > 2) {
          sugestedQuestionsApiResult = res[0];
          getSuggestionsApiResult = res[1];
          subjectApiResult = res[2];
        }
        else if (res.length > 1) {
          sugestedQuestionsApiResult = res[0];
          getSuggestionsApiResult = res[1];
        }
        if (subjectApiResult) {
          if (subjectApiResult['data'] && !!subjectApiResult['data']['Setting']) {
            let data = subjectApiResult['data']['Setting'];
            this.isbloomenable = data.isbloom
          }
        }
        if (sugestedQuestionsApiResult != null) {
          if (sugestedQuestionsApiResult.data[0]) {
            // this.allresult=sugestedQuestionsApiResult.recordsTotal;
            this.totalNoOfPages = sugestedQuestionsApiResult.recordsTotal / this.pagesize;
            this.lastIndex = this.pagesize * this.pageNumber;
            this.suggestedQuestionsList = [...this.suggestedQuestionsList, ...sugestedQuestionsApiResult.data];
            this.getMatch(this.addedQuestionList, this.suggestedQuestionsList);
            for (var i = this.suggestedQuestionsList.length - 1; i >= 0; i--) {
              for (var j = 0; j < this.matches.length; j++) {
                if (this.suggestedQuestionsList[i]['Questionid'] === this.matches[j]['Questionid']) {
                  this.suggestedQuestionsList.splice(i, 1);
                }
              }
            }
            if (getSuggestionsApiResult != null)
              this.getfilterList(getSuggestionsApiResult);
          } else {
            this.suggestedQuestionsList = [];
          }
        }
        this.allresult = sugestedQuestionsApiResult.recordsTotal
        // alert(sugestedQuestionsApiResult.recordsTotal)
      }, (error) => {
        this.spinnerService.hide();
        this.toastr.error(error.error['message']);
        this.suggestedQuestionsList = [];
        this.totalNoOfPages = 1;
      },
      () => {
        this.spinnerService.hide();
      }
    );
  }


  getMatch(a, b) {
    this.matches = [];

    for (var i = 0; i < a.length; i++) {
      for (var e = 0; e < b.length; e++) {
        if (a[i]['Questionid'] === b[e]['Questionid']) this.matches.push(a[i]);
      }
    }
    return this.matches;
  }


  showMoreQuestions() {
    this.pageNumber = +this.pageNumber + 1;
    this.lastIndex = this.pagesize * this.pageNumber;
    this.applyFilter();
    // console.log(this.lastIndex);
    // this.suggestedQuestionsList = this.allSuggestdQuestionList.slice(0, this.lastIndex);
  }

  dropback(event: CdkDragDrop<string[]>) {
    this.validateTotalMarks();
  }

  drop(event: CdkDragDrop<string[]>) {
    const selectedId = this.suggestedQuestionsList[event['previousIndex']]['Questionid'];
    const result = this.addedQuestionList.find(item => item['Questionid'] == selectedId);

    if (result) {
      // Swal.fire('Question already selected');
      // return;
      console.log("resultvalue");
      let a = {};
      a = this.suggestedQuestionsList[event['previousIndex']];
      if (this.anyOneAlternateOpen && +this.selectedAlternateIndex >= 0) {
        a['IsOr'] = true;
        a['numbering'] = 'B';
        a['myIndex'] = +this.selectedAlternateIndex;
        a['alternateIndex'] = +this.selectedAlternateIndex;
      } else {
        // a['IsOr'] = true;
        // a['numbering'] = 'A';
        // a['myIndex'] = +this.selectedAlternateIndex ;
        // a['alternateIndex'] = +this.selectedAlternateIndex;
      }

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      if (this.anyOneAlternateOpen && +this.selectedAlternateIndex >= 0) {
        let elemnt = {};
        elemnt = this.addedQuestionList.find(item => item['Questionid'] == this.selectedQuestionId);
        elemnt['openHaveOr'] = false;
        elemnt['IsOr'] = true;
        this.anyOneAlternateOpen = false;
        elemnt['numbering'] = 'A'
        elemnt['myIndex'] = +this.selectedAlternateIndex
        elemnt['alternateIndex'] = +this.selectedAlternateIndex;
      }
    } else {

      console.log(event.container.data);

      // FINAL PICKED LIST UP-DOWN SETTLEMENT
      if (event.previousContainer === event.container) {
        //move item up down
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        let a = {};
        a = this.suggestedQuestionsList[event['previousIndex']];
        if (this.anyOneAlternateOpen && +this.selectedAlternateIndex >= 0) {
          a['IsOr'] = true;
          a['numbering'] = 'B';
          a['myIndex'] = +this.selectedAlternateIndex;
          a['alternateIndex'] = +this.selectedAlternateIndex;
        } else {
          // a['IsOr'] = false;           
          // this.addedquestionIndex = +this.addedquestionIndex+1;
          // a['myIndex'] = +this.addedquestionIndex;

        }
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        if (this.anyOneAlternateOpen && +this.selectedAlternateIndex >= 0) {
          let elemnt = {};
          elemnt = this.addedQuestionList.find(item => item['Questionid'] == this.selectedQuestionId);
          elemnt['openHaveOr'] = false;
          elemnt['IsOr'] = true;
          this.anyOneAlternateOpen = false;
          elemnt['numbering'] = 'A'
          elemnt['myIndex'] = +this.selectedAlternateIndex
          elemnt['alternateIndex'] = +this.selectedAlternateIndex;
        }
        // console.log("hii");
      }
      // console.log("previousIndex="+ elemnt['myIndex']);
      this.validateTotalMarks();
      this.reviseIndexAddedQueList();
      this.updatedQue = this.addedQuestionList.length;
    }

    this.repeatdropfunction(event);
    setTimeout(() => {
      this.repeatdropfunction(event);
    }, 100);
  }

  repeatdropfunction(event: CdkDragDrop<string[]>) {
    // const selectedId = this.suggestedQuestionsList[event['previousIndex']]['Questionid'];
    // const result = this.addedQuestionList.find(item => item['Questionid'] == selectedId);
    //   if (event.previousContainer === event.container) {
    //     //move item up down
    //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //     console.log('moveitem');
    // }
    this.validateTotalMarks();
    this.reviseIndexAddedQueList();
  }

  reviseIndexAddedQueList() {
    let alternateIndx = 0;
    // console.log(this.addedQuestionList, this.addedQuestionList.length);
    for (let index = 0; index < this.addedQuestionList.length; index++) {
      let element: any = {}, priviousElmnt: any = {};
      element = this.addedQuestionList[index];
      priviousElmnt = index > 0 ? this.addedQuestionList[index - 1] : {};
      // console.log(!priviousElmnt['IsOr']);
      //debugger;
      if (!priviousElmnt['IsOr']) {
        alternateIndx = 0;
        element['myIndex'] = +priviousElmnt['myIndex'] >= 0 ? +priviousElmnt['myIndex'] + 1 : 1;
        // console.log(index, element['myIndex']);
      } else {
        alternateIndx = +alternateIndx + 1;
        // console.log(alternateIndx, !element['IsOr'], priviousElmnt['IsOr'])
        if (alternateIndx == 1 && !element['IsOr'] && priviousElmnt['IsOr']) {
          if (index == 1) {
            this.addedQuestionList.splice(index, 1);
            this.addedQuestionList.splice(index + 1, 0, element);
            index = 1;
          } else {
            this.addedQuestionList.splice(index, 1);
            this.addedQuestionList.splice(index + 1, 0, element);
            index = 0;
          }
        } else if ('IsOr' in element && element['IsOr'] && alternateIndx < 2) {
          element['myIndex'] = +priviousElmnt['myIndex'];
          element['numbering'] = 'B';
          priviousElmnt['numbering'] = 'A';
        } else {
          // console.log('come into else of isor');
          element['myIndex'] = +priviousElmnt['myIndex'] + 1;
          alternateIndx = 0;
          // delete element['numbering'];
          // delete element['IsOr'];
          // element['numbering'] = 'A';
        }

        // element['alternateIndex'] = index;
      }
    }
    // console.log(this.addedQuestionList);
  }

  dropSelectedQuestion(questiondetails, indx) {
    console.log(questiondetails, "744");

    console.log(`Question index is ${indx}`);

    if (this.dialogRef) { this.dialogRef.close(); this.dialogRef = undefined; }

    if (this.anyOneAlternateOpen) {
      console.log('Alternate question being selected');
      console.log(`Original index is ${this.originalIndex}`);
      console.log(`Selected alternate index is ${this.selectedAlternateIndex}`);

      let newAddedQuestion = Object.assign({}, questiondetails);
      newAddedQuestion['IsOr'] = true;
      newAddedQuestion['numbering'] = 'B';
      newAddedQuestion['myIndex'] = +this.selectedAlternateIndex + 'B';
      newAddedQuestion['alternateIndex'] = +this.selectedAlternateIndex;

      this.addedQuestionList.splice((this.originalIndex || 0) + 1, 0, newAddedQuestion);
      this.anyOneAlternateOpen = false;
      // this.updatedQue=this.addedQuestionList.length;
      // ORIGINAL QUESTION MODIFICATION
      let baseQuestion = {};
      baseQuestion = this.addedQuestionList[(this.originalIndex || 0)];
      baseQuestion['IsOr'] = true;
      this.anyOneAlternateOpen = false;
      baseQuestion['numbering'] = 'A';
      baseQuestion['openHaveOr'] = false;
      baseQuestion['myIndex'] = +this.selectedAlternateIndex + 'A';
      baseQuestion['alternateIndex'] = +this.selectedAlternateIndex;

      console.log('Base question is: ')
      console.log(baseQuestion);

      console.log('Alternate question is');
      console.log(newAddedQuestion);

    } else {
      this.addedQuestionList.push(questiondetails);
    }
    this.updatedQue = this.addedQuestionList.length;
    this.suggestedQuestionsList.splice(indx, 1);
    this.validateTotalMarks();
    this.reviseIndexAddedQueList();
  }

  validateTotalMarks() {
    this.totalMarks = 0;
    let isValidate = true;

    this.totalQuestionMarksCount = 0;
    let a = this.addedQuestionList.filter((x, indx) => {
      this.totalQuestionMarksCount = 'numbering' in this.addedQuestionList[indx] && this.addedQuestionList[indx]['numbering'] == 'B' ? +this.totalQuestionMarksCount : +this.totalQuestionMarksCount + +x['Marks'];
      if (+x['Marks'] < 1 && x['numbering'] != 'B') {
        this.validMarks = false;
        isValidate = false;
      }


    });
    this.totalMarks = this.totalQuestionMarksCount;
    if (+this.totalQuestionMarksCount == this.totalMarks && isValidate) {
      this.validMarks = true;
    } else {
      this.validMarks = false;
    }
  }

  openInstructionModal() {
    this.CreateInstruction.show();
    this.isPreserveInstruction = false;
    this.getSavedInstruction();
    for (let index = 0; index < this.addedQuestionList.length; index++) {
      let elemnt: any = {};
      elemnt = this.addedQuestionList[index];
      elemnt['QueIndex'] = this.addedQuestionList[index]['myIndex'];
      elemnt['QueNumber'] = elemnt['IsOr'] ? 'Q ' + elemnt['QueIndex'] + '(' + elemnt['numbering'].toLowerCase() + ')' : 'Q ' + elemnt['QueIndex'];
    }
  }

  getSavedInstruction() {
    let subjectID = this.createTemplateData['SubjectID'];
    this.sharedService.getSavedInstruction(subjectID).subscribe(res => {
      if (res['data'][0]) {
        this.savedInstruction = res['data'];
      } else {
        this.toastr.info('No Saved instruction found.');
      }
    }, error => {
      console.log('Something went wrong.');
    })
  }

  addBackToInstruction(instruction, index) {
    console.log(instruction, index, this.headerInstructionList);
    let prepare = {
      'Title': "",
      'Instruction': instruction['Description'],
      'HaveOr': false,
      'TotalMarks': 0,
      'IsHeaderInstruction': true,
      'prevPosition': index
    };

    this.headerInstructionList.push(prepare);
    this.savedInstruction.splice(index, 1);

  }

  openAlternateQuestionView(qIndex, Mindx, id) {
    console.log(`qIndex -> `, qIndex);
    console.log(`Mindx -> `, Mindx);

    this.anyOneAlternateOpen = true;
    if (window.innerWidth < 992) {
      this.dialogRef = this.dialog.open(this.suggestedQuestionList, {
        height: '80vh',
        width: '80vw',
        autoFocus: false
      });

      this.dialogRef.afterOpened().subscribe(data => {
        document.querySelectorAll<HTMLElement>('.mat-dialog-container img').forEach(e => {
          e.style.maxWidth = '50%'
        })
      });

      this.dialogRef.afterClosed().subscribe(() => {
        this.anyOneAlternateOpen = false;
      });

      this.selectedAlternateIndex = Mindx;
      this.originalIndex = qIndex;

    } else {
      this.selectedAlternateIndex = Mindx;
      this.originalIndex = qIndex;

      this.selectedQuestionId = id;
      let elemnt = {};
      elemnt = this.addedQuestionList[qIndex];
      elemnt['openHaveOr'] = true;
    }
  }

  deleteAlternateQuestion(indx) {
    this.selectedAlternateIndex = null;
    let elemnt = {};
    elemnt = this.addedQuestionList[indx];
    elemnt['openHaveOr'] = false;
    this.anyOneAlternateOpen = false;
  }

  editHeader(instruction, indx) {
    this.selectedIndex = indx;
    this.selectedInstruction = instruction;
    this.instructionValue = instruction;
    this.isPreserveInstruction = false;
    // console.log(instruction, indx);
  }

  deleteHeader(instruction, indx) {
    if (+indx == +this.selectedIndex) {
      this.instructionValue = '';
      this.selectedIndex = undefined;
      this.selectedInstruction = "";
    }

    this.headerInstructionList.splice(indx, 1);
    //this.savedInstruction.unshift(instruction);

    // add it back to the original list
  }

  deleteQue(instruction, indx) {
    this.http.delete(environment.apiUrlIp + `/api/eapapertemplate/master_instruction_delete?EAInstructionMasterID=${instruction.EAInstructionMasterID}`).subscribe(() => {
      this.savedInstruction.splice(indx, 1);
      //return this.getSavedInstruction();
    });
  }

  saveHeaderInstruction() {
    this.headerInstructionList.forEach((element, indx) => {
      element['InstructionNumber'] = indx + 1;

    });

    this.saveQuestionPaper();
  }

  addHeader(header) {
    if (this.selectedIndex != undefined) {
      this.headerInstructionList[this.selectedIndex].Instruction = header;
    } else {
      const prepareObj = {

        "Title": "",
        "Instruction": header,
        "HaveOr": false,
        "TotalMarks": 0,
        "IsHeaderInstruction": true
      }
      this.headerInstructionList.push(prepareObj);
    }
    this.instructionValue = '';
    this.selectedIndex = undefined;
    this.selectedInstruction = "";
    this.isPreserveInstruction = false;
  }

  //preserve Instruction
  saveInstruction(header) {
    console.log(this.isPreserveInstruction, header, this.selectedIndex);

    if (this.selectedIndex != undefined) {
      this.headerInstructionList[this.selectedIndex].Instruction = header;
    }
    if (this.isPreserveInstruction) {
      const prepareObj = {
        "Description": header,
        "ClassID": this.createTemplateData['ClassID'],
        "SubjectID": this.createTemplateData['SubjectID'],
      }
      this.sharedService.preserveInstruction(prepareObj).subscribe(res => {
        this.getSavedInstruction();
      });
    }
    this.addHeader(header);
  }

  //save question paper for cherry pick
  saveQuestionPaper() {
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    let userData = JSON.parse(getUserinfo.data);
    let freePaperCount = userData.FreePaperGenerationCount;
    let a = this.addedQuestionList.filter((x, indx) => {
      x['Marks'] = 'numbering' in x && x['numbering'] == 'B' ? +this.addedQuestionList[indx - 1]['Marks'] : +x['Marks'];
    });

    for (let index = 0; index < this.addedQuestionList.length; index++) {
      let elemnt: any = this.addedQuestionList[index];
      if (elemnt["BloomTaxonomyID"] == "00000000-0000-0000-0000-000000000000") {
        elemnt["BloomTaxonomyID"] = "81482ffc-2b4f-4cb5-b0a8-2aa1943cfcc4";
      }
      // "81482ffc-2b4f-4cb5-b0a8-2aa1943cfcc4" : fixed bloom id for newer active
    }

    const prepareObj = {
      "EAPaperTemplateID": this.createTemplateData['EAPaperTemplateID'],
      "TotalMarks": this.totalMarks,
      "Duration": this.totalTime,
      "NegativeMarks": this.negativeMark,
      "TotalQuestionCount": this.addedQuestionList[this.addedQuestionList.length - 1]['myIndex'],
      "changeStatus": 8,  //ready
      "PaperGenerationMethod": this.createTemplateData['PaperGenerationMethod'],
      "lstTemplateQuestions": this.addedQuestionList,
      "IsOMRPaper": this.createTemplateData['IsOMRPaper']
    }

    const prepareInstructionObj = {
      "EAPaperTemplateID": this.createTemplateData['EAPaperTemplateID'],
      "lstPaperInstructions": this.headerInstructionList
    }
    this.sharedService.saveUDSGPaper(prepareObj).subscribe(res => {

      // for cherry pick if we have no instruction then we are not going to call save instruction api
      let totaltemplate = -1;
      if (this.headerInstructionList.length > 0) {
        this.sharedService.saveCherrypickHeaderInstruction(prepareInstructionObj).subscribe(res => {
          this.closeInstructionModal();
          totaltemplate = JSON.parse(localStorage.getItem('TOTALPAPERCOUNT'));

          this.actionEmitter.emit(res);
        }, error => {
          this.toastr.error(error.error['message']);
        });
      } else {
        this.closeInstructionModal();
        this.actionEmitter.emit(res);
      }

      if (totaltemplate == 0) {
        this.facebookPixel.loadFBPixel('StartTrial');
      }

    }, error => {
      this.toastr.error(error.error['message']);

    })
  }

  //status will 7 pending
  saveDraftPaper() {
    for (let index = 0; index < this.addedQuestionList.length; index++) {
      let elemnt: any = {};
      elemnt = this.addedQuestionList[index];
      elemnt['Marks'] = 'numbering' in elemnt && elemnt['numbering'] == 'B' ? +this.addedQuestionList[index - 1]['Marks'] : +elemnt['Marks'];

      elemnt['QueIndex'] = this.addedQuestionList[index]['myIndex'];
      elemnt['QueNumber'] = elemnt['IsOr'] ? 'Q ' + elemnt['QueIndex'] + '(' + elemnt['numbering'].toLowerCase() + ')' : 'Q ' + elemnt['QueIndex'];
      if (elemnt["BloomTaxonomyID"] == "00000000-0000-0000-0000-000000000000") {
        elemnt["BloomTaxonomyID"] = "81482ffc-2b4f-4cb5-b0a8-2aa1943cfcc4";
      }
      // "81482ffc-2b4f-4cb5-b0a8-2aa1943cfcc4" : fixed bloom id for newer active
    }

    const prepareObj = {
      "EAPaperTemplateID": this.createTemplateData['EAPaperTemplateID'],
      "TotalMarks": this.totalMarks,
      "Duration": this.totalTime,
      "NegativeMarks": this.negativeMark,
      "TotalQuestionCount": this.addedQuestionList[this.addedQuestionList.length - 1]['myIndex'],
      "changeStatus": 7,
      "PaperGenerationMethod": this.createTemplateData['PaperGenerationMethod'],
      "lstTemplateQuestions": this.addedQuestionList,
      "IsOMRPaper": this.createTemplateData['IsOMRPaper']
    }
    this.sharedService.saveUDSGPaper(prepareObj).subscribe(res => {
      this.router.navigateByUrl('/exam/class-test-exam/dashboard')

      // if (window.innerWidth < 768) {
      //   this.router.navigateByUrl('/exam/class-test-exam/dashboard')
      // } else {
      //   this.router.navigate(['../../'], { relativeTo: this.route });
      // }

    }, error => {
      this.toastr.error(error.error['message']);
    })
  }
  deleteQuestion(indx) {
    this.suggestedQuestionsList[indx] = this.addedQuestionList[indx];
    let quesToBeDeleted = this.addedQuestionList[indx];
    if (this.totalMarks > 0 && !this.addedQuestionList[indx]['IsOr']) {
      this.totalMarks = this.totalMarks - this.addedQuestionList[indx]['Marks'];
      console.log(this.totalMarks);
      console.log(this.addedQuestionList[indx]['Marks']);
    }
    let startIndex = (!quesToBeDeleted['IsOr']);
    // make isOr false if it is a alternate question
    for (let index = startIndex ? indx : 0; index < this.addedQuestionList.length; index++) {
      let elemnt: any = {};
      elemnt = this.addedQuestionList[index];
      if ("myIndex" in quesToBeDeleted && "myIndex" in elemnt && +quesToBeDeleted['myIndex'] == +elemnt['myIndex']) {
        // elemnt['IsOr'] = false;
        delete elemnt['numbering'];
        delete elemnt['IsOr'];
        this.anyOneAlternateOpen = false;
      }
      // if('IsOr' in elemnt && elemnt['IsOr']) {
      //   elemnt['alternateIndex'] = +elemnt['alternateIndex'] > 1 ? +elemnt['alternateIndex'] - 1: 1;
      //   console.log('if isor available',  elemnt['IsOr'], elemnt['alternateIndex']);
      // }     
    }

    setTimeout(() => {
      this.addedQuestionList.splice(indx, 1);
      this.reviseIndexAddedQueList();
      this.validateTotalMarks();
    }, 10);

    console.log(this.totalQuestionMarksCount);
    console.log(this.totalMarks);

    // alert(this.addedQuestionList.length)
    this.beforelen = this.addedQuestionList.length - 1
    this.updatedQue = this.beforelen
    // alert(this.updatedQue)
  }

  closeInstructionModal() {
    this.headerInstructionList = [];
    this.CreateInstruction.hide();
    document.querySelector('body').classList.remove('modal-open');
  }

  ShowPriviousSelection() {
    this.isShowPriviousSelection = !this.isShowPriviousSelection;
  }
  closeDropDown(event) {
    this.isShowPriviousSelection = false;
  }

  skipInstructionandSave() {
    this.headerInstructionList = [];
    this.saveQuestionPaper();
  }

  onSortByMarksClick() {
    if (this.isasc) {
      this.addedQuestionList = this.addedQuestionList.sort((a, b) => a.Marks > b.Marks ? 1 : a.Marks < b.Marks ? -1 : 0);
    } else {
      this.addedQuestionList = this.addedQuestionList.sort((a, b) => a.Marks < b.Marks ? 1 : a.Marks > b.Marks ? -1 : 0);
    }
    this.reviseIndexAddedQueList();
    this.isasc = !this.isasc;
  }

  onChaperSelectionChange() {

    let ChapterIDs = [];
    if (!!this.filtersObj['ChapterID']) {
      for (const iterator of this.filtersObj['ChapterID']) {
        ChapterIDs.push(iterator.ChapterID);
      }
    }

    let Marks = [];
    if (!!this.filtersObj['Marks']) {
      for (const iterator of this.filtersObj['Marks']) {
        Marks.push(iterator.Marks);
      }
    }

    let DifficultyLevelIDs = [];
    if (!!this.filtersObj['difficulty']) {
      for (const iterator of this.filtersObj['difficulty']) {
        DifficultyLevelIDs.push(iterator.DifficultyLevelID);
      }
    }

    let QuestionLengthIDs = [];
    if (!!this.filtersObj['questionlength']) {
      for (const iterator of this.filtersObj['questionlength']) {
        QuestionLengthIDs.push(iterator.QuestionLengthID);
      }
    }

    let BloomTaxonomyIDs = [];
    if (!!this.filtersObj['bloom']) {
      for (const iterator of this.filtersObj['bloom']) {
        BloomTaxonomyIDs.push(iterator.BloomTaxonomyID);
      }
    }

    let QuestionNatureIDs = [];
    if (!!this.filtersObj['nature']) {
      for (const iterator of this.filtersObj['nature']) {
        QuestionNatureIDs.push(iterator.QuestionNatureID);
      }
    }


    let prepareObj = {
      "SubjectID": this.createTemplateData['SubjectID'],
      "ClassID": this.createTemplateData['ClassID'],
      "EAPaperTemplateID": this.createTemplateData['EAPaperTemplateID'],
      "ChapterIDs": ChapterIDs.length == 0 ? this.chepterIDs : ChapterIDs,
      "Marks": this.refreshSelectedUnselected && this.number == 2 ? [] : Marks,
      "DifficultyLevelIDs": this.refreshSelectedUnselected && this.number == 6 ? [] : DifficultyLevelIDs,
      "QuestionLengthIDs": this.refreshSelectedUnselected && this.number == 4 ? [] : QuestionLengthIDs,
      "BloomTaxonomyIDs": this.refreshSelectedUnselected && this.number == 5 ? [] : BloomTaxonomyIDs,
      "QuestionNatureIDs": this.refreshSelectedUnselected && this.number == 3 ? [] : QuestionNatureIDs,
      "IsOMRPaper": this.createTemplateData['IsOMRPaper'],
      "IsOwnQuestions": this.IsOwnQuestions
    }

    this.sharedService.getCherryPickFilterlist(prepareObj).subscribe(res => {
      var allFiltersList = res['data'];
      console.log(allFiltersList);
      var markList = [];
      allFiltersList['QuestionMarks'].forEach(element => {
        markList.push({ 'MarksID': element, "Marks": element });
      });
      allFiltersList['markList'] = markList;

      var DifficultyLevelList = [];
      allFiltersList['DifficultyLevelList'].forEach((element, indx) => {
        element['itemName'] = this.titleCase(element['DifficultyLevelName']);
        element['id'] = indx;
        DifficultyLevelList.push(element);
      });
      this.allFiltersList['DifficultyLevelList'] = DifficultyLevelList;

      var BloomTexonomylList = [];
      allFiltersList['BloomTexonomylList'].forEach((element, indx) => {
        element['itemName'] = this.titleCase(element['BloomTaxonomyName']);
        element['id'] = indx;
        BloomTexonomylList.push(element);
      });
      this.allFiltersList['BloomTexonomylList'] = BloomTexonomylList;

      var NatureList = [];
      allFiltersList['NatureList'].forEach((element, indx) => {
        element['itemName'] = this.titleCase(element['QuestionNatureName']);
        element['id'] = indx;
        NatureList.push(element);
      });
      this.allFiltersList['NatureList'] = NatureList;

      var QuestionLengthList = [];
      allFiltersList['QuestionLengthList'].forEach((element, indx) => {
        element['itemName'] = this.titleCase(element['QuestionLengthName']);
        element['id'] = indx;
        QuestionLengthList.push(element);
      });
      this.allFiltersList['QuestionLengthList'] = QuestionLengthList;

      var markList = [];
      allFiltersList['markList'].forEach((element, indx) => {
        element['itemName'] = element['Marks'];
        element['id'] = indx;
        markList.push(element);
      });
      this.allFiltersList['markList'] = markList;

      this.allFiltersList['paperSets'] = [{ 'itemName': 'Yes', 'id': 0 }];
      this.selectUnselectDropdowns(this.number, this.selectedItem);
    })
  }

  onClearFilter() {
    this.onDeSelectAll(1, false);
    this.onDeSelectAll(2, false);
    this.onDeSelectAll(3, false);
    this.onDeSelectAll(4, false);
    this.onDeSelectAll(5, false);
    this.onDeSelectAll(6, false);
    this.onDeSelectAll(7, true);
    this.callFilter();
  }

  onOpenDropdown(number, item) {
    this.number = number;
    this.selectedItem = item;
    this.refreshSelectedUnselected = true;
    if (number != 7 && number != 1)
      this.onSelectItem(true);

    if (
      (this.filtersObj.nature != undefined && this.filtersObj.nature.length > 0) ||
      (this.filtersObj.bloom != undefined && this.filtersObj.bloom.length > 0) ||
      (this.filtersObj.difficulty != undefined && this.filtersObj.difficulty.length > 0) ||
      (this.filtersObj.paperSets != undefined && this.filtersObj.paperSets.length > 0) ||
      (this.filtersObj.questionlength != undefined && this.filtersObj.questionlength.length > 0) ||
      (this.filtersObj.Marks != undefined && this.filtersObj.Marks.length > 0) ||
      (this.filtersObj.ChapterID != undefined && this.filtersObj.ChapterID.length > 0)
    ) {
      this.isFiltersValid = true;
    } else {
      this.isFiltersValid = false;
    }
  }

  selectUnselectDropdowns(number, item) {
    if (!this.refreshSelectedUnselected) return;
    var selectedItem = item;
    if (number == 1) {
      // this.allFiltersList.markList.forEach(element => {
      //   if(selectedItem.findIndex(x => x.ChapterID == element.ChapterID) > -1){
      //     this.filtersObj.ChapterID.push(element);
      //   }
      // });  
    }
    if (number == 2 && selectedItem != undefined) {
      this.filtersObj.Marks = [];
      this.allFiltersList.markList.forEach(element => {
        if (selectedItem.findIndex(x => x.MarksID == element.MarksID) > -1) {
          this.filtersObj.Marks.push(element);
        }
      });

    }
    if (number == 3 && selectedItem != undefined) {
      this.filtersObj.nature = [];
      this.allFiltersList.NatureList.forEach(element => {
        if (selectedItem.findIndex(x => x.QuestionNatureID == element.QuestionNatureID) > -1) {
          this.filtersObj.nature.push(element);
        }
      });
    }

    if (number == 4 && selectedItem != undefined) {
      this.filtersObj.questionlength = [];
      this.allFiltersList.QuestionLengthList.forEach(element => {
        if (selectedItem.findIndex(x => x.QuestionLengthID == element.QuestionLengthID) > -1) {
          this.filtersObj.questionlength.push(element);
        }
      });
    }
    if (number == 5 && selectedItem != undefined) {
      this.filtersObj.bloom = [];
      this.allFiltersList.BloomTexonomylList.forEach(element => {
        if (selectedItem.findIndex(x => x.BloomTaxonomyID == element.BloomTaxonomyID) > -1) {
          this.filtersObj.bloom.push(element);
        }
      });
    }
    if (number == 6 && selectedItem != undefined) {
      this.filtersObj.difficulty = [];
      this.allFiltersList.DifficultyLevelList.forEach(element => {
        if (selectedItem.findIndex(x => x.DifficultyLevelID == element.DifficultyLevelID) > -1) {
          this.filtersObj.difficulty.push(element);
        }
      });
    }

    if (this.number == 2)
      ($("#marksDropdown").find(".cuppa-dropdown").find(".dropdown-list")).show();
    else if (this.number == 3)
      ($("#natureDropdown").find(".cuppa-dropdown").find(".dropdown-list")).show();
    else if (this.number == 4)
      ($("#lengthDropdown").find(".cuppa-dropdown").find(".dropdown-list")).show();
    else if (this.number == 5)
      ($("#bloomDropdown").find(".cuppa-dropdown").find(".dropdown-list")).show();
    else if (this.number == 6)
      ($("#difficultyDropdown").find(".cuppa-dropdown").find(".dropdown-list")).show();

    this.refreshSelectedUnselected = false;
  }

  onFilterDeSelectAll() {
    this.onSelectItem(true);
  }

  addQuestionAction() {
    this.clearAddModal();
    this.getAllMasters();
    // alert(this.getAllMasters())
  }

  closeAddQuestionPopup() {
    this.addQuestion.hide();
  }


  onChapterChange(event) {
    this.addQueTopics = [];
    this.addQueTopics = event.lstInfoMember;
  }

  getAllMasters() {
    let prepareobj = {
      "EAPaperTemplateID": this.createTemplateData['EAPaperTemplateID'],
      "InstituteID": this.schoolInfo.InstituteID,
      "BoardID": this.schoolInfo.BoardID,
      "MediumID": this.schoolInfo.MediumID,
      "ClassID": this.createTemplateData["ClassID"],
      "SubjectID": this.createTemplateData["SubjectID"]
    }
    this.sharedService.getallMasters(prepareobj).subscribe(
      result => {
        this.allmasterData = result;
        this.addQueChapters = result.lstEASelectedChapters;
        this.addQueTopics = [];
        this.addQueBloom = result.BloomTexonomylList;
        this.addQueDifficulty = result.DifficultyLevelList;
        this.addQueNature = result.NatureList;
        this.addQueLength = result.QuestionLengthList;
        this.addQueType = result.QuestionTypeList;

        if (this.IsOmr == 'true') {
          let mcqtype = this.addQueNature.filter(e => e.QuestionNatureName == 'MULTIPLE CHOICE QUESTION');
          this.QuestionNatureID = mcqtype[0].QuestionNatureID;
        }

        this.addnumberOfOption = [
          { id: 0, name: '- Select -' },
          { id: 2, name: '2' },
          { id: 3, name: '3' },
          { id: 4, name: '4' },
          { id: 5, name: '5' },
          { id: 6, name: '6' }
        ];

        this.addAnswerType = [
          { id: '', name: '- Select -' },
          { id: 'A,B,C', name: 'A,B,C' },
          { id: '1,2,3', name: '1,2,3' },
          { id: 'i,ii,iii', name: 'i,ii,iii' }
        ];

        this.AnswerType = 'A,B,C'

        this.addQuestion.show();
      }, error => {
        this.toastr.error(error.error['message']);
      }

    )
    // this.updatedQue=this.allmasterData
    //   alert(this.updatedQue );
  }

  validateSaveQuestion() {
    var isvalid = false;
    if (this.ChapterID == "" || this.ChapterID == undefined) {
      this.toastr.error("Please Select Chapter");
    } else if (this.TopicID == "" || this.TopicID == undefined) {
      this.toastr.error("Please Select Topic");
    } else if (this.QuestionType == "" || this.QuestionType == undefined) {
      this.toastr.error("Please Select Question Type");
    } else if (this.QuestionMark == "" || this.QuestionMark == undefined) {
      this.toastr.error("Please Add Question Mark");
    } else if (this.DifficultyLevelID == "" || this.DifficultyLevelID == undefined) {
      this.toastr.error("Please Select DifficultyLevel");
    } else if (this.QuestionLengthID == "" || this.QuestionLengthID == undefined) {
      this.toastr.error("Please Select QuestionLength");
    } else if (this.QuestionNatureID == "" || this.QuestionNatureID == undefined) {
      this.toastr.error("Please Select QuestionNature");
    } else if (this.QuestionDescription == "" || this.QuestionDescription == undefined) {
      this.toastr.error("Please Add Question Description");
    } else if (this.IsOmr == 'true') {
      let IsAns = true;
      this.addRightAnswer.forEach(element => {
        let ckid = "editor_" + element.name;
        let data = CKEDITOR.instances[ckid].getData();
        let ans = data.trim("\n");
        if ((ans == "" || ans == undefined) && IsAns) {
          this.toastr.error("Please Add Option " + element.id);
          IsAns = false;
          return IsAns;
        }
      });

      if (IsAns && (this.QuestionAnswer == "" || this.QuestionAnswer == undefined)) {
        this.toastr.error("Please Add Answer Description");
        IsAns = false;
      }

      return IsAns;

    } else if (this.haveAnswer && (this.QuestionAnswer == "" || this.QuestionAnswer == undefined)) {
      this.toastr.error("Please Add Answer Description");
    } else {
      isvalid = true;
    }
    return isvalid;
  }

  saveAndreplaceQuestionData() {
    let Options = [];
    let ckid = "editor_answer";
    let data_answer = CKEDITOR.instances[ckid].getData();
    this.QuestionAnswer = data_answer;

    ckid = "editor_question";
    let data_question = CKEDITOR.instances[ckid].getData();
    this.QuestionDescription = data_question;

    if (!this.validateSaveQuestion()) {
      return;
    }

    if (this.IsOmr == 'true') {
      this.haveAnswer = true;

      let i = 1;
      this.addRightAnswer.forEach(element => {
        ckid = "editor_" + element.name;
        let data = CKEDITOR.instances[ckid].getData();
        let IsCorrectAns = this.RightAnswer.filter(e => e == element.name).length > 0 ? true : false;

        Options.push({
          "OptionSlag": element.id,
          "OptionValue": data.trim("\n"),
          "IsCorrect": IsCorrectAns,
          "OptionIndex": i
        });

        i++;
      });
    }

    let dataobj = {
      "BoardID": this.schoolInfo.BoardID,
      "MediumID": this.schoolInfo.MediumID,
      "ClassID": this.createTemplateData['ClassID'],
      "SubjectID": this.createTemplateData['SubjectID'],
      "ChapterID": this.ChapterID,
      "TopicID": this.TopicID,
      "QuestionDescription": this.QuestionDescription,
      "QuestionAnswer": this.QuestionAnswer,
      "QuestionMark": this.QuestionMark,
      "BloomTaxonomyID": "00000000-0000-0000-0000-000000000000",
      "DifficultyLevelID": this.DifficultyLevelID,
      "QuestionLengthID": this.QuestionLengthID,
      "QuestionNatureID": this.QuestionNatureID,
      "QuestionType": this.QuestionType,
      "isAnswered": true,
      "QuestionHint": '',
      "AnswerType": this.AnswerType,
      "haveAnswer": this.haveAnswer,
      "Options": Options
    };

    this.sharedService.saveUserQuestion(dataobj).subscribe(
      result => {
        if (result['success'] == false) {
          this.toastr.error(result['message']);
        } else {
          dataobj['Questionid'] = result["data"].EA_User_MasterQuestionID;
          dataobj['BloomTaxonomyName'] = result["data"].BloomTaxonomyName;
          dataobj['DifficultyLevelName'] = result["data"].DifficultyLevelName;
          dataobj['QuestionLengthName'] = result["data"].QuestionLengthName;
          dataobj['QuestionLengthShortName'] = result["data"].QuestionLengthShortName;
          dataobj['QuestionNatureName'] = result["data"].QuestionNatureName;
          dataobj['ChapterName'] = result["data"].ChapterName;
          dataobj['Marks'] = result["data"].QuestionMark;
          dataobj['myIndex'] = this.addedQuestionList.length + 1;
          dataobj['QuestionSource'] = 5;
          dataobj['lstOptionMasters'] = result["data"].Options;
          this.addedQuestionList.push(dataobj);
          this.validateTotalMarks();
          this.reviseIndexAddedQueList();
          this.addQuestion.hide();
          this.clearAddModal();
          this.toastr.success(result['message']);
        }
      }, error => {
        this.toastr.error(error.error['message']);
      });
  }


  clearAddModal() {
    this.ChapterID = '';
    this.TopicID = '';
    this.QuestionDescription = '';
    this.QuestionAnswer = '';
    this.RightAnswer = [];
    this.QuestionMark = '';
    this.BloomTaxonomyID = '';
    this.DifficultyLevelID = '';
    this.QuestionLengthID = '';
    this.QuestionNatureID = '';
    this.QuestionType = '';
    this.isAnswered = '';
    this.haveAnswer = false;
    this.AnswerType = '';
    this.addQueAnswerOption = [];
    this.isShowRightAnswer = false;
    this.isShowMcqData = false;
    this.numberOfOption = 0;
    this.QuestionNatureID = '';

    let ckid = "editor_answer";
    CKEDITOR.instances[ckid].setData('');

    ckid = "editor_question";
    CKEDITOR.instances[ckid].setData('');

    this.addRightAnswer.forEach(element => {
      ckid = "editor_" + element.name;
      CKEDITOR.instances[ckid].setData('');
    });
  }

  numericOnly(event): boolean {
    console.log(event);
    const key = (event.which) ? event.which : event.keyCode;
    if (key == 8 ||
      key == 9 ||
      key == 13 ||
      key == 46 ||
      key == 110 ||
      key == 190 ||
      (key >= 35 && key <= 40) ||
      (key >= 48 && key <= 57) ||
      (key >= 96 && key <= 105)) {
      return true;
    }
    return false;
  }

  setFile(event) {
    let formData = new FormData();
    formData.append('upload', event.target.files[0]);
    this.fservice.uploadfile(formData).subscribe(data => {
      var dialog = CKEDITOR.dialog.getCurrent();
      dialog.selectPage('info');
      var tUrl = dialog.getContentElement('info', 'txtUrl');
      tUrl.setValue(data.data);
    });
  }

  closeModel() {
    this.addQuestion.hide();
  }

  isrightanslist() {
    this.addRightAnswer = [];
    if (this.numberOfOption > 0 && this.AnswerType != '') {
      for (var i = 0; i < this.numberOfOption; i++) {
        if (this.AnswerType.startsWith('A')) {
          this.addRightAnswer.push({ id: (i + 10).toString(36).toUpperCase(), name: 'Option ' + (i + 10).toString(36).toUpperCase() });
        }
        else if (this.AnswerType.startsWith('1')) {
          this.addRightAnswer.push({ id: (i + 1), name: 'Option ' + (i + 1) });
        }
        else if (this.AnswerType.startsWith('i')) {
          this.addRightAnswer.push({ id: this.romanize(i + 1), name: 'Option ' + this.romanize(i + 1) });
        }
      }
    }
  }

  romanize(num) {
    if (isNaN(num))
      return NaN;
    var digits = String(+num).split(""),
      key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
      roman = "",
      i = 3;
    while (i--)
      roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
  }

  bindownque(value: any) {
    this.IsOwnQuestions = value;
    this.suggestedQuestionsList = [];
    this.totalNoOfPages = 0;
    this.applyFilter(true);
  }
}
