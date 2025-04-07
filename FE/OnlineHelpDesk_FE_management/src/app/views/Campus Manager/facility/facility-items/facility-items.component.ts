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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { FacilityItemService } from '../../../../core/service/facility-item.service';
import { SelectModule } from 'primeng/select';
import { errorAlert, successAlert } from '../../../../core/utils/alert.util';

@Component({
  selector: 'app-facility-items',
  standalone: true,
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
    SelectModule,
    InputTextModule,
    AvatarModule,
    IconFieldModule,
    InputIconModule,
    MultiSelectModule,
    HttpClientModule,
    FileUploadModule,
    InputNumberModule,
    ProgressSpinnerModule
  ],
  templateUrl: './facility-items.component.html',
  styleUrls: ['./facility-items.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class FacilityItemsComponent implements OnInit {
  facilityItems!: any[];
  selectedFacilityItemId: number | null = null;

  actions = [
    { label: 'add', value: 'add' },
    { label: 'remove', value: 'remove' }
  ];

  facilityMajors: any[] = [];
  selectedFacilityMajors: any[] = []; // Lưu FacilityMajor được chọn

  amount: number = 0; // Số lượng nhập vào
  count: number = 0;  // Tổng số khả dụng
  remainingAmount: number = 0; // Số lượng còn lại có thể chọn

  addFacilityItemForm: FormGroup;
  updateFacilityItemForm: FormGroup;
  updateFacilityItemFormMain: FormGroup;
  add: boolean = false;
  updateMain: boolean = false;
  update: boolean = false;
  facilityMajorTable: boolean = false;

  imageUrl: string | null = null;
  loading: boolean = false;
  loadingAdd: boolean = false;
  loadingMain: boolean = false;
  loadingDetail: boolean = false;
  activityValues: number[] = [0, 100];
  itemMajors: any[] = [];

  @ViewChild('fileUploadRef') fileUpload!: FileUpload;

  constructor(
    private facilityItemService: FacilityItemService,
    private facilityMajorService: FacilityMajorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.addFacilityItemForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Count: [0, [Validators.required, Validators.min(1)]],
      Image: [''],
    });

    this.updateFacilityItemForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Count: [0, [Validators.required, Validators.min(1)]],
      Image: [''],
      Action: '',
      Amount: [null] // Thêm control Amount vào form group
    });

    this.updateFacilityItemFormMain = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Count: [0, [Validators.required, Validators.min(1)]],
      Image: [''],
    });
  }

  ngOnInit() {
    this.loadFacilityItem();
    this.loadMajors();
  }

  loadFacilityItem() {
    this.loading = true;
    this.facilityItemService.getItems()
      .then((data) => {
        this.facilityItems = data.data.Items;
      })
      .catch(error => console.error('Lỗi khi lấy danh sách item:', error))
      .finally(() => this.loading = false);
  }

  loadMajors() {
    this.loading = true;
    this.facilityMajorService.getAllMajors()
      .then(data => {
        this.facilityMajors = data.data.Majors;
      })
      .catch(error => console.error('Lỗi khi lấy danh sách major:', error))
      .finally(() => this.loading = false);
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement.value, 'contains');
  }

  confirmDelete(event: Event, id: number) {
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
        this.loading = true;
        this.facilityItemService.deleteItem(id).then((response: any) => {
          if (response.success) {
            successAlert(response.message.content);
            this.loadFacilityItem();
          } else {
            errorAlert(response.message.content);
          }
        });
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

  addFacilityItem(event: any) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Add this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Add',
        severity: 'success',
      },
      accept: () => {
        if (this.addFacilityItemForm.valid) {
          this.loadingAdd = true;
          this.facilityItemService.addItem(this.addFacilityItemForm.value)
            .then((response) => {
              if (response.success) {
                successAlert(response.message.content);
                this.loadFacilityItem();
              } else {
                errorAlert(response.message.content);
              }
              this.hideDialogAdd();
            })
            .catch(error => console.error('Lỗi khi thêm item:', error))
            .finally(() => this.loading = false);
        } else {
          console.log('Form Invalid');
          this.addFacilityItemForm.markAllAsTouched();
        }
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogAdd() {
    this.addFacilityItemForm.reset();
    this.imageUrl = null;
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear();
      }
    }, 100);
    this.add = false;
  }

  showDialogUpdateMain(id: number) {
    this.updateMain = true;
    this.selectedFacilityItemId = id;
    this.updateFacilityItemForm.reset();
    // thêm loadingDetail để hiển thị spinner
    this.loadingDetail = true;
    this.facilityItemService.getItemById(id)
      .then(item => {
        const Item = item.data;
        if (Item) {
          this.updateFacilityItemFormMain.patchValue({
            Name: Item.Item.Name,
            Count: Item.Item.Count,
            Image: null,
          });
          this.count = Item.Item.Count,
            console.log(this.count);
          this.imageUrl = Item.Item.ImageUrl;
          this.selectedFacilityItemId = Item.Item.Id;
        }
        // Lấy thông tin Major đã được gán cho item
        this.facilityItemService.getItemMajors(id)
          .then(response => {
            if (response.success && response.data.FacilityItemAssignments) {
              this.itemMajors = response.data.FacilityItemAssignments;
            } else {
              console.warn('⚠ Không tìm thấy danh sách Major nào.');
              this.itemMajors = [];
            }
          })
          .catch(error => console.error('Lỗi khi lấy major của item:', error));
      })
      .catch(error => console.error('Lỗi khi lấy thông tin item:', error))
      .finally(() => this.loadingDetail = false);
  }

  updateFacilityItemMain(event: any) {
    if (!this.selectedFacilityItemId) {
      alert('Please choose the item to update!');
      return;
    }
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Update this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Update',
        severity: 'success',
      },
      accept: () => {
        this.loadingMain = true;
        const formValue = this.updateFacilityItemFormMain.value;
        console.log('Count Value:', formValue.Count);
        if (formValue.Count < this.count) {
          alert('Amount can not smaller than count!');
          return;
        }
        this.facilityItemService.updateItem(this.selectedFacilityItemId!, this.updateFacilityItemFormMain.value)
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadFacilityItem();
              this.hideDialogUpdateMain();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => {
            console.error('❌ Lỗi cập nhật thông tin item:', error);
          })
          .finally(() => {
            this.loadingMain = false;
          });
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogUpdateMain() {
    this.updateFacilityItemForm.reset();
    this.imageUrl = null;
    this.count = 0;
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear();
      }
    }, 100);
    this.updateMain = false;
  }

  showDialogUpdate(id: number) {
    this.update = true;
    this.selectedFacilityItemId = id;
    this.updateFacilityItemForm.reset();
    this.loadingDetail = true;
    this.facilityItemService.getItemById(id)
      .then(item => {
        const Item = item.data;
        if (Item) {
          this.updateFacilityItemForm.patchValue({
            Name: Item.Item.Name,
            Count: Item.Item.Count,
            Image: null,
          });
          this.imageUrl = Item.Item.ImageUrl;
          this.selectedFacilityItemId = Item.Item.Id;
        }
        // Lấy thông tin Major đã được gán cho item
        this.facilityItemService.getItemMajors(id)
          .then(response => {
            if (response && response.data.FacilityItemAssignments) {
              this.itemMajors = response.data.FacilityItemAssignments;
            } else {
              console.warn('⚠ Không tìm thấy danh sách Major nào.');
              this.itemMajors = [];
            }
          })
          .catch(error => console.error('Lỗi khi lấy major của item:', error));
      })
      .catch(error => console.error('Lỗi khi lấy thông tin item:', error))
      .finally(() => this.loadingDetail = false);
  }

  updateFacilityItem() {
    if (!this.selectedFacilityItemId) {
      alert('Please choose the item to update!');
      return;
    }

    const formValue = this.updateFacilityItemForm.value;
    const action = formValue.Action; // Lấy action từ form

    // Kiểm tra nếu action là "add" hoặc "remove" thì amount phải có giá trị
    if (action === 'add' || action === 'remove') {
      if (formValue.Amount == null || formValue.Amount <= 0) {
        alert('Please input the amount valid > 0!');
        return;
      }
      // Nếu action là remove, kiểm tra Amount không vượt quá Count
      if (action === 'remove' && formValue.Amount > formValue.Count) {
        alert('Amount can not larger than count!');
        return;
      }
    }
    // Nếu action là 'add'
    if (action === 'add') {
      const payload = formValue.Amount;
      this.loading = true;
      this.facilityItemService.increaseItemCount(this.selectedFacilityItemId, payload)
        .then(response => {
          if (response.success) {
            successAlert(response.message.content);
            this.loadFacilityItem();
            this.hideDialogUpdate();
          }
          else {
            errorAlert(response.message.content);
          }
        })
        .catch(error => {
          console.error('❌ Lỗi khi tăng số lượng:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
    // Nếu action là 'remove'
    else if (action === 'remove') {
      const payload = formValue.Amount;
      this.loading = true;
      this.facilityItemService.decreaseItemCount(this.selectedFacilityItemId, payload)
        .then(response => {
          if (response.success) {
            successAlert(response.message.content);
            this.loadFacilityItem();
            this.hideDialogUpdate();
          }
          else {
            errorAlert(response.message.content);
          }
        })
        .catch(error => {
          console.error('❌ Lỗi khi giảm số lượng:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
    else {
      console.error('❌ Hành động không hợp lệ:', action);
    }
  }

  hideDialogUpdate() {
    this.updateFacilityItemForm.reset();
    this.imageUrl = null;
    this.amount = 0;
    setTimeout(() => {
      if (this.fileUpload) {
        this.fileUpload.clear();
      }
    }, 100);
    this.update = false;
  }

  onFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.addFacilityItemForm.patchValue({ Image: e.target.result });
        this.updateFacilityItemFormMain.patchValue({ Image: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  }

  // Mở dialog hiển thị bảng FacilityMajor với số lượng tối đa (count)
  showDialogFacilityMajorTable(id: number, count: number, inUseCount: number) {
    this.selectedFacilityItemId = id;
    this.count = count;
    this.amount = 0;
    this.remainingAmount = count - inUseCount;
    this.selectedFacilityMajors = [];
    this.facilityMajorTable = true;
  }

  // Khi người dùng nhập số lượng
  onAmountInput() {
    if (this.amount == null) {
      this.amount = 0;
    }
    if (this.amount > this.count) {
      this.amount = this.count;
    }
    this.selectedFacilityMajors = [];
    this.remainingAmount = this.count;
  }

  // Cập nhật số lượng còn lại
  updateRemainingAmount() {
    let totalUsed = 0;
    this.selectedFacilityMajors.forEach(() => {
      totalUsed += this.amount;
    });
    this.remainingAmount = this.count - totalUsed;
  }

  // Khi chọn FacilityMajor
  onFacilityMajorSelect(event: any) {
    if (this.amount <= this.remainingAmount) {
      this.remainingAmount -= this.amount;
    } else {
      const index = this.selectedFacilityMajors.indexOf(event);
      if (index !== -1) {
        this.selectedFacilityMajors.splice(index, 1);
      }
    }
  }

  // Khi bỏ chọn FacilityMajor
  onFacilityMajorUnselect(event: any) {
    this.remainingAmount += this.amount;
  }

  hideDialogFacilityMajorTable() {
    this.facilityMajorTable = false;
    this.selectedFacilityItemId = null;
    this.selectedFacilityMajors = [];
    this.count = 0;
  }

  updateFacilityMajorSelect(event: any) {
    if (!this.selectedFacilityItemId) {
      console.warn('❌ No Item selected.');
      return;
    }
    if (this.selectedFacilityMajors.length === 0) {
      console.warn('❌ No FacilityMajor selected.');
      return;
    }
    if (!this.amount || this.amount <= 0) {
      console.warn('❌ Invalid Count.');
      return;
    }
    const majorIds = this.selectedFacilityMajors.map(fm => fm.Major.Id);
    console.log('📤 Sending Data:', {
      itemId: this.selectedFacilityItemId,
      count: this.amount,
      majorIds: majorIds
    });
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Update this record?',
      header: 'Danger Zone',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Update',
        severity: 'success',
      },
      accept: () => {
        this.facilityItemService.assignItemToMajors(this.selectedFacilityItemId!, this.amount, majorIds)
          .then(response => {
            if (response.success) {
              successAlert(response.message.content);
              this.loadFacilityItem();
              this.hideDialogFacilityMajorTable();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => {
            console.error('❌ Assignment Failed:', error);
          });
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record update' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });

  }
}
