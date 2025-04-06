import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { FacilityMajorTableComponent } from './major-table/facility-major-table.component';

import { FormsModule } from '@angular/forms';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-major-list',
  imports: [
    FormsModule,
    FacilityMajorTableComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './major-list.component.html',
  styleUrl: './major-list.component.scss'
})
export class MajorListComponent implements OnInit {
  filteredFacilityMajors: any[] = [];
  loading: boolean = false; // Biến để hiển thị spinner

  userId: number;

  constructor(
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
    this.loadMajors();
  }

  loadMajors() {
    this.loading = true; // Bắt đầu hiển thị spinner
    this.facilityMajorService.getMajorsByHead(this.userId)
      .then(facilityMajors => {
        this.filteredFacilityMajors = facilityMajors.data.Majors;
        console.log(this.filteredFacilityMajors);
      })
      .catch(error => {
        console.error('Error loading Major options:', error);
      })
      .finally(() => {
        this.loading = false; // Kết thúc hiển thị spinner
      });
  }

  handleChildEvent(event) {
    this.loadMajors();
  }
}