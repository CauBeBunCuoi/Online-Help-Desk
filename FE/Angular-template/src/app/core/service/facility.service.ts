import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { publicApi } from '../../api/instance/axiosInstance';

const API_PREFIX = '/Facility/facilities';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  // [GET] /Facility/facilities
  getFacilities(): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX
    }, "Get Facilities");
  }

  // [POST] /Facility/facilities
  addFacility(facilityData: any): Promise<any> {
    const Request = {
      Facility: facilityData
    }
    console.log('request: ' + JSON.stringify(Request));
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX,
      data: Request,
    }, "Add Facility");
  }

  // [GET] /Facility/facilities/{facilityId}
  getFacilityById(facilityId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/${facilityId}`,
    }, "Get Facility By ID");
  }

  // [PUT] /Facility/facilities/{facilityId}
  updateFacility(facilityId: number, updatedData: { Name: string; Description: string; Image: string }): Promise<any> {
    const Request = {
      Facility: updatedData
    }
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + `/${facilityId}`,
      data: Request,
    }, "Update Facility");
  }

  // [DELETE] /Facility/facilities/{facilityId}
  deactivateFacility(facilityId: number): Promise<any> {
    return callApi({
      instance: publicApi,
      method: 'delete',
      url: API_PREFIX + `/${facilityId}`,
    }, 'Deactivate Facility');
  }
}
