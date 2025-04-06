import { Component } from '@angular/core';
import { ServiceMajorDetailSectionContentComponent } from './service-major-detail-section-content/service-major-detail-section-content.component';
import { ServiceMajorDetailSectionHeaderComponent } from './service-major-detail-section-header/service-major-detail-section-header.component';
import { ActivatedRoute } from '@angular/router';
import { ServiceManagementService } from '../../core/services/service-management.service';

@Component({
  selector: 'app-service-major-detail',
  imports: [
    ServiceMajorDetailSectionContentComponent,
    ServiceMajorDetailSectionHeaderComponent,
  ],
  templateUrl: './service-major-detail.component.html',
  styleUrl: './service-major-detail.component.scss'
})
export class ServiceMajorDetailComponent {
  serviceMajor: any = {};

  constructor(
      private route: ActivatedRoute,
      private facilityMajorService: ServiceManagementService,
    ) { } // Inject any necessary services here
    
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.facilityMajorService.getServiceDetails(Number(id))
      .then((response) => {
        this.serviceMajor = response;
      })
      .catch(error => console.error('Error fetching facility details:', error));
  }
}
