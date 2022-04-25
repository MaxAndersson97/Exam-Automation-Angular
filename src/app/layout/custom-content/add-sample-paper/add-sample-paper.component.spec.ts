import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSamplePaperComponent } from './add-sample-paper.component';

describe('AddSamplePaperComponent', () => {
  let component: AddSamplePaperComponent;
  let fixture: ComponentFixture<AddSamplePaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSamplePaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSamplePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
