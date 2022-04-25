import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetListComponent } from './worksheet-list.component';

describe('WorksheetListComponent', () => {
  let component: WorksheetListComponent;
  let fixture: ComponentFixture<WorksheetListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
