import { RootState } from './../../index';

export const auth_selectIsAuth = (state: RootState) => state.auth.isAuth;
export const auth_selectUser = (state: RootState) => state.auth.user;
export const auth_selectError = (state: RootState) => state.auth.error;