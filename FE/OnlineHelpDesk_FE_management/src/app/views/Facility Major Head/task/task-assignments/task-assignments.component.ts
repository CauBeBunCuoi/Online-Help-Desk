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

import { TaskRequestService } from '../../../../core/service/task-request.service';

import { TaskAssignmentsTableComponent } from './task-assignments-table/task-assignments.component'
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-task-assignments',
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
    TaskAssignmentsTableComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './task-assignments.component.html',
  styleUrl: './task-assignments.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TaskAssignmentsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;
  filteredTaskRequests: any[] = [];
  loading: boolean = false;  // Biến để theo dõi trạng thái loading

  userId: number;

  constructor(
    private taskRequestService: TaskRequestService,
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
    this.loadTaskRequests();
  }

  // Cập nhật với spinner trong loading
  loadMajorOptions() {
    this.loading = true;  // Bắt đầu loading
    this.facilityMajorService.getMajorsByHead(this.userId).then(facilityMajors => {
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
      this.loading = false;  // Kết thúc loading
    });
  }

  loadTaskRequests() {
    this.loading = true;  // Bắt đầu loading
    this.taskRequestService.getTaskRequestsByHead(this.userId).then(taskRequests => {
      this.filteredTaskRequests = taskRequests.data.TaskRequests; // Ban đầu hiển thị tất cả
    }).catch(error => {
      console.error('Error loading Task Requests:', error);
    }).finally(() => {
      this.loading = false;  // Kết thúc loading
    });
  }

  // ✅ Lọc Task Requests theo `selectedMajorId`
  filterTaskRequests() {
    this.loading = true;  // Bắt đầu loading
    if (this.selectedMajorId) {
      this.taskRequestService.getTaskRequestsByMajor(this.selectedMajorId).then(taskRequests => {
        this.filteredTaskRequests = taskRequests.data.TaskRequests.filter(task => task.Major.Id === this.selectedMajorId);
      }).catch(error => {
        console.error('Error filtering Task Requests:', error);
      }).finally(() => {
        this.loading = false;  // Kết thúc loading
      });
    } else {
      this.loadTaskRequests(); // Nếu không chọn Major, hiển thị tất cả
    }
  }

  handleChildEvent(event) {
    this.loadTaskRequests();
  }
}
