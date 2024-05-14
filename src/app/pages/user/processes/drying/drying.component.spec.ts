import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DryingComponent } from './drying.component';

describe('DryingComponent', () => {
  let component: DryingComponent;
  let fixture: ComponentFixture<DryingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DryingComponent]
    });
    fixture = TestBed.createComponent(DryingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
