import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStrawTypesComponent } from './view-straw-types.component';

describe('StrawTypesComponent', () => {
  let component: ViewStrawTypesComponent;
  let fixture: ComponentFixture<ViewStrawTypesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewStrawTypesComponent]
    });
    fixture = TestBed.createComponent(ViewStrawTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
