import { EventActions } from '.';
import { IEvent } from '../../../models';
import UsersService from '../../../services/usersService';
import { AppDispatch, RootState } from './../../index';

export const fetchGuests = () => async (dispatch: AppDispatch, getState: () => RootState) => {
   try {
      const data = await UsersService.fetchUsers();
      const authUser = getState().auth.user;
      const guests = data.filter(u => u.id !== authUser?.id);
      dispatch(EventActions.fetchUsersSuccess(guests));
   } catch (e: any) {
      dispatch(EventActions.fetchUsersFail(e.message))
   }
}

export const fetchEvents = () => async (dispatch: AppDispatch, getState: () => RootState) => {
   try {
      const data = JSON.parse(localStorage.getItem('events') || '[]') as IEvent[];
      const authUser = getState().auth.user;
      const events = data.filter(ev => ev.authorId === authUser!.id || ev.guestsId.includes(authUser!.id));
      dispatch(EventActions.fetchEventsSuccess(events));
   } catch (e: any) {
      dispatch(EventActions.fetchEventsFail(e.message));
   }
}

export const createEvent = (event: IEvent) => async (dispatch: AppDispatch) => {
   try {
      const data = JSON.parse(localStorage.getItem('events') || '[]') as IEvent[];
      data.push(event);
      localStorage.setItem('events', JSON.stringify(data));
      dispatch(EventActions.createEventSuccess(event));
   } catch (e: any) {
      alert(e.message);
   }
}

export const removeEvent = (id: string) => async (dispatch: AppDispatch) => {
   try {
      const data = JSON.parse(localStorage.getItem('events')!) as IEvent[];
      const updatedEvents = data.filter(ev => ev.id !== id);
      localStorage.setItem('events', JSON.stringify(updatedEvents));
      dispatch(EventActions.removeEventSuccess(id));
   } catch (e: any) {
      alert(e.message);
   }
}