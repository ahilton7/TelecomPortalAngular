import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Plan3Component } from './plan3.component';

describe('Plan3Component', () => {
  let component: Plan3Component;
  let fixture: ComponentFixture<Plan3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Plan3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Plan3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
