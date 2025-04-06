import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TaskRequestService {

    // [GET] /Request/task
    getAllTaskRequests(): Promise<any> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockTaskRequests = {
                    TaskRequests: [
                        {
                            TaskRequest: {
                                Id: 1,
                                Description: 'Sửa chữa máy lạnh',
                                RequesterId: 100,
                                FacilityMajorId: 10,
                                CancelReason: null,
                                RequestStatusId: 1,
                                CreatedAt: new Date('2024-03-01T08:00:00Z').toISOString(),
                                UpdatedAt: new Date().toISOString()
                            },
                            RequestStatus: {
                                Id: 1,
                                Name: 'Pending'
                            },
                            Major: {
                                Id: 10,
                                Name: 'Bảo trì',
                                MainDescription: 'Chuyên về bảo trì hệ thống',
                                WorkShiftsDescription: 'Ca ngày và ca đêm',
                                FacilityMajorTypeId: 2,
                                FacilityId: 5,
                                IsOpen: true,
                                CloseScheduleDate: null,
                                OpenScheduleDate: '2024-03-01T00:00:00Z',
                                IsDeactivated: false,
                                CreatedAt: new Date('2024-01-15T10:00:00Z').toISOString(),
                                BackgroundImageUrl: 'https://example.com/background.jpg',
                                ImageUrl: 'https://example.com/major.jpg'
                            }
                        },
                        {
                            TaskRequest: {
                                Id: 2,
                                Description: 'Thay bóng đèn',
                                RequesterId: 101,
                                FacilityMajorId: 12,
                                CancelReason: null,
                                RequestStatusId: 2,
                                CreatedAt: new Date('2024-03-02T09:30:00Z').toISOString(),
                                UpdatedAt: new Date().toISOString()
                            },
                            RequestStatus: {
                                Id: 2,
                                Name: 'In Progress'
                            },
                            Major: {
                                Id: 12,
                                Name: 'Điện',
                                MainDescription: 'Sửa chữa, bảo trì hệ thống điện',
                                WorkShiftsDescription: 'Ca ngày',
                                FacilityMajorTypeId: 3,
                                FacilityId: 6,
                                IsOpen: true,
                                CloseScheduleDate: null,
                                OpenScheduleDate: '2024-03-02T00:00:00Z',
                                IsDeactivated: false,
                                CreatedAt: new Date('2024-02-01T14:00:00Z').toISOString(),
                                BackgroundImageUrl: 'https://example.com/electric.jpg',
                                ImageUrl: 'https://example.com/major-electric.jpg'
                            }
                        }
                    ]
                };
                resolve(mockTaskRequests);
            }, 1000); // Giả lập độ trễ API 1 giây
        });
    }

    // [GET] /Request/task/majors/{majorId}
    getTaskRequestsByMajor(majorId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockTaskRequests = {
                    TaskRequests: [
                        {
                            TaskRequest: {
                                Id: 1,
                                Description: 'Sửa chữa thiết bị hỏng',
                                RequesterId: 10,
                                FacilityMajorId: majorId,
                                CancelReason: '',
                                RequestStatusId: 2,
                                CreatedAt: '2024-03-20T12:00:00Z',
                                UpdatedAt: '2024-03-21T15:00:00Z'
                            },
                            RequestStatus: {
                                Id: 2,
                                Name: 'Đang xử lý'
                            },
                            Major: {
                                Id: majorId,
                                Name: 'Điện tử',
                                MainDescription: 'Sửa chữa và bảo trì thiết bị điện tử',
                                WorkShiftsDescription: 'Ca sáng và ca chiều',
                                FacilityMajorTypeId: 1,
                                FacilityId: 5,
                                IsOpen: true,
                                CloseScheduleDate: '2024-12-31',
                                OpenScheduleDate: '2024-01-01',
                                IsDeactivated: false,
                                CreatedAt: '2023-06-15T08:00:00Z',
                                BackgroundImageUrl: 'https://example.com/bg-electronics.jpg',
                                ImageUrl: 'https://example.com/electronics.jpg'
                            }
                        }
                    ]
                };
                resolve(mockTaskRequests);
            }, 1000); // Giả lập độ trễ API 1 giây
        });
    }

    // [POST] /Request/task
    addTaskRequest(taskRequest: any): Promise<any> {
        const Request = {
            TaskRequest: taskRequest
        };
        console.log('request: ' + JSON.stringify(Request));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockNewTaskRequest = {
                    message: "Success."
                };
                resolve(mockNewTaskRequest);
            }, 1000); // Giả lập độ trễ API 1 giây
        });
    }

    // [GET] /Request/task/{requestId}
    getTaskRequestDetail(requestId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockTaskDetail = {
                    TaskRequest: {
                        Id: requestId,
                        Description: 'Sửa chữa máy bơm nước',
                        RequesterId: 150,
                        FacilityMajorId: 20,
                        CancelReason: 'Thích thì huỷ',
                        RequestStatusId: 1,
                        CreatedAt: new Date('2024-03-05T10:00:00Z').toISOString(),
                        UpdatedAt: new Date().toISOString()
                    },
                    RequestStatus: {
                        Id: 1,
                        Name: 'Pending'
                    },
                    Major: {
                        Id: 2,
                        Name: 'Bảo trì cơ khí',
                        MainDescription: 'Chuyên bảo trì thiết bị cơ khí',
                        WorkShiftsDescription: 'Ca sáng và tối',
                        FacilityMajorTypeId: 4,
                        FacilityId: 10,
                        IsOpen: true,
                        CloseScheduleDate: null,
                        OpenScheduleDate: '2024-03-01T00:00:00Z',
                        IsDeactivated: false,
                        CreatedAt: new Date('2024-02-10T12:00:00Z').toISOString(),
                        BackgroundImageUrl: 'https://example.com/maintenance.jpg',
                        ImageUrl: 'https://example.com/mechanical.jpg'
                    }
                };
                resolve(mockTaskDetail);
            }, 1000); // Giả lập độ trễ API 1 giây
        });
    }

    // [PUT] /Request/task/{taskId}
    updateTaskStatus(taskId: number, action: 'Finished' | 'Cancelled', cancelReason: any): Promise<any> {
        console.log('taskId: ' + taskId);
        console.log('action: ' + action);
        console.log('cancelReason: ' + JSON.stringify(cancelReason));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockResponse = {
                    message: "Success."
                };
                resolve(mockResponse);
            }, 1000);
        });
    }

    // [GET] /Request/task/major-head/{accountId}
    getTaskRequestsByHead(accountId: number): Promise<any> {
        console.log('accountId: ' + accountId);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockResponse = {
                    TaskRequests: [
                        {
                            TaskRequest: {
                                Id: 1,
                                Description: 'Fix lỗi hệ thống',
                                RequesterId: 101,
                                FacilityMajorId: 5,
                                CancelReason: null,
                                RequestStatusId: 2,
                                CreatedAt: '2024-03-15T10:00:00Z',
                                UpdatedAt: '2024-03-16T12:00:00Z'
                            },
                            RequestStatus: {
                                Id: 2,
                                Name: 'Đang xử lý'
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
                            }
                        },
                        {
                            TaskRequest: {
                                Id: 2,
                                Description: 'Cập nhật phần mềm kế toán',
                                RequesterId: 102,
                                FacilityMajorId: 8,
                                CancelReason: 'Không còn cần thiết',
                                RequestStatusId: 3,
                                CreatedAt: '2024-02-10T09:00:00Z',
                                UpdatedAt: '2024-02-12T15:00:00Z'
                            },
                            RequestStatus: {
                                Id: 3,
                                Name: 'Đã hủy'
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
                            }
                        }
                    ]
                };
                resolve(mockResponse);
            }, 1000); // Giả lập độ trễ API 1 giây
        });
    }

}
