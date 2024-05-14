import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KnotCuttingComponent } from './knot-cutting.component';

describe('KnotCuttingComponent', () => {
  let component: KnotCuttingComponent;
  let fixture: ComponentFixture<KnotCuttingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KnotCuttingComponent]
    });
    fixture = TestBed.createComponent(KnotCuttingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
