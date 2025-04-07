import { Component } from '@angular/core';
import { ServiceMajorDetailSectionContentComponent } from './service-major-detail-section-content/service-major-detail-section-content.component';
import { ServiceMajorDetailSectionHeaderComponent } from './service-major-detail-section-header/service-major-detail-section-header.component';
import { ActivatedRoute } from '@angular/router';
import { ServiceManagementService } from '../../core/service/service-management.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-service-major-detail',
  imports: [
    ProgressSpinnerModule,
    ServiceMajorDetailSectionContentComponent,
    ServiceMajorDetailSectionHeaderComponent,
  ],
  templateUrl: './service-major-detail.component.html',
  styleUrl: './service-major-detail.component.scss'
})
export class ServiceMajorDetailComponent {
  serviceMajor: any = {};
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private facilityMajorService: ServiceManagementService,
  ) { } // Inject any necessary service here

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.loading = false;
    this.facilityMajorService.getServiceDetails(Number(id))
      .then((response) => {
        this.serviceMajor = response.data;
      })
      .catch(error => console.error('Error fetching facility details:', error))
      .finally(() => (this.loading = false));
  }
}
