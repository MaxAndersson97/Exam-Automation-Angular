import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionBankSettingComponent } from './question-bank-setting.component';

describe('QuestionBankSettingComponent', () => {
  let component: QuestionBankSettingComponent;
  let fixture: ComponentFixture<QuestionBankSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionBankSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionBankSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
