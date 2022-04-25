import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCherrypickComponent } from './global-cherrypick.component';

describe('GlobalCherrypickComponent', () => {
  let component: GlobalCherrypickComponent;
  let fixture: ComponentFixture<GlobalCherrypickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalCherrypickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCherrypickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
