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
    // private facilityMajorService: FacilityMajorService,
    private serviceManagementService: ServiceManagementService,
  ) { }

  ngOnInit() {
    this.loadServices();
    this.loadMajorOptions();
  }

  loadMajorOptions() {
    this.serviceManagementService.getAllServices().then(services => {
      // Lọc danh sách Service từ services và loại bỏ trùng lặp
      const uniqueServices = new Map<number, any>();

      services.forEach(service => {
        if (!uniqueServices.has(service.Major.Id)) {
          uniqueServices.set(service.Major.Id, {
            id: service.Major.Id,
            name: service.Major.Name
          });
        }
      });
      this.majorOptions = Array.from(uniqueServices.values());
    });
  }

  // ✅ Lấy toàn bộ feedback
  loadServices() {
    this.serviceManagementService.getAllServices().then((data) => {
      this.filteredServices = data;
    });
  }

  // ✅ Lọc major theo `selectedMajorId`
  filterServices() {
    if (this.selectedMajorId) {
      this.serviceManagementService.getAllServices().then(services => {
        this.filteredServices = services.filter(service => service.Major.Id === this.selectedMajorId);
      });
    } else {
      this.loadServices(); // Nếu không chọn Major, hiển thị tất cả
    }
  }
}
