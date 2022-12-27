import React, { FC } from 'react';
import { Button, Modal } from 'antd';
import { IEvent, IUser } from '../../models';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
   authUser: IUser;
   selectedDateEvents: IEvent[];
   isModalOpen: boolean;
   closeModal: () => void;
   onRemoveEvent: (id: string) => void;
}

const EventsInfoModal: FC<Props> = ({ authUser, selectedDateEvents, isModalOpen, closeModal, onRemoveEvent }) => {
   const handleCancel = () => {
      closeModal();
   }

   const handleRemoveEvent = (id: string) => {
      onRemoveEvent(id);
   }

   return (
      <Modal
         className="eventsInfoModal"
         open={isModalOpen}
         centered
         closable={false}
         footer={null}
         onCancel={handleCancel}
      >
         <h4 className="eventsInfoModalHeader">Events that you have on this day:</h4>
         {selectedDateEvents.length > 0 ?
            <ul className="eventsList">
               {selectedDateEvents.map(ev => {
                  const isEventCreator = authUser.id === ev.authorId;

                  return (
                     <li key={ev.id} className="eventsListItem">
                        <span className="eventsListText">{ev.description}</span>
                        {isEventCreator && (
                           <DeleteOutlined
                              className="eventsListDeleteBtn"
                              onClick={() => handleRemoveEvent(ev.id)} />
                        )}
                     </li>
                  )
               })}
            </ul>
            :
            <div className="eventsInfoText">You are not having any events on this day...</div>
         }
         <Button className="eventsInfoModalBtn" onClick={handleCancel}>
            Cancel
         </Button>
      </Modal>
   );
}

export default EventsInfoModal;