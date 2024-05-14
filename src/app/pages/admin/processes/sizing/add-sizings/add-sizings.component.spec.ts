import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSizingsComponent } from './add-sizings.component';

describe('AddSizingsComponent', () => {
  let component: AddSizingsComponent;
  let fixture: ComponentFixture<AddSizingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSizingsComponent]
    });
    fixture = TestBed.createComponent(AddSizingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
