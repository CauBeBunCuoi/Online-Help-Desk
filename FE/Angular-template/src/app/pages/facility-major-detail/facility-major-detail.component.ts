import { Component } from '@angular/core';
import { FacilityMajorDetailSectionHeaderComponent } from './facility-major-detail-section-header/facility-major-detail-section-header.component';
import { FacilityMajorDetailSectionContentComponent } from './facility-major-detail-section-content/facility-major-detail-section-content.component';
import { ActivatedRoute } from '@angular/router';
import { FacilityMajorService } from '../../core/services/facility-major.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facility-major-detail',
  standalone: true,
  imports: [
    FormsModule,
    FacilityMajorDetailSectionHeaderComponent,
    FacilityMajorDetailSectionContentComponent
  ],
  templateUrl: './facility-major-detail.component.html',
  styleUrl: './facility-major-detail.component.scss'
})
export class FacilityMajorDetailComponent {
  facilityMajor: any = {};

  constructor(
    private route: ActivatedRoute,
    private facilityMajorService: FacilityMajorService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.facilityMajorService.getFacilityMajorById(Number(id))
      .then(response => {
        if (response && response.facilityMajor) {
          console.log(this.facilityMajor);
          this.facilityMajor = response.facilityMajor;
        }
      })
      .catch(error => console.error('Error fetching facility details:', error));
  }
}
