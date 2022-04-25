import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetGeneratePaperComponent } from './worksheet-generate-paper.component';

describe('WorksheetGeneratePaperComponent', () => {
  let component: WorksheetGeneratePaperComponent;
  let fixture: ComponentFixture<WorksheetGeneratePaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetGeneratePaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetGeneratePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
