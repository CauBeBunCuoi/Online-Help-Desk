import { Component } from '@angular/core';
import { FacilityMajorSectionHeaderComponent } from './facility-major-section-header/facility-major-section-header.component';
import { FacilityMajorSectionContentComponent } from './facility-major-section-content/facility-major-section-content.component';

@Component({
  selector: 'app-facility-major',
  imports: [
    FacilityMajorSectionHeaderComponent,
    FacilityMajorSectionContentComponent,
  ],
  templateUrl: './facility-major.component.html',
  styleUrl: './facility-major.component.scss'
})
export class FacilityMajorComponent {

}
