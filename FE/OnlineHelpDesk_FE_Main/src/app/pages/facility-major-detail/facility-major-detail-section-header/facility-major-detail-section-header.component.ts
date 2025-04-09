import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FacilityMajorService } from '../../../core/service/facility-major.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { TextareaModule } from 'primeng/textarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { errorAlert, successAlert } from '../../../core/utils/alert.util';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-facility-major-detail-section-header',
  standalone: true,
  imports: [
    FormsModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ProgressSpinnerModule,
    ToastModule,
    ConfirmDialogModule,
    SelectModule,
  ],
  templateUrl: './facility-major-detail-section-header.component.html',
  styleUrl: './facility-major-detail-section-header.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class FacilityMajorDetailSectionHeaderComponent {
  @Input()
  name: string = '';
  @Input()
  logo: string = '';
  @Input()
  image: string = '';

  majorId: number;
  userId: number;
  userName: string = '';
  addReport: boolean = false;
  addReportForm!: FormGroup;
  reportTypes: any;
  loadingAdd: boolean = false;
  constructor(
    private fb: FormBuilder,
    private facilityMajorService: FacilityMajorService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) {
    // Tạo form với các trường cần thiết
    this.addReportForm = this.fb.group({
      ReportTypeId: [null, Validators.required],
      Content: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  ngOnInit() {
    // Lấy thông tin từ localStorage
    const authDataString = localStorage.getItem('auth');
    this.majorId = Number(this.route.snapshot.paramMap.get('id'));
    // Kiểm tra nếu có dữ liệu và sau đó chuyển sang JSON
    if (authDataString) {
      const authData = JSON.parse(authDataString);
      console.log(authData); // Kiểm tra dữ liệu auth

      // Kiểm tra nếu có dữ liệu 'user' và lấy 'id' từ 'user'
      if (authData.user && authData.user.id) {
        this.userId = authData.user.id;
        this.userName = authData.user.name;

        console.log('User ID:', this.userId); // In ra userId
      }
    }

    this.loadReportTypes();
  }

  loadReportTypes() {
    this.loadingAdd = true;
    this.facilityMajorService.getReportTypes().then(reportTypesData => {
      this.reportTypes = reportTypesData.data.ReportTypes;
    })
      .catch(error => console.error('Lỗi khi load dữ liệu:', error))
      .finally(() => (this.loadingAdd = false));
  }

  showDialogReport() {
    this.addReport = true;
  }

  submitReport() {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to Add this record?',
      header: 'Confirm to submit',
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
        if (this.addReportForm.invalid) return;
        this.loadingAdd = true;
        const body = {
          Report: {
            ReportTypeId: this.addReportForm.value.ReportTypeId,
            Content: this.addReportForm.value.Content,
          }
        };
        this.facilityMajorService.createReport(this.majorId, this.userId, body)
          .then((response) => {
            if (response.success) {
              successAlert(response.message.content);
              this.hideDialogReport();
            } else {
              errorAlert(response.message.content);
            }
          })
          .catch(error => console.error('Lỗi khi load dữ liệu:', error))
          .finally(() => (this.loadingAdd = false));
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record add' });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      },
    });
  }

  hideDialogReport() {
    this.addReport = false;
    this.addReportForm.reset();
  }


}
