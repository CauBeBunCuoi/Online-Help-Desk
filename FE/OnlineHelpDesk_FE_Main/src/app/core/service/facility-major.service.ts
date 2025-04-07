import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { loginRequiredApi, publicApi } from '../../api/instance/axiosInstance';

const API_PREFIX = '/Major/majors';

@Injectable({
  providedIn: 'root',
})
export class FacilityMajorService {

  // [GET] /Major/majors
  getAllMajors(): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX
    }, "Get Majors");
  }

  // [GET] /Major/majors/features
  getAllMajorsFeartures(): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/features',
    }, "Get Majors");
  }

  // [POST] /Major/majors
  addMajor(newMajor: any): Promise<any> {
    const Request = {
      Major: newMajor
    };
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX,
      data: Request,
    }, "Add Major");
  }

  // [GET] /Major/majors/{majorId}
  getMajorDetail(majorId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/${majorId}`,
    }, "Get major detail");
  }

  // [GET] /Major/majors/major-head/{accountId}/majors
  getMajorsByHead(accountId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/major-head` + `/${accountId}` + '/majors',
    }, "Get majors by headId");
  }

  // [GET] /Major/majors/assignee/{accountId}/majors
  getMajorsByAssignee(accountId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/assignee` + `/${accountId}` + '/majors',
    }, "Get majors by headId");
  }

  // [PUT] /Major/majors/{majorId}
  updateMajor(majorId: number, updatedMajor: any): Promise<any> {
    const Request = {
      Major: updatedMajor
    };
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + `/${majorId}`,
      data: Request,
    }, "Update Major"); // Giả lập độ trễ API 1 giây
  }

  // [GET] /Major/majors/feedbacks
  getAllMajorFeedbacks(): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/feedbacks',
    }, "Get Feedbacks");
  }

  // [GET] /Major/majors/{majorId}/feedbacks
  getMajorFeedbacks(majorId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/${majorId}` + '/feedbacks',
    }, "Get feedbacks by majorId");
  }

  // [GET] /Major/majors/major-head/{accountId}/feedbacks
  getHeadMajorFeedbacks(accountId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/major-head' + `/${accountId}` + '/feedbacks',
    }, "Get feedbacks by majorId");
  }

  // [GET] /Major/majors/reports
  getAllMajorReports(): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/reports',
    }, "Get Reports");
  }

  // [GET] /Major/majors/major-head/{accountId}/reports
  getReportsByHead(accountId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/major-head' + `/${accountId}` + '/reports',
    }, "Get reports by majorId");
  }

  // [GET] /Major/majors/{majorId}/reports
  getReportsByMajor(majorId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + `/${majorId}` + '/reports',
    }, "Get reports by majorId");
  }

  // [POST] /Major/majors/{majorId}/account/{accountId}/feedbacks
  createFeedback(majorId: number, accountId: number, feedbackData: any): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX + '/' + majorId + '/account/' + accountId + '/feedbacks',
      data: feedbackData,
    }, "Add feed");
  }

  // [POST] /Major/majors/{majorId}/account/{accountId}/reports
  createReport(majorId: number, accountId: number, reportData: any): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'post',
      url: API_PREFIX + '/' + majorId + '/account/' + accountId + '/reports',
      data: reportData,
    }, "Add report");
  }

  // [GET] /Major/majors/reportTypes
  getReportTypes(): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/reportTypes',
    }, "Get reportTypes");
  }

  // [GET] /Major/majors/reports/{reportId}
  getReportDetail(reportId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/reports' + `/${reportId}`,
    }, "Get Report detail"); // Giả lập độ trễ API 1 giây
  }

  // [PUT] /Major/majors/reports/{reportId}
  resolveReport(reportId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'put',
      url: API_PREFIX + `/reports` + `/${reportId}`,
    }, "Update resolve");
  }

  // [GET] /Major/majors/facilityMajorTypes
  getFacilityMajorTypes(): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'get',
      url: API_PREFIX + '/facilityMajorTypes'
    }, "Get Major Types");
  }

  // [DELETE] /Major/majors/{majorId}
  deleteMajor(MajorId: number): Promise<any> {
    return callApi({
      instance: publicApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'delete',
      url: API_PREFIX + `/${MajorId}`,
    }, "Delete major");
  }

  // [DELETE] /Major/majors/feedbacks/{feedbackId}
  deleteFeedback(feedbackId: number): Promise<any> {
    return callApi({
      instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
      method: 'delete',
      url: API_PREFIX + `/feedbacks` + `/${feedbackId}`,
    }, "DELETE Feedback");
  }

}
