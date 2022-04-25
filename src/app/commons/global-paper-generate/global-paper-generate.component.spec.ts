import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPaperGenerateComponent } from './global-paper-generate.component';

describe('GlobalPaperGenerateComponent', () => {
  let component: GlobalPaperGenerateComponent;
  let fixture: ComponentFixture<GlobalPaperGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPaperGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPaperGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
