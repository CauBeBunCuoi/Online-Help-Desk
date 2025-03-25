import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FacilityItemService {
    private facilityItems: any[] = [
        {
            id: 1,
            name: 'Projector',
            image: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
            count: 5,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            name: 'Whiteboard',
            image: 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=',
            count: 10,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    // ✅ Lấy danh sách FacilityItem
    getFacilityItems(): Promise<any[]> {
        return Promise.resolve(this.facilityItems);
    }

    // ✅ Tìm FacilityItem theo ID
    findById(id: number): Promise<any | null> {
        const item = this.facilityItems.find(fi => fi.id === id);
        return Promise.resolve(item || null);
    }
}
