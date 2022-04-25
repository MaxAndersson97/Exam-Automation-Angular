import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamPreviewComponent } from './class-test-exam-preview.component';

describe('ClassTestExamPreviewComponent', () => {
  let component: ClassTestExamPreviewComponent;
  let fixture: ComponentFixture<ClassTestExamPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
