import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PysolvedPaperSettingComponent } from './pysolved-paper-setting.component';

describe('PysolvedPaperSettingComponent', () => {
  let component: PysolvedPaperSettingComponent;
  let fixture: ComponentFixture<PysolvedPaperSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PysolvedPaperSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PysolvedPaperSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
