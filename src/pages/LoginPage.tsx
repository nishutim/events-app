import { Layout } from 'antd';
import LoginForm, { ILoginFormValues } from '../components/LoginForm';
import { useAppDispatch } from '../hooks/redux';
import { login } from '../store/reducers/auth/thunk-creators';

const LoginPage = () => {
   const dispatch = useAppDispatch();

   const handleSubmit = async ({ email, password }: ILoginFormValues) => {
      dispatch(login(email, password));
   }

   return (
      <Layout className="loginPage">
         <div className="loginPageBody">
            <LoginForm onSubmit={handleSubmit} />
         </div>
      </Layout>
   );
}

export default LoginPage;