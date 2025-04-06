import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacilityMajorService {

  // [GET] /Major/majors
  getAllMajors(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = {
          Majors: [
            {
              Major: {
                Id: 1,
                Name: 'Computer Science',
                MainDescription: 'Lập trình & Khoa học máy tính',
                WorkShiftsDescription: 'Full-time, Remote',
                FacilityMajorTypeId: 101,
                FacilityId: 201,
                IsOpen: true,
                CloseScheduleDate: '2025-06-01T00:00:00Z',
                OpenScheduleDate: '2025-01-15T00:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2024-03-10T12:00:00Z',
                BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/TwbATRACNCwWa6ZkuI8k.jpg',
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg'
              },
              MajorType: {
                Id: 101,
                Name: 'IT & Software'
              },
              Facility: {
                Id: 1,
                Name: 'Tech University',
                Description: 'Trường Đại học Công nghệ',
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg',
                IsDeactivated: false,
                CreatedAt: '2020-09-01T00:00:00Z'
              }
            },
            {
              Major: {
                Id: 2,
                Name: 'Computer James',
                MainDescription: 'Lập trình & Khoa học máy tính',
                WorkShiftsDescription: 'Full-time, Remote',
                FacilityMajorTypeId: 101,
                FacilityId: 201,
                IsOpen: true,
                CloseScheduleDate: '2025-06-01T00:00:00Z',
                OpenScheduleDate: '2025-01-15T00:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2024-03-10T12:00:00Z',
                BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/TwbATRACNCwWa6ZkuI8k.jpg',
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg'
              },
              MajorType: {
                Id: 101,
                Name: 'IT & Software'
              },
              Facility: {
                Id: 2,
                Name: 'Tech University',
                Description: 'Trường Đại học Công nghệ',
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg',
                IsDeactivated: false,
                CreatedAt: '2020-09-01T00:00:00Z'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [POST] /Major/majors
  addMajor(newMajor: any): Promise<any> {
    const Request = {
      Major: newMajor
    };
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          message: "Success."
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/majors/{majorId}
  getMajorDetail(majorId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Major: {
            Id: majorId,
            Name: 'Công nghệ thông tin',
            MainDescription: 'Ngành chuyên về lập trình và hệ thống thông tin.',
            WorkShiftsDescription: 'Làm việc theo ca linh hoạt.',
            FacilityMajorTypeId: 2,
            FacilityId: 5,
            IsOpen: true,
            CloseScheduleDate: null,
            OpenScheduleDate: '2024-01-15T08:00:00Z',
            IsDeactivated: false,
            CreatedAt: '2023-12-01T10:00:00Z',
            BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/TwbATRACNCwWa6ZkuI8k.jpg',
            ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg'
          },
          MajorType: {
            Id: 2,
            Name: 'Công nghệ'
          },
          Facility: {
            Id: 1,
            Name: 'Đại học Công Nghệ',
            Description: 'Cơ sở đào tạo chuyên sâu về công nghệ thông tin.',
            ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg',
            IsDeactivated: false,
            CreatedAt: '2022-06-01T09:00:00Z'
          }
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/majors/major-head/{accountId}/majors
  getMajorsByHead(accountId: number): Promise<any> {
    console.log('accountId: ' + accountId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Majors: [
            {
              Major: {
                Id: 1,
                Name: 'Công nghệ thông tin',
                MainDescription: 'Ngành chuyên về lập trình và hệ thống thông tin.',
                WorkShiftsDescription: 'Làm việc theo ca linh hoạt.',
                FacilityMajorTypeId: 2,
                FacilityId: 5,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-01-15T08:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2023-12-01T10:00:00Z',
                BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/TwbATRACNCwWa6ZkuI8k.jpg',
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg'
              },
              MajorType: {
                Id: 2,
                Name: 'Công nghệ'
              },
              Facility: {
                Id: 1,
                Name: 'Đại học Công Nghệ',
                Description: 'Cơ sở đào tạo chuyên sâu về công nghệ thông tin.',
                ImageUrl: 'https://example.com/facility.jpg',
                IsDeactivated: false,
                CreatedAt: '2022-06-01T09:00:00Z'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /Major/majors/{majorId}
  updateMajor(majorId: number, updatedMajor: any): Promise<any> {
    const Request = {
      Major: updatedMajor
    };
    console.log('majorId: ' + majorId);
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUpdatedMajor = {
          message: "Success."
        };
        resolve(mockUpdatedMajor);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/majors/feedbacks
  getAllMajorFeedbacks(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Feedbacks: [
            {
              Account: {
                Id: 101,
                Email: 'nguyenvana@example.com',
                Phone: '0909123456',
                FullName: 'Nguyễn Văn A',
                RoleId: 2,
                JobTypeId: 1,
                ImageUrl: 'https://example.com/avatar-a.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-10-12T08:00:00Z'
              },
              Major: {
                Id: 5,
                Name: 'Công nghệ thông tin',
                MainDescription: 'Ngành chuyên về lập trình và hệ thống thông tin.',
                WorkShiftsDescription: 'Làm việc theo ca linh hoạt.',
                FacilityMajorTypeId: 2,
                FacilityId: 10,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-01-15T08:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2023-12-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-it.jpg',
                ImageUrl: 'https://example.com/major-it.jpg'
              },
              MajorType: {
                Id: 2,
                Name: 'Công nghệ'
              },
              Feedback: {
                Id: 301,
                AccountId: 101,
                FacilityMajorId: 5,
                Content: 'Chương trình học rất hay, giảng viên tận tâm!',
                Rate: 5,
                IsDeactivated: false,
                CreatedAt: '2024-03-10T14:30:00Z'
              }
            },
            {
              Account: {
                Id: 102,
                Email: 'tranthib@example.com',
                Phone: '0987654321',
                FullName: 'Trần Thị B',
                RoleId: 3,
                JobTypeId: 2,
                ImageUrl: 'https://example.com/avatar-b.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-11-20T09:30:00Z'
              },
              Major: {
                Id: 8,
                Name: 'Kế toán doanh nghiệp',
                MainDescription: 'Học về tài chính, kế toán, thuế.',
                WorkShiftsDescription: 'Làm việc giờ hành chính.',
                FacilityMajorTypeId: 3,
                FacilityId: 12,
                IsOpen: false,
                CloseScheduleDate: '2024-03-01T00:00:00Z',
                OpenScheduleDate: '2023-09-01T08:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2023-06-10T08:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-accounting.jpg',
                ImageUrl: 'https://example.com/major-accounting.jpg'
              },
              MajorType: {
                Id: 3,
                Name: 'Kinh tế'
              },
              Feedback: {
                Id: 302,
                AccountId: 102,
                FacilityMajorId: 8,
                Content: 'Môn học thực tiễn nhưng cần cập nhật thêm luật thuế mới.',
                Rate: 4,
                IsDeactivated: false,
                CreatedAt: '2024-03-12T09:15:00Z'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/majors/{majorId}/feedbacks
  getMajorFeedbacks(majorId: number): Promise<any> {
    console.log('majorId: ' + majorId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Feedbacks: [
            {
              Account: {
                Id: 201,
                Email: 'lehoanganh@example.com',
                Phone: '0912345678',
                FullName: 'Lê Hoàng Anh',
                RoleId: 2,
                JobTypeId: 1,
                ImageUrl: 'https://example.com/avatar-201.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-07-15T08:30:00Z'
              },
              Major: {
                Id: 1,
                Name: 'Khoa học dữ liệu',
                MainDescription: 'Ngành học chuyên sâu về AI và Machine Learning.',
                WorkShiftsDescription: 'Làm việc theo dự án, deadline căng.',
                FacilityMajorTypeId: 5,
                FacilityId: 3,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-02-10T08:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2023-08-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-data-science.jpg',
                ImageUrl: 'https://example.com/major-data-science.jpg'
              },
              MajorType: {
                Id: 5,
                Name: 'Công nghệ'
              },
              Feedback: {
                Id: 401,
                AccountId: 201,
                FacilityMajorId: majorId,
                Content: 'Giảng viên giỏi, nội dung thực tế nhưng bài tập nặng quá!',
                Rate: 4,
                IsDeactivated: false,
                CreatedAt: '2024-03-15T14:45:00Z'
              }
            },
            {
              Account: {
                Id: 202,
                Email: 'phamthithuy@example.com',
                Phone: '0978123456',
                FullName: 'Phạm Thị Thùy',
                RoleId: 3,
                JobTypeId: 2,
                ImageUrl: 'https://example.com/avatar-202.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-09-10T09:15:00Z'
              },
              Major: {
                Id: 1,
                Name: 'Khoa học dữ liệu',
                MainDescription: 'Ngành học chuyên sâu về AI và Machine Learning.',
                WorkShiftsDescription: 'Làm việc theo dự án, deadline căng.',
                FacilityMajorTypeId: 5,
                FacilityId: 3,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-02-10T08:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2023-08-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-data-science.jpg',
                ImageUrl: 'https://example.com/major-data-science.jpg'
              },
              MajorType: {
                Id: 5,
                Name: 'Công nghệ'
              },
              Feedback: {
                Id: 402,
                AccountId: 202,
                FacilityMajorId: majorId,
                Content: 'Chương trình rất hay nhưng cần bổ sung thêm thực hành AI.',
                Rate: 5,
                IsDeactivated: false,
                CreatedAt: '2024-03-18T10:30:00Z'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/majors/major-head/{accountId}/feedbacks
  getHeadMajorFeedbacks(accountId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Feedbacks: [
            {
              Account: {
                Id: 301,
                Email: 'tranvanbao@example.com',
                Phone: '0987123456',
                FullName: 'Trần Văn Bảo',
                RoleId: 2,
                JobTypeId: 1,
                ImageUrl: 'https://example.com/avatar-301.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-06-15T08:30:00Z'
              },
              Major: {
                Id: 11,
                Name: 'Công nghệ thông tin',
                MainDescription: 'Ngành chuyên sâu về lập trình và hệ thống thông tin.',
                WorkShiftsDescription: 'Làm việc theo dự án, có OT.',
                FacilityMajorTypeId: 2,
                FacilityId: 5,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-02-15T08:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2023-08-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-it.jpg',
                ImageUrl: 'https://example.com/major-it.jpg'
              },
              MajorType: {
                Id: 2,
                Name: 'Công nghệ'
              },
              Feedback: {
                Id: 501,
                AccountId: 301,
                FacilityMajorId: 11,
                Content: 'Chương trình rất thực tế, giảng viên siêu xịn!',
                Rate: 5,
                IsDeactivated: false,
                CreatedAt: '2024-03-20T14:45:00Z'
              }
            },
            {
              Account: {
                Id: 302,
                Email: 'nguyenthithanh@example.com',
                Phone: '0905123456',
                FullName: 'Nguyễn Thị Thanh',
                RoleId: 3,
                JobTypeId: 2,
                ImageUrl: 'https://example.com/avatar-302.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-09-10T09:15:00Z'
              },
              Major: {
                Id: 12,
                Name: 'Kinh tế',
                MainDescription: 'Ngành đào tạo chuyên sâu về tài chính và quản trị.',
                WorkShiftsDescription: 'Làm việc văn phòng, ít OT.',
                FacilityMajorTypeId: 3,
                FacilityId: 6,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-03-01T08:00:00Z',
                IsDeactivated: false,
                CreatedAt: '2023-10-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-economics.jpg',
                ImageUrl: 'https://example.com/major-economics.jpg'
              },
              MajorType: {
                Id: 3,
                Name: 'Kinh tế'
              },
              Feedback: {
                Id: 502,
                AccountId: 302,
                FacilityMajorId: 12,
                Content: 'Môn học hữu ích, cần thêm thực hành thực tế.',
                Rate: 4,
                IsDeactivated: false,
                CreatedAt: '2024-03-22T10:30:00Z'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/majors/reports
  getAllMajorReports(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Reports: [
            {
              Report: {
                Id: 101,
                Content: 'Hệ thống bị lỗi không đăng nhập được!',
                IsResolved: false,
                ReportTypeId: 1,
                AccountId: 301,
                FacilityMajorId: 11,
                CreatedAt: '2024-03-20T10:30:00Z'
              },
              ReportType: {
                Id: 1,
                Name: 'Lỗi hệ thống'
              },
              Account: {
                FullName: 'Trần Văn Bảo',
                Email: 'tranvanbao@example.com',
                Password: '********',
                Address: 'Hà Nội, Việt Nam',
                DateOfBirth: '2000-05-15',
                Phone: '0987123456',
                RoleId: 2,
                JobTypeId: 1,
                ImageUrl: 'https://example.com/avatar-301.jpg',
                IsDeactivated: 'false',
                CreatedAt: '2023-06-15T08:30:00Z'
              },
              Major: {
                Id: 1,
                Name: 'Công nghệ thông tin',
                MainDescription: 'Ngành chuyên sâu về lập trình và hệ thống thông tin.',
                WorkShiftsDescription: 'Làm việc theo dự án, có OT.',
                FacilityMajorTypeId: 2,
                FacilityId: 5,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-02-15T08:00:00Z',
                IsDeactivated: false,
                Created: '2023-08-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-it.jpg',
                ImageUrl: 'https://example.com/major-it.jpg'
              },
              MajorType: {
                Id: 2,
                Name: 'Công nghệ'
              }
            },
            {
              Report: {
                Id: 102,
                Content: 'Giảng viên thường xuyên vắng mặt không báo trước!',
                IsResolved: true,
                ReportTypeId: 2,
                AccountId: 302,
                FacilityMajorId: 12,
                CreatedAt: '2024-03-22T09:45:00Z'
              },
              ReportType: {
                Id: 2,
                Name: 'Vấn đề giảng dạy'
              },
              Account: {
                FullName: 'Nguyễn Thị Thanh',
                Email: 'nguyenthithanh@example.com',
                Password: '********',
                Address: 'TP. Hồ Chí Minh, Việt Nam',
                DateOfBirth: '1999-08-22',
                Phone: '0905123456',
                RoleId: 3,
                JobTypeId: 2,
                ImageUrl: 'https://example.com/avatar-302.jpg',
                IsDeactivated: 'false',
                CreatedAt: '2023-09-10T09:15:00Z'
              },
              Major: {
                Id: 2,
                Name: 'Kinh tế',
                MainDescription: 'Ngành đào tạo chuyên sâu về tài chính và quản trị.',
                WorkShiftsDescription: 'Làm việc văn phòng, ít OT.',
                FacilityMajorTypeId: 3,
                FacilityId: 6,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-03-01T08:00:00Z',
                IsDeactivated: false,
                Created: '2023-10-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-economics.jpg',
                ImageUrl: 'https://example.com/major-economics.jpg'
              },
              MajorType: {
                Id: 3,
                Name: 'Kinh tế'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/majors/major-head/{accountId}/reports
  getReportsByHead(accountId: number): Promise<any> {
    console.log('accountId: ' + accountId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Reports: [
            {
              Report: {
                Id: 101,
                Content: 'Báo cáo về vấn đề kỹ thuật trong lớp học.',
                IsResolved: false,
                ReportTypeId: 3,
                AccountId: 42,
                FacilityMajorId: 7,
                CreatedAt: '2024-02-20T14:30:00Z'
              },
              ReportType: {
                Id: 3,
                Name: 'Kỹ thuật'
              },
              Account: {
                FullName: 'Nguyễn Văn A',
                Email: 'nguyenvana@example.com',
                Password: '******',
                Address: 'Hà Nội, Việt Nam',
                DateOfBirth: '1990-05-15',
                Phone: '0987654321',
                RoleId: 2,
                JobTypeId: 1,
                ImageUrl: 'https://example.com/avatar.jpg',
                IsDeactivated: false,
                CreatedAt: '2023-06-01T09:00:00Z'
              },
              Major: {
                Id: 7,
                Name: 'Khoa học máy tính',
                MainDescription: 'Ngành nghiên cứu về thuật toán và hệ thống phần mềm.',
                WorkShiftsDescription: 'Ca sáng và ca tối.',
                FacilityMajorTypeId: 1,
                FacilityId: 10,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-01-15T08:00:00Z',
                IsDeactivated: false,
                Created: '2023-12-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-cs.jpg',
                ImageUrl: 'https://example.com/major-cs.jpg'
              },
              MajorType: {
                Id: 1,
                Name: 'Công nghệ'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Major/majors/{majorId}/reports
  getReportsByMajor(majorId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Reports: [
            {
              Report: {
                Id: 101,
                Content: 'Hệ thống đăng nhập bị lỗi, không thể truy cập.',
                IsResolved: false,
                ReportTypeId: 1,
                AccountId: 301,
                FacilityMajorId: majorId,
                CreatedAt: '2024-03-20T10:30:00Z'
              },
              ReportType: {
                Id: 1,
                Name: 'Lỗi hệ thống'
              },
              Account: {
                FullName: 'Trần Văn Bảo',
                Email: 'tranvanbao@example.com',
                Password: '********',
                Address: 'Hà Nội, Việt Nam',
                DateOfBirth: '2000-05-15',
                Phone: '0987123456',
                RoleId: 2,
                JobTypeId: 1,
                ImageUrl: 'https://example.com/avatar-301.jpg',
                IsDeactivated: 'false',
                CreatedAt: '2023-06-15T08:30:00Z'
              },
              Major: {
                Id: majorId,
                Name: 'Công nghệ thông tin',
                MainDescription: 'Ngành chuyên sâu về lập trình và hệ thống thông tin.',
                WorkShiftsDescription: 'Làm việc theo dự án, có OT.',
                FacilityMajorTypeId: 2,
                FacilityId: 5,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-02-15T08:00:00Z',
                IsDeactivated: false,
                Created: '2023-08-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-it.jpg',
                ImageUrl: 'https://example.com/major-it.jpg'
              },
              MajorType: {
                Id: 2,
                Name: 'Công nghệ'
              }
            },
            {
              Report: {
                Id: 102,
                Content: 'Lỗi thanh toán học phí, hệ thống không ghi nhận giao dịch.',
                IsResolved: true,
                ReportTypeId: 2,
                AccountId: 302,
                FacilityMajorId: majorId,
                CreatedAt: '2024-03-18T14:20:00Z'
              },
              ReportType: {
                Id: 2,
                Name: 'Lỗi thanh toán'
              },
              Account: {
                FullName: 'Nguyễn Thị Lan',
                Email: 'nguyenthilann@example.com',
                Password: '********',
                Address: 'TP. Hồ Chí Minh, Việt Nam',
                DateOfBirth: '1999-10-10',
                Phone: '0978123456',
                RoleId: 3,
                JobTypeId: 2,
                ImageUrl: 'https://example.com/avatar-302.jpg',
                IsDeactivated: 'false',
                CreatedAt: '2023-07-10T09:00:00Z'
              },
              Major: {
                Id: majorId,
                Name: 'Công nghệ thông tin',
                MainDescription: 'Ngành chuyên sâu về lập trình và hệ thống thông tin.',
                WorkShiftsDescription: 'Làm việc theo dự án, có OT.',
                FacilityMajorTypeId: 2,
                FacilityId: 5,
                IsOpen: true,
                CloseScheduleDate: null,
                OpenScheduleDate: '2024-02-15T08:00:00Z',
                IsDeactivated: false,
                Created: '2023-08-01T10:00:00Z',
                BackgroundImageUrl: 'https://example.com/bg-it.jpg',
                ImageUrl: 'https://example.com/major-it.jpg'
              },
              MajorType: {
                Id: 2,
                Name: 'Công nghệ'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [POST] /Major/majors/{majorId}/account/{accountId}/reports
  createReport(majorId: number, accountId: number, reportData: { ReportTypeId: number; Content: string }): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!majorId || !accountId || !reportData || !reportData.ReportTypeId || !reportData.Content.trim()) {
        reject('❌ Dữ liệu không hợp lệ. Vui lòng nhập đầy đủ thông tin.');
        return;
      }
      setTimeout(() => {
        const mockResponse = {
          message: '✅ Report đã được tạo thành công!',
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }
  
  // [GET] /Major/majors/reports/{reportId}
  getReportDetail(reportId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          Report: {
            Id: reportId,
            Content: 'Lỗi hệ thống, không thể truy cập tài khoản!',
            IsResolved: false,
            ReportTypeId: 1,
            AccountId: 301,
            FacilityMajorId: 11,
            CreatedAt: '2024-03-20T10:30:00Z'
          },
          ReportType: {
            Id: 1,
            Name: 'Lỗi hệ thống'
          },
          Account: {
            FullName: 'Trần Văn Bảo',
            Email: 'tranvanbao@example.com',
            Password: '********',
            Address: 'Hà Nội, Việt Nam',
            DateOfBirth: '2000-05-15',
            Phone: '0987123456',
            RoleId: 2,
            JobTypeId: 1,
            ImageUrl: 'https://example.com/avatar-301.jpg',
            IsDeactivated: 'false',
            CreatedAt: '2023-06-15T08:30:00Z'
          },
          Major: {
            Id: 11,
            Name: 'Công nghệ thông tin',
            MainDescription: 'Ngành chuyên sâu về lập trình và hệ thống thông tin.',
            WorkShiftsDescription: 'Làm việc theo dự án, có OT.',
            FacilityMajorTypeId: 2,
            FacilityId: 5,
            IsOpen: true,
            CloseScheduleDate: null,
            OpenScheduleDate: '2024-02-15T08:00:00Z',
            IsDeactivated: false,
            CreatedAt: '2023-08-01T10:00:00Z',
            BackgroundImageUrl: 'https://example.com/bg-it.jpg',
            ImageUrl: 'https://example.com/major-it.jpg'
          }
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /Major/majors/reports/{reportId}
  resolveReport(reportId: number, ): Promise<any> {
    console.log('reportId: ' + reportId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          message: `Success.`
        };
        resolve(mockResponse);
      }, 800); // Giả lập độ trễ API 800ms
    });
  }

  // [GET] /Major/majors/facilityMajorTypes
  getFacilityMajorTypes(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          FacilityMajorTypes: [
            { Id: 1, Name: 'Engineering' },
            { Id: 2, Name: 'Science' },
            { Id: 3, Name: 'Arts' },
            { Id: 4, Name: 'Medicine' },
            { Id: 5, Name: 'Business' }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

}
