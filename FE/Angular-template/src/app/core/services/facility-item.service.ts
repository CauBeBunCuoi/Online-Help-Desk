import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacilityItemService {
  // [GET] /Facility/items
  getItems(): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponse = {
          Items: [
            {
              Item: {
                Id: 1,
                Name: 'Ghế tập gym',
                InUseCount: 5,
                Count: 20,
                ImageUrl: 'https://example.com/ghe-tap-gym.jpg',
                CreatedAt: new Date('2024-01-01').toISOString(),
                UpdatedAt: new Date('2024-03-20').toISOString()
              }
            },
            {
              Item: {
                Id: 2,
                Name: 'Tạ đơn 10kg',
                InUseCount: 8,
                Count: 50,
                ImageUrl: 'https://example.com/ta-don-10kg.jpg',
                CreatedAt: new Date('2024-02-15').toISOString(),
                UpdatedAt: new Date('2024-03-22').toISOString()
              }
            }
          ]
        };
        console.log('Danh sách Items:', mockResponse);
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [POST] /Facility/items
  addItem(newItem: any): Promise<any> {
    const Request = {
      Item: newItem
    }
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve) => {
      setTimeout(() => {
        const createdItem = {
          message: "Success."
        };
        console.log('Item đã được thêm:', createdItem);
        resolve(createdItem);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Facility/items/{itemId}
  getItemById(itemId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!itemId || itemId < 0) {
          reject('❌ Item ID không hợp lệ');
          return;
        }
        const mockItem = {
          Item: {
            Id: itemId,
            Name: 'Máy chạy bộ',
            InUseCount: 2,
            Count: 10,
            ImageUrl: 'https://example.com/may-chay-bo.jpg',
            CreatedAt: new Date('2024-01-01T10:00:00Z').toISOString(),
            UpdatedAt: new Date().toISOString()
          }
        };
        console.log('Lấy Item thành công:', mockItem);
        resolve(mockItem);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /Facility/items/{itemId}
  updateItem(itemId: number, updatedItem: any): Promise<any> {
    const Request = {
      Item: updatedItem
    }
    console.log('itemId: ' + itemId);
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUpdatedItem = {
          message: "Success."
        };
        resolve(mockUpdatedItem);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [GET] /Facility/items/{itemId}/majors
  getItemMajors(itemId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockResponse = {
          FacilityItemAssignments: [
            {
              FacilityItemAssignment: {
                FacilityItemId: itemId,
                FacilityMajorId: 1,
                ItemCount: 10,
                Created: new Date('2024-01-01T12:00:00Z').toISOString()
              },
              Major: {
                Id: 1,
                Name: 'Khoa Công nghệ thông tin',
                MainDescription: 'Đào tạo chuyên ngành CNTT',
                WorkShiftsDescription: 'Sáng, Chiều',
                FacilityMajorTypeId: 2,
                FacilityId: 3,
                IsOpen: true,
                CloseScheduleDate: new Date('2024-12-31T23:59:59Z').toISOString(),
                OpenScheduleDate: new Date('2024-01-01T00:00:00Z').toISOString(),
                IsDeactivated: false,
                CreatedAt: new Date('2024-01-01T10:00:00Z').toISOString(),
                BackgroundImageUrl: 'https://example.com/cntt-bg.jpg',
                ImageUrl: 'https://example.com/cntt-logo.jpg'
              }
            },
            {
              FacilityItemAssignment: {
                FacilityItemId: itemId,
                FacilityMajorId: 2,
                ItemCount: 5,
                Created: new Date('2024-01-02T12:00:00Z').toISOString()
              },
              Major: {
                Id: 2,
                Name: 'Khoa Kỹ thuật cơ khí',
                MainDescription: 'Đào tạo ngành cơ khí chế tạo',
                WorkShiftsDescription: 'Sáng, Tối',
                FacilityMajorTypeId: 3,
                FacilityId: 3,
                IsOpen: true,
                CloseScheduleDate: new Date('2025-06-30T23:59:59Z').toISOString(),
                OpenScheduleDate: new Date('2024-03-01T00:00:00Z').toISOString(),
                IsDeactivated: false,
                CreatedAt: new Date('2024-03-01T10:00:00Z').toISOString(),
                BackgroundImageUrl: 'https://example.com/co-khi-bg.jpg',
                ImageUrl: 'https://example.com/co-khi-logo.jpg'
              }
            }
          ]
        };
        resolve(mockResponse);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /Facility/items/{itemId}/add
  increaseItemCount(itemId: number, count: number): Promise<any> {
    const Request = {
      Count: count
    }
    console.log('itemId: ' + itemId);
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUpdatedItem = {
          message: "Success."
        };

        console.log('Tăng số lượng Item thành công:', mockUpdatedItem);
        resolve(mockUpdatedItem);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // [PUT] /Facility/items/{itemId}/subtract
  decreaseItemCount(itemId: number, count: number): Promise<any> {
    const Request = {
      Count: count
    }
    console.log('itemId: ' + itemId);
    console.log('request: ' + JSON.stringify(Request));
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUpdatedItem = {
          message: "Success."
        };

        console.log('Tăng số lượng Item thành công:', mockUpdatedItem);
        resolve(mockUpdatedItem);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // 🔥 Phân bổ Item vào nhóm Major
  assignItemToMajors(itemId: number, count: number, majorIds: number[]): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!itemId || itemId < 0) {
          reject('❌ Item ID không hợp lệ');
          return;
        }

        if (!Array.isArray(majorIds) || majorIds.length === 0) {
          reject('❌ Danh sách Major ID không hợp lệ');
          return;
        }

        if (count <= 0) {
          reject('❌ Số lượng phải lớn hơn 0');
          return;
        }

        const mockAssignedData = {
          FacilityItemAssignments: majorIds.map(majorId => ({
            FacilityItemAssignment: {
              FacilityItemId: itemId,
              FacilityMajorId: majorId,
              ItemCount: count,
              Created: new Date().toISOString()
            },
            Major: {
              Id: majorId,
              Name: `Major ${majorId}`,
              MainDescription: 'Mô tả chính',
              WorkShiftsDescription: 'Mô tả ca làm việc',
              FacilityMajorTypeId: 1,
              FacilityId: 10,
              IsOpen: true,
              CloseScheduleDate: '2025-01-01T00:00:00Z',
              OpenScheduleDate: '2024-06-01T00:00:00Z',
              IsDeactivated: false,
              CreatedAt: new Date('2024-01-01T10:00:00Z').toISOString(),
              BackgroundImageUrl: 'https://example.com/bg.jpg',
              ImageUrl: 'https://example.com/image.jpg'
            }
          }))
        };

        console.log('Phân bổ Item vào Major thành công:', mockAssignedData);
        resolve(mockAssignedData);
      }, 1000); // Giả lập độ trễ API 1 giây
    });
  }

  // delete
}
