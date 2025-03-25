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
        WorkShifstDescription: 'Day & Night shifts',
        FacilityMajorTypeId: 1,
        FacilityId: 1,
        IsOpen: true,
        CloseScheduleDate: null,
        OpenScheduleDate: '2024-03-01',
        IsDeactivated: false,
        Created: '2023-01-01',
        BackgroundImageUrl: 'https://example.com/background.jpg',
        ImageUrl: 'https://example.com/logo.jpg'
      }
    }
  ];

  constructor() { }

  // ✅ Lấy danh sách tất cả Reports
  getAllReports(): Promise<any[]> {
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
