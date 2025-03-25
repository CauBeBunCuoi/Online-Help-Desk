import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MajorAssignmentService {

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

  // ✅ Lấy danh sách MajorAssignments
  getMajorAssignments(): Promise<any[]> {
    return Promise.resolve(this.majorAssignments);
  }

  // ✅ Lấy danh sách Major của một Staff
  getMajorAssignmentsByStaff(accountId: number): Promise<any[]> {
    return Promise.resolve(
      this.majorAssignments.filter(a => a.MajorAssignment.AccountId === accountId)
    );
  }

  // ✅ Lấy thông tin chi tiết Assignee trong một Major
  getMajorAssignmentDetail(accountId: number, majorId: number): Promise<any | null> {
    const assignment = this.majorAssignments.find(
      a => a.MajorAssignment.AccountId === accountId && a.Major.Id === majorId
    );
    return Promise.resolve(assignment || null);
  }


  //////////////////////////////// thuộc major assignment
  

  // ✅ Lấy danh sách tất cả Majors thuộc head đó
  getFacilityMajors(AccountId: number): Promise<any[]> {
    return Promise.resolve(this.majors);
  }

  // ✅ Lấy danh sách tất cả accounts staff
  getAccountStaffByMajorId(majorId: number): Promise<any[]> {
    return Promise.resolve(this.accounts);
  }
}
