import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingComponent } from './packaging.component';

describe('PackagingComponent', () => {
  let component: PackagingComponent;
  let fixture: ComponentFixture<PackagingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagingComponent]
    });
    fixture = TestBed.createComponent(PackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
