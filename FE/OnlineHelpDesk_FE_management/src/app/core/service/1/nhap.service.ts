import { Inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { API_URL } from '../main.token';


@Injectable({
  providedIn: 'root',
})
export class NhapService {
  //private apiUrl = 'http://localhost:5137/api'; // URL API

  constructor(
    private http: HttpClient,
    @Inject(API_URL) private apiUrl: string
  ) {}

  // Phương thức GET
  getData_Observable(): Observable<any> {
   
    const data = this.http.get(this.apiUrl+'/NhapController_1');
    
    console.log("DATA ĐÂY: "+data);
    return this.http.get(this.apiUrl+'/NhapController_1');
  }

  async getData_Normal() : Promise<any> {
    try {
      const data = await firstValueFrom(this.http.get('http://localhost:5137/api/NhapController_1'));

      console.log(data);
      return data;
    } catch (error) {
      console.error('Có lỗi khi gọi API', error);
    }
  }
  
  getUserName(name: string)  {
    return name;
  }
  
}
