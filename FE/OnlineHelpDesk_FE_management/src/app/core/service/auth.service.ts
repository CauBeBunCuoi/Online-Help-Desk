import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { loginRequiredApi } from '../../api/instance/axiosInstance';

const API_PREFIX = '/User/accounts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // [GET] /User/accounts/staff
  getStaffs(): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/staff',
    }, "Get Staff");
  }

  // [POST] User/accounts/staff
  addStaff(staffData: any): Promise<any> {
    const Request = {
      Staff: staffData
    };
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX + '/staff',
      data: Request,
    }, "Add Staff");
  }

  // [GET] /User/accounts/staff/{accountId}
  getStaffById(accountId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/staff' + '/' + accountId,
    }, "Get Staff By Id");
  }

  // [PUT] /User/accounts/staff/{accountId}
  updateStaff(accountId: number, updatedData: any): Promise<any> {
    const Request = {
      Staff: updatedData
    }
    console.log('request: ' + JSON.stringify(Request));
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + '/staff' + '/' + accountId,
      data: Request,
    }, "Get Staff By Id");
  }

  // [GET] /User/accounts/member
  getMembers(): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/member',
    }, "Get member");
  }

  // [POST] User/accounts/member
  addMember(memberData: any): Promise<any> {
    const Request = {
      Member: memberData
    }
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX + '/member',
      data: Request,
    }, "Add Member");
  }

  // [GET] /User/accounts/member/{accountId}
  getMemnerById(accountId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/member' + '/' + accountId,
    }, "Get Member By Id");
  }

  // [PUT] /User/accounts/member/{accountId}
  updateMember(accountId: number, updatedData: any): Promise<any> {
    const Request = {
      Member: updatedData
    }
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + '/member' + '/' + accountId,
      data: Request,
    }, "Update Member By Id");
  }

  // [GET] /User/accounts/roles
  getRoles(): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/roles',
    }, "Get roles");
  }

  // [GET] /User/accounts/jobTypes
  getJobTypes(): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/jobTypes',
    }, "Get jobTypes");
  }
  
  // [DELETE] /User/accounts/staff/{accountId}
  deactivateStaff(accountId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'delete',
      url: API_PREFIX + '/staff' + '/' + accountId,
    }, "Delete Staff By Id");
  }

  // [DELETE] /User/accounts/member/{accountId}
  deactivatMember(accountId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'delete',
      url: API_PREFIX + '/member' + '/' + accountId,
    }, "Delete Member By Id");
  }
}
