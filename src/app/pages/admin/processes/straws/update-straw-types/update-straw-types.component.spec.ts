import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStrawTypesComponent } from './update-straw-types.component';

describe('UpdateStrawTypesComponent', () => {
  let component: UpdateStrawTypesComponent;
  let fixture: ComponentFixture<UpdateStrawTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStrawTypesComponent]
    });
    fixture = TestBed.createComponent(UpdateStrawTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
