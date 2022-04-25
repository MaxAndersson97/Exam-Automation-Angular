import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteProfileAcademicComponent } from './institute-profile-academic.component';

describe('InstituteProfileAcademicComponent', () => {
  let component: InstituteProfileAcademicComponent;
  let fixture: ComponentFixture<InstituteProfileAcademicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteProfileAcademicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteProfileAcademicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
