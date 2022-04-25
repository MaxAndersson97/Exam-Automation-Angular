import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetCherryPickComponent } from './worksheet-cherry-pick.component';

describe('WorksheetCherryPickComponent', () => {
  let component: WorksheetCherryPickComponent;
  let fixture: ComponentFixture<WorksheetCherryPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetCherryPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetCherryPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
