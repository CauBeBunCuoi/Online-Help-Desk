import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { ServiceManagementService } from '../../../core/services/service-management.service';

@Component({
  selector: 'app-service-major-section-content',
  imports: [
    ButtonModule,
    CardModule,
    BadgeModule,
    ChipModule,
    TagModule,
    DividerModule,
    AvatarModule,
    RouterLink,
  ],
  templateUrl: './service-major-section-content.component.html',
  styleUrl: './service-major-section-content.component.scss'
})
export class ServiceMajorSectionContentComponent implements OnInit {
  services: any[];
  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;
  isLoading = true; // Biến kiểm soát hiển thị spinner

  constructor(private serviceManagementService: ServiceManagementService,
  ) { }

  ngOnInit() {
    this.serviceManagementService.getServicesByHead(1).then(
      (data) => {
        console.log(data);
        this.services = data.Services;
      }
    )
      .catch(error => {
        console.error('Error:', error);
        this.services = [];
      })
      .finally(() => {
        this.isLoading = false; // Ẩn spinner khi có kết quả
      })
  }
}
