import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedStaffDataComponent } from './imported-staff-data.component';

describe('ImportedStaffDataComponent', () => {
  let component: ImportedStaffDataComponent;
  let fixture: ComponentFixture<ImportedStaffDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedStaffDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedStaffDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
