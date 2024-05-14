import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSanitatingComponent } from './add-sanitating.component';

describe('AddSanitatingComponent', () => {
  let component: AddSanitatingComponent;
  let fixture: ComponentFixture<AddSanitatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSanitatingComponent]
    });
    fixture = TestBed.createComponent(AddSanitatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
