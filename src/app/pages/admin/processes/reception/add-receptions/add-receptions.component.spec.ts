import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReceptionComponent } from './add-receptions.component';

describe('AddReceptionComponent', () => {
  let component: AddReceptionComponent;
  let fixture: ComponentFixture<AddReceptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddReceptionComponent]
    });
    fixture = TestBed.createComponent(AddReceptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
