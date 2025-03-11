import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { loginRequiredApi } from '../../api/instance/axiosInstance';
import { response_with_mess, MessResponse } from '../../api/main/responseGenerator';

@Injectable({
    providedIn: 'root',
})
export class TransactionService2 {
    constructor() {}

    async getUserTransactions(): Promise<MessResponse> {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            return response_with_mess(false, true, 'Lỗi', 'Không tìm thấy userId!', null);
        }

        try {
            const response = await callApi(
                {
                    instance: loginRequiredApi,
                    method: 'get',
                    url: `/transactions/find-by-id/${userId}`,
                },
                'Lấy danh sách giao dịch'
            );
            return response_with_mess(true, false, 'Lấy giao dịch thành công', '', response.data);
        } catch (error: any) {
            return response_with_mess(false, true, 'Lỗi tải giao dịch', error.response?.data?.message || 'Lỗi không xác định', null);
        }
    }
}
