import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorksheetService } from 'src/app/layout/worksheet-setup/worksheet.service';
import { ToastrService } from 'ngx-toastr';
import { SharedDataService } from 'src/app/services/shared-data.service';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';

@Component({
  selector: 'app-global-chepter-selection',
  templateUrl: './global-chepter-selection.component.html',
  styleUrls: ['./global-chepter-selection.component.scss']
})
export class GlobalChepterSelectionComponent implements OnInit, OnDestroy {

  @Input() title: string;
  @Output() actionEmitter: EventEmitter<string> = new EventEmitter<string>();
  ispapereditoradd: boolean = false;
  ispapereditoraddvalue: any;
  classesList = [];
  subjects = [];
  PaperSetChapterList: any;
  cheptersList = [];
  templateID: any;
  createTemplateData: any;
  selectedTextBook = [];
  countChepter: number = 0;
  selectedBooksCount: number = 0;
  selectedChepterIDs: any = [];
  selectedTextBookothersource: any[];
  selectedTextBookFromOtherSource: any;
  countOtherSourceSelectedChepter = 0;
  selectAllOther: boolean = false;
  found: boolean = true;
  isEditFullyAutomated: boolean = false;
  otherSelectedChaptersID: any = [];
  constructor(private router: Router,
    private route: ActivatedRoute,
    private worksheetService: WorksheetService,
    private toastService: ToastrService,
    private sharedService: SharedDataService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.templateID = params.id;
        this.sharedService.getTemplateDetailsById(this.templateID).subscribe((templatedetail) => {
          this.createTemplateData = templatedetail;
          if (this.createTemplateData['TotalSelectedChepter'] > 0) {
            this.isEditFullyAutomated = true;
          }
          this.getChepterListBySubjectID(this.createTemplateData);
        });
      });

    this.ispapereditoraddvalue = localStorage.getItem("ispaperedit");
    if (this.ispapereditoraddvalue == "addnew") {
      this.ispapereditoradd = true;
    }
    else if (this.ispapereditoraddvalue == "Edit") {
      this.ispapereditoradd = false;
    }
  }
  getChepterListBySubjectID(template) {

    this.worksheetService.getCheptersBySubject(template['SubjectID'], template['ClassID'], template['EAPaperTemplateID'], template['IsOMRPaper'])
      .subscribe((chepters) => {
        if (chepters['PaperSetChapterList'].length <= 0 && chepters['TextBookChapterList'].length <= 0) {
          this.found = false;
          this.toastService.info('No books available for this subject !!');
          this.cheptersList = [];
          this.PaperSetChapterList = [];
        } else {
          if (chepters['PaperSetChapterList']) {
            this.found = true;
            this.PaperSetChapterList = chepters['PaperSetChapterList'];
            this.countBooksAndChepterForOther();
            this.checkIfAllSelectedOther();
          }
          if (chepters['TextBookChapterList'][0]) {
            this.found = true;
            this.cheptersList = chepters['TextBookChapterList'];
            this.cheptersList.forEach((ele, indx) => {
              ele.isExpandAccordion = false;
            });
            this.countBooksAndChepter();
            this.checkIfAllSelected();
          }
        }

      }, (error) => {
        this.found = false;
        this.cheptersList = [];
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toastService.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toastService.info('No books available for this subject !!');
          this.toastService.error(error.error['message']);
        }
      });
  }

  countBooksAndChepter() {
    setTimeout(() => {
      this.selectedTextBook = [];
      this.countChepter = 0;
      this.selectedBooksCount = 0;
      for (let i = 0; i < this.cheptersList.length; i++) {
        this.cheptersList[i]['count'] = 0;
        let chepterList: any;
        const selectedChepaters = [];
        chepterList = this.cheptersList[i]['listEAChapterInfoMember'];

        console.log(chepterList, "113");

        for (let index = 0; index < chepterList.length; index++) {
          const element = chepterList[index];
          if (element.isSelected == true) {
            this.cheptersList[i]['count'] = +this.cheptersList[i]['count'] + 1;
            this.countChepter = +this.countChepter + 1;
            const tempChept = {
              ChapterID: element.ChapterID,
              Topics: []
            }
            selectedChepaters.push(tempChept);
          }
          console.log(chepterList, "127");

          if (chepterList.length - 1 == index && selectedChepaters.length > 0) {
            this.selectedTextBook.push({
              TextBookID: this.cheptersList[i]['TextBookID'],
              Source: 3,
              Chapters: selectedChepaters
            });
          }
        }
      };
    }, 10);
  }

  countBooksAndChepterForOther() {
    setTimeout(() => {
      this.selectedTextBookFromOtherSource = [];
      let Othersource = [];
      this.countOtherSourceSelectedChepter = 0;
      for (let index = 0; index < this.PaperSetChapterList.length; index++) {

        const element = this.PaperSetChapterList[index];
        if (element.isSelected == true) {
          //this.countChepter = this.countChepter + 1;
          this.countOtherSourceSelectedChepter = +this.countOtherSourceSelectedChepter + 1;
          const tempChept = {
            ChapterID: element.ChapterID,
            Topics: []
          }
          Othersource.push(tempChept);
          this.otherSelectedChaptersID.push(tempChept.ChapterID);
        }
        if (this.PaperSetChapterList.length - 1 == index && Othersource.length > 0) {
          this.selectedTextBookFromOtherSource.push({
            TextBookID: '00000000-00000000-00000000-00000000',
            Source: 1,
            Chapters: Othersource
          });
          //this.otherSelectedChaptersID = Othersource;
        }
      }
    }, 10);
  }
  submitStepTwo() {
    this.APICall();
  }

  selectAll(indx) {
    let textbookObj = [];
    let isSelected: boolean;
    let myObj = {};
    myObj = this.cheptersList[indx];
    textbookObj = this.cheptersList[indx]['listEAChapterInfoMember'];
    myObj['selectedAll'] = !myObj['selectedAll'];
    isSelected = myObj['selectedAll'];
    textbookObj.every(function (item: any) {
      item.isSelected = isSelected;
      return true;
    })
    setTimeout(() => {
      this.countBooksAndChepter();
    }, 100);
  }

  selectAllOtherFn() {
    let isSelected: boolean;
    this.selectAllOther = !this.selectAllOther;
    isSelected = this.selectAllOther;
    this.PaperSetChapterList.every(function (item: any) {
      item.isSelected = isSelected;
      return true;
    })
    setTimeout(() => {
      this.countBooksAndChepterForOther();
    }, 100);
  }

  checkIfAllSelected() {
    setTimeout(() => {
      this.cheptersList.forEach(function (myObj: any, index) {
        let textbookArray = myObj.listEAChapterInfoMember;
        var totalSelected = 0;
        textbookArray.filter(function (item: any, indx) {
          //this.isFullyAutoEdit = true;
          if (item.isSelected) totalSelected++;
          if (indx == textbookArray.length - 1) {
            myObj['selectedAll'] = totalSelected === textbookArray.length;
          }
        });
      })
    }, 100);
  }

  checkIfAllSelectedOther() {
    let that = this;
    setTimeout(() => {
      var totalSelected = 0;
      that.PaperSetChapterList.filter(function (item: any, indx) {
        if (item.isSelected) totalSelected++;

        if (indx == that.PaperSetChapterList.length - 1) {
          that.selectAllOther = totalSelected === that.PaperSetChapterList.length;
        }
      });
    }, 100);

  }

  APICall() {
    const selectedTextBook = [];
    this.countChepter = 0;
    
    for (let i = 0; i < this.cheptersList.length; i++) {
      let chepterList: any;
      const selectedChepaters = [];
      chepterList = this.cheptersList[i]['listEAChapterInfoMember'];
      for (let index = 0; index < chepterList.length; index++) {
        const element = chepterList[index];
        if (element.isSelected == true) {
          this.countChepter = this.countChepter + 1;
          const tempChept = {
            ChapterID: element.ChapterID,
            Topics: []
          }
          this.selectedChepterIDs.push(tempChept.ChapterID);
          selectedChepaters.push(tempChept);
        } else if (element.isSelected == false) {
          this.countChepter = this.countChepter > 0 ? this.countChepter - 1 : null;
        };
        if (chepterList.length - 1 == index && selectedChepaters.length > 0) {
          selectedTextBook.push({
            TextBookID: this.cheptersList[i]['TextBookID'],
            Source: 3,
            Chapters: selectedChepaters
          });
        }
      }
    };

    let allChptersID = [];
    allChptersID = [...this.otherSelectedChaptersID, ...this.selectedChepterIDs];
    
    var alluniqueChptersID = allChptersID.filter((item, i, ar) => ar.indexOf(item) === i);

    this.sharedService.setChepterIds(JSON.stringify(alluniqueChptersID));
    let id = this.sharedService.getSelectedTempalteID();
    let isFullyAutoEdit = false;
    let selectedTempalteID = this.createTemplateData.SelectedEAPaperTemplateID;//"00000000-0000-0000-0000-000000000000";

    if (this.isEditFullyAutomated
      && this.createTemplateData['PaperGenerationMethod'] == 1) {
      isFullyAutoEdit = true;
    }

    let Selected_EAPaperTemplateID = "00000000-0000-0000-0000-000000000000";
    Selected_EAPaperTemplateID = this.createTemplateData['PaperGenerationMethod'] == 1 ? selectedTempalteID : "00000000-0000-0000-0000-000000000000";

    const prepareDataToSave = {
      EAPaperTemplateID: this.templateID,
      Selected_EAPaperTemplateID: Selected_EAPaperTemplateID,
      isFullyAutomatedEdit: isFullyAutoEdit,
      TextBooks: [...selectedTextBook, ...this.selectedTextBookFromOtherSource],
      PaperGenerationMethod: this.createTemplateData['PaperGenerationMethod']
    }
    this.worksheetService.saveChepterForWorksheet(prepareDataToSave).subscribe(
      (result) => {
        this.sharedService.setSelectedTempalteID(null);
        if (this.createTemplateData['PaperGenerationMethod'] == 1) {
          this.router.navigate(['../../generate-paper', this.createTemplateData['EAPaperTemplateID']], { relativeTo: this.route });
        } else if (this.createTemplateData['PaperGenerationMethod'] == 2) {
          this.router.navigate(['../../setting', this.createTemplateData['EAPaperTemplateID']], { relativeTo: this.route });
        } else {
          this.router.navigate(['../../cherry-pick', this.createTemplateData['EAPaperTemplateID']], { relativeTo: this.route });
        }
        localStorage.setItem('ispaperedit', "Edit");
      }, (error) => {
        if (error && error.error && error.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toastService.warning(UNAUTHERIZEDMESSASGE);
        } else {
          this.toastService.error(error.error['message']);
        }
      });
  }

  ngOnDestroy() {
    localStorage.setItem('isEditTemplate', 'false');
    this.sharedService.setSelectedTempalteID('00000000-0000-0000-0000-000000000000');
  }
}
