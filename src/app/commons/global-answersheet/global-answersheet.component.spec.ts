import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalAnswersheetComponent } from './global-answersheet.component';

describe('GlobalAnswersheetComponent', () => {
  let component: GlobalAnswersheetComponent;
  let fixture: ComponentFixture<GlobalAnswersheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalAnswersheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalAnswersheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
