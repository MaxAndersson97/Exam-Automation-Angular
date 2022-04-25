import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPdfPreviewComponent } from './global-pdf-preview.component';

describe('GlobalPdfPreviewComponent', () => {
  let component: GlobalPdfPreviewComponent;
  let fixture: ComponentFixture<GlobalPdfPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPdfPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPdfPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
