import { FC } from 'react';
import { Calendar } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import locale from 'antd/es/date-picker/locale/en_GB';
import { IEvent } from '../models';

interface Props {
   events: IEvent[];
   onSelect: (date: string) => void;
}

const EventCalendarMobile: FC<Props> = ({ events, onSelect }) => {
   const dateCellRender = (value: Dayjs) => {
      const formattedDate = value.format('YYYY-DD-MM');
      const currentDayEvents = events.filter(ev => ev.date === formattedDate);

      return (
         currentDayEvents.length > 0 ?
            <div className="eventCalendarMobileNotification">
               <ExclamationCircleOutlined className="eventCalendartMobileIcon" />
               <p className="eventCalendartMobileText">Info!</p>
            </div>
            :
            <></>

      );
   };

   const handleSelect = (date: Dayjs) => {
      const formattedDate = date.format('YYYY-DD-MM');
      onSelect(formattedDate);
   }

   return (
      <Calendar
         className="eventCalendarMobile"
         locale={locale}
         dateCellRender={dateCellRender}
         onSelect={handleSelect} />
   );
}

export default EventCalendarMobile;