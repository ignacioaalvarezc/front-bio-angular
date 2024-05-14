import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexInventoryComponent } from './index-inventory.component';

describe('IndexInventoryComponent', () => {
  let component: IndexInventoryComponent;
  let fixture: ComponentFixture<IndexInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexInventoryComponent]
    });
    fixture = TestBed.createComponent(IndexInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
