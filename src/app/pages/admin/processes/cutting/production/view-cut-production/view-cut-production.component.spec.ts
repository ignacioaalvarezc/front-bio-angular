import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCutProductionComponent } from './view-cut-production.component';

describe('ViewCutProductionComponent', () => {
  let component: ViewCutProductionComponent;
  let fixture: ComponentFixture<ViewCutProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewCutProductionComponent]
    });
    fixture = TestBed.createComponent(ViewCutProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
