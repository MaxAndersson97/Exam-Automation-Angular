import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetSetupComponent } from './worksheet-setup.component';

describe('WorksheetSetupComponent', () => {
  let component: WorksheetSetupComponent;
  let fixture: ComponentFixture<WorksheetSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
