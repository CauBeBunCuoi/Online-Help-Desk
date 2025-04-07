import { Injectable } from '@angular/core';
import { loginRequiredApi, publicApi } from '../../api/instance/axiosInstance';
import { callApi } from '../../api/main/api_call/api';

const API_PREFIX = '/Request/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  // [GET] /Request/service/major-head/{accountId}
  getServiceRequestsForHead(accountId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/major-head` + `/${accountId}`,
    }, "Get service request by headId");
  }

  // [GET] /Request/service/majors/{majorId}
  getServiceRequestsForMajor(majorId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/majors' + `/${majorId}`,
    }, "Get service requests by majorId");
  }

  // [GET] /Request/service/{requestId}
  getServiceRequestDetail(requestId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/${requestId}`,
    }, "Get service requests detail");
  }

  // [PUT] /Request/service/{requestId}
  updateServiceRequest(
    requestId: number,
    actionName: string,
    updateData: any
  ): Promise<any> {
    return callApi({
      instance: publicApi,
      method: 'put',
      url: API_PREFIX + `/${requestId}` + '?Action=' + actionName,
      data: updateData,
    }, "Update Service Request");
  }

  // [GET]/Request/service/assignee/{accountId}
  getRequestsByAssignee(accountId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axios instance bạn đang dùng
      method: 'get',
      url: API_PREFIX + '/assignee' + `/${accountId}`,
    }, "Get assigned service requests by assignee");
  }

  // [GET] /Request/service/major/{majorId}/assignable-assignee
  getAssignableAssigneesForMajor(majorId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/major' + `/${majorId}` + '/assignable-assignee',
    }, "Get AssignableAssigneesForMajor");
  }

  // [GET] /Request/service/assignee/{accountId}/majors/{majorId}
  getServiceRequestsForAssigneeInMajor(accountId: number, majorId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/assignee' + `/${accountId}` + '/majors' + `/${majorId}`,
    }, "Get getServiceRequestsForAssigneeInMajor");
  }

  // [GET] /Request/service/requestStatuses
  getServiceRequestStatuses(): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/requestStatuses`
    }, "Get service request status");
  }

  // [GET] /Request/service/requester/{accountId}
  getServiceRequestsByRequester(accountId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/requester/` + accountId,
    }, "Get service request by user");
  }
  
  // [POST] /Request/service
  createServiceRequest(payload: any): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX,
      data: payload,
    }, "Delete availability service"); // Giả lập độ trễ API 1 giây
  }
}
