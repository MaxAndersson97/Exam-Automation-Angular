import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WingSetupComponent } from './wing-setup.component';

describe('WingSetupComponent', () => {
  let component: WingSetupComponent;
  let fixture: ComponentFixture<WingSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WingSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WingSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
