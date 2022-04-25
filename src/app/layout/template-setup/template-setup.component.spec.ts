import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateSetupComponent } from './template-setup.component';

describe('TemplateSetupComponent', () => {
  let component: TemplateSetupComponent;
  let fixture: ComponentFixture<TemplateSetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
