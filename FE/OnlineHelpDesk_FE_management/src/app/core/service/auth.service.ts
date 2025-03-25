import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private accounts: any[] = [
    {
      Account: {
        Id: 1,
        FullName: 'John Doe',
        Email: 'john.doe@example.com',
        DateOfBirth: '1990-06-15',
        Phone: '123456789',
        Address: '123 Main St, New York, NY',
        RoleId: 2,
        JobTypeId: 1,
        ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ&s',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
      Role: {
        Id: 2,
        Name: 'Admin',
      },
      JobType: {
        Id: 1,
        Name: 'Software Engineer',
      },
    },
    {
      Account: {
        Id: 2,
        FullName: 'Jane Smith',
        Email: 'jane.smith@example.com',
        DateOfBirth: '1995-08-22',
        Phone: '987654321',
        Address: '456 Elm St, Los Angeles, CA',
        RoleId: 3,
        JobTypeId: 2,
        ImageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK4qEfbnd-RN82wdL2awn_PMviy_pelocqQ&s',
        IsDeactivated: true,
        CreatedAt: new Date().toISOString(),
      },
      Role: {
        Id: 3,
        Name: 'User',
      },
      JobType: {
        Id: 2,
        Name: 'Mechanical Engineer',
      },
    },
  ];

  // ✅ Lấy danh sách tất cả accounts staff
  getAccountStaff(): Promise<any[]> {
    return Promise.resolve(this.accounts);
  }
  
  // ✅ Lấy danh sách tất cả accounts member
  getAccountMember(): Promise<any[]> {
    return Promise.resolve(this.accounts);
  }

  // ✅ Tìm account theo ID
  findById(id: number): Promise<any | null> {
    const account = this.accounts.find(acc => acc.Account.Id === id);
    return Promise.resolve(account || null);
  }

  // ✅ Lọc account theo RoleId
  getAccountsByRole(roleId: number): Promise<any[]> {
    const filteredAccounts = this.accounts.filter(acc => acc.Account.RoleId === roleId);
    return Promise.resolve(filteredAccounts);
  }

  // ✅ Lọc account theo JobTypeId
  getAccountsByJobType(jobTypeId: number): Promise<any[]> {
    const filteredAccounts = this.accounts.filter(acc => acc.Account.JobTypeId === jobTypeId);
    return Promise.resolve(filteredAccounts);
  }
}
