import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacilityItemService {
  private items: any[] = [
    {
      Item: {
        Id: 1,
        Name: 'Projector',
        InUseCount: 2,
        Count: 10,
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }
    },
    {
      Item: {
        Id: 2,
        Name: 'Whiteboard',
        InUseCount: 1,
        Count: 5,
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }
    },
    {
      Item: {
        Id: 2,
        Name: 'Whiteboard',
        InUseCount: 1,
        Count: 5,
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }
    },
    {
      Item: {
        Id: 2,
        Name: 'Whiteboard',
        InUseCount: 1,
        Count: 5,
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }
    },
    {
      Item: {
        Id: 2,
        Name: 'Whiteboard',
        InUseCount: 1,
        Count: 5,
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }
    },
    {
      Item: {
        Id: 2,
        Name: 'Whiteboard',
        InUseCount: 1,
        Count: 5,
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }
    },
    {
      Item: {
        Id: 2,
        Name: 'Whiteboard',
        InUseCount: 1,
        Count: 5,
        ImageUrl: 'https://cdn-new.topcv.vn/unsafe/140x/https://static.topcv.vn/company_logos/cong-ty-co-phan-giao-duc-dao-tao-imap-viet-nam-5da97e1f22484.jpg',
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }
    },
  ];

  // Dữ liệu giả lập FacilityItemAssignments
  private facilityItemAssignments = [
    {
      FacilityItemAssignment: {
        FacilityItemId: 1,
        FacilityMajorId: 101,
        ItemCount: 5,
        Created: '2025-03-24T10:00:00Z'
      },
      Major: {
        Id: 101,
        Name: 'Computer Science',
        MainDescription: 'Study of computation and programming',
        WorkShiftsDescription: 'Day & Night shifts',
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
        FacilityMajorId: 102,
        ItemCount: 3,
        Created: '2025-03-24T11:00:00Z'
      },
      Major: {
        Id: 102,
        Name: 'Mechanical Engineering',
        MainDescription: 'Design and production of machinery',
        WorkShiftsDescription: 'Morning shifts',
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
        FacilityMajorId: 103,
        ItemCount: 2,
        Created: '2025-03-24T12:00:00Z'
      },
      Major: {
        Id: 103,
        Name: 'Electrical Engineering',
        MainDescription: 'Power systems and electronics',
        WorkShiftsDescription: 'Evening shifts',
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
  ];

  // ✅ Lấy danh sách tất cả Items
  getItems(): Promise<any[]> {
    return Promise.resolve(this.items);
  }

  findById(id: number): Promise<any | null> {
    const item = this.items.find(item => item.Item.Id === id);
    return Promise.resolve(item || null);
  }

  // Lấy danh sách Major theo FacilityItemId
  getMajorsByFacilityItemId(facilityItemId: number): Promise<any[]> {
    return Promise.resolve(
      this.facilityItemAssignments.filter(i => i.FacilityItemAssignment.FacilityItemId === facilityItemId)
    );
  }

  // ✅ Thêm mới Item
  addItem(newItem: any): Promise<void> {
    const itemWithId = {
      Item: {
        ...newItem,
        Id: this.items.length + 1, // Giả lập ID tự tăng
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }
    };
    this.items.push(itemWithId);
    return Promise.resolve();
  }

  // ✅ Cập nhật Item theo ID
  updateItem(id: number, updatedItem: any): Promise<boolean> {
    const index = this.items.findIndex(it => it.Item.Id === id);
    if (index !== -1) {
      this.items[index].Item = {
        ...this.items[index].Item,
        ...updatedItem,
        UpdatedAt: new Date().toISOString()
      };
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  // ✅ Xóa Item theo ID
  deleteItem(id: number): Promise<boolean> {
    const initialLength = this.items.length;
    this.items = this.items.filter(it => it.Item.Id !== id);
    return Promise.resolve(this.items.length !== initialLength);
  }
}
