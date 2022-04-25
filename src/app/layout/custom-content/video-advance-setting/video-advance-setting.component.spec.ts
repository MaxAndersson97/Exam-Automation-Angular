import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAdvanceSettingComponent } from './video-advance-setting.component';

describe('VideoAdvanceSettingComponent', () => {
  let component: VideoAdvanceSettingComponent;
  let fixture: ComponentFixture<VideoAdvanceSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAdvanceSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAdvanceSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
