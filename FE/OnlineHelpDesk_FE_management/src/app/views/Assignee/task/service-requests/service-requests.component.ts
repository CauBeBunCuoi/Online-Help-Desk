import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule, Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ServiceRequestService } from '../../../../core/service/service-request.service';

import { ServiceRequestTableComponent } from './service-request-table/service-request-table.component'
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-service-requests',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    Select,
    ServiceRequestTableComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './service-requests.component.html',
  styleUrl: './service-requests.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ServiceRequestsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  loading: boolean = false;

  userId: number;

  filteredServiceRequest: any[] = [];
  constructor(
    private serviceRequestService: ServiceRequestService,
    private facilityMajorService: FacilityMajorService,
  ) {
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
    this.loadMajorOptions();
    this.loadServiceRequest();
  }

  loadMajorOptions() {
    this.loading = true; // Bật loading khi bắt đầu gọi API
    this.facilityMajorService.getMajorsByAssignee(this.userId)
      .then(facilityMajors => {
        console.log(facilityMajors);
        if (!facilityMajors || !Array.isArray(facilityMajors.data.Majors)) {
          this.majorOptions = [];
          return;
        }
        this.majorOptions = facilityMajors.data.Majors.reduce((acc, major) => {
          if (!acc.some(item => item.id === major.Major.Id)) {
            acc.push({
              id: major.Major.Id,
              name: major.Major.Name
            });
          }
          return acc;
        }, []);
      })
      .catch(error => {
        console.error('Error loading Major options:', error);
        this.majorOptions = [];
      })
      .finally(() => {
        this.loading = false; // Tắt loading khi hoàn tất
      });
  }


  // ✅ Lấy toàn bộ Service Request
  loadServiceRequest() {
    this.loading = true; // Bật loading khi bắt đầu gọi API
    this.serviceRequestService.getRequestsByAssignee(this.userId)
      .then(serviceRequests => {
        console.log(serviceRequests);
        this.filteredServiceRequest = serviceRequests.data.ServiceRequests; // Ban đầu hiển thị tất cả
      })
      .catch(error => {
        console.error('Error loading Service Requests:', error);
        this.filteredServiceRequest = [];
      })
      .finally(() => {
        this.loading = false; // Tắt loading khi hoàn tất
      });
  }


  // ✅ Lọc Task Requests theo `selectedMajorId`
  filterServiceRequest() {
    this.loading = true; // Bật loading khi bắt đầu lọc dữ liệu
    if (this.selectedMajorId) {
      this.serviceRequestService.getServiceRequestsForAssigneeInMajor(this.userId, this.selectedMajorId)
        .then(serviceRequests => {
          console.log(serviceRequests);
          this.filteredServiceRequest = serviceRequests.ServiceRequests.filter(serviceRequest => serviceRequest.Major.Id === this.selectedMajorId);
        })
        .catch(error => {
          console.error('Error filtering Service Requests:', error);
          this.filteredServiceRequest = [];
        })
        .finally(() => {
          this.loading = false; // Tắt loading khi hoàn tất
        });
    } else {
      this.loadServiceRequest(); // Nếu không chọn Major, hiển thị tất cả
    }
  }

  handleChildEvent(event) {
    this.loadServiceRequest();
  }

}
