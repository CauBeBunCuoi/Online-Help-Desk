import { Component } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceManagementService } from '../../../core/services/service-management.service';

@Component({
  selector: 'app-service-major-detail-section-content',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    RouterLink,
  ],
  templateUrl: './service-major-detail-section-content.component.html',
  styleUrl: './service-major-detail-section-content.component.scss'
})
export class ServiceMajorDetailSectionContentComponent {

  visible: boolean = false;

  service: any;
  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;
  isLoading = true; // Biến kiểm soát hiển thị spinner

  constructor(
    private serviceManagementService: ServiceManagementService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceManagementService.findById(Number(id)).then(
      (data) => {
        this.service = data;
      }
    )
      .catch(error => {
        console.error('Error:', error);
        this.service = null;
      })
      .finally(() => {
        this.isLoading = false; // Ẩn spinner khi có kết quả
      })
  }

  showDialog() {
    this.visible = true;
  }
}
