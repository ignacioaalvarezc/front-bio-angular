import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResponsiblesComponent } from './update-responsibles.component';

describe('UpdateResponsiblesComponent', () => {
  let component: UpdateResponsiblesComponent;
  let fixture: ComponentFixture<UpdateResponsiblesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateResponsiblesComponent]
    });
    fixture = TestBed.createComponent(UpdateResponsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
