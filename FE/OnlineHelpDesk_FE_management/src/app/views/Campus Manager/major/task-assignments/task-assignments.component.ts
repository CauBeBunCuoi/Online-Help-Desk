import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule, Select } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TaskRequestService } from '../../../../core/service/task-request.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskAssignmentsTableComponent } from './task-assignments-table/task-assignments.component'
import { FacilityMajorService } from '../../../../core/service/facility-major.service';

@Component({
  selector: 'app-task-assignments',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    Dialog,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    SelectModule,
    Select,
    TaskAssignmentsTableComponent,
  ],
  templateUrl: './task-assignments.component.html',
  styleUrl: './task-assignments.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TaskAssignmentsComponent implements OnInit {
  majorOptions: any[] = [];
  selectedMajorId: number | null = null;

  filteredTaskRequests: any[] = [];

  addTaskRequestForm: FormGroup;
  add: boolean = false;

  constructor(
    private fb: FormBuilder,
    private taskRequestService: TaskRequestService,
    private facilityMajorService: FacilityMajorService,
  ) {
    this.addTaskRequestForm = this.fb.group({
      Description: ['', [Validators.minLength(3)]],
      RequesterId: 1,
      FacilityMajorId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.loadMajorOptions();
    this.loadTaskRequests();
  }

  loadMajorOptions() {
    this.facilityMajorService.getFacilityMajors().then(facilityMajors => {
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


  // ✅ Lấy toàn bộ Task Requests
  loadTaskRequests() {
    this.taskRequestService.getTaskRequests().then(taskRequests => {
      this.filteredTaskRequests = taskRequests; // Ban đầu hiển thị tất cả
    });
  }

  // ✅ Lọc Task Requests theo `selectedMajorId`
  filterTaskRequests() {
    if (this.selectedMajorId) {
      this.taskRequestService.getTaskRequestsByMajorId(this.selectedMajorId).then(taskRequests => {
        this.filteredTaskRequests = taskRequests.filter(task => task.Major.Id === this.selectedMajorId);
      });
    } else {
      this.loadTaskRequests(); // Nếu không chọn Major, hiển thị tất cả
    }
  }

  showDialogAdd() {
    this.add = true;
  }

  hideDialogAdd() {
    this.addTaskRequestForm.reset();
    this.add = false;
  }

  addTaskRequest() {
    if (this.addTaskRequestForm.valid) {
      console.log('Form Data:', this.addTaskRequestForm.value); // Gửi lên API
      this.hideDialogAdd();
    } else {
      console.log('Form Invalid');
      this.addTaskRequestForm.markAllAsTouched();
    }
  }
}
