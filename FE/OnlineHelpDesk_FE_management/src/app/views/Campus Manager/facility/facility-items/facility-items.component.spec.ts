import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityItemsComponent } from './facility-items.component';

describe('FacilityItemsComponent', () => {
  let component: FacilityItemsComponent;
  let fixture: ComponentFixture<FacilityItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacilityItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
