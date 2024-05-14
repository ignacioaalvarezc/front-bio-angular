import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdersComponent } from './add-orders.component';

describe('AddOrdersComponent', () => {
  let component: AddOrdersComponent;
  let fixture: ComponentFixture<AddOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrdersComponent]
    });
    fixture = TestBed.createComponent(AddOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
