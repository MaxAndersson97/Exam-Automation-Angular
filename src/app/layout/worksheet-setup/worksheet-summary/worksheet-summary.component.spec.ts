import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetSummaryComponent } from './worksheet-summary.component';

describe('WorksheetSummaryComponent', () => {
  let component: WorksheetSummaryComponent;
  let fixture: ComponentFixture<WorksheetSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
