import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassLevelViewsComponent } from './class-level-views.component';

describe('ClassLevelViewsComponent', () => {
  let component: ClassLevelViewsComponent;
  let fixture: ComponentFixture<ClassLevelViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassLevelViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassLevelViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
