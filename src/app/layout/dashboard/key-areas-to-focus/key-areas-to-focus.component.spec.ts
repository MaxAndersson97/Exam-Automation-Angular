import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAreasToFocusComponent } from './key-areas-to-focus.component';

describe('KeyAreasToFocusComponent', () => {
  let component: KeyAreasToFocusComponent;
  let fixture: ComponentFixture<KeyAreasToFocusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyAreasToFocusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyAreasToFocusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
