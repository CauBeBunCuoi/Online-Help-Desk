import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSectionContentComponent } from './home-section-content.component';

describe('HomeSectionContentComponent', () => {
  let component: HomeSectionContentComponent;
  let fixture: ComponentFixture<HomeSectionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSectionContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSectionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
