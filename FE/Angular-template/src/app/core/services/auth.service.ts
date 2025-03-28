import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { callApi } from "../../api/main/api_call/api";
import { loginRequiredApi, publicApi } from "../../api/instance/axiosInstance";
import { response_with_mess } from "../../api/main/responseGenerator"; // Import MessResponse

@Injectable({
    providedIn: "root",
})
export class AuthService {
    private emailSubject = new BehaviorSubject<string>(localStorage.getItem("email") || "");
    email$ = this.emailSubject.asObservable();

    constructor() { }

    setEmail(email: string) {
        localStorage.setItem("email", email);
        this.emailSubject.next(email);
    }

    async register(formData: FormData) {
        try {
            const response = await callApi({ instance: publicApi, method: "post", url: "/account/register", data: formData }, "Đăng ký");
            return response_with_mess(true, false, "Đăng ký thành công", "Tài khoản đã được tạo!", response.data);
        } catch (error: any) {
            return response_with_mess(false, true, "Đăng ký thất bại", error.response?.data?.message || "Lỗi không xác định", null);
        }
    }

    async login(email: string, password: string) {
        const credentials = { email, password }
        try {
            const response = await callApi({ instance: publicApi, method: "post", url: "/account/login", data: credentials }, "Đăng nhập");

            if (response.success && response.data.access_token) {
                localStorage.setItem("access_token", response.data.access_token);
                this.setEmail(response.data.user.email);
            }
            return response_with_mess(true, false, "Đăng nhập thành công", "Bạn đã đăng nhập thành công!", response.data);
        } catch (error: any) {
            return response_with_mess(false, true, "Đăng nhập thất bại", error.response?.data?.message || "Lỗi không xác định", null);
        }
    }

    async findByEmail(email: string) {
        try {
            const response = await callApi({ instance: loginRequiredApi, method: "get", url: `/account/find-by-email/${email}` }, "Tải thông tin người dùng");
            return response_with_mess(true, false, "Tải thông tin thành công", "Dữ liệu tài khoản đã được lấy.", response.data);
        } catch (error: any) {
            return response_with_mess(false, true, "Tải thông tin thất bại", error.response?.data?.message || "Lỗi không xác định", null);
        }
    }

    async updateAccount(id: string, formData: FormData) {
        try {
            const response = await callApi({ instance: loginRequiredApi, method: "put", url: `/account/update/${id}`, data: formData }, "Cập nhật tài khoản");
            return response_with_mess(true, false, "Cập nhật thành công", "Thông tin tài khoản đã được cập nhật!", response.data);
        } catch (error: any) {
            return response_with_mess(false, true, "Cập nhật thất bại", error.response?.data?.message || "Lỗi không xác định", null);
        }
    }

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("userId");
        localStorage.removeItem("email");
        this.emailSubject.next("");
    }
}
