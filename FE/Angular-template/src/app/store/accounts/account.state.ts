export interface AccountState {
    user: any | null; // 🛠️ Thêm user vào state
    token: string | null;
    error: string | null;
    loading: boolean;
}

export const initialState: AccountState = {
    user: null,
    token: null,
    error: null,
    loading: false,
};
