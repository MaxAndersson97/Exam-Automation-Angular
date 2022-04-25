import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadStaffCSVComponent } from './upload-staff-csv.component';

describe('UploadStaffCSVComponent', () => {
  let component: UploadStaffCSVComponent;
  let fixture: ComponentFixture<UploadStaffCSVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadStaffCSVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadStaffCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
