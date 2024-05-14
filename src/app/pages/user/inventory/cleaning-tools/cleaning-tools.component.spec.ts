import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningToolsComponent } from './cleaning-tools.component';

describe('CleaningToolsComponent', () => {
  let component: CleaningToolsComponent;
  let fixture: ComponentFixture<CleaningToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CleaningToolsComponent]
    });
    fixture = TestBed.createComponent(CleaningToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
