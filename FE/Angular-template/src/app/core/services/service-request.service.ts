import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  // [GET] /Request/service/major-head/{accountId}
  getServiceRequestsForHead(accountId: number): Promise<any> {
    console.log('accountId: ' + accountId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockServiceRequests = {
          ServiceRequests: [
            {
              ServiceRequest: {
                Id: 1,
                ServiceId: 101,
                RequesterId: 2001,
                RequestStatusId: 1,
                RequestInitDescription: 'Yêu cầu bảo trì hệ thống',
                RequestResultDescription: 'Bảo trì hoàn thành',
                AssignedAssigneeId: 3001,
                TimeRequest: '10:00 AM',
                DateRequest: '2025-04-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra xong',
                CancelReason: '',
                CreatedAt: '2025-04-01T09:00:00Z',
                UpdatedAt: '2025-04-01T10:00:00Z'
              },
              Requester: {
                Id: 2001,
                FullName: 'Nguyễn Văn A',
                Email: 'nguyenvana@example.com',
                ImageUrl: 'https://example.com/images/nguyenvana.jpg',
                DateOfBirth: '1990-05-01',
                Phone: '0123456789',
                Address: 'Hà Nội, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2020-01-01T00:00:00Z'
              },
              RequestStatus: {
                Id: 1,
                Name: 'Đang xử lý'
              },
              Service: {
                Id: 101,
                Name: 'Bảo trì hệ thống',
                FacilityMajorId: 1,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả chi tiết sự cố',
                MainDescription: 'Bảo trì toàn bộ hệ thống máy tính',
                WorkShiftsDescription: '8:00 AM - 5:00 PM',
                IsOpen: true,
                CloseScheduleDate: '2025-04-05',
                OpenScheduleDate: '2025-04-01',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2025-03-15T00:00:00Z'
              },
              Major: {
                Id: 1,
                Name: 'Quản lý Hệ thống',
                MainDescription: 'Chịu trách nhiệm bảo trì hệ thống công nghệ thông tin',
                WorkShiftsDescription: 'Ca làm việc linh hoạt',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '2025-04-10',
                OpenScheduleDate: '2025-03-01',
                IsDeactivated: false,
                CreatedAt: '2025-02-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/background.jpg',
                ImageUrl: 'https://example.com/images/major1.jpg'
              }
            }
            // Thêm các request khác nếu cần
          ]
        };
        resolve(mockServiceRequests);
      }, 1000); // Giả lập API delay 1 giây
    });
  }

  // [GET] /Request/service/majors/{majorId}
  getServiceRequestsForMajor(majorId: number): Promise<any> {
    console.log('majorId: ' + majorId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockServiceRequests = {
          ServiceRequests: [
            {
              ServiceRequest: {
                Id: 1,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 1,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: 1,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 2,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 2,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: 1,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 3,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 3,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: 1,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 4,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 4,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: 1,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 5,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 5,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: 1,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 6,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 6,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: 1,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            },
            // 📌 Thêm nhiều service request khác nếu cần
          ]
        };
        resolve(mockServiceRequests);
      }, 1000); // Giả lập API delay 1 giây
    });
  }

  // [GET] /Request/service/{requestId}
  getServiceRequestDetail(requestId: number): Promise<any> {
    console.log('requestId: ' + requestId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockServiceRequest = {
          ServiceRequest: {
            Id: requestId,
            ServiceId: 101,
            RequesterId: 2001,
            RequestStatusId: 1,
            RequestInitDescription: 'Yêu cầu sửa chữa hệ thống mạng',
            RequestResultDescription: 'Đã khắc phục xong lỗi mạng',
            AssignedAssigneeId: 3001,
            TimeRequest: '14:30 PM',
            DateRequest: '2025-04-02',
            IsCancelAutomatically: false,
            ProgressNote: 'Kỹ thuật viên đang xử lý',
            CancelReason: '',
            CreatedAt: '2025-04-01T10:00:00Z',
            UpdatedAt: '2025-04-02T15:00:00Z'
          },
          Requester: {
            Id: 2001,
            FullName: 'Nguyễn Văn A',
            Email: 'nguyenvana@example.com',
            ImageUrl: 'https://example.com/images/nguyenvana.jpg',
            DateOfBirth: '1990-05-01',
            Phone: '0123456789',
            Address: 'Hà Nội, Việt Nam',
            IsDeactivated: false,
            CreatedAt: '2020-01-01T00:00:00Z'
          },
          RequestStatus: {
            Id: 1,
            Name: 'Đang xử lý'
          },
          Service: {
            Id: 101,
            Name: 'Sửa chữa hệ thống mạng',
            FacilityMajorId: 2,
            IsInitRequestDescriptionRequired: true,
            RequestInitHintDescription: 'Vui lòng mô tả chi tiết lỗi',
            MainDescription: 'Dịch vụ sửa chữa hệ thống mạng nội bộ',
            WorkShiftsDescription: '9:00 AM - 6:00 PM',
            IsOpen: true,
            CloseScheduleDate: '2025-04-07',
            OpenScheduleDate: '2025-04-01',
            ServiceTypeId: 2,
            IsDeactivated: false,
            CreatedAt: '2025-03-15T00:00:00Z'
          },
          Major: {
            Id: 2,
            Name: 'Hạ tầng Công nghệ',
            MainDescription: 'Quản lý và bảo trì hạ tầng công nghệ',
            WorkShiftsDescription: 'Ca sáng, chiều, tối',
            FacilityMajorTypeId: 1,
            FacilityId: 1,
            IsOpen: true,
            CloseScheduleDate: '2025-04-10',
            OpenScheduleDate: '2025-03-01',
            IsDeactivated: false,
            CreatedAt: '2025-02-01T00:00:00Z',
            BackgroundImageUrl: 'https://example.com/images/background.jpg',
            ImageUrl: 'https://example.com/images/major2.jpg'
          }
        };
        resolve(mockServiceRequest);
      }, 1000); // Giả lập API delay 1 giây
    });
  }

  // [PUT] /Request/service/{requestId}
  updateServiceRequest(requestId: number, action: number, updateData: any): Promise<any> {
    console.log('requestId: ' + requestId);
    console.log('action: ' + action);
    console.log('request: ' + JSON.stringify(updateData));

    const validActions = [2, 3, 5, 6, 7, 8];
    if (!validActions.includes(action)) {
      alert(`❌ Hành động "${action}" không được hỗ trợ`);
      return Promise.reject(`Hành động "${action}" không hợp lệ`);
    }

    // Lấy danh sách trạng thái để tìm tên action (không chứa khoảng trắng)
    return this.getServiceRequestStatuses()
      .then(response => {
        const status = response.ServiceRequestStatuses.find(s => s.Id === action);
        const actionName = status ? status.Name.replace(/\s+/g, '') : `Action${action}`;

        console.log(`Tên action không khoảng trắng: "${actionName}"`);

        // Cập nhật service request
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log(`Cập nhật Service Request ID ${requestId} với hành động "${actionName}" thành công`, updateData);
            resolve({
              message: `Service Request ID ${requestId} đã được cập nhật với hành động "${actionName}"`,
            });
          }, 1000);
        });
      })
      .catch(error => {
        console.error('❌ Lỗi khi lấy trạng thái:', error);
        return Promise.reject('Lỗi khi lấy trạng thái');
      });
  }

  // [GET] /Request/service/major/{majorId}/assignable-assignee
  getAssignableAssigneesForMajor(majorId: number): Promise<any> {
    console.log('majorId: ' + majorId);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockAssignees = {
          Accounts: [
            {
              Account: {
                Id: 1,
                FullName: 'Nguyễn Văn A',
                Email: 'nguyenvana@example.com',
                ImageUrl: 'https://example.com/images/nguyenvana.jpg',
                DateOfBirth: '1990-05-01',
                Phone: '0123456789',
                Address: 'Hà Nội, Việt Nam',
                RoleId: 2,
                JobTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2020-01-01T00:00:00Z'
              },
              Role: {
                Id: 2,
                Name: 'Kỹ sư'
              },
              JobType: {
                Id: 1,
                Name: 'Full-time'
              }
            },
            {
              Account: {
                Id: 2,
                FullName: 'Trần Thị B',
                Email: 'tranthib@example.com',
                ImageUrl: 'https://example.com/images/tranthib.jpg',
                DateOfBirth: '1988-08-15',
                Phone: '0987654321',
                Address: 'Hồ Chí Minh, Việt Nam',
                RoleId: 3,
                JobTypeId: 2,
                IsDeactivated: false,
                CreatedAt: '2021-06-01T00:00:00Z'
              },
              Role: {
                Id: 3,
                Name: 'Quản lý'
              },
              JobType: {
                Id: 2,
                Name: 'Part-time'
              }
            }
            // Thêm nhiều assignees nếu cần
          ]
        };
        resolve(mockAssignees);
      }, 1000); // Giả lập thời gian trả về dữ liệu
    });
  }

  // [GET] /Request/service/assignee/{accountId}
  getServiceRequestsForAssignee(accountId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockServiceRequests = {
          ServiceRequests: [
            {
              ServiceRequest: {
                Id: 1,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 1,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: accountId,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 2,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 2,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: accountId,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 3,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 3,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: accountId,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 4,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 4,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: accountId,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 5,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 5,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: accountId,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            }, {
              ServiceRequest: {
                Id: 6,
                ServiceId: 1,
                RequesterId: 5,
                RequestStatusId: 6,
                RequestInitDescription: 'Cần sửa chữa máy lạnh',
                RequestResultDescription: 'Đã hoàn thành sửa chữa',
                AssignedAssigneeId: accountId,
                TimeRequest: '10:30',
                DateRequest: '2025-03-01',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã kiểm tra và thay gas',
                CancelReason: '',
                CreatedAt: '2025-02-28T15:00:00Z',
                UpdatedAt: '2025-03-01T12:00:00Z'
              },
              Requester: {
                Id: 5,
                FullName: 'Trương Minh Tân',
                Email: 'tan@example.com',
                ImageUrl: 'https://example.com/images/tan.jpg',
                DateOfBirth: '1995-06-21',
                Phone: '0934567890',
                Address: 'Đà Nẵng, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-07-15T08:00:00Z'
              },
              RequestStatus: {
                Id: 2,
                Name: 'Hoàn thành'
              },
              Service: {
                Id: 1,
                Name: 'Bảo trì máy lạnh',
                FacilityMajorId: 3,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng mô tả lỗi chi tiết',
                MainDescription: 'Dịch vụ bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: 'Hoạt động từ 08:00 - 18:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 1,
                IsDeactivated: false,
                CreatedAt: '2023-05-10T09:00:00Z'
              },
              Major: {
                Id: 3,
                Name: 'Kỹ thuật điện lạnh',
                MainDescription: 'Chuyên về bảo trì, sửa chữa máy lạnh',
                WorkShiftsDescription: '08:00 - 18:00 hàng ngày',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-01-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/major-cooling.jpg',
                ImageUrl: 'https://example.com/images/cooling-service.jpg'
              }
            },
            // 📌 Thêm nhiều service request khác nếu cần
          ]
        };
        resolve(mockServiceRequests);
      }, 1000); // Giả lập thời gian trả về dữ liệu
    });
  }

  // [GET] /Request/service/assignee/{accountId}/majors/{majorId}
  getServiceRequestsForAssigneeInMajor(accountId: number, majorId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!accountId || accountId <= 0 || !majorId || majorId <= 0) {
        reject('❌ Account ID hoặc Major ID không hợp lệ');
        return;
      }
      setTimeout(() => {
        const mockServiceRequests = {
          ServiceRequests: [
            {
              ServiceRequest: {
                Id: 201,
                ServiceId: 2,
                RequesterId: 10,
                RequestStatusId: 3,
                RequestInitDescription: 'Yêu cầu sửa chữa hệ thống điện',
                RequestResultDescription: 'Đã thay dây điện và kiểm tra lại',
                AssignedAssigneeId: accountId,
                TimeRequest: '14:00',
                DateRequest: '2025-03-02',
                IsCancelAutomatically: false,
                ProgressNote: 'Đã hoàn thành kiểm tra và sửa chữa',
                CancelReason: '',
                CreatedAt: '2025-03-01T16:00:00Z',
                UpdatedAt: '2025-03-02T18:00:00Z'
              },
              Requester: {
                Id: 10,
                FullName: 'Nguyễn Văn An',
                Email: 'an@example.com',
                ImageUrl: 'https://example.com/images/an.jpg',
                DateOfBirth: '1993-05-12',
                Phone: '0987654321',
                Address: 'Hồ Chí Minh, Việt Nam',
                IsDeactivated: false,
                CreatedAt: '2022-08-10T10:00:00Z'
              },
              RequestStatus: {
                Id: 3,
                Name: 'Đang xử lý'
              },
              Service: {
                Id: 2,
                Name: 'Sửa chữa hệ thống điện',
                FacilityMajorId: majorId,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Vui lòng cung cấp chi tiết lỗi',
                MainDescription: 'Dịch vụ sửa chữa hệ thống điện trong tòa nhà',
                WorkShiftsDescription: 'Hoạt động từ 07:00 - 19:00',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                ServiceTypeId: 2,
                IsDeactivated: false,
                CreatedAt: '2023-06-15T08:00:00Z'
              },
              Major: {
                Id: majorId,
                Name: 'Kỹ thuật điện',
                MainDescription: 'Bảo trì và sửa chữa hệ thống điện',
                WorkShiftsDescription: '07:00 - 19:00 hàng ngày',
                FacilityMajorTypeId: 3,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '',
                IsDeactivated: false,
                CreatedAt: '2023-02-01T00:00:00Z',
                BackgroundImageUrl: 'https://example.com/images/electricity.jpg',
                ImageUrl: 'https://example.com/images/electrician.jpg'
              }
            },
            // 📌 Có thể thêm nhiều service request khác
          ]
        };

        console.log(`✅ Lấy danh sách Service Requests cho Account ID ${accountId} trong Major ID ${majorId} thành công:`, mockServiceRequests);
        resolve(mockServiceRequests);
      }, 1000); // Giả lập thời gian trả về dữ liệu
    });
  }

  // [GET] /Request/service/statuses
  getServiceRequestStatuses(): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          ServiceRequestStatuses: [
            { Id: 1, Name: 'Pending' },
            { Id: 2, Name: 'Assigned' },
            { Id: 3, Name: 'Rejected By Assignee' },
            { Id: 4, Name: 'Rejected By Assignee Deactivation' },
            { Id: 5, Name: 'Accepted By Assignee' },
            { Id: 6, Name: 'Completed By Assignee' },
            { Id: 7, Name: 'Finished' },
            { Id: 8, Name: 'Cancelled' },
            { Id: 9, Name: 'Cancelled Auto' }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }
}
