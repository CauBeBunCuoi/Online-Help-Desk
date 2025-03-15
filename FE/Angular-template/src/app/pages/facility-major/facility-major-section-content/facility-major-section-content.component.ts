import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../core/services/facility-major.service';
import { FacilityMajorTopFeedbackComponent } from '../../../common/components/major-top-feedback/facility-major-top-feedback.component';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-facility-major-section-content',
  imports: [
    FormsModule,
    RouterLink,
    FacilityMajorTopFeedbackComponent,
    CardModule,
    AvatarModule,
    ProgressSpinnerModule
  ],
  standalone: true,
  templateUrl: './facility-major-section-content.component.html',
  styleUrls: ['./facility-major-section-content.component.scss']
})
export class FacilityMajorSectionContentComponent implements OnInit {
  facilitiesMajor: any[];
  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;
  isLoading = true; // Biến kiểm soát hiển thị spinner

  constructor(private facilityMajorService: FacilityMajorService,
  ) { }

  ngOnInit() {
    this.facilityMajorService.getFacilityMajors()
      .then(response => {
        console.log("API Response:", response);

        // Kiểm tra nếu response hợp lệ
        if (response && response.data.facilityMajors) {
          this.facilitiesMajor = response.data.facilityMajors;
        } else {
          this.facilitiesMajor = [];
        }
      })
      .catch(error => {
        console.error('Error:', error);
        this.facilitiesMajor = [];
      })
      .finally(() => {
        this.isLoading = false; // Ẩn spinner khi có kết quả
      });
  }
}
