import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampusMembersComponent } from './campus-members.component';

describe('CampusMembersComponent', () => {
  let component: CampusMembersComponent;
  let fixture: ComponentFixture<CampusMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampusMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampusMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
