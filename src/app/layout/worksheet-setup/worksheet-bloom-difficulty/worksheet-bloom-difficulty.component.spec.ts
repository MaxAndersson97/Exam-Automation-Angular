import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetBloomDifficultyComponent } from './worksheet-bloom-difficulty.component';

describe('WorksheetBloomDifficultyComponent', () => {
  let component: WorksheetBloomDifficultyComponent;
  let fixture: ComponentFixture<WorksheetBloomDifficultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorksheetBloomDifficultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetBloomDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
