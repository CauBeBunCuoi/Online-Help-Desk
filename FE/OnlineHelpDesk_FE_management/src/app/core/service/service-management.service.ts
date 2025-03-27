import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServiceManagementService {
    private services = [
        {
            Service: {
                Id: 1, // ✅ Thêm ID để dễ tìm kiếm
                Name: 'IT Support',
                FacilityMajorId: 1,
                IsInitRequestDescriptionRequired: true,
                RequestInitHintDescription: 'Provide details about the issue',
                MainDescription: 'Technical support for IT-related problems',
                WorkShiftsDescription: 'Available 24/7',
                IsOpen: true,
                CloseScheduleDate: '2024-01-01',
                OpenScheduleDate: '2024-01-01',
                ServiceTypeId: 1,
                IsDeactivated: false,
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
                CreatedAt: '2024-01-01'
            },
            Major: {
                Id: 1,
                Name: 'Computer Science',
                MainDescription: 'Handles software & hardware issues',
                WorkShiftsDescription: 'Day & Night shifts',
                FacilityMajorTypeId: 1,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '2024-01-01',
                OpenScheduleDate: '2024-01-01',
                IsDeactivated: false,
                CreatedAt: '2024-01-01',
                BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg'
            },
            ServiceType: {
                Id: 1,
                Name: 'Support'
            }
        },
        {
            Service: {
                Id: 2,
                Name: 'Maintenance Request',
                FacilityMajorId: 2,
                IsInitRequestDescriptionRequired: false,
                RequestInitHintDescription: '',
                MainDescription: 'Request for facility maintenance',
                WorkShiftsDescription: 'Weekdays 8 AM - 6 PM',
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '2024-01-01',
                ServiceTypeId: 2,
                IsDeactivated: false,
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
                CreatedAt: '2024-01-01'
            },
            Major: {
                Id: 2,
                Name: 'Mechanical Engineering',
                MainDescription: 'Maintenance of machines & equipment',
                WorkShiftsDescription: 'Morning shifts',
                FacilityMajorTypeId: 2,
                FacilityId: 1,
                IsOpen: true,
                CloseScheduleDate: '',
                OpenScheduleDate: '2024-01-01',
                IsDeactivated: false,
                CreatedAt: '2024-01-01',
                BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
                ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg'
            },
            ServiceType: {
                Id: 2,
                Name: 'Maintenance'
            }
        }
    ];

    constructor() { }

    // ✅ Lấy danh sách tất cả Services
    getAllServices(): Promise<any[]> {
        return Promise.resolve(this.services);
    }

    // ✅ Lấy danh sách tất cả Services
    getAllServicesByAccountId(id: number): Promise<any[]> {
        return Promise.resolve(this.services);
    }

    // ✅ Tìm Service theo ID của FacilityMajor
    getServicesByFacilityMajor(FacilityMajorId: number): Promise<any[]> {
        return Promise.resolve(
            this.services.filter(service => service.Service.FacilityMajorId === FacilityMajorId)
        );
    }

    // ✅ Tìm Service theo ID
    findById(serviceId: number): Promise<any | null> {
        const service = this.services.find(s => s.Service.Id === serviceId);
        return Promise.resolve(service || null);
    }
}
