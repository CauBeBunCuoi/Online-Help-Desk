import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemAssignmentService {
  constructor() {}

  // Dữ liệu giả lập FacilityItemAssignments
  private mockFacilityItemAssignments = {
    FacilityItemAssignments: [
      {
        FacilityItemAssignment: {
          FacilityItemId: 1,
          FacilitymajorId: 101,
          ItemCount: 5,
          Created: '2025-03-24T10:00:00Z'
        },
        Major: {
          Id: 101,
          Name: 'Computer Science',
          MainDescription: 'Study of computation and programming',
          WorkShifstDescription: 'Day & Night shifts',
          FacilityMajorTypeId: 1,
          FacilityId: 1,
          IsOpen: true,
          CloseScheduleDate: '2025-06-30',
          OpenScheduleDate: '2025-01-01',
          IsDeactivated: false,
          CreatedAt: '2025-01-15T08:00:00Z',
          BackgroundImageUrl: 'https://example.com/bg1.jpg',
          ImageUrl: 'https://example.com/img1.jpg'
        }
      },
      {
        FacilityItemAssignment: {
          FacilityItemId: 2,
          FacilitymajorId: 102,
          ItemCount: 3,
          Created: '2025-03-24T11:00:00Z'
        },
        Major: {
          Id: 102,
          Name: 'Mechanical Engineering',
          MainDescription: 'Design and production of machinery',
          WorkShifstDescription: 'Morning shifts',
          FacilityMajorTypeId: 2,
          FacilityId: 1,
          IsOpen: false,
          CloseScheduleDate: '2025-05-30',
          OpenScheduleDate: '2025-02-01',
          IsDeactivated: false,
          CreatedAt: '2025-01-20T09:00:00Z',
          BackgroundImageUrl: 'https://example.com/bg2.jpg',
          ImageUrl: 'https://example.com/img2.jpg'
        }
      },
      {
        FacilityItemAssignment: {
          FacilityItemId: 1,
          FacilitymajorId: 103,
          ItemCount: 2,
          Created: '2025-03-24T12:00:00Z'
        },
        Major: {
          Id: 103,
          Name: 'Electrical Engineering',
          MainDescription: 'Power systems and electronics',
          WorkShifstDescription: 'Evening shifts',
          FacilityMajorTypeId: 3,
          FacilityId: 2,
          IsOpen: true,
          CloseScheduleDate: '2025-07-15',
          OpenScheduleDate: '2025-03-01',
          IsDeactivated: false,
          CreatedAt: '2025-02-10T10:00:00Z',
          BackgroundImageUrl: 'https://example.com/bg3.jpg',
          ImageUrl: 'https://example.com/img3.jpg'
        }
      }
    ]
  };

  // Lấy tất cả FacilityItemAssignments
  getFacilityItemAssignments(facilityId: number): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.mockFacilityItemAssignments);
      }, 1000);
    });
  }

  // Lấy danh sách Major theo FacilityItemId
  getMajorsByFacilityItemId(facilityItemId: number): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const majors = this.mockFacilityItemAssignments.FacilityItemAssignments
          .filter(item => item.FacilityItemAssignment.FacilityItemId === facilityItemId)
          .map(item => item.Major);
        resolve(majors);
      }, 1000);
    });
  }
}
