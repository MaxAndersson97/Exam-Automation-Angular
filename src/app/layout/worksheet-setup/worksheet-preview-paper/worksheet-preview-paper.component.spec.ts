import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetPreviewPaperComponent } from './worksheet-preview-paper.component';

describe('WorksheetPreviewPaperComponent', () => {
  let component: WorksheetPreviewPaperComponent;
  let fixture: ComponentFixture<WorksheetPreviewPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetPreviewPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetPreviewPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
