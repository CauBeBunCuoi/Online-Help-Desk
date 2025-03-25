import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { FacilityItemService } from '../../../../core/service/facility-item.service';

@Component({
  selector: 'app-facility-items',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    Dialog,
    InputTextModule,
    AvatarModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    HttpClientModule,
    FileUploadModule,
    InputNumberModule,
  ],
  templateUrl: './facility-items.component.html',
  styleUrl: './facility-items.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FacilityItemsComponent implements OnInit {
  facilityItems!: any[];

  selectedFacilityItemId: number | null = null;

  facilityMajors: any[] = [];
  selectedFacilityMajors: any[] = []; // Lưu FacilityMajor được chọn

  amount: number = 0; // Số lượng nhập vào
  count: number = 0; // Tổng số khả dụng
  remainingAmount: number = 0; // Số lượng còn lại có thể chọn

  addFacilityItemForm: FormGroup;
  add: boolean = false;
  @ViewChild('fileUploadRef') fileUpload!: FileUpload;
  imageUrl: string | null = null;

  // updateStaffForm: FormGroup
  update: boolean = false;

  facilityMajorTable: boolean = false;

  loading: boolean = false;
  activityValues: number[] = [0, 100];

  constructor(
    private facilityItemService: FacilityItemService,
    private facilityMajorService: FacilityMajorService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addFacilityItemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Tên Facility Item
      count: [0, [Validators.required, Validators.min(1)]], // Số lượng (ít nhất 1)
      image: [''], // Ảnh dạng Base64 hoặc URL
    });

  }

  ngOnInit() {
    this.facilityItemService.getFacilityItems().then((data) => {
      this.facilityItems = data;
    });
    this.facilityMajorService.getFacilityMajors().then(data => {
      this.facilityMajors = data;
    });
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement?.value, 'contains');
  }

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  showDialogAdd() {
    this.add = true;
  }

  showDialogUpdate(id: number) {
    this.update = true; // Mở dialog

    // 🔥 Gọi API lấy thông tin FacilityItem
    this.facilityItemService.findById(id).then(item => {
      if (item) {
        this.addFacilityItemForm.patchValue({
          name: item.name,
          count: item.count,
          image: item.image || null, // Nếu có ảnh, load ảnh
        });

        this.imageUrl = item.image || null; // Cập nhật ảnh hiển thị
      }
    });
  }

  hideDialogAdd() {
    this.addFacilityItemForm.reset();
    this.imageUrl = null; // Xóa ảnh hiển thị

    // 🔥 Reset PrimeNG FileUpload
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear(); // Reset fileUpload về trạng thái ban đầu
      }
    }, 100);

    this.add = false;
  }

  hideDialogUpdate() {
    this.addFacilityItemForm.reset(); // Reset form
    this.imageUrl = null; // Xóa ảnh hiển thị

    // 🔥 Reset PrimeNG FileUpload
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear(); // Reset fileUpload về trạng thái ban đầu
      }
    }, 100);

    this.update = false; // Đóng dialog
  }


  onFileSelect(event: any) {
    const file = event.files[0]; // Lấy file đầu tiên
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result; // Hiển thị ảnh trước
        this.addFacilityItemForm.patchValue({ image: e.target.result }); // Gán vào FormGroup
      };
      reader.readAsDataURL(file);
    }
  }

  addFacilityItem() {
    if (this.addFacilityItemForm.valid) {
      console.log('Form Data:', this.addFacilityItemForm.value); // Gửi lên API
      this.hideDialogAdd();
    } else {
      console.log('Form Invalid');
      this.addFacilityItemForm.markAllAsTouched();
    }
  }

  updateFacilityItem() {
    if (this.addFacilityItemForm.valid) {
      console.log('Form update Data:', this.addFacilityItemForm.value); // Gửi lên API
      this.hideDialogUpdate();
    } else {
      console.log('Form update Invalid');
      this.addFacilityItemForm.markAllAsTouched();
    }
  }



  // ✅ Mở dialog với số lượng tối đa (count)
  showDialogFacilityMajorTable(id: number, count: number) {
    this.selectedFacilityItemId = id;
    this.count = count; // Tổng số khả dụng
    this.amount = 0; // Reset số lượng nhập
    this.remainingAmount = count; // Reset số lượng có thể chọn
    this.selectedFacilityMajors = []; // Reset danh sách đã chọn
    this.facilityMajorTable = true;
  }

  // ✅ Khi người dùng nhập số lượng
  onAmountInput() {
    if (this.amount > this.count) {
      this.amount = this.count; // Giới hạn số lượng nhập không lớn hơn `count`
    }
    this.remainingAmount = this.count; // Reset lại số lượng khả dụng
  }

  // ✅ Khi chọn `FacilityMajor`
  onFacilityMajorSelect(event: any) {
    if (this.amount <= this.remainingAmount) {
      this.remainingAmount -= this.amount
    } else {
      // ❌ Nếu không đủ số lượng, bỏ chọn ngay lập tức
      const index = this.selectedFacilityMajors.indexOf(event);
      if (index !== -1) {
        this.selectedFacilityMajors.splice(index, 1);
      }
    }
  }

  // ✅ Khi bỏ chọn `FacilityMajor`
  onFacilityMajorUnselect(event: any) {
    this.remainingAmount += this.amount; // Tăng lại số lượng còn lại
  }

  hideDialogFacilityMajorTable() {
    this.facilityMajorTable = false;
    this.selectedFacilityItemId = null;
    this.selectedFacilityMajors = []; // 🔥 Reset danh sách đã chọn
    this.count = 0; // 🔥 Reset amount
  }

  updateFacilityMajorSelect() {
    if (!this.selectedFacilityItemId) {
      console.warn('No account selected.');
      return;
    }

    if (this.selectedFacilityMajors.length === 0) {
      console.warn('No FacilityMajor selected.');
      return;
    }

    const formData = new FormData();
    formData.append('accountId', this.selectedFacilityItemId.toString()); // Thêm ID người dùng
    formData.append('amount', this.amount.toString()); // Thêm mô tả công việc

    this.selectedFacilityMajors.forEach(fm => {
      formData.append('facilityMajorsId', fm.id.toString());
    });

    console.log('FormData Values:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    console.log('FacilityMajors ID:', formData.getAll('facilityMajorsId'));

  }

}
