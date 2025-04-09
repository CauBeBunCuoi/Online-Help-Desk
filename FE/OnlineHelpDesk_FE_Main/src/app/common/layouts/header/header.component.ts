import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { AccountService } from '../../../core/service/accounts.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    SelectModule,
    RouterLink,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  userId: number;
  userName: number;
  avatar: string;

  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {
  }

  ngOnDestroy() {
  }

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
        this.userName = authData.user.name;
        this.avatar = authData.user.image;
      }
    }
  }

  public logout() {
    this.accountService.logout();
  }
}
