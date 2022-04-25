import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CherryPickComponent } from './cherry-pick.component';

describe('CherryPickComponent', () => {
  let component: CherryPickComponent;
  let fixture: ComponentFixture<CherryPickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CherryPickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CherryPickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
