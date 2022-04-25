import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectLevelViewsComponent } from './subject-level-views.component';

describe('SubjectLevelViewsComponent', () => {
  let component: SubjectLevelViewsComponent;
  let fixture: ComponentFixture<SubjectLevelViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectLevelViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectLevelViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
