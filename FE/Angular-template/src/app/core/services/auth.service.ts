import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // [GET] /User/accounts/staff
  getStaffs(): Promise<any> {
    const mockResponse = {
      Accounts: [
        {
          Account: {
            Id: 1,
            FullName: 'Nguyễn Văn A',
            Email: 'nguyenvana@example.com',
            DateOfBirth: '1990-01-01',
            Phone: '0123456789',
            Address: '123 Đường ABC, Quận 1, TP.HCM',
            RoleId: 0,
            JobTypeId: 1,
            ImageUrl: 'https://example.com/avatar1.jpg',
            IsDeactivated: false,
            CreatedAt: '2024-03-22T08:00:00Z'
          },
          Role: {
            Id: 0,
            Name: 'Admin'
          },
          JobType: {
            Id: 1,
            Name: 'Developer'
          }
        },
        {
          Account: {
            Id: 2,
            FullName: 'Trần Thị B',
            Email: 'tranthib@example.com',
            DateOfBirth: '1995-05-15',
            Phone: '0987654321',
            Address: '456 Đường XYZ, Quận 2, TP.HCM',
            RoleId: 1,
            JobTypeId: 2,
            ImageUrl: 'https://example.com/avatar2.jpg',
            IsDeactivated: true,
            CreatedAt: '2023-12-10T10:30:00Z'
          },
          Role: {
            Id: 1,
            Name: 'User'
          },
          JobType: {
            Id: 2,
            Name: 'Designer'
          }
        }
      ]
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [POST] User/accounts/staff
  addStaff(staffData: any): Promise<any> {
    const Request = {
      Staff: staffData
    };
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = { message: "Success." }; // Giả lập response chỉ có message
        resolve(mockResponse); // Trả về dữ liệu
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /User/accounts/staff/{accountId}
  getStaffById(accountId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Giả lập một nhân viên cụ thể
        const mockResponse = {
          Account: {
            Id: accountId,
            FullName: 'Nguyễn Văn A',
            Email: 'nguyenvana@example.com',
            DateOfBirth: '1990-01-15',
            Phone: '0123456789',
            Address: 'Hà Nội, Việt Nam',
            RoleId: 1,
            JobTypeId: 2,
            ImageUrl: 'https://example.com/avatar1.jpg',
            IsDeactivated: false,
            CreatedAt: '2024-03-10T08:00:00Z'
          },
          Role: {
            Id: 1,
            Name: 'Admin'
          },
          JobType: {
            Id: 2,
            Name: 'Developer'
          }
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /User/accounts/staff/{accountId}
  updateStaff(accountId: number, updatedData: any): Promise<any> {
    console.log('request: ' + accountId);
    const Request = {
      Staff: updatedData
    }
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Giả lập dữ liệu sau khi cập nhật thành công
        const updatedStaff = {
          message: "Success.",
        };
        resolve(updatedStaff);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /User/accounts/member
  getMembers(): Promise<any> {
    const mockResponse = {
      Accounts: [
        {
          Account: {
            Id: 1,
            FullName: 'Nguyễn Văn A',
            Email: 'nguyenvana@example.com',
            DateOfBirth: '1990-01-01',
            Phone: '0123456789',
            Address: '123 Đường ABC, Quận 1, TP.HCM',
            RoleId: 0,
            JobTypeId: 1,
            ImageUrl: 'https://example.com/avatar1.jpg',
            IsDeactivated: false,
            CreatedAt: '2024-03-22T08:00:00Z'
          },
          Role: {
            Id: 0,
            Name: 'Admin'
          },
          JobType: {
            Id: 1,
            Name: 'Developer'
          }
        },
        {
          Account: {
            Id: 2,
            FullName: 'Trần Thị B',
            Email: 'tranthib@example.com',
            DateOfBirth: '1995-05-15',
            Phone: '0987654321',
            Address: '456 Đường XYZ, Quận 2, TP.HCM',
            RoleId: 1,
            JobTypeId: 2,
            ImageUrl: 'https://example.com/avatar2.jpg',
            IsDeactivated: true,
            CreatedAt: '2023-12-10T10:30:00Z'
          },
          Role: {
            Id: 1,
            Name: 'User'
          },
          JobType: {
            Id: 2,
            Name: 'Designer'
          }
        }
      ]
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [POST] User/accounts/member
  addMember(memberData: any): Promise<any> {
    const Request = {
      Member: memberData
    }
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = {
          message: "Success.",
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /User/accounts/member/{accountId}
  getMemnerById(accountId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Giả lập một nhân viên cụ thể
        const mockResponse = {
          Account: {
            Id: accountId,
            FullName: 'Nguyễn Văn A',
            Email: 'nguyenvana@example.com',
            DateOfBirth: '1990-01-15',
            Phone: '0123456789',
            Address: 'Hà Nội, Việt Nam',
            RoleId: 1,
            JobTypeId: 2,
            ImageUrl: 'https://example.com/avatar1.jpg',
            IsDeactivated: false,
            CreatedAt: '2024-03-10T08:00:00Z'
          },
          Role: {
            Id: 1,
            Name: 'Admin'
          },
          JobType: {
            Id: 2,
            Name: 'Developer'
          }
        };

        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /User/accounts/member/{accountId}
  updateMember(accountId: number, updatedData: any): Promise<any> {
    const Request = {
      Member: updatedData
    }
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!accountId || !updatedData) {
          reject({ error: 'Invalid data' });
          return;
        }
        // Giả lập dữ liệu sau khi cập nhật thành công
        const updatedMember = {
          message: "Success.",
        };

        resolve(updatedMember);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /User/accounts/roles
  getRoles(): Promise<any> {
    const mockResponse = {
      Roles: [
        { Id: 0, Name: 'Admin' },
        { Id: 1, Name: 'User' },
        { Id: 2, Name: 'Guest' }
      ]
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /User/accounts/jobTypes
  getJobTypes(): Promise<any> {
    const mockResponse = {
      JobTypes: [
        { Id: 0, Name: 'Developer' },
        { Id: 1, Name: 'Designer' },
        { Id: 2, Name: 'Project Manager' }
      ]
    };
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), 1000); // Giả lập độ trễ API 1 giây
    });
  }
}
