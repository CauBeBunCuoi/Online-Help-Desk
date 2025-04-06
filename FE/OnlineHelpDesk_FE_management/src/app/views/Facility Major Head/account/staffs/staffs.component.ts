import { Component, OnInit } from '@angular/core';
import { Select, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { StaffTableComponent } from './staff-table/staff-table.component';
import { MajorAssignmentService } from '../../../../core/service/major-assignment.service';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-staffs',
  imports: [
    FormsModule,
    Select, SelectModule,
    ProgressSpinnerModule,
    StaffTableComponent,
  ],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss'
})
export class StaffsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number;
  filteredAccounts: any[] = [];

  userId: number;

  // Thêm biến loading để theo dõi trạng thái load dữ liệu
  loading: boolean = false;

  constructor(
    private majorAssignmentService: MajorAssignmentService,
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
    this.loadMajorAssignments();
  }

  // Chỉnh sửa để sử dụng async/await
  loadMajorOptions() {
    this.loading = true; // Bắt đầu loading
    this.facilityMajorService.getMajorsByHead(this.userId)
      .then(facilityMajors => {
        console.log(facilityMajors);
        if (!facilityMajors || !Array.isArray(facilityMajors.data.Majors)) {
          this.majorOptions = [];
          console.log('⚠️ Dữ liệu không hợp lệ:', facilityMajors);
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
        console.error('❌ Lỗi khi tải danh sách Major:', error);
        this.majorOptions = [];
      })
      .finally(() => {
        this.loading = false; // Dừng loading
      });
  }

  loadMajorAssignments() {
    this.loading = true;
    this.majorAssignmentService.getMajorsForHead(this.userId)
      .then(assignments => {
        console.log('Danh sách phân công:', assignments);

        // Khởi tạo mảng allStaff trống
        this.filteredAccounts = [];

        // Duyệt qua mảng Majors và gộp tất cả các Accounts vào mảng allStaff
        assignments.data.Majors.forEach(major => {
          if (major.Accounts && major.Accounts.length > 0) {
            // Gộp tất cả các Accounts vào mảng allStaff
            this.filteredAccounts = [...this.filteredAccounts, ...major.Accounts];
          }
        });

        console.log('Tất cả nhân viên: ', this.filteredAccounts);
      })
      .catch(error => {
        console.error("❌ Lỗi khi tải danh sách phân công:", error);
      })
      .finally(() => {
        this.loading = false;
      });
  }

  // Lọc nhân viên theo Major
  filterAssignmentByMajor() {
    if (this.selectedMajorId) {
      this.loading = true;
      this.majorAssignmentService.getAssigneesByMajor(this.selectedMajorId)
        .then(accounts => {
          this.filteredAccounts = accounts.data.Accounts || [];
        })
        .catch(error => {
          console.error("❌ Lỗi khi lọc nhân viên theo Major:", error);
          this.filteredAccounts = [];
        })
        .finally(() => {
          this.loading = false;
        });
    } else {
      this.loadMajorAssignments();
    }
  }

  handleChildEvent(event) {
    this.loadMajorAssignments();
  }
}
