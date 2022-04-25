import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLevelViewComponent } from './class-level-view.component';

describe('ClassLevelViewComponent', () => {
  let component: ClassLevelViewComponent;
  let fixture: ComponentFixture<ClassLevelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassLevelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLevelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
