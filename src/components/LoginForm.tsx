import { FC, useState } from 'react';
import { Button, Form, Input } from 'antd';

export interface ILoginFormValues {
   email: string;
   password: string;
}

interface Props {
   onSubmit: (values: ILoginFormValues) => Promise<void>
}

const LoginForm: FC<Props> = ({ onSubmit }) => {
   const [loading, setLoading] = useState(false);

   const onFinish = async (values: ILoginFormValues) => {
      setLoading(true);
      setTimeout(async () => {
         await onSubmit(values)
         setLoading(false);
      }, 1000);
   };

   return (
      <Form
         name="normal_login"
         className="loginForm"
         onFinish={onFinish}
      >
         <h2 className="loginFormTitle">Authorization</h2>
         <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
         >
            <Input placeholder="Enter your email" />
         </Form.Item>
         <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
         >
            <Input type="password" placeholder="Password" />
         </Form.Item>
         <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit" className="login-form-button">
               Sign in
            </Button>
         </Form.Item>
      </Form>
   );
}

export default LoginForm;