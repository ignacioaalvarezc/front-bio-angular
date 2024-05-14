import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReceptionsComponent } from './update-receptions.component';

describe('UpdateReceptionsComponent', () => {
  let component: UpdateReceptionsComponent;
  let fixture: ComponentFixture<UpdateReceptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateReceptionsComponent]
    });
    fixture = TestBed.createComponent(UpdateReceptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
