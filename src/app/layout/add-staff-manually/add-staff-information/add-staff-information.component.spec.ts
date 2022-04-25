import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffInformationComponent } from './add-staff-information.component';

describe('InformationComponent', () => {
  let component: AddStaffInformationComponent;
  let fixture: ComponentFixture<AddStaffInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
