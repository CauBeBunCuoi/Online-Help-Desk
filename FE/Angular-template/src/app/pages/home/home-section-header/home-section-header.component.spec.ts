import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionHeaderComponent } from './home-section-header.component';

describe('HomeSectionHeaderComponent', () => {
  let component: HomeSectionHeaderComponent;
  let fixture: ComponentFixture<HomeSectionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSectionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
