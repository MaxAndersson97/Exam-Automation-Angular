import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalChepterSelectionComponent } from './global-chepter-selection.component';

describe('GlobalChepterSelectionComponent', () => {
  let component: GlobalChepterSelectionComponent;
  let fixture: ComponentFixture<GlobalChepterSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalChepterSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalChepterSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
