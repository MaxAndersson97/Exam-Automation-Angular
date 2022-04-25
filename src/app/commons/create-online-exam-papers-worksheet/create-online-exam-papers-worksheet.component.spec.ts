import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOnlineExamPapersWorksheetComponent } from './create-online-exam-papers-worksheet.component';

describe('CreateOnlineExamPapersWorksheetComponent', () => {
  let component: CreateOnlineExamPapersWorksheetComponent;
  let fixture: ComponentFixture<CreateOnlineExamPapersWorksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOnlineExamPapersWorksheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOnlineExamPapersWorksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
