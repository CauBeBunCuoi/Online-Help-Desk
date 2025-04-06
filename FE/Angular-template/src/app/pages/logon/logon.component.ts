import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/accounts/account.actions';
import { selectError } from '../../store/accounts/account.selectors';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-logon',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterLink,
    ToastModule,
    MessageModule
  ],
  providers: [MessageService],
  templateUrl: './logon.component.html',
  styleUrl: './logon.component.scss'
})
export class LogonComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store, // ✅ Dùng Store thay vì AuthService
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // Lắng nghe lỗi từ Store
    this.store.select(selectError).subscribe(error => {
      if (error) {
        this.messageService.add({ severity: 'error', summary: 'Lỗi', detail: error });
      }
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      console.log(this.loginForm.value);
      return;
    }
    console.log("📤 Gửi request login:", this.loginForm.value);
    this.router.navigate['/'];
    // this.store.dispatch(login(this.loginForm.value));
  }

}
