import { FC } from 'react';
import { Calendar } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import locale from 'antd/es/date-picker/locale/en_GB';
import { IEvent, IUser } from '../models';

interface Props {
   authUser: IUser;
   events: IEvent[];
   onRemoveEvent: (id: string) => void;
   onSelect: (date: string) => void;
}

const EventCalendar: FC<Props> = ({ authUser, events, onRemoveEvent, onSelect }) => {
   const handleRemoveEvent = (id: string) => {
      onRemoveEvent(id);
   }

   const dateCellRender = (value: Dayjs) => {
      const formattedDate = value.format('YYYY-MM-DD');
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

   const handleSelect = (date: Dayjs) => {
      const formattedDate = date.format('YYYY-MM-DD');
      onSelect(formattedDate);
   }

   return (
      <Calendar
         className="eventPageCalendar"
         locale={locale}
         dateCellRender={dateCellRender}
         onSelect={handleSelect} />
   );
};

export default EventCalendar;