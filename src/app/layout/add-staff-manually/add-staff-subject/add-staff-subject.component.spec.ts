import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffSubjectComponent } from './add-staff-subject.component';

describe('SubjectComponent', () => {
  let component: AddStaffSubjectComponent;
  let fixture: ComponentFixture<AddStaffSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
