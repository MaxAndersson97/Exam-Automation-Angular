import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardMeritPredictionComponent } from './board-merit-prediction.component';

describe('BoardMeritPredictionComponent', () => {
  let component: BoardMeritPredictionComponent;
  let fixture: ComponentFixture<BoardMeritPredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardMeritPredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardMeritPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
