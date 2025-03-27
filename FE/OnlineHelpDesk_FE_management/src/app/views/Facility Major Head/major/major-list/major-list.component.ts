import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { FacilityMajorTableComponent } from './major-table/facility-major-table.component';
import { Select, SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-major-list',
  imports: [
    FormsModule,
    FacilityMajorTableComponent,
    Select, SelectModule,
  ],
  templateUrl: './major-list.component.html',
  styleUrl: './major-list.component.scss'
})
export class MajorListComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  // filteredFeedbacks: any[] = [];
  filteredFacilityMajors: any[] = [];

  constructor(
    private facilityMajorService: FacilityMajorService,
  ) { }

  ngOnInit() {
    this.loadFacilityMajors();
    this.loadMajorOptions();
  }

  loadMajorOptions() {
    this.facilityMajorService.getFacilityMajorsByAccountId(1).then(majors => {
      // Lọc danh sách Major từ majors và loại bỏ trùng lặp theo héad
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

  // ✅ Lấy toàn bộ theo head
  loadFacilityMajors() {
    this.facilityMajorService.getFacilityMajorsByAccountId(1).then((data) => {
      this.filteredFacilityMajors = data;
    });
  }

  // ✅ Lọc major theo `selectedMajorId`
  filterFacilityMajors() {
    if (this.selectedMajorId) {
      this.facilityMajorService.getFacilityMajors().then(majors => {
        this.filteredFacilityMajors = majors.filter(major => major.Major.Id === this.selectedMajorId);
      });
    } else {
      this.loadFacilityMajors(); // Nếu không chọn Major, hiển thị tất cả
    }
  }
}
