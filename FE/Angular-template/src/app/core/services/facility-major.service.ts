import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class FacilityMajorService {
    private facilityMajors = [
        {
            id: 1,
            name: 'Engineering',
            mainDescription: 'Engineering department focuses on mechanical and electrical fields.',
            workShiftDescription: 'Morning and Afternoon shifts available.',
            isOpen: true,
            closeScheduleDate: null,
            openScheduleDate: '2025-03-15',
            openTime: '08:00:00',
            closeTime: '18:00:00',
            logo: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/cong-ty-co-phan-bat-dong-san-gempire-62908fae1a002.jpg',
            image: 'https://www.topcv.vn/images/default_cover/topcv_cover_4.jpg',
            description: `Công ty Aureole CSD INC chuyên về ứng dụng phần mềm trong lĩnh vực xây dựng.`
        },
        {
            id: 2,
            name: 'Medical',
            mainDescription: 'Medical department focuses on healthcare and patient support.',
            workShiftDescription: 'Night shift available.',
            isOpen: false,
            closeScheduleDate: '2025-04-01',
            openScheduleDate: '2025-05-01',
            openTime: '07:00:00',
            closeTime: '17:00:00',
            logo: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/company_logos/cong-ty-co-phan-bat-dong-san-gempire-62908fae1a002.jpg',
            image: 'https://www.topcv.vn/images/default_cover/topcv_cover_3.jpg',
            description: `Bệnh viện đa khoa với nhiều chuyên khoa hiện đại.`
        }
    ];

    constructor() { }

    async getFacilityMajors(): Promise<any> {
        return {
            message: 'Ok',
            facilityMajors: this.facilityMajors,
        };
    }

    async getFacilityMajorById(id: number): Promise<any> {
        return {
            facilityMajor: this.facilityMajors.find(fm => fm.id === id) || null
        };
    }
}
