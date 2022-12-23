import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent, IUser } from '../../../models'

interface InitialState {
   guests: IUser[] | null;
   events: IEvent[] | null;
   error: string;
}

const initialState = {
   guests: null,
   events: null,
   error: ''
} as InitialState;

const eventSlice = createSlice({
   name: 'event',
   initialState,
   reducers: {
      fetchUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
         state.guests = action.payload
         state.error = ''
      },
      fetchUsersFail: (state, action: PayloadAction<string>) => {
         state.error = action.payload
      },
      createEventSuccess: (state, action: PayloadAction<IEvent>) => {
         state.events = state.events
            ? [...state.events, action.payload]
            : [action.payload]
      },
      removeEventSuccess: (state, action: PayloadAction<string>) => {
         state.events = state.events!.filter(ev => ev.id !== action.payload)
      },
      fetchEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
         state.events = action.payload
         state.error = ''
      },
      fetchEventsFail: (state, action: PayloadAction<string>) => {
         state.error = action.payload
      }
   }
});

export const EventActions = eventSlice.actions;
export default eventSlice.reducer;