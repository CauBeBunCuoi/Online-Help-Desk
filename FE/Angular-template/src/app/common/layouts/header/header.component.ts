import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';

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

  userName: string;

  constructor(private router: Router) {
  }

  ngOnDestroy() {
  }
  ngOnInit() {
    this.userName = 'Mr Bean';
  }

  logout() {
    // Xóa token hoặc session nếu cần
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
