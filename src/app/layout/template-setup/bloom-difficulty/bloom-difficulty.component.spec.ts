import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloomDifficultyComponent } from './bloom-difficulty.component';

describe('BloomDifficultyComponent', () => {
  let component: BloomDifficultyComponent;
  let fixture: ComponentFixture<BloomDifficultyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloomDifficultyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloomDifficultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
