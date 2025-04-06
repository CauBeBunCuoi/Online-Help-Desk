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

import { ServiceRequestService } from '../../core/services/service-request.service';
import { FacilityMajorService } from '../../core/services/facility-major.service';
import { ServiceRequestTableComponent } from './service-request-table/service-request-table.component';
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
  filteredServiceRequest: any[] = [];

  loading: boolean = false;  // Flag to control the loading indicator

  constructor(
    private serviceRequestService: ServiceRequestService,
    private facilityMajorService: FacilityMajorService,
  ) { }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadServiceRequest();
  }

  loadMajorOptions() {
    this.loading = true;  // Start loading
    this.facilityMajorService.getMajorsByHead(1).then(facilityMajors => {
      console.log(facilityMajors);
      if (!facilityMajors || !Array.isArray(facilityMajors.Majors)) {
        this.majorOptions = [];
        return;
      }
      this.majorOptions = facilityMajors.Majors.reduce((acc, major) => {
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
    }).finally(() => {
      this.loading = false;  // Stop loading
    });
  }

  loadServiceRequest() {
    this.loading = true;  // Start loading
    this.serviceRequestService.getServiceRequestsForHead(1).then(serviceRequests => {
      console.log(serviceRequests);
      this.filteredServiceRequest = serviceRequests.ServiceRequests;  // Display all initially
    }).catch(error => {
      console.error('Error loading Service Requests:', error);
    }).finally(() => {
      this.loading = false;  // Stop loading
    });
  }

  filterServiceRequest() {
    this.loading = true;  // Start loading
    if (this.selectedMajorId) {
      this.serviceRequestService.getServiceRequestsForMajor(this.selectedMajorId).then(serviceRequests => {
        console.log(serviceRequests);
        this.filteredServiceRequest = serviceRequests.ServiceRequests;
      }).catch(error => {
        console.error('Error filtering Service Requests:', error);
      }).finally(() => {
        this.loading = false;  // Stop loading
      });
    } else {
      this.loadServiceRequest();  // If no Major selected, show all
    }
  }
}
