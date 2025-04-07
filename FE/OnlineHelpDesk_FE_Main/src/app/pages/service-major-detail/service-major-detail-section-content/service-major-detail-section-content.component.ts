import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceManagementService } from '../../../core/service/service-management.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceRequestService } from '../../../core/service/service-request.service';
import { CommonModule } from '@angular/common';
import { Select, SelectModule } from 'primeng/select';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { errorAlert, successAlert } from '../../../core/utils/alert.util';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-service-major-detail-section-content',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    SelectModule, Select,
    RouterLink,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    Toast,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './service-major-detail-section-content.component.html',
  styleUrls: ['./service-major-detail-section-content.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ServiceMajorDetailSectionContentComponent implements OnInit {

  availableTimes: string[] = [];
  serviceSchedules: any[] = [];
  selectedServiceId!: number;
  addServiceAvailable: boolean = false;
  loading: boolean = false;
  service: any;
  serviceType: number | null = null;
  showFullDescription: { [key: number]: boolean } = {};
  maxLength = 100;
  isLoading = true;
  userId: number;
  serviceId: number;

  addServiceRequestForm: FormGroup;

  constructor(
    private serviceRequestService: ServiceRequestService,
    private serviceManagementService: ServiceManagementService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.addServiceRequestForm = this.fb.group({
      ServiceId: this.selectedServiceId,
      RequesterId: this.userId,
      RequestInitDescription: ['', Validators.required],
      TimeRequest: [''],
      DateRequest: [''],

      Name: [''],      // For serviceType 3
      Email: [''],     // For serviceType 3
      Phone: ['']      // For serviceType 3
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

        console.log('User ID:', this.userId); // In ra userId
      }
    }
    const serviceId = this.route.snapshot.paramMap.get('id');
    if (serviceId) {
      this.selectedServiceId = Number(serviceId);
      this.fetchServiceDetails();
    }
  }

  fetchServiceDetails() {
    this.isLoading = true;
    this.serviceManagementService.getServiceDetails(this.selectedServiceId)
      .then((service) => {
        this.service = service.data;
        this.serviceType = Number(this.service?.ServiceType?.Id) || null;
        console.log(this.serviceType);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching service details:', error);
        this.service = null;
        this.isLoading = false;
      });
  }

  fetchBookableSchedules() {
    this.isLoading = true;
    this.serviceManagementService.getBookableSchedules(this.selectedServiceId)
      .then((data) => {
        this.serviceSchedules = data.data.Schedules;
        console.log('Bookable schedules:', this.serviceSchedules);
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching bookable schedules:', error);
        this.isLoading = false;
      });
  }

  get availableTimesObjects() {
    return this.availableTimes.map(time => ({ Time: time }));
  }


  onDayChange() {
    this.addServiceRequestForm.patchValue({
      TimeRequest: '', // Reset time request when day is changed
    });

    const selectedDay = this.addServiceRequestForm.value.DateRequest;
    const selectedSchedule = this.serviceSchedules.find(schedule => schedule.Date === selectedDay);

    if (selectedSchedule) {
      this.availableTimes = selectedSchedule.Times;
      console.log('Available times:', this.availableTimes);
    } else {
      this.availableTimes = [];
    }
  }

  showDialogServiceAvailable() {
    this.addServiceAvailable = true;
    this.fetchBookableSchedules();
  }

  hideDialogAdd() {
    this.addServiceAvailable = false;
    this.addServiceRequestForm.reset();
  }

  addServiceRequest(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Add this record?',
      header: 'Confirm to add',
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
        let formValue = this.addServiceRequestForm.value;
        // Nếu là serviceType 3 thì nối thêm thông tin phụ
        if (this.serviceType === 3) {
          const additionalInfo = [
            formValue.Name?.trim() ? `- Requester Full Name: ${formValue.Name.trim()}` : '',
            formValue.Email?.trim() ? `- Email: ${formValue.Email.trim()}` : '',
            formValue.Phone?.trim() ? `- Phone: ${formValue.Phone.trim()}` : ''
          ].filter(line => line !== '').join('\n');
          formValue.RequestInitDescription = `- Description: ` + (formValue.RequestInitDescription || '').trim() + '\n' + additionalInfo;
        }
        const requestBody = {
          ServiceRequest: {
            ServiceId: this.selectedServiceId!,
            RequesterId: this.userId!,
            RequestInitDescription: formValue.RequestInitDescription,
            TimeRequest: formValue.TimeRequest,
            DateRequest: formValue.DateRequest
          }
        };
        this.isLoading = true;
        this.serviceRequestService.createServiceRequest(requestBody).then(
          response => {
            if (response.success) {
              successAlert(response.message.content);
              this.hideDialogAdd();
            } else {
              errorAlert(response.message.content);
            }
          }
        ).catch(error => {
          console.error('Lỗi khi gửi yêu cầu:', error);
          errorAlert('Gửi yêu cầu thất bại. Vui lòng thử lại.');
        }).finally(() => this.isLoading = false);

        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

}
