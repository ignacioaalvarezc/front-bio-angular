import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceptionProductionComponent } from './view-reception-production.component';

describe('ViewReceptionProductionComponent', () => {
  let component: ViewReceptionProductionComponent;
  let fixture: ComponentFixture<ViewReceptionProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReceptionProductionComponent]
    });
    fixture = TestBed.createComponent(ViewReceptionProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
