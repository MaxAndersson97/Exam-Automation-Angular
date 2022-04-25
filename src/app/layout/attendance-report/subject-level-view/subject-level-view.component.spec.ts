import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectLevelViewComponent } from './subject-level-view.component';

describe('SubjectLevelViewComponent', () => {
  let component: SubjectLevelViewComponent;
  let fixture: ComponentFixture<SubjectLevelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectLevelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectLevelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
