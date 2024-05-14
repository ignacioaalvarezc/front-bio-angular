import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDryingComponent } from './add-drying.component';

describe('AddDryingComponent', () => {
  let component: AddDryingComponent;
  let fixture: ComponentFixture<AddDryingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDryingComponent]
    });
    fixture = TestBed.createComponent(AddDryingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
