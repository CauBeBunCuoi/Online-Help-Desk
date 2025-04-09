export interface AuthState {
  token: string | null;
  user: any | null;  
}

export const initialState: AuthState = {
  token: null,
  user: null
};






