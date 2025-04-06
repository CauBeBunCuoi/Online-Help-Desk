import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { loginRequiredApi } from '../../api/instance/axiosInstance';

const API_PREFIX = '/Request/task';

@Injectable({
    providedIn: 'root'
})
export class TaskRequestService {

    // [GET] /Request/task
    getAllTaskRequests(): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX
        }, "Get all task requests");
    }

    // [GET] /Request/task/majors/{majorId}
    getTaskRequestsByMajor(majorId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + '/majors' + `/${majorId}`,
        }, "Get Task Requests By Major");
    }

    // [POST] /Request/task
    addTaskRequest(taskRequest: any): Promise<any> {
        const Request = {
            TaskRequest: taskRequest
        };
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'post',
            url: API_PREFIX,
            data: Request,
        }, "Add Task Request");
    }

    // [GET] /Request/task/{requestId}
    getTaskRequestDetail(requestId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + `/${requestId}`,
        }, "Get Task Requests By Major");
    }

    // [PUT] /Request/task/{taskId}
    updateTaskStatus(taskId: number, action: 'Finished' | 'Cancelled', cancelReason: any): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'put',
            url: API_PREFIX + `/${taskId}` + `?Action=${action}`,
            data: cancelReason,
        }, "Update Task Request Status");
    }

    // [GET] /Request/task/major-head/{accountId}
    getTaskRequestsByHead(accountId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + '/major-head' + `/${accountId}`,
        }, "Get Task Requests By Major");
    }

}
