import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityItemComponent } from './security-item.component';

describe('SecurityItemComponent', () => {
  let component: SecurityItemComponent;
  let fixture: ComponentFixture<SecurityItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityItemComponent]
    });
    fixture = TestBed.createComponent(SecurityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
