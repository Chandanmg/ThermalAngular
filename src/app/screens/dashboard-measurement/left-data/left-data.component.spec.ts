import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftDataComponent } from './left-data.component';

describe('LeftDataComponent', () => {
  let component: LeftDataComponent;
  let fixture: ComponentFixture<LeftDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
