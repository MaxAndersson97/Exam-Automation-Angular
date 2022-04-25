import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkAttandanceComponent } from './mark-attandance.component';

describe('MarkAttandanceComponent', () => {
  let component: MarkAttandanceComponent;
  let fixture: ComponentFixture<MarkAttandanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkAttandanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkAttandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
