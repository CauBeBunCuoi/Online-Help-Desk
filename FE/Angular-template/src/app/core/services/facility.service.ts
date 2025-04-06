import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  // [GET] /Facility/facilities
  getFacilities(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = {
          Facilities: [
            {
              Facility: {
                Id: 1,
                Name: 'Phòng họp lớn',
                Description: 'Phòng họp sức chứa 50 người, trang bị máy chiếu.',
                ImageUrl: 'https://example.com/meeting-room.jpg',
                IsDeactivated: false,
                CreatedAt: '2024-01-01T08:00:00Z'
              }
            },
            {
              Facility: {
                Id: 2,
                Name: 'Khu thể thao',
                Description: 'Khu vực thể dục thể thao dành cho nhân viên.',
                ImageUrl: 'https://example.com/sport-area.jpg',
                IsDeactivated: false,
                CreatedAt: '2024-02-15T10:30:00Z'
              }
            },
            {
              Facility: {
                Id: 3,
                Name: 'Bãi đỗ xe',
                Description: 'Bãi đỗ xe thông minh với sức chứa 200 xe.',
                ImageUrl: 'https://example.com/parking.jpg',
                IsDeactivated: true,
                CreatedAt: '2023-12-20T14:00:00Z'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [POST] /Facility/facilities
  addFacility(facilityData: any): Promise<any> {
    const Request = {
      Facility: facilityData
    }
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = {
          message: "Success."
        };
        console.log('✅ Facility added:', mockResponse);
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Facility/facilities/{facilityId}
  getFacilityById(facilityId: number): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = {
          Facility: {
            Id: facilityId,
            Name: 'Trung tâm thể thao',
            Description: 'Trung tâm thể thao hiện đại với nhiều tiện ích.',
            ImageUrl: 'https://example.com/facility.jpg',
            IsDeactivated: false,
            CreatedAt: new Date().toISOString()
          },
          Majors: [
            {
              Id: 1,
              Name: 'Bơi lội',
              MainDescription: 'Khu vực bơi lội tiêu chuẩn quốc tế.',
              WorkShiftsDescription: 'Làm việc theo ca sáng, chiều, tối.',
              FacilityMajorTypeId: 101,
              FacilityId: facilityId,
              IsOpen: true,
              CloseScheduleDate: '2025-12-31T23:59:59Z',
              OpenScheduleDate: '2025-01-01T00:00:00Z',
              IsDeactivated: false,
              CreatedAt: new Date().toISOString(),
              BackgroundImageUrl: 'https://example.com/swimming-bg.jpg',
              ImageUrl: 'https://example.com/swimming.jpg'
            },
            {
              Id: 2,
              Name: 'Gym & Fitness',
              MainDescription: 'Phòng gym với trang thiết bị hiện đại.',
              WorkShiftsDescription: 'Hoạt động 24/7 với đội ngũ PT chuyên nghiệp.',
              FacilityMajorTypeId: 102,
              FacilityId: facilityId,
              IsOpen: true,
              CloseScheduleDate: '2025-12-31T23:59:59Z',
              OpenScheduleDate: '2025-01-01T00:00:00Z',
              IsDeactivated: false,
              CreatedAt: new Date().toISOString(),
              BackgroundImageUrl: 'https://example.com/gym-bg.jpg',
              ImageUrl: 'https://example.com/gym.jpg'
            }
          ]
        };
        console.log(`✅ Facility ${facilityId} fetched:`, mockResponse);
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /Facility/facilities/{facilityId}
  updateFacility(facilityId: number, updatedData: { Name: string; Description: string; Image: string }): Promise<any> {
    const Request = {
      Facility: updatedData
    }
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = {
          message: "Success."
        };

        console.log(`✅ Facility ${facilityId} updated:`, mockResponse);
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [DELETE] /Facility/facilities/{facilityId}
}
