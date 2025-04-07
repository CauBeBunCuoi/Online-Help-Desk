import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { loginRequiredApi, publicApi } from '../../api/instance/axiosInstance';

const API_PREFIX = '/Facility/items';

@Injectable({
  providedIn: 'root'
})
export class FacilityItemService {
  // [GET] /Facility/items
  getItems(): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX
    }, "Get Items");
  }

  // [POST] /Facility/items
  addItem(newItem: any): Promise<any> {
    const Request = {
      Item: newItem
    }
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX,
      data: Request,
    }, "Add Item");
  }

  // [GET] /Facility/items/{itemId}
  getItemById(itemId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/${itemId}`,
    }, "Get Items");
  }

  // [PUT] /Facility/items/{itemId}
  updateItem(itemId: number, updatedItem: any): Promise<any> {
    const Request = {
      Item: updatedItem
    }
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + `/${itemId}`,
      data: Request,
    }, "Update Item");
  }

  // [GET] /Facility/items/{itemId}/majors
  getItemMajors(itemId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/${itemId}` + '/majors',
    }, "Get Item Assignments");
  }

  // [PUT] /Facility/items/{itemId}/add
  increaseItemCount(itemId: number, count: number): Promise<any> {
    const Request = {
      Count: count
    }
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + `/${itemId}` + '/add',
      data: Request,
    }, "Update Item Add");
  }

  // [PUT] /Facility/items/{itemId}/subtract
  decreaseItemCount(itemId: number, count: number): Promise<any> {
    const Request = {
      Count: count
    }
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + `/${itemId}` + '/subtract',
      data: Request,
    }, "Update Item Remove");
  }

  // [PUT] /Facility/items/{itemId}/majors
  assignItemToMajors(itemId: number, count: number, majorIds: number[]): Promise<any> {
    const Request = {
      Count: count,
      MajorIds: majorIds,
    }
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX + `/${itemId}` + '/majors',
      data: Request,
    }, "Update Item Remove");
  }

  // delete
}
