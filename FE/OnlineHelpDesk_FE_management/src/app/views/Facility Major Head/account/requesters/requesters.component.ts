import { Component, OnInit } from '@angular/core';
import { FacilityMajorService } from '../../../../core/service/facility-major.service';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';

@Component({
  selector: 'app-requesters',
  imports: [
    TableModule,
    TagModule,
    ButtonModule,
    ProgressSpinnerModule,
    InputIconModule,
    IconFieldModule
  ],
  templateUrl: './requesters.component.html',
  styleUrl: './requesters.component.scss'
})
export class RequestersComponent implements OnInit {

  requesters: any[] = [];
  loading: boolean = false

  userId: number;

  constructor(
    private facilityMajorService: FacilityMajorService
  ) { }

  ngOnInit() {// Lấy thông tin từ localStorage
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
    this.loadRequesters();
  }

  onGlobalFilter(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement.value, 'contains');
  }

  loadRequesters() {

    this.facilityMajorService.getAllRequester(this.userId)
      .then(requesters => {
        this.requesters = requesters.data.Accounts;
      })
      .catch(error => console.error(error))
      .finally(() => (this.loading = false));  // Đặt loading false khi cả 2 API hoàn thành;
  }

}
