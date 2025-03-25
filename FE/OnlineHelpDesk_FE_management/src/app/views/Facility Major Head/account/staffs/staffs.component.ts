import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { Select, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/service/auth.service';
import { StaffTableComponent } from './staff-table/staff-table.component';
import { MajorAssignmentService } from '../../../../core/service/major-assignment.service';

@Component({
  selector: 'app-staffs',
  imports: [
    FormsModule,
    Select, SelectModule,
    StaffTableComponent,
  ],
  templateUrl: './staffs.component.html',
  styleUrl: './staffs.component.scss'
})
export class StaffsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number;

  filteredAccounts: any[] = []; // 🔹 Lưu danh sách Assignee đã lọc

  private allAccounts: any[] = []; // 🔹 Lưu tất cả Assignee
  private majorAssignments: any[] = []; // 🔹 Lưu danh sách phân công

  constructor(
    // private facilityMajorService: FacilityMajorService,
    private majorAssignmentService: MajorAssignmentService,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadStaffs();
    this.loadMajorAssignments();
  }

  loadMajorOptions() {
    // AccountId
    this.majorAssignmentService.getFacilityMajors(1).then(majors => {
      // Lọc danh sách Major từ majors và loại bỏ trùng lặp
      const uniqueMajors = new Map<number, any>();

      majors.forEach(major => {
        if (!uniqueMajors.has(major.Major.Id)) {
          uniqueMajors.set(major.Major.Id, {
            id: major.Major.Id,
            name: major.Major.Name
          });
        }
      });
      this.majorOptions = Array.from(uniqueMajors.values());
    });
  }

  // ✅ Lấy danh sách Assignee của Head
  loadStaffs() {
    this.majorAssignmentService.getAccountStaffByMajorId(this.selectedMajorId).then((data) => {
      this.allAccounts = data;
      this.filteredAccounts = data; // Mặc định hiển thị tất cả
    });
  }

  // ✅ Lấy danh sách MajorAssignments
  loadMajorAssignments() {
    this.majorAssignmentService.getMajorAssignments().then(assignments => {
      this.majorAssignments = assignments;
    });
  }

  filterAssigneesByMajor() {
    if (this.selectedMajorId) {
      this.majorAssignmentService.getAccountStaffByMajorId(this.selectedMajorId).then(accounts => {
        this.filteredAccounts = accounts;
      });
    } else {
      this.filteredAccounts = this.allAccounts; // Nếu không chọn Major, hiển thị tất cả
    }
  }

}
