import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { loginRequiredApi } from '../../api/instance/axiosInstance';

const API_PREFIX = '/Major/assignments';

@Injectable({
  providedIn: 'root',
})
export class MajorAssignmentService {
  // [GET] /Major/assignments/major-head/{accountId}/staffs
  getMajorsForHead(accountId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/major-head/' + accountId + '/staffs',
    }, "Get Major By AccountId");
  }

  // [GET] /Major/assignments/major/{majorId}/staffs
  getAssigneesByMajor(majorId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/major/' + majorId + '/staffs',
    }, "Get Major By AccountId");
  }

  // [POST] /Major/assignments/staff/{accountId}
  addStaffMajors(accountId: number, majorIds: any): Promise<any> {
    const Request = {
      MajorIds: majorIds
    };
    console.log(Request);
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX + '/staff' + '/' + accountId,
      data: Request,
    }, "Add Major By AccountId");
  }

  // [GET] /Major/assignments/staff/{accountId}
  getMajorAssignmentsByStaff(accountId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/staff/' + accountId,
    }, "Get Major Assigned By AccountId");
  }

  // [PUT] /Major/assignments/staff/{accountId}/majors/{majorId}
  updateWorkDescription(accountId: number, majorId: number, workDescription: any): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + '/staff/' + accountId + '/majors' + `/${majorId}`,
      data: workDescription,
    }, "Update Work description"); // Giả lập độ trễ API 1 giây
  }

  // [DELETE] /Major/assignments/staff/{accountId}/majors/{majorId}
  deleteStaffFromMajor(accountId: number, majorId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'delete',
      url: API_PREFIX + '/staff' + '/' + accountId + '/majors/' + majorId,
    }, "Delete Major By AccountId");
  }

}
