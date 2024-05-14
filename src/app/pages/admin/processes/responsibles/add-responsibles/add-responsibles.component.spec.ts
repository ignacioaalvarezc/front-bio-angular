import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponsiblesComponent } from './add-responsibles.component';

describe('AddResponsiblesComponent', () => {
  let component: AddResponsiblesComponent;
  let fixture: ComponentFixture<AddResponsiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddResponsiblesComponent]
    });
    fixture = TestBed.createComponent(AddResponsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
