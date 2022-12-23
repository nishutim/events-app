import { FC } from 'react';
import { Calendar } from 'antd';
import { Dayjs } from 'dayjs';
import { IEvent, IUser } from '../models';
import { DeleteOutlined } from '@ant-design/icons';

interface Props {
   authUser: IUser;
   events: IEvent[];
   onRemoveEvent: (id: string) => void;
}

const EventCalendar: FC<Props> = ({ authUser, events, onRemoveEvent }) => {
   const handleRemoveEvent = (id: string) => {
      onRemoveEvent(id);
   }

   const dateCellRender = (value: Dayjs) => {
      const formattedDate = value.format('YYYY-DD-MM');
      const currentDayEvents = events.filter(ev => ev.date === formattedDate);

      return (
         <ul className="eventsList">
            {currentDayEvents.map(ev => {
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
      );
   };

   return (
      <Calendar
         className="eventPageCalendar"
         dateCellRender={dateCellRender} />
   );
}

export default EventCalendar;