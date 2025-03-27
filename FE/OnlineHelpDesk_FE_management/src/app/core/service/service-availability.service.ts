import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceAvailabilityService {
  private schedules = [
    {
      Schedule: {
        ServiceId: 1,
        DayOfWeek: 'Monday',
        StartRequestableTime: '08:00',
        EndRequestableTime: '18:00'
      }
    },
    {
      Schedule: {
        ServiceId: 2,
        DayOfWeek: 'Tuesday',
        StartRequestableTime: '09:00',
        EndRequestableTime: '17:00'
      }
    }
  ];

  constructor() {}

  // ✅ Lấy danh sách toàn bộ lịch trình dịch vụ
  getAllSchedules(): Promise<any[]> {
    return Promise.resolve(this.schedules);
  }

  // ✅ Lấy lịch trình theo ServiceId
  getSchedulesByServiceId(serviceId: number): Promise<any[]> {
    return Promise.resolve(this.schedules.filter(s => s.Schedule.ServiceId === serviceId));
  }

  // ✅ Thêm lịch trình mới
  addSchedule(schedule: any): Promise<void> {
    this.schedules.push(schedule);
    return Promise.resolve();
  }

  // ✅ Cập nhật lịch trình theo ServiceId
  updateSchedule(serviceId: number, updatedSchedule: any): Promise<boolean> {
    const index = this.schedules.findIndex(s => s.Schedule.ServiceId === serviceId);
    if (index !== -1) {
      this.schedules[index].Schedule = updatedSchedule;
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  // ✅ Xóa lịch trình theo ServiceId
  deleteSchedule(serviceId: number): Promise<boolean> {
    const index = this.schedules.findIndex(s => s.Schedule.ServiceId === serviceId);
    if (index !== -1) {
      this.schedules.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
}
