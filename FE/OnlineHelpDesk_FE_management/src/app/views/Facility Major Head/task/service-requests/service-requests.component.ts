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
    private facilityMajorService: FacilityMajorService,
  ) {
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadServiceRequest();
  }

  loadMajorOptions() {
    // theo head
    this.facilityMajorService.getFacilityMajorsByAccountId(1).then(facilityMajors => {
      if (!facilityMajors || !Array.isArray(facilityMajors)) {
        this.majorOptions = [];
        return;
      }
      this.majorOptions = facilityMajors.reduce((acc, major) => {
        if (!acc.some(item => item.id === major.Major.Id)) {
          acc.push({
            id: major.Major.Id,
            name: major.Major.Name
          });
        }
        return acc;
      }, []);
    }).catch(error => {
      console.error('Error loading Major options:', error);
      this.majorOptions = [];
    });
  }

  // ✅ Lấy toàn bộ Service Request
  loadServiceRequest() {
    this.serviceRequestService.getAllServiceRequestsByHead(1).then(serviceRequests => {
      this.filteredServiceRequest = serviceRequests; // Ban đầu hiển thị tất cả
    });
  }

  // ✅ Lọc Task Requests theo `selectedMajorId`
  filterServiceRequest() {
    if (this.selectedMajorId) {
      this.serviceRequestService.getRequestsByMajor(this.selectedMajorId).then(serviceRequests => {
        this.filteredServiceRequest = serviceRequests.filter(serviceRequest => serviceRequest.Major.Id === this.selectedMajorId);
      });
    } else {
      this.loadServiceRequest(); // Nếu không chọn Major, hiển thị tất cả
    }
  }

}
