import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCleaningToolComponent } from './update-cleaning-tool.component';

describe('UpdateCleaningToolComponent', () => {
  let component: UpdateCleaningToolComponent;
  let fixture: ComponentFixture<UpdateCleaningToolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCleaningToolComponent]
    });
    fixture = TestBed.createComponent(UpdateCleaningToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
