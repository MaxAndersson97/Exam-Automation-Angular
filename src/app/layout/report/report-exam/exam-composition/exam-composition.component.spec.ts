import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamCompositionComponent } from './exam-composition.component';

describe('ExamCompositionComponent', () => {
  let component: ExamCompositionComponent;
  let fixture: ComponentFixture<ExamCompositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamCompositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
