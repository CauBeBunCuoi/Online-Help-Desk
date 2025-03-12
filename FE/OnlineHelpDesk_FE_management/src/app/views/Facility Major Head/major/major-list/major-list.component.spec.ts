import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorListComponent } from './major-list.component';

describe('MajorListComponent', () => {
  let component: MajorListComponent;
  let fixture: ComponentFixture<MajorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MajorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
