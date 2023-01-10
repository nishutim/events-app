import { useCallback, useEffect, useState } from 'react';
import { Button, Layout } from 'antd';
import dayjs from 'dayjs';
import { IEvent } from '../models';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { createEvent, fetchEvents, removeEvent } from '../store/reducers/event/thunk-creators';
import { auth_selectUser } from '../store/reducers/auth/selectors';
import { event_selectEvents, event_selectSelectedDate } from '../store/reducers/event/selectors';
import Preloader from '../components/Preloader';
import EventCalendar from '../components/EventCalendar';
import CreateEventModal from '../components/modals/CreateEventModal';
import EventCalendarMobile from '../components/EventCalendarMobile';
import EventsInfoModal from '../components/modals/EventsInfoModal';
import { EventActions } from '../store/reducers/event';

const EventPage = () => {
   const authUser = useAppSelector(auth_selectUser);
   const selectedDate = useAppSelector(event_selectSelectedDate);
   const events = useAppSelector(event_selectEvents);

   const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
   const [isEventsInfoModalOpen, setIsEventsInfoModalOpen] = useState(false);
   const [isFetchingEvents, setIsFetchingEvents] = useState(true);
   const [selectedDateEvents, setSelectedDateEvents] = useState<IEvent[]>([]);

   const dispatch = useAppDispatch();

   const showCreateEventModal = () => {
      setIsCreateEventModalOpen(true);
   };

   const closeCreateEventModal = useCallback(() => {
      setIsCreateEventModalOpen(false);
   }, []);

   const showEventsInfoModal = () => {
      setIsEventsInfoModalOpen(true);
   };

   const closeEventsInfoModal = useCallback(() => {
      setIsEventsInfoModalOpen(false);
   }, []);

   const handleRemoveEvent = useCallback((id: string) => {
      dispatch(removeEvent(id));
      setSelectedDateEvents(selectedDateEvents.filter(ev => ev.id !== id));
   }, []);

   const handleDateSelect = useCallback((date: string) => {
      dispatch(EventActions.setSelectedDate(date));
   }, []);

   const handleDateSelectMobile = useCallback((date: string) => {
      const currentDateEvents = events!.filter(ev => ev.date === date);
      setSelectedDateEvents(currentDateEvents);
      showEventsInfoModal();
   }, [events]);

   const handleSubmit = useCallback(async (event: IEvent) => {
      await dispatch(createEvent(event));
      setIsCreateEventModalOpen(false);
   }, []);

   useEffect(() => {
      setTimeout(async () => {
         await dispatch(fetchEvents())
         setIsFetchingEvents(false);
      }, 1000);

      handleDateSelect(dayjs().format('YYYY-MM-DD'));
   }, []);

   return (
      <Layout className="eventPage">
         <Button
            className="eventPageBtn"
            type="primary"
            size="large"
            loading={isFetchingEvents}
            disabled={isFetchingEvents}
            onClick={showCreateEventModal}
         >
            Create event
         </Button>
         {isFetchingEvents
            ? <Preloader />
            : <>
               <EventCalendar
                  authUser={authUser!}
                  events={events!}
                  onRemoveEvent={handleRemoveEvent}
                  onSelect={handleDateSelect} />
               <EventCalendarMobile
                  events={events!}
                  onSelect={handleDateSelectMobile} />
               <CreateEventModal
                  isModalOpen={isCreateEventModalOpen}
                  closeModal={closeCreateEventModal}
                  onSubmit={handleSubmit}
                  selectedDate={selectedDate!} />
               <EventsInfoModal
                  authUser={authUser!}
                  selectedDateEvents={selectedDateEvents}
                  isModalOpen={isEventsInfoModalOpen}
                  closeModal={closeEventsInfoModal}
                  onRemoveEvent={handleRemoveEvent} />
            </>
         }
      </Layout>
   );
}

export default EventPage;