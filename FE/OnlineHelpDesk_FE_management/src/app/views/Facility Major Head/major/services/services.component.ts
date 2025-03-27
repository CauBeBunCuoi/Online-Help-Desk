import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ServiceManagementService } from '../../../../core/service/service-management.service';
import { ServiceTableComponent } from './service-table/service-table.component';
import { Select, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-services',
  imports: [
    FormsModule,
    Select, SelectModule,
    ServiceTableComponent,
  ],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  filteredServices: any[] = [];

  constructor(
    private facilityMajorService: FacilityMajorService,
    private serviceManagementService: ServiceManagementService,
  ) { }

  ngOnInit() {
    this.loadServices();
    this.loadMajorOptions();
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

  // ✅ Lấy toàn bộ feedback
  loadServices() {
    this.serviceManagementService.getAllServicesByAccountId(1).then((data) => {
      this.filteredServices = data;
    });
  }

  // ✅ Lọc major theo `selectedMajorId`
  filterServices() {
    if (this.selectedMajorId) {
      this.serviceManagementService.getServicesByFacilityMajor(this.selectedMajorId).then(services => {
        this.filteredServices = services.filter(service => service.Major.Id === this.selectedMajorId);
      });
    } else {
      this.loadServices(); // Nếu không chọn Major, hiển thị tất cả
    }
  }
}
