import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  private feedbacks: any[] = [
    {
      Account: {
        Id: 1,
        Email: 'john.doe@example.com',
        Phone: '123456789',
        FullName: 'John Doe',
        RoleId: 2,
        JobTypeId: 1,
        ImageUrl: 'https://example.com/user1.jpg',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
      Major: {
        Id: 1,
        Name: 'Computer Science',
        MainDescription: 'Handles all CS-related subjects',
        WorkShiftsDescription: 'Morning and Evening Shifts',
        FacilityMajorTypeId: 2,
        FacilityId: 1,
        IsOpen: true,
        CloseScheduleDate: null,
        OpenScheduleDate: new Date(2024, 5, 15).toISOString(),
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
        BackgroundImageUrl: 'https://example.com/bg1.jpg',
        ImageUrl: 'https://example.com/logo1.jpg',
      },
      MajorType: {
        Id: 1,
        Name: 'Technology',
      },
      Feedback: {
        Id: 101,
        AccountId: 1,
        FacilityMajorId: 1,
        Content: 'Great learning environment!',
        Rate: 5,
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
    },
    {
      Account: {
        Id: 2,
        Email: 'jane.smith@example.com',
        Phone: '987654321',
        FullName: 'Jane Smith',
        RoleId: 3,
        JobTypeId: 2,
        ImageUrl: 'https://example.com/user2.jpg',
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
      Major: {
        Id: 2,
        Name: 'Mechanical Engineering',
        MainDescription: 'Focuses on mechanical systems',
        WorkShiftsDescription: 'Day Shifts',
        FacilityMajorTypeId: 3,
        FacilityId: 2,
        IsOpen: false,
        CloseScheduleDate: new Date(2024, 8, 1).toISOString(),
        OpenScheduleDate: new Date(2024, 9, 1).toISOString(),
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
        BackgroundImageUrl: 'https://example.com/bg2.jpg',
        ImageUrl: 'https://example.com/logo2.jpg',
      },
      MajorType: {
        Id: 2,
        Name: 'Engineering',
      },
      Feedback: {
        Id: 102,
        AccountId: 2,
        FacilityMajorId: 2,
        Content: 'The facilities need improvement.',
        Rate: 3,
        IsDeactivated: false,
        CreatedAt: new Date().toISOString(),
      },
    },
  ];

  // ✅ Lấy danh sách tất cả feedbacks
  getFeedbacks(): Promise<any[]> {
    return Promise.resolve(this.feedbacks);
  }

  // ✅ Lấy danh sách tất cả feedbacks
  getFeedbacksByAccountId(id: number): Promise<any[]> {
    return Promise.resolve(this.feedbacks);
  }

  // ✅ Tìm feedback theo ID
  findById(id: number): Promise<any | null> {
    const feedback = this.feedbacks.find(fb => fb.Feedback.Id === id);
    return Promise.resolve(feedback || null);
  }

  // ✅ Lọc feedback theo Major ID
  getFeedbacksByMajor(majorId: number): Promise<any[]> {
    const filteredFeedbacks = this.feedbacks.filter(fb => fb.Major.Id === majorId);
    return Promise.resolve(filteredFeedbacks);
  }
}
