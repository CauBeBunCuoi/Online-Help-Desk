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
import { FacilityMajorTopFeedbackComponent } from '../../../common/components/major-top-feedback/facility-major-top-feedback.component';
import { FacilityMajorService } from '../../../core/services/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';

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
    FacilityMajorTopFeedbackComponent,
    ProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './home-section-content.component.html',
  styleUrl: './home-section-content.component.scss'
})
export class HomeSectionContentComponent implements OnInit, OnDestroy {

  facilitiesMajor!: any[];
  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;
  isLoading = true; // Biến kiểm soát hiển thị spinner

  constructor(
    private facilityMajorService: FacilityMajorService,
  ) { }

  ngOnInit() {
    this.facilityMajorService.getFacilityMajors().then(
      (data) => {
        this.facilitiesMajor = data;
      }
    )
      .catch(error => {
        console.error('Error:', error);
        this.facilitiesMajor = [];
      })
      .finally(() => {
        this.isLoading = false; // Ẩn spinner khi có kết quả
      });
  }

  ngOnDestroy() {
  }

}
