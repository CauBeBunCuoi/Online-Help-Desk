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

  // ✅ Lấy danh sách tất cả Items
  getItems(): Promise<any[]> {
    return Promise.resolve(this.items);
  }

  // ✅ Tìm Item theo ID
  findById(id: number): Promise<any | null> {
    const item = this.items.find(it => it.Item.Id === id);
    return Promise.resolve(item || null);
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
