import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../core/services/facility-major.service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-facility-major-section-content',
  imports: [
    FormsModule,
    RouterLink,
    CardModule,
    AvatarModule,
    RatingModule,
    CarouselModule,
    ProgressSpinnerModule
  ],
  standalone: true,
  templateUrl: './facility-major-section-content.component.html',
  styleUrls: ['./facility-major-section-content.component.scss']
})
export class FacilityMajorSectionContentComponent implements OnInit {

  feedbacks: any[] = [];

  facilitiesMajor: any[];
  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;
  isLoading = true; // Biến kiểm soát hiển thị spinner

  constructor(
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
}
