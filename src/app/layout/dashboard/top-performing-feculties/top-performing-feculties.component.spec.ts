import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopPerformingFecultiesComponent } from './top-performing-feculties.component';

describe('TopPerformingFecultiesComponent', () => {
  let component: TopPerformingFecultiesComponent;
  let fixture: ComponentFixture<TopPerformingFecultiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopPerformingFecultiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopPerformingFecultiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
