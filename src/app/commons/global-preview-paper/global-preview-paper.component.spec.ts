import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPreviewPaperComponent } from './global-preview-paper.component';

describe('GlobalPreviewPaperComponent', () => {
  let component: GlobalPreviewPaperComponent;
  let fixture: ComponentFixture<GlobalPreviewPaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPreviewPaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPreviewPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
