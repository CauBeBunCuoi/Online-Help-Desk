import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { ChipModule } from 'primeng/chip';
import { TagModule } from 'primeng/tag';
// và thêm vào imports của component (hoặc module chứa component)

import { RouterLink } from '@angular/router';
import { FacilityMajorService } from '../../../core/services/facility-major.service';
import { ServiceManagementService } from '../../../core/services/service-management.service';

@Component({
  selector: 'app-facility-major-detail-section-content',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    RatingModule,
    AvatarModule,
    TextareaModule,
    DividerModule,
    InputTextModule,
    TabsModule,
    DialogModule,
    PaginatorModule,
    BadgeModule,
    ChipModule,
    TagModule,
    RouterLink,
  ],
  templateUrl: './facility-major-detail-section-content.component.html',
  styleUrl: './facility-major-detail-section-content.component.scss'
})
export class FacilityMajorDetailSectionContentComponent implements OnInit {
  @Input()
  mainDescription: string = '';
  @Input()
  workShifstDescription: string = '';
  @Input()
  isOpen: string = '';
  @Input()
  closeScheduleDate: string = '';
  @Input()
  openScheduleDate: string = '';
  @Input()
  facilityMajorTypeId: string = '';
  @Input()
  isDeactivated: string = '';

  visible: boolean = false;
  value: '';
  isLoading = true; // Biến kiểm soát hiển thị spinner

  // Service để lọc theo user nếu đã từng feed
  feedback = {
    name: 'Tai Le',
    date: '10 tháng 3, 2025',
    rating: 3,
    comment: 'Game hay đấy nhưng game có thể thêm tính năng lúc chơi squad cup mình có thể điều khiển 2 con recruits được...'
  };

  feedbacks: any[] = [];

  services: any[] = [];           // Dữ liệu mới nhất từ API
  filteredServices: any[] = [];   // Sau khi filter theo tab
  // Top-level tabs: Service và Contact
  topTabs = [
    { label: 'Service', value: 0 }, // Gom 1 & 2 vào tab này
    { label: 'Contact Service', value: 3 }
  ];

  selectedTopTab: number = 0; // Mặc định là Service

  serviceSubTabs = [
    { label: 'None Time Required Service', value: 1 },
    { label: 'Time Required Service', value: 2 }
  ];

  selectedServiceSubTab: number = 1; // Mặc định chọn None Time Required


  pageSize = 3;  // Số feedback mỗi trang
  currentPage = 0;

  constructor(
    private facilityMajorService: FacilityMajorService,
    private serviceManagementService: ServiceManagementService,
  ) { }
  ngOnInit() {

    this.facilityMajorService.getMajorFeedbacks(1).then(
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

    this.loadServices();
  }

  showDialogFeedback() {
    this.visible = true;
  }

  paginatedFeedbacks: any[] = [];

  onPageChange(event: any) {
    this.currentPage = event.page;
    const start = this.currentPage * this.pageSize;
    this.paginatedFeedbacks = this.feedbacks.slice(start, start + this.pageSize);
  }

  // Hàm gọi API để lấy dữ liệu mới nhất
  loadServices(): void {
    this.isLoading = true;
    this.serviceManagementService.getServicesByMajor(1)
      .then(data => {
        this.services = data.Services;
        this.applyFilter();
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        this.services = [];
        this.filteredServices = [];
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  // Khi top tab thay đổi (Service hoặc Contact)
  onTopTabChange(evt: any) {
    this.selectedTopTab = evt.target.value === 0 ? 0 : 3; // Cập nhật theo giá trị của tab
    this.applyFilter();
  }

  onServiceSubTabChange(evt: any) {
    this.selectedServiceSubTab = evt.target.value === 1 ? 1 : 2; // Cập nhật theo giá trị của sub-tab
    this.applyFilter();
  }

  // Hàm filter dựa trên tab hiện hành
  // Hàm filter dựa trên tab hiện hành
  applyFilter(): void {
    // Gọi API để lấy dữ liệu mới nhất từ server
    this.serviceManagementService.getServicesByMajor(1).then(response => {
      // Gán dữ liệu lấy được vào services
      this.services = response.Services;

      // Sau khi lấy dữ liệu, filter theo tab
      if (this.selectedTopTab === 0) {
        if (this.selectedServiceSubTab === 1) {
          // Lọc theo "Time Required": ví dụ, dịch vụ có id = true
          this.filteredServices = this.services.filter(s => s.ServiceType.Id);
        } else if (this.selectedServiceSubTab === 2) {
          // Lọc theo "None Time Required": dịch vụ có id = false
          this.filteredServices = this.services.filter(s => !s.ServiceType.Id);
        }
      } else if (this.selectedTopTab === 3) {
        // Ở tab Contact, bạn có thể định nghĩa filter riêng. Ví dụ ở đây mình chỉ hiện tất cả.
        this.filteredServices = this.services.filter(s => !s.ServiceType.Id);;
      }
    }).catch(error => {
      console.error('Error fetching services:', error);
    });
  }
}
