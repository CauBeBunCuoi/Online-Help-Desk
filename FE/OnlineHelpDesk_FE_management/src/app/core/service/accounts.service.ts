import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, interval, Observable } from 'rxjs';
import { map, filter, startWith } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { callApi } from '../../api/main/api_call/api';
import { publicApi } from '../../api/instance/axiosInstance';
import { AuthState } from '../../store/auth/state';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  previousToken: string | null = null
  constructor(
    private router: Router,
    private store: Store<AuthState>,
    private http: HttpClient,
  ) {
    //this.syncAuthWithLocalStorage();
  }

  async login(email: string, password: string): Promise<any> {
    const loginInfo = {
      email: email,
      password: password
    };
    console.log("loginInfo", loginInfo);
    const res = await callApi({
      instance: publicApi,
      method: 'post',
      url: 'http://localhost:5137/api/Account/login-manual',
      data: loginInfo
    })

    return res
  }

  async register(registerInfo: {
    name: string,
    email: string,
    password: string,
    phone: string
  }): Promise<any> {

    console.log("registerInfo", registerInfo);
    const res = await callApi({
      instance: publicApi,
      method: 'post',
      url: '/Account/register',
      data: registerInfo
    })

    return res
  }
}
