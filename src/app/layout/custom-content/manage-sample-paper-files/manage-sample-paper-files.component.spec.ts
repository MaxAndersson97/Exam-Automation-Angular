import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSamplePaperFilesComponent } from './manage-sample-paper-files.component';

describe('ManageSamplePaperFilesComponent', () => {
  let component: ManageSamplePaperFilesComponent;
  let fixture: ComponentFixture<ManageSamplePaperFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSamplePaperFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSamplePaperFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
