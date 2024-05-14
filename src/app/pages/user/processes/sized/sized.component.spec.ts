import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizedComponent } from './sized.component';

describe('SizedComponent', () => {
  let component: SizedComponent;
  let fixture: ComponentFixture<SizedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SizedComponent]
    });
    fixture = TestBed.createComponent(SizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
