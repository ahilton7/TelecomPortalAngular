import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plan1Component } from './plan1.component';

describe('Plan1Component', () => {
  let component: Plan1Component;
  let fixture: ComponentFixture<Plan1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Plan1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Plan1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
