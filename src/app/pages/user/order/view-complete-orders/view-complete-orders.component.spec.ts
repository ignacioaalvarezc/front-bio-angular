import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompleteOrdersComponent } from './view-complete-orders.component';

describe('ViewCompleteOrdersComponent', () => {
  let component: ViewCompleteOrdersComponent;
  let fixture: ComponentFixture<ViewCompleteOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCompleteOrdersComponent]
    });
    fixture = TestBed.createComponent(ViewCompleteOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
