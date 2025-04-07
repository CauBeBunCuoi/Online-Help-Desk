import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { RouterLink } from '@angular/router';
import { ServiceManagementService } from '../../../core/service/service-management.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-service-major-section-content',
  imports: [
    ButtonModule,
    CardModule,
    BadgeModule,
    ChipModule,
    TagModule,
    DividerModule,
    ProgressSpinnerModule,
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
  isLoading = false; // Biến kiểm soát hiển thị spinner

  constructor(private serviceManagementService: ServiceManagementService,
  ) { }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {

    this.isLoading = true;
    this.serviceManagementService.getAllServices().then(
      (data) => {
        console.log(data);
        this.services = data.data.Services;
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
