import React, { FC, useEffect } from 'react';
import { Modal } from 'antd';
import CreateEventForm from '../CreateEventForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { event_selectGuests } from '../../store/reducers/event/selectors';
import { fetchGuests } from '../../store/reducers/event/thunk-creators';
import { IEvent } from '../../models';
import { auth_selectUser } from '../../store/reducers/auth/selectors';

interface Props {
   isModalOpen: boolean;
   closeModal: () => void;
   onSubmit: (event: IEvent) => Promise<void>;
}

const CreateEventModal: FC<Props> = React.memo(({ isModalOpen, closeModal, onSubmit }) => {
   const authUser = useAppSelector(auth_selectUser);
   const guests = useAppSelector(event_selectGuests);

   const dispatch = useAppDispatch();

   useEffect(() => {
      setTimeout(() => dispatch(fetchGuests()), 1500);
   }, []);

   return (
      <Modal
         open={isModalOpen}
         centered
         closable={false}
         footer={null}
      >
         <CreateEventForm
            authUser={authUser}
            guests={guests}
            closeModal={closeModal}
            onSubmit={onSubmit} />
      </Modal>
   );
});

export default CreateEventModal; 