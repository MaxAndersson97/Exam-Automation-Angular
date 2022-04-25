import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCreatePaperComponent } from './global-create-paper.component';

describe('GlobalCreatePaperComponent', () => {
  let component: GlobalCreatePaperComponent;
  let fixture: ComponentFixture<GlobalCreatePaperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalCreatePaperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCreatePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
