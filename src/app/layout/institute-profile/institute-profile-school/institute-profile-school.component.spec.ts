import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteProfileSchoolComponent } from './institute-profile-school.component';

describe('SchoolComponent', () => {
  let component: InstituteProfileSchoolComponent;
  let fixture: ComponentFixture<InstituteProfileSchoolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteProfileSchoolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteProfileSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
