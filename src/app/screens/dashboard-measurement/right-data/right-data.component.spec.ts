import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightDataComponent } from './right-data.component';

describe('RightDataComponent', () => {
  let component: RightDataComponent;
  let fixture: ComponentFixture<RightDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
