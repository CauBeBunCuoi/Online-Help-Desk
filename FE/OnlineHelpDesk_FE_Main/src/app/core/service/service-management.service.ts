import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { loginRequiredApi } from '../../api/instance/axiosInstance';

const API_PREFIX = '/Major/services';

@Injectable({
    providedIn: 'root'
})
export class ServiceManagementService {

    // [GET] /Major/services
    getAllServices(): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX,
        }, "Get services");
    }

    // [GET] /Major/services/major-head/{accountId}
    getServicesByHead(accountId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + '/major-head' + `/${accountId}`,
        }, "Get services by head");
    }

    // [GET] /Major/services/majors/{majorId}
    getServicesByMajor(majorId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + '/majors' + `/${majorId}`,
        }, "Get service by major");
    }

    // [GET] /Major/services/{serviceId}
    getServiceDetails(serviceId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + '/' + serviceId,
        }, "get service detail");
    }

    // [POST] /Major/services/major/{majorId}
    addServiceToMajor(majorId: number, serviceData: any): Promise<any> {
        const Request = {
            Service: serviceData
        };
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'post',
            url: API_PREFIX + '/major/' + majorId,
            data: Request,
        }, "Add service");
    }

    // [GET] /Major/services/serviceTypes
    getServiceTypes(): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + '/serviceTypes',
        }, "Get serviceTypes");
    }

    // [GET] /Major/services/{serviceId}/availability
    getServiceAvailability(serviceId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + '/' + serviceId + '/availability',
        }, "get service availability");
    }

    // [PUT] /Major/services/{serviceId}
    updateService(serviceId: number, serviceData: any): Promise<any> {
        const Request = {
            Service: serviceData
        };
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'put',
            url: API_PREFIX + `/${serviceId}`,
            data: Request,
        }, "Update service"); // Giả lập độ trễ API 1 giây
    }

    // [DELETE] /Major/services/{serviceId}
    deleteService(serviceId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'delete',
            url: API_PREFIX + `/${serviceId}`,
        }, "Delete service"); // Giả lập độ trễ API 1 giây
    }

    // [POST] /Major/services/{serviceId}/add-availability
    addAvailability(serviceId: number, availabilityData: any): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'post',
            url: API_PREFIX + `/${serviceId}` + '/add-availability',
            data: availabilityData,
        }, "Add availability service"); // Giả lập độ trễ API 1 giây
    }

    // [POST] /Major/services/{serviceId}/delete-availability
    deleteAvailability(serviceId: number, availabilityData: any): Promise<any> {
        const Request = {
            Availability: availabilityData
        };
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'post',
            url: API_PREFIX + `/${serviceId}` + '/delete-availability',
            data: Request,
        }, "Delete availability service"); // Giả lập độ trễ API 1 giây
    }

    // [GET] /Major/services/{serviceId}/bookable-schedules
    getBookableSchedules(serviceId: number): Promise<any> {
        return callApi({
            instance: loginRequiredApi, // hoặc axiosInstance nếu bạn đã cấu hình riêng
            method: 'get',
            url: API_PREFIX + `/${serviceId}` + '/bookable-schedules',
        }, "get bbok availability service"); // Giả lập độ trễ API 1 giây
    }
}
