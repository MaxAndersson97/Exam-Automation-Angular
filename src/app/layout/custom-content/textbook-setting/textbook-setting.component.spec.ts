import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookSettingComponent } from './textbook-setting.component';

describe('TextbookSettingComponent', () => {
  let component: TextbookSettingComponent;
  let fixture: ComponentFixture<TextbookSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextbookSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
