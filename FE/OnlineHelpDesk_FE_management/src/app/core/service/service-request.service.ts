import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private serviceRequests = [
    {
      ServiceRequest: {
        Id: 1,
        ServiceId: 1,
        RequesterId: 101,
        RequestStatusId: 2,
        RequestInitDescription: 'Need urgent IT support',
        RequestResultDescription: '',
        AssignedAssigneeId: 202,
        TimeRequest: '14:30',
        DateRequest: '2024-03-25',
        IsCancelAutomatically: false,
        ProgressNote: 'Pending review',
        CancelReason: '',
        CreatedAt: '2024-03-24T12:00:00Z',
        UpdatedAt: '2024-03-24T15:00:00Z'
      },
      Requester: {
        Id: 101,
        FullName: 'John Doe',
        Email: 'john.doe@example.com',
        ImageUrl: '',
        DateOfBirth: '1990-01-01',
        Phone: '1234567890',
        Address: '123 Main St, City',
        IsDeactivated: false,
        CreatedAt: '2023-06-15T08:00:00Z'
      },
      RequestStatus: {
        Id: 2,
        Name: 'Pending'
      },
      Service: {
        Name: 'IT Support',
        FacilitymajorId: 1,
        IsInitRequestDescriptionRequired: true,
        RequestInitHintDescription: 'Provide details about the issue',
        MainDescription: 'Technical support for IT-related problems',
        WorkShiftsDescription: 'Available 24/7',
        IsOpen: true,
        CloseScheduleDate: '',
        OpenScheduleDate: '2024-01-01',
        ServiceTypeId: 1,
        IsDeactivated: false,
        CreatedAt: '2024-01-01'
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
        BackgroundImageUrl: '',
        ImageUrl: ''
      }
    }
  ];

  constructor() {}

  // ✅ Lấy danh sách tất cả ServiceRequests
  getAllServiceRequests(): Promise<any[]> {
    return Promise.resolve(this.serviceRequests);
  }

  // ✅ Tìm ServiceRequest theo ID
  findById(requestId: number): Promise<any | null> {
    const request = this.serviceRequests.find(sr => sr.ServiceRequest.Id === requestId);
    return Promise.resolve(request || null);
  }

  // ✅ Lọc ServiceRequest theo trạng thái
  getRequestsByStatus(statusId: number): Promise<any[]> {
    return Promise.resolve(this.serviceRequests.filter(sr => sr.ServiceRequest.RequestStatusId === statusId));
  }

  // ✅ Lọc ServiceRequest theo Service ID
  getRequestsByService(serviceId: number): Promise<any[]> {
    return Promise.resolve(this.serviceRequests.filter(sr => sr.ServiceRequest.ServiceId === serviceId));
  }

  // ✅ Lọc ServiceRequest theo người yêu cầu (Requester)
  getRequestsByRequester(requesterId: number): Promise<any[]> {
    return Promise.resolve(this.serviceRequests.filter(sr => sr.ServiceRequest.RequesterId === requesterId));
  }
}
