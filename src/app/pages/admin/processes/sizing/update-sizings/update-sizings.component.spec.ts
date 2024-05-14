import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSizingsComponent } from './update-sizings.component';

describe('UpdateSizingsComponent', () => {
  let component: UpdateSizingsComponent;
  let fixture: ComponentFixture<UpdateSizingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSizingsComponent]
    });
    fixture = TestBed.createComponent(UpdateSizingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
