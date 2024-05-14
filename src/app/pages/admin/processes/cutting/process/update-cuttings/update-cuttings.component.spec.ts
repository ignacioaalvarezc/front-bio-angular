import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCuttingsComponent } from './update-cuttings.component';

describe('UpdateCuttingsComponent', () => {
  let component: UpdateCuttingsComponent;
  let fixture: ComponentFixture<UpdateCuttingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCuttingsComponent]
    });
    fixture = TestBed.createComponent(UpdateCuttingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
