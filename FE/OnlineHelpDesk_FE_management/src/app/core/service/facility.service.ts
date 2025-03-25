import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  private facilities: any[] = [
    {
      id: 1,
      name: 'Library',
      description: 'A place to read and study',
      logo: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      createdAt: new Date(),
      isDeactivated: false
    },
    {
      id: 2,
      name: 'Sports Complex',
      description: 'Facilities for indoor and outdoor sports',
      logo: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
      createdAt: new Date(),
      isDeactivated: false
    }
  ];

  // ✅ Lấy danh sách Facility
  getFacilities(): Promise<any[]> {
    return Promise.resolve(this.facilities);
  }

  // ✅ Tìm Facility theo ID
  findById(id: number): Promise<any | null> {
    const facility = this.facilities.find(f => f.id === id);
    return Promise.resolve(facility || null);
  }

  // ✅ Thêm mới Facility
  addFacility(facility: any): Promise<void> {
    const newFacility = { ...facility, id: this.facilities.length + 1, createdAt: new Date(), isDeactivated: false };
    this.facilities.push(newFacility);
    return Promise.resolve();
  }

  // ✅ Cập nhật Facility
  updateFacility(id: number, updatedFacility: any): Promise<void> {
    const index = this.facilities.findIndex(f => f.id === id);
    if (index !== -1) {
      this.facilities[index] = { ...this.facilities[index], ...updatedFacility };
    }
    return Promise.resolve();
  }

  // ✅ Deactivate Facility (Xóa mềm)
  deactivateFacility(id: number): Promise<void> {
    const facility = this.facilities.find(f => f.id === id);
    if (facility) {
      facility.isDeactivated = true;
    }
    return Promise.resolve();
  }

}
