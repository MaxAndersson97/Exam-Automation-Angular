import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterTopicUnderstandingAnalysisComponent } from './chapter-topic-understanding-analysis.component';

describe('ChapterTopicUnderstandingAnalysisComponent', () => {
  let component: ChapterTopicUnderstandingAnalysisComponent;
  let fixture: ComponentFixture<ChapterTopicUnderstandingAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterTopicUnderstandingAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterTopicUnderstandingAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
