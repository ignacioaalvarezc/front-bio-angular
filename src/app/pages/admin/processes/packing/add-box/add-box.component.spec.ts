import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoxComponent } from './add-box.component';

describe('AddBoxComponent', () => {
  let component: AddBoxComponent;
  let fixture: ComponentFixture<AddBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBoxComponent]
    });
    fixture = TestBed.createComponent(AddBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
