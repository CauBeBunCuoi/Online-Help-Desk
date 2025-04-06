import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServiceManagementService {
    // [GET] /Major/services/major-head/{accountId}
    getServicesByHead(accountId: number): Promise<any> {
        console.log('accountId: ' + accountId);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockResponse = {
                    Services: [
                        {
                            Service: {
                                Id: 1,
                                Name: 'Dịch vụ phát triển phần mềm',
                                FacilityMajorId: 101,
                                IsInitRequestDescriptionRequired: true,
                                RequestInitHintDescription: 'Cung cấp mô tả chi tiết về yêu cầu phát triển',
                                MainDescription: 'Dịch vụ lập trình ứng dụng web và di động',
                                WorkShiftsDescription: 'Ca sáng, ca tối',
                                IsOpen: true,
                                CloseScheduleDate: null,
                                OpenScheduleDate: '2024-03-01T08:00:00Z',
                                ServiceTypeId: 2,
                                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg',
                                IsDeactivated: false,
                                CreatedAt: '2023-11-01T10:00:00Z'
                            },
                            Major: {
                                Id: 101,
                                Name: 'Công nghệ thông tin',
                                MainDescription: 'Phát triển phần mềm và hệ thống',
                                WorkShiftsDescription: 'Ca sáng, ca chiều',
                                FacilityMajorTypeId: 2,
                                FacilityId: 5,
                                IsOpen: true,
                                CloseScheduleDate: null,
                                OpenScheduleDate: '2023-01-01T08:00:00Z',
                                IsDeactivated: false,
                                CreatedAt: '2023-06-10T10:00:00Z',
                                BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/TwbATRACNCwWa6ZkuI8k.jpg',
                                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpgg'
                            },
                            ServiceType: {
                                Id: 2,
                                Name: 'Dịch vụ lập trình'
                            }
                        }
                    ]
                };
                resolve(mockResponse);
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    // [GET] /Major/services/majors/{majorId}
    getServicesByMajor(majorId: number): Promise<any> {
        console.log('majorId: ' + majorId);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockResponse = {
                    Services: [
                        {
                            Service: {
                                Id: 1,
                                Name: 'Dịch vụ kiểm thử phần mềm',
                                FacilityMajorId: majorId,
                                IsInitRequestDescriptionRequired: true,
                                RequestInitHintDescription: 'Nhập mô tả chi tiết về yêu cầu kiểm thử',
                                MainDescription: 'Dịch vụ kiểm thử và đảm bảo chất lượng phần mềm',
                                WorkShiftsDescription: 'Ca sáng, ca tối',
                                IsOpen: true,
                                CloseScheduleDate: null,
                                OpenScheduleDate: '2024-03-01T08:00:00Z',
                                ServiceTypeId: 3,
                                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg',
                                IsDeactivated: false,
                                CreatedAt: '2023-12-01T10:00:00Z'
                            },
                            Major: {
                                Id: majorId,
                                Name: 'Kiểm thử phần mềm',
                                MainDescription: 'Kiểm tra chất lượng phần mềm',
                                WorkShiftsDescription: 'Ca sáng, ca chiều',
                                FacilityMajorTypeId: 2,
                                FacilityId: 5,
                                IsOpen: true,
                                CloseScheduleDate: null,
                                OpenScheduleDate: '2023-01-01T08:00:00Z',
                                IsDeactivated: false,
                                CreatedAt: '2023-06-10T10:00:00Z',
                                BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/TwbATRACNCwWa6ZkuI8k.jpg',
                                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg'
                            },
                            ServiceType: {
                                Id: 3,
                                Name: 'Dịch vụ kiểm thử'
                            }
                        }
                    ]
                }; resolve(mockResponse);
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    // [POST] /Request/service
    addServiceRequest(requestData: any): Promise<any> {
        const Request = {
            ServiceRequest: requestData
        };
        console.log('request: ' + JSON.stringify(Request));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockResponse = {
                    Message: 'Yêu cầu dịch vụ đã được tạo thành công!',
                };
                resolve(mockResponse);
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    // [GET] /Major/services/{serviceId}
    getServiceDetails(serviceId: number): Promise<any> {
        console.log('serviceId: ' + serviceId);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockResponse = {
                    Service: {
                        Id: serviceId,
                        Name: 'Dịch vụ kiểm thử phần mềm',
                        FacilityMajorId: 1,
                        IsInitRequestDescriptionRequired: true,
                        RequestInitHintDescription: 'Nhập mô tả chi tiết về yêu cầu kiểm thử',
                        MainDescription: 'Dịch vụ kiểm thử và đảm bảo chất lượng phần mềm',
                        WorkShiftsDescription: 'Ca sáng, ca tối',
                        IsOpen: true,
                        CloseScheduleDate: null,
                        OpenScheduleDate: '2024-03-01T08:00:00Z',
                        ServiceTypeId: 3,
                        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg',
                        IsDeactivated: false,
                        CreatedAt: '2023-12-01T10:00:00Z'
                    },
                    Major: {
                        Id: 1,
                        Name: 'Kiểm thử phần mềm',
                        MainDescription: 'Kiểm tra chất lượng phần mềm',
                        WorkShiftsDescription: 'Ca sáng, ca chiều',
                        FacilityMajorTypeId: 2,
                        FacilityId: 5,
                        IsOpen: true,
                        CloseScheduleDate: null,
                        OpenScheduleDate: '2023-01-01T08:00:00Z',
                        IsDeactivated: false,
                        CreatedAt: '2023-06-10T10:00:00Z',
                        BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_covers/TwbATRACNCwWa6ZkuI8k.jpg',
                        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-tnhh-quoc-te-unilever-viet-nam-5d6f6b70c381c.jpg'
                    },
                    ServiceType: {
                        Id: 3,
                        Name: 'Dịch vụ kiểm thử'
                    }
                };
                resolve(mockResponse);
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    // [POST] /Major/services/major/{majorId}
    addServiceToMajor(majorId: number, serviceData: any): Promise<any> {
        const Request = {
            Service: serviceData
        };
        console.log('majorId: ' + majorId);
        console.log('request: ' + JSON.stringify(Request));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const newService = {
                    message: "Success."
                };
                resolve({ message: 'Thêm service thành công!', service: newService });
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    // [GET] /Major/services/serviceTypes
    getServiceTypes(): Promise<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockServiceTypes = {
                    ServiceTypes: [
                        { Id: 1, Name: 'Bảo trì' },
                        { Id: 2, Name: 'Hỗ trợ kỹ thuật' },
                        { Id: 3, Name: 'Tư vấn' },
                        { Id: 4, Name: 'Nâng cấp hệ thống' }
                    ]
                };
                resolve(mockServiceTypes);
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    // [GET] /Major/services/{serviceId}/availability
    getServiceAvailability(serviceId: number): Promise<any> {
        console.log('serviceId: ' + serviceId);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const mockServiceAvailability = {
                    Schedules: [
                        {
                            Schedule: {
                                ServiceId: serviceId,
                                DayOfWeek: 'Thứ Hai',
                                StartRequestableTime: '08:00',
                                EndRequestableTime: '17:00'
                            }
                        },
                        {
                            Schedule: {
                                ServiceId: serviceId,
                                DayOfWeek: 'Thứ Ba',
                                StartRequestableTime: '09:00',
                                EndRequestableTime: '18:00'
                            }
                        },
                        {
                            Schedule: {
                                ServiceId: serviceId,
                                DayOfWeek: 'Thứ Tư',
                                StartRequestableTime: '08:30',
                                EndRequestableTime: '16:30'
                            }
                        }
                    ]
                };
                resolve(mockServiceAvailability);
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    // [PUT] /Major/services/{serviceId}
    updateService(serviceId: number, serviceData: any): Promise<any> {
        const Request = {
            Service: serviceData
        };
        console.log('serviceId: ' + serviceId);
        console.log('request: ' + JSON.stringify(Request));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const updatedService = {
                    message: "Success."
                };
                resolve({ message: 'Cập nhật service thành công!', service: updatedService });
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    // [POST] /Major/services/{serviceId}/add-availability
    addAvailability(serviceId: number, availabilityData: any): Promise<any> {
        console.log('serviceId: ' + serviceId);
        console.log('request: ' + JSON.stringify(availabilityData));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const updatedService = {
                    message: "Success."
                };
                resolve({ message: 'Thêm Availability thành công!', updatedService });
            }, 1000); // Giả lập API delay 1 giây
        });
    }

    getBookableSchedules(serviceId: number): Promise<any> {
        console.log(serviceId);
        return new Promise((resolve) => {
            setTimeout(() => {
                const today = new Date();
                const schedules = [];

                for (let i = 0; i < 14; i++) {
                    const date = new Date();
                    date.setDate(today.getDate() + i);

                    schedules.push({
                        Date: date.toISOString().split('T')[0], // YYYY-MM-DD format
                        Times: ['08:00', '10:00', '14:00', '16:00'] // Giả lập 4 slot mỗi ngày
                    });
                }

                resolve({ Schedules: schedules });
            }, 1000); // Chờ 1 giây
        });
    }

    // [POST] /Major/services/{serviceId}/delete-availability
    deleteAvailability(serviceId: number, availabilityData: any): Promise<any> {
        const Request = {
            Schedule: availabilityData
        };
        console.log('serviceId: ' + serviceId);
        console.log('request: ' + JSON.stringify(Request));
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ message: 'Xóa Availability thành công!' });
            }, 1000); // Giả lập API delay 1 giây
        });
    }
}
