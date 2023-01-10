import { RootState } from './../../index';

export const event_selectSelectedDate = (state: RootState) => state.event.selectedDate;
export const event_selectGuests = (state: RootState) => state.event.guests;
export const event_selectEvents = (state: RootState) => state.event.events;
export const event_selectError = (state: RootState) => state.event.error;