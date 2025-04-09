import { Component } from '@angular/core';
import { FacilityMajorDetailSectionHeaderComponent } from './facility-major-detail-section-header/facility-major-detail-section-header.component';
import { FacilityMajorDetailSectionContentComponent } from './facility-major-detail-section-content/facility-major-detail-section-content.component';
import { ActivatedRoute } from '@angular/router';
import { FacilityMajorService } from '../../core/service/facility-major.service';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-facility-major-detail',
  standalone: true,
  imports: [
    FormsModule,
    FacilityMajorDetailSectionHeaderComponent,
    FacilityMajorDetailSectionContentComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './facility-major-detail.component.html',
  styleUrl: './facility-major-detail.component.scss'
})
export class FacilityMajorDetailComponent {
  facilityMajor: any = {};
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private facilityMajorService: FacilityMajorService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    this.facilityMajorService.getMajorDetail(Number(id))
      .then((response) => {
        this.facilityMajor = response.data;
      })
      .catch(error => console.error('Error fetching facility details:', error))
      .finally(() => {
        this.loading = false; // Ẩn spinner khi có kết quả
      })
  }
}
