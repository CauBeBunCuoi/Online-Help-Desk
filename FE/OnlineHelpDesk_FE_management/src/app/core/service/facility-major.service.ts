import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacilityMajorService {
  private facilityMajors: any[] = [
    {
      id: 1,
      name: 'Computer Science Department',
      logo: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      background: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
      mainDescription: 'Handles all CS-related subjects',
      workShifstDescription: 'Morning and Evening Shifts',
      isOpen: true,
      closeScheduleDate:  new Date(2024, 8, 1),
      openScheduleDate: new Date(2024, 9, 15), // Giả lập ngày mở
      facilityMajorTypeId: 2, // Giả lập loại FacilityMajor
      facilityId: 1, // Giả lập Facility liên kết
      isDeactivated: false,
      createdAt: new Date()
    },
    {
      id: 2,
      name: 'Mechanical Engineering',
      logo: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      background: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/v4/image/normal-company/cover/company_cover_1.jpg',
      mainDescription: 'Focuses on mechanical systems',
      workShifstDescription: 'Day Shifts',
      isOpen: false,
      closeScheduleDate: new Date(2024, 8, 1), // Giả lập ngày đóng
      openScheduleDate:  new Date(2024, 9, 1),
      facilityMajorTypeId: 3, // Giả lập loại FacilityMajor
      facilityId: 2, // Giả lập Facility liên kết
      isDeactivated: false,
      createdAt: new Date()
    }
  ];

  // ✅ Lấy danh sách FacilityMajor
  getFacilityMajors(): Promise<any[]> {
    return Promise.resolve(this.facilityMajors);
  }

  // ✅ Tìm FacilityMajor theo ID
  findById(id: number): Promise<any | null> {
    const facilityMajor = this.facilityMajors.find(fm => fm.id === id);
    return Promise.resolve(facilityMajor || null);
  }
}
