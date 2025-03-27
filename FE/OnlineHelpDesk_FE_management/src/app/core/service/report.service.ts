import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reports = [
    {
      Report: {
        Id: 1,
        Content: 'Report về sự cố kỹ thuật',
        IsResolved: false,
        ReportTypeId: 1,
        AccountId: 2,
        FacilityMajorId: 1,
        CreatedAt: '2024-03-20T10:00:00Z'
      },
      ReportType: {
        Id: 1,
        Name: 'Technical Issue'
      },
      Account: {
        FullName: 'John Doe',
        Email: 'john.doe@example.com',
        Password: 'hashed_password',
        Address: '123 Street, City',
        DateOfBirth: '1990-01-15',
        Phone: '1234567890',
        RoleId: 2,
        JobTypeId: 3,
        ImageUrl: 'https://example.com/avatar.jpg',
        IsDeactivated: false,
        CreatedAt: '2023-06-10'
      },
      Major: {
        Id: 1,
        Name: 'IT Department',
        MainDescription: 'Handles IT issues',
        WorkShiftsDescription: 'Day & Night shifts',
        FacilityMajorTypeId: 1,
        FacilityId: 1,
        IsOpen: true,
        CloseScheduleDate: '2024-03-01',
        OpenScheduleDate: '2024-03-01',
        IsDeactivated: false,
        Created: '2023-01-01',
        BackgroundImageUrl: 'https://example.com/background.jpg',
        ImageUrl: 'https://example.com/logo.jpg'
      },
      MajorType: {
        Id: 1,
        Name: 'Technical'
      }
    },
    {
      Report: {
        Id: 2,
        Content: 'Báo cáo về tình trạng vệ sinh',
        IsResolved: true,
        ReportTypeId: 2,
        AccountId: 3,
        FacilityMajorId: 2,
        CreatedAt: '2024-03-21T08:30:00Z'
      },
      ReportType: {
        Id: 2,
        Name: 'Cleanliness Issue'
      },
      Account: {
        FullName: 'Jane Smith',
        Email: 'jane.smith@example.com',
        Password: 'hashed_password_2',
        Address: '456 Avenue, City',
        DateOfBirth: '1985-05-20',
        Phone: '0987654321',
        RoleId: 3,
        JobTypeId: 4,
        ImageUrl: 'https://example.com/avatar2.jpg',
        IsDeactivated: false,
        CreatedAt: '2022-11-15'
      },
      Major: {
        Id: 2,
        Name: 'Facility Management',
        MainDescription: 'Manages facility issues',
        WorkShiftsDescription: 'Morning & Evening shifts',
        FacilityMajorTypeId: 2,
        FacilityId: 2,
        IsOpen: true,
        CloseScheduleDate: '2024-04-01',
        OpenScheduleDate: '2024-04-01',
        IsDeactivated: false,
        Created: '2022-03-15',
        BackgroundImageUrl: 'https://example.com/bg2.jpg',
        ImageUrl: 'https://example.com/logo2.jpg'
      },
      MajorType: {
        Id: 2,
        Name: 'Facility'
      }
    }
  ];

  constructor() { }

  // ✅ Lấy danh sách tất cả Reports
  getAllReports(): Promise<any[]> {
    return Promise.resolve(this.reports);
  }
  
  // ✅ Lấy danh sách tất cả Reports
  getAllReportsByAccountId(id: number): Promise<any[]> {
    return Promise.resolve(this.reports);
  }

  // ✅ Lấy Report theo ID
  findById(reportId: number): Promise<any | null> {
    const report = this.reports.find(r => r.Report.Id === reportId);
    return Promise.resolve(report || null);
  }

  // ✅ Lọc Reports theo loại ReportType
  getReportsByType(reportTypeId: number): Promise<any[]> {
    return Promise.resolve(this.reports.filter(r => r.Report.ReportTypeId === reportTypeId));
  }
  // ✅ Lọc Reports theo FacilityMajor
  getReportsByFacilityMajor(facilityMajorId: number): Promise<any[]> {
    return Promise.resolve(this.reports.filter(r => r.Report.FacilityMajorId === facilityMajorId));
  }
}
