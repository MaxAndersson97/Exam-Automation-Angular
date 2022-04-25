import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAndBookSetupComponent } from './subject-and-book-setup.component';

describe('SubjectAndBookSetupComponent', () => {
  let component: SubjectAndBookSetupComponent;
  let fixture: ComponentFixture<SubjectAndBookSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectAndBookSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectAndBookSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
