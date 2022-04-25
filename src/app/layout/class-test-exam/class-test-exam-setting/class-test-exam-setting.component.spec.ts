import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTestExamSettingComponent } from './class-test-exam-setting.component';

describe('ClassTestExamSettingComponent', () => {
  let component: ClassTestExamSettingComponent;
  let fixture: ComponentFixture<ClassTestExamSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTestExamSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTestExamSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
