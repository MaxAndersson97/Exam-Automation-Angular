import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaperOmrComponent } from './create-paper-omr.component';

describe('CreatePaperOmrComponent', () => {
  let component: CreatePaperOmrComponent;
  let fixture: ComponentFixture<CreatePaperOmrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePaperOmrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaperOmrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
