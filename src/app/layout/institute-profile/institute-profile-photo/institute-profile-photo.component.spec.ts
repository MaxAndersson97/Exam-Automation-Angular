import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteProfilePhotoComponent } from './institute-profile-photo.component';

describe('PhotoComponent', () => {
  let component: InstituteProfilePhotoComponent;
  let fixture: ComponentFixture<InstituteProfilePhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstituteProfilePhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteProfilePhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
