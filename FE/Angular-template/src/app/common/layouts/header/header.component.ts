import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAccount } from '../../../store/accounts/account.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
  username: string = 'Người dùng';
  email: string = '';
  private userSubscription!: Subscription; // Đăng ký Observable

  constructor(
    private router: Router,
    private store: Store,
  ) { }

  ngOnInit() {
    // 🔥 Quan trọng: Khởi tạo userSubscription trước khi add
    this.userSubscription = this.store.select(selectAccount).subscribe(user => {
      this.username = user?.name || 'Người dùng';
    });
  }


  // ✅ Xử lý đăng xuất
  logout() {
    localStorage.removeItem('token'); // Xóa token khi đăng xuất
    this.router.navigate(['/logon']); // Chuyển hướng về trang đăng nhập
  }

  // ✅ Hủy đăng ký Observable khi component bị hủy
  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
