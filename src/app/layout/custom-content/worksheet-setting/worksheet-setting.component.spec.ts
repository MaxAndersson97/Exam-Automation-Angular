import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetSettingComponent } from './worksheet-setting.component';

describe('WorksheetSettingComponent', () => {
  let component: WorksheetSettingComponent;
  let fixture: ComponentFixture<WorksheetSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
