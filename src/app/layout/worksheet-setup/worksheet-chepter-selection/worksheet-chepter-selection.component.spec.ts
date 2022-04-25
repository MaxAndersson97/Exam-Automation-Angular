import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetChepterSelectionComponent } from './worksheet-chepter-selection.component';

describe('WorksheetChepterSelectionComponent', () => {
  let component: WorksheetChepterSelectionComponent;
  let fixture: ComponentFixture<WorksheetChepterSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetChepterSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetChepterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
