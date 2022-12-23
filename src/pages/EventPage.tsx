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

const EventPage = () => {
   const authUser = useAppSelector(auth_selectUser);
   const events = useAppSelector(event_selectEvents);

   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isFetchingEvents, setIsFetchingEvents] = useState(true);

   const dispatch = useAppDispatch();

   useEffect(() => {
      setTimeout(async () => {
         await dispatch(fetchEvents())
         setIsFetchingEvents(false);
      }, 1000);
   }, []);

   const showModal = () => {
      setIsModalOpen(true);
   };

   const closeModal = useCallback(() => {
      setIsModalOpen(false);
   }, []);

   const handleRemoveEvent = useCallback((id: string) => {
      dispatch(removeEvent(id));
   }, []);

   const handleSubmit = useCallback(async (event: IEvent) => {
      await dispatch(createEvent(event));
      setIsModalOpen(false);
   }, []);

   return (
      <Layout className="eventPage">
         {isFetchingEvents
            ? <Preloader />
            : <EventCalendar
               authUser={authUser!}
               events={events!}
               onRemoveEvent={handleRemoveEvent} />
         }
         <Button
            className="eventPageBtn"
            type="primary"
            size="large"
            loading={isFetchingEvents}
            disabled={isFetchingEvents}
            onClick={showModal}
         >
            Create event
         </Button>
         <CreateEventModal
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            onSubmit={handleSubmit} />
      </Layout>
   );
}

export default EventPage;