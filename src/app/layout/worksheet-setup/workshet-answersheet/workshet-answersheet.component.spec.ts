import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshetAnswersheetComponent } from './workshet-answersheet.component';

describe('WorkshetAnswersheetComponent', () => {
  let component: WorkshetAnswersheetComponent;
  let fixture: ComponentFixture<WorkshetAnswersheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshetAnswersheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshetAnswersheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
