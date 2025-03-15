import { Injectable } from '@angular/core';
import { callApi } from '../../api/main/api_call/api';
import { publicApi } from '../../api/instance/axiosInstance';

@Injectable({
    providedIn: 'root',
})
export class FacilityMajorService {
    private apiUrl = '/facility-major'; // Giữ đường dẫn tương đối để phù hợp với instance

    constructor() {}

    async getFacilityMajors(): Promise<any> {
        const response = await callApi(
            {
                instance: publicApi,
                method: 'get',
                url: this.apiUrl,
            },
            'Lấy danh sách Facility Majors'
        );
        return response;
    }

    async getFacilityMajorById(id: string): Promise<any> {
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
