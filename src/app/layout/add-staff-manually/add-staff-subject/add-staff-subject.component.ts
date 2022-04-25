import { Component, OnInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-staff-subject',
  templateUrl: './add-staff-subject.component.html',
  styleUrls: ['./add-staff-subject.component.scss']
})
export class AddStaffSubjectComponent implements OnInit {


  addStaffForm = this.fb.group({
    WingID: [''],
    WingName: [''],
    WingHeadID: [''],
    InstituteUserID: [''],
    InstituteID: [''],
    ClassIdFrom: [''],
    ClassIdTo: [''],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private renderer: Renderer2) {
  }

  ngOnInit() {
  }

  onSubmit() {

  }


}
