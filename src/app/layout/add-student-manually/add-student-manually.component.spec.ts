import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentManuallyComponent } from './add-student-manually.component';

describe('AddStudentManuallyComponent', () => {
  let component: AddStudentManuallyComponent;
  let fixture: ComponentFixture<AddStudentManuallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStudentManuallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStudentManuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
