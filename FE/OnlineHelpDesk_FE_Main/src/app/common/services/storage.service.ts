import { jwtDecode } from "jwt-decode";

// Lấy token từ localStorage
export function getTokenFromLocalStorage(): string | null {
    try {
      const auth = JSON.parse(localStorage.getItem('auth') || '{}');
      if (auth.token) {
        return auth.token;
      }
    } catch (error) {
      console.error('Error getting token from local storage:', error);
    }
    return null;
  }
  
  // Lấy thông tin người dùng từ localStorage
  export function getUserFromLocalStorage() {
    try {
      const auth = JSON.parse(localStorage.getItem('auth') || '{}');
      if (auth.user) {
        return auth.user;
      }
    } catch (error) {
      console.error('Error getting user from local storage:', error);
    }
    return null;
  }
  
  // Kiểm tra tính hợp lệ của token
  export function checkTokenValidity(token: string): boolean {
    const decodedToken: any = jwtDecode(token);
    const now = Date.now() / 1000;
    if (decodedToken.exp < now) {
      return false;
    }
    return true; // Giả sử token hợp lệ
  }
  
  
  