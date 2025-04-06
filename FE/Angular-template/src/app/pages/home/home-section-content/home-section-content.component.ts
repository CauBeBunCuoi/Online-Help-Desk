import { Component, OnDestroy, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { DividerModule } from 'primeng/divider';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CarouselModule } from 'primeng/carousel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';
import { ServiceManagementService } from '../../../core/services/service-management.service';
import { FacilityMajorService } from '../../../core/services/facility-major.service';

@Component({
  selector: 'app-home-section-content',
  imports: [
    FormsModule,
    TabsModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    RatingModule,
    AvatarModule,
    AvatarGroupModule,
    CarouselModule,
    ProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './home-section-content.component.html',
  styleUrl: './home-section-content.component.scss'
})
export class HomeSectionContentComponent implements OnInit, OnDestroy {
  services: any[] = [];

  facilitiesMajor: any[] = [];

  feedbacks: any[] = [];

  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;
  isLoading = true; // Biến kiểm soát hiển thị spinner

  constructor(
    private serviceManagementService: ServiceManagementService,
    private facilityMajorService: FacilityMajorService,
  ) { }

  ngOnInit() {
    this.facilityMajorService.getAllMajors().then(
      (data) => {
        this.facilitiesMajor = data.Majors;
      }
    )
      .catch(error => {
        console.error('Error:', error);
        this.facilitiesMajor = [];
      })
      .finally(() => {
        this.isLoading = false; // Ẩn spinner khi có kết quả
      });

    this.serviceManagementService.getServicesByHead(1).then(
      (data) => {
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

    this.facilityMajorService.getAllMajorFeedbacks().then(
      (data) => {
        this.feedbacks = data.Feedbacks;
      }
    )
      .catch(error => {
        console.error('Error:', error);
        this.feedbacks = [];
      })
      .finally(() => {
        this.isLoading = false; // Ẩn spinner khi có kết quả
      })
  }

  ngOnDestroy() {
  }

}
