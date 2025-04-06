import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ServiceManagementService } from '../../../../core/service/service-management.service';
import { ServiceTableComponent } from './service-table/service-table.component';
import { Select, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-services',
  imports: [
    FormsModule,
    Select, SelectModule,
    ServiceTableComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;
  filteredServices: any[] = [];
  loading: boolean = false;  // Biến loading để điều khiển spinner

  userId: number;

  constructor(
    private facilityMajorService: FacilityMajorService,
    private serviceManagementService: ServiceManagementService,
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
    this.loadServices();
    this.loadMajorOptions();
  }

  loadMajorOptions() {
    this.loading = true;  // Bật spinner khi bắt đầu gọi API
    this.facilityMajorService.getMajorsByHead(this.userId).then(facilityMajors => {
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
    }).catch(error => {
      console.error('Error loading Major options:', error);
      this.majorOptions = [];
    }).finally(() => {
      this.loading = false;  // Tắt spinner sau khi gọi API xong
    });
  }

  // Lấy toàn bộ feedback
  loadServices() {
    this.loading = true;  // Bật spinner khi bắt đầu gọi API
    this.serviceManagementService.getServicesByHead(this.userId).then((data) => {
      this.filteredServices = data.data.Services;
    }).catch(error => {
      console.error('Error loading services:', error);
    }).finally(() => {
      this.loading = false;  // Tắt spinner sau khi gọi API xong
    });
  }

  // Lọc major theo `selectedMajorId`
  filterServices() {
    if (this.selectedMajorId) {
      this.loading = true;  // Bật spinner khi bắt đầu lọc
      this.serviceManagementService.getServicesByMajor(this.selectedMajorId).then(services => {
        this.filteredServices = services.data.Services.filter(service => service.Major.Id === this.selectedMajorId);
      }).catch(error => {
        console.error('Error filtering services:', error);
      }).finally(() => {
        this.loading = false;  // Tắt spinner sau khi lọc xong
      });
    } else {
      this.loadServices(); // Nếu không chọn Major, hiển thị tất cả
    }
  }

  handleChildEvent(event) {
    this.loadServices();
  }
}
