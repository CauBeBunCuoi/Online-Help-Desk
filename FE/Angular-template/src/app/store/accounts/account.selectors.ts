import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from './account.state';

// Chọn feature state của account
export const selectAccountState = createFeatureSelector<AccountState>('account');

// Lấy thông tin tài khoản
export const selectAccount = createSelector(
    selectAccountState,
    (state) => state.user
);

// Lấy token sau khi đăng nhập
export const selectToken = createSelector(
    selectAccountState,
    (state) => state.token
);

// Kiểm tra trạng thái loading
export const selectLoading = createSelector(
    selectAccountState,
    (state) => state.loading
);

// Lấy lỗi nếu có
export const selectError = createSelector(
    selectAccountState,
    (state) => state.error
);

export const selectBalance = createSelector(
    selectAccountState,
    (state) => state?.user?.balance ?? 0
);
