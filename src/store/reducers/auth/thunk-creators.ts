import { AppDispatch } from '../..';
import UsersService from '../../../services/usersService';
import { AuthActions } from '.';

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
   try {
      const data = await UsersService.fetchUsers();
      const user = data.find(user => user.email === email);
      if (user && user.password === password) {
         dispatch(AuthActions.loginSuccess(user));
         localStorage.setItem('user', JSON.stringify(user));
      } else {
         alert('Incorrect email or password');
      }
   } catch (e: any) {
      alert(e.message);
   }
};

export const logout = () => async (dispatch: AppDispatch) => {
   try {
      dispatch(AuthActions.logoutSuccess());
      localStorage.removeItem('user')
   } catch (e: any) {
      alert(e.message);
   }
}

export const checkIsAuth = () => async (dispatch: AppDispatch) => {
   try {
      const user = localStorage.getItem('user');
      if (user) {
         dispatch(AuthActions.loginSuccess(JSON.parse(user)));
      }
   } catch (e: any) {
      alert(e.message);
   }
}