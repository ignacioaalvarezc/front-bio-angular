import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCutTypesComponent } from './update-cut-types.component';

describe('UpdateCutTypesComponent', () => {
  let component: UpdateCutTypesComponent;
  let fixture: ComponentFixture<UpdateCutTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCutTypesComponent]
    });
    fixture = TestBed.createComponent(UpdateCutTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
