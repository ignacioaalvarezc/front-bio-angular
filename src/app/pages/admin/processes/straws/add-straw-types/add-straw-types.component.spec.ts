import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStrawTypesComponent } from './add-straw-types.component';

describe('AddStrawTypesComponent', () => {
  let component: AddStrawTypesComponent;
  let fixture: ComponentFixture<AddStrawTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStrawTypesComponent]
    });
    fixture = TestBed.createComponent(AddStrawTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
