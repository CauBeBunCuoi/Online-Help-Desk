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

import { ServiceManagementService } from '../../../core/service/service-management.service';
import { FacilityMajorService } from '../../../core/service/facility-major.service';

@Component({
  selector: 'app-home-section-content',
  standalone: true,
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
  styleUrl: './home-section-content.component.scss',
})
export class HomeSectionContentComponent implements OnInit, OnDestroy {
  services: any[] = [];
  facilitiesMajor: any[] = [];
  feedbacks: any[] = [];

  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;

  // Loading state cho từng phần
  loadingMajors = true;
  loadingServices = true;
  loadingFeedbacks = true;

  constructor(
    private serviceManagementService: ServiceManagementService,
    private facilityMajorService: FacilityMajorService
  ) { }

  ngOnInit() {
    // call api
    this.facilityMajorService
      .getAllMajorsFeartures()
      .then((response) => {
        this.facilitiesMajor = response.data?.Features
      })
      .catch((err) => {
        this.facilitiesMajor = [];
      })
      .finally(() => {
        this.loadingMajors = false;
      });


    this.serviceManagementService
    // call api
      .getAllServices()
      .then((response) => {
        const activeServices = response.data?.Services.filter(service => !service.IsDeactivated);

        // Chọn ngẫu nhiên 5 dịch vụ từ danh sách đã lọc
        this.services = this.getRandomItems(activeServices, 5);
      })
      .catch((err) => {
        this.services = [];
      })
      .finally(() => {
        this.loadingServices = false;
      });

      // call api
    this.facilityMajorService
      .getAllMajorFeedbacks()
      .then((response) => {
        const filteredFeedbacks = response.data?.Feedbacks
          .filter(feedback => !feedback.Feedback.IsDeactivated && !feedback.Major.IsDeactivated)
          .sort((a, b) => b.Feedback.Rate - a.Feedback.Rate);
        this.feedbacks = filteredFeedbacks.slice(0, 5);
      })
      .catch((err) => {
        this.feedbacks = [];
      })
      .finally(() => {
        this.loadingFeedbacks = false;
      });

  }

  // get random
  getRandomItems(arr: any[], n: number): any[] {
    const shuffled = arr.slice(0);
    let i = arr.length, t, j;

    // Random
    while (i) {
      j = Math.floor(Math.random() * i--);
      t = shuffled[i];
      shuffled[i] = shuffled[j];
      shuffled[j] = t;
    }

    return shuffled.slice(0, n);
  }

  ngOnDestroy() { }
}
