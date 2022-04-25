import { Component, OnInit } from '@angular/core';
import { SubjectAndBookSetupService } from './subject-and-book-setup.service';
import { Class } from "./class";
import { HttpErrorResponse } from '@angular/common/http';
import { Subject } from './subject';
import { Book } from './book';
import * as _ from 'underscore';
import { ToastrService } from 'ngx-toastr';
import { UNAUTHERIZEDMESSASGESERVER, UNAUTHERIZEDMESSASGE } from 'src/app/Utils/utils';
import { error } from 'util';
import { InstituteService } from 'src/app/institute.service';

@Component({
  selector: 'app-subject-and-book-setup',
  templateUrl: './subject-and-book-setup.component.html',
  styleUrls: ['./subject-and-book-setup.component.scss'],

})
export class SubjectAndBookSetupComponent implements OnInit {
  display = 'block'
  isDataShow = false;
  classList: Array<Class> = [];
  subjectList: any = [];
  booksList: Array<Book> = [];
  selectedClass: any;
  selectedBooks: Array<Book>;

  dropdownSettings = {
    singleSelection: false,
    idField: 'TextBookID',
    textField: 'TextBookName',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: false,
    enableCheckAll: false
  };
  isFirst = true;

  constructor(

    private subjectAndBookSetupService: SubjectAndBookSetupService,
    private toaster: ToastrService,
    private instituteService: InstituteService) { }



  ngOnInit() {
    this.instituteService.getInstituteDDLClass().subscribe(
      this.getClassSuccess,
      this.getClassFailure
    );
  }

  classChanged(selectedClass) {
    this.selectedClass = selectedClass;
    this.subjectAndBookSetupService.getSubjectList(selectedClass.ClassID).subscribe(
      this.getSubjectSuccess,
      this.getSubjectFailure
    );
  }

  getSubjectSuccess = (subjectList: Array<Subject>) => {
    console.log(subjectList);
    if(subjectList && subjectList.length > 0){
      for (let i = 0; i < subjectList.length; i++) {
        subjectList[i].isFirst = true;
        if (!(!!subjectList[i].listEASubjectBookMappingInfoMember)) {
          subjectList[i].listEASubjectBookMappingInfoMember = [];
          this.isDataShow = false;
        }
        if (subjectList[i].IsSelected) {
          this.subjectAndBookSetupService.getBooksList(this.selectedClass.ClassID, subjectList[i].SubjectID).subscribe(
            (booksList) => {
              this.isDataShow = true;            
              subjectList[i].Books = booksList;
            }, httpError=>{
              if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
                this.toaster.warning(UNAUTHERIZEDMESSASGE);
              } else {
                //this.toaster.error(httpError.error['message']);
              }  
            }
            
          );
        } else {
          subjectList[i].Books = [];
        }
      }
      this.subjectList = subjectList;
      this.isDataShow = true;
    }else{
      this.subjectList = [];
      this.isDataShow = false;   

    }   
    
  };

  getSubjectFailure = (httpError: HttpErrorResponse) => {
    console.log(httpError.error['message']);
    this.isDataShow = false;
    this.subjectList = [];
    if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
      this.toaster.warning(UNAUTHERIZEDMESSASGE);
    } else {
      //this.toaster.error(httpError.error['message']);
    }
  };

  onChangeBook(subject) {
    if (subject.IsSelected) {
      let subjects = [subject];
      this.updateSubjectDetails(subjects);
    }
  }

  isCheckedBook(list, bookId) {
    return _.findWhere(list, { "TextBookID": bookId });
  }

  updateSubjectDetails(selectedSubjectList) {
    this.subjectAndBookSetupService.updateSubjectDetails(selectedSubjectList, this.selectedClass.ClassID).subscribe(
      this.updateSubjectSuccess,
      this.updateSubjectFailure
    );
  }

  booksChanged(subject, selectedBooks) {
    subject.listEASubjectBookMappingInfoMember = selectedBooks;
  }

  isBookSelected(booksList, book) {
    if (book) {
      for (let i = 0; i < booksList.length; i++) {
        if (booksList[i].TextBookID === book.TextBookID) {
          return true;
        }
      }
    }
    return false;
  }

  onSubjectChecked(subject) {
    if (!subject.IsSelected) {
      this.subjectAndBookSetupService.getBooksList(this.selectedClass.ClassID, subject.SubjectID).subscribe(
        (booksList) => {
          if (booksList) {
            subject.Books = booksList;
          } else {
            subject.Books = [];
          }
        },
       // this.getSubjectFailure
        httpError=>{
        console.log('in error part');
        if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
          this.toaster.warning(UNAUTHERIZEDMESSASGE);
        } else {
         
          //this.toaster.error(httpError.error['message']);
        }  
      }
      );
      subject.IsSelected = true;
      this.updateSubjectDetails([subject]);
    } else {
      subject.Books = [];
      this.deselectSubject(subject);
    }
  }

  removed(event) {
    console.log(event);
  }
  deselectSubject(subject) {
    subject.IsSelected = false;
    let subjects = [subject];
    this.updateSubjectDetails(subjects);
  }

  updateSubjectSuccess = (data: any) => {
  };

  updateSubjectFailure = (httpError: any) => {
    console.log(httpError.error['message']);
    if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
      this.toaster.warning(UNAUTHERIZEDMESSASGE);

    } else {
      this.toaster.error(httpError.error['message']);

    }
  };

  getClassSuccess = (classList: Array<Class>) => {
    this.classList = classList;
    this.classList = classList.filter(element => element['IsClassShowInPortal'] === true); 
  };

  getClassFailure = (httpError: HttpErrorResponse) => {
    console.log(httpError.error['message']);
    if (httpError && httpError.error && httpError.error['message'] == UNAUTHERIZEDMESSASGESERVER) {
      this.toaster.warning(UNAUTHERIZEDMESSASGE);
      this.display = "none";
    } else {
      this.toaster.error(httpError.error['message']);
      this.display = "block";
    }
  };
}






