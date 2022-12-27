import { useCallback, useEffect, useState } from 'react';
import { Button, Layout } from 'antd';
import { IEvent } from '../models';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { createEvent, fetchEvents, removeEvent } from '../store/reducers/event/thunk-creators';
import { auth_selectUser } from '../store/reducers/auth/selectors';
import { event_selectEvents } from '../store/reducers/event/selectors';
import Preloader from '../components/Preloader';
import EventCalendar from '../components/EventCalendar';
import CreateEventModal from '../components/modals/CreateEventModal';
import EventCalendarMobile from '../components/EventCalendarMobile';
import EventsInfoModal from '../components/modals/EventsInfoModal';

const EventPage = () => {
   const authUser = useAppSelector(auth_selectUser);
   const events = useAppSelector(event_selectEvents);

   const [isCreateEventModalOpen, setIsCreateEventModalOpen] = useState(false);
   const [isEventsInfoModalOpen, setIsEventsInfoModalOpen] = useState(false);
   const [isFetchingEvents, setIsFetchingEvents] = useState(true);
   const [selectedDateEvents, setSelectedDateEvents] = useState<IEvent[]>([]);

   const dispatch = useAppDispatch();

   useEffect(() => {
      setTimeout(async () => {
         await dispatch(fetchEvents())
         setIsFetchingEvents(false);
      }, 1000);
   }, []);

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
      const currentDateEvents = events!.filter(ev => ev.date === date);
      setSelectedDateEvents(currentDateEvents);
      showEventsInfoModal();
   }, [events]);

   const handleSubmit = useCallback(async (event: IEvent) => {
      await dispatch(createEvent(event));
      setIsCreateEventModalOpen(false);
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
                  onRemoveEvent={handleRemoveEvent} />
               <EventCalendarMobile
                  events={events!}
                  onSelect={handleDateSelect} />
            </>
         }
         <CreateEventModal
            isModalOpen={isCreateEventModalOpen}
            closeModal={closeCreateEventModal}
            onSubmit={handleSubmit} />
         <EventsInfoModal
            authUser={authUser!}
            selectedDateEvents={selectedDateEvents}
            isModalOpen={isEventsInfoModalOpen}
            closeModal={closeEventsInfoModal}
            onRemoveEvent={handleRemoveEvent} />
      </Layout>
   );
}

export default EventPage;