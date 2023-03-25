import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMeasurementComponent } from './dashboard-measurement.component';

describe('DashboardMeasurementComponent', () => {
  let component: DashboardMeasurementComponent;
  let fixture: ComponentFixture<DashboardMeasurementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMeasurementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
