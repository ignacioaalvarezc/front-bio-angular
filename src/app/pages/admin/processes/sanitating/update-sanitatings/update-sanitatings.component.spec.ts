import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSanitatingsComponent } from './update-sanitatings.component';

describe('UpdateSanitatingsComponent', () => {
  let component: UpdateSanitatingsComponent;
  let fixture: ComponentFixture<UpdateSanitatingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSanitatingsComponent]
    });
    fixture = TestBed.createComponent(UpdateSanitatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
