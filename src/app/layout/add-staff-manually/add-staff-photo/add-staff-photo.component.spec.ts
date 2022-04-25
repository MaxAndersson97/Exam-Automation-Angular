import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffPhotoComponent } from './add-staff-photo.component';

describe('AddStaffPhotoComponent', () => {
  let component: AddStaffPhotoComponent;
  let fixture: ComponentFixture<AddStaffPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
