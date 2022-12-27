import React, { FC, useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/en-gb';
import locale from 'antd/es/date-picker/locale/en_GB';
import { v4 as uuidv4 } from 'uuid';
import Rules from '../utils/validationRules';
import { IEvent, IUser } from '../models';

interface Props {
   authUser: IUser | null;
   guests: IUser[] | null;
   closeModal: () => void;
   onSubmit: (event: IEvent) => Promise<void>;
}

interface EventFormValues {
   date: Dayjs;
   description: string;
   selectedGuests: string[];
}

const CreateEventForm: FC<Props> = React.memo(({ authUser, guests, closeModal, onSubmit }) => {
   const [form] = useForm();
   const [loading, setLoading] = useState(false);

   const handleSubmit = async ({ date, description, selectedGuests }: EventFormValues) => {
      setLoading(true);
      console.log(date, description, selectedGuests);


      const event = {
         id: uuidv4(),
         authorId: `${authUser?.id}` || '0',
         date: date.format('YYYY-DD-MM'),
         description,
         guestsId: selectedGuests
      };

      setTimeout(async () => {
         await onSubmit(event);
         form.resetFields();
         setLoading(false);
      }, 1000);
   }

   return (
      <Form
         className="createEventForm"
         name="eventForm"
         form={form}
         autoComplete="off"
         onFinish={handleSubmit}
         initialValues={{
            date: dayjs()
         }}
      >
         <h3 className="createEventFormHeader">Create event</h3>
         <Form.Item
            label="Select event date"
            name="date"
            rules={[Rules.required('Date is required!')]}
         >
            <DatePicker locale={locale} className="createEventDatePicker" />
         </Form.Item>
         <Form.Item
            label="Add event description"
            name="description"
            rules={[Rules.required()]}
         >
            <Input placeholder="Type your description here..." />
         </Form.Item>
         <Form.Item
            label="Select guest"
            name="selectedGuests"
         >
            <Select mode="multiple" loading={!guests} showArrow showSearch={false}>
               {guests?.map(g => (
                  <Select.Option key={g.id} value={g.id}>{g.email}</Select.Option>
               ))}
            </Select>
         </Form.Item>
         <Space className="createEventFormFooter">
            <Button size="large" onClick={closeModal}>Cancel</Button>
            <Button
               className="createEventFormBtn"
               type="primary"
               htmlType="submit"
               size="large"
               loading={loading}
            >
               Create
            </Button>
         </Space>
      </Form>
   );
});

export default CreateEventForm;