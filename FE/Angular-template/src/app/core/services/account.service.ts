import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { publicApi, loginRequiredApi } from '../../api/instance/axiosInstance';

@Injectable({
    providedIn: 'root',
})
export class AccountService {

    constructor() { }

    async register(formData: FormData): Promise<any> {
        return await callApi(
            { instance: publicApi, method: 'post', url: '/account/register', data: formData },
            'Đăng ký'
        );
    }
    
    async login(email: string, password: string): Promise<any> {
        const response = await callApi(
            {
                instance: publicApi,
                method: 'post',
                url: '/account/login',
                data: { email, password }
            },
            'Đăng nhập'
        );
        return response;
    }


    /**
     * Lấy thông tin tài khoản theo ID (Cần JWT)
     * @param id ID tài khoản
     */
    async getAccountById(id: string): Promise<any> {
        return await callApi(
            { instance: loginRequiredApi, method: 'get', url: `/account/find-by-id/${id}` },
            'Lấy thông tin tài khoản'
        );
    }

    /**
     * Cập nhật thông tin tài khoản (Cần JWT)
     * @param accountId ID tài khoản
     * @param body Dữ liệu cập nhật
     */
    async updateAccount(accountId: string, body: any): Promise<any> {
        return await callApi(
            { instance: loginRequiredApi, method: 'put', url: `/account/update/${accountId}`, data: body },
            'Cập nhật tài khoản'
        );
    }
}
