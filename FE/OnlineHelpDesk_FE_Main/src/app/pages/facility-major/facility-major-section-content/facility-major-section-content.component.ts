import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../core/service/facility-major.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterLink } from '@angular/router';
import { RatingModule } from 'primeng/rating';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-facility-major-section-content',
  imports: [
    FormsModule,
    RouterLink,
    CardModule,
    AvatarModule,
    RatingModule,
    CarouselModule,
    ProgressSpinnerModule,
    ButtonModule,
    ReactiveFormsModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputTextModule,
    SelectModule,
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
  formGroup!: FormGroup;
  loading: boolean = false;

  facilityMajorTypes: any[] = [];
  majors: any[] = [];
  isSearched = false; // mặc định là false

  selectedMajorType: any | undefined;
  keyword: string;

  constructor(
    private facilityMajorService: FacilityMajorService,
    private fb: FormBuilder
  ) {
    this.formGroup = this.fb.group({
      type: [null],
      keyword: ['']
    });
  }

  ngOnInit() {
    this.loadFacilityMajorTypeOptions();
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

  loadFacilityMajorTypeOptions() {
    this.loading = true;
    this.facilityMajorService.getFacilityMajorTypes()
      .then(response => {
        if (!response || !Array.isArray(response.data.FacilityMajorTypes)) {
          this.facilityMajorTypes = [];
          return;
        }
        this.facilityMajorTypes = response.data.FacilityMajorTypes.map(type => ({
          id: type.Id,
          name: type.Name
        }));
      })
      .catch(error => {
        console.error('Error loading Facility Major Type options:', error);
        this.facilityMajorTypes = [];
      })
      .finally(() => {
        this.loading = false;
      });
  }

  save() {
    const formValue = this.formGroup.value;
    const selectedTypeId = formValue.type; // là số, ví dụ: 1, 2, 3,...
    const keyword = formValue.keyword?.trim().toLowerCase();

    console.log('Search type ID:', selectedTypeId);
    console.log('Search keyword:', keyword);

    this.majors = this.facilitiesMajor.filter(major => {
      const majorName = major.Major?.Name?.toLowerCase() || '';
      const majorTypeId = major.MajorType?.Id;

      const isTypeMatched = selectedTypeId ? majorTypeId === selectedTypeId : true;
      const isKeywordMatched = keyword ? majorName.includes(keyword) : true;

      return isTypeMatched && isKeywordMatched;
    });
    console.log(this.majors);

    this.isSearched = true; // đánh dấu là đã tìm kiếm
  }

}
