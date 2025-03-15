import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { publicApi } from '../../api/instance/axiosInstance';

@Injectable({
    providedIn: 'root',
})
export class MajorServiceService {
    private apiUrl = '/major-service'; // Giữ đường dẫn tương đối để phù hợp với instance

    constructor() {}

    async getMajorServices(): Promise<any> {
        const response = await callApi(
            {
                instance: publicApi,
                method: 'get',
                url: this.apiUrl,
            },
            'Lấy danh sách Major Services'
        );
        return response;
    }

    async getMajorServiceById(id: string): Promise<any> {
        const response = await callApi(
            {
                instance: publicApi,
                method: 'get',
                url: `${this.apiUrl}/${id}`,
            },
            `Lấy Facility Major có ID ${id}`
        );
        return response;
    }
}
