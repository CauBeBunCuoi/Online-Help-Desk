import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../core/service/facility-major.service';
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

  facilitiesMajor: any[] = [];
  facilitiesMajorTop: any[] = [];

  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;
  isLoading: boolean = false;
  loadingMajors: boolean = false;
  loadingFeedbacks: boolean = false;

  constructor(
    private facilityMajorService: FacilityMajorService,
  ) { }

  ngOnInit() {
    this.isLoading = true; // Biến kiểm soát hiển thị spinner
    this.facilityMajorService.getAllMajors().then(
      (data) => {
        this.facilitiesMajor = data.data.Majors.filter(major => !major.Major.IsDeactivated);
      }
    )
      .catch(error => {
        console.error('Error:', error);
        this.facilitiesMajor = [];
      })
      .finally(() => {
        this.isLoading = false; // Ẩn spinner khi có kết quả
      })

    // Lấy danh sách chuyên ngành
    this.facilityMajorService
      .getAllMajors()
      .then((response) => {
        // Lọc các major không bị deactivated
        this.facilitiesMajorTop = response.data?.Majors.filter(major => !major.Major.IsDeactivated).slice(0, 6);
      })
      .catch((err) => {
        console.error('❌ Lỗi khi load majors:', err);
        this.facilitiesMajor = [];
      })
      .finally(() => {
        this.loadingMajors = false;
      });

    // Lấy feedbacks
    this.loadingFeedbacks = true;
    this.facilityMajorService
      .getAllMajorFeedbacks()
      .then((response) => {
        // Lọc các feedback không bị deactivate và sắp xếp theo rate giảm dần
        const filteredFeedbacks = response.data?.Feedbacks
          .filter(feedback => !feedback.Feedback.IsDeactivated && !feedback.Major.IsDeactivated) // lọc các feedback không bị deactivated
          .sort((a, b) => b.Feedback.Rate - a.Feedback.Rate); // sắp xếp theo rate giảm dần
        // Lấy 5 feedback đầu tiên
        this.feedbacks = filteredFeedbacks.slice(0, 5);
      })
      .catch((err) => {
        console.error('❌ Lỗi khi load feedbacks:', err);
        this.feedbacks = [];
      })
      .finally(() => {
        this.loadingFeedbacks = false;
      });
  }
}
