import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ServiceManagementService } from '../../../core/services/service-management.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceRequestService } from '../../../core/services/service-request.service';
import { CommonModule } from '@angular/common';
import { Select, SelectModule } from 'primeng/select';

@Component({
  selector: 'app-service-major-detail-section-content',
  standalone: true,
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    SelectModule, Select,
    RouterLink,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './service-major-detail-section-content.component.html',
  styleUrls: ['./service-major-detail-section-content.component.scss'],
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

  addServiceRequestForm: FormGroup;

  constructor(
    private serviceManagementService: ServiceManagementService,
    private serviceRequestService: ServiceRequestService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {
    this.addServiceRequestForm = this.fb.group({
      ServiceId: [''],
      RequesterId: [1],
      RequestInitDescription: ['', Validators.required],
      TimeRequest: ['', Validators.required],
      DateRequest: ['', Validators.required],

      Name: [''],      // For serviceType 3
      Email: [''],     // For serviceType 3
      Phone: ['']      // For serviceType 3
    });
  }

  ngOnInit() {
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
        this.service = service;
        this.serviceType = Number(this.service?.ServiceType?.Id) || null;
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
        this.serviceSchedules = data.Schedules;
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
  }

  addServiceRequest() {
    if (this.addServiceRequestForm.valid) {
      console.log('Service request added:', this.addServiceRequestForm.value);
    }
  }
}
