import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorksheetStepOneComponent } from './create-worksheet-step-one.component';

describe('CreateWorksheetStepOneComponent', () => {
  let component: CreateWorksheetStepOneComponent;
  let fixture: ComponentFixture<CreateWorksheetStepOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorksheetStepOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorksheetStepOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
