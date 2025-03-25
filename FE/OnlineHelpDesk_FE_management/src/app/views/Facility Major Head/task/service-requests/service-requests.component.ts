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
  ],
  templateUrl: './service-requests.component.html',
  styleUrl: './service-requests.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ServiceRequestsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  filteredServiceRequest: any[] = [];
  constructor(
    private serviceRequestService: ServiceRequestService,
  ) {
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadServiceRequest();
  }

  loadMajorOptions() {
    this.serviceRequestService.getAllServiceRequests().then(serviceRequests => {
      // Lọc danh sách seervice request từ taskRequests và loại bỏ trùng lặp
      const uniqueMajors = new Map<number, any>();

      serviceRequests.forEach(serviceRequest => {
        if (!uniqueMajors.has(serviceRequest.Major.Id)) {
          uniqueMajors.set(serviceRequest.Major.Id, {
            id: serviceRequest.Major.Id,
            name: serviceRequest.Major.Name
          });
        }
      });
      this.majorOptions = Array.from(uniqueMajors.values());
    });
  }

  // ✅ Lấy toàn bộ Service Request
  loadServiceRequest() {
    this.serviceRequestService.getAllServiceRequests().then(serviceRequests => {
      this.filteredServiceRequest = serviceRequests; // Ban đầu hiển thị tất cả
    });
  }

  // ✅ Lọc Task Requests theo `selectedMajorId`
  filterServiceRequest() {
    if (this.selectedMajorId) {
      this.serviceRequestService.getAllServiceRequests().then(serviceRequests => {
        this.filteredServiceRequest = serviceRequests.filter(serviceRequest => serviceRequest.Major.Id === this.selectedMajorId);
      });
    } else {
      this.loadServiceRequest(); // Nếu không chọn Major, hiển thị tất cả
    }
  }

}
