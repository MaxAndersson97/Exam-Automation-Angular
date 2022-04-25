import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePaperSettingComponent } from './sample-paper-setting.component';

describe('SamplePaperSettingComponent', () => {
  let component: SamplePaperSettingComponent;
  let fixture: ComponentFixture<SamplePaperSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePaperSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePaperSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
