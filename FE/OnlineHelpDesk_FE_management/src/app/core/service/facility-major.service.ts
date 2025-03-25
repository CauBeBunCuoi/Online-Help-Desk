import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacilityMajorService {
  private majors: any[] = [
    {
      Major: {
        Id: 1,
        Name: 'Computer Science',
        MainDescription: 'Handles all CS-related subjects',
        WorkShifstDescription: 'Morning and Evening Shifts',
        FacilityMajorTypeId: 2,
        FacilityId: 1,
        IsOpen: true,
        CloseScheduleDate: null,
        OpenScheduleDate: new Date(2024, 5, 15).toISOString(),
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
        BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
      },
      MajorType: {
        Id: 1,
        Name: 'Technology',
      },
      Facility: {
        Id: 1,
        Name: 'Tech Campus',
        Description: 'A hub for IT and engineering students',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
    },
    {
      Major: {
        Id: 2,
        Name: 'Mechanical Engineering',
        MainDescription: 'Focuses on mechanical systems',
        WorkShifstDescription: 'Day Shifts',
        FacilityMajorTypeId: 3,
        FacilityId: 2,
        IsOpen: false,
        CloseScheduleDate: new Date(2024, 8, 1).toISOString(),
        OpenScheduleDate: new Date(2024, 9, 1).toISOString(),
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
        BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
      },
      MajorType: {
        Id: 2,
        Name: 'Engineering',
      },
      Facility: {
        Id: 2,
        Name: 'Engineering Campus',
        Description: 'A place for mechanical and electrical studies',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
    },
    {
      Major: {
        Id: 3,
        Name: 'Computer Science',
        MainDescription: 'Handles all CS-related subjects',
        WorkShifstDescription: 'Morning and Evening Shifts',
        FacilityMajorTypeId: 2,
        FacilityId: 1,
        IsOpen: true,
        CloseScheduleDate: null,
        OpenScheduleDate: new Date(2024, 5, 15).toISOString(),
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
        BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
      },
      MajorType: {
        Id: 1,
        Name: 'Technology',
      },
      Facility: {
        Id: 1,
        Name: 'Tech Campus',
        Description: 'A hub for IT and engineering students',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
    },
    {
      Major: {
        Id: 4,
        Name: 'Computer Science',
        MainDescription: 'Handles all CS-related subjects',
        WorkShifstDescription: 'Morning and Evening Shifts',
        FacilityMajorTypeId: 2,
        FacilityId: 1,
        IsOpen: true,
        CloseScheduleDate: null,
        OpenScheduleDate: new Date(2024, 5, 15).toISOString(),
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
        BackgroundImageUrl: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
      },
      MajorType: {
        Id: 1,
        Name: 'Technology',
      },
      Facility: {
        Id: 1,
        Name: 'Tech Campus',
        Description: 'A hub for IT and engineering students',
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/van-phong-kotra-dai-su-quan-han-quoc-e6bad0ce387831cddaa5aa71c402723a-65b87e998bb76.jpg',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
    },
  ];

  private majorAssignments = [
    {
      MajorAssignment: {
        AccountId: 1,
        FacilityMajorId: 1,
        IsHead: true,
        WorkDescription: 'Lead IT Department'
      },
      Major: {
        Id: 1,
        Name: 'Computer Science',
        MainDescription: 'Handles software & hardware issues',
        WorkShifstDescription: 'Day & Night shifts',
        FacilityMajorTypeId: 1,
        FacilityId: 1,
        IsOpen: true,
        CloseScheduleDate: '',
        OpenScheduleDate: '2024-01-01',
        IsDeactivated: false,
        CreatedAt: '2024-01-01',
        BackgroundImageUrl: 'https://example.com/bg1.jpg',
        ImageUrl: 'https://example.com/logo1.jpg'
      }
    },
    {
      MajorAssignment: {
        AccountId: 2,
        FacilityMajorId: 2,
        IsHead: false,
        WorkDescription: 'Maintenance Engineer'
      },
      Major: {
        Id: 2,
        Name: 'Mechanical Engineering',
        MainDescription: 'Maintenance of machines & equipment',
        WorkShifstDescription: 'Morning shifts',
        FacilityMajorTypeId: 2,
        FacilityId: 1,
        IsOpen: true,
        CloseScheduleDate: '',
        OpenScheduleDate: '2024-01-01',
        IsDeactivated: false,
        CreatedAt: '2024-01-01',
        BackgroundImageUrl: 'https://example.com/bg2.jpg',
        ImageUrl: 'https://example.com/logo2.jpg'
      }
    }
  ];

  // ✅ Lấy danh sách tất cả Majors
  getFacilityMajors(): Promise<any[]> {
    return Promise.resolve(this.majors);
  }

  // ✅ Tìm Major theo ID
  findById(id: number): Promise<any | null> {
    const major = this.majors.find(m => m.Major.Id === id);
    return Promise.resolve(major || null);
  }
}
