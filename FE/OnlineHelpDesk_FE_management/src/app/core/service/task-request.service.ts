import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TaskRequestService {
    private taskRequests: any[] = [
        {
            TaskRequest: {
                Id: 1,
                Description: 'Fix projector in Room 101',
                RequesterId: 2,
                FacilityMajorId: 1,
                CancelReason: 'Làm ăn như c.. ch.',
                RequestStatusId: 1,
                CreatedAt: new Date().toISOString(),
                UpdatedAt: new Date().toISOString()
            },
            RequestStatus: {
                Id: 1,
                Name: 'Pending'
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
                ImageUrl: 'https://example.com/logo1.jpg'
            }
        },
        {
            TaskRequest: {
                Id: 2,
                Description: 'Repair air conditioner in Lab 3',
                RequesterId: 3,
                FacilityMajorId: 2,
                CancelReason: null,
                RequestStatusId: 2,
                CreatedAt: new Date().toISOString(),
                UpdatedAt: new Date().toISOString()
            },
            RequestStatus: {
                Id: 2,
                Name: 'In Progress'
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
                ImageUrl: 'https://example.com/logo2.jpg'
            }
        }
    ];

    // ✅ Lấy danh sách TaskRequests
    getTaskRequests(): Promise<any[]> {
        return Promise.resolve(this.taskRequests);
    }

    // ✅ Lấy danh sách TaskRequests
    getTaskRequestsByAccountId(id: number): Promise<any[]> {
        return Promise.resolve(this.taskRequests);
    }
    // ✅ Lấy danh sách TaskRequests
    getTaskRequestsByMajorId(id: number): Promise<any[]> {
        return Promise.resolve(this.taskRequests);
    }

    // ✅ Tìm TaskRequest theo ID
    findById(id: number): Promise<any | null> {
        const task = this.taskRequests.find(tr => tr.TaskRequest.Id === id);
        return Promise.resolve(task || null);
    }
}
