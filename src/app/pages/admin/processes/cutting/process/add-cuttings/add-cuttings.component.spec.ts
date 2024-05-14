import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCuttingsComponent } from './add-cuttings.component';

describe('AddCuttingsComponent', () => {
  let component: AddCuttingsComponent;
  let fixture: ComponentFixture<AddCuttingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCuttingsComponent]
    });
    fixture = TestBed.createComponent(AddCuttingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
