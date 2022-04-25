import { Component, OnInit, Input, ViewChild, ɵConsole, Output, EventEmitter, AfterViewInit } from '@angular/core';
// import { TemplateService } from 'src/app/layout/template-setup/template.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective, BsModalService } from 'ngx-bootstrap';
import { MathjaxComponent } from '../mathjax/mathjax.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterService } from 'src/app/authentication/register.service';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material';
import { FileserviceService } from 'src/app/services/fileservice.service';
import { ClassTestExamService } from 'src/app/layout/class-test-exam/class-test-exam.service';
import { AngularMultiSelect } from 'angular2-multiselect-dropdown';
declare const $: any;
declare const CKEDITOR: any;
@Component({
  selector: 'app-global-paper-generate',
  templateUrl: './global-paper-generate.component.html',
  styleUrls: ['./global-paper-generate.component.scss']
})
export class GlobalPaperGenerateComponent implements OnInit {

  @ViewChild('editHeader') editHeader: ModalDirective;
  @ViewChild('replaceQuestion') step1: ModalDirective;
  @ViewChild('addQuestionModal') addQuestion: ModalDirective;
  @ViewChild(MathjaxComponent) childView: MathjaxComponent;

  @ViewChild('dropdownRef') dropdownRef: AngularMultiSelect;
  @ViewChild('dropdownRef1') dropdownRef1: AngularMultiSelect;
  @ViewChild('dropdownRef2') dropdownRef2: AngularMultiSelect;
  @ViewChild('dropdownRef3') dropdownRef3: AngularMultiSelect;
  @ViewChild('dropdownRef4') dropdownRef4: AngularMultiSelect;
  @ViewChild('dropdownRef5') dropdownRef5: AngularMultiSelect;

  replaceQuestionList: any = [];
  @Input() title: string;
  @Output() actionEmitter: EventEmitter<string> = new EventEmitter<string>();
  isMousEnetr: boolean = false;
  isInstructionEdit = false;
  templateID: '';
  createTemplateDataObj: any = {};
  schoolInfo: any = {};
  papaerHeader: any = {};
  HeaderInstruction: any = [];
  QuestionInstruction: any = [];
  childIndex = 0
  pIndex = 0;
  isReplacedQuestionSelected: boolean = false;
  selectedQuestion: any = {};
  isAddMoreEnabled: boolean = true;
  EAPaperTemplateID: any = '';
  isPaperMarksValid: boolean = true;
  showFilter: boolean = false;
  // filters: any = {};
  isEditPaper: boolean = false;
  selectedChapterLists: any = [];
  chapterlistt: any = [];
  chapterlistf: any = [];
  chapterlistl: any = [];
  AllselectedItems = [];

  collection = [];
  rowsOnPage = 20;
  page: number = 1;
  lastIndex: number = 0;
  public rowsOnPageSet = [10, 25, 50, 100];
  filtersObj: any = {};
  totalNoOfPages: number = 0;

  selectedPaperNature: any = [];
  selectedBloomComposition: any = [];
  selectedDifficultyLevel: any = [];
  selectedQuestionMarks: any = [];
  questionToBeReplaced: any;
  modalRef: any;
  selectedIndex: number;
  PaperInstructionId = "";
  isShowPaperInfo: boolean = false;
  isShowDonebtn: boolean = false;
  chapterDropdownSetting: any = {};
  natureDropdownSetting: any = {};
  bloomDropdownSetting = {};
  lengthDropdownSetting = {};
  marksDropdownSetting = {};
  difficultyDropdownSetting = {};
  isFiltersValid: boolean = false;

  editHeaderForm: FormGroup;
  headerlogoFileName: string = '';
  headerlogoFileSrc: any;

  isGuestTeacher = false;
  isCheryPick = false;
  fontFamilyNGModel = 'Calibri';
  fontFamily = [
    { value: 'Arial', key: 'arial,sans-serif' },
    { key: "'Times New Roman', Times ,serif", value: 'Times New Roman' },
    { key: 'Verdana', value: 'Verdana' },
    { key: 'Calibri', value: 'Calibri' }
  ]
  fontSizeNGModel = '18';
  fontSizes = [
    { value: '12', key: '12' },
    { key: '14', value: '14' },
    { key: '18', value: '18' },
    { key: '20', value: '20' },
    { key: '24', value: '24' },
    { key: '28', value: '28' }
  ]

  isPaperApproved: boolean = false;

  addQueChapters: any = [];
  addQueTopics: any = [];
  addQueBloom: any = [];
  addQueDifficulty: any = [];
  addQueNature: any = [];
  addQueLength: any = [];
  addQueType: any = [];
  addQueAnswerOption: any = [];
  numberOfOption = 0;

  selectedNature = '';
  isShowMcqData = false;
  isShowRightAnswer = false;
  isErrorShow = false;

  allFiltersList: any = {
    'ChaptersList': [],
    'QuestionMarks': [],
    'NatureList': [],
    'BloomTexonomylList': [],
    'DifficultyLevelList': [],
    'allchapterlist': []
  };

  iscustom = false;
  cheight = 0;
  cwidth = 0;
  imgcount = 0;
  constructor(private route: ActivatedRoute,
    private sharedService: SharedDataService,
    private toastr: ToastrService,
    private modalservice: BsModalService,
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private fservice: FileserviceService,
    private classTestExamService: ClassTestExamService) { }
  ngOnInit() {
    localStorage.setItem('font', this.fontFamilyNGModel);
    localStorage.setItem('font-size', this.fontSizeNGModel); 
    localStorage.setItem("ImageSizeHeight","25");
    localStorage.setItem("ImageSizeWidth","25");
    let getUserinfo = JSON.parse(localStorage.getItem('user'));
    if (getUserinfo.roles.indexOf('GuestTeacher') != -1) {
      this.isGuestTeacher = true;
    }

    this.editHeaderForm = this.formBuilder.group({
      PaperHeaderName: [''],
      Address: [''],
      StudentID: '',
      PaperHeaderImage: [null],
    });

    this.isShowPaperInfo = JSON.parse(localStorage.getItem('institute')).IsDemo;
    this.schoolInfo = JSON.parse(localStorage.getItem('schoolProfile'));
    this.papaerHeader = JSON.parse(localStorage.getItem('PaperHeader'));

    this.route.params.subscribe(id => {
      this.EAPaperTemplateID = id.id;
      this.getWorksheetQuestionPaper();
    });

    this.chapterDropdownSetting = {
      singleSelection: false,
      text: "Select Chapter",
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
      // groupBy: "TextBookName"
    }
    this.natureDropdownSetting = {
      singleSelection: false,
      text: "Select Nature",
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };

    this.bloomDropdownSetting = {
      singleSelection: false,
      text: "Select Bloom",
      idField: 'BloomTaxonomyID',
      textField: 'BloomTaxonomyName',
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };

    this.lengthDropdownSetting = {
      singleSelection: false,
      text: "Select Length",
      idField: 'BloomTaxonomyID',
      textField: 'BloomTaxonomyName',
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };

    this.difficultyDropdownSetting = {
      singleSelection: false,
      text: "Select Difficulty",
      idField: 'DifficultyLevelID',
      textField: 'DifficultyLevelName',
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };

    this.marksDropdownSetting = {
      singleSelection: false,
      text: "Select Marks",
      selectAllText: 'SELECT ALL',
      unSelectAllText: 'DESELECT ALL',
      itemsShowLimit: 1,
      badgeShowLimit: 1,
    };
    this.changeFontFamily(event);
    this.changeFontSize(event);
    window.scrollTo({left:0,top:0});
  }

  changeFontFamily(evt) {
    const questionArea: any = document.querySelectorAll('.question-preview mathjax.question, .question-preview .question-count, .question-preview mathjax.question ol,.question-preview mathjax.question table, .question-preview mathjax.question ul');
    questionArea.forEach(element => {
      element.style.fontFamily = this.fontFamilyNGModel;
      localStorage.setItem('font', this.fontFamilyNGModel);
    });
    // questionArea.style.fontFamily = this.fontFamilyNGModel;

  }
  changeFontSize(evt) {
    const questionArea: any = document.querySelectorAll('.question-preview mathjax.question, .question-preview mathjax.question p, .question-preview mathjax.question table, .question-preview mathjax.question ul, .question-preview mathjax.question ol, .question-preview .question-count, .question-preview .question-opt');
    questionArea.forEach(element => {
      element.style.fontSize = this.fontSizeNGModel + "px";
      localStorage.setItem('font-size', this.fontSizeNGModel);
    });
  }
  // onSelectItem() {
  //   setTimeout(() => {

  //     if ((this.filters.ChapterId != undefined && this.filters.ChapterId.length > 0)) {
  //       this.isFiltersValid = true;
  //     } else {
  //       this.isFiltersValid = false;
  //     }
  //   }, 10);
  // }
  getWorksheetQuestionPaper() {
    this.sharedService.getWorksheetQuestionList(this.EAPaperTemplateID, this.sharedService.getIsOmr()).subscribe(
      // this.sharedService.getWorksheetQuestionList('CEEFFA54-3D49-4320-A099-2007B420F338').subscribe(
      result => {
        this.createTemplateDataObj = result.paperTemplateInfo;
        if (this.createTemplateDataObj.PaperGenerationMethod == 3) {
          if (localStorage.getItem('SUBJECTSETTINGS') != null) {
            this.isCheryPick = !(JSON.parse(localStorage.getItem('SUBJECTSETTINGS')).isbloom);
          } else {
            this.isCheryPick = true;
          }
        }
        this.HeaderInstruction = result.HeaderInstruction;
        this.QuestionInstruction = result.QuestionInstruction;
        setTimeout(() => {
          this.imgcount = $('.question-preview img').length;
        }, 200);
        setTimeout(() => {
          $('.main-answer-img img').css({ 'height': 25 + "%", 'width': 25 + "%" });
          $('.main-answer-img img').attr('height', 25 + "%");
          $('.main-answer-img img').attr('width', 25 + "%");
          }, 1000);
      }, error => {
      }
    )
  }

  InstructionEdit(indx) {
    this.HeaderInstruction[indx].isInstructionEdit = true;
    this.isShowDonebtn = true;
  }

  saveInstruction(instruction, type, indx) {
    this.isShowDonebtn = false;
    // if(instruction.Instruction != '') {
    if (instruction.Instruction.trim().length > 0) {
      let obj = {};
      if (type == 'edit') {
        obj = {
          "PaperInstructionId": instruction.PaperInstructionId,
          "EAPaperTemplateID": this.createTemplateDataObj['EAPaperTemplateID'],
          // "InstructionNumber": 1,
          "InstructionNumber": instruction.InstructionNumber,
          "Title": instruction.Title,
          "Instruction": instruction.Instruction,
          "HaveOr": instruction.HaveOr,
          "TotalMarks": instruction.TotalMarks,
          "IsHeaderInstruction": instruction.IsHeaderInstruction
        }
      } else {
        obj = {
          "PaperInstructionId": "00000000-0000-0000-0000-000000000000",
          "EAPaperTemplateID": this.createTemplateDataObj['EAPaperTemplateID'],
          "InstructionNumber": 1,
          "Title": instruction.Title,
          "Instruction": instruction.Instruction,
          "HaveOr": instruction.HaveOr,
          "TotalMarks": instruction.TotalMarks,
          "IsHeaderInstruction": instruction.IsHeaderInstruction
        }
      }
      this.sharedService.saveHeaderInstruction(obj).subscribe(result => {
        this.HeaderInstruction[indx]['isInstructionEdit'] = false;
        this.HeaderInstruction[indx]['PaperInstructionId'] = result;
        instruction.isMousEnetr = false;
        this.isAddMoreEnabled = true;
      }, error => {
        this.toastr.error(error.error['message']);
      });
    } else {
      this.removeInstruction(indx);
    }
  }

  //add new header insruction
  addNewHeaderInstruction() {
    this.isAddMoreEnabled = false;
    let obj = {
      "EAPaperTemplateID": this.createTemplateDataObj['EAPaperTemplateID'],
      "InstructionNumber": this.HeaderInstruction.length + 1,
      "Title": '',
      "Instruction": '',
      "HaveOr": false,
      "TotalMarks": 0,
      "IsHeaderInstruction": true,
      'isInstructionEdit': true,
      'isMousEnetr': false
    }
    this.HeaderInstruction.push(obj);
  }

  //relpace question

  replaceQuestionAction(question, chIndx, pIndx) {
    // this.getReplaceQuestion();
    // this.getmarks();
    this.childIndex = chIndx;
    this.pIndex = pIndx;
    this.step1.show();
    this.questionToBeReplaced = question;
    this.page = 1;
    this.lastIndex = 0;

    let ChapterIDs = [];
    for (const iterator of this.chapterlistl) {
      ChapterIDs.push(iterator['ChapterId']);
    }
    this.getfilterList(ChapterIDs);


  }

  // getReplaceQuestion(question) {
  //   console.log(question, 'question');
  //   let ChapterIDss = [];
  //   if (!!this.chapterlistl) {
  //     for (const iterator of this.chapterlistl) {
  //       ChapterIDss.push(iterator['ChapterId']);
  //     }
  //   }

  //   let prepareobj = {
  //     "Marks": question.Marks,
  //     "ChapterIDs": ChapterIDss,
  //     "QuestionNatureIDs": question.QuestionNatureID ? [question.QuestionNatureID] : [],
  //     "DifficultyLevelIDs": question.DifficultyLevelID ? [question.DifficultyLevelID] : [],
  //     "BloomTaxonomyIDs": question.BloomTaxonomyID ? [question.BloomTaxonomyID] : [],
  //     "IsOMRPaper": this.createTemplateDataObj['IsOMRPaper'],
  //     "PageIndex": 1,
  //     "PageSize": 500
  //   }
  //   this.sharedService.getReplaceQuestion(prepareobj).subscribe(
  //     result => {
  //       console.log(this.filtersObj);
  //       this.replaceQuestionList = result;
  //     }, error => {
  //       this.replaceQuestionList = [];
  //       this.toastr.error(error.error['message']);
  //     }
  //   )
  // }


  getReplaceQuestionNew(question) {
    let ChapterIDss = [];
    if (!!this.chapterlistl) {
      for (const iterator of this.chapterlistl) {
        ChapterIDss.push(iterator['ChapterId']);
      }
    }

    let prepareobj = {
      "Marks": question.Marks,
      "ChapterIDs": ChapterIDss,
      "QuestionNatureIDs": question.QuestionNatureID ? [question.QuestionNatureID] : [],
      "DifficultyLevelIDs": question.DifficultyLevelID ? [question.DifficultyLevelID] : [],
      "BloomTaxonomyIDs": question.BloomTaxonomyID ? [question.BloomTaxonomyID] : [],
      "IsOMRPaper": this.createTemplateDataObj['IsOMRPaper'],
      "PageIndex": 1,
      "PageSize": 500
    }
    this.sharedService.getReplaceQuestion(prepareobj).subscribe(
      result => {
        this.replaceQuestionList = result;
      }, error => {
        this.replaceQuestionList = [];
        this.toastr.error(error.error['message']);
      }
    )
  }

  // Replace question's data here
  replaceQuestionData() {
    setTimeout(() => {
      this.selectedQuestion['Marks'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['Marks'];
      this.selectedQuestion['QueNumber'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['QueNumber'];
      this.selectedQuestion['QueIndex'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['QueIndex'];
      this.selectedQuestion['EAPaperTemplateID'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['EAPaperTemplateID'];
      this.selectedQuestion['InstructionId'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['InstructionId'];
      this.selectedQuestion['IsOr'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['IsOr'];
      this.selectedQuestion['QuestionSource'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['QuestionSource'];
      this.selectedQuestion['SubQuestionIndex'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['SubQuestionIndex'];
      this.selectedQuestion['PaperSetMappingId'] = this.QuestionInstruction[this.pIndex].Questions[this.childIndex]['PaperSetMappingId'];

      this.QuestionInstruction[this.pIndex].Questions[this.childIndex] = this.selectedQuestion;
      // this.QuestionInstruction[this.pIndex].TotalMarks = this.selectedQuestion['Marks'];
    }, 1000);

    this.closeReplacePopup();
  }

  //close replace popup
  closeReplacePopup() {
    this.step1.hide();
    this.filtersObj = {};
    this.replaceQuestionList = [];
    this.showFilter = true;
    this.closeFilterBox();
  }

  selectQuestionForReplace(question) {
    this.isReplacedQuestionSelected = true;
    this.selectedQuestion = question;
  }

  closeAddQuestionPopup() {
    this.addQuestion.hide();
  }
  //edit question instruction
  InstructionQuestionEdit(indx) {
    this.QuestionInstruction[indx].isInstructionEdit = true;
  }

  confirmDeleteWing(template, PaperInstructionId, indx) {
    this.selectedIndex = indx;
    this.PaperInstructionId = PaperInstructionId;
    this.modalRef = this.modalservice.show(template, { class: 'modal-md' });
  }

  deleteHeaderInstruction() {
    this.sharedService.deleteInstruction(this.PaperInstructionId).subscribe(
      res => {
        this.HeaderInstruction.splice(this.selectedIndex, 1);
        this.modalRef.hide();
        if (this.HeaderInstruction.length <= 0) {
          this.editPaper();
        }
        this.toastr.success('Instruction deleted successfully.');
      }, error => {
        this.toastr.error(error.error['message']);
      }
    )
  }

  // remove instruction which generate client side only
  removeInstruction(index) {
    this.HeaderInstruction[index]['Instruction'] = "";
    this.HeaderInstruction.splice(index, 1);
    this.isAddMoreEnabled = true;
  }
  //save question instruction
  saveQuestionInstruction(questionInstruction, parent, child) {

    if (!!questionInstruction.Instruction) {
      let obj = {};
      obj = {
        "PaperInstructionId": questionInstruction.PaperInstructionId,
        "EAPaperTemplateID": this.createTemplateDataObj['EAPaperTemplateID'],
        "InstructionNumber": questionInstruction.InstructionNumber,
        "Title": ' ',
        "Instruction": questionInstruction.Instruction,
        "HaveOr": questionInstruction.HaveOr,
        "TotalMarks": questionInstruction.TotalMarks,
        "IsHeaderInstruction": questionInstruction.IsHeaderInstruction
      }
      this.sharedService.saveHeaderInstruction(obj).subscribe(result => {
        this.QuestionInstruction[parent]['isInstructionEdit'] = false;
        this.QuestionInstruction[parent]['Questions'][child]['isMousEnetr'] = false;
      }, error => {

      })
    }
  }

  //save final paper
  saveQuestionPaper(type) {
    const totalMarks = this.createTemplateDataObj['TotalMarks'];
    let countMarks = 0;
    let lstTemplateQuestions = [];
    this.QuestionInstruction.forEach((element, pIndx) => {
      let noOfQuestion = element.Questions.length;
      countMarks = countMarks + element.TotalMarks;
      element.Questions.forEach((chElmnt, chIndx) => {
        lstTemplateQuestions.push(chElmnt);
        if (pIndx == this.QuestionInstruction.length - 1 && chIndx == element.Questions.length - 1) {
          if (totalMarks === countMarks) {
            this.saveAPICall(lstTemplateQuestions, type);
          } else {
            this.toastr.error("Total of selected questions marks should be equal to total marks of paper.");
          }
        }
      });
    });
  };
  saveAPICall(lstTemplateQuestions: any[], type) {

    let prepareObj = {
      "EAPaperTemplateID": this.createTemplateDataObj['EAPaperTemplateID'],
      "TotalMarks": this.createTemplateDataObj['TotalMarks'],
      "Duration": this.createTemplateDataObj['Duration'],
      "TotalQuestionCount": this.createTemplateDataObj['TotalQuestionCount'],
      "changeStatus": type,
      "NegativeMarks": this.createTemplateDataObj['NegativeMarks'],
      "lstTemplateQuestions": lstTemplateQuestions,
      "IsOMRPaper": this.createTemplateDataObj['IsOMRPaper']
    }
    this.sharedService.saveUDSGPaper(prepareObj).subscribe(result => {
      if (type == 6) {
        this.router.navigate(['../../dashboard'], { relativeTo: this.route });
      } else if (type == 7) {
        this.router.navigate(['../../dashboard'], { relativeTo: this.route });
      } else {
        this.router.navigate(['../../view-paper', this.createTemplateDataObj['EAPaperTemplateID'], 1], { relativeTo: this.route });
      }
    }, error => {
      this.toastr.error(error.error['message']);
    })
  }

  editPaper() {
    this.isEditPaper = !this.isEditPaper;
  }

  showFilterBox() {
    this.showFilter = !this.showFilter;
  }

  closeFilterBox() {
    this.showFilter = false;
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

  clearFilter() {
    // this.filters = {};
    this.filtersObj.ChapterID = [];
    this.chapterlistl = [];
    this.filtersObj.nature = [];
    this.filtersObj.questionlength = [];
    this.filtersObj.Marks = [];
    this.filtersObj.bloom = [];
    this.filtersObj.difficulty = [];
    this.replaceQuestionList = [];
    this.applyFilter();
  }
  viewAnswer() {
    let baseHref = location.href.split('#')[0];

    if (this.createTemplateDataObj['PaperType'] != 4) {
      window.open(baseHref + '#/exam/class-test-exam/answersheet/' + this.createTemplateDataObj['EAPaperTemplateID'], '_blank');

    } else {
      window.open(baseHref + '#/exam/worksheet-setup/answersheet/' + this.createTemplateDataObj['EAPaperTemplateID'], '_blank');
    }
  }

  numericOnly(event): boolean { // restrict e,+,-,E characters in  input type number
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode == 101 || charCode == 69 || charCode == 45 || charCode == 43) {
      return false;
    }

    return true;

  }

  editLogo() {
    this.editHeaderForm.patchValue({
      PaperHeaderName: this.papaerHeader.InstituteName,
      Address: this.papaerHeader.InstituteAddress,
      StudentID: this.schoolInfo.StudentID,
    });
    this.editHeader.show();
  }

  removeImage(){
    this.registerService.removeImage(this.schoolInfo.StudentID).subscribe(
      ()=>{
        this.toastr.success('Image removed successfully.');    
      },
      ()=>{
        this.toastr.error('Image removed error.');
      }
    );
    this.papaerHeader.InstituteImage = null;
    this.headerlogoFileName = '';
    localStorage.setItem('PaperHeader', JSON.stringify(this.papaerHeader));
    this.headerlogoFileSrc = this.papaerHeader.InstituteImage;
    this.editHeader.hide();
  }

  closeeditheaderDialog() {
    this.editHeader.hide();
  }

  saveheaderData() {
    this.registerService.updateHeaderInfo(this.editHeaderForm.value).subscribe(result => {
      if (result['success'] == false) {
        this.toastr.error(result['message']);
        this.headerlogoFileSrc = null;
      } else {
        this.toastr.success(result['message']);
        var PaperHeader = {
          InstituteImage: result['data'].PaperHeaderImage = '' ? this.papaerHeader.InstituteImage : result['data'].PaperHeaderImage,
          InstituteName: result['data'].PaperHeaderName,
          InstituteAddress: result['data'].PaperHeaderAddress,
        };
        this.headerlogoFileSrc = PaperHeader.InstituteImage;
        localStorage.removeItem('PaperHeader');
        this.papaerHeader = PaperHeader;
        localStorage.setItem('PaperHeader', JSON.stringify(PaperHeader));

        this.editHeader.hide();
      }
    });
  }

  changeListener($event: any) {
    let filedata = $event.target.files;
    this.editHeaderForm.get('PaperHeaderImage').patchValue(filedata[0]);
    this.headerlogoFileName = filedata[0].name;
  }

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    //this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.headerlogoFileSrc = reader.result;
    }
  }

  removeLogo() {
    this.papaerHeader.InstituteImage = "";
  }

  clearInstituteName() {
    this.editHeaderForm.get('PaperHeaderName').patchValue('');
    this.papaerHeader.InstituteName = "";
  }

  clearInstituteAddress() {
    this.papaerHeader.InstituteAddress = "";
    this.editHeaderForm.get('Address').patchValue('');
  }

  onEditDoneClick(question, parentIndx) {
    question.isedit = false;
    let ckid = "editor_" + parentIndx;
    let data = CKEDITOR.instances[ckid].getData();
    question.QuestionDescription = data;
  }
  validateInput(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    let val = parseInt(evt.target.value + '' + evt.key);
    if (val > 0 && val < 100) {
      return true;
    } else {
      return false;
    }
  }
  setImageSize(height, width) {
    this.isErrorShow = true;
    this.cheight = height;
    this.cwidth = width;
    
    localStorage.setItem("ImageSizeHeight",height);
    localStorage.setItem("ImageSizeWidth",width); 
    setTimeout(() => {
      this.sharedService.loadFonts();
      $('#mathContent').trigger('change');
    }, 1000);
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


  getfilterList(chapterIds) {
    this.chapterlistf = [];
    this.chapterlistt = [];

    let prepareObj = {
      "SubjectID": this.createTemplateDataObj['SubjectID'],
      "ClassID": this.createTemplateDataObj['ClassID'],
      "EAPaperTemplateID": this.createTemplateDataObj['EAPaperTemplateID'],
      "ChapterIDs": chapterIds,
      "IsOMRPaper": this.createTemplateDataObj['IsOMRPaper']
    }

    this.sharedService.getCherryPickFilterlist(prepareObj).subscribe(res => {
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
          cname[i]['TextBookName'] = element.TextBookName;
          this.chapterlistf.push(cname[i]);
        }
      });
      this.allFiltersList['allchapterlist'] = this.chapterlistf;

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

      this.allFiltersList['allchapterlist'].forEach((element, indx) => {
        element['itemName'] = this.titleCase(element['ChapterName']);
        element['id'] = indx;
      });
      this.filtersObj.nature = [];
      this.filtersObj.nature.push(this.allFiltersList.NatureList.find(x => x.QuestionNatureID == this.questionToBeReplaced['QuestionNatureID']));
      this.filtersObj.bloom = [];
      if (!this.isCheryPick) {
        this.filtersObj.bloom.push(this.allFiltersList.BloomTexonomylList.find(x => x.BloomTaxonomyID == this.questionToBeReplaced['BloomTaxonomyID']));
      }
      this.filtersObj.difficulty = [];
      this.filtersObj.difficulty.push(this.allFiltersList.DifficultyLevelList.find(x => x.DifficultyLevelID == this.questionToBeReplaced['DifficultyLevelID']));
      this.filtersObj.questionlength = [];
      this.filtersObj.questionlength.push(this.allFiltersList.QuestionLengthList.find(x => x.QuestionLengthID == this.questionToBeReplaced['QuestionLengthID']));
      this.filtersObj.Marks = [];
      this.filtersObj.Marks.push(this.allFiltersList.markList.find(x => x.Marks == this.questionToBeReplaced['Marks']));
      this.filtersObj.ChapterID = [];
      this.allFiltersList['allchapterlist'].forEach((element, indx) => {
        if (element.ChapterID == this.questionToBeReplaced['TextbookChapterId'] || element.ChapterID == this.questionToBeReplaced['ChapterId']) {
          this.filtersObj.ChapterID.push(element);
        }
      });

      console.log(this.filtersObj);

      this.applyFilter();
    });
  }


  onChaperSelectionChange() {

    let ChapterIDs = [];
    if (!!this.filtersObj['ChapterID']) {
      for (const iterator of this.filtersObj['ChapterID']) {
        ChapterIDs.push(iterator.ChapterID);
      }
    }

    let prepareObj = {
      "SubjectID": this.createTemplateDataObj['SubjectID'],
      "ClassID": this.createTemplateDataObj['ClassID'],
      "EAPaperTemplateID": this.createTemplateDataObj['EAPaperTemplateID'],
      "ChapterIDs": ChapterIDs,
      "IsOMRPaper": this.createTemplateDataObj['IsOMRPaper']
    }

    this.sharedService.getCherryPickFilterlist(prepareObj).subscribe(res => {
      var allFiltersList = res['data'];

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
    })
  }

  onDeSelectAll(number, isloadfilter: boolean) {
    this.closeDropDown();
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
    if (isloadfilter) {
      this.onChaperSelectionChange();
    }
  }

  closeDropDown() {
    this.dropdownRef.closeDropdown();
    this.dropdownRef1.closeDropdown();
    this.dropdownRef2.closeDropdown();
    this.dropdownRef3.closeDropdown();
    if (this.dropdownRef4 != null) {
      this.dropdownRef4.closeDropdown();
    }
    this.dropdownRef5.closeDropdown();
  }

  onSelectItem(isloadfilter: boolean) {
    setTimeout(() => {
      if ((this.filtersObj.nature != undefined && this.filtersObj.nature.length > 0) ||
        (this.filtersObj.bloom != undefined && this.filtersObj.bloom.length > 0) ||
        (this.filtersObj.difficulty != undefined && this.filtersObj.difficulty.length > 0) ||
        (this.filtersObj.questionlength != undefined && this.filtersObj.questionlength.length > 0) ||
        (this.filtersObj.Marks != undefined) || (this.filtersObj.ChapterID != undefined && this.filtersObj.ChapterID.length > 0)) {
        this.isFiltersValid = true;
      } else {
        this.isFiltersValid = false;
      }
    }, 10);
    this.isFiltersValid = true;

    if (isloadfilter) {
      this.onChaperSelectionChange();
    }
  }

  onGroupSelect(e, isloadfilter: boolean) {
    if (this.filtersObj.ChapterID.length == this.allFiltersList.allchapterlist.length) {
    } else if (isloadfilter) {
      this.onChaperSelectionChange();
    }
  }

  onGroupDeSelect(e, isloadfilter: boolean) {
    if (this.filtersObj.ChapterID.length == this.allFiltersList.allchapterlist.length) {
    } else if (isloadfilter) {
      this.onChaperSelectionChange();
    }
  }

  callFilter() {
    this.replaceQuestionList = [];
    this.applyFilter();
  }

  showMoreQuestions() {
    this.page = this.page + 1;
    this.applyFilter()
  }
  applyFilter() {
    const QuestionNatureIDs = [];
    const DifficultyLevelIDs = [];
    const BloomTaxonomyIDs = [];
    const QuestionLengthIDs = [];
    const Marks = [];

    if (!!this.filtersObj.nature != null && this.filtersObj.nature != undefined) {
      for (const iterator of this.filtersObj.nature) {
        QuestionNatureIDs.push(iterator.QuestionNatureID);
      }
    }

    if (!this.isCheryPick) {
      if (this.filtersObj.bloom != null && this.filtersObj.bloom != undefined) {
        for (const iterator of this.filtersObj.bloom) {
          if (iterator != undefined && iterator != null) {
            BloomTaxonomyIDs.push(iterator.BloomTaxonomyID);
          }
        }
      }
    }

    if (this.filtersObj.difficulty != null && this.filtersObj.difficulty != undefined) {
      for (const iterator of this.filtersObj.difficulty) {
        DifficultyLevelIDs.push(iterator.DifficultyLevelID);
      }
    }
    if (this.filtersObj.questionlength != null && this.filtersObj.questionlength != undefined) {
      for (const iterator of this.filtersObj.questionlength) {
        QuestionLengthIDs.push(iterator.QuestionLengthID);
      }
    }

    if (this.filtersObj.Marks != null && this.filtersObj.Marks != undefined) {
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

    const prepareData = {
      "EAPaperTemplateID": this.createTemplateDataObj['EAPaperTemplateID'],
      "ClassID": this.createTemplateDataObj['ClassID'],
      "SubjectID": this.createTemplateDataObj['SubjectID'],
      "QuestionNatureIDs": QuestionNatureIDs,
      "DifficultyLevelIDs": DifficultyLevelIDs,
      "BloomTaxonomyIDs": BloomTaxonomyIDs,
      "QuestionLengthIDs": QuestionLengthIDs,
      "PageIndex": this.page,
      "PageSize": this.rowsOnPage,
      'Marks': Marks,
      'ChapterIDs': ChapterIDs,
      "IsOMRPaper": this.createTemplateDataObj['IsOMRPaper']
    }

    this.classTestExamService.suggestedQuesList(prepareData).subscribe(
      (quesList) => {
        if (quesList.data[0]) {
          // this.lastIndex = this.pagesize * this.pageNumber;
          this.replaceQuestionList = [...this.replaceQuestionList, ...quesList.data];
          this.totalNoOfPages = quesList.recordsTotal;
          this.lastIndex = this.rowsOnPage * this.page;
          this.closeFilterBox();
          //this.getMatch(this.addedQuestionList, this.suggestedQuestionsList);
          // for (var i = this.suggestedQuestionsList.length - 1; i >= 0; i--) {
          //   for (var j = 0; j < this.matches.length; j++) {
          //     if (this.suggestedQuestionsList[i]['Questionid'] === this.matches[j]['Questionid']) {
          //       this.suggestedQuestionsList.splice(i, 1);
          //     }
          //   }
          // }
          // this.getfilterList(ChapterIDs);
        } else {
          this.replaceQuestionList = [];
        }
        setTimeout(() => {
          $('#replaceQuestionModal img').css({ 'height': 30 + "%", 'width': 30 + "%" });
          $('#replaceQuestionModal img').attr('height', 30 + "%");
          $('#replaceQuestionModal img').attr('width', 30 + "%");
        }, 2000);
      }, (error) => {
        // this.getfilterList(ChapterIDs);
        this.toastr.error(error.error['message']);
        this.replaceQuestionList = [];
        this.totalNoOfPages = 1;
      }
    );
  }

  openInPDF() {
    let baseHref = location.href.split('#')[0];
    window.open(baseHref + '#/exam/pdf-preview/' + this.createTemplateDataObj['EAPaperTemplateID'] + "/2", '_blank');
  }
}
