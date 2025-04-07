import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { AccountService } from '../../../core/service/accounts.service';
import { selectAuthState } from '../../../store/auth/selectors';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../store/auth/state';
import { Subscription } from 'rxjs';

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
  userId: number | null = null;
  userName: string = '';
  avatar: string = '';
  private sub: Subscription;

  constructor(
    private store: Store<AuthState>,
    private router: Router
  ) {}

  ngOnInit() {
    this.sub = this.store.select(selectAuthState).subscribe(auth => {
      if (auth?.user) {
        this.userId = auth.user.id;
        this.userName = auth.user.name;
        this.avatar = auth.user.image;
      } else {
        this.userId = null;
        this.userName = '';
        this.avatar = '';
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public logout() {
    this.store.dispatch({ type: '[Auth] Clear Auth Token' });
    this.router.navigate(['/login']);
  }
}
