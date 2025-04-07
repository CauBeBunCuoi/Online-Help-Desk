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

import { ServiceRequestService } from '../../core/service/service-request.service';
import { FacilityMajorService } from '../../core/service/facility-major.service';
import { ServiceRequestTableComponent } from './service-request-table/service-request-table.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

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
    ConfirmDialogModule,
    Toast,
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

  userId: number;

  loading: boolean = false;  // Flag to control the loading indicator

  constructor(
    private serviceRequestService: ServiceRequestService,
    private facilityMajorService: FacilityMajorService,
  ) { }

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
    this.loading = true;  // Start loading
    this.facilityMajorService.getAllMajors().then(facilityMajors => {
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
    }).catch(error => {
      console.error('Error loading Major options:', error);
      this.majorOptions = [];
    }).finally(() => {
      this.loading = false;  // Stop loading
    });
  }

  loadServiceRequest() {
    this.loading = true;  // Start loading
    this.serviceRequestService.getServiceRequestsByRequester(this.userId).then(serviceRequests => {
      this.filteredServiceRequest = serviceRequests.data.ServiceRequests.filter(sr => sr.ServiceRequest.RequestStatusId != 3);  // Display all initially
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
        this.filteredServiceRequest = serviceRequests.data.ServiceRequests;
      }).catch(error => {
        console.error('Error filtering Service Requests:', error);
      }).finally(() => {
        this.loading = false;  // Stop loading
      });
    } else {
      this.loadServiceRequest();  // If no Major selected, show all
    }
  }

  handleChildEvent(event) {
    this.loadServiceRequest();
  }
}
