import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MajorAssignmentService {
  // [GET] /Major/assignments/major-head/{accountId}/staffs
  getMajorsForHead(accountId: number): Promise<any> {
    console.log('accountId: ' + accountId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Majors: [
            {
              Major: {
                Id: 1,
                Name: 'Phát triển phần mềm',
                MainDescription: 'Mô tả chính của major này.',
                WorkShiftsDescription: 'Mô tả ca làm việc.',
                FacilityMajorTypeId: 2,
                FacilityId: 101,
                IsOpen: true,
                CloseScheduleDate: '2024-12-31',
                OpenScheduleDate: '2024-01-01',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/background.jpg',
                ImageUrl: 'https://example.com/major-image.jpg'
              },
              Accounts: [
                {
                  Account: {
                    Id: 301,
                    FullName: 'Nguyễn Văn A',
                    Email: 'nguyenvana@example.com',
                    DateOfBirth: '1990-10-15',
                    Phone: '0987654321',
                    Address: 'Hà Nội, Việt Nam',
                    RoleId: 3,
                    JobTypeId: 1,
                    ImageUrl: 'https://example.com/avatar-a.jpg',
                    IsDeactivated: false,
                    CreatedAt: '2023-05-10T10:00:00Z'
                  },
                  Role: {
                    Id: 3,
                    Name: 'Nhân viên'
                  },
                  JobType: {
                    Id: 1,
                    Name: 'Lập trình viên'
                  },
                  MajorAssignment: {
                    AccountId: 301,
                    FacilityMajorId: 1,
                    IsHead: false, // Đây là assignee, không phải head
                    WorkDescription: 'Làm việc với đội ngũ phát triển phần mềm.'
                  }
                },
                {
                  Account: {
                    Id: 302,
                    FullName: 'Phạm Thị B',
                    Email: 'phamthib@example.com',
                    DateOfBirth: '1995-08-22',
                    Phone: '0976543210',
                    Address: 'TP Hồ Chí Minh, Việt Nam',
                    RoleId: 3,
                    JobTypeId: 2,
                    ImageUrl: 'https://example.com/avatar-b.jpg',
                    IsDeactivated: false,
                    CreatedAt: '2023-06-20T11:30:00Z'
                  },
                  Role: {
                    Id: 3,
                    Name: 'Nhân viên'
                  },
                  JobType: {
                    Id: 2,
                    Name: 'Tester'
                  },
                  MajorAssignment: {
                    AccountId: 302,
                    FacilityMajorId: 1,
                    IsHead: false, // Đây là assignee, không phải head
                    WorkDescription: 'Kiểm tra chất lượng phần mềm.'
                  }
                }
              ]
            },
            {
              Major: {
                Id: 2,
                Name: 'Quản lý hệ thống',
                MainDescription: 'Mô tả chính của major này.',
                WorkShiftsDescription: 'Mô tả ca làm việc.',
                FacilityMajorTypeId: 1,
                FacilityId: 102,
                IsOpen: true,
                CloseScheduleDate: '2024-11-30',
                OpenScheduleDate: '2024-01-01',
                IsDeactivated: false,
                CreatedAt: '2023-02-15T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/background2.jpg',
                ImageUrl: 'https://example.com/major-image2.jpg'
              },
              Accounts: [
                {
                  Account: {
                    Id: 303,
                    FullName: 'Lê Minh C',
                    Email: 'leminhc@example.com',
                    DateOfBirth: '1992-06-10',
                    Phone: '0912345678',
                    Address: 'Đà Nẵng, Việt Nam',
                    RoleId: 3,
                    JobTypeId: 1,
                    ImageUrl: 'https://example.com/avatar-c.jpg',
                    IsDeactivated: false,
                    CreatedAt: '2023-07-01T12:00:00Z'
                  },
                  Role: {
                    Id: 3,
                    Name: 'Nhân viên'
                  },
                  JobType: {
                    Id: 1,
                    Name: 'Lập trình viên'
                  },
                  MajorAssignment: {
                    AccountId: 303,
                    FacilityMajorId: 2,
                    IsHead: false, // Đây là assignee, không phải head
                    WorkDescription: 'Quản lý hệ thống và triển khai dự án.'
                  }
                }
              ]
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/assignments/major/{majorId}/staffs
  getAssigneesByMajor(majorId: number): Promise<any> {
    console.log('majorId: ' + majorId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Accounts: [
            {
              Account: {
                Id: 301,
                FullName: 'Nguyễn Văn A',
                Email: 'nguyenvana@example.com',
                DateOfBirth: '1990-10-15',
                Phone: '0987654321',
                Address: 'Hà Nội, Việt Nam',
                RoleId: 3,
                JobTypeId: 1,
                ImageUrl: 'https://example.com/avatar-a.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-05-10T10:00:00Z'
              },
              Role: {
                Id: 3,
                Name: 'Nhân viên'
              },
              JobType: {
                Id: 1,
                Name: 'Lập trình viên'
              },
              MajorAssignment: {
                AccountId: 301,
                FacilityMajorId: majorId,  // MajorId passed in as a parameter
                IsHead: false,  // Assignee, not a head
                WorkDescription: 'Làm việc với đội ngũ phát triển phần mềm.'
              }
            },
            {
              Account: {
                Id: 302,
                FullName: 'Phạm Thị B',
                Email: 'phamthib@example.com',
                DateOfBirth: '1995-08-22',
                Phone: '0976543210',
                Address: 'TP Hồ Chí Minh, Việt Nam',
                RoleId: 3,
                JobTypeId: 2,
                ImageUrl: 'https://example.com/avatar-b.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-06-20T11:30:00Z'
              },
              Role: {
                Id: 3,
                Name: 'Nhân viên'
              },
              JobType: {
                Id: 2,
                Name: 'Tester'
              },
              MajorAssignment: {
                AccountId: 302,
                FacilityMajorId: majorId,  // MajorId passed in as a parameter
                IsHead: false,  // Assignee, not a head
                WorkDescription: 'Kiểm tra chất lượng phần mềm.'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }
  
  // [POST] /Major/assignments/staff/{accountId}
  addStaffMajors(accountId: number, majorIds: number[]): Promise<any> {
    const Request = {
      Major: majorIds
    };
    console.log('accountId: ' + accountId);
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ message: 'Cập nhật thành công' });
      }, 1000); // Giả lập API delay 1 giây
    });
  }

  // [GET] /Major/assignments/staff/{accountId}
  getMajorAssignmentsByStaff(accountId: number): Promise<any> {
    console.log('accountId: ' + accountId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          MajorAssignments: [
            {
              MajorAssignment: {
                AccountId: accountId,
                FacilityMajorId: 101,
                IsHead: false,
                WorkDescription: 'Hỗ trợ kiểm thử phần mềm'
              },
              Major: {
                Id: 101,
                Name: 'Công nghệ thông tin',
                MainDescription: 'Phát triển phần mềm và hệ thống',
                WorkShiftsDescription: 'Ca sáng, ca chiều',
                FacilityMajorTypeId: 2,
                FacilityId: 5,
                IsOpen: true,
                CloseScheduleDate: '2025-12-31',
                OpenScheduleDate: '2023-01-01',
                IsDeactivated: false,
                CreatedAt: '2023-06-10T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-it.jpg',
                ImageUrl: 'https://example.com/logo-it.jpg'
              }
            },
            {
              MajorAssignment: {
                AccountId: accountId,
                FacilityMajorId: 102,
                IsHead: false,
                WorkDescription: 'Hỗ trợ phát triển giao diện'
              },
              Major: {
                Id: 102,
                Name: 'Thiết kế giao diện',
                MainDescription: 'Thiết kế UI/UX cho ứng dụng web',
                WorkShiftsDescription: 'Ca chiều, ca tối',
                FacilityMajorTypeId: 3,
                FacilityId: 6,
                IsOpen: true,
                CloseScheduleDate: '2026-12-31',
                OpenScheduleDate: '2023-02-01',
                IsDeactivated: false,
                CreatedAt: '2023-07-20T12:30:00Z',
                BackgroundImageUrl: 'https://example.com/bg-design.jpg',
                ImageUrl: 'https://example.com/logo-design.jpg'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /Major/assignments/staff/{accountId}/majors/{majorId}
  updateWorkDescription(accountId: number, majorId: number, workDescription: any): Promise<any> {
    console.log('accountId: ' + accountId);
    console.log('majorId: ' + majorId);
    console.log('request: ' + JSON.stringify(workDescription));
    return new Promise((resolve, reject) => {
      setTimeout(() => {resolve({ message: 'Cập nhật thành công!' });
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

}
