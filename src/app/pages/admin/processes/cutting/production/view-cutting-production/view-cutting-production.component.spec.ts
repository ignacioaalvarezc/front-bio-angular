import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCuttingProductionComponent } from './view-cutting-production.component';

describe('ViewCuttingProductionComponent', () => {
  let component: ViewCuttingProductionComponent;
  let fixture: ComponentFixture<ViewCuttingProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCuttingProductionComponent]
    });
    fixture = TestBed.createComponent(ViewCuttingProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
