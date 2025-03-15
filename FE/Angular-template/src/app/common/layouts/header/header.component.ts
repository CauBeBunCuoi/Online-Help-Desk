import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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

  user: boolean;

  userOptions = [
    { label: 'Profile', icon: 'pi pi-user', value: 'profile' },
    { label: 'Logout', icon: 'pi pi-sign-out', value: 'logout' }
  ];

  selectedOption: any = null;

  constructor(
  ) { }

  ngOnInit() {
    this.user = true;
  }

  // ✅ Hủy đăng ký Observable khi component bị hủy
  ngOnDestroy() {
  }
}
