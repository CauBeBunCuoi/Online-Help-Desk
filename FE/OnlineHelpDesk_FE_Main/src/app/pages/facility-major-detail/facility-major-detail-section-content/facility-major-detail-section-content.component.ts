import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { AvatarModule } from 'primeng/avatar';
import { TextareaModule } from 'primeng/textarea';
import { DividerModule } from 'primeng/divider';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { PaginatorModule } from 'primeng/paginator';
import { BadgeModule } from 'primeng/badge';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ChipModule } from 'primeng/chip';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { errorAlert, successAlert } from '../../../core/utils/alert.util';
// và thêm vào imports của component (hoặc module chứa component)
import { ConfirmDialogModule } from 'primeng/confirmdialog';


import { ActivatedRoute, RouterLink } from '@angular/router';
import { FacilityMajorService } from '../../../core/service/facility-major.service';
import { ServiceManagementService } from '../../../core/service/service-management.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facility-major-detail-section-content',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    RatingModule,
    AvatarModule,
    ProgressSpinnerModule,
    TextareaModule,
    DividerModule,
    RatingModule,
    ConfirmDialogModule,
    InputTextModule,
    TabsModule,
    DialogModule,
    PaginatorModule,
    BadgeModule,
    ChipModule,
    TagModule,
    RouterLink,
    ToastModule,
  ],
  templateUrl: './facility-major-detail-section-content.component.html',
  styleUrl: './facility-major-detail-section-content.component.scss',
  providers: [ConfirmationService, MessageService],
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

  addFeedback: boolean = false;
  addReport: boolean = false;
  value: '';
  isLoading = false; // Biến kiểm soát hiển thị spinner
  loadingService: boolean = true;
  loadingFeedback: boolean = true;
  addFeedbackForm: FormGroup;
  addReportForm!: FormGroup;

  // Service để lọc theo user nếu đã từng feed
  feedback = {
    name: 'Tai Le',
    date: '10 tháng 3, 2025',
    rating: 3,
    comment: 'Game hay đấy nhưng game có thể thêm tính năng lúc chơi squad cup mình có thể điều khiển 2 con recruits được...'
  };

  feedbacks: any[] = [];

  myFeedback: any;
  feedbackStatus: boolean;

  services: any[] = [];
  // Dữ liệu mới nhất từ API
  filteredservices: any[] = [];   // Sau khi filter theo tab

  userId: number;
  userName: string = '';

  // Top-level tabs: Service và Contact
  topTabs = [
    { label: 'Service', value: 0 }, // Gom 1 & 2 vào tab này
    { label: 'Contact', value: 3 }
  ];

  selectedTopTab: number = 0; // Mặc định là Service

  serviceSubTabs = [
    { label: 'None Time Required Service', value: 1 },
    { label: 'Time Required Service', value: 2 }
  ];

  selectedServiceSubTab: number = 1; // Mặc định chọn None Time Required

  pageSize = 3;  // Số feedback mỗi trang
  currentPage = 0;
  majorId: number;

  constructor(
    private fb: FormBuilder,
    private facilityMajorService: FacilityMajorService,
    private serviceManagementService: ServiceManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {
    // Tạo form với các trường cần thiết
    this.addFeedbackForm = this.fb.group({
      Content: ['', [Validators.required, Validators.maxLength(500)]],  // Nội dung feedback
      Rate: [0, [Validators.required, Validators.min(1), Validators.max(5)]]  // Đánh giá từ 1-5
    });
    this.addReportForm = this.fb.group({
      ReportTypeId: [null, Validators.required],
      Content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    // Lấy thông tin từ localStorage
    const authDataString = localStorage.getItem('auth');

    // Kiểm tra nếu có dữ liệu và sau đó chuyển sang JSON
    if (authDataString) {
      const authData = JSON.parse(authDataString);
      console.log(authData); // Kiểm tra dữ liệu auth

      // Kiểm tra nếu có dữ liệu 'user' và lấy 'id' từ 'user'
      if (authData.user && authData.user.id) {
        this.userId = authData.user.id;
        this.userName = authData.user.name;

        console.log('User ID:', this.userId); // In ra userId
      }
    }

    this.loadingFeedback = true;
    this.majorId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadFeedback();

    this.applyFilter()
  }

    loadFeedback() {
      if (!this.userId) {
        this.feedbackStatus = false;
        return;
      }
      this.facilityMajorService.getMajorFeedbacks(Number(this.majorId)).then(
        (data) => {
          this.feedbacks = data.data.Feedbacks.filter(feedback => { 
            return feedback.Feedback.IsDeactivated != true && feedback.Major.IsDeactivated != true
          });
          this.onPageChange({ page: 0 });
          const userFb = this.feedbacks.find((f: any) => f.Account.Id == this.userId);
            console.log(userFb)
          if (userFb) {
            this.myFeedback = userFb;
            this.feedbackStatus = true;
            console.log(this.feedbackStatus)
          } else {
            this.myFeedback = null;
            this.feedbackStatus = false;
            console.log(this.feedbackStatus)
          }
        }
      )
        .catch(error => {
          console.error('Error:', error);
          this.feedbacks = [];
        })
        .finally(() => {
          this.loadingFeedback = false; // Ẩn spinner khi có kết quả
        })
    }

  confirmDelete(event: Event, id: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Confirm to delete',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },
      accept: () => {
        this.isLoading = true;
        this.facilityMajorService.deleteFeedback(id)
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadFeedback();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => console.error('Lỗi xóa nhân viên:', error))
          .finally(() => (this.isLoading = false));
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  // Hàm hiển thị dialog
  showDialogFeedback() {
    this.addFeedback = true;
  }

  // Hàm lưu feedback
  saveFeedback(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Add this record?',
      header: 'Confirm to update',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Add',
        severity: 'success',
      },
      accept: () => {
        console.log(this.addFeedbackForm.value)
        const feedbackData = {
          Feedback: {
            Content: this.addFeedbackForm.value.Content,
            Rate: this.addFeedbackForm.value.Rate
          }
        };
        console.log(this.addFeedbackForm.value);
        this.isLoading = true;
        this.facilityMajorService.createFeedback(this.majorId, this.userId, feedbackData).then(
          response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadFeedback();
              this.hideDialogFeedback();
            } else {
              errorAlert(response.message.content);
            }
          }
        ).catch(error => console.error('Lỗi thêm nhân viên:', error))
          .finally(() => (this.isLoading = false));
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  // Hàm ẩn dialog
  hideDialogFeedback() {
    this.addFeedback = false;
    this.addFeedbackForm.reset();
  }

  paginatedFeedbacks: any[] = [];

  onPageChange(event: any) {
    this.currentPage = event.page;
    const start = this.currentPage * this.pageSize;
    this.paginatedFeedbacks = this.feedbacks.slice(start, start + this.pageSize);
  }

  onTopTabChange(value: string | number) {
    this.selectedTopTab = Number(value); // Ép kiểu về number
    console.log('Selected Top Tab:', this.selectedTopTab);
    this.applyFilter();
  }

  onServiceSubTabChange(value: string | number) {
    this.selectedServiceSubTab = Number(value); // Ép kiểu về number
    console.log('Selected Service Sub Tab:', this.selectedServiceSubTab);
    this.applyFilter();
  }

  // Hàm filter dựa trên tab hiện hành
  applyFilter() {
    this.loadingService = true;
    // Gọi API để lấy dữ liệu mới nhất từ server
    this.serviceManagementService.getServicesByMajor(this.majorId).then(response => {
      this.services = response.data.Services;
      console.log(this.services);
      // Sau khi lấy dữ liệu, filter theo tab
      if (this.selectedTopTab === 0) {
        if (this.selectedServiceSubTab === 1) {
          // Lọc theo "None Time Required": ví dụ, dịch vụ có id = true
          this.filteredservices = this.services.filter(s => s.ServiceType.Id == 1);
        } else if (this.selectedServiceSubTab === 2) {
          // Lọc theo "Time Required": dịch vụ có id = false
          this.filteredservices = this.services.filter(s => s.ServiceType.Id == 2);
        }
      } else if (this.selectedTopTab === 3) {
        // Ở tab Contact, bạn có thể định nghĩa filter riêng. Ví dụ ở đây mình chỉ hiện tất cả.
        this.filteredservices = this.services.filter(s => s.ServiceType.Id == 3);;
      }
    })
      .catch(error => console.error('Lỗi thêm nhân viên:', error))
      .finally(() => (this.loadingService = false));
  }
}
