import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffManuallyComponent } from './add-staff-manually.component';

describe('AddStaffManuallyComponent', () => {
  let component: AddStaffManuallyComponent;
  let fixture: ComponentFixture<AddStaffManuallyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffManuallyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffManuallyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
