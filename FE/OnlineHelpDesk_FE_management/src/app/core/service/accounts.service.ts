import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { AuthState } from '../../store/auth/state';
import { clearAuthToken, setAuthToken } from '../../store/auth/actions';
import { selectAuthState } from '../../store/auth/selectors';
import { LocalStorageUtil } from '../../core/utils/storage.util';
import { JwtUtil } from '../../core/utils/jwt.util';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  previousToken: string | null = null
  constructor(
    private router: Router, 
    private store: Store<AuthState>,
    private http: HttpClient,
  ) {
    //this.syncAuthWithLocalStorage();
  }
  
  // sử dụng event storage 
  syncAuthWithLocalStorage() {
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter((event: StorageEvent) => event.key === 'auth'),
        map(() => {
          const token = LocalStorageUtil.getAuthTokenFromLocalStorage();
          const user = LocalStorageUtil.getAuthUserFromLocalStorage();

          const auth = JSON.parse(localStorage.getItem('auth') || '{}');
          console.log('auth', auth);
          if (!token || !user || !JwtUtil.isTokenValid(token)) {
            this.store.dispatch(clearAuthToken());
            console.log('clearAuthToken SYNC');
            this.router.navigate(['/login']);
          }else {
            const saveInfo = {
              token: token,
              user: user
            };
            this.store.dispatch(setAuthToken(saveInfo));
          }
        }
        )
      )
      .subscribe();
  }

  checkLogin_MainPage() {
    var token : string | null = null;
    var user : any | null = null;
    this.store.select(selectAuthState).subscribe((auth) => {
      token = auth.token;
      user = auth.user;
    });

    if (!token || !user || !JwtUtil.isTokenValid(token)) {
      this.store.dispatch(clearAuthToken());
      console.log('clearAuthToken MAIN PAGE');
      this.router.navigate(['/login']);
    } else {
      const saveInfo = {
        token: token,
        user: user
      };
      this.store.dispatch(setAuthToken(saveInfo));
    }
  }

  checkLogin_LogInPage() {  // cái này chưa dùng

    const token = LocalStorageUtil.getAuthTokenFromLocalStorage();
    const user = LocalStorageUtil.getAuthUserFromLocalStorage();

    if (!token || !user || !JwtUtil.isTokenValid(token)) {
      this.store.dispatch(clearAuthToken());
      console.log('clearAuthToken LOGIN PAGE 1');
      this.router.navigate(['/login']);
    } else {
      const saveInfo = {
        token: token,
        user: user
      };
      this.store.dispatch(setAuthToken(saveInfo));
    }
  }


  logout() {
    this.store.dispatch(clearAuthToken());
    this.router.navigate(['/login']);
  }

  save_login(token: string, user: any) {
    this.store.dispatch(setAuthToken({ token, user }));
  }

  login(username: string, password: string) : Observable<any> {
    const loginInfo = {
      username: username,
      password: password
    };
    console.log("loginInfo",loginInfo);
    
    const formData = new FormData();
    formData.append('loginInfo', JSON.stringify(loginInfo));
    return this.http.post('http://localhost:5137/api/Account/login-manual', formData);
  }
}
