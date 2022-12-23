import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../models';

interface InitialState {
   isAuth: boolean;
   user: IUser | null;
   error: string;
}

const initialState = {
   isAuth: false,
   user: null,
   error: ''
} as InitialState;

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      loginSuccess: (state, action: PayloadAction<IUser>) => {
         state.isAuth = true
         state.user = action.payload
         state.error = ''
      },
      logoutSuccess: (state) => {
         state.isAuth = false
         state.user = null
         state.error = ''
      }
   }
});

export const AuthActions = authSlice.actions;
export default authSlice.reducer;