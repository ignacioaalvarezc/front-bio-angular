import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReceptionStatisticsComponent } from './view-reception-statistics.component';

describe('ViewReceptionStatisticsComponent', () => {
  let component: ViewReceptionStatisticsComponent;
  let fixture: ComponentFixture<ViewReceptionStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReceptionStatisticsComponent]
    });
    fixture = TestBed.createComponent(ViewReceptionStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
