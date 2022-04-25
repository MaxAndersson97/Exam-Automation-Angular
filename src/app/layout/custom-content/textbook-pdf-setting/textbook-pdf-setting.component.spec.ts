import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbookPdfSettingComponent } from './textbook-pdf-setting.component';

describe('TextbookPdfSettingComponent', () => {
  let component: TextbookPdfSettingComponent;
  let fixture: ComponentFixture<TextbookPdfSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextbookPdfSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextbookPdfSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
