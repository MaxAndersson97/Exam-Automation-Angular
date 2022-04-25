import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWingComponent } from './add-wing.component';

describe('AddWingComponent', () => {
  let component: AddWingComponent;
  let fixture: ComponentFixture<AddWingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
