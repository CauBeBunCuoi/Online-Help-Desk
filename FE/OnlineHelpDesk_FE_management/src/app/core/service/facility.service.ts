import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  private facilities: any[] = [
    {
      Facility: {
        Id: 1,
        Name: 'Main Campus',
        Description: 'Main facility for all operations',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
    },
    {
      Facility: {
        Id: 2,
        Name: 'Engineering Hub',
        Description: 'Dedicated to engineering projects',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
    },
  ];

  private facilitiesById = [
    {
      Facility: {
        Id: 1,
        Name: 'Main Campus',
        Description: 'Main facility for all majors',
        ImageUrl: 'https://example.com/facility1.jpg',
        IsDeactivated: false,
        CreatedAt: '2024-01-01'
      },
      Majors: [
        {
          Id: 101,
          Name: 'Computer Science',
          MainDescription: 'Software & hardware education',
          WorkShiftsDescription: 'Day & Night shifts',
          FacilityMajorTypeId: 1,
          FacilityId: 1,
          IsOpen: true,
          CloseScheduleDate: '',
          OpenScheduleDate: '2024-01-01',
          IsDeactivated: false,
          CreatedAt: '2024-01-01',
          BackgroundImageUrl: 'https://example.com/cs-bg.jpg',
          ImageUrl: 'https://example.com/cs-logo.jpg'
        },
        {
          Id: 102,
          Name: 'Mechanical Engineering',
          MainDescription: 'Focus on machine learning & robotics',
          WorkShiftsDescription: 'Morning shifts',
          FacilityMajorTypeId: 2,
          FacilityId: 1,
          IsOpen: true,
          CloseScheduleDate: '',
          OpenScheduleDate: '2024-01-01',
          IsDeactivated: false,
          CreatedAt: '2024-01-01',
          BackgroundImageUrl: 'https://example.com/me-bg.jpg',
          ImageUrl: 'https://example.com/me-logo.jpg'
        }
      ]
    }
  ];
  // ✅ Lấy danh sách tất cả cơ sở
  getFacilities(): Promise<any[]> {
    return Promise.resolve(this.facilities);
  }
  // ✅ Lấy thông tin của một Facility theo ID
  getFacilityById(facilityId: number): Promise<any | null> {
    const facility = this.facilitiesById.find(f => f.Facility.Id === facilityId);
    return Promise.resolve(facility || null);
  }

  // ✅ Giả lập thêm cơ sở mới
  addFacility(newFacility: any): Promise<void> {
    newFacility.Facility.Id = this.facilities.length + 1; // Tạo ID tự động
    newFacility.Facility.CreatedAt = new Date().toISOString();
    this.facilities.push(newFacility);
    return Promise.resolve();
  }

  // ✅ Giả lập cập nhật cơ sở
  updateFacility(id: number, updatedData: any): Promise<boolean> {
    const index = this.facilities.findIndex(f => f.Facility.Id === id);
    if (index !== -1) {
      this.facilities[index].Facility = { ...this.facilities[index].Facility, ...updatedData };
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  // ✅ Giả lập xóa cơ sở
  deleteFacility(id: number): Promise<boolean> {
    const index = this.facilities.findIndex(f => f.Facility.Id === id);
    if (index !== -1) {
      this.facilities.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
