import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accounts: any[] = [
    {
      id: 1,
      logo: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      email: 'john.doe@example.com',
      password: 'hashedpassword123', // Chỉ giả lập, thực tế cần mã hóa
      fullName: 'John Doe',
      roleId: 2,
      jobTypeId: 1,
      dateOfBirth: new Date(1990, 5, 20),
      address: '123 Main St, New York, NY',
      phone: '1234567890',
      isDeactivated: false,
      createdAt: new Date()
    },
    {
      id: 2,
      logo: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      email: 'jane.smith@example.com',
      password: 'hashedpassword456',
      fullName: 'Jane Smith',
      roleId: 3,
      jobTypeId: 2,
      dateOfBirth: new Date(1995, 8, 15),
      address: '456 Elm St, Los Angeles, CA',
      phone: '0987654321',
      isDeactivated: true,
      createdAt: new Date()
    }
  ];

  // ✅ Trả về danh sách tài khoản dưới dạng Promise
  getAccounts(): Promise<any[]> {
    return Promise.resolve(this.accounts);
  }

  findById(id: number): Promise<any | null> {
    const account = this.accounts.find(acc => acc.id === id);
    return Promise.resolve(account || null);
  }
  
}
